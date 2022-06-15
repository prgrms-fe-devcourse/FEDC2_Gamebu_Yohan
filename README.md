# Gamebu(껨부)

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [Ground Rules](#Ground-rules)
3. [기술 스택](#기술-스택)
4. [커뮤니케이션](#커뮤니케이션)
5. [Contributors](#Contributors)

## 프로젝트 소개

껨부는 기존의 한 게임의 특정 콘텐츠의 유저만을 모집하는 것이 아닌, 여러 게임, 여러 콘텐츠를 함께 즐길 유저를 모집하는 종합 게임 파티원 구인 서비스를 목표로 합니다.

여러 게임의 커뮤니티를 하나하나 찾아다닐 필요 없이, 여러 게임과 콘텐츠를 함께 즐길 사람을 종합적으로 구하는 서비스를 이용할 수 있는 SNS 플랫폼입니다.

## Ground Rules

### Git Branch

- main branch를 default로 한다.
- 개발은 develop에서 파생된 working branch에서 작업한다.
- 작업 후 develop branch에 merge한다.
  - merge 전 팀원 검수 진행하고 develop branch로 merge를 한다.
  - merge는 page 단위로 진행한다.

### Git Commit

| Commit Types | Descriptions                                |
| ------------ | ------------------------------------------- |
| feat         | 새로운 기능 추가                            |
| fix          | 버그 수정                                   |
| style        | 코드 포맷팅                                 |
| refactor     | 리팩터링                                    |
| design       | CSS 및 디자인 수정                          |
| chore        | JSON 설정, 디렉터리 수정, File Name 수정 등 |
| docs         | README 같은 문서 수정                       |

### Commit Template

```
[type]: header // ex. feat: 로그인 기능을 추가했다.

body
```

#### 1. header

```
hrader는 완성형 문장으로 작성한다.

❌ feat: 로그인 기능 추가
✅ feat: 로그인 기능을 추가했다.
```

#### 2. types

```
type은 소문자로만 작성한다.
콜론(:) 기호로 type과 description을 구분한다.
콜론(:) 이후에 한 칸 띄어쓰기 후 description을 작성한다.

❌ feat:로그인 기능 추가했다.
✅ feat: 로그인 기능을 추가했다.
```

##### 3. body

```
❌ refactor: 로그인 함수를 분리했다.

✅ 아래처럼 개행 후 상세한 설명을 적는다.
refactor: 로그인 함수를 분리했다.

기존 로그인 함수를 로그인 정보 입력 양식 확인 함수와 로그인 정보 인증 함수로 분리했다.
```

### Code Rules

- 가급적 약어 사용을 지양하고 full name을 사용한다.

```js
// BAD
let el;
// GOOD
let element;
```

- event, handler function 규칙 논의 후 지정(2022-06-09)

### Pull Requests

- 리뷰어가 확실히 알아볼 수 있도록 코드 작성자가 PR을 상세하게 적는다.
- 리뷰가 끝나고 merge가 되었다면, 핵심 기능은 따로 문서화 한다.

## 기술 스택

<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <br>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=#CB3837" />
  <img src="https://img.shields.io/badge/React Router-121212?style=for-the-badge&logo=React Router&logoColor=#CA4245" />
  <img src="https://img.shields.io/badge/styled components-3C3C3C?style=for-the-badge&logo=styled-components&logoColor=#DB7093" />
  <br>
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=#007ACC" />
  
</div>

## 커뮤니케이션

<div align=center> 
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=#000000" />
  <img src="https://img.shields.io/badge/Discord-292841?style=for-the-badge&logo=Discord&logoColor=#5865F2" />
  
</div>

## Contributors

| 조채우                                 | 고광필                                | 김동언                              | 박민제                               | 이상진                                  |
| -------------------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------ | --------------------------------------- |
| [Github](https://github.com/JoChaeWoo) | [Github](https://github.com/feel0321) | [Github](https://github.com/960817) | [Github](https://github.com/mieumje) | [Github](https://github.com/sangjin149) |
