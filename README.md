# 오늘의 데이트 💖

<div align="center">
<img width="200" alt="image" src="https://firebasestorage.googleapis.com/v0/b/todaysdate-final-project.appspot.com/o/profile%2FGroup%201.png?alt=media&token=2608fa05-9a46-404c-ba70-1f8115387657">

</div>

# Hybrid Web/App Application
> **KH 정보교육원 강남** <br/> **개발 기간: 2023.06.21 ~ 2023.07.24**

## 배포 주소

> **Web URL** : [http://todaysdate.site](http://todaysdate.site) <br>
> **App URL** : [http://](http://)<br>

## 팀원 소개

|                                                                                                            양경미                                                                                                             |                                                                                                                                                최지인                                                                                                                                                |                                                                                                            김다은                                                                                                            |                                                                                                               
|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:| 
| <img width="160px" src="https://firebasestorage.googleapis.com/v0/b/todaysdate-final-project.appspot.com/o/profile%2F9978bce876b1093d0c355c89082c8aa7-sticker.png?alt=media&token=133eb71a-7a08-498b-8920-61591009065c" /> | <img width="160px" src="https://firebasestorage.googleapis.com/v0/b/todaysdate-final-project.appspot.com/o/profile%2F%E1%84%8C%E1%85%B5%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.PNG?alt=media&token=424a8277-7af4-42ee-8b01-c983a37dade3" /> | <img width="160px" src="https://firebasestorage.googleapis.com/v0/b/todaysdate-final-project.appspot.com/o/profile%2Febd33fdfbfd0464fac39d3268b7c1f2d-sticker.png?alt=media&token=885ba926-235b-41d7-8853-ebf0d1179ddc"/> |
|                                                                                    [@chicken-tender](https://github.com/chicken-tender)                                                                                    |                                                                                                                                [@cjiin](https://github.com/cjiin)                                                                                                                                 |                                                                                        [@dekim0705](https://github.com/dekim0705)                                                                                         |
|                                                                                                       조장(백엔드+프론트엔드)                                                                                                        |                                                                                                                                           팀원(백엔드+프론트엔드)                                                                                                                                           |                                                                                                       팀원(백엔드+프론트엔드)                                                                                                       |

## 프로젝트 소개

오늘의 데이트는 사용자들이 직접 경험하고 만족했던 데이트 코스를 공유하는 애플리케이션 입니다.<br>
사용자는 핀 만들기를 통해 데이트(여행) 경로를 직접 지정할 수 있습니다.<br>
다른 사용자들의 핀을 보고 데이트(여행) 계획을 좀 더 쉽게 준비할 수 있습니다.<br>
원하는 핀은 북마크가 가능하고, SNS 공유하기를 통해 쉽게 전달할 수 있습니다.<br>
특정 지역에 관한 최신 행사 정보를 한 눈에 볼 수 있습니다.

## 상세 기능
### 설계의 주안점
- JWT(Access Token & Refresh Token)와 Password Encoder(Spring Security) 적용하여 사용자 인증 및 권한 부여
- 모바일과 PC 환경에서 편안하게 사용할 수 있도록 미디어 쿼리 적용
- 사용자 편의를 위하여 메인 게시글 6개 단위 조회(페이지 네이션)

### 메인 페이지
- 게시글 검색
- 인기 데이트 코스(북마크 순) 확인
- 게시글 지역 필터링
- 북마크 추가/삭제
- WebSocket을 이용한 관심 지역 게시글 업로드 푸시 알림

### 경로 만들기 CRUD
- 주소 검색하여 지도에 마커 추가(카카오 맵 API)
- SNS 공유하기
- 사용자 신고 및 차단, 게시글 신고
- 작성자가 지정한 경로 확인 및 장소 정보 확인
- 이미지 업로드(Firebase)
- 댓글 CRUD

### 멤버십 결제
- 카카오페이 간편 결제를 이용하여 멤버십 회원으로 업그레이드 가능(결제시 피드에 광고 제거)

### 지역행사 페이지
- 공공 API를 이용하여 최신 행사 정보 확인(날짜순, 인기순)
- 지역 및 시기 필터링
- 축제 키워드 검색

### 고객센터
- 온라인 챗봇 기능 및 관리자에게 문의사항 전송(직접 구현)

### 관리자 페이지
- 회원 관리(정보 조회 및 삭제)
- 게시글, 댓글 관리(전체 게시글 조회, 검색, 삭제, 바로 이동)
- 광고 관리(이미지 업로드, 삭제)
- 문의 관리(문의 내용 확인 및 상태(대기/읽음) 조정 가능)
- 신고 관리(신고 내용 확인)

### 회원 가입
- 이메일 인증(Java Mail API)

### 마이 페이지
- 나의 핀 목록(내가 작성한 글, 댓글 확인 및 삭제)
- 나의 북마크(폴더 추가 및 삭제, 확인)
- 푸시 알림 여부 설정
- 회원 정보 수정, 비밀번호 변경, 회원 탈퇴

## 시작 가이드
### Requirements
For building and running the application you need:

- application.properties DB(MySql) 계정 정보 및 카카오 개발자 api key, 메일 정보 입력
- todaysdate/frontend/.firebaserc api 인증 정보 입력

### Build
``` bash
$ git clone https://github.com/chicken-tender/Todaysdate.git
$ yarn install
$ ./gradlew build
$ java -jar build/libs/backend_finalproject-0.0.1-SNAPSHOT.jar
```

---

## Stacks 🐈

### Environment
![IntelliJ](https://img.shields.io/badge/IntelliJ-0027DE?style=for-the-badge&logo=IntelliJIDEA&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=AmazonAWS&logoColor=white)

### Development
![Java](https://img.shields.io/badge/Java-FF160B?style=for-the-badge&logo=Conda-Forge&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)<br>
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Native](https://img.shields.io/badge/ReactNative-65ADF1?style=for-the-badge&logo=React&logoColor=white)

### DB
![MySql](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
---

[//]: # (## 화면 구성 📺)

[//]: # (| 메인 페이지  |  소개 페이지   |)

[//]: # (| :-------------------------------------------: | :------------: |)

[//]: # (|  <img width="329" src="https://user-images.githubusercontent.com/50205887/208036155-a57900f7-c68a-470d-923c-ff3c296ea635.png"/> |  <img width="329" src="https://user-images.githubusercontent.com/50205887/208036645-a76cf400-85bc-4fa2-af72-86d2abf61366.png"/>|  )

[//]: # (|  페이지   |  페이지   |  )

[//]: # (| <img width="329" src="https://user-images.githubusercontent.com/50205887/208038737-2b32b7d2-25f4-4949-baf5-83b5c02915a3.png"/>   |  <img width="329" src="https://user-images.githubusercontent.com/50205887/208038965-43a6318a-7b05-44bb-97c8-b08b0495fba7.png"/>     |)
