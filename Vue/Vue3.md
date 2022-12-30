# isRef

判断当前数据是否为ref类型

源码：（这个写法好像是函数重载， 但是明明只有一个类型， 为啥要重载）

```TypeScript
export function isRef<T>(r: Ref<T> | unknown): r is Ref<T> 
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}
```

# unRef

如果参数为ref，则返回内部值，否则返回参数本身。val = isRef(val) ? val.value : val。

源码

```TypeScript
export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? (ref.value as any) : ref
}
```

# toRef

针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref，且保持响应式

两者 保持引用关系

例子

```TypeScript
<template>
  <div class="demo">
    <div>姓名--state.name：{{state.name}}</div>
    <div>姓名2--nameRef：{{nameRef}}</div>
    <div>年龄：{{state.age}}</div>
  </div>
</template>

<script>
import { reactive, toRef } from 'vue'
export default {
  name: 'reactivedemo',
  setup () {
    // 响应式对象
    const state = reactive({
      name: '太凉',
      age: 18
    })

    // 通过toRef创建一个Ref响应式
    const nameRef = toRef(state, 'name')

    // 过3秒后改变 两者 保持引用关系 
    setTimeout(() => {
      // update1:改变name属性
      state.name = '冰箱太凉'
    }, 3000)

    // 过6秒后改变 两者 保持引用关系 
    setTimeout(() => {
      // update1:改变name属性
      nameRef.value = '我就是冰箱太凉'
    }, 6000)

    return {
      nameRef,
      state
    }
  }
}
</script>
```

源码

```TypeScript
export type ToRef<T> = IfAny<T, Ref<T>, [T] extends [Ref] ? T : Ref<T>>

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]>

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: T[K]
): ToRef<Exclude<T[K], undefined>>

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K]
): ToRef<T[K]> {
  const val = object[key]
  return isRef(val)
    ? val
    : (new ObjectRefImpl(object, key, defaultValue) as any) // 这个ObjectRefImpl 就是设置一下set和get。 触发原对象的set和get。
}
```

# Watch

如果想在侦听器回调中能访问被 Vue 更新**之后**的DOM，你需要指明 flush: 'post' 选项：

```TypeScript
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：

```TypeScript
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

停止侦听器

要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：

```TypeScript
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```