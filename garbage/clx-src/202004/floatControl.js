
/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;

	app.getContainer().floatControl(app.lookup("btn2"),{
		"width" :"300px",
		"height" : "100px",
		"left" : "100px",
		"top" : "100px"
	});	
}


/*
 * "floatControl+redraw" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	app.getContainer().floatControl(app.lookup("btn2"),{
		"width" :"300px",
		"height" : "100px",
		"left" : "100px",
		"top" : "100px"
	});	
	app.lookup("btn2").redraw();

}
