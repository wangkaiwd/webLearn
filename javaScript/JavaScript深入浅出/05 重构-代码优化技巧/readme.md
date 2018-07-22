# 重构（代码优化的技巧）

## 基本原则
1. 易读性优先
2. 如果不是性能瓶颈，就不要为了性能而改写代码  
  没有必要的优化
    ```js
    var array = [1,2,3,4,5,6,7,8,9,10];
    for(let i=0;i<array.length;i++) {
      console.log(i);
    }

    // 优化后提升性能的代码
    var array = [1,2,3,4,5,6,7,8,9,10];
    const len = array.length;
    for(let i = len; i > 0; i--) {
      console.log(i);
    }
    ```
3. 复杂性守恒原则：如果逻辑很复杂，那么代码看起来就应该是复杂的。如果逻辑很简单，代码看起来就应该是简单的
