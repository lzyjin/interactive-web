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
  this.speed = info.speed;
  this.xPos = info.xPos;

  // 왼쪽인지 오른쪽인지
  this.direction;
  
  // 좌우 이동중인지 아닌지
  this.runningState = false;
  
  this.rafId;

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

      // 키 다운이 반복되지 않도록 처음 딱 1번만 실행됌
      if( self.runningState ) {
        return;
      }

      // console.log(e.key);
      if(e.key === 'ArrowLeft') {
        self.direction = 'left';
        self.mainElem.setAttribute('data-direction', 'left');
        self.mainElem.classList.add('running');
        self.run(self);
        // self.run();

        self.runningState = true;
      } else if(e.key === 'ArrowRight') {
        self.direction = 'right';
        self.mainElem.setAttribute('data-direction', 'right');
        self.mainElem.classList.add('running');
        self.run(self);
        // self.run();

        self.runningState = true;
      }
    });
    window.addEventListener('keyup', function(e) {
      self.mainElem.classList.remove('running');
      this.cancelAnimationFrame(self.rafId);
      // console.log(self.runningState);
      self.runningState = false;
    });
  },

  // 문제 : this가 character를 가리키다가 window를 가리키게 됌
  // 해결 방법 1 : 함수의 매개변수로 전달해서 this를 살리는 방법
  run: function(self) {
    // const self = this;

    if( self.direction == 'left' ) {
      self.xPos -= self.speed;
    } else if( self.direction = 'right' ) {
      self.xPos += self.speed;
    }
    
    // 좌우 이동할 때 벽을 넘어가지 않도록
    if( self.xPos < 2 ) {
      self.xPos = 2;
    }
    if( self.xPos > 88 ) {
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + '%';

    self.rafId = requestAnimationFrame(function() {
      self.run(self);
    });
  },

  // 해결 방법 2 : bind 메서드로 this를 직접 지정하기
  // run: function() {
  //   const self = this;

  //   if( self.direction == 'left' ) {
  //     self.xPos -= self.speed;
  //   } else if( self.direction = 'right' ) {
  //     self.xPos += self.speed;
  //   }
    
  //   if( self.xPos < 2 ) {
  //     self.xPos = 2;
  //   }
  //   if( self.xPos > 88 ) {
  //     self.xPos = 88;
  //   }

  //   self.mainElem.style.left = self.xPos + '%';

  //   self.rafId = requestAnimationFrame(self.run.bind(self));
  // },
};