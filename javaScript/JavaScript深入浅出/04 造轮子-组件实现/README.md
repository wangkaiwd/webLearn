# jquery基础知识

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

## `jQuery`中获取高度
* .height():获取匹配元素集合中的第一个元素的当前计算高度值(不包括：`margin,padding,border`)
* .innerHeight():为匹配的元素集合中获取第一个元素的当前计算高度(包括`padding`但是不包括`border`)
* .outerHeight():为匹配的元素集合中获取第一个元素的当前计算高度(包括`padding,border`,选择性的`margin`)

# DOM事件
> 事件的本质是程序各个组成部分之间的一种通信方式，是异步编程的一种实现。

## 事件的传播
一个事件发生后，会在子元素和父元素之间传播(propagation)。这种传播分为三个阶段：
* 第一阶段：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”(capture phase)
* 第二阶段: 在目标节点上触发，称为“目标阶段”(target phase)
* 第三阶段: 从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）

## 事件代理
