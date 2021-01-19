---
title: "일급함수(First-class function)? 함수에 급수가 있다니..."
categories: Digging cs
tag: [functional programming, FP, closure, Fisrt-class function, pure function]
---

### **1. 일급함수(First-class function)**

<br>

`인프런`에서 `함수형 프로그래밍 개요`를 수강하던 중 `일급함수`라는 단어를 만나고, 내심 놀랐다. 함수에 급수가 있다니...<br>

가볍게 이해해보자면 `javascript`의 `function`은 `arguments`로 `function`을 받을 수 있는 함수이기 때문에 **일급함수**라고 한다.<br>
(그렇다면 그게 불가능한 언어도 있나보다.)<br>

본인도 글을 작성하며 이해하는 중이다.<br>
새로운걸 발견했을 땐 `MDN`으로 가본다.<br>

- [Fisrt-class Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)

> A programming language is said to have **First-class functions** when **functions in that language are treated like any other variable.** For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable.

그러니까 프로그래밍 언어에서 `function`을 변수처럼 다루면 그 언어는 일급함수를 가지고 있다는 것 같다. (그러니까 그게 안되는 언어가 분명히 있나보다.)

> Even if your function was named, you can use the variable name to invoke it. Naming it will be helpful when debugging your code. But it won't affect the way we invoke it.

심지어 `function`이 이름을 가지고 있어도 거기에 `variable name`을 `invoke`해서 사용할 수 있다.

```js
const ingRaccoon = function raccoon(doing) {
  return `${doing} raccoon`;
};

console.log(ingRaccoon("digging")); // digging raccoon
```

이렇게 `raccoon`이라는 이름을 가진 함수에 `ingRaccoon`이라는 이름을 할당할 수 있다. 그 동안 자연스럽고 당연하게 여기면서 사용해왔는데 `javasrcipt`의 `function`이 `First-class function`이라서 가능했나보다.

> 세상은 자바스크립트 아니겠습니까!

<br>

다시 강의 내용으로 돌아가보면

```js
function add_maker(a) {
  return function (b) {
    return a + b;
  };
}

var add10 = add_maker(10);

console.log(add10(20)); // 30
```

위의 예에서

- `add_maker`는 `return`값으로 `function`을 내보내고 있다.
- 그 `function`은 `a + b`를 `return`한다.<br>
- `add10`은 `add_maker`의 `parameter`로 `10`을 넣어주었다.
- 결과는 당연하게도 `30`이다.

```js
var add10 = add_maker(10);
```

이해가 어려워서 `add_maker`에서 `return`되는 `function`을 다시 표현해봤다.

```js
var add10 = function (b) {
  return 10 + b;
};
```

눈으로 확인이 되어야 이해가 되는게 좀 아쉽지만 바꿔놓고 나니 훨씬 눈에 잘 들어온다.<br>
결국 `add_maker`의 `return`은 `add10`이라는 이름이 붙지 않은 `function`이었다. 이 개념을 자유자재로 사용하려면 조금 더 익숙해질 시간이 필요할 것 같다.<br>
<br>
그리고 여기에 `closure`와 `pure function`을 발견할 수 있다고 한다. 추후에 더 공부해야 할 부분이다.<br>
<br>
여기에서 조금 더 나아가면

```js
function raccoon(fn1, fn2, fn3) {
  return fn3(fn1() + fn2());
}

raccoon(
  // fn1
  function () {
    return 2;
  },
  // fn2
  function () {
    return 1;
  },
  // fn3
  function (j) {
    return j * j;
  }
); // 9
```

이렇게 `raccoon` 함수의 `parameter`로 세 개의 `function`을 넣어 줄 수 있다.<br>

- `fn1`은 `2`를, `fn2`는 `1`을 `return`한다.
- `raccoon`의 `return`은 `fn1`과 `fn2`의 `return`을 더한 값을 `fn3`에 `parameter`로 넣어 돌려주고 있다.
- `fn3`은 `arguments` 하나를 받아서 제곱해주고 있다.

```js
function raccoon(fn1, fn2, fn3) {
  return fn3(2 + 1);
}
```

위에서처럼 바꿔서 보면 이렇게 되는 것이므로 결과는 `9`가 되는 것을 쉽게 예측할 수 있었다.<br>
<br>
코딩에 있어서도 패러다임이 있다고 하는데 최근에 `객체지향 프로그래밍(OOP)`과 `함수형 프로그래밍(FP)`에 대해 알게 되었고, 이러한 형태는 `함수형 프로그래밍(FP)`의 기본이 된다고 한다. 여기에 대해서 이미 여러 영상과 글을 통해 공부를 하고 있지만 아직 뚜렷하게 정리되는 것이 없어서 차근차근 개념부터 정리중이다.
<br>
<br>
그렇다면 지금까지 내가 해온 것은 `ROP(Raccoon Oriented Programming)`...
