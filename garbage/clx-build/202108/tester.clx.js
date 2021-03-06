/*
 * App URI: 202108/tester
 * Source Location: 202108/tester.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202108/tester", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			
			/*
			 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				
				console.log(app.lookup("dsSequenceStepList").getRowDataRanged());
				console.log(app.lookup("dsStationSubList").getRowDataRanged());
			}
			
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				
				app.lookup("sms1").send();
				
			}
			
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms1 = e.control;
				
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
				
				app.lookup("cmb3").value = "value1,value2";
				
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
				
				app.lookup("cmb3").values = "value1,value2";
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
				
			}
			
			
			/*
			 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
			 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var cmb1 = e.control;
				console.log(app.lookup("grd1").getRow(0).getRowData());
				app.lookup("cmb2").clearSelection(false);
				console.log(app.lookup("grd1").getRow(0).getRowData());
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
			//	var vcSelec = grd1.getSelectedRow();
			//	
			//	var mod = vcSelec.getValue("ModuleName");
			//	
			//	var vsSta= app.lookup("cmb1").dataSet.findFirstRow("STA_VALUE=='"+mod+"'");
			//	var multi = vsSta.getValue("MULTIPLE");
			//	
			//	app.lookup("cmb2").multiple = multi == "Y"? true : false;
			
				console.log(e.newSelection);
				console.log(e.targetObject);
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
				
				
				var a = "abcdefghijk";
				var vnLen = a.length
				for(var i = 0 ; i < vnLen ; i++) {
					
					var sub = a.substr(i, 1);
					console.log(sub);
				}
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
				
				
				var a = "Pressure < 1";
				
			//	var b = a.replace(/[0-9]/g, "");
			//	console.log(b);
				
				var c = a.search(/[<>]/);
				
				console.log(c);
				console.log(isNaN("123"))
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
				
				console.log(Boolean(0));
			//	var a = "aa";
			//	
			//	var hanExp = /Gas\d+/;
			//	
			//	console.log(hanExp.exec(a));
			//	console.log(hanExp.test(a));
			//	console.log(a.match(hanExp));
				
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
				
			//	var cm = app.lookup("cmb4");
			//	
			////	cm.value = "B";
			//	cm.selectItemByValue("B");
			
			}
			
			
			/*
			 * 콤보 박스에서 change 이벤트 발생 시 호출.
			 * 값이 변경 되었을때 발생하는 DOM 이벤트.
			 */
			function onCmb4Change(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var cmb4 = e.control;
				
				console.log("CHANGE");
			}
			
			
			/*
			 * 콤보 박스에서 select 이벤트 발생 시 호출.
			 * 사용자가 텍스트를 선택할 때 발생하는 이벤트.
			 */
			function onCmb4Select(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var cmb4 = e.control;
				
				console.log("SELECT");
			}
			
			
			/*
			 * 콤보 박스에서 input 이벤트 발생 시 호출.
			 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
			 */
			function onCmb4Input(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var cmb4 = e.control;
				console.log("INPUT");
			}
			
			
			/*
			 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
			 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onCmb4SelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.ComboBox
				 */
				var cmb4 = e.control;
				console.log("SELECT_CHANGE");
			}
			
			
			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var ipb1 = e.control;
				
				console.log(app.lookup("grd1").getEditRowIndex());
			}
			
			
			/*
			 * 그리드에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrd1Keydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grd1 = e.control;
				console.log(app.lookup("grd1").getEditRowIndex());
			}
			
			
			/*
			 * 그리드에서 cell-click 이벤트 발생 시 호출.
			 * Grid의 Cell 클릭시 발생하는 이벤트.
			 */
			function onGrd1CellClick(/* cpr.events.CGridMouseEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grd1 = e.control;
			//	console.log(e.rowIndex);
				
				
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
			//	var detail  = app.lookup("grd1").detail;
			//	
			//	for(var i = 0; i < detail.getCellIndices().length ; i++){
			//		
			//		var column = detail.getColumn(i);
			//		
			//	}
				
			//	console.log(!undefined);
			//	
			//	console.log(!false);
			//	
			//	var a = {
			//		q : 1
			//	}
			//	console.log(a.w);
			
				var vcGrid = app.lookup("grd1");
				
				console.log(vcGrid.getRow(15));
				console.log(vcGrid.getSelectedRow());
				
			}
			
			
			
			
			/*
			 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn11Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn11 = e.control;
				
				var a = new Array(99).fill("").map(function(v,i){
					return {
						label : i ? String(i) : "직접입력",
						value : i
					}
				});
				console.log(a);
			}
			
			
			/*
			 * "map test" 버튼(btn12)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn12Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn12 = e.control;
				var a = ["a","b","c"];
				
				var b = [0,1];
				
				var c= b.map(function(each){
					return a[each];
				});
				console.log(c);
			}
			
			
			/*
			 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn13Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn13 = e.control;
				
				var ds = app.lookup("dsColDataSort");
				
				ds.setSort("column2 asc");
				console.log(ds.getColumnData("column1"));
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsStationList");
			dataSet_1.parseData({
				"columns": [
					{"name": "STA_LABEL"},
					{
						"name": "STA_VALUE",
						"dataType": "string"
					},
					{"name": "MULTIPLE"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSequenceStepList");
			dataSet_2.parseData({
				"sortCondition": "StepNo ASC",
				"columns": [
					{
						"name": "StepNo",
						"dataType": "number"
					},
					{"name": "ModuleName"},
					{"name": "ModuleSub"},
					{"name": "ProcessRecipe"},
					{"name": "CleanRecipe"},
					{
						"name": "CleanPeriod",
						"dataType": "number",
						"info": ""
					},
					{
						"name": "Thickness",
						"dataType": "number"
					},
					{
						"name": "CoolingEnable",
						"dataType": "number"
					},
					{
						"name": "CoolingTime",
						"dataType": "number"
					},
					{
						"name": "HeatingEnable",
						"dataType": "number"
					},
					{
						"name": "HeatingTime",
						"dataType": "number"
					},
					{
						"name": "ToleranceID",
						"dataType": "number"
					},
					{
						"name": "StepNoNo",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "getIndex()+1"
					}
				],
				"rows": [
					{"StepNo": "1", "ModuleName": "AR", "ModuleSub": "Align", "ProcessRecipe": "", "CleanRecipe": "", "CleanPeriod": "0", "Thickness": "0", "CoolingEnable": "0", "CoolingTime": "0", "HeatingEnable": "0", "HeatingTime": "0", "ToleranceID": "0"},
					{"StepNo": "2", "ModuleName": "LLA/B", "ModuleSub": "Slot#3/#4", "ProcessRecipe": "", "CleanRecipe": "", "CleanPeriod": "0", "Thickness": "0", "CoolingEnable": "0", "CoolingTime": "0", "HeatingEnable": "0", "HeatingTime": "0", "ToleranceID": "0"},
					{"StepNo": "4", "ModuleName": "LLA/B", "ModuleSub": "Slot#1/#2", "ProcessRecipe": "", "CleanRecipe": "", "CleanPeriod": "0", "Thickness": "0", "CoolingEnable": "0", "CoolingTime": "0", "HeatingEnable": "0", "HeatingTime": "0", "ToleranceID": "0"},
					{"StepNo": "5", "ModuleName": "AR", "ModuleSub": "NotAlign", "ProcessRecipe": "", "CleanRecipe": "", "CleanPeriod": "0", "Thickness": "0", "CoolingEnable": "0", "CoolingTime": "0", "HeatingEnable": "0", "HeatingTime": "0", "ToleranceID": "0"},
					{"StepNo": "3", "ModuleName": "PM", "ModuleSub": "ABC", "ProcessRecipe": "111", "CleanRecipe": "111_CLN", "CleanPeriod": "1", "Thickness": "50", "CoolingEnable": "0", "CoolingTime": "0", "HeatingEnable": "0", "HeatingTime": "0", "ToleranceID": "1"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsStationSubList");
			dataSet_3.parseData({
				"columns" : [
					{"name": "SUB_LABEL"},
					{"name": "SUB_VALUE"},
					{"name": "STA_VALUE"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("ds1");
			dataSet_4.parseData({
				"columns": [{"name": "column1"}],
				"rows": [{"column1": "20210312172214"}]
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("ds2");
			dataSet_5.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "AAA", "value": "A"},
					{"label": "BBB", "value": "B"}
				]
			});
			app.register(dataSet_5);
			
			var dataSet_6 = new cpr.data.DataSet("dsColDataSort");
			dataSet_6.parseData({
				"columns": [
					{"name": "column1"},
					{
						"name": "column2",
						"dataType": "number"
					}
				],
				"rows": [
					{"column1": "a", "column2": "1"},
					{"column1": "b", "column2": "2"},
					{"column1": "d", "column2": "4"},
					{"column1": "c", "column2": "3"},
					{"column1": "q", "column2": "7"},
					{"column1": "i", "column2": "6"},
					{"column1": "e", "column2": "5"}
				]
			});
			app.register(dataSet_6);
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [{
					"name": "column1",
					"defaultValue": "20210312172214"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("sms1");
			submission_1.action = "202108/station.json";
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_3, false);
			if(typeof onSms1SubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSms1SubmitSuccess);
			}
			app.register(submission_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("dsSequenceStepList"),
				"columns": [
					{"width": "50px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
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
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.targetColumnName = "StepNo";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Step";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.targetColumnName = "ModuleName";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Module";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "ModuleSub";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "ModuleSub";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.targetColumnName = "ProcessRecipe";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Process Recipe";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.targetColumnName = "CleanRecipe";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Clean Recipe";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.targetColumnName = "CleanPeriod";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Period";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.targetColumnName = "Thickness";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Thickness";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.targetColumnName = "CoolingEnable";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "CoolingEnable";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.targetColumnName = "CoolingTime";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Cool";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.targetColumnName = "HeatingEnable";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "HeatingEnable";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.targetColumnName = "HeatingTime";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Heat";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.targetColumnName = "ToleranceID";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "Tol ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.targetColumnName = "StepNoNo";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "StepNoNo";
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
								cell.columnName = "StepNo";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "ModuleName";
								cell.control = (function(){
									var comboBox_1 = new cpr.controls.ComboBox("cmb1");
									(function(comboBox_1){
										comboBox_1.setItemSet(app.lookup("dsStationList"), {
											"label": "STA_LABEL",
											"value": "STA_VALUE"
										});
									})(comboBox_1);
									if(typeof onCmb1SelectionChange == "function") {
										comboBox_1.addEventListener("selection-change", onCmb1SelectionChange);
									}
									comboBox_1.bind("value").toDataColumn("ModuleName");
									return comboBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "ModuleSub";
								cell.control = (function(){
									var comboBox_2 = new cpr.controls.ComboBox("cmb2");
									comboBox_2.filterExp = "STA_VALUE == ModuleName";
									(function(comboBox_2){
										comboBox_2.setItemSet(app.lookup("dsStationSubList"), {
											"label": "SUB_VALUE",
											"value": "SUB_VALUE"
										});
									})(comboBox_2);
									comboBox_2.bind("value").toDataColumn("ModuleSub");
									return comboBox_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "ProcessRecipe";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "CleanRecipe";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "CleanPeriod";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "Thickness";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "CoolingEnable";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "CoolingTime";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.columnName = "HeatingEnable";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.columnName = "HeatingTime";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.columnName = "ToleranceID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.columnName = "StepNoNo";
								cell.control = (function(){
									var inputBox_1 = new cpr.controls.InputBox("ipb1");
									if(typeof onIpb1Keydown == "function") {
										inputBox_1.addEventListener("keydown", onIpb1Keydown);
									}
									inputBox_1.bind("value").toDataColumn("StepNoNo");
									return inputBox_1;
								})();
							}
						}
					]
				}
			});
			if(typeof onGrd1SelectionChange == "function") {
				grid_1.addEventListener("selection-change", onGrd1SelectionChange);
			}
			if(typeof onGrd1Keydown == "function") {
				grid_1.addEventListener("keydown", onGrd1Keydown);
			}
			if(typeof onGrd1CellClick == "function") {
				grid_1.addEventListener("cell-click", onGrd1CellClick);
			}
			container.addChild(grid_1, {
				"top": "88px",
				"right": "10px",
				"left": "20px",
				"height": "323px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "58px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var comboBox_3 = new cpr.controls.ComboBox("cmb3");
			comboBox_3.value = "value1,value2";
			(function(comboBox_3){
				comboBox_3.addItem(new cpr.controls.Item("label1", "value1"));
				comboBox_3.addItem(new cpr.controls.Item("label2", "value2"));
				comboBox_3.addItem(new cpr.controls.Item("label3", "value3"));
				comboBox_3.addItem(new cpr.controls.Item("label4", "value4"));
			})(comboBox_3);
			container.addChild(comboBox_3, {
				"top": "431px",
				"left": "32px",
				"width": "232px",
				"height": "70px"
			});
			
			var button_2 = new cpr.controls.Button("btn2");
			button_2.value = "Button";
			if(typeof onBtn2Click == "function") {
				button_2.addEventListener("click", onBtn2Click);
			}
			container.addChild(button_2, {
				"top": "431px",
				"left": "274px",
				"width": "126px",
				"height": "31px"
			});
			
			var button_3 = new cpr.controls.Button("btn3");
			button_3.value = "Button";
			if(typeof onBtn3Click == "function") {
				button_3.addEventListener("click", onBtn3Click);
			}
			container.addChild(button_3, {
				"top": "470px",
				"left": "274px",
				"width": "126px",
				"height": "31px"
			});
			
			var button_4 = new cpr.controls.Button("btn4");
			button_4.value = "Button";
			if(typeof onBtn4Click == "function") {
				button_4.addEventListener("click", onBtn4Click);
			}
			container.addChild(button_4, {
				"top": "431px",
				"left": "410px",
				"width": "126px",
				"height": "31px"
			});
			
			var listBox_1 = new cpr.controls.ListBox("lbx1");
			(function(listBox_1){
			})(listBox_1);
			container.addChild(listBox_1, {
				"top": "470px",
				"left": "436px",
				"width": "100px",
				"height": "150px"
			});
			
			var button_5 = new cpr.controls.Button("btn5");
			button_5.value = "Button";
			if(typeof onBtn5Click == "function") {
				button_5.addEventListener("click", onBtn5Click);
			}
			container.addChild(button_5, {
				"top": "58px",
				"left": "147px",
				"width": "138px",
				"height": "20px"
			});
			
			var dateInput_1 = new cpr.controls.DateInput("dti1");
			dateInput_1.mask = "YYYY-MM-DD h:mm:ss";
			dateInput_1.format = "YYYY-MM-DD A h:mm:ss";
			dateInput_1.bind("value").toDataSet(app.lookup("ds1"), "column1", 0);
			container.addChild(dateInput_1, {
				"top": "31px",
				"left": "445px",
				"width": "265px",
				"height": "28px"
			});
			
			var output_1 = new cpr.controls.Output("opt1");
			output_1.dataType = "date";
			output_1.format = "YYYY-MM-DD A h:mm:ss";
			output_1.bind("value").toDataMap(app.lookup("dm1"), "column1");
			container.addChild(output_1, {
				"top": "31px",
				"left": "720px",
				"width": "182px",
				"height": "28px"
			});
			
			var group_1 = new cpr.controls.Container("left");
			group_1.clipContent = false;
			group_1.bind("visible").toAppProperty("armAExist");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			xYLayout_2.scrollable = false;
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_2 = new cpr.controls.Output("opt2");
				output_2.value = "";
				output_2.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#000000",
					"border-right-width" : "1px",
					"border-left-color" : "#000000",
					"border-right-color" : "#000000",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#BFBFBF",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#000000",
					"border-bottom-style" : "solid"
				});
				container.addChild(output_2, {
					"top": "0px",
					"right": "3px",
					"bottom": "15px",
					"left": "3px"
				});
				var group_2 = new cpr.controls.Container("grp1");
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_3 = new cpr.controls.Output("opt3");
					output_3.value = "";
					output_3.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#000000",
						"border-right-width" : "1px",
						"border-left-color" : "#000000",
						"border-right-color" : "#000000",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#A6A6A6",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#000000",
						"border-bottom-style" : "solid"
					});
					container.addChild(output_3, {
						"top": "0px",
						"bottom": "0px",
						"left": "0px",
						"width": "5px"
					});
					var output_4 = new cpr.controls.Output("opt4");
					output_4.value = "";
					output_4.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#000000",
						"border-right-width" : "1px",
						"border-left-color" : "#000000",
						"border-right-color" : "#000000",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#A6A6A6",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#000000",
						"border-bottom-style" : "solid"
					});
					container.addChild(output_4, {
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"width": "5px"
					});
					var output_5 = new cpr.controls.Output("opt5");
					output_5.value = "";
					output_5.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#000000",
						"border-right-width" : "1px",
						"border-left-color" : "#000000",
						"border-right-color" : "#000000",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#A6A6A6",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#000000",
						"border-bottom-style" : "solid"
					});
					container.addChild(output_5, {
						"top": "0px",
						"right": "0px",
						"left": "0px",
						"height": "5px"
					});
				})(group_2);
				container.addChild(group_2, {
					"right": "0px",
					"bottom": "0px",
					"left": "0px",
					"height": "15px"
				});
				var output_6 = new cpr.controls.Output("leftWafer");
				output_6.style.css({
					"background-color" : "#B2C6E9",
					"border-radius" : "40px"
				});
				output_6.bind("visible").toAppProperty("hasLeftWafer");
				output_6.style.bindClass().toAppProperty("aWaferClass");
				output_6.bind("value").toAppProperty("aWaferName");
				container.addChild(output_6, {
					"bottom": "-13px",
					"width": "30px",
					"height": "30px",
					"left": "calc(50% - 15px)"
				});
				var output_7 = new cpr.controls.Output("opt6");
				output_7.value = "";
				output_7.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#000000",
					"border-right-width" : "1px",
					"border-left-color" : "#000000",
					"border-right-color" : "#000000",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#A6A6A6",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#000000",
					"border-bottom-style" : "solid"
				});
				container.addChild(output_7, {
					"right": "0px",
					"bottom": "14px",
					"left": "0px",
					"height": "45px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "431px",
				"left": "601px",
				"width": "13px",
				"height": "83px"
			});
			
			var group_3 = new cpr.controls.Container("left2");
			group_3.clipContent = false;
			group_3.bind("visible").toAppProperty("armAExist");
			// Layout
			var xYLayout_4 = new cpr.controls.layouts.XYLayout();
			xYLayout_4.scrollable = false;
			group_3.setLayout(xYLayout_4);
			(function(container){
				var output_8 = new cpr.controls.Output("opt7");
				output_8.value = "";
				output_8.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#000000",
					"border-right-width" : "1px",
					"border-left-color" : "#000000",
					"border-right-color" : "#000000",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#BFBFBF",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#000000",
					"border-bottom-style" : "solid"
				});
				container.addChild(output_8, {
					"top": "0px",
					"right": "3px",
					"bottom": "15px",
					"left": "3px"
				});
				var group_4 = new cpr.controls.Container("grp2");
				// Layout
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
					var output_9 = new cpr.controls.Output("opt8");
					output_9.value = "";
					output_9.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#000000",
						"border-right-width" : "1px",
						"border-left-color" : "#000000",
						"border-right-color" : "#000000",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#A6A6A6",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#000000",
						"border-bottom-style" : "solid"
					});
					container.addChild(output_9, {
						"top": "0px",
						"bottom": "0px",
						"left": "0px",
						"width": "5px"
					});
					var output_10 = new cpr.controls.Output("opt9");
					output_10.value = "";
					output_10.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#000000",
						"border-right-width" : "1px",
						"border-left-color" : "#000000",
						"border-right-color" : "#000000",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#A6A6A6",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#000000",
						"border-bottom-style" : "solid"
					});
					container.addChild(output_10, {
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"width": "5px"
					});
					var output_11 = new cpr.controls.Output("opt10");
					output_11.value = "";
					output_11.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#000000",
						"border-right-width" : "1px",
						"border-left-color" : "#000000",
						"border-right-color" : "#000000",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#A6A6A6",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#000000",
						"border-bottom-style" : "solid"
					});
					container.addChild(output_11, {
						"top": "0px",
						"right": "0px",
						"left": "0px",
						"height": "5px"
					});
				})(group_4);
				container.addChild(group_4, {
					"right": "0px",
					"bottom": "0px",
					"left": "0px",
					"height": "15px"
				});
				var output_12 = new cpr.controls.Output("leftWafer2");
				output_12.style.css({
					"background-color" : "#B2C6E9",
					"border-radius" : "40px"
				});
				output_12.bind("visible").toAppProperty("hasLeftWafer");
				output_12.style.bindClass().toAppProperty("aWaferClass");
				output_12.bind("value").toAppProperty("aWaferName");
				container.addChild(output_12, {
					"bottom": "-13px",
					"width": "30px",
					"height": "30px",
					"left": "calc(50% - 15px)"
				});
				var output_13 = new cpr.controls.Output("opt11");
				output_13.value = "";
				output_13.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#000000",
					"border-right-width" : "1px",
					"border-left-color" : "#000000",
					"border-right-color" : "#000000",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#A6A6A6",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#000000",
					"border-bottom-style" : "solid"
				});
				container.addChild(output_13, {
					"right": "0px",
					"bottom": "14px",
					"left": "0px",
					"height": "45px"
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "431px",
				"left": "624px",
				"width": "13px",
				"height": "243px"
			});
			
			var tree_1 = new cpr.controls.Tree("tre1");
			(function(tree_1){
			})(tree_1);
			container.addChild(tree_1, {
				"top": "524px",
				"left": "32px",
				"width": "200px",
				"height": "150px"
			});
			
			var button_6 = new cpr.controls.Button("btn6");
			button_6.value = "Button";
			if(typeof onBtn6Click == "function") {
				button_6.addEventListener("click", onBtn6Click);
			}
			container.addChild(button_6, {
				"top": "20px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_7 = new cpr.controls.Button("btn7");
			button_7.value = "Button";
			if(typeof onBtn7Click == "function") {
				button_7.addEventListener("click", onBtn7Click);
			}
			container.addChild(button_7, {
				"top": "20px",
				"left": "132px",
				"width": "100px",
				"height": "20px"
			});
			
			var comboBox_4 = new cpr.controls.ComboBox("cmb4");
			comboBox_4.value = "A";
			(function(comboBox_4){
				comboBox_4.setItemSet(app.lookup("ds2"), {
					"label": "label",
					"value": "value"
				});
			})(comboBox_4);
			if(typeof onCmb4Change == "function") {
				comboBox_4.addEventListener("change", onCmb4Change);
			}
			if(typeof onCmb4Select == "function") {
				comboBox_4.addEventListener("select", onCmb4Select);
			}
			if(typeof onCmb4Input == "function") {
				comboBox_4.addEventListener("input", onCmb4Input);
			}
			if(typeof onCmb4SelectionChange == "function") {
				comboBox_4.addEventListener("selection-change", onCmb4SelectionChange);
			}
			container.addChild(comboBox_4, {
				"top": "644px",
				"left": "284px",
				"width": "126px",
				"height": "30px"
			});
			
			var button_8 = new cpr.controls.Button("btn8");
			button_8.value = "Button";
			if(typeof onBtn8Click == "function") {
				button_8.addEventListener("click", onBtn8Click);
			}
			container.addChild(button_8, {
				"top": "644px",
				"left": "410px",
				"width": "91px",
				"height": "30px"
			});
			
			var button_9 = new cpr.controls.Button("btn9");
			button_9.value = "Button";
			if(typeof onBtn9Click == "function") {
				button_9.addEventListener("click", onBtn9Click);
			}
			container.addChild(button_9, {
				"top": "431px",
				"left": "647px",
				"width": "142px",
				"height": "70px"
			});
			
			var checkBoxGroup_1 = new cpr.controls.CheckBoxGroup("cbg1");
			(function(checkBoxGroup_1){
				checkBoxGroup_1.addItem(new cpr.controls.Item("label1", "value1"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("label2", "value2"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("label3", "value3"));
			})(checkBoxGroup_1);
			if(typeof onCbg1Mousemove == "function") {
				checkBoxGroup_1.addEventListener("mousemove", onCbg1Mousemove);
			}
			container.addChild(checkBoxGroup_1, {
				"top": "511px",
				"left": "647px",
				"width": "225px",
				"height": "171px"
			});
			
			var group_5 = new cpr.controls.Container("grp3");
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			group_5.setLayout(verticalLayout_1);
			(function(container){
				var button_10 = new cpr.controls.Button("btn10");
				button_10.value = "Button";
				container.addChild(button_10, {
					"width": "100px",
					"height": "20px"
				});
				var button_11 = new cpr.controls.Button("btn11");
				button_11.value = "Button";
				if(typeof onBtn11Click == "function") {
					button_11.addEventListener("click", onBtn11Click);
				}
				container.addChild(button_11, {
					"width": "100px",
					"height": "20px"
				});
			})(group_5);
			container.addChild(group_5, {
				"top": "421px",
				"left": "828px",
				"width": "186px",
				"height": "138px"
			});
			
			var button_12 = new cpr.controls.Button("btn12");
			button_12.value = "map test";
			if(typeof onBtn12Click == "function") {
				button_12.addEventListener("click", onBtn12Click);
			}
			container.addChild(button_12, {
				"top": "684px",
				"left": "32px",
				"width": "145px",
				"height": "40px"
			});
			
			var button_13 = new cpr.controls.Button("btn13");
			button_13.value = "Button";
			if(typeof onBtn13Click == "function") {
				button_13.addEventListener("click", onBtn13Click);
			}
			container.addChild(button_13, {
				"top": "684px",
				"left": "220px",
				"width": "123px",
				"height": "64px"
			});
			
			var inputBox_2 = new cpr.controls.InputBox("ipb2");
			container.addChild(inputBox_2, {
				"top": "511px",
				"left": "274px",
				"width": "99px",
				"height": "30px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "tester";
	cpr.core.Platform.INSTANCE.register(app);
})();
