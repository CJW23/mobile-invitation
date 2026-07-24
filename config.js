/* =========================================================
 *  청첩장 설정 파일  —  이 파일만 수정하면 내용이 바뀝니다.
 * ========================================================= */
window.WEDDING_CONFIG = {
  // ── 기본 정보 ──────────────────────────────────────────
  groom: {
    name: "김민준",
    phone: "010-1234-5678",
    father: "김아버지",
    mother: "이어머니",
    // 관계: 아들 중 몇째인지 (예: "아들", "장남", "차남")
    relation: "아들",
  },
  bride: {
    name: "이서연",
    phone: "010-8765-4321",
    father: "이아버지",
    mother: "박어머니",
    relation: "딸",
  },

  // ── 예식 일시/장소 ─────────────────────────────────────
  wedding: {
    // YYYY, MM(1~12), DD, HH(24시), MM
    year: 2027, month: 1, day: 9, hour: 12, minute: 0,
    dateText: "2027년 1월 9일 토요일 낮 12시",
    hallName: "그랜드 웨딩홀 5층 그랜드볼룸",
    hallAddress: "서울특별시 강남구 테헤란로 123",
    // 카카오맵 좌표 (식장 위치) — 지도에서 확인 후 교체
    lat: 37.501274,
    lng: 127.039585,
  },

  // ── 인사말 ─────────────────────────────────────────────
  greeting: {
    title: "결혼합니다",
    message:
      "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어가고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있도록\n앞날을 축복해 주시면 감사하겠습니다.",
  },

  // ── 대표 사진 (커버) ───────────────────────────────────
  cover: {
    image: "assets/images/cover.svg",
    // 상단에 한 자씩 써지는 워딩 (줄 단위로 입력)
    wording: ["our", "wedding", "day"],
    // 하단 감성 문구 (줄바꿈 \n)
    quote: "Forever begins with a single step,\nAnd love guides us every step of the way.",
  },

  // ── 갤러리 사진 목록 ───────────────────────────────────
  gallery: [
    "assets/images/photo1.svg",
    "assets/images/photo2.svg",
    "assets/images/photo3.svg",
    "assets/images/photo4.svg",
    "assets/images/photo5.svg",
    "assets/images/photo6.svg",
    "assets/images/photo7.svg",
    "assets/images/photo8.svg",
  ],

  // ── 마음 전하실 곳 (계좌) ──────────────────────────────
  accounts: {
    groom: [
      { label: "신랑", bank: "카카오뱅크", number: "3333-01-1234567", holder: "김민준" },
      { label: "신랑 아버지", bank: "국민은행", number: "123-45-678901", holder: "김아버지" },
      { label: "신랑 어머니", bank: "신한은행", number: "110-234-567890", holder: "이어머니" },
    ],
    bride: [
      { label: "신부", bank: "토스뱅크", number: "1000-12-3456789", holder: "이서연" },
      { label: "신부 아버지", bank: "우리은행", number: "1002-345-678901", holder: "이아버지" },
      { label: "신부 어머니", bank: "농협은행", number: "302-1234-5678-91", holder: "박어머니" },
    ],
  },

  // ── 오시는 길 ──────────────────────────────────────────
  directions: [
    { icon: "🚇", title: "지하철", desc: "2호선 강남역 3번 출구 도보 5분" },
    { icon: "🚌", title: "버스", desc: "간선 146, 360 / 지선 4412 '강남역' 하차" },
    { icon: "🚗", title: "자가용", desc: "내비게이션에 '그랜드 웨딩홀' 검색" },
    { icon: "🅿️", title: "주차", desc: "건물 지하 1~4층, 2시간 무료" },
  ],

  // ── 안내 탭 (포토부스 / 주차안내 / 답례품 등) ──────────
  //  title: 탭 이름,  body: 내용(줄바꿈 \n),  image: 이미지 경로("" 면 생략)
  infoTabs: [
    {
      title: "포토부스",
      image: "",
      body: "예식 당일, 포토부스를 운영합니다.\n소중한 순간을 사진으로 남겨\n신랑·신부에게 따뜻한 추억을 선물해 주세요.\n\n📍 위치 : 5층 그랜드볼룸 입구",
    },
    {
      title: "주차안내",
      image: "",
      body: "건물 지하 1~4층 주차장을 이용하실 수 있습니다.\n\n🅿️ 2시간 무료 (이후 시간당 3,000원)\n🚗 만차 시 인근 공영주차장 이용 부탁드립니다.\n\n※ 하객이 많아 혼잡할 수 있으니\n대중교통 이용을 권장드립니다.",
    },
    {
      title: "답례품",
      image: "",
      body: "먼 걸음 해주시는 하객분들을 위해\n작은 답례품을 준비했습니다.\n\n🎁 예식장 안내데스크에서\n한 분씩 수령해 주세요.",
    },
  ],

  // ── 옵션 ───────────────────────────────────────────────
  options: {
    // 배경음악 파일 (없으면 "" 로 두면 버튼이 안 보입니다)
    bgm: "",
    // 카카오 JavaScript 키 (지도/공유용) — 아래 안내 참고
    kakaoJavascriptKey: "966b39aeccc33b5144876e87e4583efe",
    // 공유 시 표시될 페이지 URL (배포 후 실제 주소로 교체)
    shareUrl: "https://your-wedding-invitation.com",
  },
};
