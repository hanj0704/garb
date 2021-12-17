/************************************************
 * LayoutTest.js
 * Created at 2020. 10. 13. 오전 10:24:55.
 *
 * @author HANS
 ************************************************/



/*
 * "1" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var container = app.getContainer();
	
	var a= new cpr.controls.layouts.VerticalLayout();
	
	container.setLayout(a);
}
