var browserInfo = cpr.utils.Util.detectBrowser();
var isIOS = browserInfo.name == "safari" && browserInfo.mobile;
var windowWidth = window.innerWidth;
var _offsetX = -1;
var _offsetY = -1;
var activePage = 1;
var transitionStarted = false;

var shadow = "none"; /* "0px 0px 20px rgba(0, 0, 0, 0.5)" */ ;

// 스와이프 가속도
var accelation = 0.7;

// 스와이프 인식 최소 거리.
var minimumDelta = 10;

// 스내핑 애니메이션의 길이.
var snapDuration = 0.2;

// 뒤로 가려졌을 때의 최소 불투명도.
var minOpacity = 0.5;

/*
 * 루트 컨테이너에서 touchstart 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
 */
function onBodyTouchstart(/* cpr.events.CTouchEvent */ e){
	var touch = e.touches.item(0);
	console.log(touch);	
	windowWidth = app.getContainer().getActualRect().width;
	app.getContainer().getLayout().animationDuration = 0;
	_offsetX = touch.pageX;
	_offsetY = touch.pageY;
	
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("touchend", onTouchEnd);

}


/**
 * 
 * @param {TouchEvent} e
 */
function onTouchMove(e) {
	var touch = e.touches.item(0);
	console.log("X : "+touch.pageX+"Y : "+touch.pageY);
//	handleSwipeDelta(touch.pageX, touch.pageY);
	e.stopPropagation();
	return false;
}
/**
 * 
 * @param {TouchEvent} e
 */
function onTouchEnd(e) {
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("touchend", onTouchEnd);
//	snap();

	app.getContainer().getChildren().filter(function( /* cpr.controls.UIControl */ each) {
		return each instanceof cpr.controls.EmbeddedApp;
	}).forEach(function( /* cpr.controls.EmbeddedApp */ each) {
		each.getEmbeddedAppInstance().getContainer().getLayout().scrollable = true;
	});
}
/**
 * 
 * @param {Number} currentX
 * @param {Number} currentY
 */
function handleSwipeDelta(currentX, currentY) {
	if (_offsetX === -1) {
		return false;
	}
	if (!transitionStarted && Math.abs(_offsetY - currentY) > 30) {
		_offsetX = -1;
		return false;
	}

	var delta = currentX - _offsetX;
	if (Math.abs(delta) < minimumDelta) {
		return false;
	}
	if (transitionStarted === false) {
		transitionStarted = true;
		if (isIOS) {
			app.getContainer().getChildren().filter(function( /* cpr.controls.UIControl */ each) {
				return each instanceof cpr.controls.EmbeddedApp;
			}).forEach(function( /* cpr.controls.EmbeddedApp */ each) {
				each.getEmbeddedAppInstance().getContainer().getLayout().scrollable = false;
			});
		}
	}
	if (Math.abs(delta) > windowWidth * accelation + minimumDelta) {
		if (delta > 0) {
			delta = windowWidth * accelation + minimumDelta;
		} else {
			delta = windowWidth * -accelation - minimumDelta;
		}
	};

	if (delta > 0) {
		delta -= minimumDelta;
	} else {
		delta += minimumDelta;
	}

	switch (activePage) {
		case 0:
			delta = Math.min(0, delta);
			break;

		case 2:
			delta = Math.max(0, delta);
			break;
	}
	
//	var left = app.lookup("leftApp");
//	var right = app.lookup("rightApp");
//	var center = app.lookup("centerApp");
//	var pages = [left, center, right];
//	var container = app.getContainer();
//	[left, right].forEach(function( /* cpr.controls.EmbeddedApp */ each) {
//		each.style.css("box-shadow", shadow);
//	});

//	switch (activePage) {
//		case 0:
//			left.style.css("transform", "translateX(" + (delta / accelation) + "px)");
//			center.style.css({
//				"transform": "translateX(" + (windowWidth * accelation + delta) + "px)",
//				"opacity": (Math.abs(delta / windowWidth / accelation) * (1.0 - minOpacity) + minOpacity).toString()
//			});
//			break;
//
//		case 1:
//			if (delta >= 0) {
//				left.visible = true;
//				left.style.css("transform", "translateX(" + (-windowWidth + delta / accelation) + "px)");
//				right.visible = false;
//			} else {
//				right.visible = true;
//				right.style.css("transform", "translateX(" + (windowWidth + delta / accelation) + "px)");
//				left.visible = false;
//			}
//
//			center.style.css({
//				"transform": "translateX(" + delta + "px)",
//				"opacity": ((1.0 - Math.abs(delta / windowWidth / accelation)) * (1.0 - minOpacity) + minOpacity).toString()
//			});
//
//			break;
//
//		case 2:
//			right.style.css("transform", "translateX(" + (delta / accelation) + "px)");
//			center.style.css({
//				"transform": "translateX(" + (-windowWidth * accelation + delta) + "px)",
//				"opacity": (Math.abs(delta / windowWidth / accelation) * (1.0 - minOpacity) + minOpacity).toString()
//			});
//
//			break;
//
//	}

	return true;

}