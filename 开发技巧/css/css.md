# 宽高等比

`accecp-ratio`  有兼容性问题

`padding-top/bottom`和`margin-top/bottom`都是相对于父元素的宽度来计算的，我们可以利用这一属性来实现我们的需求。

```css
.scale {
  width: 100%;
  height: 0;
  padding-bottom: 50%;
}
```

