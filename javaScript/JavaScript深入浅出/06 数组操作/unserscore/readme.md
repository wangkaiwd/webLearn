# 我不知道的`underscore.js`

> 结合个人实现方式以及官方文档、mdn 和第三方优秀博客总结，深入学习`javascript`函数、数组以及对象

## 学习资料

- [`underscore.js`](https://underscorejs.org/#compact)
- [`annotated source`](https://underscorejs.org/docs/underscore.html)
- [带有中文注释的`underscore.js`源码解读](https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js)

## 源码理解

### 1. 我不知道的`undefined`

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
