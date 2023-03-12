# AudioInspect<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=AudioInspect&fontSize=90" />
</div>
<div align=center>
	<h3>📚 Tech Stack 📚</h3>
	<p>✨ Platforms & Languages ✨</p>
</div>
<div align="center">
	<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white" />
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
	
</div>
<div align=center>
	<p>🛠 Tools 🛠</p>
</div>
<div align=center>
	<img src="https://img.shields.io/badge/Eclipse%20IDE-2C2255?style=flat&logo=EclipseIDE&logoColor=white" />
	<img src="https://img.shields.io/badge/Tomcat-F8DC75?style=flat&logo=ApacheTomcat&logoColor=white" />
</div>

## 🔊 서비스 소개

AudioInspect - 웹을 통한 음성 파일의 메타데이터 분석 서비스입니다.

- 2개 이상의 파일간의 속성 비교를 통해 음성 파일의 메타데이터 분석, 비교 서비스입니다.

- 세미 메타 데이터와 메타데이터로 사용자의 필요성에 따른 음성 파일 분석이 가능합니다. 

- 파일 분석, 비교 결과를 Excel, XML으로 저장이 가능합니다. 

--- 

## 🗂 서비스 설명

1. AudioInspect의 음성 분석 서비스를 제공 받을 수 있는 파일 확장자는 wav, m4a, flac, 3gp, 3ga, mp3, amr입니다.
(mp3, amr 확장자 경우, semimetadata만을 지원합니다.)
2. 웹 서비스 화면 상에서 왼쪽에서 다루는 파일은 기준 파일이라 칭합니다.
3. 웹 서비스 화면 상에서 오른쪽에서 다루는 파일은 비교 파일이라 칭합니다.
4. 기준 파일의 경우 1개까지만 업로드 가능하며, 비교 파일은 개수 제한 없이 업로드 가능합니다.
5. TEXT, TREE 비교 형식으로 추출한 음성 파일의 데이터는 세미 메타 데이터라 칭합니다.
6. XML 비교 형식으로 추출한 음성 파일의 데이터는 메타 데이터라 칭합니다.
7. Excel로 비교 결과를 추출하는 서비스는 비교 형식이 TEXT, TREE일 때만 지원합니다.
8. XML로 비교 결과를 추출하는 서비스는 비교 형식이 XML일 때만 지원.

## ⚙️ AudioInspect 설정방법

<details>
<summary>AudioInspect 설정 펼쳐보기</summary>

## 1. tomcat 설정하기

server 사용시 Tomcat version을 10.0으로 맞춰 사용해 주셔야 합니다.

---
	
## 2. 폴더 경로 설정하기

[프로젝트 폴더]/src/main/java/controller/fileUploadServlet.java 파일을 연 후 
	
local PC의 위치에 원하는 폴더명의 폴더 생성 후 해당 경로와 폴더 명으로 코드를 수정 후 사용해 주셔야 합니다.
	
```ruby
  //27행
	String savefilePath = "C:\\[폴더 명]";
  //42행
	result.add(MediaInfo.getXMLString("C:\\[폴더 명]\\"+fileName));
```
--- 
	
## 3. MedeaInfo.exe 사용하기

local PC에 MediaInfo_CLI_21.03_Windows_x64 설치 후 코드 내에 해당 경로를 설정해 주셔야 합니다.

### [MediaInfo 다운로드 링크](https://mediaarea.net/en/MediaInfo/Download)

[프로젝트 폴더]/src/main/java/MediaInfo/MediaInfo.java 파일을 연 후 
	MediaInfo.exe의 실제 저장 위치로 변경해 주셔야 합니다. 
	
```ruby
   //9행
        static final String MedeaInfoPath = "C:\\MediaInfo_CLI_21.03_Windows_x64\\MediaInfo.exe";
```
</details>

## 📝 Contribute 규칙
코드 수정시 아래의 규칙을 따라 작성해 주시길 바랍니다.

1. 음성 파일을 다루는 파일, 변수, 함수 등의 경우, 해당 음성 파일의 역할에 따라 이름에 stand(ard), comp(are)이 포함되어야 한다.
2. TEXT, TREE 비교 형식을 다루는 파일, 변수, 함수 등의 경우, 이름에 semimetadata이 포함되어야 한다.
3. XML 비교 형식을 다루는 파일, 변수, 함수 등의 경우, 이름에 metadata가 포함되어야 한다.

## 🖥 샘플 이미지
<p float = "left";>
<img src = "https://user-images.githubusercontent.com/80144964/203689996-f4dd8de6-5799-415e-b130-9001e4388cb1.png">
<img src = "https://user-images.githubusercontent.com/80144964/203690246-b0b13db5-44fc-4378-8894-ada019532ca7.png">

