/************************************************
 * DynamicGrid.js
 * Created at 2021. 1. 12. 오후 2:15:13.
 *
 * @author ryu54
 ************************************************/


/*
 * "동적 생성" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	createGrid(app.lookup("grd1"), {
		header : app.lookup("dsGrdHd"),
		detail : app.lookup("dsList")
	});
}



/*
 * "동적 생성 (샘플2)" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	createGrid(app.lookup("grd1"), {
		header : app.lookup("dsGrdHd2"),
		detail : app.lookup("dsList2")
	});
}


/*
 * "동적 생성 (샘플3)" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	createGrid(app.lookup("grd1"), {
		header : app.lookup("dsGrdHd3"),
		detail : app.lookup("dsList3")
	});
}
