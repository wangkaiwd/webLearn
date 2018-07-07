# 你真的懂函数吗
## 定义
* 匿名函数
* 具名函数
* 箭头函数

## 词法作用域
```js
var global1 = 1
function fn1(param1){
    var local1 = 'local1'
    var local2 = 'local2'
    function fn2(param2){
        var local2 = 'inner local2'
        console.log(local1)
        console.log(local2)
    }

    function fn3(){
        var local2 = 'fn3 local2'
        fn2(local2)
    }
    fn3()
}
fn1() // "local1", "inner local2"
```
## call stack
> 可以理解函数的调用关系（如递归是如何调用的）  
1. 记录函数的执行位置
2. 执行函数
3. 返回函数执行时的位置，继续执行之后的代码  

例子:  
* [普通调用1+1+1](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gYSgpewogICAgY29uc29sZS5sb2coJ2EnKQogIHJldHVybiAnYScgIAp9CgpmdW5jdGlvbiBiKCl7CiAgICBjb25zb2xlLmxvZygnYicpCiAgICByZXR1cm4gJ2InCn0KCmZ1bmN0aW9uIGMoKXsKICAgIGNvbnNvbGUubG9nKCdjJykKICAgIHJldHVybiAnYycKfQoKYSgpCmIoKQpjKCk%3D!!!)
  ```js
  function a(){
    // 这里的console.log()也是一个函数，也会进入call stack中
    console.log('a')
  return 'a'  
  }

  function b(){
      console.log('b')
      return 'b'
  }

  function c(){
      console.log('c')
      return 'c'
  }

  a() // a
  b() // b
  c() // c
  ```
* [嵌套调用1>2>3](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gYSgpewogICAgY29uc29sZS5sb2coJ2ExJykKICAgIGIoKQogICAgY29uc29sZS5sb2coJ2EyJykKICByZXR1cm4gJ2EnICAKfQpmdW5jdGlvbiBiKCl7CiAgICBjb25zb2xlLmxvZygnYjEnKQogICAgYygpCiAgICBjb25zb2xlLmxvZygnYjInKQogICAgcmV0dXJuICdiJwp9CmZ1bmN0aW9uIGMoKXsKICAgIGNvbnNvbGUubG9nKCdjJykKICAgIHJldHVybiAnYycKfQphKCkKY29uc29sZS5sb2coJ2VuZCcp!!!)
  ```js
  function a(){
    console.log('a1')
    b()
    console.log('a2')
    return 'a'  
  }
  function b(){
    console.log('b1')
    c()
    console.log('b2')
    return 'b'
  }
  function c(){
    console.log('c')
    return 'c'
  }
  a()
  console.log('end')
  /**
  * 打印结果
  * 1. "a1" 2. "b1" 3. "c"
  * 4. "b2" 5. "a2" 6. "end"
  */
  ```
