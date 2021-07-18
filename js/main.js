/*****배너 광고가 일정 부분 이상 스크롤 내리면 사라지도록 & 최상단으로 빠른 이동 버튼 *********/

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top')

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY); // 화면이 몇 픽셀에 위치해있는지 볼 수 있게
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' // opacity 는 '시각적으로만' 배너가 사라지는 것이지 실제로 사라지는 것이 아니기 때문에 display를 통해 실제로 사라지도록 만들어야함
    });
    // 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); // 300 = 0.3초
// _.throttle(함수, 시간)

// loadash 라이브러리의 _.throttle 메소드를 통해서 scroll 함수가 과사용되지 않게 0.3초마다 부하를 넣어서 제어

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0 // 화면의 위치를 0px 지점으로 옮겨주겠다 ( 0.7초동안 )
  });
});


/********************** 비주얼의 그림이 서서히 나타나도록 ***********************/

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // index 는 zero base 기 때문에 0 부터 시작되는 것을 +1 로 보완
    // 0.7, 1.4, 2.1, 2.7s
    opacity: 1
  });
});



/*******************************  공지사항 SWIPER  ********************************/

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 방향: '수직'
  autoplay: true,
  loop: true // 반복 재생하겠다
});
new Swiper('.promotion .swiper-container', {
  // 방향(direction): 수평(horizontal) 은 기본값이기 때문에 따로 명시할 필요가 없음
  slidesPerView: 3, // 하나의 화면에 몇 개의 슬라이드를 보여줄까? (기본값 1개)
  spaceBetween: 10, // 슬라이드 사이 여백 (10px)
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 // 5000 = 5초
  }, // true 로 자동재생만 해도 되지만, 객체 데이터 {} 를 할당하면 추가적인 옵션을 명시할 수 있다
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부 (=시각적으로 보는 것 뿐만이 아니라 클릭이 가능한지)
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


const promotionEl = document.querySelector('.promotion'); // .promotion 을 찾아서 promotionEl 변수에 할당
const promotionToggleBtn = document.querySelector('.toggle-promotion'); // .toggle-promotion 을 찾아서 promotionToggleBtn 변수에 할당
let isHidePromotion = false; // promotion 영역을 숨기는 기능이 현재 false 상태
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // click 하면 반댓값으로 반환시키도록하는 Logic
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide'); // css에 hide 클래스가 프로모션에 있는 경우에는 화면을 안보이도록 !
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide'); // hide값을 지운다
  }
});



// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size, // y축
      repeat: -1, // repeat(반복) : -1 (무한)
      yoyo: true, // 한 번 재생된 애니메이션을 다시 뒤로 재생하여 요요처럼 보이게 하는
      ease: Power1.easeInOut,
      delay: random(0, delay) // 몇 초 뒤에 다시 애니메이션을 실행하겠다 : 지연시간
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 내가 감시중인 뷰포트의 부분이 0.8할 지점에 도달하면 밑이 .setClassToggle 이라는 메소드가 실행된다
    })
    .setClassToggle(spyEl, 'show') // (toggle 할 요소, 요소의 이름0
    .addTo(new ScrollMagic.Controller());
});