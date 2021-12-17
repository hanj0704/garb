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
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var tree = app.lookup("tre1");
	
	var it = tree.getItems()[0];
	console.log(it);
	tree.expandItem(it);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("sms1").send();
}
