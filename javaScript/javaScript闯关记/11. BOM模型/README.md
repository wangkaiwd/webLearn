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
* (1)

## `history`对象
> `window.history`属性指向`History`对象，它表示当前窗口的浏览历史。

## `cookie`