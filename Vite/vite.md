# 什么是构建工具

- 模块化支持
- 多种格式的模块化。 `require` `import`
- 处理代码兼容性（babel 语法降级，less， ts语法转换）。构建工具将对应的处理工具进行自动化处理
- 提供项目性能（压缩文件， 代码分割）
- 优化开发体验（自动监听文件变化。调用集成工具进行重新打包）

# vite相比于 webpack 的优势

webpak 支持多种模块化。 需要转换成统一的模块化代码。 需要将所有的文件（依赖）都读取一遍

# 启动

`yarn create vite` => `yarn add create-vite` 然后运行 create-vite bin目录下的文件



依赖预构建

vite 用 esbuild 转成 esm。 放到node-modules/.vite/deps





# 环境变量配置

为什么 vite.config.js 可以书写成 esmodule 形式？node 会读取形式转成 commonjs



默认开发环境 `development`

默认生产环境 `production`



Import.meta.meta（客户端用）会做拦截，以 `VITE_` 开头的才会注入进去。可以在config 里面通过 envPrefix 进行改变前缀

# vite是怎么让浏览器可以识别.vue文件的

```javascript
app.get('/src/App.vue', async (req, res) => {
    const content = await fs.promises.readFile('./src/App.vue');
    res.setHeader('Content-Type', 'text/javascript');
    res.send(content);
})
```

先转成 js 的 ast。用 js 来解析



# 在vite 中处理 css

1.读取到 js 中引用了 css

2.用fs 模块去读取 css 文件中的内容

3

4. 将 css 的内容替换为 js。方便热更新或者css 模块化

4.创建一个 style 标签， 将 css中的内容赋值到 style 标签里面

5 将style 标签插入到 html 的 head 里面(vite 的 `updateStyle 方法`)



# module css

读取到后缀名为 module 后。 会对所有类名进行一定规则的替换 。同时创建一个映射对象{ footer：“footer——hash”}。将替换过的内筒放进 head 标签。将 module。css 全部磨出， 替换成 js 脚本。 将创建的映射对象在脚本中进行默认导出

