### js 数据类型

1.  **Number**(数字)
2.  **String**(字符串)
3.  **Boolean**(布尔)
4.  **Symbol**(符号，第六版新增)
5.  **Object(对象)**
    1.  function(函数)
    2.  Array(数组)
    3.  Date(日期)
    4.  RegExp(正则表达式)
6.  **null**(空)
7.  **undefined**(未定义)

**`var`声明变量但未对其初始化时,这个变量的值就是`undefined`,直接使用未声明的变量会产生错误。对未声明或已声明但未初始化的变量执行`typeof`运算符会返回`undefined`值**

```js
var message // 这个变量声明之后默认取得了`undefined`值
// var age; // 这个变量并没有声明
console.log(message) // "undefined"
console.log(age) // 报错

console.log(typeof message) // "undefined"
console.log(typeof age) // "undefined"
```

### 数据类型检测

> 推荐阅读：[JavaScript 检测原始值、引用值、属性](http://shijiajie.com/2016/06/20/javascript-maintainable-javascript-validate1/)

#### 1. [`typeof`运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

![](./images/typeof.png)

* `typeof`是一个运算符而不是函数

  ```js
  const message = 'some string'

  console.log(typeof message) // "string"  推荐写法
  // "string" typeof是一个运算符，不推荐这样写
  console.log(typeof message)
  console.log(typeof 95) // "number"
  ```

* 如果值未声明或已声明但未初始化:`undefined`
  ```js
  // 值未声明并不会报错，而是undefined
  console.log(typeof aaa) // "undefined"
  ```
* 如果值为函数：`function`
  ```js
  function fn() {
    console.log('我是函数')
  }
  console.log(typeof fn) // "function"
  ```
* 杜绝使用`typeof`来检测`null`的类型

#### 2. [`instanceof`运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

#### 3. [`Object.toString.call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

#### 4. [`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

### 判断属性是否存在

判断属性是否存在的最好的方法是使用`in`运算符。

### 数据类型转换

#### 强制类型转换
> 可以自定义`valueOf`和`toString`方法的返回值内容  
> Number()
> String()
> Boolean()
> 用这三个函数手动将各种类型的值,分别转换成数字、字符串或布尔值
##### 转换为`Number`类型
转换规则如下：

```js
// 原始类型值
// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值,则转换为相应的数值
Number('324') // 324
// 字符串：如果不可以被解析为数值，返回NaN
Number('324abc') // NaN
// 空字符串转为0
Number('') // 0

// 布尔值: true 转为 1, false 转为 0
Number(true) // 1
Number(false) // 0
// null和undefined
Number(undefined) // NaN
Number(null) // 0

// 对象
// 规则：Number方法的参数是对象时,将返回NaN,除非是包含单个数值的数组。
Number({a: 1}) // NaN
// 数组调用toString方法的时候会组成逗号连接的字符串
Number([1, 2, 3]) // "1,2,3" 转换为Number由于有逗号：NaN
Number([5]) // "5" 转换为Number为数值：5
```
`Number`背后的转换规则：
1. 调用对象自身的`valueOf()`方法。如果返回原始类型的值,则直接对该值使用`Number`函数,不再进行后续步骤。
2. 如果`valueOf()`方法返回的还是对象,则改为对象自身的`toString()`方法，如果`toString()`方法返回原始类型的值,则对该值使用`Number`函数,不再进行后续步骤。
3. 如果`toString()`方法返回的是对象,就报错。  

转化对象的例子：
```js
var obj = {x:1};
Number(obj) // NaN
// 执行过程
if(typeOf obj === 'object') {
  // obj.toString({x:1}) : "[object Object]"
  Number(obj.toString()); // NaN
}
else {
  Number(obj.valueOf())
}
```

##### 转换为`String`类型
`String`可以将任意类型的值转化为字符串，转换规则如下：
* (1)原始类型值
```js
// 数值
String(123) // "123"
// 字符串
String('abc') // "abc"
// 布尔值
String(true) // "true"
// undefined
String(undefined) // "undefined" 
// null
String(null) // "null"
```
* (2)对象
```js
// String方法的参数如果是对象，返回一个类型字符串；如果是数组,返回该数组的字符串形式
String({a:1}) // "[object Object]"
String([1,2,3])  // "1,2,3"
```
`String`方法背后的转换规则：
1. 先调用对象自身的`toString`方法。如果返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
2. 如果`toString`方法返回的是对象，再调用原对象的`valueOf`方法。如果`valueOf`方法返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
3. 如果`valueOf`返回的是对象，就报错。

下面是一个例子：
```js
String({a:1}); // "[object Object]"
// 等同于
String({a:1}.toString()) // "[object Object]"
```

##### 转换为`Boolean`类型
<font color="red">转换为 boolean 值</font>  
![](./images/shujuleixing.png)
除了以下5个值得转换结果为`false`,其他的值全部为`true`
> undefined  
> null  
> -0 或 +0  
> NaN  
> ''（空字符串）

```js
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false
```

#### 自动转换
##### 自动转换为字符串
> 先将复合类型的值转换为原始类型的值，再将原始类型的值转为字符串

```js
'5' + 1 // '51'
'5' + true // '5true'
'5' + {} // '5[object Object]'
'5' + [] // '5'
'5' + function() {} // '5function() {}'
'5' + undefined // '5undefined'
'5' + null // '5null'
```

##### 自动转换为数值
> 先分别转换为数值类型再进行转换
```js
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
// Number([]) // 0
// 5 * 0 // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
```