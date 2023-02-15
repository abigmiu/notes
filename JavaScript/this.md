# this

## 默认绑定

默认绑定至window

## 隐式绑定

当好处是对象有引用上下文的时候，***隐式绑定***规则会吧函数调用中的this绑定到这个上下文对象。

```javascript
var a = 3;
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    fun: foo
};

obj.fun(); //2
```

## 显式绑定

使用 call() 和 apply(),bind() 可以用硬绑定

## new 绑定

使用`new`对函数进行构造调用(构造函数)：

- 创建（构造） 一个全新的对象
- 这个对象会被执行原型连接
- 这个对象会绑定到函数调用的this
- 如果函数没有返回其他对象，那么new 表达式中的函数会自动返回这个新对象





**this 永远指向最后调用它的那个对象**

```js
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // cherry
    }
}
window.a.fn();
```
以就算 a 中没有 name 这个属性，也不会继续向上一个对象寻找 `this.name`，而是直接输出 `undefined`。

**箭头函数的 this 始终指向函数定义时的 this，而非执行时。**，箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。

**严格模式下this指向undefined**



[JavaScript中的this - 掘金 (juejin.cn)](https://juejin.cn/post/6844903488304971789)
