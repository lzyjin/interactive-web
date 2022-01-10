function Character(info) {
	// this.으로 쓰는것은 Character() 생성자로 만들어낼 인스턴스 객체의 속성으로 쓰겠다는 뜻
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

	// 마우스 클릭한 x좌표에 일분이 캐릭터 생성
	this.mainElem.style.left = info.xPos + '%';
}