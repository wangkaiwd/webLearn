# BOM浏览器模型

## `window`对象

> 浏览器里面,`window`对象指当前的浏览器窗口。它也是当前页面的顶层对象，一个变量如果未声明，那么默认就是顶层对象的属性。
> 
### `window`对象的常用属性
 
* (1) `window.name`
* (2) `window.frames`:返回一个类似数组的对象，成员为页面所有框架窗口，包括`frame`元素和`iframe`元素。  
  `window.frames[0]`表示页面中第一个框架窗口。
* (3) `window.top`:指向最顶层窗口，主要用于在子窗口里面获取顶层的父窗口。
* (4) `window.parent`:指向父窗口。如果当前窗口没有父窗口，`window.parent`指向自身。
### `window`对象的常用方法
* (1) `window.scrollTo()`:用于将文档滚动到指定位置
  ```js
  /**
  * 用于将文档滚动到指定位置
  *  params: Number x: 滚动后位于窗口左上角的横坐标
  *  params: Number y: 滚动后位于窗口左上角的纵坐标
  *  params: Object options: 
  *         对象属性：
  *             top: 滚动后页面左上角的垂直坐标，即y坐标
  *             left: 滚动后页面左上角的水平坐标，即x坐标
  *             behavior: 字符串，表示滚动的方式，有三个可能只
  *                       1. smooth：平滑滚动
  *                       2. instant：瞬间滚动
  *                       3. auto(默认值)：实测效果等同于instant
  **/
  window.scrollTo(x, y);
  window.scrollTo(options) // 接受一个配置对象作为参数
  window.scroll()是window.scrollTo()方发的别名
  ```
* (2) `window.getComputedStyle()`:返回浏览器计算后得到的最终规则
  ```js
  
  ```
## `history`对象
> `window.history`属性指向`History`对象，它表示当前窗口的浏览历史。

* (1) history.back():移动到上一个网址，等同于点击浏览器的后退键
* (2) history.forward():移动到下一个网址，等同于点击浏览器的前进键
* (3) history.go():接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如`go(1)`相当于`forward()`,`go(-1)`相当于`back()`。**如果参数超过实际存在的网址范围，该方法无效；如果不指定参数，默认参数为0，相当于刷新当前页面。**