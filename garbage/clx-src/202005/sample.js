/************************************************
 * sample.js
 * Created at May 22, 2020 6:04:54 PM.
 *
 * @author gjanehrm
 ************************************************/


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var ipb = app.lookup("ipb1");
	var opt = app.lookup("result");
	opt.value = "utf8 바이트 길이는  입니다."
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("result2").value = app.lookup("ipb1").length + "입니다";
}
