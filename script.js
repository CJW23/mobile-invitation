/* ═══════════════════════════════════════════════
   모바일 청첩장 — 렌더링 & 인터랙션
   ═══════════════════════════════════════════════ */
(function () {
  "use strict";
  const C = window.WEDDING_CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ── 유틸: 토스트 ───────────────────────────── */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }
  const pad = (n) => String(n).padStart(2, "0");

  const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  /* ═══════ 커버 ═══════ */
  function renderCover() {
    $("#coverImg").style.backgroundImage = `url('${C.cover.image}')`;

    // 상단 워딩 — 줄 단위로 왼→오 써지는 애니메이션
    const START = 0.4, STEP = 0.55;
    $("#coverWording").innerHTML = (C.cover.wording || []).map((line, li) => {
      const delay = (START + li * STEP).toFixed(2);
      return `<span class="cover__line" style="animation-delay:${delay}s">${line}</span>`;
    }).join("");

    // 하단 영문 날짜 (요일 자동 계산)
    const w = C.wedding;
    const d = new Date(w.year, w.month - 1, w.day);
    $("#coverDate").textContent =
      `- ${DOW_EN[d.getDay()]}, ${MON_EN[w.month - 1]} ${ordinal(w.day)}, ${w.year} -`;
    $("#coverQuote").textContent = C.cover.quote || "";
    renderHearts();
  }

  /* 커버 위로 떠오르는 하트 */
  function renderHearts() {
    const box = $("#coverHearts");
    if (!box) return;
    const colors = ["#ffffff", "#fbe0da", "#f6cfc7", "#ffffff", "#f9d9d2", "#ffe9e4"];
    const N = 16;
    let html = "";
    for (let k = 0; k < N; k++) {
      const left = (Math.random() * 100).toFixed(1);
      const size = (10 + Math.random() * 20).toFixed(0);
      const dur = (7 + Math.random() * 7).toFixed(1);
      const delay = (Math.random() * 12).toFixed(1);       // 음수 지연으로 시작 시점 분산
      const drift = (Math.random() * 90 - 45).toFixed(0);   // 좌우 흔들림
      const rot = (Math.random() * 40 - 12).toFixed(0);
      const color = colors[k % colors.length];
      html += `<span class="heart" style="left:${left}%;font-size:${size}px;color:${color};`
        + `--drift:${drift}px;--rot:${rot}deg;`
        + `animation-duration:${dur}s;animation-delay:-${delay}s;">♥</span>`;
    }
    box.innerHTML = html;
  }

  /* ═══════ 인사말 ═══════ */
  function renderGreeting() {
    $("#greetingTitle").textContent = C.greeting.title;
    $("#greetingMessage").textContent = C.greeting.message;
    const g = C.groom, b = C.bride;
    $("#greetingFamily").innerHTML = `
      <div class="fam-row">
        <span class="fam-parents">${g.father} · ${g.mother}</span>
        <span class="fam-rel">의 ${g.relation}</span>
        <span class="fam-name">${g.name}</span>
      </div>
      <div class="fam-row">
        <span class="fam-parents">${b.father} · ${b.mother}</span>
        <span class="fam-rel">의 ${b.relation}</span>
        <span class="fam-name">${b.name}</span>
      </div>`;
  }

  /* ═══════ 달력 & D-day ═══════ */
  function renderCalendar() {
    const w = C.wedding;
    $("#calMonthTitle").textContent = `${w.month}월`;
    $("#calDateText").textContent = w.dateText;

    const year = w.year, month = w.month; // month: 1~12
    const first = new Date(year, month - 1, 1).getDay();
    const days = new Date(year, month, 0).getDate();
    const heads = ["일", "월", "화", "수", "목", "금", "토"];
    let html = heads.map((h, i) =>
      `<div class="cal-cell cal-head${i === 0 ? " sun" : ""}">${h}</div>`).join("");
    for (let i = 0; i < first; i++) html += `<div class="cal-cell cal-empty"></div>`;
    for (let d = 1; d <= days; d++) {
      const dow = (first + d - 1) % 7;
      const isDay = d === w.day;
      html += `<div class="cal-cell${dow === 0 ? " sun" : ""}${isDay ? " cal-today" : ""}"><span>${d}</span></div>`;
    }
    $("#calendarGrid").innerHTML = html;

    // D-day
    const target = new Date(year, month - 1, w.day, w.hour, w.minute);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const wd = new Date(year, month - 1, w.day);
    const diff = Math.round((wd - today) / 86400000);
    const names = `${C.groom.name} ♥ ${C.bride.name}`;
    let msg;
    if (diff > 0) msg = `${names}의 결혼식이 <b>${diff}일</b> 남았습니다.`;
    else if (diff === 0) msg = `오늘은 <b>${names}</b>의 결혼식 날입니다.`;
    else msg = `${names}의 결혼을 축하해 주셔서 감사합니다.`;
    $("#ddayText").innerHTML = msg;
  }

  /* ═══════ 갤러리 & 라이트박스 ═══════ */
  let lbIndex = 0;
  function renderGallery() {
    const grid = $("#galleryGrid");
    grid.innerHTML = C.gallery.map((src, i) =>
      `<div class="g-item" data-i="${i}" style="background-image:url('${src}')"></div>`).join("");
    $$(".g-item", grid).forEach((el) =>
      el.addEventListener("click", () => openLightbox(+el.dataset.i)));
  }
  function openLightbox(i) {
    lbIndex = i;
    updateLightbox();
    $("#lightbox").classList.add("open");
    $("#lightbox").setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    $("#lightbox").classList.remove("open");
    $("#lightbox").setAttribute("aria-hidden", "true");
  }
  function updateLightbox() {
    const n = C.gallery.length;
    lbIndex = (lbIndex + n) % n;
    $("#lbImg").src = C.gallery[lbIndex];
    $("#lbCount").textContent = `${lbIndex + 1} / ${n}`;
  }
  function bindLightbox() {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => { lbIndex--; updateLightbox(); });
    $("#lbNext").addEventListener("click", () => { lbIndex++; updateLightbox(); });
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") { lbIndex--; updateLightbox(); }
      if (e.key === "ArrowRight") { lbIndex++; updateLightbox(); }
    });
    // 스와이프
    let sx = 0;
    const img = $("#lightbox");
    img.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    img.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) { lbIndex += dx < 0 ? 1 : -1; updateLightbox(); }
    }, { passive: true });
  }

  /* ═══════ 위치 / 지도 ═══════ */
  function renderLocation() {
    const w = C.wedding;
    $("#hallName").textContent = w.hallName;
    $("#hallAddress").textContent = w.hallAddress;

    const q = encodeURIComponent(w.hallName);
    $("#btnKakaoMap").href = `https://map.kakao.com/link/search/${q}`;
    $("#btnNaverMap").href = `https://map.naver.com/v5/search/${q}`;
    $("#btnTmap").href = `https://apis.openapi.sk.com/tmap/app/routes?name=${q}&goalx=${w.lng}&goaly=${w.lat}`;

    // 오시는 길
    $("#directions").innerHTML = C.directions.map((d) => `
      <div class="dir-item">
        <div class="dir-icon">${d.icon}</div>
        <div>
          <div class="dir-title">${d.title}</div>
          <div class="dir-desc">${d.desc}</div>
        </div>
      </div>`).join("");

    initKakaoMap();
  }

  function initKakaoMap() {
    const key = C.options.kakaoJavascriptKey;
    const mapEl = $("#map");
    const validKey = key && !key.includes("여기에");
    if (!validKey) {
      mapEl.innerHTML = `<div class="map__placeholder">
        <div style="font-size:26px">🗺️</div>
        <div>카카오 지도 표시를 위해<br/>config.js 에 카카오 JavaScript 키를 입력하세요.</div>
      </div>`;
      return;
    }
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    script.onload = () => {
      kakao.maps.load(() => {
        const w = C.wedding;
        const pos = new kakao.maps.LatLng(w.lat, w.lng);
        const map = new kakao.maps.Map(mapEl, { center: pos, level: 3 });
        new kakao.maps.Marker({ position: pos, map });
        map.setDraggable(true);
      });
    };
    script.onerror = () => {
      mapEl.innerHTML = `<div class="map__placeholder">지도를 불러오지 못했습니다.<br/>카카오 키/도메인 설정을 확인하세요.</div>`;
    };
    document.head.appendChild(script);
  }

  /* ═══════ 안내 탭 ═══════ */
  function renderInfoTabs() {
    const tabs = C.infoTabs || [];
    const section = $("#info");
    if (!tabs.length) { if (section) section.style.display = "none"; return; }

    const nav = $("#tabsNav");
    const panels = $("#tabsPanels");
    nav.innerHTML = tabs.map((t, i) =>
      `<button class="tabs__tab${i === 0 ? " active" : ""}" data-tab="${i}">${t.title}</button>`
    ).join("") + `<span class="tabs__ink" id="tabsInk"></span>`;
    panels.innerHTML = tabs.map((t, i) =>
      `<div class="tabs__panel${i === 0 ? " active" : ""}">
        ${t.image ? `<img src="${t.image}" alt="${t.title}" />` : ""}
        <p>${t.body}</p>
      </div>`
    ).join("");

    const btns = $$(".tabs__tab", nav);
    const cards = $$(".tabs__panel", panels);
    const ink = $("#tabsInk");
    const moveInk = (btn) => { ink.style.left = btn.offsetLeft + "px"; ink.style.width = btn.offsetWidth + "px"; };
    const activate = (i) => {
      btns.forEach((b, j) => b.classList.toggle("active", j === i));
      cards.forEach((c, j) => c.classList.toggle("active", j === i));
      moveInk(btns[i]);
    };
    btns.forEach((b, i) => b.addEventListener("click", () => activate(i)));
    requestAnimationFrame(() => moveInk(btns[0]));
    window.addEventListener("resize", () => {
      const active = nav.querySelector(".tabs__tab.active");
      if (active) moveInk(active);
    });
  }

  /* ═══════ 계좌 ═══════ */
  function accRowHTML(a) {
    return `
      <div class="acc-row">
        <div class="acc-row__info">
          <div class="acc-row__label">${a.label}</div>
          <div class="acc-row__num"><b>${a.bank}</b> ${a.number}</div>
          <div class="acc-row__holder">예금주 ${a.holder}</div>
        </div>
        <button class="acc-row__copy" data-copy="${a.bank} ${a.number}">복사</button>
      </div>`;
  }
  function renderAccounts() {
    $("#accGroom").innerHTML = C.accounts.groom.map(accRowHTML).join("");
    $("#accBride").innerHTML = C.accounts.bride.map(accRowHTML).join("");

    $$(".accordion__head").forEach((btn) => {
      btn.addEventListener("click", () => btn.parentElement.classList.toggle("open"));
    });
    $$(".acc-row__copy").forEach((btn) => {
      btn.addEventListener("click", () => copyText(btn.dataset.copy, "계좌번호가 복사되었습니다"));
    });
  }

  /* ═══════ 연락하기 ═══════ */
  function renderContact() {
    // config.contacts 우선, 없으면 신랑·신부 기본
    const source = (C.contacts && C.contacts.length) ? C.contacts : [
      { role: "신랑", name: C.groom.name, phone: C.groom.phone },
      { role: "신부", name: C.bride.name, phone: C.bride.phone },
    ];
    const list = source.filter((p) => p.phone && p.phone.trim());

    // 유효한 연락처가 없으면 연락하기 섹션 숨김
    if (!list.length) {
      const sec = $("#contact");
      if (sec) sec.style.display = "none";
      return;
    }
    $("#contactGrid").innerHTML = list.map((p) => `
      <div class="contact__card">
        <div class="contact__who">
          <div class="contact__role">${p.role}</div>
          <div class="contact__name">${p.name}</div>
        </div>
        <div class="contact__actions">
          <a class="contact__ic" href="tel:${p.phone}" aria-label="전화">📞</a>
          <a class="contact__ic" href="sms:${p.phone}" aria-label="문자">✉️</a>
        </div>
      </div>`).join("");
  }

  /* ═══════ 공유 ═══════ */
  function copyText(text, msg) {
    const done = () => toast(msg || "복사되었습니다");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); cb(); } catch (e) {}
    document.body.removeChild(ta);
  }
  function renderShare() {
    const url = C.options.shareUrl;
    $("#btnCopyLink").addEventListener("click", () => copyText(url, "링크가 복사되었습니다"));

    const key = C.options.kakaoJavascriptKey;
    const validKey = key && !key.includes("여기에");
    $("#btnKakaoShare").addEventListener("click", () => {
      if (validKey && window.Kakao) shareKakao();
      else copyText(url, "링크가 복사되었습니다 (카카오 키 설정 시 공유 가능)");
    });

    if (validKey) {
      const s = document.createElement("script");
      s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
      s.onload = () => { try { window.Kakao.init(key); } catch (e) {} };
      document.head.appendChild(s);
    }
  }
  function shareKakao() {
    const w = C.wedding;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${C.groom.name} ♥ ${C.bride.name} 결혼합니다`,
        description: w.dateText + "\n" + w.hallName,
        imageUrl: new URL(C.cover.image, C.options.shareUrl).href,
        link: { mobileWebUrl: C.options.shareUrl, webUrl: C.options.shareUrl },
      },
      buttons: [{ title: "청첩장 보기", link: { mobileWebUrl: C.options.shareUrl, webUrl: C.options.shareUrl } }],
    });
  }

  /* ═══════ 배경음악 ═══════ */
  function renderBGM() {
    if (!C.options.bgm) return;
    const btn = $("#bgmToggle");
    const audio = new Audio(C.options.bgm);
    audio.loop = true; audio.volume = 0.5;
    btn.hidden = false;
    let playing = false;
    btn.addEventListener("click", () => {
      if (playing) { audio.pause(); btn.classList.remove("playing"); }
      else { audio.play().catch(() => toast("재생할 수 없습니다")); btn.classList.add("playing"); }
      playing = !playing;
    });
  }

  /* ═══════ 스크롤 등장 애니메이션 ═══════ */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ═══════ 인트로 (닫혔다 열리는 청첩장) ═══════ */
  function sealSVG() {
    let lines = "";
    for (let i = 0; i < 24; i++) {
      const a = (i * 15) * Math.PI / 180;
      const x1 = (60 + Math.cos(a) * 16).toFixed(1), y1 = (60 + Math.sin(a) * 16).toFixed(1);
      const x2 = (60 + Math.cos(a) * 43).toFixed(1), y2 = (60 + Math.sin(a) * 43).toFixed(1);
      lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
    }
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="sealG" cx="50%" cy="38%" r="65%">
        <stop offset="0" stop-color="#fffefb"/><stop offset="1" stop-color="#d8cebd"/>
      </radialGradient></defs>
      <circle cx="60" cy="60" r="47" fill="url(#sealG)" stroke="#c7bca7" stroke-width="1.5"/>
      <g stroke="#bcae95" stroke-width="1" stroke-linecap="round" opacity="0.8">${lines}</g>
      <circle cx="60" cy="60" r="14" fill="#f1ebdf" stroke="#c7bca7" stroke-width="1.2"/>
    </svg>`;
  }
  function initIntro() {
    const intro = $("#intro");
    if (!intro) { document.body.classList.add("opened"); return; }

    $("#introGroom").textContent = C.groom.name;
    $("#introBride").textContent = C.bride.name;
    const w = C.wedding;
    const dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(w.year, w.month - 1, w.day).getDay()];
    $("#introDate").textContent = `${w.year}.${pad(w.month)}.${pad(w.day)}  ${dow}  ${pad(w.hour)}:${pad(w.minute)}`;
    $("#introVenue").textContent = w.hallName;
    $("#introSeal").innerHTML = sealSVG();

    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      intro.classList.add("opening");
      document.body.classList.add("opened");     // 커버 글씨 써지기 시작
      setTimeout(() => intro.classList.add("done"), 1700);
    };
    intro.addEventListener("click", open);
    setTimeout(open, 2200);                        // 잠시 닫힌 채 보여준 뒤 자동 열림
  }

  /* ═══════ 초기화 ═══════ */
  document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    renderCover();
    renderGreeting();
    renderCalendar();
    renderGallery();
    bindLightbox();
    renderLocation();
    renderInfoTabs();
    renderAccounts();
    renderContact();
    renderShare();
    renderBGM();
    initReveal();
  });
})();
