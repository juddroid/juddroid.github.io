---
title: "[CS] 반가산기가 뭘까"
categories: [Digging, Computer Science]
tag: [halfadder, and, or, not, sum, carry]
---

### 1. [반가산기(Half adder)](https://ko.wikipedia.org/wiki/%EA%B0%80%EC%82%B0%EA%B8%B0)가 뭘까

---

#### 가산하는 거니까 뭔가 더하는 느낌이다. 그런데 반가산기니까 반만 더하는 계산기가 아닐까. 코딩을 처음 접하는 내게 가산기, 반가산기, 논리회로(?) 같은 단어는 너무 생소하고 어렵다. 위키에서 한 번 검색해봤다.

<br>

#### [반가산기](https://ko.wikipedia.org/wiki/%EA%B0%80%EC%82%B0%EA%B8%B0)

> 이진수의 한자리수를 연산하고, <br>자리올림수는 자리올림수 출력(carry out)에 따라 출력

<br>

#### **내 방식대로 이해하기**

---

이진 덧셈을 하는데
<br>
`한자리`는 이진 덧셈을 하고,
`자리올림수`는 자리올림을 한다.

<br>

#### 당연한 말의 향연인데, 반가산기라는걸로 나올 수 있는 모든 경우의 수를 적어보며 가만히 따져보니 이해가 갈 것도 같았다. 그렇게 따져보면 아래와 같은 표가 하나 만들어지는데 그걸 `진리표`라고 하는 것 같다.

<br>
<center>

| A   | B   | C   | S   |
| --- | --- | --- | --- |
| 0   | 0   | 0   | 0   |
| 0   | 1   | 0   | 1   |
| 1   | 0   | 0   | 1   |
| 1   | 1   | 1   | 0   |

##### **`진리표`**

</center>
<br>

#### - A: inputFirst

#### - B: inputSecond

#### - C: outputCarry

#### - S: outputSum
