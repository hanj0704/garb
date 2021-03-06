/*
 * App URI: 202109/gridRow
 * Source Location: 202109/gridRow.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202109/gridRow", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * gridRow.js
			 * Created at 2021. 9. 23. 오후 6:25:26.
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
				
				app.lookup("grd1").getViewingStartRowIndex();
			}
			
			
			/*
			 * 그리드에서 scroll 이벤트 발생 시 호출.
			 * 그리드 디테일 컨텐츠가 스크롤될 때 발생하는 이벤트.
			 */
			function onGrd1Scroll(/* cpr.events.CScrollEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grd1 = e.control;
				app.lookup("nbe1").redraw();
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
				console.log(e.newValue);
			}
			
			
			/*
			 * 넘버 에디터에서 before-value-change 이벤트 발생 시 호출.
			 * NumberEditor의 value를 변경하여 변경된 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 value-change가 발생합니다.
			 */
			function onNbe1BeforeValueChange(/* cpr.events.CValueChangeEvent */ e){
				/** 
				 * @type cpr.controls.NumberEditor
				 */
				var nbe1 = e.control;
				
				var ain = e.newValue-1;
				console.log(ain);
				var vcGrid = app.lookup("grd1");
				
				var heigh = vcGrid.detail.getRowHeight(0);
				console.log(heigh);
				vcGrid.scrollTo(0, ain*heigh);
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
				
			}
			
			
			/*
			 * "unfiltered" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn3 = e.control;
				
				var ds = app.lookup("ds2");
				ds.setSort("column1 asc, column2 asc");
				var ar = app.lookup("ds2").getUnfilteredDistinctValues("column1", function(dataRow){return true},function(){
					return "column1 asc"
				});
				console.log(ar);
				
			}
			
			
			/*
			 * "row" 버튼(btn4)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn4Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn4 = e.control;
				var ds = app.lookup("ds2");
				
				var rows = ds.getUnfilteredDistinctValues("column1", function(dataRow){return true;},"column1");
			
				console.log(rows);
			}
			
			
			/*
			 * "findROw" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn5 = e.control;
				
				var ds = app.lookup("ds2");
				
			//	var grd = app.lookup("grd1");
			//	/** @type cpr.data.DataRow[]*/
			//	var rows = grd.getUnfilteredRows("column1", "asc");
			//	console.log(rows);
			//	rows.forEach(function(each){
			//		console.log(each);
			//	});
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31"},
					{"column1": "column11", "column2": "column22", "column3": "column32"},
					{"column1": "column11", "column2": "column23", "column3": "column33"},
					{"column1": "column11", "column2": "column24", "column3": "column34"},
					{"column1": "column15", "column2": "column25", "column3": "column35"},
					{"column1": "column16", "column2": "column26", "column3": "column36"},
					{"column1": "column17", "column2": "column27", "column3": "column37"},
					{"column1": "column18", "column2": "column28", "column3": "column38"},
					{"column1": "column19", "column2": "column29", "column3": "column39"},
					{"column1": "column110", "column2": "column210", "column3": "column310"},
					{"column1": "column111", "column2": "column211", "column3": "column311"},
					{"column1": "column112", "column2": "column212", "column3": "column312"},
					{"column1": "column113", "column2": "column213", "column3": "column313"},
					{"column1": "column114", "column2": "column214", "column3": "column314"},
					{"column1": "column115", "column2": "column215", "column3": "column315"},
					{"column1": "column116", "column2": "column216", "column3": "column316"},
					{"column1": "column117", "column2": "column217", "column3": "column317"},
					{"column1": "column118", "column2": "column218", "column3": "column318"},
					{"column1": "column119", "column2": "column219", "column3": "column319"},
					{"column1": "column120", "column2": "column220", "column3": "column320"},
					{"column1": "column121", "column2": "column221", "column3": "column321"},
					{"column1": "column122", "column2": "column222", "column3": "column322"},
					{"column1": "column123", "column2": "column223", "column3": "column323"},
					{"column1": "column124", "column2": "column224", "column3": "column324"},
					{"column1": "column125", "column2": "column225", "column3": "column325"},
					{"column1": "column126", "column2": "column226", "column3": "column326"},
					{"column1": "column127", "column2": "column227", "column3": "column327"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"sortCondition": "column1 asc, column2 asc",
				"columns": [
					{
						"name": "column1",
						"dataType": "number"
					},
					{
						"name": "column2",
						"dataType": "number"
					},
					{"name": "column3"}
				],
				"rows": [
					{"column1": "25", "column2": "1", "column3": "column31"},
					{"column1": "22", "column2": "2", "column3": "column32"},
					{"column1": "19", "column2": "45", "column3": "column33"},
					{"column1": "18", "column2": "4", "column3": "column34"},
					{"column1": "16", "column2": "7", "column3": "column35"},
					{"column1": "1", "column2": "35", "column3": "column36"},
					{"column1": "1", "column2": "7", "column3": "column37"},
					{"column1": "2", "column2": "6", "column3": "column38"},
					{"column1": "34", "column2": "4", "column3": "column39"},
					{"column1": "23", "column2": "2", "column3": "column310"},
					{"column1": "1", "column2": "8", "column3": "column311"}
				]
			});
			app.register(dataSet_2);
			
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
				"dataSet": app.lookup("ds1"),
				"suppressedCellType": "merged",
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
								cell.suppressible = true;
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
			if(typeof onGrd1Scroll == "function") {
				grid_1.addEventListener("scroll", onGrd1Scroll);
			}
			container.addChild(grid_1, {
				"top": "90px",
				"left": "54px",
				"width": "497px",
				"height": "314px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "90px",
				"left": "561px",
				"width": "91px",
				"height": "37px"
			});
			
			var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
			numberEditor_1.spinButton = false;
			numberEditor_1.bind("value").toExpression("#grd1.getViewingStartRowIndex()+1");
			if(typeof onNbe1ValueChange == "function") {
				numberEditor_1.addEventListener("value-change", onNbe1ValueChange);
			}
			if(typeof onNbe1BeforeValueChange == "function") {
				numberEditor_1.addEventListener("before-value-change", onNbe1BeforeValueChange);
			}
			container.addChild(numberEditor_1, {
				"top": "60px",
				"left": "451px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button("btn2");
			button_2.value = "Button";
			if(typeof onBtn2Click == "function") {
				button_2.addEventListener("click", onBtn2Click);
			}
			container.addChild(button_2, {
				"top": "137px",
				"left": "561px",
				"width": "100px",
				"height": "20px"
			});
			
			var grid_2 = new cpr.controls.Grid("grd2");
			grid_2.init({
				"dataSet": app.lookup("ds2"),
				"columns": [
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
								cell.targetColumnName = "column1";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column1";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.targetColumnName = "column2";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column2";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
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
								cell.columnName = "column1";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "column2";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column3";
							}
						}
					]
				}
			});
			container.addChild(grid_2, {
				"top": "252px",
				"left": "561px",
				"width": "453px",
				"height": "207px"
			});
			
			var button_3 = new cpr.controls.Button("btn3");
			button_3.value = "unfiltered";
			if(typeof onBtn3Click == "function") {
				button_3.addEventListener("click", onBtn3Click);
			}
			container.addChild(button_3, {
				"top": "469px",
				"left": "561px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_4 = new cpr.controls.Button("btn4");
			button_4.value = "row";
			if(typeof onBtn4Click == "function") {
				button_4.addEventListener("click", onBtn4Click);
			}
			container.addChild(button_4, {
				"top": "469px",
				"left": "671px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_5 = new cpr.controls.Button("btn5");
			button_5.value = "findROw";
			if(typeof onBtn5Click == "function") {
				button_5.addEventListener("click", onBtn5Click);
			}
			container.addChild(button_5, {
				"top": "469px",
				"left": "781px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_6 = new cpr.controls.Button("btn6");
			button_6.value = "Button";
			container.addChild(button_6, {
				"top": "469px",
				"left": "891px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "gridRow";
	cpr.core.Platform.INSTANCE.register(app);
})();
