// Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!
//
//   Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.
//
//   The result will be an array of arrays or of tuples (in C an array of Pair) or a string, each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.

// 1. 除数的平方的总和是正方形的数字 2. 除数的平方的总和
// Example:
// list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
// list_squared(42, 250) --> [[42, 2500], [246, 84100]]

const listSquared = (m, n) => {
  // 首先找出所有可以被m整除的数
  const result = [];
  for (let i = m; i < n; i++) {
    let sum = 0;
    for (let j = m; j <= i; j++) {
      if (i % j === 0) {
        sum += Math.pow(j, 2);
        const sqrt = Math.sqrt(sum);
        if (sqrt === parseInt(sqrt, 10)) {
          const index = result.findIndex(item => item[0] === j);
          if (index === -1) {
            result.push([i, sum]);
          }
        }
      }
    }
  }
  return result;
};

console.log(listSquared(1, 250));
