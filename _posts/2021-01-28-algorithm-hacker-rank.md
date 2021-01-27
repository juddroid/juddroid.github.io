---
title: "[Algorithm] Hacker Rank 와의 첫만남, 그리고...(feat.CodeForce)"
date: 2021-01-28-03:15:00
categories: [Digging, Algorithm]
tag: [Hacker Rank, Code Force, v8, d8, readline, nodejs, javascript]
---



하루하루가 멘붕의 연속이다.
오늘은 Hacker Rank 라는 사이트를 처음 만나서 4문제를 풀고,
Code Force 라는 곳에서 가상대회에 출전을 해본다.
어제 차마 마져 구현하지 못한 '카페 이벤트' 때문에

- 오후 4시까지 해커랭크 문제를 다 푼다.
- 곧바로 가상대회(2시간)에 참가해서 6시 30전후로 마친다.
- 카페 이벤트 코드를 점검한다.

오늘도 그럴싸한 계획을 세웠다.

<br>
<br>

## 어서와 Hacker Rank 는 처음이지?

  <br>



### 1. Diagonal Difference

---



**개요**

- 정사각형 2차원 배열이 주어진다.

  ```js
  const sampleData = [
    [1, 2, 3],
    [4, 5, 6],
    [9, 8, 9],
  ];
  const expected = 2;
  ```

- 대각선으로 왼쪽부터 더하면 1 + 5 + 9 = 15

- 대각선으로 오른쪽부터 더하면 9 + 5 + 3 = 17

- 이 둘의 abs difference를 `return` 하면된다.

  

**풀이**

1. 화려한 2중 `for` 문으로 배열의 `index` 를 구해서 오른쪽부터 `sum` 을 구한다.
2. 왼쪽도 같은 방법으로 `sum` 을 구한다.
3. 두 `sum` 의 차를 구해서 `Math.abs()` 한다.

```js
function diagonalDifference(arr) {
  // 1 --->
  function rightDiagonal(arr) {
    // right
    let rightSum = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) {
          console.log(arr[i][j]);
          rightSum += Number(arr[i][j]);
        }
      }
    }
    return rightSum;
  }

  // 2 --->
  function leftDiagonal(arr) {
    // left
    let leftSum = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i + j === arr.length - 1) {
          console.log(arr[i][j]);
          leftSum += Number(arr[i][j]);
        }
      }
    }
    return leftSum;
  }

  const rightSum = rightDiagonal(arr);
  const leftSum = leftDiagonal(arr);
  
  // 3 --->
  let result = Math.abs(rightSum - leftSum);
  return result;
}
```



**Test Code**

```js
function test(sample, expect) {
  let result = diagonalDifference(sample);
  console.log(`result: ${result} , expect: ${expected}`);
  return console.log(result === expect);
}
```

- 생각보다 코드가 지저분하고, 그에 비해 빨리 풀렸다.



### 2. Time Conversion

---

**개요**

- 시간이 `string` 으로 주어진다.

  ```js
  const s = '04:59:59AM';
  ```

- 아래와 같은 형식으로 바꾸면 된다.

  ```js
  const ex = '04:59:59';
  ```



**풀이**

1. `string` 을 `split` 한 후 `A` 혹은 `P` 문자를 구한다.
2. `slice` 로 시간(`HOUR`)을 구한다.
3. 변경한 `string` 을 붙일 수 있도록 잘라 놓는다.
4. 오전 오후인 경우 각각 12시를 기준으로 시간을 조정해주고, 24시인 경우는 예외처리 해준다.
5. 변경한 시간이 일의 자리이면 `stirng` 을 붙여 줄 수 있도록 `zero` 를 만들어 놓는다.
6. 모두 `concat`

```js
function timeConversion(s) {
  let splitString = s.split('');
  // 1 --->
  let AP = splitString[splitString.length - 2];
  // 2 --->
  let HOUR = Number(splitString.slice(0, 2).join(''));
	// 3 --->
  let cutArr = splitString.slice(2, splitString.length - 2);
	
  // 4 --->
  if (AP === 'A') {
    if (HOUR < 12) {
    } else {
      HOUR -= 12;
    }
  } else if (AP === 'P') {
    HOUR += 12;
    if (HOUR === 24) {
      HOUR = 12;
    }
  }
  
  // 5 --->
  let zero = ['0'];
  let absHOUR = Math.abs(HOUR);

  let arrHOUR = absHOUR.toString().split('');

  if (arrHOUR.length === 1) {
    arrHOUR = zero.concat(absHOUR);
  }

  // 6 --->
  let result = arrHOUR.concat(cutArr).join('');

  return result;
}
```



**Test Code**

```js
function test(s, ex) {
  let result = timeConversion(s);
  console.log(`result: ${result}, ex: ${ex}`);
  return console.log(result === ex);
}

test(s, ex);
```

- 처음 문제를 봤을 때보다 까다로운 조건이 몇가지 있었다.
- `0` 을 붙여줘야 한다든지 24시일 경우의 생각을 처음에는 하지 못했었다.
- 엣지케이스를 땜빵하는 형식으로 코딩을 한 것 같아 풀고도 찝찝했다.



**3. Number Line Jumps**

---

**개요**

- 점프하는 서커스 캥거루 두 마리가 있다.

  ```js
  const input0 = [0, 3, 4, 2];
  const output0 = 'YES';
  
  const input1 = [0, 2, 5, 3];
  const output1 = 'NO';
  ```

