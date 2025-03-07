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
  
  // 슬라이더 초기화
  showSlides(1);
  
  // 자동 슬라이드 타이머 시작
  startSlideTimer();
});

// 현재 슬라이드 인덱스
let slideIndex = 1;
// 자동 슬라이드 타이머
let slideTimer;
// 슬라이드 간격 (밀리초)
const slideInterval = 5000;
// 슬라이드 전환 중인지 표시하는 플래그
let isChanging = false;

// 슬라이드 타이머 시작 함수
function startSlideTimer() {
  // 기존 타이머가 있으면 제거
  clearInterval(slideTimer);
  
  // 새 타이머 설정
  slideTimer = setInterval(function() {
    if (!isChanging) {
      changeSlide(1);
    }
  }, slideInterval);
}

// 슬라이드 이동 (사용자가 수동으로 전환할 때)
function changeSlide(n) {
  // 이미 전환 중이면 무시
  if (isChanging) return;
  
  // 타이머 재설정
  startSlideTimer();
  
  // 슬라이드 표시
  showSlides(slideIndex + n);
}

// 특정 슬라이드로 이동 (도트 클릭 시)
function currentSlide(n) {
  // 이미 전환 중이면 무시
  if (isChanging) return;
  
  // 타이머 재설정
  startSlideTimer();
  
  // 슬라이드 표시
  showSlides(n);
}

// 슬라이드 표시
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  
  // 전환 중 플래그 설정
  isChanging = true;
  
  // 슬라이드 범위 체크
  if (n > slides.length) {
    n = 1;
  }
  if (n < 1) {
    n = slides.length;
  }
  
  // 현재 활성화된 슬라이드
  let currentSlide = null;
  for (i = 0; i < slides.length; i++) {
    if (slides[i].style.display === "block" || slides[i].classList.contains("active")) {
      currentSlide = slides[i];
      break;
    }
  }
  
  // 페이드 아웃 효과
  if (currentSlide && currentSlide !== slides[n-1]) {
    currentSlide.classList.add("fade-out");
    
    // 페이드 아웃 완료 후 다음 슬라이드 표시
    setTimeout(function() {
      // 모든 슬라이드 숨김
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
        slides[i].classList.remove("fade-out");
      }
      
      // 모든 도트 비활성화
      for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
      
      // 새 슬라이드와 도트 활성화
      slides[n-1].style.display = "block";
      slides[n-1].classList.add("active");
      slides[n-1].classList.add("fade");
      dots[n-1].classList.add("active");
      
      // 페이드 인 효과가 완료된 후 플래그 해제
      setTimeout(function() {
        isChanging = false;
        slideIndex = n;
      }, 1000); // 페이드 인 완료 대기 시간
      
    }, 1000); // 페이드 아웃 완료 대기 시간
  } else {
    // 첫 로드 시나 같은 슬라이드인 경우 바로 표시
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("active");
    }
    
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    
    slides[n-1].style.display = "block";
    slides[n-1].classList.add("active");
    slides[n-1].classList.add("fade");
    dots[n-1].classList.add("active");
    
    // 페이드 인 효과가 완료된 후 플래그 해제
    setTimeout(function() {
      isChanging = false;
      slideIndex = n;
    }, 1000);
  }
}

// 모달 기능 추가
document.addEventListener("DOMContentLoaded", function() {
  // 기존 코드는 그대로 두고 아래 모달 관련 코드 추가

  // 메뉴 아이템 클릭 이벤트 추가
  const menuItems = document.querySelectorAll('.menu-item');
  
  // 모달 요소 생성
  const modal = document.createElement('div');
  modal.className = 'menu-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modal-title"></h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-image">
          <img id="modal-img" src="" alt="">
        </div>
        <div class="modal-details">
          <div class="menu-item-price" id="modal-price"></div>
          <div class="modal-description" id="modal-desc"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // 모달 닫기 버튼 이벤트
  const closeModal = modal.querySelector('.close-modal');
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 스크롤 다시 활성화
  });

  // 모달 외부 클릭 시 닫기
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // 스크롤 다시 활성화
    }
  });

  // 각 메뉴 아이템에 클릭 이벤트 추가
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // 모달에 데이터 채우기
      const title = this.querySelector('h3').textContent;
      const img = this.querySelector('img').src;
      const price = this.querySelector('.menu-item-price').textContent;
      const desc = this.querySelector('p').textContent;

      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-img').src = img;
      document.getElementById('modal-img').alt = title;
      document.getElementById('modal-price').textContent = price;
      document.getElementById('modal-desc').textContent = desc;

      // 모달 표시
      modal.style.display = 'block';
      modal.classList.add('modal-fade-in');
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    });

    // 메뉴 아이템에 클릭 가능함을 보여주는 커서 스타일 추가
    item.style.cursor = 'pointer';
  });
});