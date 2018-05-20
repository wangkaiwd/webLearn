## [函数](http://javascript.ruanyifeng.com/grammar/function.html)
### 函数定义
在JavaScript中，函数实际上是对象，每个函数都是`Function`构造函数的实例，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。函数定义有三种方式：
```js
// 写法一：函数声明（推荐写法）
function sum(num1,num2) {
  return num1 + num2;
}
// 写法二：函数表达式（推荐写法）
var sum = function (num1,num2) {
  return num1 + num2;
}
// 写法三：`Function`构造函数（不推荐写法）
var sum = new Function("num1","num2","return num1+num2");
```

### 函数声明与函数表达式
> 变量声明提升：`JavaScript`引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。即：所有的变量的声明语句（**只提升变量声明的过程，赋值过程并不会提升**），都会被提升到代码的头部。

函数名提升：JavaScript将函数名视同变量名，采用`function`命令声明函数时，整个函数会像变量声明一样,被提升到代码头部。
```js
console.log(sum(10,10)); // 20
function sum(num1, num2) {
  return num1 + num2;
}

// 通过函数表达式定义的函数不会进行函数声明提升
console.log(sum(10,10)); // Uncaught TypeError: sum is not a function
var sum = function(num1, num2) {
  return num1 + num2
}
```

不能在条件语句中声明函数
```js
// if后的条件判断结果尽管为false,
// 但是由于函数声明提升，function f() {}会提升到作用域顶部
if(false) {
  function f() {}
}

f(); // 不报错

// 要在条件语句中定义函数,只有使用函数表达式
if() {
  var f = function () {}
}
// 由于函数没有声明，会报错
f(); // Uncaught SyntaxError: Unexpected token )
```

### 函数的属性和方法

#### `name`属性
函数可以通过`name`属性来获取函数的名字
```js
// 获取函数参数的名字
var myFunc = function(){
function test(f) {
console.log(f.name);
}
test(myFunc); // "myFunc"
```

#### `length`属性
函数的`length`属性返回函数预期传入（即函数定义之中的参数个数）的参数个数
```js
// 定义了空的函数f
function f(a,b) {}
// `length`属性是定义时的参数个数。不管调用时输入了多少个参数
f.length // 2
```
**`length`属性提供了一种机制，判断定义时和调用时参数的差异**，以便实现面向对象编程的“方法重载”。（什么意思？）

#### `toString()` 方法
函数的`toString()`方法返回一个字符串，内容是函数的源码（包括注释）
```js
function f() {
  a();
  b();
  c();
}
f.toString()
/**
* 打印结果 
*
* "function f() {
*   a();
*   b();
*   c();   
* }"
*/
```