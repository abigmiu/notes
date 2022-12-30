js 单线程，执行一段死循环代码后无法执行后续代码

js 引擎 与 GUI 是互斥的。

setTimeOut 最低是4ms；

setInterval是每隔一段时间把任务推入event Queen