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
	app.getContainer().addChild(newer, {
		"left" : "30px",
		"top" : "300px",
		"width" : "200px",
		"height" : "30px"
	});
}


/*
 * "aaa" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	console.log("ㅋㅋ");
}
