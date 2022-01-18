function Character(info) {
	// this.으로 쓰는것은 Character() 생성자로 만들어낼 인스턴스 객체의 속성으로 쓰겠다는 뜻
	this.mainElem = document.createElement('div');
	// this.mainElem.classList.add('character', 'running');
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

	// 마우스 클릭한 x좌표에 일분이 캐릭터 생성
	this.mainElem.style.left = info.xPos + '%';

  // 스크롤 중인지 아닌지 체크
  this.scrollState = false;

  // 모든 일분이 인스턴스들이 공통적으로 갖는 메소드라서 프로토타입으로 뺀다
  this.init();
}

// 프로토타입 객체 재정의
Character.prototype = {
  constructor: Character,
  init: function() {
    const self = this;
    window.addEventListener('scroll', function() {
      // 스크롤을 할때마다 하자마자 바로 clear 
      // 이렇게 코드를 쓰는 이유: 스크롤하는 동안 class 추가를 딱 한번 하게 = 효율적이게
      clearTimeout(self.scrollState);

      // 스크롤 하는 동안 self.scrollState는 숫자값이여서 !self.scrollState는 false 
      // 즉 이 조건문은 스크롤 제일 처음 딱 한번만 실행됌
      // 처음에 self.scrollState는 false니까 !self.scrollState는 true가 돼서
      if( !self.scrollState ) {
        self.mainElem.classList.add('running');
        console.log('running 클래스 붙었음');
      }

      // 스크롤을 계속하는 동안은 이 setTimeout은 실행되지 않는다
      // 얘는 적어도 0.5초가 지나서야 실행되는 애니까
      // 스크롤하는동안은 0.5초가 지나기 전에 clearTimeout을 계속 해서 얘를 취소시킨다
      // 스크롤이 멈추고나서야 이게 실행됌 
      // 제일 마지막에 class를 remove함 
      // add와 remove가 딱 한번씩 
      self.scrollState = setTimeout( function() {
        self.scrollState = false;
        self.mainElem.classList.remove('running');
      }, 500 );
      // console.log(self.scrollState); // setTimeout()함수는 숫자를 반환함
      // console.log( !self.scrollState ); // self.scrollState이 숫자이면(값이 있으면) !self.scrollState는 false 
    });
  }
};