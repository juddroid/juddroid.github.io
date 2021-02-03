---
title: "[CS]  Linux 설치 도전기(Install Linux)"
categories: [Digging, Computer Science]
tag: [linux, ubuntu]
---

# Linux 설치 도전기

## 1. VM 선택

- **[VM ware](https://www.vmware.com/kr/products/workstation-player/workstation-player-evaluation.html) (what I choose)**
- ~~[Virtual Box](https://www.virtualbox.org/wiki/Downloads) (recommended)~~
- VM ware가 더 예뻐서 무료판을 선택함

## 2. Ubuntu 20.04.1

- [Ubuntu 20.04.1](http://ftp.kaist.ac.kr/ubuntu-cd/20.04/)
  - ubuntu-20.04.1-desktop-amd64.iso

## 3. Install Ubuntu on Windows10 VM

- Error #01
  - Msg: this host does not support "amd rvi" hardware assisted mmu virtualization.
  - BIOS 세팅에서 SVM모드 활성화
- Error #02

  - Msg: your host does not meet minimum requirements to run vmware player with hyper-v or device/credential guard enabled. refer to vmware kb article 76918
  - [해결방법은 두 가지](https://moonlight-spot.tistory.com/entry/VMware-15-player-%EC%84%A4%EC%B9%98-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-error-Your-host-does-not-meet-minimum-requirements-to-run-VMware-workstation-with-hyper-v-or-devicecredential-guard-enabled-76918)

    - 1.  ~~Update Windows Viersion~~
    - 2.  Off the Hyper-V **(what I choose)**

      ![cs02_02](https://user-images.githubusercontent.com/70361152/104014581-9d6e7a80-51f6-11eb-89f4-d41b575c8b08.jpg)

- cmd에서 다시 시도

  ```shell
  $ bcdedit /set hypervisorlaunchtype off
  ```

  ![cs02_02](https://user-images.githubusercontent.com/70361152/104014935-3ac9ae80-51f7-11eb-944c-4714e0f65372.jpg)

- 재부팅 후... 성공한듯

  ![cs02_03](https://user-images.githubusercontent.com/70361152/104014936-3b624500-51f7-11eb-9d06-404cd752f519.jpg)

- Success

  ![cs02_04](https://user-images.githubusercontent.com/70361152/104014939-3bfadb80-51f7-11eb-8bb2-9068ac92e6ab.jpg)

### [4. Setting SSH](https://docs.microsoft.com/ko-kr/azure/virtual-machines/linux/ssh-from-windows)

- SSH 키 쌍 만들기(PowerWhell)

  ```zsh
  ssh-keygen -m PEM -t rsa -b 4096
  ```

  ![cs02_05](https://user-images.githubusercontent.com/70361152/104014940-3c937200-51f7-11eb-832b-14978a2580da.jpg)

  - ? /home/raccoon/.ssh 에 뭔가 있을줄 알았는데 폴더가 없다. 불안하다.
  - 이 위치에 다시 path를 설정했다.
  - /home/raccoon/.ssh 가 default임을 깨달았다.

## 5. Create VM using Key

- 키가 있으니까 문이 있어야 되지 않나 싶은데 뭐가 뭔지 모르겠어서 일단 [유튜브 영상](https://www.youtube.com/watch?v=ur-ctfgzGxs)을 참조함
- Windows Gate - VM Gate - Ubuntu Gate 정도를 거쳐야하지 않을까라고 예상
- Install openssh-server in VM Ubuntu

  ```shell
  $ sudo apt-get install openssh-server
  ```

  - ~~Ubuntu에 문이 열린건가.~~
  - 웃기시네;; opensource ssh server 라는 거라고 한다.
  - 가상 ip주소? 확인.

    - Windows VMware에 설치된 Ubuntu의 ip주소
    - 서버가 있다고 가정했을 때, 원격으로 접속할 서버의 ip주소

    ```bash
    ifconfig
    ```

    ![cs02_06](https://user-images.githubusercontent.com/70361152/104014941-3c937200-51f7-11eb-892d-475f4dcef169.jpg)

    - ipconfig라고 입력하니까 ifconfig 추천해주는거 신기했음
    - **볼수록 예쁘다. 우분투**
    - 스크린샷 캡쳐할때 '찰칵'소리도 난다. (물론 꺼버릴꺼지만)

  - ping 확인

    ![cs02_07](https://user-images.githubusercontent.com/70361152/104014942-3d2c0880-51f7-11eb-9022-60b1e801c87d.jpg)

    - 일단 여기까지는 뭔가 되고 있는 것 같음

  - 영상에서 PuTTY를 설명하면서 Ubuntu가 Server가 되고, Windows에서 Client로서 접속하는 거라고 설명하는 것 같음
  - [Install PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
  - 확인했던 ip주소를 입력하고, 확인을 누르면 경고창이 나타남

    ![cs02_08](https://user-images.githubusercontent.com/70361152/104014945-3dc49f00-51f7-11eb-8eb1-6fc4a0426f8d.jpg)

    - Yes 하면 더 이상 나타나지 않지만, 보안을 위해 No 하는걸 권장

  - 여기까지는 성공

    ![cs02_09](https://user-images.githubusercontent.com/70361152/104014946-3dc49f00-51f7-11eb-9d37-db1029977def.jpg)

  - ~~그런데 이건 PuTTY를 사용한거지 SSH를 이용한게 아닌 것 같음~~
    
    - PuTTY를 통해 SSH로 VM Ubuntu에 접근한거라고 다시 이해하고 있다.
  - 다시...
- 길이 막혔는데, [young이 보내준 링크](https://studyforus.tistory.com/235)와 Neis의 몇 마디가 도움이 됐다. 고마워요 ㅠㅠ
  
  - [Ubuntu Root 계정 암호 설정 및 사용하기](https://studyforus.tistory.com/223)
- ~~엊그제 Windows를 홀랑 날려먹고, 다시 세팅하면서 shell 비밀번호를 설정했는데 그게 이거인지 몰랐음~~
  
    - 위에서 언급한 건 windows 환경에서 이고, ubuntud에서도 설정했어야 했다.
  - 정확한 개념이 없는 상태에서 username을 전부 raccoon으로 했더니 굉장히 혼란스러웠다.
  
  ![cs02_10](https://user-images.githubusercontent.com/70361152/104014947-3e5d3580-51f7-11eb-9a5b-f57486ffe884.jpg)
  
- SSH config파일 수정
  
    - Ubuntu에서 수정했어야 했다.
  - 방향키도 인정안하는 리얼 vi체험
  
  ![cs02_11](https://user-images.githubusercontent.com/70361152/104014948-3e5d3580-51f7-11eb-8fd6-71bfc8319e3e.jpg)
  
  - 결국 또 PuTTY라는 걸로 접속해야 된다고 함
  - 도대체 PuTTY가 뭔데...
  - [Windows10 Tip: PuTTY가 더 이상 필요 없다! 내장 OpenSSH 클라이언트 설치하기](https://archwin.net/402)
  - [PuTTY](https://dololak.tistory.com/24) : 가상 단말기 프로그램
  - 논리적인 가상 단말기인데 접속방식으로는 Telnet, SSH, Rlogin
  - SSH(Secure SHell)는 Telnet의 보안강화버젼(패킷을 암호화함)
- 일단 windows, vm ubuntu 양쪽 모두 terminal을 통해서 여기저기 접근할 수 있는 것 같은데, 왜 필요한지 모르겠다. 다음 스텝을 진행해봐야 될 것 같다.
  
  - [우분투에 SSH server 설치하기](https://www.youtube.com/watch?v=ow-uAzvAkmU)
- 이 영상이 도움이 많이 됐다.
  
  ![cs02_12](https://user-images.githubusercontent.com/70361152/104014949-3ef5cc00-51f7-11eb-8600-9d6ab7237a94.jpg)
  
  - 원하는 형태로 접속했다.
  - [오늘 찾아본 링크 중에 가장 설명이 쉽게 잘 되어있는 글 같다.](https://velog.io/@younho9/Mac-%EB%B2%84%EC%B6%94%EC%96%BC%EB%B0%95%EC%8A%A4VirtualBox%EC%97%90-%EC%84%A4%EC%B9%98%EB%90%9C-%EC%9A%B0%EB%B6%84%ED%88%ACUbuntu-%EB%A7%A5-%ED%84%B0%EB%AF%B8%EB%84%90%EC%97%90%EC%84%9C-%EC%A0%91%EC%86%8D%ED%95%98%EA%B8%B0)
  - 저녁식사 후 잠시 머리 좀 식힐겸 슬랙에서 다른 사람들 질문과 해결방법을 찾아봤는데, Windows보다는 iOS 상황에서의 자료가 훨씬 더 친절한 것 같은 기분이 드는건 남의 떡이 커보이는 걸까.

## 6. Root 계정 외에 ~~Raccoon~~Juddroid가 접속할 계정 만들기

- 아 이게 아까 했던거였음

  ![cs02_13](https://user-images.githubusercontent.com/70361152/104014952-3ef5cc00-51f7-11eb-9791-ca805334345e.jpg)

- 아닌 것 같다.
  - 이제 Ununtu는 Root권한을 막아놓는 특성이 있고, raccoon은 ubuntu 설치할 때 생성된 user 계정이다.
  - 새롭게 juddroid라는 user를 만들어야 한다.
- 처음에 key-gen으로 키쌍을 만들었는데, 거기서부터 다시 알아봐야 할 것 같다.
- [공개키와 비밀키](http://blog.naver.com/PostView.nhn?blogId=chodahi&logNo=221385524980)
- 처음에 하려고 했던 방법으로도 Ubuntu에 접속이 된다.

  ```shell
  $ ssh -i ~/.ssh/raccoon_rsa.pub raccoon@192.168.49.128
  ```

  - 이게 공개키로 접속하는 것 같다. [-i identity_file]가 뭔지 알아봐야되겠다.
  - [SSH 명령어](https://wlsvud84.tistory.com/12)
  - [간단하게 자주 사용하는 SSH 명령어 정리](https://falsy.me/%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-ssh-%EB%AA%85%EB%A0%B9%EC%96%B4%EB%A5%BC-%EC%A0%95%EB%A6%AC%ED%95%A9%EB%8B%88%EB%8B%A4/)

  ```shell
  ssh raccoon@192.168.49.128
  ```

  - 그동안은 이걸로 접속했다.

- **juddroid [계정 생성](https://withcoding.com/101)**
  ```
  sudo useradd -m juddroid
  ```
  - -m 옵션은 계정 디렉토리까지 함께 생성해 준다.
  ```
  sudo passwd juddroid
  ```
  - password 생성
    ![cs02_15](https://user-images.githubusercontent.com/70361152/104014955-3f8e6280-51f7-11eb-9713-adeee5685306.jpg)
  - juddroid로 접속
    ![cs02_16](https://user-images.githubusercontent.com/70361152/104014956-4026f900-51f7-11eb-803f-8c6bec4255dc.jpg)
  - ubuntu에서 봐도 juddroid가 출석해있다. 성공인 것 같다.
    ![cs02_17](https://user-images.githubusercontent.com/70361152/104014957-4026f900-51f7-11eb-868a-e9c5096185ba.jpg)

## 7. Juddroid 계정에서 작업하기

- **/backup 디렉토리 생성하기**

  ```bash
  $ sudo mkdir /backup
  ```

  ![cs02_18](https://user-images.githubusercontent.com/70361152/104014958-40bf8f80-51f7-11eb-91dd-8d0c83b42bf6.jpg)

- raccoon은 sudo 권한이 있는데, juddroid는 sudo 권한이 없다.
- 일단 root권한

  ```bash
  su

  ```

- sudoers 찾아가기

  ```zsh
  $ vi /etc/sudoers
  ```

- sudoers에게 나도 권한 달라고하기
  ![cs02_19](https://user-images.githubusercontent.com/70361152/104014959-40bf8f80-51f7-11eb-990a-7948fd2fc4db.jpg)

  - [vim으로 어렵게 편집](https://www.joinc.co.kr/w/Site/Vim/Documents/UsedVim)

- /backup 디렉토리 생성 완료
  ![cs02_20](https://user-images.githubusercontent.com/70361152/104014960-41582600-51f7-11eb-86ec-a1572c4e9537.jpg)

- **764모드로 접근 권한 바꿔서, 사용해보기**

  - 764모드는 뭔가!
    
    - [[Shell] chmod - 파일 및 폴더의 권한설정](https://nachwon.github.io/shell-chmod/)
  - 현재 backup 폴더 권한 확인(755)
    ![cs02_21](https://user-images.githubusercontent.com/70361152/104014963-41f0bc80-51f7-11eb-83a2-97b167b28b32.jpg)
  - (755) 소유자: 7 / 그룹: 읽기, 실행 / 그 외: 읽기, 실행
  - (764) 소유자: 7 / 그룹: 읽기, 쓰기 / 그 외: 읽기
- 그룹 유저는 실행권한이 없어지고, 쓰기 권한이 생긴다.
  
    ```zsh
    sudo chmod 764 backup
  ```
  
  - 변경된 것 확인(chmod는 root만 가능함을 확인)
    ![cs02_22](https://user-images.githubusercontent.com/70361152/104014964-41f0bc80-51f7-11eb-8b1b-5fd1777ad7fc.jpg)

## 8. 가상환경에서 오늘 날짜 출력한 후 캡쳐하기

- setting > date&time 에서 오늘 날짜로 변경

  ![cs02_23](https://user-images.githubusercontent.com/70361152/104014966-42895300-51f7-11eb-909a-5d27b90c7017.jpg)

- 가상환경 터미널에서 오늘 날짜 출력

  ```
  date
  ```

  ![cs02_24](https://user-images.githubusercontent.com/70361152/104014967-4321e980-51f7-11eb-9bff-04cbaaabd04f.jpg)
