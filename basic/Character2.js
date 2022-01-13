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

  // 모든 일분이 인스턴스들이 공통적으로 갖는 메소드라서 프로토타입으로 뺀다
  this.init();
}


// 두 방법 모두 알아두자
// 1. 원래 있던 프로토타입 객체에 매소드를 추가하는 형태
// Character.prototype.xxxx  = function() {};

// 2. 프로토타입 객체 재정의
Character.prototype = {
  constructor: Character,
  init: function() {
    // 해결방법: 이벤트리스너 밖에서 캐릭터의 this를 변수에 담아서 이 변수를 사용하는 것
    // console.log(this); // Character
    const self = this;

    window.addEventListener('scroll', function() {
      // 정상적으로 실행 안됌
      // 왜냐?
      // this가 이벤트가 발생한 객체인 window를 가르키고 있기 때문
      // console.log(this); // this

      // this.mainElem.classList.add('running');
      self.mainElem.classList.add('running');
    });
  }
};