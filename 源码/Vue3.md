Vue.js 设计与实现

# 响应式系统设计

```TypeScript
const bucket = new WeakMap(); // 及时回收没有被引用的key
```

## 分支切换 / 遗留副作用函数清除

```TypeScript
function cleanUpEffects(effectFn) {
    /**
     * effect
     *  - deps -> effect
     */
    effectFn.deps.forEach((deps) => {
        deps.delete(effectFn);
    });
    effectFn.deps.length = 0;
}
```

## 嵌套 Effect

```TypeScript
export function effect(fn) {
    const effectFn = () => {
        cleanUpEffects(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn)
        fn();
        // 将当前副作用函数弹出
        effectStack.pop()
        // 恢复到之前的值
        activeEffect = effectStack[effectStack.length - 1]
    };
    // 这里 给 effectFn 赋值 deps
    effectFn.deps = [];
    effectFn();
}
```

## 无限递归循环

```TypeScript
const data = { foo: 1 }
const obj = new Proxy(data, { /*...*/ })
effect(() => obj.foo++)
```

​                                            

在这个语句中，既会读取 obj.foo 的值，又会设置 obj.foo 的值，而这就是导致问题的根本原 因。我们可以尝试推理一下代码的执行流程:首先读取 obj.foo 的值，这会触发 track 操作，将当前 副作用函数收集到“桶”中，接着将其加 1 后再赋值给 obj.foo，此时会触发 trigger 操作，即把“桶”中 的副作用函数取出并执行。但问题是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执 行。这样会导致无限递归地调用自己，于是就产生了栈溢出。 

​                                            

如果 **trigger** 触发执行的 副作用函数与当前正在执行的副作用函数相同，则不触发执行 

```JavaScript
function triggerEffects(deps) {
    deps.forEach(effect => {
        if (activeEffect !== effect) {
            effect()
        }
    })
}

export function trigger(target, key) {
    let keyDepsMap = bucket.get(target);
    if (!keyDepsMap) return;
    let deps = keyDepsMap.get(key);
    if (!deps) return;

    // new Set 防止死循环
    const depsToRun = new Set(deps);
    triggerEffects(depsToRun)
}
```

## 调度执行

​                                            

所谓可调度，指的是当 trigger 动作触发副作用函数重新执行时，有能力决定副作用函数执行的时机、次数以及方式。 

## computed

effect 嵌套 computed

```JavaScript
import { reactive } from './reactive.js';
import { effect } from './effect.js';
import { computed } from './computed.js';

const obj = reactive({
    foo: 1,
});
const bar = computed(() => {
    console.log('computed');
    obj.foo;
});
effect(() => {
    console.log('effect');
    bar.value;
});

obj.foo++;// 触发这里的时候， 就进入了 obj.foo 的 trigger. 
// 这里的 trigger 里的 deps 里面 effect 是 comouted里面的 effect
```

由于 computed 定义了 schedule

```JavaScript
scheduler() {
        dirty = true;
        trigger(obj, 'value');
    },
    // 这里进行了 triiger。 computed 里面的 trigger 是针对 读取computed外面的 effect 的。
```

原文：

​                                            

分析问题的原因，我们发现，从本质上看这就是一个典型的 effect 嵌套。一个计算属性内部拥有自 己的 effect，并且它是懒执行的，只有当真正读取计算属性的值时才会执行。对于计算属性的 getter 函数来说，它里面访问的响应式数据只会把 computed 内部的 effect 收集为依赖。而当把计算属性用 于另外一个 effect 时，就会发生 effect 嵌套，外层的 effect 不会被内层 effect 中的响应式数据 收集。 

解决办法很简单。当读取计算属性的值时，我们可以手动调用 track 函数进行追踪;当计算属性依 赖的响应式数据发生变化时，我们可以手动调用 trigger 函数触发响应: 