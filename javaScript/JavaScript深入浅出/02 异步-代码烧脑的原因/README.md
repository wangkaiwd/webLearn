# 异步-代码烧脑的原因
## 同步于异步
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
