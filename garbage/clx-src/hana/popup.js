/************************************************
 * popup.js
 * Created at 2019. 12. 12. 오후 1:38:54.
 *
 * @author 김민규
 ************************************************/

var param = null;

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	param = window._mainToPopupParam;
	
	window._mainToPopupParam = null;
	
	app.lookup("opt1").value = param.param1;
	app.lookup("opt2").value = param.param2;
	app.lookup("opt3").value = param.param3;
	
}

/*
 * "부모창의 alert" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	/** @type cpr.core.AppInstance */
	var parentApp = param._app;
	parentApp.callAppMethod("test");
}
