/************************************************
 * copyTester.js
 * Created at 2021. 7. 27. 오후 5:16:53.
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
	
	var btn2 = app.lookup("btn2");
	
	var newer = new btn2.constructor("Aaa");
	
	console.log(newer);
	
}
