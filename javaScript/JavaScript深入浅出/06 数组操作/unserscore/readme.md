# `underscore.js`源码学习

> 结合个人实现方式以及官方文档、mdn 和第三方优秀博客总结，深入学习`javascript`函数、数组以及对象

## 学习资料

- [`underscore.js`](https://underscorejs.org/#compact)
- [`annotated source`](https://underscorejs.org/docs/underscore.html)
- [带有中文注释的`underscore.js`源码解读](https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js)

## 源码理解

### 1. 我不知道的`undefined`

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined):
>
> - `undefined`是**全局对象**的一个属性
> - 一个没有被赋值的变量的类型是`undefined`.(如果方法或者是语句中**操作的变量没有被赋值，则会返回`undefined`**)
> - 一个函数如果没有使用`return`语句指定返回值，就会返回一个`undefined`值

用来判断一个变量的值是否为`undefined`有三种方法：

1. 严格相等

    ```js
    var x
    if (x === undefined) {
      // execulate some code
    } else {
      // execulate some code
    }
    ```

2. `typeof`操作符

   > typeof 不会在一个变量没有被声明的时候抛出一个错误

    ```js
    var x
    if (typeof x === 'undefined') {
      // execulate this code
    }
    ```

3. `void`操作符

    ```js
    var x
    if (x === void 0) {
      // execulate this code
    }
    ```

一般我们常用的可能是第一种方法，然而第一种方法忽略了一个问题：**`undefined`是一个全局对象的属性**。这说明它可以在局部作用域内进行修改  
```js
function fn() {
  var undefined = 'xxx';
  console.log(typeof undefined,undefined)
}
fn() //  'string' 'xxx'
```
在`underscore.js`中通过第三种方法`void 0`来实现`undefined`,既简单又避免了`undefined`在局部被修改的情况。  
> `void`:运算符对给定的表达式求值，然后返回`undefined`。`void`运算符通常**只用来获取`undefined`的原始值，一般使用`void(0)`(等同`void 0`)。

## 自己实现`underscore.js`中的一些方法

> 结合`underscore.js`以及 es6 中来重新编写

### 1. `flatten`函数

```js
const flatten = (array, shallow, output = []) => {
  array.map(item => {
    // 这里的数组其实有三种：1. 伪数组， 2. 真实数组 3. arguments对象
    // 判断是否是数组： 1. Array.isArray(item) === true 2. Object.prototype.toString.call(item) === '[object Array]'
    if (toString.call(item) === '[object Array]') {
      if (shallow) {
        item.map(subItem => output.push(subItem))
        return
      }
      return flatten(item, shallow, output)
    }
    output.push(item)
  })
  return output
}
console.log(flatten([1, [2], [3, [[4]]]], true))
```
