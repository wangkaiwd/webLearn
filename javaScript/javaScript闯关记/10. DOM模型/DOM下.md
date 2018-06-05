## DOM 文档对象模型

> Element 对象对应网页中的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个 Element 节点对象（元素节点）

`Elemen`类型用于表现`XML`或者`HTML`元素,提供了对元素标签名、子节点及特性的访问。`Element`节点具有以下特征:

* `nodeType`的值为 1
* `nodeName`的值为标签名
* `nodeValue`的值为`null`
*

### 实例属性

> 以下为常用的一些属性

#### 元素特性的相关属性

* (1) `Element.id`:返回指定元素的 id 属性，该属性可读写
* (2) `Element.tagName`: 返回指定元素的大写标签名,与`nodeName`属性的值相等
* (3) `Element.accessKey`: 读写分配给当前元素的快捷键
* (4) `Element.draggable`: 返回一个布尔值，表示当前元素是否可拖动
* (5) `Element.title`: 用来读写当前元素的 HTML 属性`title`。该属性通常用来指定,鼠标悬浮时弹出的文字提示框。
