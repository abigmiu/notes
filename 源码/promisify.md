将回调函数转为异步函数

```TypeScript
function promisify(original) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push((err, value) => {
                if(err) {
                    reject()
                } else {
                    resolve(value)
                }
            })
            // 相当于original.apply(this, args)
            Reflect.apply(original, this, args)
        })
    }
}
const loadImg = function(src, callback) {
        const img = document.createElement('img')
        img.src = src
        img.style = 'width: 200px;height: 280px';
        img.onload = callback(null, src) // 正常加载时，err传null
        img.onerror = callback(new Error('图片加载失败'))
        document.body.append(img);
    }
const loadImgPromise = promisify(loadImg)
const load = async () => {
    try {
        const res = await loadImgPromise('https://cdn.huaban.com/home/202201210156-1e92.png')
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}
load()
```