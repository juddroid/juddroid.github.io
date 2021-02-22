---

title: "[CS] PC방을 관리해보자"
date: 2021-02-01-05:57:00
categories: [Digging, Algorithm]
tag: [Hacker Rank, Code Force, v8, d8, readline, nodejs, javascript]
published: false
---



## PC방을 관리해보자



### 1. DATABASE 생성

---



```mysql
CREATE DATABASE pc_cafe_db;
GRANT ALL ON pc_cafe_db.* TO 'raccoon'@'%'
FLUSH PRIVILEGES;
```





### 2. TABLE 생성

---



- 조건에 따라 `TABLE` 생성
  - 사용자들을 구분할 수 있는 키값이 있어야 한다. null 불가능.
  - 사용자 키값으로 Index를 설정한다.
  - PC를 사용한 시작 시간이 있어야 한다. null 불가능.
  - PC를 사용한 종료 시간이 있어야 한다. null 가능
  - 선택한 PC 자리 번호를 지정할 수 있어야 한다. null 불가능.
- [MySQL in 25 Minutes | Primary and Foreign Keys | Database Terminology for Beginners](https://www.youtube.com/watch?v=8kDs8QkFI2Y)
- key에 대해서 공부
- 위 영상이 나에겐 가장 유효했다.
- 그리고 `json` 코드를 손으로 클론해서 이해해본뒤 내 코드로 만들어봤는데, 거의 비슷하고 조금 더 장황해졌다.
  - 고마워요 `json`



- PC table

![screenshot085](https://user-images.githubusercontent.com/70361152/106396717-1905c500-644d-11eb-9a21-8666c04d3d3e.png)

- pc를 관리하기 위한 테이블
- 16대의 pc에는 각각 숫자가 있고, status는 사용중이면 '1', 아니면 '0'이다. 기본값은 '0'으로 설정
- pc_no에는 `primary key` 를 연결



- HISTORY

![screenshot086](https://user-images.githubusercontent.com/70361152/106396719-1a36f200-644d-11eb-8136-797a1d8139ef.png)

- 사용자를 관리하기 위한 테이블
- `user` 는 `auto increment` 로 생성되고, 사실상 `key` 의 역할을 한다.
- `new` 라는 명령어를 받으면 `pc` 를 한 대 할당해주고, `user` 라는 키 값을 가져와서 누가 해당 `pc` 를 사용하고 있는지 알 수 있게 한다.
- `user` 키를 줄 때, `start` 에 시작시간 등록, `end` 는 `null` 값을 허용해줬다.
- pc_no는 `foreign key` 로 엮어줬다. 뭔가 체이닝하는 느낌으로 더 잘만들 수 있을 것 같은데, 시간 관계상 두 가지로 해야할 것 같았다.





### 3. 다시 만난 비동기

---

- 처음에 그냥 코딩을 하다보니 문제가 생겼다.
- 값을 주고 받고 해야하는데 비동기 문제에 다시 봉착하게 됐다.
- 카페 미션과는 달리 비동기의 필요성이 조금 더 분명하게 눈에 보였고, 다행히 `json` 코드를 보면서 비동기에 대해서 훨씬 더 이해할 수 있었다.

- [Node.js에서 mysql을 async/await으로 작성하기](https://holywater-jeong.github.io/2018/06/08/node-mysql-async-await)



- `mysql2/promise` 모듈을 이용했다.
- 우연히 모듈안을 들여다보게 됐는데, 모듈에 대해서도 조금 더 이해가 가는게 얘네도 다 `class` 와 `method`로 긴밀하게 이어져있나보다.
- `Pool` 은 `EventEmitter` 를 상속하고 있었고,

```ts
export function createPool(config: PoolOptions): Pool;
```

- `getConnection` 메서드가 어떻게 작동하는지 타입스크립트를 잘 모르지만 그래도 조금 더 감이 왔다.

```ts
export interface Pool extends EventEmitter {

// 생략
  
  getConnection(): Promise<PoolConnection>;
  on(event: 'connection', listener: (connection: PoolConnection) => any): this;
  on(event: 'acquire', listener: (connection: PoolConnection) => any): this;
  on(event: 'release', listener: (connection: PoolConnection) => any): this;
  on(event: 'enqueue', listener: () => any): this;
  end(): Promise<void>;
}
```





### 4. `json` 처럼 해보기

---



- 얼마전 `DD` 에게서도 `module` 화를 시키면 좋을 것 같다는 조언을 받았고,

- `json` 코드는 그야말로 철저하게 일을 나눠서 하고 있었다.

- 혼자 코드를 작성하면서 `query` 문이 너무 지저분했던 것도 있었는데, 모듈로 모아놓고보니 훨씬 깔끔하고 관리하기에도 좋다.

  ```js
  module.exports = {
    getPC: () => 'SELECT pc_no FROM PC WHERE status = 0',
    getUser: (pc_no) => `SELECT user FROM HISTORY where pc_no = ${pc_no}`,
    getPC_NUM: (user) => `SELECT pc_no FROM HISTORY where user = ${user}`,
    getHistory: () => `SELECT * FROM HISTORY`,
    updateState: (pc_no, status) => `UPDATE PC SET status = ${status} WHERE pc_no = ${pc_no}`,
    insertHistory: (pc_no) => `INSERT INTO HISTORY (pc_no, start) VALUES ('${pc_no}', now())`,
    updateHistory: (user) => `UPDATE HISTORY SET end = now() WHERE user = ${user}`,
    endPC: (pc_no, status) => `UPDATE PC SET status = ${status} WHERE pc_no = ${pc_no}`,
  };
  ```





### 5. mysql 모듈 작동방식과 promise

---

- 좀 천천히 하나씩 보고, 이해한대로 나열해보기

1. `mysql.createPool` 로 `mysql server` 에 접속하기 위한 `pool` 생성

2. `getConnection` 메서드로 `mysql server`에 접속 / 내부에서 콜백함수에 `async`가 중요한 포인트라는데 왜 인지는 이해 못함

3. `connection` 이  성공한 상태에서 `query` 요청
4. 여기까지 모두 담아서 `object`에 `excute` 라는 이름으로 담아놓기

- 이렇게하니 `mysql` 에 보다 접속해서 `query` 문으로 `data` 를 받아오는데 조금 더 간단하고 명료하게 할 수 있었다.



- 마지막으로 비동기 부분은 각각의 함수들이 `data` 를 받아올때까지 기다려줘야 하기 때문에
- `async`로 실행하고, `await` 로 기다려서 하나씩 `data` 를 받아왔다.
- 좋은 구조가 아니라는걸 알지만 아직 수정을 못하겠어서 흐름대로 상태를 관리해주고, 등록해주고, 지워주고를 반복했다.



### 6. 결과

---

- 모든 pc 사용중 일때, `new` 명령 입력되면 오류
- 이미 사용종료한 `user key` 로 `stop` 했을 때, `history` 목록을 그대로 가져옴
  - 이래서 `json`이 `USED_PC` 를 쓰신건가 ㅠ

![screenshot084](https://user-images.githubusercontent.com/70361152/106397546-713ec600-6451-11eb-994c-c97fc69d3ee1.png)

- 준비된 16대의 pc / status = 0 (사용가능)



![screenshot087](https://user-images.githubusercontent.com/70361152/106397550-73088980-6451-11eb-9a48-2735bfad1caf.png)

- 시작화면

![screenshot089](https://user-images.githubusercontent.com/70361152/106397552-73a12000-6451-11eb-9bd3-4245e985a1ef.png)

- PC table
- 사용중인 PC.status = 1

![screenshot090](https://user-images.githubusercontent.com/70361152/106397553-73a12000-6451-11eb-8e02-952fa2dd8411.png)

- HISTORY table
- 사용중인 `user` 들의 `key` 와 `pc_no` 
- 종료시간이 `NULL` 이면 사용중



![pccafe](https://user-images.githubusercontent.com/70361152/106397556-76037a00-6451-11eb-9816-c25acb2367dd.gif)