
(function() {

	const houseElem = document.querySelector('.house');
  const stageElem = document.querySelector('.stage');
  const progressbarElem = document.querySelector('.progress-bar');
  const mousePos = {x: 0, y: 0};

  // 반복을 줄이기 위해 할당하지않고 선언만
	let maxScrollValue;

	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	window.addEventListener('scroll', function() {

    // 스크롤 무한 루프
    // if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //   window.scrollTo(0, 0);
    // }
    
    const scrollPer = window.pageYOffset / maxScrollValue;
    console.log(window.pageYOffset);
		const zMove = scrollPer * 970 - 490;
		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

    const progress = scrollPer * 100;
    progressbarElem.style.width = progress + '%';

	});

  // 시점이동
  window.addEventListener('mousemove', function(e) {
    // 마우스의 x좌표, y좌표
    // console.log(e.clientX, e.clientY);

    // 마우스가 정중앙에 있을 때는 stage가 회전 x
    // 중앙이 아닐때만 조금 각도가 바뀌도록
    // -> 정중앙에 왔을 때 0, 0이 되도록 값을 계산해서 쓰기 좋게 바꿔야함

    // e.clientX / this.window.innerWidth은 브라우저의 화면 너비에서 현재 마우스의 x위치의 비율 
    // -> 0에서 1사이의 값
    // 굉장히 자주 쓰는 계산식임
    mousePos.x = -1 + (e.clientX / this.window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / this.window.innerHeight) * 2;
    // console.log(mousePos);

    // house를 회전시키면 캐릭터들은 시점변경이 해당되지 않아서 부자연스러움
    // house와 캐릭터들을 감싸고 있는 stage를 회전시켜야함
    // stageElem.style.transform = 'rotateX(' + mousePos.y + 'deg) rotateY(' + mousePos.x + 'deg)';
    stageElem.style.transform = 'rotateX(' + (mousePos.y*5) + 'deg) rotateY(' + (mousePos.x  * 5) + 'deg)';
  });

	window.addEventListener('resize', resizeHandler);

  // 문서가 로드되자마자 maxScrollValue를 초기화하기위해 함수 호출
  resizeHandler();

})();