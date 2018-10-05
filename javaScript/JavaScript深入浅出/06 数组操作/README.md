# 数组操作

## `join`
简单的数组操作  
```js
var array = ['a','b','c'];
array.join('-') // result is : 'a-b-c'
```
1. array.join实际上是Array.prototype.join对应的函数（从原型上继承来的）
2. array.join => 等价于array.join(array,'-')
3. join函数可以通过`this`和`arguments[0]`来得到`array`和`-`俩个值

简单实现array.join:
```js
Array.prototype.join = function(symbol) {
  let result = this[0] || '';
  for(let i=1;i<this.length;i++) {
    result += symbol + this[i]
  }
  return str
}
```

## `slice`
使用语法
```js
array.slice(startIndex,endIndex)
```
简单实现
```js
Array.prototype.slice = function(start=0,end=this.length) {
  const result = [];
  for(let i=start;i<end;i++) {
    result.push(i);
  }
  return result;
}
```

## `forEach`
[经典面试题](https://jsbin.com/mubepip/edit?html,js,output)
