---
title: "[CS] Data 백만개 어떻게 처리하지..(feat. bulk insert)"
date: 2021-02-01-05:06:00
categories: [Digging, Digging]
tag: [mysql, bulk insert, database]

---



## Data 백만개 어떻게 처리하지..(feat. bulk insert)



- 며칠전 이런 어줍잖은 `progress bar` 를 만들고, 기괴한 코드를 짜놓고, 그래도 백만개의 데이터가 `db` 에 들어간다고 좋아했었다.

![progressbar](https://user-images.githubusercontent.com/70361152/106205577-09467080-6202-11eb-81d3-356a784128fe.gif)

- 하지만 `db` 의 세상에서 `data` 백만개는 일도 아니라는데, 저 굼벵이를 10여분간 흐뭇하게 바라보고 있어야 한다는게 영 찝찝하고 웃픈일이 아닐 수가 없었다.
- `bulk insert` 라는 멋진게 있다고 하는데,  지난 번에 참고한 이 글에 나와 있는 방법으로는 [대용량 INSERT 처리하기](https://velog.io/@hyeong412/TIL-%EB%8C%80%EC%9A%A9%EB%9F%89-INSERT-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0) 만족할만한 결과가 나오지 않았다. 결국 `honux` 의 명강의에 힘입어 `LOAD DATA` 를 알게 됐고, `csv` 를 만들기로 했다.
  
  - csv: comma-separated values
  
  
  
  

### 1. Data 백만개 만들기

---



- 사실 `data` 를 생성하는 것도 `sql` 문법으로 연습하면 좋았겠지만 앞선 카페 미션에 충격에 빠진 조금이라도 빨리 미션을 해보고 싶어서 `js` 로 스크립트를 짜고, `node module` 로 푸쉬하는 방법을 선택했다.
- 아직도 방법을 못찾았지만 `node module` 로도 `bulk insert` 를 하는 방법이 있을거라고 생각했다.
- 그런탓에 `javascript` 로 원하는 `data` 를 백만개를 생성하는건 아주 오래걸리지는 않았다.

```js
class SetData {
  nickName() {
    const randomNumber = (num) => Math.floor(Math.random() * (num - 0) + 0);
    // 코드가 쓸데없이 너무 길어져서 삭제했다.
    const englishName = []; // 영어단어 100개
    const alphabet = []; // 알파벳 26개

    const extractNumber = (num) => {
      let string = '';
      for (let i = 0; i < num; i++) {
        string += randomNumber(9);
      }
      return string;
    };

    const extractString = (num, arr) => {
      let string = '';
      for (let i = 0; i < num; i++) {
        string += arr[randomNumber(arr.length)];
      }
      return string;
    };

    let nick = extractString(1, englishName) + extractString(3, alphabet) + extractNumber(4);

    return nick;
  }
  money() {
    const randomNumber = (num) => Math.floor(Math.random() * (num - 0) + 1);
    return `${randomNumber(100000)}`;
  }
  randomDate(date1, date2) {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970';
    var date2 = date2 || new Date().toLocaleDateString();
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
      return new Date(randomValueBetween(date2, date1)).toISOString().split('T').join(' ').slice(0, -5);
    } else {
      return new Date(randomValueBetween(date1, date2)).toISOString().split('T').join(' ').slice(0, -5);
    }
  }
}

module.exports = { SetData };

```

- 이렇게 `data` 를 세팅해놓고,

```js
const { SetData } = require('./setdata.js');

const NICK = new SetData().nickName;
const MONEY = new SetData().money;
const LAST = new SetData().randomDate;

let NUM = 1000000;
let params = '';

for (let i = 0; i < NUM; i++) {
  params = [`${NICK()}`, `${MONEY()}`, `${LAST('01-29-2021', '02-28-2021')}`];
  let join = params.join(',');
  console.log(join);
}


```

- 이렇게  `for` 문을 돌리면 백만개 생성은 그렇게 오래 걸리지는 않는다.





### 2. CSV 파일을 어떻게 만들지...

---



- `node` 에 있는 `mysql` 모듈에 접속하는 것도 권한문제 때문에 두어시간 거하게 삽질을 했는데, 막상 연결해놓고 나니 개념도 분명치 않아서 어떻게 사용해야할지 더욱 막막했다.

- 그냥 `for` 문을 돌리면서 `connection` 열어놓은 상태에서 백만개 `INSERT` 하는건 어느정도 이해가 간다.

- 그런데 이걸 `csv` 파일로 만들고 싶은데, 방법이 떠오르지 않는다.

  

  #### 1. [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) 로 도전!

  - 파일에 관련된거라면 응당 `fs` 모듈이 뭔가를 가지고 있을거라는 생각에 `node` 문서를 뒤져보니 `readFile` 이라는게 있었다.

    ```js
    fs.writeFile('message.txt', data, (err) => {
      if (err) throw err;
      console.log(data);
      console.log('The file has been saved!');
    });
    ```

  - 이렇게 하면 `message.txt` 파일이 생성되는데, 다음번 반복문을 돌 때, 파일이 이미 있으면 내용을 `overwrite` 한다.

  - `data` 에  `argument` 로 `Buffer` 형식(?)로 넣게 되어 있어서 이거 알아본다고 또 한 세월을 보냈는데 아직 이해하지 못했다.

  -  `const data = new Uint8Array(Buffer.from(params))` 

  - 이 방법은 실패

    

  #### 2. [fs.appendFile](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback) 로 다시 도전!

  ```js
  fs.appendFile('message.txt', 'data to append', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
  ```

  - 비슷하지만 이번엔 파일이 있으면 추가로 덧붙여서 작성해준다.
  - 그런데 100개, 1000개씩은 잘 작성이 되는데, 백만개를 돌리는 순간 터미널이 멈춰버렸다.



3. [Redirection](https://ko.wikipedia.org/wiki/%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%EC%85%98)

   

   - 이것까지 실패하고 한참을 헤매고 있을 무렵 `DD` 코드를 살펴보고 있는데, 내거랑 뭔가 비슷한데 안비슷했다.

   - 도대체 어떻게 쟤네가 다 저 파일로 갑자기 간건지 너무 궁금해서 도움을 요쳥했더니

   - `redirection` 에 대해서 알려주신다.

   - bash` 쉘도 `linux` 니까 표준스트림 `redirection` 으로 출력물을 한꺼번에 파일로 옮길 수 있다는거다.

     ```bash
     node csv.js > data.csv
     ```

     - 이렇게 한 줄 적으면 끝나는 작업이다.
     - 이걸 알게되는데 하루가 걸리다니... 그래도 너무 기분이 좋다 ㅠㅠ
     - 좋은거야... 좋은거다 ㅠㅠ

   - 사실 리눅스 설치하고, 쉘스크립트에 대해서 학습할 때 분명히 설명을 듣긴 했었는데 제대로 이해하지 못했었다.

   - 확실하게 또 한번 깨닫지만... 제대로 이해하지 못하고 넘어가면 결국 다시 돌아온다.

   - 물론 학습 시간이 한정되어 있기 때문에 목적지향적으로 하는게 맞다는 생각이 들지만 때때로 어떤 부분은 배울 당시에 잘 이해하고 있었다면 목적을 향해 달려가는데 훨씬 많은 시간을 단축해줬을 것이라는 아쉬움도 남는다.



### 3.  이제 Bulk insert를 시도해보자.

---

- 어느정도 예상은 했지만 이것 또한 순탄치 않았다.
- 어떤 이상한 권한 문제에 걸려서 이날 밤 결국 포기하고 잠들어야만 했다.
- 이 과정을 기록을 했어야 했는데, 약간 반수면 상태에서 이것저것 오류만 나고 안된다는 사실에 좀 흥분했는지 오류에 대한 기록이 없다.

- 내 선택은 하루 미루고, 내일 다시 도전해보자 였다.
- 컴터를 켜자마자 도커에 있는 mysql 이미지를 전부 다 삭제하고, 다시 처임부터 차근차근 시작해봤다.
- 아마도 첫번째로 `mysql version` 문제를 간과하고, 임시방편으로 요령껏 문제를 처리했던게 어딘가부터 꼬여서 권한문제로 인한 `LOAD DATA` 를 실패하게 했던 것 같다.

![screenshot083](https://user-images.githubusercontent.com/70361152/106396289-574db500-644a-11eb-9830-8ce954a5fd69.png)

- 뭐 덕분에 피하려고 했던 `sql` 문법에 대해서 좀 더 다가서게 됐고, 몇 가지 영상을 더 찾아보고 공부하면서 `mysql` 환경에서도 조금 더 편하게 작업할 수 있었다.
- `root` 의 권한 설정도 외부접속제한 할 수 있도록 잘 바뀌었고, `%` 와일드카드 권한에 대해서도 좀 더 이해할 수 있었다.
- `docker` 컨테이너 안으로 파일을 복사해서 (또 `DD` 의 도움을 받았었다...ㅠ고마운 `DD`) 결국에는 4.56sec에 통째로 밀어넣기에 성공했다.



### 4.  삽질후기

---

- 너무 돌아오니까 힘들다.
- 돌아오면서 분명히 배운것들이 있었을텐데 제대로 정리한 것 없이 놓쳤다. 마음이 급했던 것 같다.
- 조금 더 꼼꼼하게 작업할 필요가 있는 것 같다. 처음에 mysql 버젼으로 인해 일어날 수 있는 문제에 대해 조금 더 찾아보고 시작했더라면 기록하지 못한 여러가지 요소에서도 시간을 단축하고, 본래 목적에 맞게 조금 더 학습할 수 있었을 것 같다.
- 뭐 그래도 재미있었다. 살면서 백만개 데이터 푸쉬해본건 처음이니까.