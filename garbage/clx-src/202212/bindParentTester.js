/************************************************
 * bindParentTester.js
 * Created at 2022. 12. 28. 오후 3:17:51.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	var ds1 = app.lookup("ds1");
	var ds2 = app.lookup("ds2");
	var row = ds1.getRow(1);
	console.log(row);
	ds2.bindParentRow(row);
	
	app.lookup("ds2").addRowData({
		"column5" : "1",
		"column6" : "2",
		"column7" : "3",
		"column8" : "4"
	})
	
}

/*
 * "add" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
}

/*
 * "clear" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	app.lookup("ds1").clear();
	app.lookup("ds2").clear();
}

/*
 * "clear" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	var ds_parent = app.lookup("ds1");
	var ds_child = app.lookup("ds2");
	
	for (var i = 1; i < 6; i++) {
		var row = ds_parent.pushRowData({"column1":"column1"+i, "column2":"column2"+i, "column3":"column3"+i,"column4":i});
		ds_child.bindParentRow(row);
		for (var j = 1; j < 4; j++) {
			ds_child.insertRowData(ds_child.getRowCount(),true,{"column5":i+"_sub1_"+j, "column6":i+"_sub2_"+j, "column7":i+"_sub3_"+j,"column8":(i*j)});
		}
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(e){
	var grd1 = e.control;
	var index = grd1.getSelectedRowIndex();
	var row = grd1.dataSet.getRow(index);
	app.lookup("ds2").bindParentRow(row);
}

/*
 * "test" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	var dt = app.lookup("dsTest");
	var obj = new cpr.utils.ObjectMap();
	app.lookup("ds1").forEachOfUnfilteredRows(function(dataRow){
		dt.bindParentRow(dataRow);
		console.log(dt.getBindedParentRowId());
		obj.put(dt.getBindedParentRowId(), dataRow);
	});
	
	console.log(obj.toArray());
}

/*
 * "dataRow" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	app.lookup("ds1").forEachOfUnfilteredRows(function(dataRow){
		console.log(dataRow);
	});
}
