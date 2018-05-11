## js语句
### `switch`语句
* 在`switch`语句中可以使用任何数据类型，每个`case`的值不一定是常量，可以是变量，甚至是表达式。
  ```js
  /**
   * 1.每个case后都添加一个break语句，可以避免执行多个case代码
   *   如果确实需要混合几种情形，不要忘记在代码中添加注释，说明你是有意省略了break关键字
   * 2.在switch的表达式和case的表达式是使用===严格相等运算符进行比较的
   */
  switch("hello world") {
    case "hello" + "world":
      console.log("Greeting is found");
    break;
    case "goodbye":
      console.log("Closeing is found");
    break;
    default:
      console.log("Unexpected message was found");
    break;
  }

  // switch中传入布尔值
  var num = 25;
  switch(true) {
    case num < 0 :
      console.log("Less than 0.");
    break;
    case num > 0 && num <= 10:
      console.log("Between 0 and 10");
    break;
    case num > 10 && num <= 20:
      console.log("Between 10 and 20");
    break;
    default:
      console.log("More than 20");
    break;
  }
  ```
### `for`语句
* `for`语句的所有表达式都是可选的
  ```js
  // 1. 没有初始化块
  var i = 0;
  for (;i<=10;i++) {
    console.log(i);
    // more statements
  }

  // 2. 没有条件块
  for (i=0;;i++) {
    console.log(i);
    // 可以自己指定跳出条件,防止死循环
    if(i>3) break;
    // more statements
  }

  // 4. 自己添加所有条件
  var i = 0;
  for (;;) {
    if(i>3) break;
    i++;
  }
  ```
* es5中不存在块级作用域,在循环内部定义的变量也可以在外部访问到。
  ```js
  var count = 10;
  for(var i=0;i<count;i++) {
    console.log(i); // 0,1,2,3,4,5,6,7,8,9
  }
  console.log(i); // 10
  ```
### `break`和`continue`语句
> break和continue用于在循环中精确的控制代码的执行。

```js
var num = 0;
for (var i=1;i<10;i++) {
  if(i % 5 == 0) {
    break;
  }
  num ++;
}
console.log(num); // 4
// 并不会在最后还执行i++
console.log(i);  // 5

var num = 0;
for (var i=1;i<10;i++) {
  if(i % 5 == 0) {
    continue;
  }
  num ++;
}
console.log(num); // 8
console.log(i);  // 10
```
* break:立即退出循环,强制继续执行循环后面的语句
* continue:立即退出循环,退出循环后会从循环的顶部继续执行
