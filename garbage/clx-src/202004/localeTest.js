/************************************************
 * localeTest.js
 * Created at 2020. 4. 24. 오후 5:33:25.
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
	
	var ea1 = app.lookup("ea1");
	
	cpr.core.App.load("202004/sample", function(loadedApp){
		ea1.app = loadedApp;
	});
}


/*
 * "sample2" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	
	var ea1 = app.lookup("ea1");
	
	cpr.core.App.load("202004/sample2", function(loadedApp){
		ea1.app = loadedApp;
	});
}
