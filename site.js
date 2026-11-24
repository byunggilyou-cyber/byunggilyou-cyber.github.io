// 모바일 메뉴 열고 닫기
(function () {
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
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
})();
