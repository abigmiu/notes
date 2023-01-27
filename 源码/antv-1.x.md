# npm start

会根据 webpack。config.js 读取 /components 里面的 index。 如果是 script link 的方式引入 vue， 会自动安装 antd

```javascript
// components/index.js

const install = function(Vue) {
  components.map(component => {
    Vue.use(component);
  });

  Vue.prototype.$message = message;
  Vue.prototype.$notification = notification;
  Vue.prototype.$info = Modal.info;
  Vue.prototype.$success = Modal.success;
  Vue.prototype.$error = Modal.error;
  Vue.prototype.$warning = Modal.warning;
  Vue.prototype.$confirm = Modal.confirm;
  Vue.prototype.$destroyAll = Modal.destroyAll;
};

console.log('Antd index');
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  console.log('Vue in Window');
  install(window.Vue);
}
```





在 examples/index.js 里面用了 Vue.use（Antd). 也会安装所有的 antd 组件





# utils

## VuePropTypes

Props 定义

`withDefault` 将 value 转成了一个函数，在函数里面设置 props 的 default



