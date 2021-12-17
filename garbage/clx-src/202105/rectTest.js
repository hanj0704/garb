/************************************************
 * rectTest.js
 * Created at 2021. 5. 11. 오후 3:31:14.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var act =btn1.getActualRect();
	console.log(btn1.getActualRect());
	console.log(btn1.getOffsetRect());
	var a = btn1.getParent().getActualRect();
	console.log(a);
	
}
