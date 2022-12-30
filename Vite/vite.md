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
