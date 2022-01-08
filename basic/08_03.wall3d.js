
/*(function() {

	const houseElem = document.querySelector('.house');
  const progressbarElem = document.querySelector('.progress-bar');

  // 반복을 줄이기 위해 할당하지않고 선언만
	let maxScrollValue;

	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	window.addEventListener('scroll', function() {
    const scrollPer = window.pageYOffset / maxScrollValue;

		const zMove = scrollPer * 970 - 490;
		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

    const progress = scrollPer * 100;
    progressbarElem.style.width = progress + '%';
	});

	window.addEventListener('resize', resizeHandler);

  // 문서가 로드되자마자 maxScrollValue를 초기화하기위해 함수 호출
  resizeHandler();

})();
*/

(function() {

	const houseElem = document.querySelector('.house');
  const progressbarElem = document.querySelector('.progress-bar');

  // 반복을 줄이기 위해 할당하지않고 선언만
	let maxScrollValue;

	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	window.addEventListener('scroll', function() {

    // 스크롤 무한 루프
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // window.scrollY = 0;
      window.scrollTo(0, 0);
    }
    
    const scrollPer = window.pageYOffset / maxScrollValue;
    console.log(window.pageYOffset);
		const zMove = scrollPer * 970 - 490;
		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

    const progress = scrollPer * 100;
    progressbarElem.style.width = progress + '%';

	});

	window.addEventListener('resize', resizeHandler);

  // 문서가 로드되자마자 maxScrollValue를 초기화하기위해 함수 호출
  resizeHandler();

})();