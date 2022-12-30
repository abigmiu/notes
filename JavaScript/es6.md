## let const

无法在全局里面访问

## 箭头函数

```javascript
(para1,para2) => result
//相当于
(para1,para2) => {
    return result
}
```

箭头函数得this对象是定义所在的对象，不是运行所在的对象。因为没有自己的this，指向外层函数的this

## map()

map() 返回一个新数组，不会改变原数组



## sort()

使用`sort()`对数字进行排序时需要指定函数

```javascript
var points = [40,100,1,5,25,10];
points.sort(function(a,b){return a-b});
```

更改原数组



### arr.splice(item1,item2,...)

如果第二个是负数，则不删除





# Generator

正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield![屏幕快照 2020-08-19 下午12.19.58](/Users/tangying/Nutstore Files/Typora/JavaScript/es6.assets/屏幕快照 2020-08-19 下午12.19.58.png)

yield表达式只能放在Generator函数里面

# Iterator

一种数据结构有 Symbol.itertor 认为可遍历

 

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments     对象
- NodeList 对象



# Promise

一个 promise 必须有一个 then 方法用于处理状态改变

> # 三种状态
>
> ![屏幕快照 2020-08-19 下午12.21.33](/Users/tangying/Nutstore Files/Typora/JavaScript/es6.assets/屏幕快照 2020-08-19 下午12.21.33.png)

Promise 创建时即立即执行即同步任务then会放在异步微任务中执行，需要等同步任务执行后才执行。



Resolve 将 Promise对象变为成功

Promise 新建后会立即执行

```javascript
let promise = new Promise(function(resolve, reject) {

    console.log("promise 建立好了");
    resolve();
})

promise.then(function() {
    console.log('resloved');
})

console.log('Syncstart')            

//promise 建立好了
//Syncstart
//resloved
```



调用resolve或reject并不会终结 Promise 的参数函数的执行。

`.then` 返回新的promise实例





Promise 是一个容器，里面保存着未来才会结束的事件， promise是一个对象，可以获取一部操作的消息



Promise 特点

对象的状态不受外界影响

一旦状态改变就不会在变

resolve 和 reject 是两个函数，将一部操作的结果作为参数床底出去，返回的是promise

promise新建后会立即执行

调用resolve 或者 reject 并不会终结promise执行

是因为resolve 或者 reject的Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务

then 返回的是一个新的promise实例















# 字符

每个字符固定为2个字节

`padStart` `padEnd` 字符串补全



# 对象

### 属性名表达式

```javascript
let propKey = 'foo'
let obj = {
  [propKey]: true;
  
}
```

 

# Object.assign(浅拷贝)



将每个源对象中可枚举（Object.propertyIsEnumerable()返回 true）

和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象