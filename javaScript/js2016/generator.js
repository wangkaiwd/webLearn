// function* gen(x) {
//   var y = yield x + 2;
//   return y;
// }
// var g = gen(1)
// console.log(g.next())
// console.log(g.next())

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
// 调用generator函数后，该函数并不执行，返回一个指向内部状态的指针
// 每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式(或return语句为止)
// 换言之：generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
const g = helloWorldGenerator()
console.log(g.next()) // { value:'hello', done:false }
console.log(g.next()) // { value:'world', done:false }
console.log(g.next()) // 'ending'
// 每次调用遍历器对象的next方法，就会返回一个有着value和done俩个属性的对象，value属性表示当前的内部状态的值，是yield表达式后表达式的值
// done属性是一个布尔值，表示是否遍历是否结束
// console.log(g.next())