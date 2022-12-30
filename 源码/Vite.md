先看 package.json 

入口文件是 vue-dev-server.js

```
#!/usr/bin/env node
```

![img](/Users/abigmiu/Documents/notesSyncWithGithub/源码/assets/(null)-20221230222522239.(null))

在 vueMiddle 中判断请求的文件后缀进行不同的处理。 对于 js 或 vue 文件进行 babel 转义