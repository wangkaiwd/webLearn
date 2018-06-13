# 你真的懂函数吗
## 定义
* 匿名函数
* 具名函数
* 箭头函数

## 词法作用域

## call stack
> 可以理解函数的调用关系（递归是如何调用的）

## this&arguments
### `this`是函数隐藏的第一个参数，且必须是对象 
> 函数直接调用相当于省略了`call`

不传默认是`undefined`,`this`会自动指向全局对象。传入的`this`值为原始值（数字，字符串，布尔值）会自动指向它们的包装对象。  

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
sum(arr)
// arguments: [[1,2,3,4,5,6,7]] n: "01,2,3,4,5,6,7
```