# 모바일 청첩장 💌

심플하고 감성적인 모바일 청첩장 (순수 HTML/CSS/JS, 프레임워크 없음).

## 구성
```
mobilemarry/
├─ index.html          # 페이지 구조
├─ style.css           # 디자인 (크림/베이지 세리프 톤)
├─ script.js           # 렌더링 & 인터랙션 (수정 불필요)
├─ config.js           # ⭐ 내용 수정은 이 파일만!
└─ assets/images/      # 사진 (cover / photo1~8)
```

## 1. 내용 수정 — `config.js`
`config.js` 파일 하나만 고치면 모든 내용이 바뀝니다.
- **신랑/신부**: 이름, 전화번호, 부모님 성함
- **wedding**: 예식 일시(년/월/일/시), 식장명·주소, **지도 좌표(lat/lng)**
  - 요일·영문 날짜·D-day는 이 날짜로 **자동 계산**됩니다. (남은 일수는 매일 자동 갱신)
- **cover**: 대표사진(`image`), 상단에 한 글자씩 써지는 워딩(`wording` — 줄 단위 배열), 하단 문구(`quote`)
- **greeting**: 인사말 (줄바꿈은 `\n`)
- **infoTabs**: 안내 탭 (포토부스 / 주차안내 / 답례품 …) — `title`/`body`/`image` 추가·삭제 자유
- **accounts**: 신랑측/신부측 계좌 목록
- **directions**: 오시는 길 (지하철/버스/자가용/주차)

## 2. 사진 교체 — `assets/images/`
현재는 미리보기용 임시 이미지(`.svg`)가 들어 있습니다.
1. 실제 사진(`.jpg`/`.png`)을 `assets/images/` 에 넣고
2. `config.js` 의 `cover.image` 와 `gallery` 경로를 실제 파일명으로 변경하세요.
   - 예: `"assets/images/cover.svg"` → `"assets/images/cover.jpg"`
- 대표사진(cover)은 **세로 비율(예: 900×1300)** 을 권장합니다.
- 갤러리는 **정사각형**으로 잘려 보이므로 정사각 크롭 사진이 깔끔합니다.

## 3. 카카오맵 & 공유 (선택)
지도 표시와 카카오톡 공유를 쓰려면 카카오 키가 필요합니다.
1. [Kakao Developers](https://developers.kakao.com) 로그인 → 애플리케이션 추가
2. **JavaScript 키** 복사 → `config.js` 의 `options.kakaoJavascriptKey` 에 입력
3. **플랫폼 → Web** 에 배포할 도메인 등록 (예: `https://your-site.com`)
   - 로컬 테스트는 `http://localhost:8777` 도 등록
4. 카카오톡 공유를 쓰려면 **카카오 로그인 → 사이트 도메인**도 등록

> 키를 넣지 않아도 나머지 기능은 모두 동작하며, 지도 자리에는 안내 문구가 표시되고
> 지도 버튼(카카오맵/네이버/티맵)은 앱으로 바로 연결됩니다.

## 4. 로컬 미리보기
```bash
cd mobilemarry
python3 -m http.server 8777
# 브라우저에서 http://localhost:8777 접속
```
> ⚠️ `index.html` 파일을 더블클릭(`file://`)하면 일부 기능이 제한될 수 있으니
> 위처럼 로컬 서버로 확인하세요.

## 5. 배포 (무료)
정적 파일이라 아래 어디든 폴더째 올리면 됩니다.
- **Netlify** / **Vercel**: 폴더 드래그&드롭
- **GitHub Pages**: 저장소 push 후 Pages 활성화
- 배포 후 실제 주소를 `config.js` 의 `options.shareUrl` 에 입력하세요.

## 포함 기능
커버(써지는 워딩 애니메이션) · 인사말 · 예식 달력 & 자동 D-day · 갤러리(확대·스와이프) ·
카카오맵(카카오/네이버/티맵 버튼) · 오시는 길 · 안내 탭(포토부스/주차/답례품) ·
계좌 복사 · 연락하기(전화·문자) · 카카오톡 공유 · 배경음악(선택)
# mobile-invitation
# mobile-invitation
# mobile-invitation
# mobile-invitation
# mobile-invitation
