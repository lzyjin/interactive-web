function Character(info) {
	this.mainElem = document.createElement('div');
	this.mainElem.classList.add('character');
	this.mainElem.innerHTML = '' + 
		'<div class="character-face-con character-head">' +
			'<div class="character-face character-head-face face-front"></div>' +
			'<div class="character-face character-head-face face-back"></div>' +
		'</div>' +
		'<div class="character-face-con character-torso">' +
			'<div class="character-face character-torso-face face-front"></div>' +
			'<div class="character-face character-torso-face face-back"></div>' +
		'</div>' +
		'<div class="character-face-con character-arm character-arm-right">' +
			'<div class="character-face character-arm-face face-front"></div>' +
			'<div class="character-face character-arm-face face-back"></div>' +
		'</div>' +
		'<div class="character-face-con character-arm character-arm-left">' +
			'<div class="character-face character-arm-face face-front"></div>' +
			'<div class="character-face character-arm-face face-back"></div>' +
		'</div>' +
		'<div class="character-face-con character-leg character-leg-right">' +
			'<div class="character-face character-leg-face face-front"></div>' +
			'<div class="character-face character-leg-face face-back"></div>' +
		'</div>' +
		'<div class="character-face-con character-leg character-leg-left">' +
			'<div class="character-face character-leg-face face-front"></div>' +
			'<div class="character-face character-leg-face face-back"></div>' +
		'</div>' +
	'';
	document.querySelector('.stage').appendChild(this.mainElem);

	this.mainElem.style.left = info.xPos + '%';

  // 스크롤 중인지 아닌지
  this.scrollState = false;

  // 바로 이전 스크롤 위치
  this.lastScrollTop = 0;

  // running속도
  this.speed = 1;
  this.xPos = info.xPos;

  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function() {
    const self = this;
    window.addEventListener('scroll', function() {

      clearTimeout(self.scrollState);

      if( !self.scrollState ) {
        self.mainElem.classList.add('running');
        console.log('running 클래스 붙었음');
      }

      self.scrollState = setTimeout( function() {
        self.scrollState = false;
        self.mainElem.classList.remove('running');
      }, 500 );

      // console.log(`lastScrollTop: ${self.lastScrollTop}`);
      // console.log(`scrollY: ${scrollY}`);
      // 두 값은 미미한 차이일지언정 반드시 차이가 난다 

      // 이전 스크롤 위치와 현재 스크롤 위치를 비교
      if( scrollY > self.lastScrollTop ) {
        // 현재 스크롤 위치가 크다면 스크롤 내림 
        self.mainElem.setAttribute('data-direction', 'forward');
      } else {
        // 이전 스크롤 위치가 크다면 스크롤 올림
        self.mainElem.setAttribute('data-direction', 'backward');
      }
      self.lastScrollTop = scrollY;
    });
    
    window.addEventListener('keydown', function(e) {

      // console.log(e.key);
      if(e.key === 'ArrowLeft') {

        // 방향전환
        self.mainElem.setAttribute('data-direction', 'left');
        // 달림
        self.mainElem.classList.add('running');

        self.xPos -= self.speed;
        // self.xPos = self.xPos - self.speed;
        // 왼쪽으로 달리기 ( 현재 xposition값에서 speed를 뺀값을 재할당 -> left값이 점점 작아짐)
        self.mainElem.style.left = self.xPos + '%';

      } else if(e.key === 'ArrowRight') {

        self.mainElem.setAttribute('data-direction', 'right');
        self.mainElem.classList.add('running');
      }
    });
    window.addEventListener('keyup', function(e) {
      self.mainElem.classList.remove('running');
    });
  }
};