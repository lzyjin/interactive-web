// 전역변수가 여러개 필요한데, 전역변수 사용을 피하기 위해서는 즉시실행함수안에서 선언하는게 좋다
(function() {
	// 스크롤하면 앞으로 나아가는 느낌 주기
	// 방법: 스크롤값에 따라 .house를 z축으로 이동시키기

	const houseElem = document.querySelector('.house');

	let maxScrollValue = document.body.offsetHeight - window.innerHeight;

	// window의 사이즈가 바뀔때마다 원하는대로 보이게 하기 위해서
	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight
	}

	window.addEventListener('scroll', function() {

		// window의 스크롤값 파악: window.pageYOffset
		// console.log(window.pageYOffset);

		// 우리가 스크롤하는 길이는 사실 문서(body)의 높이 - 스크롤바의 길이(브라우저의 높이)이다
		// 즉 document.body.offsetHeight - window.innerHeight
		// 스크롤할 수 있는 최대값을 이 값으로 설정해야한다

		// let maxScrollValue = document.body.offsetHeight - window.innerHeight;
		// console.log(maxScrollValue);

		// 얼마나 스크롤 했는지 비율 구하기
		// console.log(window.pageYOffset / maxScrollValue);

		// const zMove = window.pageYOffset / maxScrollValue * 1000;

		// .house를 처음에 translateZ(-490vw)으로 세팅해줬기 때문에 빼줘서 거기부터 시작하게끔
		// const zMove = window.pageYOffset / maxScrollValue * 1000 - 490;

		// 스크롤이 마지막에 다다랐을 때도 3d효과가 보였으면 좋겠어서 스크롤값을 조금 줄임
		const zMove = window.pageYOffset / maxScrollValue * 970 - 490;

		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
	// }, false);

	});

	window.addEventListener('resize', resizeHandler);
})();