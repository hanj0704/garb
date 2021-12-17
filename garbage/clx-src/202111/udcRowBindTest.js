/************************************************
 * udcRowBindTest.js
 * Created at 2021. 11. 12. 오후 2:51:21.
 *
 * @author HANS
 ************************************************/
cpr.core.AppConfig.INSTANCE.setControlValue("container", {
	"useCustomScrollbar" : true
});


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var ap  = app.lookup("ha");
	var dsB = new cpr.bind.DataRowContext(app.lookup("ds1"), 0);
	ap.setBindContext(dsB);
	ap.redraw();
}


/*
 * "insert" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
}
