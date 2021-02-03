---
title: "[Algorithm] 다시 풀어보는 알고리즘(feat. 프로그래머스)"
date: 2021-01-20-20:00:00
categories: [Digging, Algorithm]
tag: [algorithm, programmers]
---

## 다시 풀어보는 알고리즘(feat. 프로그래머스)

---

그 동안 정신없이 달려왔지만 작성한 코드를 돌아보는 시간도 풀었던 문제를 다시 풀어보는 시간도 거의 없었다.<br>
오늘은 마침 프로그래머스에서 풀었던 문제를 다시 풀어볼 기회가 생겼다.<br>
지난 번에 작성한 코드와 비교해보면 그 동안 얼마나 생각과 코드가 달라졌는지 비교해 볼 수도 있는 좋은 기회가 될 것 같다.<br>
공교롭게도 인생에서 처음으로 마주했던, 나를 적잖이 당황하게 만들었던 알고리즘 문제가 또 다시 첫 번째 문제로 나타났다.
(사실 두어달전만 해도 이게 알고리즘 문제라는 것도 몰랐으니...) <br>

문제를 풀 때, 한 문제당 거의 하루이상씩 걸렸었기에, 다시 풀었을 때 잘 풀 수 있을거라는 자신도 없지만 도전해보자.

<br>

### 나름의 목표

- 테스트 코드 작성해보기
- 예전 코드와 비교해보기

<br>
<br>

### **1. 크레인 인형뽑기 게임 (2019 카카오 개발자 겨울 인턴십)**

---

<br>

언젠가 한번쯤 해봤을만한 게임처럼 생긴 문제다. 귀엽게 문제를 잘 만든 것 같다.<br>
그렇지만 귀여운 캐릭터들과 애니메이션은 초보자인 나에게는 어마어마한 공포로 다가왔다.<br>
나빴다. 진짜...<br><br>

#### 개요

- `board` 라는 2차원 배열이 주어지고, 각각의 캐릭터는 1~5의 숫자로 입력되어있다.

  ```js
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  const moves = [1, 5, 3, 5, 1, 2, 1, 4];
  ```

- 0은 비어있는 칸이다.
- 크레인은 `moves` 에 따라 한 번에 하나씩 인형을 뽑아 바구니에 넣는다.
- 바구니의 맨 윗 칸에 같은 캐릭터(같은 숫자)가 들어오면 만나서 `펑` 하고 사라진다.
- 사라진 캐릭터의 개수를 `return` 하면 된다.

<br>

#### 풀이

1. `0` 이 아닌 수가 나올때까지 `board` 를 세로로 탐색한다.

2. `0` 이 아닌 수를 만나면 그 수를 `basket` 에 넣고, 그 자리에 `0` 을 채운다.

3. `moves.length` 만큼 반복한다.

4. `basket` 에 숫자를 넣기 전 `basket[basket.length - 1]` 이 넣으려는 숫자와 같은지 확인한다.

5. 같으면 `basket.pop()` 하며 `count += 2` , 다르면 `push` 한다.

6. `count` 를 `return` 한다.

<br>

```js
function solution(board, moves) {
  const basket = [];
  let count = 0;
  // 3 --->
  for (let j = 0; j < moves.length; j++) {
    let temp = [];
    // 1 --->
    for (let i = 0; i < board.length; i++) {
      // 2 --->
      if (board[i][moves[j] - 1] !== 0) {
        temp.push(board[i][moves[j] - 1]);
        if (temp.length === 1) {
          board[i][moves[j] - 1] = 0;
        }
      }
    }

    if (temp.length === 0) {
      // 4 --->
    } else if (basket[basket.length - 1] === temp[0]) {
      // 5 --->
      basket.pop();
      count += 2;
    } else {
      basket.push(temp[0]);
    }
  }
  // 6 --->
  var answer = count;
  return answer;
}
```

<br>

#### Test Code

<br>

```js
const expected = 5;

function test() {
  const result = solution(board, moves);
  console.log(`result: ${result}, expected: ${expected}`);
  const boolean =
    result === expected ? console.log(y("true")) : console.log(r("false"));
  return boolean;
}

test();
```

