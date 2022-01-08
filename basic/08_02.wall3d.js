(function() {

	const houseElem = document.querySelector('.house');

  // 반복을 줄이기 위해 할당하지않고 선언만
	let maxScrollValue;

	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	window.addEventListener('scroll', function() {
		const zMove = window.pageYOffset / maxScrollValue * 970 - 490;
		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
	});

	window.addEventListener('resize', resizeHandler);

  // 문서가 로드되자마자 maxScrollValue를 초기화하기위해 함수 호출
  resizeHandler();

})();