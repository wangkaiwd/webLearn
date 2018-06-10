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
> 函数不调用不执行

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

### `arguments`对象
`arguments`:包含了函数运行时的所有参数,这个函数只可以在函数体内部使用.
```js
// 正常模式arguments对象可以在运行时修改
var f = function(a,b) {
  // 参数在内部被修改
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}
f(1,1); // 5

// 严格模式下,arguments对象是一个只读对象，修改它是无效的,但不会报错
var f = function(a,b) {
  "use strict"; // 开启严格模式
  // 不会报错
  arguments[0] = 3; // 无效
  arguments[1] = 2; // 无效
  return a + b;
}
f(1,1); // 2
```
`arguments.length`:函数实参的个数  
`函数名.length`：函数形参的个数
```js
function f() {
  console.log(f.length);
  console.log(arguments.length);
}
f(1,2,3); // 0   3
f(1); // 0   1
f(0); // 0   1
```

`arguments`是伪数组,可以使用数组的属性，但是不能使用数组的方法  
下面是俩种常用的转换方法：
```js
/**
* 通过slice方法
* arr.slice(); // 不传参数从头截取到尾
* 然后通过call改变this指向 
*/
var args = Array.prototype.slice.call(arguments);

// 逐一填入新数组
var args = [];
for(var i=0; i<arguments.length; i++) {
  args.push(arguments[i]);
}
```

`callee`:`arguments`对象带有一个`callee`属性，返回它所对应的原函数。
```js
var f = function () {
  console.log(arguments.callee === f);
}
```
可以通过`arguments.callee`,达到调用函数自身的目的。这个在严格模式是禁用的，因此不建议使用。

### 函数参数
> 1. 函数参数不是必需的，JavaScript允许省略参数
> 2. 实参传多了放着不用，传少了用`undefined`补齐

函数在运行的时候，有时需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据就叫参数。
```js
// 没办法只省略靠前的参数，而保留靠后的参数
function (a,b) {
  return a;
}
// 省略第一个参数会报错
f(,1); // SyntaxError: Unexpected tokenj, (...)
f(undefined,1); // undefined
```

### 简单的闭包
将某个对象按照其属性值进行排序
```js
function createComparisonFunction(propertyName) {
  return function(object1,object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if(value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }
}

var data = [{name:"Zachary",age: 28},{name:"Nicholas",age: 29}];
data.sort(createComparisonFunction("name"));
console.log(data); // 按照name属性进行排序: [{name:"Nicholas",age: 28},{name:"Zachary",age: 29}]

data.sort(createComparisonFunction("age"));
console.log(data);
```

闭包的俩个最大用处：
1. 可以读取函数内部的变量
2. 让函数内部的变量始终保存在内存中，即闭包可以使得它诞生环境一直存在
```js
// 函数外部无法获取函数内部声明的变量
function f1() {
  var n = 999;
}
console.log(n); // Uncaught ReferenceError: n is not defined

// 读取函数内部的变量
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}
var result = f1(); // 保存状态
result(); // 999 获取到函数内部的变量
```
闭包使得内部变量记住上一次调用时的运算结果
```js
function createIncrementor(start) {
  return function () {
    return start ++;
  }
}
var inc = createIncrementor(5);
inc() // 5
inc() // 6
inc() // 7
```
> 推荐阅读：  
> 1. [闭包详解](https://juejin.im/post/5b167b476fb9a01e5b10f19b?utm_source=gold_browser_extension)(从词法作用域到高阶函数)

### 立即调用的函数表达式
> 有时我们需要在定义函数之后，立即调用该函数

`function`这个关键字既可以当作语句，也可以当作表达式
```js
// 语句
function f() {}

// 表达式
var f = function f() {}
```

如果`function`关键字出现在首行，一律解释成语句。`JavaScript`引擎看到行首是`function`关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。
```js
function(){/* code */}()
// SyntaxError: Unexpected token
```
解决方法：不要让`function`出现在行首，让引擎将其理解成一个表达式。最简单的处理就是将其放在一个圆括号里面。
```js
/**
*  俩个函数之间必须要有分号（";"），
*  否则JavaScript会将它们连在一起解释，将第二行解释为第一行的参数。
*/ 
(function() {
  /*code*/
})();
(function() {
  /*code*/
})()
```
匿名函数的立即执行：  
1. 不必为函数命名，避免了污染全局变量
2. 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量