<br>
<br>

#### 기존 풀이와 비교

1.  `moves` 의 `index` 가 배열과 맞지 않은 것 때문에 굳이 `newMoves` 를 만들었다. 그 때 당시 `forEach` 를 한 번 써보고 싶었다.

2.  세로로 탐색 할 때, `0` 이 아닌 숫자를 처음 만나고 멈춰서야 하는데 계속 순회하며 값을 `0` 으로 바꿔버리는 문제를 막기 위해서 `break` 를 썼다. 사실 오늘도 같은 문제로 잠시 고민을 했었다. 지난번에 `break` 를 썼던게 기억이 나지는 않았지만 뭔가 `break` 를 쓰기 싫어서 다른 방법을 고민하다가 `temp` 를 하나 만들어서 값을 저장해두고, `temp.length === 1` 일 때만 값을 바꾸고 그냥 지나가도록 만들었다. 덕분에 코드가 더 복잡하게 된 것 같아서 맘에 들진 않는다.

3.  지난번에는 `basket` 을 다 완성한 후에 다시 순회하며 같은 값을 `splice` 해주는 방식으로 카운트를 했는데, 이번에는 `basket` 에 값을 넣을 때 확인을 해서 `count` 를 했다. 그나마 좋아진 부분이 있다면 이런 방식으로 새로이 생각했다는 것이다.

<br>

```js
function solution(board, moves) {
  let basket = [];
  let newArr = [];

  const newMoves = [];
  // 1 --->
  moves.forEach((move) => {
    newMoves.push(move - 1);
  });

  for (let j = 0; j < newMoves.length; j++) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][newMoves[j]] !== 0) {
        basket.push(board[i][newMoves[j]]);
        board[i][newMoves[j]] = 0;
        // 2 --->
        break;
      }
    }
  }

  // 3 --->
  let markNum = basket.length;
  for (let j = 0; j < 100; j++) {
    function chkBox(box) {
      for (let i = 0; i < box.length; i++) {
        if (box[i] === box[i + 1]) {
          box.splice(i, 2);
        }
      }
      return box;
    }
    chkBox(basket);
  }

  let check = markNum - basket.length;

  var answer = check;
  return answer;
}
```

<br>

#### 정리

