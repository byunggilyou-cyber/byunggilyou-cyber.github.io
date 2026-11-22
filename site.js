// ===== 설정 =====
// 카카오톡 채널 링크를 받으면 아래 따옴표 안에 넣는다. (예: "https://pf.kakao.com/_xxxx/chat")
const KAKAO_URL = "";

(function () {
  if (KAKAO_URL) {
    document.querySelectorAll(".js-kakao").forEach(function (a) {
      a.href = KAKAO_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
