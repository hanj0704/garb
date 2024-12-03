/************************************************
 * tester.js
 * Created at 2024. 12. 2. 오전 10:13:59.
 *
 * @author HAN
 ************************************************/

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
//	button.
//	console.log(button);
//	button.htmlAttr("temp-id", button.uuid);
	var loader = new cpr.core.ResourceLoader();
	
	loader.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js")
	.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Observer.min.js")
	.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js")
	.addScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js")
	.load(function(error) {
		//		gsap.kill();
		
		gsap.registerPlugin(ScrollTrigger);
		
		let sections = document.querySelectorAll(".section"),
			images = document.querySelectorAll(".bg")
			headings = gsap.utils.toArray(".heading"),
			outerWrappers = gsap.utils.toArray(".outer"),
			innerWrappers = gsap.utils.toArray(".inner"),
			splitHeadings = headings.map(heading => new SplitText(heading, {
				type: "chars,words,lines",
				linesClass: "clip-text"
			})),
			currentIndex = -1,
			wrap = gsap.utils.wrap(0, sections.length),
			animating = false;
		gsap.set(outerWrappers, {
			yPercent: 100
		});
		gsap.set(innerWrappers, {
			yPercent: -100
		});
		function gotoSection(index, direction) {
			index = wrap(index); // make sure it's valid
			animating = true;
			let fromTop = direction === -1,
				dFactor = fromTop ? -1 : 1,
				tl = gsap.timeline({
					defaults: {
						duration: 1.25,
						ease: "power1.inOut"
					},
					onComplete: () => animating = false
				});
			if (currentIndex >= 0) {
				// The first time this function runs, current is -1
				gsap.set(sections[currentIndex], {
					zIndex: 0
				});
				tl.to(images[currentIndex], {
						yPercent: -15 * dFactor
					})
					.set(sections[currentIndex], {
						autoAlpha: 0
					});
			}
			gsap.set(sections[index], {
				autoAlpha: 1,
				zIndex: 1
			});
//			console.log("dFactor",dFactor);
			tl.fromTo([outerWrappers[index], innerWrappers[index]], {
//					yPercent: i => i ? -100 * dFactor : 100 * dFactor
					yPercent: function(i){
//						console.log(i);
						return i ? -100 * dFactor : 100 * dFactor
					}
				}, {
					yPercent: 0
				}, 0)
				.fromTo(images[index], {
					yPercent: 15 * dFactor
				}, {
					yPercent: 0
				}, 0)
				.fromTo(splitHeadings[index].chars, {
					autoAlpha: 0,
					yPercent: 150 * dFactor
				}, {
					autoAlpha: 1,
					yPercent: 0,
					duration: 1,
					ease: "power2",
					stagger: {
						each: 0.02,
						from: "random"
					}
				}, 0.2);
			
			currentIndex = index;
		}
		
//		Observer.create({
//			type: "wheel,touch,pointer",
//			wheelSpeed: -1,
//			onDown: () => !animating && gotoSection(currentIndex - 1, -1),
//			onUp: () => !animating && gotoSection(currentIndex + 1, 1),
//			tolerance: 10,
//			preventDefault: true
//		});
		ScrollTrigger.observe({
			type:"wheel,touch",
			onDown: () => !animating && gotoSection(currentIndex - 1, -1),
			onUp: () => !animating && gotoSection(currentIndex+1,1),
			tolerance : 10,
			preventDefault:true,
			wheelSpeed : -1
		});
		
		gotoSection(0, 1);
		
	})
}

/*
 * "Button" 버튼에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onButtonMeasureSize(e){
	var button = e.control;
	console.log("MEASURE_SIZE");
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	
	console.log(button._htmlElements);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	onButtonClick()
}
