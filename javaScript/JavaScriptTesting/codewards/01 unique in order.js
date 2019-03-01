// Implement the function unique_in_order which takes as argument a sequence
// and returns a list of items without any elements with the same value next to each other 
// and preserving the original order of elements.

// 实现函数unique_in_order,该函数的参数是一个序列，返回一个保留原始元素顺序且相邻元素不能相同的数组

// For example:
// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]

// 解题思路：如果当前项不等于后一项，则将当前项放入数组中
// const uniqueInOrder = (iterable) => {
//   const result = []
//   for (let i = 0; i < iterable.length; i++) {
//     const current = iterable[i], next = iterable[i + 1]
//     if (current !== next) {
//       result.push(current)
//     }
//   }
//   return result
// }
// 这里调用Array.prototype.filter方法，在调用的时候将this指向改为了传入的参数
// 这样即使传入字符串，也是调用数组的filter方法，只不过this的指向会发生变化
// const uniqueInOrder = it => [].filter.call(it, (item, i) => it[i] !== it[i + 1])

// ...运算符： 
// 1. 展开语法(spread syntax):可以在函数调用/数组构造时，将数组表达式或者string在语法层面展开；还可以在构造字面量对象时，将对象表达式按key-value的方式展开
// 2. 剩余语法(rest syntax):将一个不定量的参数表示为一个数组
// 常见用法：
// 1. 复制数组： (浅拷贝，直接复制会相互引用，修改同一片内存空间)
//    old:  const a1 = [1,2]; const a2 = a1.slice();
//    new:  const a1 = [1,2]; const a2 = [...a1];
// 2. 合并数组： 
//    const arr1 = ['a','b'], arr2 = ['c'], arr3 = ['d','e']
//    old: arr1.concat(arr2,arr3)
//    new: [...arr1,...arr2,...arr3]
// 3. 与解构赋值/函数参数结合：
//    const arr = [1,2,3,4,5]
//    old: a1 = arr[0], rest = arr.slice(1)
//    new: [a1,...rest] = arr
//    const fn = (1,...rest) => {console.log(rest) // [2,3,4,5]} 
//    fn(1,2,3,4,5)
// 4. 字符串：可以将字符串转为真正的数组
//    [...'hello'] // ['h','e','l','l','o']

// 这里通过...将字符串转换为真正的数组，然后调用数组的filter方法
// const uniqueInOrder = d => [...d].filter((x, i, a) => x != a[i + 1])

const uniqueInOrder = iterable => [...iterable].reduce((count, item) => {
  const last = count[count.length - 1]
  if (last !== item) { count.push(item) }
  return count
}, [])
console.log(uniqueInOrder('AAAABBBCCDAABBB'))
console.log(uniqueInOrder('ABBCcAD'))
console.log(uniqueInOrder([1, 2, 3, 3]))