## 基本包装类型
为了便于操作基本类型值，JavaScript还提供了3个特殊的引用类型：`Boolean`,`Number`和`String`。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。
```js
var s1 = "some text";
var s2 = s1.substring(2); // "me text"
// 后台创建对应的string包装类型的String对象
```
当第二行代码访问`s1`时，访问过程属于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式访中访问字符串时，后台都会完成下列处理。  
1. 创建`String`类型的一个实例
2. 在实例上调用这个方法
3. 销毁实例
可以将以上三个步骤想象成是执行了下列JavaScript代码
```js
var s1 = new String("some text");
var s2 = s1.substring(2); 
s1 = null;
```

使用`new`操作符创建的引用类型的实例，在执行流离开当前作用域之前一直都保存在内存中。而自动创建的基本包装类型的对象，则只存在一行代码执行的瞬间，然后立即被销毁。这意味着我们不能在运行时为基本类型值添加属性和方法。
```js
var s1 = "some text";
s1.color = "red";
console.log(s1.color); // undefined
```

### 字符串的操作方法
