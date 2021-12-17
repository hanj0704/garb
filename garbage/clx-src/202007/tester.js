/************************************************
 * tester.js
 * Created at 2020. 7. 6. 오후 2:18:13.
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
	
	var ds1 = app.lookup("ds1");
	var a = grd.columnCount-1;
	
//	for(var i = a ; i >=0 ; i--) {
//		
//		var colName = grd.detail.getColumn(i).columnName;
//			console.log(colName);
//		console.log(colName.indexOf("test"));
//		
//		if(colName.indexOf("test") >= 0) {
//			ds1.deleteColumn(colName);
//			grd.deleteColumn(i);
//		}
//	}
	grd.detail.getColumnByName("bbb").forEach(function(each){
		console.log(each.cellProp.constraint.cellIndex);
	});

	grd.redraw();
	
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
	var ds = app.lookup("ds1");
	
//	ds.getColumn("aaa").
	
	var grd = app.lookup("grd1");
	
	grd.revertData();
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
	
	var a = "총";
	var b = "원";
//	app.lookup("opt1").displayExp =   "column4"["+a+"column4"+text+\""+b+"]\"";
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
	
	var ds = app.lookup("ds1");
	var grd = app.lookup("grd1");
	
	var cl2 = ds.getColumn("bbb");
	
	for(var i = 0 ; i < 7 ; i++) {
		
		cl2.setValue(i, i);
		
	}
	
	ds.commit();
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
	
	var ds = app.lookup("ds1")
	ds.revert();
	
	app.lookup("grd1").revertData();
	
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
	
//	console.log(app.lookup("ds3").getColumnNames());

	var newDs = new cpr.data.DataSet("AA");
	newDs.parseData({
				"columns" : [
					{"name": "aaa"},
					{
						"name": "bbb",
						"dataType": "expression",
						"displayOnly": true
					},
					{"name": "column9"},
					{
						"name": "column4",
						"dataType": "expression",
						"displayOnly": true
					},
					{"name": "column5"},
					{
						"name": "dddd",
						"dataType": "expression",
						"displayOnly": true
					},
					{"name": "column6"}
				]
			})
			;
			
			console.log(newDs.getColumnNames());
}


/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	
	var grd = app.lookup("grd1");
	
//	grd.columnVisible(4, false);
	var ds = app.lookup("ds1");
	
//	var a = ds.getHeader("test2").


//	app.dialogManager.openDialog(appId, dialogName, dialogConstraint, handler);
	
	
}


/*
 * 파일 업로드에서 sendbutton-click 이벤트 발생 시 호출.
 * 파일을 전송하는 button을 클릭 시 발생하는 이벤트. 서브미션을 통해 전송 버튼에 대한 구현이 필요합니다.
 */
function onFud1SendbuttonClick(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
	
	var sms = app.lookup("sms1");
	fud1.getFiles().forEach(function(each){
		sms.addFileParameter(each.name,each);
	});
	
	sms.send();
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
	
	var grd = app.lookup("grd1");
	
	var ex = grd.getExportData();
	
	ex.rowgroups.forEach(function(each){
		if(each.region =="detail") {
//			console.log(each.style.length);
//			console.log(each.data.length);
//			console.log(each.style);
//			each.style[1].style["background-color"] = "red"
//			console.log(each.data);	
		
			console.log(each.data[1][1]);
//			console.log(each);
		}
	});
}


/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	
	var dsTree = app.lookup("dsTree");
	
//	dsTree.insertRowData(0, false, {
//		"label" : "0", 
//		"value" : "0",
//		"parent" :""
//	});
//	
//	app.lookup("tre1").redraw();

	var tre = app.lookup("tre1");
	
	var items = tre.getItemByValue(6);
	
	var a = [];	
	a.push(items.parentItem.row);
	a.push(items.parentItem.row);
	a.push(items.parentItem.row);
	console.log(a);
	console.log(items.parentItem.row);
	
	console.log(a.indexOf(items.parentItem.row.getRowData()));
	
	var b = [];
	
	b.push({"name":1});
	
	console.log(b.indexOf({"name":1}));
	
	app.lookup("ds4").insertRowData(0,false,items.parentItem.row.getRowData());
	
	app.lookup("grd2").redraw();
}
	

/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
	
//	app.lookup("grd1").revertData();
	
	var a = app.lookup("ds4").getRowDataRanged();
	
	app.lookup("ds5").build(a);
}
