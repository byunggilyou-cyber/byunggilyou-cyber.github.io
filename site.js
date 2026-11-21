// ===== 설정 =====
// 카카오톡 채널 링크를 받으면 아래 따옴표 안에 넣어 주세요. (예: "https://pf.kakao.com/_xxxx/chat")
const KAKAO_URL = "";

(function () {
  // 카카오톡 버튼 링크
  if (KAKAO_URL) {
    document.querySelectorAll(".js-kakao").forEach(function (a) {
      a.href = KAKAO_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  // 모바일 메뉴
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // 날짜 캘린더 (공석 연동 전: 날짜를 누르면 문의로 연결)
  var grid = document.getElementById("cal-grid");
  if (grid) {
    var title = document.getElementById("cal-title");
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var view = new Date(today.getFullYear(), today.getMonth(), 1);
    var dows = ["일", "월", "화", "수", "목", "금", "토"];

    function render() {
      var y = view.getFullYear(), m = view.getMonth();
      title.textContent = y + "년 " + (m + 1) + "월";
      grid.innerHTML = "";
      dows.forEach(function (d) {
        var el = document.createElement("div");
        el.className = "dow";
        el.textContent = d;
        grid.appendChild(el);
      });
      var first = new Date(y, m, 1).getDay();
      var days = new Date(y, m + 1, 0).getDate();
      for (var i = 0; i < first; i++) grid.appendChild(document.createElement("div"));
      for (var d = 1; d <= days; d++) {
        var date = new Date(y, m, d);
        var past = date <= today;
        var el = document.createElement(past ? "div" : "a");
        el.className = "d" + (past ? " past" : "");
        el.innerHTML = d + "<small>" + (past ? "-" : "문의") + "</small>";
        if (!past) {
          el.href = KAKAO_URL || "#contact";
          if (KAKAO_URL) { el.target = "_blank"; el.rel = "noopener"; }
          el.setAttribute("aria-label", (m + 1) + "월 " + d + "일 문의하기");
        }
        grid.appendChild(el);
      }
      document.getElementById("cal-prev").disabled =
        y === today.getFullYear() && m === today.getMonth();
    }
    document.getElementById("cal-prev").addEventListener("click", function () {
      view.setMonth(view.getMonth() - 1); render();
    });
    document.getElementById("cal-next").addEventListener("click", function () {
      view.setMonth(view.getMonth() + 1); render();
    });
    render();
  }

  // 자주 묻는 질문 검색 (FAQ 기반 안내)
  var form = document.getElementById("ask-form");
  if (form) {
    var input = document.getElementById("ask-input");
    var text = document.getElementById("answer-text");
    var src = document.getElementById("answer-src");
    var faq = [
      { k: ["케라마", "가격", "얼마", "요금"], a: "케라마 제도 펀다이빙은 보트 다이빙 3회 기준 1인 ¥28,000입니다. 예약금은 1인 ¥20,000이며 총 금액에 포함됩니다. 나하 국제거리 주변 숙소에 묵으시면 숙소 앞 픽업·드롭이 가능합니다.", s: [["케라마 펀다이빙", "fun-diving-kerama.html"], ["예약 & 예약금 FAQ", "faq.html"]] },
      { k: ["예약금", "결제", "잔금", "square"], a: "예약금은 1인당 ¥20,000입니다(펀다이빙·코스 공통). Square 결제 링크로 카드 결제하며, 잔금은 다이빙 당일에 결제합니다.", s: [["예약 & 예약금 FAQ", "faq.html"]] },
      { k: ["픽업", "숙소", "호텔", "국제거리"], a: "나하시 국제거리 주변 숙소 앞에서 픽업·드롭합니다. 장비 세척을 위해 욕조가 있는 개인실 숙소를 추천합니다.", s: [["픽업 & 추천 숙소", "stays.html"]] },
      { k: ["날씨", "기상", "취소", "환불"], a: "기상 또는 해상 상태 악화로 투어가 취소되는 경우 예약금은 전액 환불됩니다. 게스트 사정에 의한 취소는 투어 14일 전부터 예약금이 환불되지 않으며, 전날 또는 당일 취소 시 투어 요금 전액이 청구됩니다.", s: [["환불 정책", "cancellation-policy.html"], ["FAQ", "faq.html"]] },
      { k: ["렌탈", "장비", "대여"], a: "장비 렌탈은 기본 렌탈 ¥4,000, 풀 렌탈 ¥5,000입니다. 2일차부터는 각각 ¥3,000, ¥3,500입니다.", s: [["FAQ", "faq.html"]] },
      { k: ["오픈워터", "초보", "레벨", "자격"], a: "오픈워터 이상이면 케라마 펀다이빙에 참가할 수 있습니다. 레벨에 맞는 보트와 포인트를 선택해 진행합니다.", s: [["케라마 펀다이빙", "fun-diving-kerama.html"]] },
      { k: ["사진"], a: "수중 사진은 요금에 포함되어 있습니다. 안전에 지장이 없는 범위에서 강사가 직접 촬영합니다.", s: [["FAQ", "faq.html"]] },
      { k: ["프리다이빙", "팀", "단체"], a: "프리다이빙은 4인 이상 단체만 접수하며, 사전 상담이 필요합니다. 카카오톡으로 문의 바랍니다.", s: [["프리다이빙", "freediving.html"]] },
      { k: ["겨울", "수온", "시즌"], a: "오키나와는 연중 다이빙이 가능합니다. 겨울철에는 보트코트와 추가 웻슈트 등 방한 장비를 무료로 제공합니다.", s: [["FAQ", "faq.html"]] },
      { k: ["코스", "padi", "자격증"], a: "PADI 오픈워터 코스는 ¥65,000부터이며, 전 과정을 한국어로 진행합니다.", s: [["PADI 코스", "padi-courses.html"]] }
    ];
    function answer(q) {
      var ql = q.toLowerCase();
      var hit = faq.find(function (f) { return f.k.some(function (k) { return ql.indexOf(k) !== -1; }); });
      src.innerHTML = "출처 ";
      if (hit) {
        text.textContent = hit.a;
        hit.s.forEach(function (s) {
          var a = document.createElement("a");
          a.href = s[1]; a.textContent = s[0] + " →";
          src.appendChild(a);
        });
      } else {
        text.textContent = "해당 내용은 강사가 직접 답변드리는 것이 정확합니다. 아래 카카오톡 상담으로 문의 바랍니다.";
        src.innerHTML = "";
      }
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value.trim()) answer(input.value.trim());
    });
    document.querySelectorAll("#ask-chips button").forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.textContent; answer(b.textContent); });
    });
  }
})();
