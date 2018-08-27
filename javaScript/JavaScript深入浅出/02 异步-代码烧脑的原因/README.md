# 异步-代码烧脑的原因
## 同步与异步
同步：等待结果  
异步：不等待结果

**异步常常伴随回调一起出现，但是异步不是回调，回调也不一定是异步**
```js
// 同步的sleep
function sleep(seconds) {
  var start = new Date();
  for(;new Date() - start < seconds * 1000;) {

  }
}
console.log(1);
sleep(3);
console.log('wake up');
console.log(2);
```

```js
// 异步的sleep
function sleep(seconds,fn) {
  setTimeout(fn,seconds*1000)
}
console.log(1);
sleep(3,() => console.log('weak up'));
console.log(2);
```

## 前端经常遇到的异步
### 1. 图片加载
图片加载是需要时间的，但它并不会阻塞后续代码的执行，即：图片加载是异步的
```html
<img src="http://www.chinanews.com/cul/2018/01-08/U322P4T8D8418615F107DT20180108102000.jpg">
```
```js
const img = document.getElementsByTagName('img')[0];
console.log(img.width);
```
![img](../images/02-img.png)

解决方法：当图片加载完毕后再获取宽度
```js
const img = document.getElementByTagName('img')[0];
console.log('图片宽度',img.width);
img.onload = function() {
  console.log('图片加载完毕',img.width);
}
```
![img-onload](../images/02-img-onload.png)

### 2. 面试
```html
<div id="box">
  <ul>
    <li>选项1</li>
    <li>选项2</li>
    <li>选项3</li>
    <li>选项4</li>
    <li>选项5</li>
    <li>选项6</li>
  </ul>
</div>
```
```js
let liList = document.querySelectorAll('li');
// 这里i会变量声明提升，是全局变量
for(var  i=0;i<liList.length;i++) {
  liList.onclick = function() {
    console.log(i); // 6
  }
}
```

### 3. `Ajax`中的异步

### 4. 异步的形式
* 不太好的方法：轮询  
  轮询：隔一段时间就去询问，异步执行内容是否获取到结果，如果没有获取到结果，则继续隔一段时间去询问，直到获取到结果
  ```js
  // 代码实现
  // 10到15s之间的某一个时间点，会为window添加一个apple属性
  const buyFruit = () => {
    setTimeout(() => {
      window.apple = '买到苹果了'
    }, (parseInt(Math.random() * 10) + 5) * 1000)
  }
  // 每一秒都去查看window上是否有apple属性
  const getResult = () => {
    const timerId = setInterval(() => {
      if (window.apple) {
        console.log(window.apple)
        clearInterval(timerId)
      } else {
        console.log('没有买到水果！');
      }
    }, 1000)
  }
  buyFruit()
  getResult()
  ```
  这样写的话对性能损耗比较大，不推荐
* 正规方法：回调
  ```js
  const buyFruit = (fn) => {
    setTimeout(() => {
      fn.call(undefined, '买到苹果了')
    },((Math.random() * 10) + 5) * 1000)
  }
  buyFruit(function() {
    console.log(arguments[0]);
  })
  ```
  为`buyFruit`传入一个函数作为参数，虽然定时器的执行时间是不固定的，但函数是在定时器执行完毕的时候自动执行。这样我们就可以获取到异步执行的结果。

  现在我们加入异步执行失败的情况：
  ```js
  const buyFruit = (fn) => {
    setTimeout(() => {
      if(Math.random > 0.5) {
        fn.call(undefined, '买到苹果了')
      } else {
        // 失败的时候抛出异常
        fn.call(undefined, new Error())
      }
    },((Math.random() * 10) + 5) * 1000)
  }

  buyFruit(function(result) {
    // instanceof语法： object instanceof constructor
    // result的构造函数是不是Error
    if(result instanceof Error) {
      console.log('没有买到')
    } else {
      console.log('买到了');
    }
  })
  ```
  当异步结果出错的时候抛出异常，我们可以根据异常来进行一些操作
### 5. 回调获取异步执行结果的形式
* `jquery`的`success/error`形式：
  ```js
  $.ajax({
    url:'xxx',
    success: () => {},
    error: () => {}
  })
  ```
* `Promise`的`then`形式：
  ```js
  axios({url:'xxx'})
    .then(() => {},() => {})
    .then(() => {},() => {})
  ```
#### `Promise`和`async/await`
* `Promise A +`规范:  
  ```js
  axios({url:''})
    .then(
      s1 => {console.log('成功1')},
      e1 => {console.log('失败1')}
    )
    .then(
      s2 => {console.log('成功2')},
      e2 => {console.log('失败2')}
    )
  ```
  只要第一个`.then`函数中的`s1,e1`对结果处理的**没有问题**的话，就会进入下一个`.then`函数的成功回调即`s2`中
* `async/await`
