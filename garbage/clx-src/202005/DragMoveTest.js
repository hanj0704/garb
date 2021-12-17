/************************************************
 * DragMoveTest.js
 * Created at 2020. 5. 25. 오전 11:17:21.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("btn1").redraw();
}
