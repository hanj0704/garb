/************************************************
 * LinkedDataSet.js
 * Created at 2019. 7. 26. 오후 6:15:29.
 *
 * @author hyeran
 ************************************************/

var ds = null;

/**
 * @return cpr.data.DataSet
 */
function getDS() {
	var radio = app.lookup("rdb1");
	var item = radio.getSelectionFirst();
	var value = item.value;
	return app.lookup(value);
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	ds = getDS();
}


/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	ds = getDS();
}


/*
 * "build" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ds_parent = app.lookup("ds_parent");
	var ds_child = app.lookup("ds_child");
	var dv_ds_child = app.lookup("dv_ds_child");
	
	for (var i = 1; i < 6; i++) {
		var row = ds_parent.pushRowData({"column1":"column1"+i, "column2":"column2"+i, "column3":"column3"+i,"column4":i});
		ds_child.bindParentRow(row);
		dv_ds_child.bindParentRow(row);
		for (var j = 1; j < 4; j++) {
			ds_child.insertRowData(ds_child.getRowCount(),true,{"column1":i+"_sub1_"+j, "column2":i+"_sub2_"+j, "column3":i+"_sub3_"+j,"column4":(i*j)});
			dv_ds_child.insertRowData(dv_ds_child.getRowCount(),true,{"column1":i+"_sub1_"+j, "column2":i+"_sub2_"+j, "column3":i+"_sub3_"+j,"column4":(i*j)});
		}
	}
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var selectedRow = grd1.getSelectedRow();
	if (selectedRow != null) {
		var ds_child = app.lookup("ds_child");
		var dv_ds_child = app.lookup("dv_ds_child");
		var row = grd1.dataSet.getRow(selectedRow.getIndex());
		ds_child.bindParentRow(row);
		dv_ds_child.bindParentRow(row);
//		app.lookup("grd2").redraw();
//		app.lookup("grd3").redraw();
	}
	
}


/*
 * "Grid.redraw()" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function redrawGrid(/* cpr.events.CMouseEvent */ e){
	
	app.lookup("grd1").redraw();
	app.lookup("grd2").redraw();
	app.lookup("grd3").redraw();
}



