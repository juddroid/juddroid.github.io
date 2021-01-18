---
title: "Practice Functional Programming"
categories: Digging cs
tag: functinal programming IIEF closure scope chain stream
---

## 정리

- 한번에 하나씩만
- 기본 함수만 사용해보자
- 메서드만 정의하고, 변수에 담기

<br>

- 함수가 순수해야됨
- 함수를 인풋으로 받을 수 있음
- 반복문을 피해라(대체제, map, reduce, filter)
- 리스트 뿐만이 아니라?
- 샌드위치 사진(reduce)
- Use immutable data

<br>

- ### 참고한 자료

  - [함수형 프로그래밍이란?](https://godsenal.com/posts/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80/)
  - [함수형 언어, 5분만에 개념 순삭!(feat. 절차지향, 객체지향) - 디모의 5분 코딩상식](https://www.youtube.com/watch?v=FCH9ufdKxWE)
  - [함수형 프로그래밍이 뭔가요? - 얄팍한 코딩사전](https://www.youtube.com/watch?v=jVG5jvOzu9Y)
  - Closure - 생활코딩
  - [JavaScript로 함수형 프로그래밍 배우기 - Anjana Vakil - JSUnconf](https://www.youtube.com/watch?v=e-5obm1G_FY&feature=youtu.be)
  - [자바스크립트의 스코프와 클로저](https://meetup.toast.com/posts/86)
  - [클로저, 그리고 캡슐화와 은닉화](https://meetup.toast.com/posts/90)
  - [JavaScript 클로저(Closure)](https://hyunseob.github.io/2016/08/30/javascript-closure/)
  - [람다, 익명 함수, 클로저](https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/)
  - [IIFE - MDN](https://developer.mozilla.org/ko/docs/Glossary/IIFE)

---

<br>

## 시작: 꼬리에 꼬리를 물고 가도록 해보자

<br>

## 1. 퓨어 함수라면 외부로부터 종속되어 있지 않기 때문에 응당 혼자서도 잘 작동해야겠지

---

<br>

### 먼저 한줄만 가져와보자.

<br>

```js
  factors() {
    var factorSet = new Set();
    // for문 안을 먼저 수정해보자
    for (var pod = 1; pod <= Math.sqrt(this.number); pod++) {
      if (this.isFactor(pod)) {
        factorSet.add(pod);
        factorSet.add(this.number / pod);
      }
    }
    return factorSet;
  }
```

<br>

### Array를 구해내는게 관건인 것 같다.

<br>

```js
podArr = (num) => {
  let podRaccoon = { length: Math.sqrt(num) };
  return Array.from(podRaccoon, (_, i) => i + 1);
};

podArr(10);

// expected output: [1, 2, 3]
```

<br>

### 이렇게 해봤다. 혼자서도 작동할까?

<br>

![screenshot002](https://user-images.githubusercontent.com/70361152/104885028-ad324f80-59aa-11eb-8aa0-cf4a21ec52c5.png)

<br>

### 원하는대로 작동한다. 바로 `return`해볼까

<br>

```js
podArr = (num) => Array.from({ length: Math.sqrt(num) }, (_, i) => i + 1);

podArr(10);

// output: [1, 2, 3]
```

<br>

### 여기까지는 잘 작동한다.<br> 이제 다시 `ClassifierAlpha` 클래스로 돌아왔다. <br> 다음 단계는 `podArr`의 요소 중 `isFactor`가 `true`인 요소를 찾아야 한다. <br> `filter`을 써봤다.

<br>

```js
filterPodArr = (num) =>
  this.podArr(num).filter((pod) => this.isFactor(num, pod));

var alpha1 = new ClassifierAlpha(10);

console.log(alpha1.filterPodArr(10));

// output: [1, 2, 3]
```

<br>

### 여기까지는 잘 작동한다.

### 이제 `for`문을 통해 `factorSet`에 반복적으로 `add`해 주던 값을 반복문 없이 세팅을 하는게 좋겠다.

### 어떻게 해야 좋지...

### `reduce`를 써서 `Set` 객체에 넣어봤다.

<br>

```js
functionalFactors = (num) =>
  this.filterPodArr(num).reduce((acc, cur) => {
    acc.add(cur);
    acc.add(num / cur);
    return acc;
  }, new Set());

var alpha1 = new ClassifierAlpha(10);

console.log(alpha1.functionalFactors(10));

// expected output: Set(4) { 1, 10, 2, 5 }
// output: Set(6) { 1, 10, 2, 5, 3, 3.3333333333333335 }
```

<br>

### `Set`가 무의미하게 됐다. 왜지...

### 이제보니 `isFactor`를 수정을 안했다. 수정해보자.

### 사실 `filterPodArr`는 제대로 작동이 안되고 있는거였다..

<br>

```js
  isFactor(number, potentialFactor) {
    return this.number % potentialFactor == 0;
  }
  // isFactor(potentialFactor) {
  //   return this.number % potentialFactor == 0;
  // }

  // expected output: [1, 2]
  // output: [1, 2]
```

<br>

### `isFactor`의 역할은 `podArr`의 요소가 `number`로 나누어 떨어지는가를 확인하는 것이기 때문에, <br> `10 % 3`은 `false`가 되어 `filter`됐어야 했다.

### 자 이제 여기까지 합체시켜보자.

<br>

```js
functionalFactors = (num) =>
  Array.from({ length: Math.sqrt(num) }, (_, i) => i + 1)
    .filter((pod) => this.isFactor(num, pod))
    .reduce((acc, cur) => {
      acc.add(cur);
      acc.add(num / cur);
      return acc;
    }, new Set());

var alpha1 = new ClassifierAlpha(10);

console.log(alpha1.functionalFactors(10));

// expected output: Set(4) { 1, 10, 2, 5 }
// output: Set(4) { 1, 10, 2, 5 }
```

<br>

### 이제 함수형 프로그래밍으로 작성된 `functionalFactors`로 기존의 `factors`를 대체시켜도 될 것 같다.

### 코드들이 답답할 것 같아서 클래스에서 꺼내봤다.

<br>

```js
const factors = (num) => {
  const isFactor = (number, potentialFactor) => number % potentialFactor == 0;
  return Array.from({ length: Math.sqrt(num) }, (_, i) => i + 1)
    .filter((pod) => isFactor(num, pod))
    .reduce((acc, cur) => {
      acc.add(cur);
      acc.add(num / cur);
      return acc;
    }, new Set());
};

const isPerfect = () => ClassifierAlpha.sum(factors(num)) - number == number;

const isAbundant = () => ClassifierAlpha.sum(factors(num)) - number > number;

const isDeficient = () => ClassifierAlpha.sum(factors()) - number < number;

const sum = (factors) => {
  var total = 0;
  factors.forEach((factor) => {
    total += factor;
  });
  return total;
};

const alpha1 = factors(10);
const alpha2 = factors(6);

//output: Set(4) { 1, 10, 2, 5 }
//output: Set(4) { 1, 6, 2, 3 }
```

<br>

### 다행히 결과가 잘 출력되고 있다.

### 다음 단계는 static 함수를 함수형으로 바꿔줄 차례인 것 같다.

<br>

```js
  static sum(factors) {
    var total = 0;
      factors.forEach( (factor) => {
        total += factor;
    });
    return total;
  }
```

### 이번에는 확실히 `reduce`가 보인다. `factors`를 한 번 더 받아오는 개념이 헷갈렸지만 앞에서 받아와야하는 값을 생각해보니 `output`된건 이것뿐이라 비교적 빨리 생각이 났다.

### 이래서 `debugging`이 쉽다는 건가.

<br>

```js
const sum = (factors) =>
  Array.from(factors).reduce((acc, cur) => (acc += cur), 0);
```

### 개념이 어색하고 어렵지만 일단 코드가 읽기 좋고, 내 코드는 항상 장편소설 같았는데 코드가 비교적 짧아서 마음에 든다.

<br>

```js
const factors = (num) => {
  const isFactor = (number, potentialFactor) => number % potentialFactor == 0;
  return Array.from({ length: Math.sqrt(num) }, (_, i) => i + 1)
    .filter((pod) => isFactor(num, pod))
    .reduce((acc, cur) => {
      acc.add(cur);
      acc.add(num / cur);
      return acc;
    }, new Set());
};

const isPerfect = (num) => sum(factors(num)) - num === num;

const isAbundant = (num) => sum(factors(num)) - num > num;

const isDeficient = (num) => sum(factors(num)) - num < num;

const sum = (factors) =>
  Array.from(factors).reduce((acc, cur) => (acc += cur), 0);

let alpha1 = 10;
let alpha2 = 6;

console.log(isPerfect(alpha1));
console.log(isPerfect(alpha2));

// expected output: false true
// output: false true
```

<br>

### 다음은 `PrimeAlpha` 클래스를 리팩토링 해보자.

<br>

```js
class PrimeAlpha {
  number = 0;

  constructor(number) {
    this.number = number;
  }

  equalSet(aset, bset) {
    if (aset.size !== bset.size) return false;
    for (var a of aset) if (!bset.has(a)) return false;
    return true;
  }

  isPrime() {
    var primeSet = new Set([1, this.number]);
    return this.number > 1 && this.equalSet(this.factors(), primeSet);
  }

  isFactor(potentialFactor) {
    return this.number % potentialFactor == 0;
  }

  factors() {
    var factorSet = new Set();
    for (var pod = 1; pod <= Math.sqrt(this.number); pod++) {
      if (this.isFactor(pod)) {
        factorSet.add(pod);
        factorSet.add(this.number / pod);
      }
    }
    return factorSet;
  }
}
```

### 모양이 `ClassifierAlpha`와 상당히 유사하다.

<br>

```js
  equalSet(aset, bset) {
    if (aset.size !== bset.size) return false;
    for (var a of aset) if (!bset.has(a)) return false;
    return true;
  }

  isPrime() {
    var primeSet = new Set([1, this.number]);
    return this.number > 1 && this.equalSet(this.factors(), primeSet);
  }
```

### 이 부분만 다르기 때문에 수정해주면 될 것 같다.

<br>

```js
const equalSet = (aset, bset) => {
  if (aset.size !== bset.size) return false;
  for (var a of aset) if (!bset.has(a)) return false;
  return true;
};

const isPrime = (num) => {
  var primeSet = new Set([1, number]);
  return number > 1 && equalSet(factors(), primeSet);
};
```

<br>

### 일단 오류가 나지 않도록 함수와 변수명을 수정해보았다.

### 그리고 반복문을 제거해줄 계획이다.

###### 이게 스스로 시간을 정해서 끊어가지 않으면 밥시간을 놓칠 것 같다. 밥먹고 해야겠다.

### `equalSet`에 `return`이 3개나 있다.

### `Prime Number`는 1과 자기 자신으로만 나누어지는 수인데, `isPrime`에서 `primeSet`을 `new Set([1, num])`으로 했고, 이것을 `aset`으로 넘겨주기 때문에 `size` 항상 `2`가 되고, 이것만으로도 `Prime Number`의 조건을 충족시킨다고 생각하기 때문에 `equalSize`라는 함수로 만들어 `isPrime`에 `return`해줬다.

<br>

```js
const equalSize = (aset, bset) => aset.size === bset.size;
```

<br>

## 2. 이제 이 함수들을 출력해주는 코드를 작성해보자.

---

<br>

```js
const checkNumber = (num) => {
  let arr = [];
  if (isPerfect(num)) {
    arr.push("perfect");
  } else if (isAbundant(num)) {
    arr.push("abundant");
  } else if (isDeficient(num)) {
    arr.push("deficient");
  }
  if (isPrime(num)) {
    arr.push("prime");
  }
  return arr;
};
```

### 이 코드를 작성하기까지 한참동안 `Closure`를 공부했다.

### 공부한 것에 비해 이해가 많이 되지는 않은 것 같다.

### 다시 정리를 해봐야 될 것 같다.

### `Closure`를 들여다 본 이유는 마지막 출력문의 조건이 반드시 `Closure`를 선언하고, `reduce`로 구현해야했기 때문이었는데, 이해가 선행되지 않으니 제대로 구현한건지는 잘 모르겠다.

<br>

> 다만 그 동안 짧은 시간 코딩하면서 자연스럽게(?) 나도 모르게 `Closure`를 경험하고 있었을 수도 있을 것 같다. 그 간의 코드를 되짚어 봐야겠다. 현재까지의 이해로는 함수 안에 내부 함수를 구현하면 `scope chain`이 생성되기 때문에 `closure`가 생성됐다고 보고있다.

<br>

## 3. 마지막 출력문을 `reduce`로 구현하려고 하는데, 마땅히 사용할 `array`가 없다.

---

### `Functional Programming`을 제대로 했다면 응당 `output`을 바로 찾아낼 수 있으리라 생각하고 보니 `output`을 받아줄 새로운 `array`가 필요했다.

### 오늘 발견한 신기한 배열 만들기로 범위를 지정할 수 있는 배열을 만들었다.

<br>

```js
const getArr = (min, max) =>
  Array.from({ length: max - min + 1 }, (_, i) => i + min);
```

### 이제 마지막 출력문이다. `reduce`를 이용해서 구현해야 한다.

<br>

```js
const print = getArr(2, 100).reduce((acc, cur) => {
  acc += console.log(`${g(`${cur}`)} : ${y(`${checkNumber(cur).join(", ")}`)}`);
  return acc;
});
```

### 잘 출력된 것 같은데 출력 상단부가 좀 이상하다.

<br>

> 23 : deficient, prime <br> 4 : deficient <br> 5 : deficient, prime

### 이제보니 `reduce` 초기값을 빼먹었다. 한참을 헤맸다.

<br>

```js
const print = getArr(2, 100).reduce((acc, cur) => {
  const checkNumber = (num) => {
    let arr = [];
    if (isPerfect(num)) {
      arr.push("perfect");
    } else if (isAbundant(num)) {
      arr.push("abundant");
    } else if (isDeficient(num)) {
      arr.push("deficient");
    }
    if (isPrime(num)) {
      arr.push("prime");
    }
    return arr;
  };

  acc += console.log(`${g(`${cur}`)} : ${y(`${checkNumber(cur).join(", ")}`)}`);
  return acc;
}, "");
```

### 최종적으로 `checkNumber`를 내부 함수로 넣어주고, `reduce` 초기값도 수정해주었다.

<br>

<center>

![screenshot004](https://user-images.githubusercontent.com/70361152/104941924-163fb480-59f7-11eb-860f-4fadf6dfbbde.png)

</center>
