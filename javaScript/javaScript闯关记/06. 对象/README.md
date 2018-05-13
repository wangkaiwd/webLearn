## 对象
### 创建对象
> 1. 使用对象字面量
> 2. new 关键字
> 3. ECMAScript5中的`object.create()`函数

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
person.name = "stone",
person.age = "28"
```

### 属性的访问错误
查询一个不存在的属性并不会报错
```js
var person = {};
person.wife; // undefined;

person.wife.name; // Uncaught TypeError: Cannot read property 'name' of undefined

// 避免访问属性出错
var name = person && person.wife && person.wife.name;
// person.wife => undefined 转换为boolean值为fale,返回person.wife
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

`hasOwnProperty()`:指示对象**自身属性中**，是否具有指定的属性。对于继承属性他将返回`false`
```js
var obj = { x : 1 };
console.log(obj.hasOwnProperty("x")); // true, x是obj的自有属性
console.log(obj.hasOwnProperty("y")); // false, y不是obj的自由属性
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
