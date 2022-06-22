# Gamebu(껨부)

**배포 링크** [배포는 여기](https://gamebu-dh2mrhd61-team-yohan.vercel.app/)
위 링크는 모바일에 최적화되어 있습니다

**피그마 링크** [피그마는 여기](https://www.figma.com/file/41VGC4WXTR6mWAM3FwiGfc/%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4?node-id=0%3A1)

![image](https://user-images.githubusercontent.com/66072832/175078346-1b7fa7bd-df4e-449c-b5d9-dbdfd3d43b83.png)
![image](https://user-images.githubusercontent.com/66072832/175078483-7408bf6a-72ec-4b7b-83f0-d661744852af.png)
![image](https://user-images.githubusercontent.com/66072832/175078897-60773b45-7d79-46b2-aa28-b61a21c1837f.png)
![image](https://user-images.githubusercontent.com/66072832/175079124-f48d9275-2e08-400d-9a18-106998f0d1e8.png)
![image](https://user-images.githubusercontent.com/66072832/175079289-b6096e25-4850-4de3-8ea3-45cea069c3a7.png)
![image](https://user-images.githubusercontent.com/66072832/175080088-943273b6-280f-4b83-bcfd-59dea789e220.png)
![image](https://user-images.githubusercontent.com/66072832/175079545-2c7a73d3-b796-4a72-a539-df7ff67bce4d.png)
![image](https://user-images.githubusercontent.com/66072832/175079660-cd1d2573-40c3-4b8f-a040-52babaa4b20a.png)
![image](https://user-images.githubusercontent.com/66072832/175079965-4d76ccc9-8ed0-4113-bc8e-fececadb3e50.png)
![image](https://user-images.githubusercontent.com/66072832/175079386-6cb0c11b-0ba3-46c6-830e-87844c152b16.png)
![image](https://user-images.githubusercontent.com/66072832/175080212-6939f8b1-d6e0-4118-955c-1e6c9d88a4f4.png)
![image](https://user-images.githubusercontent.com/66072832/175080333-d6da9da7-7f28-46c0-95c2-2ce924614978.png)
![image](https://user-images.githubusercontent.com/66072832/175080402-4631aa53-30b8-49ce-965a-d1ec28b4a179.png)



## 목차

0. [프로젝트 실행](#프로젝트-실행)
1. [프로젝트 소개](#프로젝트-소개)
2. [규칙](#규칙)
3. [폴더 구조](#폴더-구조)
4. [기술 스택](#기술-스택)
5. [커뮤니케이션](#커뮤니케이션)
6. [팀원](#팀원)

## 프로젝트 실행

### Node Version

> v16.15.0

### Package Manager

> npm(version 8.5.5)

### 환경 변수

.env 파일에 API_URL 변수를 추가해야합니다.

```
REACT_APP_API_END_POINT=[API_URL]
```

### 의존성 라이브러리 설치

```
npm i

또는

npm install
```

### develop

```
// 개발 모드 실행
npm run dev
```

### production build

빌드

```
// mac
npm run mac-build

// window
npm run window-build
```

실행

```
npm install -g serve
serve -s build

또는

npx serve -s build
```

## 프로젝트 소개

껨부는 기존의 한 게임의 특정 콘텐츠의 유저만을 모집하는 것이 아닌, 여러 게임, 여러 콘텐츠를 함께 즐길 유저를 모집하는 종합 게임 파티원 구인 서비스를 목표로 합니다.

여러 게임의 커뮤니티를 하나하나 찾아다닐 필요 없이, 여러 게임과 콘텐츠를 함께 즐길 사람을 종합적으로 구하는 서비스를 이용할 수 있는 SNS 플랫폼입니다.

## 규칙

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

## 폴더 구조

```
🎮 껨부(Gamebu)
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ .storybook
├─ craco.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
├─ README.md
└─ src
   ├─ App.js
   ├─ App.test.js
   ├─ assets
   │  ├─ ChannelIcons
   │  │  ├─ Icon_로스트아크.png
   │  │  ├─ Icon_리그오브레전드.png
   │  │  ├─ Icon_메이플스토리.png
   │  │  ├─ Icon_배틀그라운드.png
   │  │  ├─ Icon_오버워치.png
   │  │  └─ index.js
   │  ├─ ChannelImages
   │  │  ├─ ChannelBanner_LOL.jpeg
   │  │  ├─ ChannelBanner_LostArk.jpg
   │  │  ├─ ChannelBanner_MapleStory.jpg
   │  │  ├─ ChannelBanner_Overwatch.png
   │  │  ├─ ChannelBanner_PUBG.png
   │  │  └─ index.js
   │  ├─ img
   │  │  ├─ battleground.png
   │  │  ├─ index.js
   │  │  ├─ lol.png
   │  │  ├─ lostark.png
   │  │  ├─ maple.png
   │  │  └─ overwatch.png
   │  └─ TagAvatars
   │     ├─ Competition.png
   │     ├─ Dealer.png
   │     ├─ Duo.png
   │     ├─ FPS.png
   │     ├─ Healer.png
   │     ├─ index.js
   │     ├─ Party.png
   │     ├─ Raid.png
   │     ├─ RPG.png
   │     ├─ Support.png
   │     └─ Tanker.png
   ├─ components
   │  ├─ AlarmCard
   │  │  ├─ Comment.js
   │  │  ├─ index.js
   │  │  ├─ Like.js
   │  │  └─ Message.js
   │  ├─ AlarmMenu
   │  │  └─ index.js
   │  ├─ Avatar
   │  │  ├─ AvatarGroup.js
   │  │  └─ index.js
   │  ├─ Badge
   │  │  └─ index.js
   │  ├─ BottomNavBar
   │  │  └─ index.js
   │  ├─ Card
   │  │  ├─ Author.js
   │  │  ├─ Comment.js
   │  │  ├─ index.js
   │  │  ├─ Post.js
   │  │  └─ User.js
   │  ├─ Categories
   │  │  ├─ GameIcon.js
   │  │  ├─ GameImage.js
   │  │  ├─ GameTitle.js
   │  │  ├─ index.js
   │  │  └─ MessageTitle.js
   │  ├─ CategoryItem
   │  │  └─ index.js
   │  ├─ Channels
   │  │  ├─ ChannelImageContainer.js
   │  │  ├─ ChannelPostCard.js
   │  │  └─ index.js
   │  ├─ ClickAwayPopper
   │  │  └─ index.js
   │  ├─ Comment
   │  │  ├─ CommetInput.js
   │  │  └─ index.js
   │  ├─ CommentInput
   │  │  └─ index.js
   │  ├─ Divider
   │  │  └─ index.js
   │  ├─ EditFullNameModal
   │  │  └─ index.js
   │  ├─ GoBack
   │  │  └─ index.js
   │  ├─ Header
   │  │  └─ index.js
   │  ├─ Image
   │  │  ├─ BannerImage.js
   │  │  └─ index.js
   │  ├─ InterestedChannelModal
   │  │  └─ index.js
   │  ├─ LoginModal
   │  │  └─ index.js
   │  ├─ PostForm
   │  │  ├─ index.js
   │  │  ├─ MultiLineTextInput.js
   │  │  ├─ SelectInput.js
   │  │  └─ TextInput.js
   │  ├─ SkeletonMessage
   │  │  ├─ Card.js
   │  │  ├─ Detail.js
   │  │  └─ index.js
   │  ├─ Tag
   │  │  └─ index.js
   │  ├─ TagChip
   │  │  ├─ index.js
   │  │  ├─ ShortTagList.js
   │  │  └─ TagList.js
   │  ├─ Thumbnail
   │  │  └─ index.js
   │  └─ Topbar
   │     ├─ index.js
   │     ├─ Sidebar.js
   │     └─ UserSidebar.js
   ├─ contexts
   │  └─ ContextProvider.js
   ├─ hooks
   │  ├─ useActionContext.js
   │  ├─ useAsync.js
   │  ├─ useAsyncFn.js
   │  ├─ useCheckAuth.js
   │  ├─ useCookieToken.js
   │  ├─ useForm.js
   │  ├─ useInterval.js
   │  ├─ useOurSnackbar.js
   │  ├─ usePostForm.js
   │  └─ useValueContext.js
   ├─ index.css
   ├─ index.js
   ├─ pages
   │  ├─ AlramPage.js
   │  ├─ CategoriesPage.js
   │  ├─ ChannelPage.js
   │  ├─ DetailMessage.js
   │  ├─ Footer.js
   │  ├─ Heading.js
   │  ├─ HomePage.js
   │  ├─ index.js
   │  ├─ LoginPage.js
   │  ├─ MessagePage.js
   │  ├─ NotFoundPage.js
   │  ├─ PostDetailPage.js
   │  ├─ PostEditPage.js
   │  ├─ PostWritePage.js
   │  ├─ ProfilePage.js
   │  ├─ SearchAllPage.js
   │  ├─ SearchPage.js
   │  ├─ SearchPostPage.js
   │  ├─ SearchUserPage.js
   │  └─ SignupPage.js
   ├─ reportWebVitals.js
   ├─ setupTests.js
   ├─ stories
   │  ├─ Avatar.stories.js
   │  ├─ Badge.stories.js
   │  ├─ Card.stories.js
   │  ├─ ClickAwayPopper.stories.js
   │  ├─ Divider.stories.js
   │  ├─ Header.stories.js
   │  ├─ Image.stories.js
   │  ├─ PostInput.stories.js
   │  ├─ TagChip.stories.js
   │  └─ TagList.stories.js
   └─ utils
      ├─ alarm
      │  └─ index.js
      ├─ color.js
      ├─ constants.js
      ├─ fetch.js
      ├─ likes
      │  └─ index.js
      ├─ message
      │  └─ index.js
      ├─ search
      │  └─ index.js
      ├─ time.js
      └─ user
         └─ index.js
```

## 기술 스택

<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <br>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=#CB3837" />
  <img src="https://img.shields.io/badge/React Router-121212?style=for-the-badge&logo=React Router&logoColor=#CA4245" />
  <img src="https://img.shields.io/badge/styled components-3C3C3C?style=for-the-badge&logo=styled-components&logoColor=#DB7093" />
  <img src="https://img.shields.io/badge/MUI-3C3C3C?style=for-the-badge&logo=MUI&logoColor=#007FFF" />
  <br>
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=#007ACC" />
  
</div>

## 커뮤니케이션

<div align=center> 
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=#000000" />
  <img src="https://img.shields.io/badge/Discord-292841?style=for-the-badge&logo=Discord&logoColor=#5865F2" />
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=#4A154B" />
  
</div>

## 팀원

| 조채우                                 | 고광필                                | 김동언                              | 박민제                               | 이상진                                  |
| -------------------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------ | --------------------------------------- |
| [Github](https://github.com/JoChaeWoo) | [Github](https://github.com/feel0321) | [Github](https://github.com/960817) | [Github](https://github.com/mieumje) | [Github](https://github.com/sangjin149) |
