/************************************************
 * jqueryTest.js
 * Created at 2020. 7. 31. 오후 1:19:04.
 *
 * @author han
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
	
//	$.getJSON("./data/FXFIG2.json",function(data){
//		console.log(data);
//		app.lookup("ds2").build(data.fxfig);
//		app.lookup("grd1").redraw();
//	})
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	app.lookup("sms1").send();
}
