/************************************************
 * tester.js
 * Created at 2024. 5. 8. 오전 9:41:53.
 *
 * @author HANS
 ************************************************/

var slider = cpr.core.Module.require("202405/new_swipe");
var slide2 = cpr.core.Module.require("202210/Slidify");
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("sms1").send();
}


function q(){
	
	function w(){
		
	}
}
/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
//	cpr.core.ResourceLoader.loadScript("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js").then(function(input){
//		cpr.core.ResourceLoader.loadCSS("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css").then(function(input){
//			
//			console.log(Swiper);
//			var swiper = new Swiper(".uuid-"+app.lookup("grp1").uuid, {});
//			
//		});
//	});
	
//	console.log(app.lookup("grp1").uuid);
	let slide = slider.slidify(app.lookup("grp1"),{
		useInfiniteScroll: true,
		showCount: 1,
		acceptScreen: "default"
	});
	slide.start();
	
//	let slide22 = slide2.slidify(app.lookup("grp1"));
//	slide22.useInfiniteScroll = true;
//	slide22.showCount = 1;
//	
//	slide22.start();
}

/*
 * 루트 컨테이너에서 touchstart 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
 */
function onBodyTouchstart(event){
//    const swiper = this;	
//    let e = event;
//    if (e.originalEvent) e = e.originalEvent;
//    const data = swiper.touchEventsData;
//    if (e.type === 'pointerdown') {
//      if (data.pointerId !== null && data.pointerId !== e.pointerId) {
//        return;
//      }
//      data.pointerId = e.pointerId;
//    } else if (e.type === 'touchstart' && e.targetTouches.length === 1) {
//      data.touchId = e.targetTouches[0].identifier;
//    }
//    if (e.type === 'touchstart') {
//      // don't proceed touch event
////      preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
//      return;
//    }
//    const params = swiper.params;
//    const touches = swiper.touches;
//    const enabled = swiper.enabled;
////    const {
////      params,
////      touches,
////      enabled
////    } = swiper;
//    if (!enabled) return;
//    if (!params.simulateTouch && e.pointerType === 'mouse') return;
//    if (swiper.animating && params.preventInteractionOnTransition) {
//      return;
//    }
//    if (!swiper.animating && params.cssMode && params.loop) {
//      swiper.loopFix();
//    }
//    let targetEl = e.target;
//    if (params.touchEventsTarget === 'wrapper') {
//      if (!swiper.wrapperEl.contains(targetEl)) return;
//    }
//    if ('which' in e && e.which === 3) return;
//    if ('button' in e && e.button > 0) return;
//    if (data.isTouched && data.isMoved) return;
//
//    // change target el for shadow root component
//    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
//    // eslint-disable-next-line
//    const eventPath = e.composedPath ? e.composedPath() : e.path;
//    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
//      targetEl = eventPath[0];
//    }
//    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
//    const isTargetShadow = !!(e.target && e.target.shadowRoot);
//
//    // use closestElement for shadow root element to get the actual closest for nested shadow root element
//    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
//      swiper.allowClick = true;
//      return;
//    }
//    if (params.swipeHandler) {
//      if (!targetEl.closest(params.swipeHandler)) return;
//    }
//    touches.currentX = e.pageX;
//    touches.currentY = e.pageY;
//    const startX = touches.currentX;
//    const startY = touches.currentY;
//
//    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore
//
//    if (!preventEdgeSwipe(swiper, e, startX)) {
//      return;
//    }
//    Object.assign(data, {
//      isTouched: true,
//      isMoved: false,
//      allowTouchCallbacks: true,
//      isScrolling: undefined,
//      startMoving: undefined
//    });
//    touches.startX = startX;
//    touches.startY = startY;
//    data.touchStartTime = now();
//    swiper.allowClick = true;
//    swiper.updateSize();
//    swiper.swipeDirection = undefined;
//    if (params.threshold > 0) data.allowThresholdMove = false;
//    let preventDefault = true;
//    if (targetEl.matches(data.focusableElements)) {
//      preventDefault = false;
//      if (targetEl.nodeName === 'SELECT') {
//        data.isTouched = false;
//      }
//    }
//    if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) {
//      document.activeElement.blur();
//    }
//    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
//    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
//      e.preventDefault();
//    }
//    if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
//      swiper.freeMode.onTouchStart();
//    }
//    swiper.emit('touchStart', e);
}

/*
 * "1" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(e){
	var btn9 = e.control;
	let id = "qeqe";
	let div = document.createElement("div");
		div.setAttribute("class", "testDiv2");
		let check = document.createElement("input");
		
		var idind = Number(id.slice(-1));
		check.checked = true;
		
		check.type = "checkbox";
		check.id = id;
		
		let label = document.createElement("label");
		label.setAttribute("for", id);
		let label2 = document.createElement("label");
		label2.innerHTML = id;
		label2.style.display = "inline-block";					
		label2.style.width = "100%";
		label2.style.textAlign = "center";
		label2.style.fontWeight = "1000";
		label2.style.fontSize = "20px";
		div.appendChild(label2);
		div.appendChild(check);
		div.appendChild(label);
		
		div.style.top = 100+"px"
		div.style.left = 100+"px"
		div.style.width = "70px";//60
		div.style.height = "35px";//30
		div.style.position = "absolute";
		//document.getElementById("diagramCore_canvas").appendChild(div);
		document.body.appendChild(div);
}