/*
 * "addRow" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log(">> addRow()");
	ds.addRow();
}


/*
 * "addRowData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> addRowData({"column1":"addRowData1", "column2":"addRowData2", "column3":"addRowData3", "column4":"addRowData4"});');
	ds.addRowData({"column1":"addRowData1", "column2":"addRowData2", "column3":"addRowData3", "column4":"addRowData4"});
}


/*
 * "pushRowData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.pushRowData({"column1":"pushRowData1", "column2":"pushRowData2", "column3":"pushRowData3", "column4":"pushRowData4"});');
	ds.pushRowData({"column1":"pushRowData1", "column2":"pushRowData2", "column3":"pushRowData3", "column4":"pushRowData4"});
	
	console.log('>> ds.pushRowData();');
	ds.pushRowData();
}


/*
 * "insertRow" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.insertRow(ds.getRowCount()-1, true);');
	ds.insertRow(ds.getRowCount()-1, true);
}


/*
 * "insertRowData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.insertRowData(ds.getRowCount()-1, true, {"column1":"insertRowData1", "column2":"insertRowData2", "column3":"insertRowData3", "column4":"insertRowData4"});');
	ds.insertRowData(ds.getRowCount()-1, true, {"column1":"insertRowData1", "column2":"insertRowData2", "column3":"insertRowData3", "column4":"insertRowData4"});
}


/*
 * "deleteRow" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log(">> deleteRow(0)");
	ds.deleteRow(0);
}


/*
 * "realDeleteRow" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick9(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log(">> realDeleteRow(1)");
	ds.realDeleteRow(1);
}


/*
 * "getRowCount" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log("rowCount : " + ds.getRowCount());
}


/*
 * "changeRowIndex" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick11(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log(">> changeRowIndex(1, 2)");
	ds.changeRowIndex(1, 2);
	redrawGrid();
	
}


/*
 * "moveRowIndex" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick12(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log(">> moveRowIndex(0, 2, true)");
	ds.moveRowIndex(0, 2, true);
	redrawGrid();
}


/*
 * "copyToDataSet" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick13(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var targetDS = app.lookup("ds_test");
	
	console.log('>> copyToDataSet before : ' + targetDS.getRowCount());
	
	console.log('>> copyToDataSet(targetDS);');
	ds.copyToDataSet(targetDS);
	
	console.log('>> copyToDataSet after : ' + targetDS.getRowCount());
	
}


/*
 * "copyToDataMap" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick14(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var targetDM = app.lookup("dm1");
	
	console.log('>> copyToDataMap before : ' + JSON.stringify(targetDM.getDatas()));
	
	console.log('>> copyToDataMap(targetDM, 0);');
	ds.copyToDataMap(targetDM, 0);
	
	console.log('>> copyToDataMap after : ' + JSON.stringify(targetDM.getDatas()));
}


/*
 * "getValue" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick15(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getValue(0,"column1") : ' + ds.getValue(0,"column1"));
	console.log('>> ds.getValue(1,"column1") : ' + ds.getValue(1,"column1"));
}


/*
 * "setValue" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick16(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.setValue(0,"column1", "setValue1");');
	ds.setValue(0,"column1", "setValue1");
	console.log('>> ds.setValue(1,"column1", "setValue2");');
	ds.setValue(1,"column1", "setValue2");
	
	console.log('>> ds.getValue(0,"column1") : ' + ds.getValue(0,"column1"));
	console.log('>> ds.getValue(1,"column1") : ' + ds.getValue(1,"column1"));
}


/*
 * "putValue" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick17(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.putValue(1,"column1", "putValue3");');
	ds.putValue(1,"column1", "putValue3");
	console.log('>> ds.putValue(2,"column1", "putValue4");');
	ds.putValue(2,"column1", "putValue4");
	
	console.log('>> ds.getValue(1,"column1") : ' + ds.getValue(1,"column1"));
	console.log('>> ds.getValue(2,"column1") : ' + ds.getValue(2, "column1"));
}


/*
 * "updateRow" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick18(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.updateRow(0, {"column1":"updateRow1", "column2":"updateRow2", "column3":"updateRow3", "column4":"updateRow4"});');
	ds.updateRow(0, {"column1":"updateRow1", "column2":"updateRow2", "column3":"updateRow3", "column4":"updateRow4"});
}


/*
 * "getOriginalValue" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick19(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getOriginalValue(0, "column1") : ' + ds.getOriginalValue(0, "column1"));
}


/*
 * "getColumnData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick20(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getColumnData("column1") : ' + ds.getColumnData("column1"));
}


/*
 * "getRowDataRanged" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick21(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getRowDataRanged()');
	console.log(ds.getRowDataRanged());
	
}


/*
 * "getRowData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick22(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getRowData(0)');
	console.log(ds.getRowData(0));
}


/*
 * "getString" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick23(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getString(0, "column1") : ' + ds.getString(0, "column1"));
}


/*
 * "getNumber" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick24(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getNumber(0, "column4") : ' + ds.getNumber(0, "column4"));
}


/*
 * "getBoolean" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick25(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log('>> ds.getBoolean(0, "column4") : ' + ds.getBoolean(0, "column4"));
}


/*
 * "setRowState / getRowState / getRowStateString" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick26(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.getRowState(0) : ' + ds.getRowState(0));
	console.log('>> ds.getRowStateString(0) : ' + ds.getRowStateString(0));
	
	console.log('>> ds.setRowState(0, cpr.data.tabledata.RowState.UPDATED)');
	ds.setRowState(0, cpr.data.tabledata.RowState.UPDATED);
	
	console.log('>> ds.getRowState(0) : ' + ds.getRowState(0));
	console.log('>> ds.getRowStateString(0) : ' + ds.getRowStateString(0));
	
}


/*
 * "setRowStateAll" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick27(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	for (var i = 0; i < ds.getRowCount(); i++) {
		console.log('>> ds.getRowState('+i+') : ' + ds.getRowState(i));
	}
	
	console.log(">> ds.setRowStateAll(cpr.data.tabledata.RowState.UPDATED);");
	ds.setRowStateAll(cpr.data.tabledata.RowState.UPDATED);
	
	for (var i = 0; i < ds.getRowCount(); i++) {
		console.log('>> ds.getRowState('+i+') : ' + ds.getRowState(i));
	}
}


/*
 * "setRowStateRanged" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick28(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	for (var i = 0; i < ds.getRowCount(); i++) {
		console.log('>> ds.getRowStateString('+i+') : ' + ds.getRowStateString(i));
	}
	
	console.log(">> ds.setRowStateRanged(cpr.data.tabledata.RowState.UPDATED, 1, 2);");
	ds.setRowStateRanged(cpr.data.tabledata.RowState.UPDATED, 1,2);
	
	for (var i = 0; i < ds.getRowCount(); i++) {
		console.log('>> ds.getRowStateString('+i+') : ' + ds.getRowStateString(i));
	}
	
}


/*
 * "getRowIndicesByState" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick29(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var indices = ds.getRowIndicesByState(cpr.data.tabledata.RowState.UPDATED);
	console.log(">> ds.getRowIndicesByState(cpr.data.tabledata.RowState.UPDATED);");
	console.log(indices);
	
}


/*
 * "getRowStatedIndices" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick30(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var indices = ds.getRowStatedIndices(cpr.data.tabledata.RowState.UPDATED);
	console.log(">> ds.getRowStatedIndices(cpr.data.tabledata.RowState.UPDATED); : [" + indices.join(", ") +"]");
}


/*
 * "getRowStatedIndex" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick31(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var index = ds.getRowStatedIndex(cpr.data.tabledata.RowState.UPDATED);
	console.log(">> ds.getRowStatedIndex(cpr.data.tabledata.RowState.UPDATED); : [" + index +"]");
}


/*
 * "getRowCountByState" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick32(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var count = ds.getRowCountByState(cpr.data.tabledata.RowState.UPDATED);
	console.log(">> ds.getRowCountByState(cpr.data.tabledata.RowState.UPDATED);");
	console.log(count);
}


/*
 * "getRowStatedCount" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick33(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var count = ds.getRowStatedCount(cpr.data.tabledata.RowState.UPDATED);
	console.log(">> ds.getRowStatedCount(cpr.data.tabledata.RowState.UPDATED); : [" + count +"]");
}


/*
 * "getRowDatasByState" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick34(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var count = ds.getRowDatasByState(cpr.data.tabledata.RowState.UPDATED);
	console.log(">> ds.getRowDatasByState(cpr.data.tabledata.RowState.UPDATED);");
	console.log(count);
}


/*
 * "isModified" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick35(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.isModified(); : " + ds.isModified());
}


/*
 * "setRowsAttr / getRowsAttr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick36(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var list = ds.getRowsAttr("testdata");
	console.log('>> ds.getRowsAttr("testdata"); : ['+list.join(", ")+']');
	
	console.log('>> ds.setRowsAttr("testdata", "t_t_t"); ');
	ds.setRowsAttr("testdata", "t_t_t");
	
	var list = ds.getRowsAttr("testdata");
	console.log('>> ds.getRowsAttr("testdata"); : ['+list.join(", ")+']');
	
}


/*
 * "findFirstRow / findFirstRowExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick37(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var row = ds.findFirstRow("column4 % 2 == 0");
	console.log('>> ds.findFirstRow("column4 % 2 == 0") 짝수 INDEX : ' + row.getIndex());
	
	var row = ds.findFirstRowExpr(new cpr.expression.Expression("column4 % 2 == 0"));
	console.log('>> ds.findFirstRowExpr("column4 % 2 == 0") 짝수 INDEX : ' + row.getIndex());
}


/*
 * "findAllRow / findAllRowExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick38(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var rows = ds.findAllRow("column4 % 2 == 0");
	console.log('>> ds.findAllRow("column4 % 2 == 0") "짝수" count : ['+rows.length+'] / firstdata : [' +rows[0].getValue("column1")+ ']');
	
	var rows = ds.findAllRowExpr(new cpr.expression.Expression("column4 % 2 == 0"));
	console.log('>> ds.findAllRowExpr(new cpr.expression.Expression("column4 % 2 == 0")) "짝수" count : ['+rows.length+'] / firstdata : [' +rows[0].getValue("column1")+ ']');
	
	
}


/*
 * "setFilter / getFilter" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick39(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.getFilter()' + ds.getFilter());
	
	console.log('>> ds.setFilter("column4 % 2 == 0"); // 짝수');
	ds.setFilter("column4 % 2 == 0");
	
	console.log('>> ds.getFilter()' + ds.getFilter());
}


/*
 * "setFilterExpr / getFilterExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick40(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var filterExpr = ds.getFilterExpr();
	console.log('>> ds.getFilterExpr().src' + (filterExpr != null ? filterExpr.src : ""));
	
	console.log('>> ds.setFilterExpr("column4 % 2 == 1"); // 홀수');
	ds.setFilterExpr(new cpr.expression.Expression("column4 % 2 == 1"));
	
	filterExpr = ds.getFilterExpr();
	console.log('>> ds.getFilterExpr().src' + (filterExpr != null ? filterExpr.src : ""));
}


/*
 * "clearFilter" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick41(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.clearFilter();');
	ds.clearFilter();
}


/*
 * "setSort / getSort" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick42(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.getSort(); : ' + ds.getSort());
	
	console.log('>> ds.setSort("column4 desc");');
	ds.setSort("column4 desc");
	
	console.log('>> ds.getSort(); : ' + ds.getSort());
}




/*
 * "clearSort" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick43(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log('>> ds.getSort(); : ' + ds.getSort());
	
	console.log('>> ds.clearSort();');
	ds.clearSort();
	
	console.log('>> ds.getSort(); : ' + ds.getSort());
	
}


/*
 * "setSortExpr / getSortExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick44(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var sortExpr = ds.getSortExpr();
	console.log('>> ds.getSortExpr().src : ' + (sortExpr != null ? sortExpr.src : ""));
	
	console.log('>> ds.setSortExpr(new cpr.expression.Expression("column4 desc"));');
	ds.setSortExpr(new cpr.expression.Expression("column4 desc"));
	
	sortExpr = ds.getSortExpr();
	console.log('>> ds.getSortExpr().src : ' + (sortExpr != null ? sortExpr.src : ""));
}


/*
 * "getSum" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick45(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getSum('column4') : " + ds.getSum('column4'));
	console.log(">> ds.getSum('column5') : " + ds.getSum('column5'));
}


/*
 * "getAvg" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick46(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getAvg('column4') : " + ds.getAvg('column4'));
	console.log(">> ds.getAvg('column5') : " + ds.getAvg('column5'));
}


/*
 * "getMax" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick47(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getMax('column4') : " + ds.getMax('column4'));
	console.log(">> ds.getMax('column5') : " + ds.getMax('column5'));
}


/*
 * "getMin" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick48(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getMin('column4') : " + ds.getMin('column4'));
	console.log(">> ds.getMin('column5') : " + ds.getMin('column5'));
}


/*
 * "getOriginalSum" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick49(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getOriginalSum('column4') : " + ds.getOriginalSum('column4'));
	console.log(">> ds.getOriginalSum('column5') : " + ds.getOriginalSum('column5'));
}


/*
 * "getOriginalAvg" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick50(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getOriginalAvg('column4') : " + ds.getOriginalAvg('column4'));
	console.log(">> ds.getOriginalAvg('column5') : " + ds.getOriginalAvg('column5'));
}


/*
 * "getOriginalMax" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick51(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getOriginalMax('column4') : " + ds.getOriginalMax('column4'));
	console.log(">> ds.getOriginalMax('column5') : " + ds.getOriginalMax('column5'));
}


/*
 * "getOriginalMin" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick52(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getOriginalMin('column4') : " + ds.getOriginalMin('column4'));
	console.log(">> ds.getOriginalMin('column5') : " + ds.getOriginalMin('column5'));
}


/*
 * "getOriginalRowCount" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick53(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getOriginalRowCount() : " + ds.getOriginalRowCount());
}


/*
 * "getConditionalSum" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick54(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getConditionalSum('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalSum('column4 % 2 == 0', 'column4'));
}


/*
 * "getConditionalAvg" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick55(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getConditionalAvg('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalAvg('column4 % 2 == 0', 'column4'));
}


/*
 * "getConditionalMax" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick56(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getConditionalMax('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalMax('column4 % 2 == 0', 'column4'));
}


/*
 * "getConditionalMin" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick57(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getConditionalMin('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalMin('column4 % 2 == 0', 'column4'));
}


/*
 * "getConditionalRowCount" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick58(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getConditionalRowCount('column4 % 2 == 0') 짝수 : " + ds.getConditionalRowCount('column4 % 2 == 0'));
}


/*
 * "getConditionalSumExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick59(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var expr = new cpr.expression.Expression('column4 % 2 == 0');
	console.log(">> ds.getConditionalSumExpr('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalSumExpr(expr, 'column4'));
}


/*
 * "getConditionalAvgExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick60(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var expr = new cpr.expression.Expression('column4 % 2 == 0');
	console.log(">> ds.getConditionalAvgExpr('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalAvgExpr(expr, 'column4'));
}


/*
 * "getConditionalMaxExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick61(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var expr = new cpr.expression.Expression('column4 % 2 == 0');
	console.log(">> ds.getConditionalMaxExpr('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalMaxExpr(expr, 'column4'));
}


/*
 * "getConditionalMinExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick62(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var expr = new cpr.expression.Expression('column4 % 2 == 0');
	console.log(">> ds.getConditionalMinExpr('column4 % 2 == 0', 'column4') 짝수 : " + ds.getConditionalMinExpr(expr, 'column4'));
}


/*
 * "getConditionalRowCountExpr" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick63(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var expr = new cpr.expression.Expression('column4 % 2 == 0');
	console.log(">> ds.getConditionalRowCountExpr('column4 % 2 == 0') 짝수 : " + ds.getConditionalRowCountExpr(expr));
}


/*
 * "getBindedParentRowId" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getBindedParentRowId() : " + ds.getBindedParentRowId());
}


/*
 * "findParentRow" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick64(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var parentRowId = ds.getBindedParentRowId();
	var row =  app.lookup("ds_parent").findParentRow(parentRowId);
	console.log(">> ds.findParentRow(parentRowId) : " + (row != null ? JSON.stringify(row.getRowData()) : ""));
}


/*
 * "getUnfilteredDistinctValues" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick65(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var values = ds.getUnfilteredDistinctValues("column1");
	console.log('>> ds.getUnfilteredDistinctValues("column1") \n: ' + values.join(", "));
}


/*
 * "getUnfilteredRowDatasByState" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick66(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// { [state: number]: RowConfigInfo[] }
	
	console.log('>> ds.getUnfilteredRowDatasByState("cpr.data.tabledata.RowState.UNCHANGED") : ');
	var values = ds.getUnfilteredRowDatasByState(cpr.data.tabledata.RowState.UNCHANGED);
	console.log(JSON.stringify(values));
	
}


/*
 * "getUnfilteredRowDatas" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick71(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// : RowConfigInfo[];
	
	console.log(">> ds.getUnfilteredRowDatas() : " );
	var values = ds.getUnfilteredRowDatas();
	console.log(JSON.stringify(values));
}


/*
 * "getUnfilteredRowCount" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick67(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.getUnfilteredRowCount() : " + ds.getUnfilteredRowCount());
}


/*
 * "ds_child.pushRow();" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick68(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds_child.pushRow();");
	var ds_child = app.lookup("ds_child");
	ds_child.pushRow();
}


/*
 * "dv_ds_child.pushRow();" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick69(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> dv_ds_child.pushRow();");
	var dv_ds_child = app.lookup("dv_ds_child");
	dv_ds_child.pushRow();
}


/*
 * "bindParentRow(null)" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick70(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.bindParentRow(null);");
	ds.bindParentRow(null);
}


/*
 * "_getUnfilteredRowDatas" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick72(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var rowdatas = null;
	
	console.log('>> ds._getUnfilteredRowDatas(cpr.data.tabledata.RowState.UNCHANGED);');
	rowdatas = ds._getUnfilteredRowDatas(cpr.data.tabledata.RowState.UNCHANGED);
	if (rowdatas != null) {
		console.log(rowdatas);
	} else {
		console.log("rowdatas가 없습니다")
	}
	
	
	console.log('>> ds._getUnfilteredRowDatas(cpr.data.tabledata.RowState.INSERTED);');
	rowdatas = ds._getUnfilteredRowDatas(cpr.data.tabledata.RowState.INSERTED);
	if (rowdatas != null) {
		console.log(rowdatas);
	} else {
		console.log("rowdatas가 없습니다")
	}
	
	console.log('>> ds._getUnfilteredRowDatas(cpr.data.tabledata.RowState.UPDATED);');
	rowdatas = ds._getUnfilteredRowDatas(cpr.data.tabledata.RowState.UPDATED);
	if (rowdatas != null) {
		console.log(rowdatas);
	} else {
		console.log("rowdatas가 없습니다")
	}
}


/*
 * "isModified" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick73(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.isModified() : " + ds.isModified());
}


/*
 * "setUnfilteredRowStateAll" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick74(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(">> ds.setUnfilteredRowStateAll(DELETED)");
	ds.setUnfilteredRowStateAll(cpr.data.tabledata.RowState.DELETED);
	
}

/*
 * "msm" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("msm1").send();
}

/*
 * "load" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	app.lookup("msm2").send();
}

/*
 * "rowInfo" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var dsc = app.lookup("ds_child");
	console.log(dsc.getRowDataRanged());
	console.log(dsc.getRow(0));
	console.log(dsc.getBindedParentRowId());
	console.log(dsc.getBindContext());
	
	var grd = app.lookup("grd1");
	var dsp = app.lookup("ds_parent");
	var sel = grd.getSelectedRow();
	var idx = sel.getIndex();
	var row = dsp.getRow(idx);
	
	
	console.log(sel);
	console.log(row);
//	dsp.forEachOfUnfilteredRows(function(dataRow){
//		console.log(dataRow);
//		console.log(dataRow._rowdata);
////		console.log(dataRow.)
//	});
//	dsc.forEachOfUnfilteredRows(function(dataRow){
//		console.log(dataRow);
//		console.log(dataRow.getRowData());
//		console.log(dataRow._rowdata);
//	});
//	debugger
	var parentRow = dsp.findParentRow(dsc.getBindedParentRowId());
	console.log(parentRow);
}

/*
 * "add" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	app.lookup("ds_child").pushRowData({});
}

/*
 * "setBindRow" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	var dsp = app.lookup("ds_parent");
	var q = dsp.getRow(0);	
	var dsc = app.lookup("ds_child");
	dsc.bindParentRow(q);
}
