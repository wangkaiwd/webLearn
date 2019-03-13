// A child is playing with a ball on the nth floor of a tall building. The height of this floor, h, is known.
// He drops the ball out of the window. The ball bounces (for example), to two-thirds of its height (a bounce of 0.66).
// His mother looks out of a window 1.5 meters from the ground.
// How many times will the mother see the ball pass in front of her window (including when it's falling and bouncing?

// 一个孩子在高楼的第n层玩球。楼层高度h已知。
// 他将球扔出窗外。例如：球会弹起，弹起的高度为之前高度的2/3，即(h * 0.66)
// (look out:向外看) 他的妈妈 从离地1.5高的窗户向外看
// 妈妈能看到球从窗口经过几次（包括球落下和弹起的情况）

// 内部函数递归
const bouncingBall = (h, bounce, window) => {
  let count = 1
  if (h <= window || h <= 0 || bounce >= 1 || bounce <= 0) return -1
  // 第一次落下
  const iterate = (h) => {
    h = h * bounce
    if (h > window) {
      // 之后每次高度大于窗口高度时，说明上一次弹起和这一次下落都会经过窗口
      count = count + 2
      iterate(h)
    }
  }
  iterate(h)
  return count
}

console.log(bouncingBall(3, 0.66, 1.5))

// 通过while循环来实现
const bouncingBall2 = (h, bounce, window) => {
  let count = 1 // 由于要求h > window,所以第一次下落的时候必定会被看到
  if (h <= window || h <= 0 || bounce >= 1 || bounce <= 0) return -1
  // 第一次落下
  h = h * bounce
  while (h > window) {
    // 如果h > window，那么说明前一次下落和这一次弹起时必定会被看到
    count = count + 2
    h = h * bounce
  }
  return count
}
console.log(bouncingBall2(3, 0.66, 1.5))

// 通过递归调用定义的函数: 类似于斐波那契数列
// 这里的-1设计的很巧妙，刚好可以用来做最初使的递归值
const bouncingBall3 = (h, bounce, window) => {
  // 最终会由于 h < window 而return -1
  // 之后会
  if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) {
    return -1;
  }
  var newHeight = h * bounce;
  return bouncingBall(newHeight, bounce, window) + 2;
}