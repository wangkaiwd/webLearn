// The new "Avengers" movie has just been released! There are a lot of people at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollars bill. An "Avengers" ticket costs 25 dollars.
//
//   Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.
//
//   Can Vasya sell a ticket to each person and give the change if he initially has no money and sells the tickets strictly in the order people follow in the line?
//
//   Return YES, if Vasya can sell a ticket to each person and give the change with the bills he has at hand at that moment. Otherwise return NO.

// Example
// tickets([25, 25, 50]) // => YES
// tickets([25, 100]) // => NO. Vasya will not have enough money to give change to 100 dollars
// tickets([25, 25, 50, 50, 100]) // => NO. Vasya will not have the right bills to give 75 dollars of change (you can't make two bills of 25 from one of 50)

// 题目大意：售票员能不能为用户成功的找零

const tickets = (peopleInLine) => {
  const getMoneyList = [];
  for (let i = 0; i < peopleInLine.length; i++) {
    let current = peopleInLine[i];
    let j = 0;
    while (current > 25 && j < getMoneyList.length) {
      current = current - getMoneyList[j];
      j++;
    }
    if (current % 25 !== 0) {
      return false;
    } else {
      getMoneyList.push(current);
    }
  }
  return true;
};

console.log(tickets([25, 25, 50]));
console.log(tickets([25, 100]));
console.log(tickets([25, 25, 50, 50, 100]));
