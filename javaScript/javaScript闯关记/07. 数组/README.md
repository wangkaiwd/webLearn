## [数组](http://javascript.ruanyifeng.com/grammar/array.html)
> javaScript数组是javaScript对象的特殊形式，数组索引实际上和碰巧是整数的属性名差不多。
> 通常，数组的实现是经过优化的，用数字索引来访问数组元素一般来说比访问常规的对象属性要快很多。

**本质上，数组属于特殊的对象**
```js
var arr = ['a','b','c'];
// JavaScript语言规定，对象的键名一律为字符串
arr[0] = 'a'; // 可以用数值读取，非字符串的键名会被转换为字符串
arr.0 // 报错，会认为是小数点
arr['1'] = 'b';
Object.keys(arr); // ["0","1","2"]
```
### 创建数组
> 1. 使用数组字面量
> 2. `new`关键字来创建数组

#### 数组字面量（推荐）
数组直接量中的值不一定要是常量，可以是任意的表达式
```js
var empty = []; // 空数组
var base = 1024;
var table = [ base, base+1, base+2, base+3];
// 任何类型的数据，都可以放入数组
var arr = [ {a:1},"hello world", [1,2,3], function() { return true; } ]
```
#### 使用`new`关键字
通过`new`关键字调用构造函数`Array()`创建数组，可以用三种方式调用构造函数
```js
// 调用时没有参数
var arr = new Array();
console.log(arr); // []

// 调用时有一个数值参数，它指定长度
var arr = new Array(10);
console.log(arr); // [empty x 10] 数组的长度为10，每一项为undefined

// 显示指定多个数组元素或者数组的一个非数值元素
var arr = new Array(5,4,3,2,1,"testing");
console.log(arr); // [5,4,3,2,1,"testing"]
```
### 稀疏数组
> 如果你确实遇到了稀疏数组，你的代码很可能像对待非稀疏数组一样来对待它们，只不过包含一些`undefined`值。
稀疏数组就是包含从0开始的不连续索引的数组。通常，数组的`length`属性值代表数组中元素的个数。如果数组是稀疏的，`length`属性值大于元素的个数。可以用`Array()`构造函数或简单的指定数组的索引值大于当前的数组长度来创建稀疏数组。
```js
var arr = new Array(5) // 数组没有元素，但是arr.length = 5;

var arr = []; // 创建一个空数组，arr.length = 0;
arr[1000] = 0; // 添加一个元素，arr.length被自动更新为10001;
```

当省略数组直接量中的值时（使用连续的逗号，比如[1,,3]）,这时得到的数组也是稀疏数组，**省略掉的值是不存在的**
```js
var a1 = [,'1','2']; // 此数组长度是3
var a2 = [undefined] // 此数组包含一个值为undefined的元素
console.log(0 in a1); // false, a1在索引0出没有元素
console.log(0 in a2); // true, a2在索引0处有一个值为`undefined`的元素
```

### 数组的长度
> 每一个数组有一个`length`属性，这个属性使其区别于常规的`JavaScript`对象。针对稠密（非稀疏）数组，`length`属性值代表数组中元素的个数。其值比数组中最大的索引大1。

数组的俩个特殊行为：
  * 如果为一个数组元素赋值，它的索引i大于或等于现有数组的长度时，`length`属性的值将设置为`i+1`.
  * 设置`length`属性为一个小于当前长度的非负整数`n`时，当前数组中那些索引值大于或等于`n`的元素将从中删除。
```js
var a = [1,2,3,4,5];
a.length = 3;
console.log(a); // [1,2,3];

a.length = 0; // 删除所有元素
console.log(a); // [] (空数组)

a.length = 5; // 长度为5，但是没有元素，相当于new Array(5)
```
通过`length`属性为数组末尾添加一个元素
```js
var a = [1,3,5];
a[a.length] = 7;
console.log(a); // [1,3,5,7]
```
> 在ECMAScript5中，可以用[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)让数组的`length`属性变成只读的。

### [数组常用方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)
