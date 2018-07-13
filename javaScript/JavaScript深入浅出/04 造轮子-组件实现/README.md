# jquery基础-jquery对象与DOM对象的区别与相互转换

## 什么是`jQuery`对象
jQuery:通过jQuery包装DOM对象后产生的对象。`jQuery`对象是`jQuery`独有的，其可以使用`jQuery`里的方法

**虽然jQuery对象是包装DOM对象后产生的，但是`jQuery`对象无法使用`DOM`对象的任何方法，同理`DOM`对象也不能使用`jQuery`里的方法，乱使用会报错**

## `jQuery`对象转换为`DOM`对象

* (一) `jQuery`对象是一个数据对象,可以通过`[index]`的方法,来得到相应的`DOM`对象  
  例：
  ```js
  var $v = $('#v'); // jquery对象
  var v = $v[0]; // dom对象
  console.log(v.checked); // 检测checkedbox是否被选中
  ```

* (二) `jQuery`本身提供,通过`.get(index)`方法,得到相应的`DOM`对象  
  例：
  ```js
  var $v = $('#v'); // jquery对象
  var v = $v.get(0); // dom对象
  console.log(v.checked); // 检测checkedbox是否被选中
  ```

## DOM对象转换为`jQuery`对象
对于已经是一个`DOM`对象,只需要用`$()`把`DOM`对象包装起来,就可以获得一个`jQuery`对象了。

例：
```js
var v = document.getElementById('v'); // dom对象，只能使用原生dom方法
var $v = $(v); // jquery对象，只能使用jquery方法
```
