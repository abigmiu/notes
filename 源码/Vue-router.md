version 3.5.1

下载源码 打包 编译， 将编译好的js 和 js。map放到测试项目里面， 这样就表示 sourcemap 映射成功了

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222622021.(null))

# install

```JavaScript
export function install (Vue) {
    // 判断是否已经安装过了
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined
    
    // 只在 router-view 组件里面有 registerRouteInstance 这个值
    // 用来为router-view组件关联或解绑路由组件用的即可
  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
    
    // 混入。 后续说
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        
                // 响应式定义_route属性，保证_route发生变化时，组件(router-view)会重新渲染Ï
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
      // 每一层的 _routerRoot 都是继承自父组件的
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
    
    
    // 这里不知道干嘛的
  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

# new Router

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222622247.(null))

开始构建一个 router 实例了

```
this.matcher = createMatcher(options.routes || [], this)
```

走 `createRouteMap` 映射路由

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222622327.(null))

## 判断路由模式

fallback 还有默认是 `hash` 模式

这里分析下 html5 history 模式

```JavaScript
export class HTML5History extends History {
  _startLocation: string

  constructor (router: Router, base: ?string) {
    super(router, base) // 继承 history

    this._startLocation = getLocation(this.base) // 获取开始进入的路由
  }
  
  setupListeners () {
    if (this.listeners.length > 0) {
      return
    }

    const router = this.router
    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      this.listeners.push(setupScroll())
    }

    const handleRoutingEvent = () => {
      const current = this.current

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === this._startLocation) {
        return
      }

      this.transitionTo(location, route => {
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    }
    window.addEventListener('popstate', handleRoutingEvent)
    this.listeners.push(() => {
      window.removeEventListener('popstate', handleRoutingEvent)
    })
  }
    
    /** 调用原生 history 的 go 方法 */
  go (n: number) {
    window.history.go(n)
  }
    
   /**  */
  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    
    // 继承自父类
    this.transitionTo(location, route => {
      pushState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(location, route => {
      replaceState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }
    
   /** 确定路由。看传值 push 还是 replace  */
  ensureURL (push?: boolean) {
    if (getLocation(this.base) !== this.current.fullPath) {
      const current = cleanPath(this.base + this.current.fullPath)
      push ? pushState(current) : replaceState(current)
    }
  }

  getCurrentLocation (): string {
    return getLocation(this.base)
  }
}
```

new router 完毕

https://juejin.cn/post/7012272146907037732#heading-5

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222624385.(null))

# 执行流程

new Vue => 调用 beforeCreate 函数。

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222628376.(null))

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222622239.(null))

因为在 new Vue的时候传入了 router 选项， 这里就调用第23行的判断。 设置当前跟路由信息。

# 如何更改 url

在 init 的时候做了如下处理 

```JavaScript
history.transitionTo(
        history.getCurrentLocation(),
        setupListeners,
        setupListeners
      )
```

调用 transitionTo。 这个方法是 父类 History 进行定义的

```JavaScript
transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    let route
    // catch redirect option https://github.com/vuejs/vue-router/issues/3201
    try {
      route = this.router.match(location, this.current)
    } catch (e) {
      this.errorCbs.forEach(cb => {
        cb(e)
      })
      // Exception should still be thrown
      throw e
    }
    const prev = this.current
    this.confirmTransition(
      route,
      () => {
          // 这里更新路由（1）

        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()
        this.router.afterHooks.forEach(hook => {
          hook && hook(route, prev)
        })

        // fire ready cbs once
        if (!this.ready) {
          this.ready = true
          this.readyCbs.forEach(cb => {
            cb(route)
          })
        }
      },
      err => {
        if (onAbort) {
          onAbort(err)
        }
        if (err && !this.ready) {
          // Initial redirection should not mark the history as ready yet
          // because it's triggered by the redirection instead
          // https://github.com/vuejs/vue-router/issues/3225
          // https://github.com/vuejs/vue-router/issues/3331
          if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
            this.ready = true
            this.readyErrorCbs.forEach(cb => {
              cb(err)
            })
          }
        }
      }
    )
  }
  
// 这里更新路由（1）
updateRoute (route: Route) {
    this.current = route
    this.cb && this.cb(route)
}
```