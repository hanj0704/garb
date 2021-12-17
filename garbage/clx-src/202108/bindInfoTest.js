/************************************************
 * bindInfoTest.js
 * Created at 2021. 8. 11. 오후 3:57:04.
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
	
	
	var o1= app.lookup("opt1");
	var o2 = app.lookup("opt2");
	console.log(o1.getBindInfo("value"));
	console.log(o2.getBindInfo("value"));
}
