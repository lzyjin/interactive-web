// 모든 애니메이션에 대한 정보를 담을 배열 만들기
(() => {

	let yOffset  = 0; // window.scrollY 대신 사용할 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된 (눈 앞에 보고 있는) 씬(scroll-section)

	const sceneInfo = [
	{
		// 0
		type: 'sticky', // 고정되는 타입
		// 고정값으로 하면 브라우저(기기) 높이에 따라 유동적으로 할 수가 없다. 
		heightNum: 5, // 브라우저 높이의 5배로 scrollHeight를 세팅할 것
		scrollHeight: 0,
		objs: {
		container: document.querySelector('#scroll-section-0')
		}
	},
	{
		// 1
		type: 'normal', // 일반적인 스크롤되는 타입
		heightNum: 5,
		scrollHeight: 0,
		objs: {
		container: document.querySelector('#scroll-section-1')
		}
	},
	{ 
		// 2
		type: 'sticky',
		heightNum: 5, 
		scrollHeight: 0,
		objs: {
		container: document.querySelector('#scroll-section-2')
		}
	},
	{
		// 3
		type: 'sticky',
		heightNum: 5,
		scrollHeight: 0,
		objs: {
		container: document.querySelector('#scroll-section-3')
		}
	}
	];

	const setLayout = function() {
		
		// 각 스크롤 섹션의 높이 세팅
		for(let i=0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}
		// console.log(sceneInfo);

		// 현재 스크롤위치에 맞춰서 currentScene 세팅
		// 이렇게 함으로써 scrollLoop에서 body에 id세팅해주는것을 currentScene이 바뀔때만 해주면 됌
		yOffset = window.scrollY;
		let totalScrollHeight = 0;
		for(let i=0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if(totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`); 
	};

	const scrollLoop = function() {
		// 현재 우리가 보고있는(애니메이션 요소를 활성화 시킬) 씬이 몇번째 scroll-section인지 판별 

		// prevScrollHeight = 0; // 스크롤 할때마다 자꾸 더해지므로 0으로 초기화
		// // 모든 씬의 scrollHeight의 합
		// for(let i=0; i < sceneInfo.length; i++) {
		//   prevScrollHeight += sceneInfo[i].scrollHeight;
		// }
		// console.log( prevScrollHeight );

		// 모든 씬의 scrollHeight의 합이 아니라, 현재 보고있는 씬과 그 이전의 씬들의 scrollHeight의 합이 필요하므로
		prevScrollHeight = 0;
		for(let i=0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		if( yOffset < prevScrollHeight ) {
			// 브라우저 바운스 효과로 인해 현재 스크롤값(window.scrollY)가 마이너스값이 되는 것을 방지(safari)
			if(currentScene === 0) {
			return;
			}
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		// console.log(currentScene); // 스크롤해보면 currentScene이 바뀌는 시점이 딱 맞는게 아니라 살짝 오차가 있는데 그 이유는 영역을 차지하고 있는 header때문에 -> header를 position static이 아닌 걸로 바꿔주자

		// document.body.setAttribute('id', `show-scene-${currentScene}`);
	};

	window.addEventListener('scroll', () => {
		yOffset = window.scrollY; // 현재 스크롤 값
		// console.log(window.scrollY);
		scrollLoop();
	});

	// window.addEventListener('DOMContentLoaded', setLayout); // 이 실행시점이 조금 더 빠름
	window.addEventListener('load', setLayout);
	window.addEventListener('resize', setLayout);

})();