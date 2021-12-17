/************************************************
 * Main.js
 * Created at 2021. 3. 10. 오전 9:24:44.
 *
 * @author HANS
 ************************************************/

var isMobile = cpr.utils.Util.detectBrowser();
var startMovement = 0;
function onMouseMove(e){
}

function onTouchMove(e){
	var mdi1 = app.lookup("mdi1");
	var sel = mdi1.getSelectedTabItem().itemIndex;
	var delta = e.touches[0];
	var move = delta.clientX;
	if(Math.abs(startMovement - move) > 10) {
		
		if (startMovement - move < 0 && sel > 0){//왼쪽
			var item = mdi1.getTabItems()[sel-1];
			if(app.getFloatingControls().length < 1){
			var	movv = item.content;
			console.log("한번만이라도~");
			app.floatControl(movv,{
				"left": -1*mdi1.getActualRect().width+"px",
				"top" : "45px",
				"width" : mdi1.getActualRect().width+"px",
				"bottom" : "0px"
			});
			
			} else {
				console.log("zz");
				var ri = app.getFloatingControls()[0];
				console.log(ri);
				if (Math.abs(startMovement - move) > 100) {
					window.removeEventListener("touchmove", onTouchMove);
//					
					ri.style.animateFrom({
						"transform": "translate3d(-270px,0px,0px)"
					});
					app.floatControl(ri, {
						"left" :"0px",
						"top" : "45px",
						"width" : mdi1.getActualRect().width+"px",
						"bottom" : "45px"
					});
					ri.addEventListenerOnce("transitionend", function(e){
						console.log("ㅋㅋ!!");
						mdi1.setSelectedTabItem(item);
						item.content = ri;
					});
				} else {
					console.log(mdi1.getActualRect().right - (startMovement - move));
				app.floatControl(ri, {
					"left" : -1*mdi1.getActualRect().right - (startMovement - move) +"px",
					"top" : "45px",
				"width" : mdi1.getActualRect().width+"px",
				"bottom" : "45px"
				});
				}
			}
		}
		else if(startMovement - move > 0 && sel < mdi1.getTabItems().length -1) {
			
			var item = mdi1.getTabItems()[sel+1];
			if(app.getFloatingControls().length < 1){
			var	movv = item.content;
			console.log("한번만이라도~");
			app.floatControl(movv,{
				"left": mdi1.getActualRect().width+"px",
				"top" : "45px",
				"width" : mdi1.getActualRect().width+"px",
				"bottom" : "0px"
			});
			
			} else {
				var ri = app.getFloatingControls()[0];
				if (startMovement - move > 100) {
					window.removeEventListener("touchmove", onTouchMove);
//					
					ri.style.animateFrom({
						"transform": "translate3d(270px,0px,0px)"
					});
					app.floatControl(ri, {
						"left" :"0px",
						"top" : "45px",
						"width" : mdi1.getActualRect().width+"px",
						"bottom" : "45px"
					});
					ri.addEventListenerOnce("transitionend", function(e){
						console.log("ㅋㅋ!!");
						mdi1.setSelectedTabItem(item);
						item.content = ri;
					});
				} else {
					console.log(mdi1.getActualRect().right - (startMovement - move));
				app.floatControl(ri, {
					"left" : mdi1.getActualRect().right - (startMovement - move) +"px",
					"top" : "45px",
				"width" : mdi1.getActualRect().width+"px",
				"bottom" : "45px"
				});
				}
			}
		}
	} 
}

function onTouchEnd(e){
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("touchend", onTouchEnd);			
				
}
/*
 * MDI 폴더에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onMdi1Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	mdi1.addEventListener("mousemove", onMouseMove);
	mdi1.addEventListenerOnce("mouseup", function(e){
		
		mdi1.removeEventListener("mousemove",onMouseMove);
	});
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	console.log(isMobile.mobile);
	
	var mdi1 = app.lookup("mdi1");
	remodeling(mdi1);
//	if(isMobile.mobile) {
//		mdi1.addEventListener("touchstart", function(e){
//			startMovement = e.touches[0].clientX;
//			window.addEventListener("touchmove", onTouchMove);
//			
//			window.addEventListener("touchend", function(ev){
//				window.removeEventListener("touchmove", onTouchMove);
//			});
//		});	
//	}
	
}
