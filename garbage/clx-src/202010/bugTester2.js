/************************************************
 * bugTester.js
 * Created at 2020. 10. 8. 오후 1:55:55.
 *
 * @author HANS
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
	
	app.lookup("grp1").getLayout().setColumnVisible(0, true);
	app.lookup("grp1").getLayout().setColumnVisible(1, false);
}
