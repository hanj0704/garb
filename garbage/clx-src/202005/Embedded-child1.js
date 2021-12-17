/************************************************
 * Embedded-child1.js
 * Created at 2020. 5. 19. 오후 5:47:33.
 *
 * @author LHS_0212
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	console.log(app);
	console.log(app.getHostAppInstance());
	var vcOpt1 = app.lookup("opt1");
	var vcOpt2 = app.lookup("opt2");
	var vcOpt3 = app.lookup("opt3");
	
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = app.getHostAppInstance().lookup("ds1");
	
	var rowData = ds1.getRowData(0);
	
	vcOpt1.value = rowData["column1"];
	vcOpt2.value = rowData["column2"];
	vcOpt3.value = rowData["column3"];
}


/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcIpb1 = app.lookup("ipb1");
	var vcIpb2 = app.lookup("ipb2");
	var vcIpb3 = app.lookup("ipb3");
	
	var vsIpb1Value = vcIpb1.value;
	var vsIpb2Value = vcIpb2.value;
	var vsIpb3Value = vcIpb3.value;
	
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = app.getHostAppInstance().lookup("ds1");
	
	var insertRow = ds1.insertRow(ds1.getRowCount());
	insertRow.setRowData({
		"column1" : vsIpb1Value,
		"column2" : vsIpb2Value,
		"column3" : vsIpb3Value,
	})
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcIpb4 = app.lookup("ipb4");
	
	var vsIpb4Value = vcIpb4.value;
	var vnIpb4Value = (vsIpb4Value*1) - 1;
	
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = app.getHostAppInstance().lookup("ds1");
	
	ds1.deleteRow(vnIpb4Value);
}


/*
 * "업데이트" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcIpb5 = app.lookup("ipb5");
	var vcIpb6 = app.lookup("ipb6");
	var vcIpb7 = app.lookup("ipb7");
	var vcIpb8 = app.lookup("ipb8");
	
	
	var vsIpb5Value = vcIpb5.value;
	var vnIpb5Value = (vsIpb5Value*1) - 1;
	
	var vsIpb6Value = vcIpb6.value;
	var vsIpb7Value = vcIpb7.value;
	var vsIpb8Value = vcIpb8.value;
	
	
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = app.getHostAppInstance().lookup("ds1");
	
	var rowData = {
		"column1" : vsIpb6Value,
		"column2" : vsIpb7Value,
		"column3" : vsIpb8Value
	}
	
	ds1.updateRow(vnIpb5Value, rowData)
}


/*
 * "조회" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;	
	
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = app.getHostAppInstance().lookup("ds1");
	
	var container = app.getContainer();
	var group_1 = app.lookup("grp1");	
	
	(function(container){				
		var grid_1 = new cpr.controls.Grid("grd1");
				grid_1.init({
					"dataSet": ds1, // 부모에서 받아온 데이터셋 셋팅
					"columns": [
						{"width": "50px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "row";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column1";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.targetColumnName = "column2";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.targetColumnName = "column3";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "column3";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 14,
					"colSpan": 5,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"left": "0px",
				"height": "759px"
			});			
	
}
