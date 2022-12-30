**学习资料** https://jkchao.github.io/ 深入理解typescript

# **断言**

```TypeScript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

# Parameters

```TypeScript
return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {
                ...config,
                token: user?.token
        })
```

# partail

将所有类型改为可选

# Omit 

删除部分类型·

```TypeScript
type Person = {
  name: string,
  age: nuber
}

const newPerson: Omit<Person, 'age'> = {
  name: 'xiaoming'
}
```

# keyof

取出所有的键

# pick

在对象里面里挑出所需要的

```TypeScript
Pick<Person, 'name' | 'age'>
```

# Exclude

过滤所输入的

# 定义全局对象

```TypeScript
declare global {
        namespace LogisticsBaseJS {
    function showToast(string): void;
    function showDialog(string): void;
    function getStatusHeight(): string;
  }
  namespace LogisticsUserJS {
    function getUserInfo(): string;
    function tokenInvalid(): void;
  }
}
```

# 映射类型语法：

```TypeScript
{ [ P in K ] : T }
{ [ P in K ] ?: T } 
{ [ P in K ] -?: T }
{ readonly [ P in K ] : T }
{ readonly [ P in K ] ?: T }
{ -readonly [ P in K ] ?: T }
```