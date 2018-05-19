## [对象](http://javascript.ruanyifeng.com/grammar/object.html)
### 创建对象
> 1. 使用对象字面量
> 2. new 关键字
> 3. ECMAScript5中的`object.create()`函数

**对象的所有键名都是字符串**，加不加引号都可以。**如果键名是数值，会被自动转为字符串**
```js
var obj = {1:'a',2:'b'};
// 这里的键名1和2都被自动转为了字符串
```

如果键名不符合标识符的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号，否则会报错。
```js
// 报错
var obj = { 1p:"Hello World" };

// 不报错
var obj = {
  "1p":"Hello World",
  "h w":"Hello World",
  "p+q":"Hello World", // 最后一个属性可以加",",也可以不加
}
```
#### 使用对象字面量创建对象(推荐)
```js
// 推荐写法
var person = {
  name: "stone",
  age: "28",
}

// 也可以这样写
var person = {}
person.name = "stone",
person.age = "28",
```

#### new 关键字
```js
var person = new Object();
person.name = "stone",
person.age = "28",
```

#### [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
`Object.create()`方法创建一个新对象，其中第一个参数是这个对象的原型，提供第二个可选参数，用以对对象属性进行进一步描述。
```js
// 创建对象
var person = Object.create(Object.prototype);
person.name = "stone";
person.age = "28";

// 创建一个纯净的对象（有什么用？）
var pureObj = Object.create(null);
// 不会从Object类继承任何方法
console.log(pureObject.toString); // undefined
```

### 属性的访问错误
查询一个不存在的属性并不会报错
```js
var person = {};
person.wife; // undefined;
// 错误原因：null和undefined值都没有属性，查询这些值的属性会报错
person.wife.name; // Uncaught TypeError: Cannot read property 'name' of undefined

// 避免访问属性出错
var name = person && person.wife && person.wife.name;
// person.wife => undefined 转换为boolean值为fale,返回person.wife
```

数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符
```js
var obj = { 123:"hello world" };
obj.123 // 报错
// 会自动转为字符串
obj[123] // "hello world"

obj['123'] // "hello world"
```
### 检测属性
> 判断属性是否存在于某个对象中

[`in`运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)：如果指定的属性在指定的对象或其原型链中，则in运算符返回true

更简单的方法使用`!==`判断一个属性是否是`undefined`来判断属性是否存在
```js
// 当有一个属性值是undefined时将无法进行判断
var obj = {x:1};
// true, x是obj的属性
console.log(obj.x !== undefined);
// false, y不是obj的属性
console.log(obj.y !== undefined);
```

`hasOwnProperty()`:指定对象**自身属性中**，是否具有指定的属性。对于继承属性他将返回`false`
```js
var obj = { x : 1 };
console.log(obj.hasOwnProperty("x")); // true, x是obj的自有属性
console.log(obj.hasOwnProperty("y")); // false, y不是obj的自有属性
// false,toString是继承属性
console.log(obj.hasOwnProperty("toString"));
```

**`in`运算符可以区分不存在的属性和存在但值为`undefined`的属性**，在判断一个对象是否有某个属性时，最好使用`in`运算符。
```js
var obj = {x:undefined}
console.log("x" in obj); // true;
```
> [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用`for...in`循环遍历该对象时返回的顺序一致（`for...in`循环还会枚举其原型链上的属性）
```js
var obj = {100:"a", 2:"b", 7: "c"};
// [ "2", "7", "100" ],对象的属性是一个字符串，顺序并不固定
console.log(Object.keys(obj));
```

### `for...in`循环
`for...in`循环有2个注意点:
* 遍历的是所有可遍历(enumerable)的属性，会跳过不可遍历的属性
* 不仅遍历对象自身的属性,还遍历继承的属性。
  ```js
  var person = { name: "老张" };
  // 一般情况下，只想遍历对象自身的属性
  // 所以在使用for...in循环的时候,应该结合使用hasOwnProperty方法
  // 在循环内部判断一下,某个属性是否为对象的自身属性
  for(var k in person) {
    if(person.hasOwnProperty(k)) {
      console.log(k);
    }
  }
  ```
> for...in和for...of的区别：
> for...in是遍历属性值，然后进行操作。而for...of是遍历属性名然后进行操作

> 推荐阅读：
> 1. [面试官：请你实现一个深克隆](https://juejin.im/post/5abb55ee6fb9a028e33b7e0a)
> 2. [MDN|Object.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)(Object对象原型上的方法)
> 3. [MDN|Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)(Object构造函数的方法)
