# 页面初次加载 loading 的处理

```HTML
<div id="app">
    <div class="appLoading"></div>
</div>
import { createApp } from 'vue';
import App from './App.vue';
import AppLoading from './components/common/AppLoading.vue';
async function setupApp() {
  const appLoading = createApp(AppLoading);
  appLoading.mount('#appLoading');
  const app = createApp(App);
  app.mount('#app');
}

setupApp();
```

# css js 等静态资源的引入

新建一个 `setupAssets` 文件进行引入

# 策略模式的使用

```TypeScript
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some(item => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}


const actions: Common.StrategyAction[] = [
    // 已登录状态跳转登录页，跳转至首页
    [
      isLogin && to.name === routeName('login'),
      () => {
        next({ name: routeName('root') });
      }
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin,
      () => {
        next();
      }
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin,
      () => {
        const redirect = to.fullPath;
        next({ name: routeName('login'), query: { redirect } });
      }
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin && needLogin && hasPermission,
      () => {
        next();
      }
    ],
    [
      // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
      isLogin && needLogin && !hasPermission,
      () => {
        next({ name: routeName('403') });
      }
    ]
  ];

  exeStrategyActions(actions);
```

# scrollBehavior

跳转 hash。 querySelector 好像查找不到 hash

```TypeScript
if (to.hash) {
  const el = document.querySelector(to.hash);
  if (el) {
    resolve({
      el,
      behavior: 'smooth'
    });
  }
}
```

# axios

`handleServiceResult`  `handleBackendError` `handleResponseError` `handleAxiosError` 针对不同的情况进行处理