- 배열에는 각 캥거루의 출발지점과 점프능력치가 나와있다.
- 캥거루들이 출발했을 때, 한 번이라도 만날 수 있는지를 말해 `YES` or `NO`



**풀이**

1. 각 캥거루 1차 함수식 작성(`y = ax + b`)
2. `for` 문을 돌며 `i` 이 값을 때, 두 캥거루의 값이 일치하면 `return 'YES'`

```js
function kangaroo(x1, v1, x2, v2) {
  for (let i = 1; i < 10000; i++) {
    // 1 --->
    let kangaroo1 = x1 + v1 * i;
    let kangaroo2 = x2 + v2 * i;
    // 2 --->
    if (kangaroo1 === kangaroo2) {
      return 'YES';
    }
  }
  return 'NO';
}
```

- 이런 문제만 있으면 좋겠다. 명시적이고, 깔끔한 쉬운 수학문제 같다.
- `for` 문을 얼만큼 돌려야할지 고민을 `1초` 정도 하다가 조건을 확인하고는 그냥 `10000` 번 돌린게 좀 옥의티같다.



### 4. Save the Prisoner

---

**개요**

- 원탁의 죄수들의 폭탄(`candy`)돌리기

  ```js
  5 3 2
  352926151 380324688 94730870
  ```

- 예시를 해석하자면 `5` 명의 죄수들이 원탁에 앉아 `3`개의 사탕을 `2` 번 의자에 앉은 사람부터 차례대로 받는다.
- 마지막에 사탕을 받는 죄수를 찾으면 된다.



**풀이**

1. 죄수(`n`)가 사탕(`m`)보다 많을 경우와 적을 경우를 나누어서 판단
2. 시작하는 자리(`s`)부터 마지막 죄수 탐색
3. 원탁에 앉았으므로 한바퀴를 돌았을 때의 남은 사탕개수를 고려
4. 마찬가지로 시작하는 자리로부터 사탕을 나누어주며 원탁을 돌 때, 죄수의 번호를 넘어가는 것을 고려

```js
function saveThePrisoner(n, m, s) {
  let result = (m + s - 1) % n;
  return result === 0 ? n : result;
}
```



**Test Code**

```js
var fs = require('fs');
var input = fs.readFileSync('./04-1-data.js').toString().split('\n');
var expect = fs.readFileSync('./04-2-expect.js').toString().split('\n');

let inputArr = [];
for (let i = 1; i < Number(input[0]) + 1; i++) {
  inputArr.push(input[i].split(' '));
}
let expectArr = [];
for (let i = 0; i < input[0]; i++) {
  expectArr.push(expect[i]);
}

function test(input, expect) {
  for (let i = 0; i < input.length; i++) {
    let result = saveThePrisoner(Number(input[i][0]), Number(input[i][1]), Number(input[i][2]));
    let expected = Number(expect[i].slice(0, -1));
    if (result === expected) {
      console.log(`${i}: ${result}`);
      console.log(`${i}: ${expected}`);
      console.log(result === expected);
    }
  }
}

test(inputArr, expectArr);
```

- 테스트 코드가 훨씬 긴 기이한 풀이가 되었다.

- 사실 처음에는 한 줄로 통과할 줄 알았다. (나도 드디어 한 줄로 알고리즘을 풀어보는구나 ㅠㅠ)

  `s + (m % n) - 1`

- 물론 땡탈락

- `s` 에 대한 고려가 안되어 있다.

- 그래서 다음으로 도전한 식은

  `(m % n) + ((s - 1) % n)`

  - 이 식을 세웠을 무렵 본의 아니게 다른 사람들의 코드를 보게 되었고,

  ```js
  (m + s - 1) % n
  ```

  - `%n` 으로 묶으면 두 식이 같을 거라고 생각했다.
  - 하지만 결과는 달랐다.

- 사실 문제를 통과시켜놓고, 두 식이 어떻게 왜 다른가를 고민을 해야 했다.

- 결과적으로 `%` 는 나머지를 남겨주는 연산이라 일반 수학에서처럼 사용할 수 없다고 이해했다.

- 내가 세웠던 식은 각각 %n 으로 원탁 둘레만큼 결과값을 자른다고 해도 각각의 값이 더해지면서 다시 원탁 둘레의 길이(죄수 숫자)를 넘을 수 있다.

`Thread` 의 첫인상은 지렁이다.



**정리**

1. 아무리 빨리 풀면 장땡이라는 알고리즘이라지만 급하면 생각을 하기전에 `for` 문부터 돌리고 본다.
2. 기본 문법을 조금 더 공부하고, 차분하게 생각해서 스트림 함수나 연산자를 사용하는 방법을 더 고민해 봐야할 것 같다.
3. 이번 경우 다른 미션에 대한 스트레스가 있어서 빨리 끝내고 다시 코드를 보고 싶은 욕심이 종일 있어서 더 급했다.
4. 동료들의 코드를 볼 때, 대체적으로 내 코드가 장황하고 길다. 짧다고 좋은 코드가 아니라고 하더라도 동료들만큼은 짧아도 될 것 같다. 내 코드가 너무 무식하게 길다. 



## 어서와 Code Force 는 진짜 처음이지?

- 미뤄야 될 것 같다. 너무 졸리다.