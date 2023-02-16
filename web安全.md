# sql 注入

目前危险性不高



在以上流程中，我们可以发现，登录账号的核心是数据库，而 SQL 是面向数据库的语法，并且部分依赖前端的输入，也就是说我们能在一定程度上控制 SQL 语句(PS: 本文的后端设计是以支持 SQL 注入攻击的方式开发的)；

```sql
function signIn(username, password) {
  const sql = `select * from users where username='${username}' and password=${password}`
  
	Mysql.query(sql);
}
复制代码
```

正常情况下，服务端基于正确的账号和密码拼出的 SQL 在执行时，肯定能够查询出存在的数据，使得成功登录；反之，错误的账号密码肯定无法登录；但是，如果网站存在 SQL 注入攻击的漏洞，只要输入一些特殊字符，在不需要知道账号的情况下也可以正常登录。

我们在页面的登录框中输入如下信息即可完成在不需要正确账号密码的情况完成登录：

```ini
账号: 'or 1=1#
密码: aaaaaaa
```



作者：专有钉钉前端团队
链接：https://juejin.cn/post/7066950367078154253
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



上面的代码就不解释太多了，只讲一个语句：

$sql="select * from users where username='$name' and password='$pwd'";
1
1
明显的，如果我们输入的是正确的用户名与密码，肯定就可以登陆进去，错的就不行。但是这个验证机制可以通过SQL语句来构造一个特殊的“字符串”通过验证。

比如我们再用户名中输入 ’or 1=1#，密码随便写。

我们把它带入到上面的那条语句中，就变成了

select * from users where username=’’ or 1=1#’ and password=balabala

我们分析下语义，在SQL语法中 # 是注释符，所以后面的语句都会杯注释掉，那么上面的语句就等价于

select * from users where username=’’ or 1=1

我们知道SQL语句中where相当于判断语句，并且是由 or 连接的，所以 username=’’ 和 1=1 中有一个为真就为真。1=1肯定为真，所以语句又等价于

select * from users

这个语句的作用是爆出表中的所有字段。

# Cross-Site Scripting (XSS 跨站脚本攻击)

## 存储型 xss

将输入框里面的内容提交到服务器。

解决办法： 将代码进行转义提交

## 反射型 XSS

在 Web 提交给服务端的数据，立刻用于解析和显示该用户的结果页面，例如分享的链接，诱导用户点击完成获取用户的信息。

防范措施：服务端对数据进行处理

## DOM 型 XSS

DOM—based XSS 漏洞是基于文档对象模型(Document Objeet Model，DOM)的一种漏洞；与反射型 XSS 类似，DOM XSS 是不经过服务端的 Web 端攻击，Web 端不对 URL 上的数据做处理并动态插入到 HTML 中，导致了该攻击。

防范措施：前端对 HTML / Script 代码进行转义。



作者：专有钉钉前端团队
链接：https://juejin.cn/post/7066950367078154253
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# CSRF(Cross Site Request Forgery)，即跨站请求伪造