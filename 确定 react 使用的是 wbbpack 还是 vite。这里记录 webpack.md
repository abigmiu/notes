确定 react 使用的是 wbbpack 还是 vite。这里记录 webpack



# 安装 craco

```shell
pnpm add @craco/craco -D
```



修改 package.json

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
}
```



# 安装 windicss-webpack-plugin

```shell
pnpm add windicss-webpack-plugin -D
```



create config file

```javascript
// craco.cofig.js

const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

module.exports = {
    webpack: {
        plugins: {
          add: [
            new WindiCSSWebpackPlugin({
              virtualModulePath: 'src',
            }),
          ],
        },
      },
    
}
```



create windi config

```typescript
// windi.config.ts
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,js,css,html,ts,tsx}'],
    exclude: ['node_modules', '.git', '.next'],
  },
})
```

在入口文件里面引入 windicss

```typescript
// src/index.tsx
import './virtual:windi.css'
```

