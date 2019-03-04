// A child is playing with a ball on the nth floor of a tall building. The height of this floor, h, is known.
// He drops the ball out of the window. The ball bounces (for example), to two-thirds of its height (a bounce of 0.66).
// His mother looks out of a window 1.5 meters from the ground.
// How many times will the mother see the ball pass in front of her window (including when it's falling and bouncing?

// 一个孩子在高楼的第n层玩球。楼层高度h已知。
// 他将球扔出窗外。例如：球会弹起，弹起的高度为之前高度的2/3，即(h * 0.66)
// (look out:向外看) 他的妈妈 从离地1.5高的窗户向外看
// 妈妈能开到球从窗口经过几次（包括球落下和弹起的情况）

const bouncingBall = (h, bounce, window) => {
  let count = 0
  if (h <= window) return -1
  if (h <= 0) return -1
  if (bounce >= 1 || bounce <= 0) return -1
  // 第一次落下
  count++
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