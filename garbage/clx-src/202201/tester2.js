/************************************************
 * tester2.js
 * Created at 2022. 1. 4. 오후 4:31:00.
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
	
	var ds = app.lookup("ds1");
	var vnRowIndex = ds.getRowCount();
	var container = app.lookup("grp1");
	for(var i = 0; i < vnRowIndex ; i++) {
//		var voRow = ds.getRow(i);
//		var vsCol1  = voRow.getValue("label");
		var vsCol1 = ds.getValue(i, "label");
		var newUDC = new udc.aaa.wpm();
		newUDC.textMan = vsCol1;
		container.addChild(newUDC, {
			width : "300px",
			height : "150px",
			autoSize: "none"
		});
	}  
	
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
	app.lookup("grd1").deleteRow(0);
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
	app.lookup("grd1").insertRowData(0,false,{
		"column1" : "column11"
	})
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
	console.log(app.lookup("ds3").isModified());
	app.lookup("sms1").send();
	
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
	
	var ds = app.lookup("ds4");
	
	var a = ds.findAllRow("column1.toUpperCase() *= 'COLUMN'");
	console.log(a);
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
	
	var a= app.lookup("grd1").getExportData();
	var sm = app.lookup("sms1");
	sm.setRequestObject(a);
	sm.send()
}


/*
 * 그룹에서 focusout 이벤트 발생 시 호출.
 * 컨트롤 밑 컨트롤의 하위 요소가 포커스를 잃기 직전 발생하는 이벤트.
 */
function onGrp1Focusout(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	
	console.log("FOCUS_OUT");
	console.log(e);
}

