/************************************************
 * mobileTest.js
 * Created at 2020. 9. 3. 오후 2:07:13.
 *
 * @author han
 ************************************************/

var mouseStart;
var touchStart;
/*
 * 그리드에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onGrd1Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;

	app.lookup("opt1").value = "MouseDown";
	
	mouseStart = e.timeStamp;
}


/*
 * 그리드에서 mouseup 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 뗄 때 발생하는 이벤트.
 */
function onGrd1Mouseup(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	app.lookup("opt1").value ="MouseUp";
	
	var endDate = e.timeStamp;
	var differ =moment.unix(endDate).diff(moment.unix(mouseStart), "seconds");
	
	if(differ > 2000) {
		alert("2초 터치");
	}
}


/*
 * 그리드에서 touchstart 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
 */
function onGrd1Touchstart(/* cpr.events.CTouchEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	app.lookup("opt1").value = "touchStart";
	touchStart = e.timeStamp;
}


/*
 * 그리드에서 touchend 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면에서 제거될 때 발생하는 이벤트.
 */
function onGrd1Touchend(/* cpr.events.CTouchEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	app.lookup("opt1").value = "touchStart";
	var endDate = e.timeStamp;
	var differ =moment.unix(endDate).diff(moment.unix(touchStart), "seconds");
	
	if(differ > 2000) {
		alert("2초 터치");
	}
	
	e.preventDefault();
}
