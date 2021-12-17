/************************************************
 * childTest.js
 * Created at 2020. 5. 21. 오후 2:40:20.
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
	
	var grd1 = app.lookup("grd1");
	var hostApp = app.getHostAppInstance();
	
	var ds1 = getControlsFromParents(app,"202005/EmbTest","ds2");
	
	var initConfig = grd1.getInitConfig();
	
	initConfig.dataSet = ds1;
	
	grd1.init(initConfig);
	grd1.redraw();
}
