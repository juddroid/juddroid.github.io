---
title: "Bundler exec jekyll serve is not working"
categories: Digging Digging
tag: [ruby, rbenv, gem, jkeyll]
---

### `Bundler exec jekyll serve` is not working

---

지난 주말 `jekyll` 에 `theme` 한 번 입혀보겠다고, 밤을 지새웠다. <br> 배운 것과 생각을 정리하는 공간을 갖고 싶긴한데 개인적으로 갖추고 싶은 몇가지 조건이 있었다.

1. `mark down`을 사용할 수 있을 것
2. `theme` 가 충분하지만 `customaizing` 이 가능할 것
3. `git`으로 관리할 수 있을 것
4. 다른 블로그와 달리 쉽게 예쁠 수 있을 것

사실 학습하는 걸 정리하는 시간도 모자랐기 때문에 어떤 형태로든 빨리 글을 쓸 수 있는 공간만 있으면 됐기 때문에 `tistory` 나 `velog` 도 염두에 두고 있었다. 하지만 그냥 저런 이유들로 - 어쩌면 이미 마음속으로는 `나는 깃헙페이지가 갖고 싶어` 라고 정해놨던건지도 모르겠지만 - 결국 `github page` 를 선택했다.

- `jekyll` 을 설치해야 했고,
- `github page` 와 연동시켜야 했으며,
- 그 자체로는 예쁘지 않기 때문에 `theme`를 설치해야 했다.

짧게 3줄로 요약됐지만 저 과정은 절대 내게 만만한 과정이 아니었다. 그 삽질에 대해서는 다시 그런 날이 올 수도 있는 점을 대비해서 차차 기록으로 남길 예정이다. 사실 설치과정도 워낙 삽질을 많이해서 어떻게 제대로 설치할 수 있었는지 잘 기억이 나지 않지만 아직 정확히는 몰라도 대략적으로는 기억이 난다.

<br>
<br>
<br>

### 1. 본론으로 들어가자면 오늘 `jekyll server` 가 실행 불능상태에 빠졌었다.

---

<br>

- 실행 명령어가 작동하지 않을 때 뒤에 영어로 `not working` 을 포함시켜 검색하면 답을 찾기가 좀 수월한 것 같다.
- 물론 오늘과 같은 경우에는 조금 더 특수한 사례라서 힌트를 얻기가 매우 힘들었다.

```bash
$ bundler exec jekyll s
```

- 위 명령어로 가상 서버를 띄워놓고, `jekyll` 과 함께 사용 할 `liquid` 문법을 조금 배우며 테스트 해보려던 참이었다.
- `bundle install` 을 실행하라는 오류 메세지가 떴다.
- 얼마 전 `theme` 를 설치하는 과정에서 마지막에 깃헙페이지의 로컬 레포지토리를 삭제하고, `git clone` 을 했었다.
- `bundle` 이 설치된 `vendor` 폴더를 `.gitignore` 에 추가하고, 원격지에 `push` 를 했었기 때문에 삭제할 당시 vendor 폴더는 삭제가 됐고, clone 했을 때는 없었으므로 당연하다고 생각하고, 다시 설치하기로 했다.

<br>

```bash
$ bundle install
```

- 이 설치 과정이 약간의 시간이 필요로 했었다.
- 그래서 `liquid` 를 적용해 볼 생각에 들뜬 마음으로 보던 유튭 영상을 마져보고 있었는데, 설치 도중 갑자기 컴퓨터가 다운됐다.
- 정확히 기억나지 않지만 `kernel` 관련 오류메세지가 보였고, 윈도우가 스스로 오류복구를 하고, 재부팅되기까지 상당한 시간이 걸렸다.
- 컴퓨터가 재부팅 되자마자 가장 먼저 확인한건 `budnle` 이 어디까지 설치됐는지였다.
- 나는 그걸 확인하는 방법을 모르니 그냥 다시 설치했다.

<br><br>

### 2. 본격적인 오류 `racc 1.5.4 cannot find any of folder`

---

<br>

- 정확한 오류메세지가 기억이 나지는 않지만 바로 저 `gem` 을 찾을 수 없다는 이야기였다.

  ```bash
  $ gem install racc -v 1.5.4
  ```

- 일단 `racc` 가 뭔지는 모르겠지만 `gem` 중 하나인 것 같아서 이런 식으로 다시 설치했더니 무사히 설치가 됐다고 나온다.
- 하지만 서버를 다시 실행시켰을 때, 여전히 `racc` 을 찾을 수 없으니 `gem install` 을 해서 missing gem 을 찾아내라고 한다.

  ```bash
  $ bundle update
  ```

