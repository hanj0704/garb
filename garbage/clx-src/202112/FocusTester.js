/************************************************
 * FocusTester.js
 * Created at 2021. 12. 3. 오후 5:17:47.
 *
 * @author HANS
 ************************************************/

//window.addEventListener("focus", function(ev){
//	console.log("WINDOW FOCUS OCCURED");
//	console.log(ev);
//});
//
window.addEventListener("keydown", function(e){
console.log("KEYDOWN");
console.log(e.keyCode);	
});
window.addEventListener("focusin", function(ev){
	console.log("WINDOW FOCUSIN OCCURED");
	console.log(ev);
	window.addEventListener("keyup", function(ev){
	console.log(ev.keyCode);
	console.log(ev.keyCode == cpr.events.KeyCode.TAB);	
	});
});
//window.addEventListener("focusout", function(ev){
//	console.log("WINDOW FOCUSOUT OCCURED");
//	console.log(ev);
//});
//window.addEventListener("keydown", function(e){
//	console.log(e.key);
//	console.log(e.keyCode);	
//});
function focusin(e){
	
}
function focusout(e){
	
}

function keydown(/* cpr.events.CKeyboardEvent */e){
	
	if(e.keyCode == cpr.events.KeyCode.TAB){
		
		
	}
}
/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	
}


/*
 * 루트 컨테이너에서 focusin 이벤트 발생 시 호출.
 * 컨트롤 및 컨트롤의 하위 요소가 포커스를 획득하기 직전 발생하는 이벤트.
 */
function onBodyFocusin(/* cpr.events.CFocusEvent */ e){
	
//	console.log("FOCUS IN");
//	console.log(e);
	console.log(e.nativeEvent.relatedTarget);
	app.getContainer().addEventListenerOnce("keyup", function(ev){
		console.log(ev.keyCode);
	});
}


/*
 * 루트 컨테이너에서 focusout 이벤트 발생 시 호출.
 * 컨트롤 밑 컨트롤의 하위 요소가 포커스를 잃기 직전 발생하는 이벤트.
 */
function onBodyFocusout(/* cpr.events.CFocusEvent */ e){
	
//	console.log("FOCUS OUT");
//	console.log(e);
}