- 사실 이 문제는 `스택` 에 관련된 문제인 것 같은데, 그런 개념으로 풀지 못해 아쉽다. 책에서 본 적은 있는데 `스택`, `큐` 등을 실제로 코드로 어떻게 표현할건지 고민하고, 공부를 해봐야겠다.
- 지난번에는 문제 이해만 1시간 넘게 걸려야 했고, 다른 1단계 문제를 다 풀어보고, 마지막에 다시 도전해서도 결국 하루를 넘겨서야 풀었던 기억이 난다. 그래도 오늘은 1시간 정도 걸렸다. 토닥토닥...
- 알고리즘 문제는 처음에는 통과를 목적으로 해도 괜찮다는 말 때문인지 새로운 도전을 하지않고, 먼저 `for` 문을 돌려서 해결할 생각이 먼저 난다. JS 기본 문법에 빨리 익숙해질 필요가 있을 것 같다.
- 이번에는 `Test Code` 를 작성해봤다. 시간은 흘러가고, 마음이 급했지만 장기적으로 더 효율성이 있을거라는 말에 실행에 옮겨보았다. 비록 한 가지 케이스 밖에 test가 안되기 때문에 완전한 역할을 했다고 할 순 없지만 `nodemon` 으로 띄워놓고, 결과값과 통과 여부를 실시간으로 확인하며 코딩할 수 있었다. `빨간불` 이 `노란불` 로 바뀌도록!
  <br><br>
  ![screenshot006](https://user-images.githubusercontent.com/70361152/105171152-42774480-5b61-11eb-9789-d1713b1cce1a.png)

<br><br>

### 2. 모의고사(feat. 수포자) (완전탐색)

---

나는 수포자는 아니었고, 오히려 수학을 참 좋아하는 사람이었는데,<br>
돌이켜보면 그것도 정규교육과정 내에서나 그랬던 것 같아서 조금 씁쓸한 면이 있다.<br>
어떻게 찍는게 정답을 맞힐 확률이 높을까.. 어디보자.. 하는 심정으로 풀어봤다.<br><br>

#### 개요

- `수포자` 는 다행히 3명이고, 그들이 각각 찍는 방식이 규칙성있게 주어진다.
- `answers` 가 배열로 주어지고, 각자의 방식으로 정답을 가장 많이 맞힌 사람을 배열로 `return` 하면 된다.
- 동점자가 있으면 오름차순 정렬을 해야한다.

  ```js
  const answers = [1, 2, 3, 4, 5];
  const expected = [1];

  const ansvers = [1, 3, 2, 4, 2];
  const expected = [1, 2, 3];
  ```

<br>

#### 풀이

1. `수포자들의 패턴` 저장
2. 각각의 `패턴` 과 주어진 `answers` 를 순화하며 정답 개수를 `soopoSet` 에 각각 저장
3. 완성된 `soopoSet` 에서 `value` 만 추출해서 오름차순 정렬한 후 `topScore` 에 저장
4. `topScore` 를 가지고 `soopoSet` 을 돌면서 `key` 값으로 저장된 `수포자 번호` 를 `topScoreStudent` 에 `push`
5. `topScoreStudent` 를 `return`

<br>

```js
function solution(answers) {
  // 1 --->
  const soopo1 = [1, 2, 3, 4, 5];
  const soopo2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const soopo3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const soopoSet = {};

  function checkAnswer(ans, soopo, studentNumber) {
    let count = 0;
    for (let i = 0; i < ans.length; i++) {
      if (ans[i] === soopo[i % soopo.length]) {
        count++;
      }
    }
    // 2 --->
    soopoSet[studentNumber] = count;
  }

  checkAnswer(answers, soopo1, 1);
  checkAnswer(answers, soopo2, 2);
  checkAnswer(answers, soopo3, 3);

  let checkedResult = Object.values(soopoSet).sort((a, b) => b - a);
  let topScore = [];
  // 3 --->
  topScore.push(checkedResult[0]);
  let topScoreStudent = [];
  for (let key in soopoSet) {
    if (soopoSet[key] === topScore[0]) {
      // 4 --->
      topScoreStudent.push(parseInt(key));
    }
  }
  var answer = topScoreStudent;
  // 5 --->
  return answer;
}
```

<br>

#### 기존 풀이와 비교

1. 반복된 부분이 정말 많았다. 내가 스크롤 내리기도 힘들다.
2. 대신 멀리서 봐도 뭘하는건지는 알 것 같다.
3. `Array.max` 부분에서 나도 흠칫 놀랐다. 아무래도 `Array` 에는 `max` 메서드가 없기 때문에 `array 최대값 구하기` 등의 키워드로 구글링을 한 것 같다. 저 코드는 이제는 이해가 간다. 그 때는 아마 복붙한 것 같다.
4. 마지막 `checkIndex.push(j + 1)` 은 인덱스 값을 조정해서 학생번호를 `push` 했는데, 정말 문제 맞춤형이었던 것 같다. 이번에는 `object` 로 짰으니까 학생 이름을 출력하라고 해도 할 수 있지 않았을까 하는 생각이 든다.

<br>

```js
function solution(answers) {
  let soopo1Arr = [];
  let soopo2Arr = [];
  let soopo3Arr = [];

  const soopo1 = () => {
    for (i = 0; i < answers.length; i++) {
      soopo1Arr.push(1, 2, 3, 4, 5);
    }
    return soopo1Arr;
  };

  const soopo2 = () => {
    for (i = 0; i < answers.length; i++) {
      soopo2Arr.push(2, 1, 2, 3, 2, 4, 2, 5);
    }
    return soopo2Arr;
  };

  const soopo3 = () => {
    for (i = 0; i < answers.length; i++) {
      soopo3Arr.push(3, 3, 1, 1, 2, 2, 4, 4, 5, 5);
    }
    return soopo3Arr;
  };

  let soopo1Check = soopo1();
  let soopo2Check = soopo2();
  let soopo3Check = soopo3();

  let soopo1Score = 0;
  let soopo2Score = 0;
  let soopo3Score = 0;

  function checkScore1() {
    for (let i = 0; i < answers.length; i++) {
      if (soopo1Check[i] === answers[i]) {
        soopo1Score += 1;
      }
    }
    return soopo1Score;
  }

  function checkScore2() {
    for (let i = 0; i < answers.length; i++) {
      if (soopo2Check[i] === answers[i]) {
        soopo2Score += 1;
      }
    }
    return soopo2Score;
  }

  function checkScore3() {
    for (let i = 0; i < answers.length; i++) {
      if (soopo3Check[i] === answers[i]) {
        soopo3Score += 1;
      }
    }
    return soopo3Score;
  }

  let lastScore1 = checkScore1();
  let lastScore2 = checkScore2();
  let lastScore3 = checkScore3();

  let lastScoreArr = [lastScore1, lastScore2, lastScore3];

  // 3 --->
  Array.max = function (arr) {
    return Math.max.apply(Math, arr);
  };

  let maxScore = Array.max(lastScoreArr);

  let check = 0;
  let checkIndex = [];

  for (let j = 0; j < lastScoreArr.length; j++) {
    if (lastScoreArr[j] === maxScore) {
      check += 1;
      // 4 --->
      checkIndex.push(j + 1);
    }
  }

  let answer = checkIndex;

  return answer;
}
```

<br><br>

### 3. 이상한 문자 만들기

---

이 문제는 아마 크레인을 포기하고 다음 문제로 풀었던 것 같다.<br>
생애 두 번째 알고리즘 문제였던 셈인데, 나름 쉬워보여서 골랐는데,<br>
그 당시 이것 때문에 밤을 꼴딱 지새웠던 기억이 있다.<br><br>

#### 개요

- 문자열 `s` 를 규칙에 따라 이상하게 만들면 된다.
- 공백에 따라 단어로 나누고, 단어마다 짝수번째는 대문자, 홀수번째는 소문자로 바꾸면 된다.

  ```js
  const s = "try hello world";

  const expected = "TrY HeLlO WoRlD";
  ```

<br>

#### 풀이

1. 공백으로 문자열 `s` 를 `split` 한다.
2. 단어별로 나뉘어진 문자열을 순회하며 `index` 를 기준으로 짝수이면 대문자로, 홀수이면 소문자로 변환하여 `temp` 에 담고, `join` 해서 `return` 하는 함수 `toggleCase` 작성
3. `splitString` 배열의 각 요소를 `toogleCase` 로 변환시킨 후 공백으로 `join` 해서 `newString` 에 담아 `return` 한다.

<br>

```js
function solution(s) {
  // 1 --->
  const splitString = s.split(" ");

  // 2 --->
  function toggleCase(arr) {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0) {
        temp.push(arr[i].toUpperCase());
      } else {
        temp.push(arr[i].toLowerCase());
      }
    }
    return temp.join("");
  }

  // 3 --->
  let newString = splitString.map((el) => toggleCase(el)).join(" ");

  var answer = newString;
  return answer;
}
```

<br>

#### Test Code

<br>

```js
function test() {
  const result = solution(s);
  console.log(`result: ${result}, expected: ${expected}`);
  const boolean =
    result === expected ? console.log(y("true")) : console.log(r("false"));
  return boolean;
}

test();
```

<br>

#### 기존 풀이와 비교

1. 오늘 풀이는 2중 `for` 문이 없는 대신 함수가 하나 더 늘었다.
2. 오늘은 `array`로, 그때는 `string` 으로 처리했다.
3. `white space` 때문에 `slice` 가 필요했다.

```js
function solution(s) {
  let splitS = s.split(" ");

  let result = "";
  // 1 --->
  for (let i = 0; i < splitS.length; i++) {
    for (let j = 0; j < splitS[i].length; j++) {
      if (j % 2 === 0) {
        result += splitS[i][j].toUpperCase();
      } else {
        result += splitS[i][j].toLowerCase();
      }
    }
    // 2 --->
    result += " ";
  }
  // 3 --->
  let realResult = result.slice(0, -1);

  return realResult;
}
```

<br>

#### 정리

- 처음 풀었을 때보다 코드가 깔끔해졌는지는 모르겠지만 접근하는 마음이 훨씬 안정적이었고, 수월하게 풀었다.

<br><br>

### 4. K번째수(정렬)

---

개인적으로 가장 편안하게 다가갈 수 있는 문제 유형인 것 같다.<br>
정렬이라서 그런지 그냥 순차적으로 해나가는 느낌이라 코드도 그런 흐름으로 작성된 것 같다.

<br>

#### 개요

- `array` 가 주어지면 `commands`의 원소인 `command` 로 `i` 부터 `j` 까지 자르고, `k` 번째 수를 구하면 된다.
- `command` 의 길이는 `3` 이다.

  ```js
  const array = [1, 5, 2, 6, 3, 7, 4];

  const commands = [
    [2, 5, 3],
    [4, 4, 1],
    [1, 7, 3],
  ];

  const expected = [5, 6, 3];
  ```

<br>

#### 풀이

1. `commands` 안에 있는 각각의 `command` 로부터 `k` 넘버를 구할 수 있는 함수 `miniArray` 를 만들고, `k` 넘버를 `return` 한다.
2. `miniArray` 로 구한 `k` 넘버를 `push` 해줄 수 있는 `pushNumber` 함수를 만들고, `commands.length` 만큼 반복해서 `result` array를 `return` 한다.

<br>

```js
function solution(array, commands) {
  // 1 --->
  function miniArray(arr) {
    let temp = array.slice(arr[0] - 1, arr[1]);
    let kNum = temp.sort((a, b) => a - b)[arr[2] - 1];
    return kNum;
  }

  // ---> 2
  function pushNumber(cmd) {
    let result = [];
    for (let i = 0; i < cmd.length; i++) {
      result.push(miniArray(cmd[i]));
    }
    return result;
  }

  let result = pushNumber(commands);
  var answer = result;
  return answer;
}
```

<br>

#### Test Code

<br>

```js
function test() {
  let result = solution(array, commands);
  console.log(`expected: ${expected}, result: ${result}`);
  return JSON.stringify(expected) === JSON.stringify(result)
    ? console.log(y("true"))
    : console.log(r("false"));
}

test();
```

<br>

#### 기존 풀이와 비교

1. 기존에 `for` 문 안에서 일을 다 처리했다면 이번에는 일을 좀 나눠서 두가지 함수가 처리했다.

```js
function solution(array, commands) {
  let sliceArr = [];
  let returnArr = [];

  for (let i = 0; i < commands.length; i++) {
    let j = array.slice(commands[i][0] - 1, commands[i][1]);
    sliceArr.push(j);
    sliceArr[i].sort((a, b) => a - b);
    let k = sliceArr[i][commands[i][2] - 1];
    returnArr.push(k);
  }

  var answer = returnArr;

  return answer;
}
```

<br>

#### 정리

1. 동료 코드를 보다가 `sort` 때문에 통과가 안된 케이스를 발견했다.
2. `sort()` 와 `sort((a, b) => a - b)` 가 다르게 동작한다는 사실을 잊고 있었는데, `json` 이 명쾌하게 설명해줬다. 자세하게 알고 싶다.
3. 2번째 문제에서 `return` 이 `array` 로 되면서 `Test code` 를 못만들고 넘어갔는데, `JSON.stringify`로 배열이 완전히 동치인지 확인할 수 있도록 만들어봤다.

<br>

### 총정리

<br>

- 한 문제 빼고 `Test Code` 를 작성해봤는데 이런식으로 하는건지 모르겠다.
  - 아마도 더 많은 케이스를 수용할 수 있도록 짜는게 좋을 것 같고, 조금 더 공부해 봐야겠다.
- 사실 예전에 풀었던 문제라서 더 부담된 점도 있었다.
- '그 동안 열심히 했는데 그 때보다 더 못하면 어떡하지' 라는 마음이 있었는데, 결과적으로 다 풀었다.
- 코드개 개선됐냐고 하면 그건 아직 모르겠다. 아마도 기본적인 JS 문법을 샅샅히 공부해야 할 것 같다.
- 곧 또 만나자 알고리즘.
