/************************************************
 * filterTest.js
 * Created at 2021. 9. 16. 오후 4:04:48.
 *
 * @author HANS
 ************************************************/



/*
 * "filte" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("grd1").filter("column3 ==\"가\" || column3 ==\"나\" || column3 ==\"다\"");
	app.lookup("grd1").redraw();
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
	
	app.lookup("grd1").sort("column1 asc");
	app.lookup("grd1").redraw();
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
	
	var grd = app.lookup("grd1");
	grd.clearFilter();
	var row = grd.findFirstRow("column1 ==\"column124\"");
	
	var idx = row.getIndex();
	var vsHeight = grd.getInitConfig().detail.rows[0].height;
	var vsNumExp = /[0-9]+/;

	var vnHeight = Number(vsHeight.match(vsNumExp)[0]);
	console.log(vnHeight);
	app.lookup("grd1").scrollTo(0,vnHeight*idx);
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var grd = app.lookup("grd1");
//	var a=  grd.findFirstRow("column4 > 27");
//	console.log(a);
	grd.scrollTo(0, 1000);
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	var a = app.lookup("grd1").getFilter()
	app.lookup("grd1").filter(a+"&& column4 > 5");
}


/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onNbe1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.NumberEditor
	 */
	var nbe1 = e.control;
	
	console.log(nbe1.numberValue);
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	app.lookup("grd1").filter("column5 ==1");
}


/*
 * "filter" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	app.lookup("grd1").filter("(column6=='chA1'||column7=='chA1'|| column6=='chCom'||column7=='chCom')");
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	app.lookup("grd1").filter("(column6=='chA1'||column7=='chA1'|| column6=='chCom'||column7=='chCom') && (column6=='TMC' || column7 =='TMC')");
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	app.lookup("grd1").filter("(column6=='chA1'||column7=='chA1'|| column6=='chCom'||column7=='chCom') && column6=='TMC'");
	
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	app.lookup("grd1").filter("String(column6).toUpperCase() *= '"+ipb1.value+"'.toUpperCase()");
}
