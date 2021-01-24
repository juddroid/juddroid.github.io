---
title: "[CS] Shell Script"
categories: [Digging, Computer Science]
tag: [shell, ssh, ssl]
---

# Mission: Shell script 정복기

- Shell Script를 한 번 본 후, 실습을 해보려고하니 너무 불편하고 안예쁨
- 조금만! 예쁘게 만들어보기로 함
- vimrc 수정

  ![cs02_25](https://user-images.githubusercontent.com/70361152/104014969-4321e980-51f7-11eb-86b2-5904ed4c84e2.jpg)

- Shell Script 실습 중

  ![cs02_26](https://user-images.githubusercontent.com/70361152/104014970-43ba8000-51f7-11eb-9b74-bd4faa2f1213.jpg)

- script를 보다보니 [#!/bin/sh](https://storycompiler.tistory.com/101) 가 계속 나오는데 뭔지 궁금해져서 좀 찾아봤다.

  ```
  ls -la /bin/sh
  ```

  ![cs02_27](https://user-images.githubusercontent.com/70361152/104014971-43ba8000-51f7-11eb-821a-d4d397b7c5a4.jpg)

  ```
  lrwxrwxrwx 1 root root 4 Aug  5 06:39 /bin/sh -> dash
  ```

  - dash에 링크가 걸려있다
  - dash와 bash에 대해 짧게 알아본 재미있는 시간이었다.
    - dash: 상대적으로 가벼움(Ubuntu 6.06부터)
    - bash: 기능이 풍부함(로그인 쉘)
    - 세대교체에 따른 세대차이가 좀 있다고 이해하고 넘어감

- 뭔지 알고만 넘어가려고 했던 **#!/bin/sh**가 말썽을 일으킴

  ![q_01](https://user-images.githubusercontent.com/70361152/104015416-f2f75700-51f7-11eb-9341-3846b367af65.JPG)
  ![q_02](https://user-images.githubusercontent.com/70361152/104015419-f38fed80-51f7-11eb-88a4-a2d465635cf4.JPG)
  ![q_03](https://user-images.githubusercontent.com/70361152/104015422-f4288400-51f7-11eb-852b-0f494b290ab2.JPG)

  ```
  #!bin/sh
  ```

  ```
  #!bin/bash
  ```

  - 어떻게 해도 오류가 나고 있음
  - 원인은 자세히 모르겠지만 dash가 아닌 bash를 사용해보라는 해결책이 검색됐음
  - sh의 심볼릭링크가 dash로 돼있으니까 이것만 bash로 바꾸면 되겠다고 생각함
  - **또 하나의 변수가 생김**
    - /bin 도 있고 /usr/bin 도 있음
    - [/bin 과 /usr/bin 의 차이는?](https://wookiist.tistory.com/10)
    - bin 폴더에는 명령어 파일들이 들어있고, 보편적이냐 아니냐에 따라서 usr와 root에 따로 담겨있음
    - custom한건 /usr/local/bin 에 위치시키는게 좋음
    - sbin 들은 항상 root권한이 필요함
  - 다시 /bin/sh -> dash 를 bash로 변경하려고 하는데 'File exists' 오류가 계속 나옴

    ```
    ln -s /bin/sh bash
    ```

    - 지나고보니 반대로 썼음
    - 몇 번의 엉뚱한 테스트 끝에 파일이 존재해서 그렇다고 생각하고, 조금 이상하다는 느낌과 함께 sh파일을 삭제
    - sh 명령어는 불통이 되고, /bin 에서도 /usr/bin 에서도 sh 파일은 삭제가 되어버림
    - 갈 길을 잃음...

  - [심볼릭 링크에 대해서 더 공부함](https://server-talk.tistory.com/140)

    - 일단 원본 파일을 삭제한건 아니니 다시 링크만 잘 연결해주면 될 거라는 생각이 듬

      ```
      ln -s /bin/bash /bin/sh
      ```

      ```
      ln -sf /bin/bash /bin/sh
      ```

      ```
      ln -s /bin/bash /usr/bin/sh
      ```

      ```
      ln -sf /bin/bash /usr/bin/sh
      ```

    - 모든 sh 가 /bin/bash 를 가리키도록 해봄 (오류가 남)

      > Too many levels of symbolic links

    - 다시 sh 를 삭제한 후에 한 개만 연결해 봤더니 일단 sh 가 작동함

      ```
       /bin/sh -> /bin/bash
      ```

      - sh 가 원래는 dash로 링크가 되어있었는데 /bin/bash 로 되어 있는게 불편해서 원래대로 바꿔봄
      - 작동이 안됨
      - 다시 위와 같이바꿈

    - 그런데 오류가 안나고 정상작동함

      ![cs02_28](https://user-images.githubusercontent.com/70361152/104014972-44531680-51f7-11eb-908e-f008a9e14b34.jpg)

    - 왜 되는지 모르겠지만 일단 Shell script를 공부해야 하므로 다음 단계로 넘어가기로 함

## 1. 폴더 16개 만들기

- 테스트를 자주 하게 될 것 같아서 mkdir(폴더 만들기)과 rmdir(폴더 지우기)파일 생성

  ![cs02_29](https://user-images.githubusercontent.com/70361152/104014973-44531680-51f7-11eb-87b7-5990f6002fc9.jpg)

- mkdir로 폴더 생성

  ![cs02_30](https://user-images.githubusercontent.com/70361152/104014974-44ebad00-51f7-11eb-9e49-204cacd56d88.jpg)

## 2. 각 폴더에 불특정하게 .cs 파일 넣어두기

- random으로 하고 싶었지만 거기까진 시간이 없어서 일단 숙제로 남겨둠
- 수작업으로 넣음(엣지케이스를 위해서 day1과 day16을 포함시키고, test를 위해서 파일명의 숫자를 폴더명과 일치시킴)

## 3. 스크립트로 미션 진행

- 생각보다 쉽지 않다.
- 잘못하면 폴더가 엄청 많이 생기거나 반대로 완전 다 지워질 수도 있을 것 같다.
- 그래서 먼저 echo 정도로 테스트를 하는 중
  ![cs02_31](https://user-images.githubusercontent.com/70361152/104014975-44ebad00-51f7-11eb-9340-8408463e77b6.jpg)

- cs파일들만 불러내는건 성공
  ![cs02_32](https://user-images.githubusercontent.com/70361152/104017070-cb55be00-51fa-11eb-9c72-4fb92b70ba58.jpg)

  - 그런데 파일이 두 개 이상이면 오류가 난다.

- 조건문 안에 띄어쓰기 수정 후 test 정상 작동 확인
  ![cs02_33](https://user-images.githubusercontent.com/70361152/104017699-ed9c0b80-51fb-11eb-9abc-8ce4de13e353.jpg)

- 몇 가지 경우를 고려해서 조금 더 수정했다.
  - 파일이 여러개일 경우
  - 확장자가 다를 경우
  - cs 파일은 없지만 다른 파일이 있을 경우
  - [왜 나만 정규식을 보고있는 것 같지... 이렇게 하는게 아닌가](https://blog.leocat.kr/notes/2017/07/27/shell-count-folders-and-files)
    ![cs02_34](https://user-images.githubusercontent.com/70361152/104030213-61dfaa80-520e-11eb-9ad4-defb1509bbb8.jpg)
- install zip

  ```
  sudo apt-get install zip
  ```

  ![cs02_35](https://user-images.githubusercontent.com/70361152/104031764-8472c300-5210-11eb-8460-cd6d2ce192f4.jpg)

- 파일 경로를 담아서 압축을 시도했다.

  ![cs02_36](https://user-images.githubusercontent.com/70361152/104052929-c827f580-522d-11eb-832c-fb114c605fd0.jpg)

- 파일들이 제대로 압축이 되었는지 확인해봤다.

  ![cs02_37](https://user-images.githubusercontent.com/70361152/104053368-7469dc00-522e-11eb-8415-bd8921eed486.jpg)

  - 각각의 폴더가 다 들어가버렸고, 그 안에 cs파일이 아닌 파일까지 들어가버렸다.
  - 별게 다 들어가있다.

- **아무리 생각해도 폴더를 새로 만들지 않고, 파일만 가져올 방법이 생각이 안난다.**
- 처음 방법대로 폴더를 만들어서 파일을 찾으면 복사를 하는 방법으로 돌아가야겠다.

  ```sh
  #!/bin/bash

  FOLDER_SIZE=`ls -l cs-02 | grep ^d | wc -l`
  DATE=$(date +%Y%m%d)
  DIR="./cs-02"
  NUM=1
  mkdir cs_backup
  while [ "$NUM" != "$(($FOLDER_SIZE+1))" ]
  do
    if [ -e $DIR/day$NUM/*.cs ]; then
      cp $DIR/day$NUM/*.cs ./cs_backup
      elif [ `ls -l cs-02 | grep ^- | wc -l` == 0 ]; then
      echo "day$NUM is empty"
      else
      echo "not empty, not cs"
    fi
    NUM=$(($NUM+1))
  done

  zip "backup_$DATE.zip" ./cs_backup
  ```

- 결과는 4번에 cs파일이 아닌 파일이 있는데 비어있다고 하는 것 빼고는 정상이다.

  ![cs02_38](https://user-images.githubusercontent.com/70361152/104057767-045f5400-5236-11eb-80cc-db4d8ae98542.jpg)

- cs_backup 폴더에도 파일이 잘 복사되어 있다.

  ![cs02_39](https://user-images.githubusercontent.com/70361152/104057772-05908100-5236-11eb-94dc-aad14abee915.jpg)

- 그런데 압축파일안에 cs_backup 폴더가 빈 폴더다. 어찌된일일까..
- 마지막에 \*을 빠뜨렸다. 압축성공!

  ```
  zip "backup_$DATE.zip" ./cs_backup/*
  ```

- 작은 bug는 일단 남겨두고, VM Ubuntu에 있는 backup 폴더로 복사해야겠다.
- 성공...

  ![cs02_40](https://user-images.githubusercontent.com/70361152/104059181-3c679680-5238-11eb-8b74-359cf63e6bf4.jpg)

  - 하는 줄 알았는데 Permission denied 당했다.

- chmod 764 이니 group user인 juddroid에게 w권한이 있다고 생각하는데 왜 안되는지 모르겠다.
- 일단 root로 보내니 성공했다.

  ![cs02_41](https://user-images.githubusercontent.com/70361152/104059187-3d98c380-5238-11eb-87fc-954fc7e6b608.jpg)

- vm에서도 파일이 잘 전송된게 보인다.

  ![cs02_42](https://user-images.githubusercontent.com/70361152/104059188-3d98c380-5238-11eb-9215-3e2539e22d9f.jpg)

- 그룹 소유자를 변경해보면 어떨까 싶어서 변경해 본다.

  ```
  sudo chown :juddroid backup
  ```

  ![cs02_43](https://user-images.githubusercontent.com/70361152/104060117-cc5a1000-5239-11eb-8758-868590b56d5b.jpg)

- 결국 Root로만 성공

- 마지막으로 공개키/비밀키에 대해서 조금 공부했고, 흥미로웠으니까 그것까지 성공시켜 보고 싶음
- 키 복사

  ```
  ssh-copy-id -i ~/.ssh/id_rsa.pub 192.168.32.128
  ```

  ![cs02_45](https://user-images.githubusercontent.com/70361152/104063614-cd8e3b80-523f-11eb-9351-15c4d662783e.jpg)

- service restart

  ```
  service sshd restart
  ```

- 여기에서 되는 줄 알았으나 결국 실패
- permission denied도 그렇긴한데 자동로그인도 안된다 왜지?
  ![cs02_46](https://user-images.githubusercontent.com/70361152/104063621-cebf6880-523f-11eb-9093-5826062f2208.jpg)

- 라고 말하는 순간 -i 설정이 생각났다.
- 첫도전은 실패

  ![cs02_47](https://user-images.githubusercontent.com/70361152/104064713-c1a37900-5241-11eb-8eab-0f20d4a8a553.jpg)

- 다시 재부팅.. 할 수 있는건 다 해보자

  ![cs02_48](https://user-images.githubusercontent.com/70361152/104064717-c2d4a600-5241-11eb-91ce-11cce9683e70.jpg)

- 퍼블릭 키로 다시 시도... 했더니 오류가 나면서 내 키를 무시한다.

  ![cs02_49](https://user-images.githubusercontent.com/70361152/104064718-c2d4a600-5241-11eb-8b52-67f1b2dbf281.jpg)

- 퍼미션 설정도 확인해봤고, 길이 막혔다.
- 왜 안될까...

## 4. 문제해결

- 두 가지 문제가 있다.

  1. 권한설정 문제
  2. ssh key를 이용한 자동로그인 실패

  ### 4-1. 권한설정문제(chmod, chown)

  - Goal
    
    - cs-02.sh 에서 zip 파일을 juddroid 계정으로 접속하여 ubuntu:/backup 에 `scp` 하기
  - Error Msg
    
  - Permission denied
  - Situation

    - ubuntu:/backup chmod (764)
  
      ```
    drwxrw-r--  2 root root
      ```

    - juddroid는 group user

  - Try

    1. Change chown

       - /backup 소유자를 root에서 juddroid로 변경
  
         ```
       sudo chown :juddroid /backup
         ```

       - **Result: Fail**

    2. Change chmod(Solve)

       - 최대한 764에서 해결해보려고 했으나 실패했으므로 775로 변경
  
         ```
       sudo chmod 775 /backup
         ```
  
     - **Result: Solve**
       - 파일을 `read`해서 `write`하면되기 때문에 6으로도 가능할거라고 생각했는데, 복사할 때, **폴더를 살행해서 읽고 써야하는건지(?)**, 775로 바꾸니 해결됨

  - **SOLVED**

  ### 4-2. SSH key를 이용한 자동로그인 실패
  
  - Goal
    
    - SSH key를 이용해서 비밀번호 입력없이 자동로그인 하기
- Error Msg
  
  - ch-02.sh 파일이 실행됐을 때, 비밀번호를 물어보지 않고, 바로 복사돼야 하는데 비밀번호를 묻고 있음
  - Situation
  
    - 원격지(192.168.32.128):/home/raccoon/.ssh/ 에 공용키 복사

      ```
    ssh-copy-id -i ~/.ssh/id_rsa.pub 192.168.32.128
      ```

    - 원격지에서 /home/raccoon/.ssh/authorized keys 파일 생성 확인

  - Try
  
    1. 공개키로 시도

       ```
     ssh -i ~/.ssh/id_rsa.pub raccoon@192.168.32.128
       ```
  
  - Error
  
    - Msg:
        ![image](https://user-images.githubusercontent.com/70361152/104128385-9b4d1d00-53aa-11eb-83eb-eee17f0b6bbe.png)

        - 무시당함

      - **Result: Fail**
  
    2. 위 결과에 따라서 키쌍은 읽기 권한만 있으면 될 것 같아서 chmod를 400으로 변경
  
     ```
       sudo chmod 400 id_rsa.pub
     sudo chmod 400 id_rsa
     ```

       - Error
  
         - msg:

           ```
         Load key "/home/raccoon/.ssh/id_rsa.pub": invalid format
           ```

       - **Result = Fail**
  
  3. ssh -i 옵션 확인
  
       ![image](https://user-images.githubusercontent.com/70361152/104128687-69d55100-53ac-11eb-967a-01decdb59e7d.png)
       ![image](https://user-images.githubusercontent.com/70361152/104128830-24fdea00-53ad-11eb-8745-eb4681b8a95e.png)

       ```
       Selects a file from which the identity (private key) for public key authentication is read.
     ```
  
     - 충격적이게도 `identity`는 `public key`가 아니라 `private key`였다.
       - 하루를 날린 ssl에 대해서 다시 공부...
  
    - -i 옵션에 `private key`를 넣어서 다시 시도

      ```
      ssh -i ~/.ssh/id_rsa raccoon@192.168.32.128
      ```
  
    ![image](https://user-images.githubusercontent.com/70361152/104128972-cbe28600-53ad-11eb-8b0d-cebef9ebb736.png)
  
    - 바로 로그인이 됐다.
    - 이제 `scp`로 시큐어 카피 시도.

      ```
      scp backup_20210109.zip juddroid@192.168.32.128:/backup
      ```
  
  - 여전히 비밀번호를 물어본다.
    - `raccoon`으로는 자동로그인이 되는데 `juddroid`로는 안된다.
    - `juddroid`는 키가 없다...
    - `juddroid`를 위한 키쌍 생성

      ```
      ssh-keygen
      ```

      ```
      Enter file in which to save the key (/home/raccoon/.ssh/id_rsa):
      ```
  ```
    
  ```
  
  - 그냥 `Enter`치면 현재 `pwd`에 생성된다.
    - `juddroid_rsa`를 생성해주고, 비밀번호 입력
  
    ![image](https://user-images.githubusercontent.com/70361152/104129386-760edd80-53af-11eb-8267-da2fa933904f.png)

    - 키쌍생성
    - 공개키 복사
  
      ```
       ssh-copy-id -i ~/.ssh/juddroid_rsa juddroid@192.168.32.128
      ```
  ```
    
    - 복사 확인
  ![Screenshot from 2021-01-11 01-52-59](https://user-images.githubusercontent.com/70361152/104129590-dc93fb80-53af-11eb-96a6-fab6eb495c6f.jpg)
  ```
  
  - scp 다시 시도
    - 실패(비번 물어봄. 그런데 이번에는 좀 다르다.)
  
      - msg:
  
        ```
        Enter passphrase for key '/home/raccoon/.ssh/juddroid_rsa':
        ```
  
  - [`passphrase`에한 글 발견](https://arsviator.blogspot.com/2015/04/ssh-ssh-key.html)
    
      - `passphrase`는 옵션이고, 로컬에서 `private key`를 해석할 때만 사용함
    - `linux` 상에서 모든 `password`를 테스트용으로 똑같이 했더니 `passphrase`와 `password`도 똑같아서 원인을 찾는데 굉장히 오래걸림
- `juddroid_rsa`의 `passphrase`를 공백 `Enter`로 변경
  
    ```
      ssh-keygen -p -f ~/.ssh/juddroid_rsa
  ```
  
    ![image](https://user-images.githubusercontent.com/70361152/104129814-3fd25d80-53b1-11eb-84e8-a3da9e74338f.png)
  
- cs-02.sh 파일 수정
  
    ```
      scp -i ~/.ssh/juddroid_rsa "backup_$DATE.zip" juddroid@192.168.32.128:/backup
  ```
  
- 실행
  
    ![image](https://user-images.githubusercontent.com/70361152/104130174-aa37cd80-53b2-11eb-9aea-5eb45bb52338.png)
    
  - **Result = True**
    
      ![Screenshot from 2021-01-11 02-15-28](https://user-images.githubusercontent.com/70361152/104130234-ebc87880-53b2-11eb-88eb-c6866b50dabb.png)