- 이번에는 `update` 를 해봤다. `update` 를 하면 `fetch` 를 진행한다는 메세지가 나오는데, 이러면 설치된 `gem` 을 관련된 파일들이 알아볼 수 있게 `fetch` 될 거라고 생각했다.
- 하지만 결과는 마찬가지였다. 실패.

<br><br>

### 3. `Gemfile.lock` 을 삭제해보자.

---

<br>

설치할 때 얼핏 봤던 내용이 생각이 났다.

> `Bundler` is a gem that installs `all gems in your Gemfile`.

`Bundler` 는 `Gemfile` 에 내가 설치한 모든 `gem` 을 명세한다는 것 같다. 그리고 `bundler` 의 존재 이유가 `gem` 들간의 `dependency` 때문에 생길 수 있는 오류를 방지하기 위해서 한데모아 묶어주는 역할을 한다고 했던 것 같다. 그리고 `bundle install` 을 다시 하면 `gemfile.lock` 이 생성된다고 했다. 그래서 아래와 같은 방법으로 다시 시도해 봤다.

- `gemfile.lock` 을 삭제한다.
- `bundle update` 를 진행한다.
  - 이 과정에서 `Permissin Denied` 된 부분이 있어서 `sudo` 로 강제 진행했더니 '필요하면 요청할테니 bundle을 root권한으로 설치하지 마라. 그랬다간 너의 application이 다 망가질 수도 있다'는 섬뜩한 노란색 경고문이 나타났다.
  - (아니 그런 내용을 이미 권한요청해서 비밀번호를 입력한 후에 보여주면 어떡하냐 ㅠㅠ 게다가 `sudo` 권한 없이 설치했을 때, 요청하지도 않았잖아..)
- 설치를 마친 후 확인해보니, 다행히도 다시 `gemfile.lock` 이 생성됐다.
- 그리고 다시 서버를 실행시켰는데 결과는 실패.

<br><br>

### 4. `vendor` 폴더를 통째로 삭제 후 재설치해보자.

---

<br>

- `rm -r vendor` 로 폴더 삭제
- `bundle install` 로 다시 설치
- 같은 오류 메세지로 실패

<br><br>

### 5. `Github Pages repository` 를 통째로 삭제 후 다시 `clone` 해보자.

---

<br>

- 스크립트에 무지한 자가 오류를 헤쳐나가는 방법은 결국 삭제와 설치의 반복뿐이었던가.
- 작성하던 포스트 몇 개만 따로 백업해놓고, `github pages repository` 를 삭제했다.
- 그리고 다시 `git clone`
- `bundle install`
- 드디어 서버가 실행됐다. 성공.

<br><br>

### 6. `Ruby` 와 `Gem` 들...

---

<br>

왜 이런일이 일어난거지?... <br>
모르겠다. <br>
컴퓨터가 갑자기 다운되서 install 되던 스크립트에서 오류가 난건지 반대로 스크립트에서 뭔가 충돌이 생겨서 컴퓨터가 다운이 된건지. <br>
이유를 몰라서 조금 답답하긴한데 결국엔 원하는대로 되서 기분이 좀 나아졌다. <br>
물론 삽질하느라 `liquid` 는 제대로 익히지도 못했고, 아까운 시간이 흘러갔다. <br>
그래서 간단히 `ruby` 의 `gemfile` 에 대해서 검색해봤다. <br> <br>
현재까지의 이해는 이렇다. `Ruby` 와 `NodeJS` 를 비교해가며 이해했다.
<br>

- `Ruby` : `NodeJS` 와 같이 생각하고 있지만 `Ruby` 는 언어, `NodeJS` 는 8기통 우수한 엔진
- `rbenv` : `NVM` 처럼 `Ruby`의 `version` 을 관리해주는 녀석이다.
- `Gem` : `npm` 같은 `ruby` 의 `package module` 이나 `library` 정도로 생각하고 있다.
  - 게임에서 많이 봤던것처럼 루비에 젬을 끼워써서 그런가보다.
- `Gemfile` : `gem` 을 명시할 수 있는 파일
- `Gemfile.lock` : `bundle install` 로 명시된 `gem` 을 `lock`

<br>

- [Bundler](https://bundler.io/) : `gem` 의 `dependency` 관리를 위한 것

<br><br>

#### 참고

- [지킬 블로그 Gemfile과 Gemfile.lock](https://techstock.biz/Jekyll-Blog/Gemfile-Gemfile.lock/)
- [Gemfile 과 Gemfile.lock 그리고 bundle install과 bundle update](https://jehogu.tistory.com/entry/Gemfile-%EA%B3%BC-Gemfilelock-%EA%B7%B8%EB%A6%AC%EA%B3%A0-bundle-install%EA%B3%BC-bundle-update)
