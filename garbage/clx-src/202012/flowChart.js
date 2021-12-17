/************************************************
 * flowChart.js
 * Created at 2020. 12. 7. 오전 11:38:31.
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
	
	var flow = app.lookup("ch");
	flow.arrowType = "diagonal";
	flow.drawProcess(app.lookup("ds1"), flow.getActualRect().width);
}





/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var flow = app.lookup("ch");
	flow.arrowType = "straight";
	flow.drawProcess(app.lookup("ds1"), flow.getActualRect().width);
}
