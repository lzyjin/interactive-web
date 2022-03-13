// 모든 애니메이션에 대한 정보를 담을 배열 만들기
(() => {

	let yOffset  = 0; // window.scrollY 대신 사용할 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된 (눈 앞에 보고 있는) 씬(scroll-section)
	let enterNewScene = false; // 새로운 scene이 시작된 순간 true가 됌

	const sceneInfo = [
	{
		// 0
		type: 'sticky', // 고정되는 타입
		// 고정값으로 하면 브라우저(기기) 높이에 따라 유동적으로 할 수가 없다. 
		heightNum: 5, // 브라우저 높이의 5배로 scrollHeight를 세팅할 것
		scrollHeight: 0,
		objs: {
			container: document.querySelector('#scroll-section-0'),
			messageA: document.querySelector('#scroll-section-0 .main-message.a'),
			messageB: document.querySelector('#scroll-section-0 .main-message.b'),
			messageC: document.querySelector('#scroll-section-0 .main-message.c'),
			messageD: document.querySelector('#scroll-section-0 .main-message.d'),
		},
		values: {
			messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
			messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
			messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
			messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
			messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
			messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
			messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
			messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
			messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
			messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
			messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
			messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
			messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
			messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
			messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
			messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
		}
	},
	{
		// 1
		type: 'normal', // 일반적인 스크롤되는 타입
		// heightNum: 5, // type normal에서는 필요 없음
		scrollHeight: 0,
		objs: {
			container: document.querySelector('#scroll-section-1'),
			content: document.querySelector('#scroll-section-1 .description')
		}
	},
	{ 
		// 2
		type: 'sticky',
		heightNum: 5, 
		scrollHeight: 0,
		objs: {
			container: document.querySelector('#scroll-section-2'),
			messageA: document.querySelector('#scroll-section-2 .a'),
			messageB: document.querySelector('#scroll-section-2 .b'),
			messageC: document.querySelector('#scroll-section-2 .c'),
			pinB: document.querySelector('#scroll-section-2 .b .pin'),
			pinC: document.querySelector('#scroll-section-2 .c .pin')
		},
		values: {
			messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
			messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
			messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
			messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
			messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
			messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
			messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
			messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
			messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
			messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
			messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
			messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
			pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
			pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
			pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
			pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
			pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
			pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
		}
	},
	{
		// 3
		type: 'sticky',
		heightNum: 5,
		scrollHeight: 0,
		objs: {
			container: document.querySelector('#scroll-section-3'),
			canvasCaption: document.querySelector('.canvas-caption')
		}
	}
	];

	const setLayout = function() {
		
		// 각 스크롤 섹션의 높이 세팅
		for(let i=0; i < sceneInfo.length; i++) {
			if( sceneInfo[i].type === 'sticky' ) {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if( sceneInfo[i].type === 'normal' ) {
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
			}

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
		enterNewScene = false;

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
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		if( yOffset < prevScrollHeight ) {
			enterNewScene = true;
			// 브라우저 바운스 효과로 인해 현재 스크롤값(window.scrollY)가 마이너스값이 되는 것을 방지(safari)
			if(currentScene === 0) {
			return;
			}
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		// console.log(currentScene); // 스크롤해보면 currentScene이 바뀌는 시점이 딱 맞는게 아니라 살짝 오차가 있는데 그 이유는 영역을 차지하고 있는 header때문에 -> header를 position static이 아닌 걸로 바꿔주자

		// document.body.setAttribute('id', `show-scene-${currentScene}`);

		// playAnimation();
		if(enterNewScene) {
			return; // 현재 함수 종료시킴
		}
		playAnimation();
	};

	const calcValues = function(values, currentYOffset) { // currentYOffset: 현재 씬에서 얼마나 스크롤 되었는지
		let rv;
		// returnValue 현재 씬에서 스크롤된 범위를 비율로 구하기
		const scrollHight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHight;

		// rv = parseInt(scrollRatio * 100)
		// rv = parseInt(scrollRatio * (values[1] - values[0]) + values[0]);
		// rv = scrollRatio * (values[1] - values[0]) + values[0];

		if(values.length === 3) {
			// start ~ end 사이에 애니메이션 실행 
			const partScrollStart = values[2].start * scrollHight;
			const partScrollEnd = values[2].end * scrollHight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			// 씬안의 특정 범위에서 스크롤할때 특정문구가 애니메이션되도록 범위를 세팅
			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ) {
				rv =  (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if(currentYOffset < partScrollStart) {
				rv = values[0];
			} else if(currentYOffset > partScrollEnd) {
				rv = values[1]
			}
			
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	};

	const playAnimation = function() {

		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight; // 현재 씬에서의 스크롤위치
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset/ scrollHeight;

		switch(currentScene) {
			case 0:
				if(scrollRatio <= 0.22) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}
				if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
			} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
			}

			if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
			} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
			}

			if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
			} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
			}
			break;
			case 2:
				// console.log('2 play');
				if (scrollRatio <= 0.25) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
			} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
			}

			if (scrollRatio <= 0.57) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
			} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
			}

			if (scrollRatio <= 0.83) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
			} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
			}
			break;
			case 3:
				// console.log('3 play');
			break;
		}
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