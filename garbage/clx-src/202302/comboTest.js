/************************************************
 * comboTest.js
 * Created at 2023. 2. 28. 오전 10:59:27.
 *
 * @author HANS
 ************************************************/
var mnIndex = 0;
function redraw(){
	app.getContainer().redraw();
}

function createItem(){
	
	return new cpr.controls.Item("TEST"+mnIndex, "val"+ ++mnIndex);
}
/*
 * "addItem" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("cmb1").addItem(createItem());
	redraw();
}

/*
 * "insertItemAfter" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	app.lookup("cmb1").insertItemAfter(createItem(), app.lookup("cmb1").getItems()[0]);
	redraw();	
}

/*
 * "insertItemBefore" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	app.lookup("cmb1").insertItemBefore(createItem(),app.lookup("cmb1").getItems()[0]);
	redraw();
}

/*
 * "dv insertRow" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	app.lookup("dv1").insertRowData(0, false, {
		label:  "TEST"+mnIndex,
		value: "val"+ ++mnIndex
	});
	redraw();
}

/*
 * "dsBuild" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	app.lookup("ds1").build([
		{
			"label" : "a",
			"value" : "b"
		},
		{
			"label" : "B",
			"value" : "C"
		}
	])
}

/*
 * "refresh" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	app.lookup("dv1").refresh();
//	app.lookup("dv2").refresh();
	redraw();
	app.lookup("cmb2").redraw();
}
