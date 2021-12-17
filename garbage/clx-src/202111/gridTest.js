/************************************************
 * gridTest.js
 * Created at 2021. 11. 15. 오후 4:45:06.
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
	var grd = app.lookup("grd1");
	
	var a  = grd.getColumnLayout();
	
	console.log(a);
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
	var grd = app.lookup("grd1");
	
	var a  = grd.getColumnLayout();
	
	console.log(a);
	
	a.header[0].colSpan = 3;
	
	grd.setColumnLayout(a);
	grd.redraw();
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
//	console.log(app.lookup("grd1").header.getColumn(0))
//	app.lookup("grd1").header.getColumn(0).rowSpan = 3;
app.lookup("grd1").header.getColumn(0).cellProp.constraint.colIndex = 0;
	app.lookup("grd1").header.getColumn(0).cellProp.constraint.colSpan = 3;
	app.lookup("grd1").redraw();
	var vcGrid = app.lookup("grd1");
	
	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var vcGrd = app.lookup("grd1");
	vcGrd.insertRowData(1, true,{
		"column1" : "111",
		"column2" : "111",
		"column3" : "111",
		"column4" : "111",
		"column5" : "111"
	});
	app.getContainer().redraw();
}
