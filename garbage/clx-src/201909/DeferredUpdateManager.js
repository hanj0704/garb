/************************************************
 * DeffuredUpdateManager.js
 * Created at 2019. 9. 26. 오후 3:38:43.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.getContainer().redraw();
}


/*
 * "redraw" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	app.lookup("grd1").redraw();
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	console.log("발생해버렸고");
	console.log(cpr.core.DeferredUpdateManager.INSTANCE.getCurrentFrameID());
//	var udcs = app.lookup("udcs");
//	udcs.btn1Value = "rkskekfk";
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		var udcs = app.lookup("udcs");
	udcs.btn1Value = "rkskekfk";
	
//	udcs.redraw();
});
}

