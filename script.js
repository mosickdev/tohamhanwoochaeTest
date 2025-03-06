document.addEventListener("DOMContentLoaded", function () {
  // 햄버거 메뉴 기능
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation(); // 이벤트 버블링 방지
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("active");
  });

  // 네비게이션 링크 클릭 시 메뉴 닫기 (링크 이동은 방해하지 않음)
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navMenu.classList.remove("active");
      // 링크의 기본 동작(페이지 이동)은 그대로 유지
    });
  });

  // 메뉴 외부 클릭 시 메뉴 닫기
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnHamburger &&
      navMenu.classList.contains("active")
    ) {
      hamburger.classList.remove("open");
      navMenu.classList.remove("active");
    }
  });
});