* [递归](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gZmFiKG4pewogICAgY29uc29sZS5sb2coJ3N0YXJ0IGNhbGMgZmFiICcrIG4pCiAgICBpZihuPj0zKXsKICAgICAgICByZXR1cm4gZmFiKG4tMSkgKyBmYWIobi0yKQogICAgfWVsc2V7CiAgICAgICAgcmV0dXJuIDEKICAgIH0KfQoKZmFiKDUp!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
  ```js
  function fab(n){
    console.log('start calc fab '+ n)
    if(n>=3){
        return fab(n-1) + fab(n-2)
    }else{
        return 1
    }
  }
  fab(5)
  "start calc fab 5"
  "start calc fab 4"
  "start calc fab 3"
  "start calc fab 2"
  "start calc fab 1"
  "start calc fab 2"
  "start calc fab 3"
  "start calc fab 2"
  "start calc fab 1"
  ```

**如果函数中还有嵌套其它函数的话，重复执行1,2步骤，直到函数中不再有函数，再通过3步骤一步步返回**  
## this&arguments
### `this`是函数隐藏的第一个参数，且必须是对象
> 函数直接调用相当于省略了`call`

`this`不传默认是`undefined`,`this`会自动指向全局对象。传入的`this`值为原始值（数字，字符串，布尔值）会自动指向它们的包装对象。

函数在进入的一瞬间要做的事情：
`f.call()`
* 记录函数当前的位置，放到`call stack`里面
* 记录传入的`this`，不传的话默认为`window`
* 最后传入`arguments`，不传为空数组"[]"
```js
function f() {
  console.log(this);
  console.log(arguments);
}
f.call(); // window []
f.call({name:"wangkaiwd"}); // {name:'wangkaiwd'}  []
f.call({name:"wangkaiwd"},1,2); // {name:'wangkaiwd'} [1,2]
```
### `this`为什么必须是对象
`this`是函数与对象之间的羁绊
首先我们定义一个对象：
```js
var person = {
  name: 'wangkaiwd',
  sayHi: function () {
    console.log("Hi , I am " + this.name);
  },
  sayBye: function () {
    console.log("Bye, I am " + this.name);
  },
  say: function (word) {
    console.log(`${word}, I am ${this.name}`);
  }
}
```
调用对象的方法
```js
// this指向函数的调用者
person.sayHi();
person.sayBye();
person.say('How are you');

// 相当于
person.sayHi.call(person);
person.sayBye.call(person);
person.say.call(person,'How are you');
```
一般来说比较疑惑的一个点
```js
var fn = person.sayHi;
fn(); // this => window  fn.call();
// output: "Hi, I am "      因为这里window.name = ""
window.name = "xxx";
// Function.prototype.call()  指定为null或者undefined的this值会自动指向全局对象window
// 值为原始值（数字，字符串，布尔值）的this会指向该原始值的自动包装对象
fn(); // output: "Hi, I am xxx"

person.sayHi(); // "Hi, I am wangkaiwd"
```

## `call`&`apply`
当我们不确定参数的个数时，或者参数有较多个时我们使用`apply`将参数作为数组传入，否则使用`call`一个一个传入会很麻烦
```js
function sum () {
  console.log(arguments);
  var n = 0;
  for(var i=0;i<arguments.length;i++) {
    n += arguments[i];
  }
  return n;
}

var arr = [1,2,3,4,5,6,7]
sum.call(null,1,2,3);
// arguments: [1,2,3]  n: 6

// 使用call调用每一项会很麻烦
sum.apply(undefined,arr)
// 相当于： sum.call(undefined, a[0],a[1],a[2],a[3]...a[6]);
// arguments: [1,2,3,4,5,6,7] n: 28
sum(arr) // sum.call(undefined,arr); // 在call时传入一个数组
// arguments: [[1,2,3,4,5,6,7]] n: "01,2,3,4,5,6,7"
```

## `bind`
`call`和`apply`是直接调用函数，而`bind`则是返回一个新函数（并没有调用原来的函数），这个函数会`call`原来的函数，`call`的参数由你指定

下面是一段伪代码，想要在点击`view.elemnet`的时候调用`view.onClick`方法
```js
// 错误写法
var view = {
  element: 'div',
  bindEvents: function() {
    this.element.onClick = function () {
      // 这里的this是this.element
      this.onClick();
    }
  },
  onClick: function() {
    this.element.addClass('active');
  }
}
```
正确写法：
```js
// 写法一(比较繁琐)
var view = {
  element: 'div',
  bindEvents: function() {
    // 提前储存this
    var _this = this;
    this.element.onClick = function () {
      // 这里的this是this.element
      _this.onClick();
      // 相当于 => _this.onClick.call(_this)
    }
  },
  onClick: function() {
    this.element.addClass('active');
  }
}

// 写法二（比较简洁）
var view = {
  element: 'div',
  bindEvents: function() {
    this.element.onClick = this.onClick.bind(this);
    // function() {
    //   // 这里call函数指定的this是bind中传入的this
    //   // (当然后面也可以传其它参数)
    //   this.onClick.call(this)
    // }
  },
  onClick: function () {
    this.element.addClass('active');
  }
}
```
这里我们可以模拟实现一下`bind`函数(结合`react`中通过`bind`改变`this`指向)
```js
this.onClick.bind = function (x,y,z) {
  return function () {
    var oldFn = this; // this => this.onClick
    return function() {
      // 第一参数为this对象
      oldFn.call(x,y,z);
    }
  }
}
```

## 柯理化/高阶函数
返回函数的函数
* 柯理化
  ```js
  // 柯理化之前
  function sum (x,y) {
    return x+y;
  }
  // 柯理化之后
  function addOne(y) {
    return sum(1,y);
  }
  ```
  柯理化可以将真实计算拖延到最后再做（闭包）
* 高阶函数
  > 在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：

  a. 接受一个或多个函数作为输入:`forEach,map,filter,reduce`  
  b. 输出一个函数: `lodsh.curry`  
  c. 不过它同时常常满足俩个条件：`Function.prototype.bind`

## 回调函数
名词形式：被当做参数的函数就是回调函数  
动词形式：调用这个回调  
**注意回调和异步没有任何关系**
```js
// 异步回调（setTimeout是异步的）
setTimeout(fn,1000) // fn是异步回调

// 同步回调
Array.prototype.map(fn) // fn是同步回调
```
`setTimeout`的回调函数中改变`this`指向
```js
/** 
* @param {function} fn: 想要在`delay``毫秒之后执行的函数
*   fn可以用字符串替代（不推荐）
* @param {Number} delay: 延迟的毫秒数
* @param {Any} : 附加参数（这里的1,2,3）,会做为参数传递给function(fn)
*/
setTimeout(fn.bind(fn),1000,1,2,3);
```
