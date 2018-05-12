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
