/************************************************
 * testFIle.js
 * Created at 2021. 7. 13. 오후 3:38:57.
 *
 * @author HANS
 ************************************************/


/*
 * "202107/eaApp1" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	cpr.core.App.load(btn1.value, function(loadedApp){
		app.lookup("ea1").app = loadedApp;
	});
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	app.lookup("ea1").app = null;
}
