/*********** 검색창 돋보기 아이콘 눌러도 검색창이 켜지도록 구성하기 **************/
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus(); // 검색 부분에 focus
});

/************************** 검색창에 통합검색 힌트 추가 *************************/
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
  // placeholder 인풋요소에 추가할 수 있는 html 속성 = input 요소에 입력되있을 힌트 부분 내용 = '통합검색'
  // setAttribute(속성, 속성의 value)
});

searchInputEl.addEventListener('blur', function () {
  // blur = focus 가 해제된 상태가 되면
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

/************************** 년도 자동 초기화 ******************************/
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear(); // textContent 속성 : 그 요소가 가지고 있는 글자 내용들을 알아내거나 값을 지정
// Date 객체에서 현재 날짜를 뽑아낼 때 Date 객체를 생성자 함수로 실행해서
// 그 안에 들어있는 getFullYear 메소드를 실행해주면 현재 년도의 정보를 숫자 데이터로 반환