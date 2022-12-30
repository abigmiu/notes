本质： 树

Attr（改变html标签结构）

- getAttibute
- setSttribute

property



## 节点

text也算是node

target是事件的真正目标

currentTarget是事件处理程序注册的元素

## 操作

`createElement`

`appendChild` (移动节点)

`removeNode`

`parrentNode`

`childNodes`





## nodeType

`3` 文本



## 性能

1. 查询做缓存
2. 将多次操作变为一次

`createDocumentFragment`



# bom

navigator

- userAgent
- screen
    - width
    - height
- location
    - href
    - protocol
    - host
    - search
    - hash
    - pathname

- history
    - back
    - forward





# 窗口位置

现代浏览器提供了 `screenLeft` 和`screenTop` 属性，用于表示窗口相对于屏幕左侧和顶部的位置 ，返回值的单位是 CSS 像素。

```javascript
// 把窗口移动到左上角
window.moveTo(0,0); 
// 把窗口向下移动 100 像素
window.moveBy(0, 100)
```

outerWidth 和 outerHeight 返回浏览器窗口自身的大小（不管是在最外层 window 上使用，还是在窗格<frame>中使用）。innerWidth和 innerHeight 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。



度量文档相对于视口滚动距离的属性有两对，返回相等的值：window.pageXoffset/window. scrollX 和 window.pageYoffset/window.scrollY。可以使用 scroll()、scrollTo()和 scrollBy()方法滚动页面。