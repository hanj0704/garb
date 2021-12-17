/************************************************
 * Untitled.js
 * Created at 2020. 6. 17. 오후 5:54:01.
 *
 * @author HANS
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}
var _app;

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	(function(){
	 _app = new cpr.core.App("Answers", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * testGrid2.js
			 * Created at 2020. 7. 3. 오전 10:44:23.
			 *
			 * @author 김채영
			 ************************************************/
			
			
			
			/*
			 * "1" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				var grid = app.lookup("grd1");
				grid.addColumn({
					columnLayout: [{ width : "200px" }],
					header : [{
						constraint: { rowIndex : 0, colIndex : 4},
						configurator : function(cell){
							cell.text = "Header";
							cell.control = (function(){
								return new cpr.controls.Output();
							})();
						}
					}],
					detail : [{
						constraint: { rowIndex : 0, colIndex : 4 },
						configurator : function(cell){
							cell.columnName = "column1";
						}
					}]
				});
			}
			
			
			/*
			 * "2" 버튼(btn2)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn2Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn2 = e.control;
				
				var grid = app.lookup("grd1");
				grid.addColumn({
					columnLayout: [{ width : "200px" }],
					header : [{
						constraint: { rowIndex : 0, colIndex : 5},
						configurator : function(cell){
							cell.text = "headerText";
							cell.control = (function(){
								return new cpr.controls.Output();
							})();
						}
					}],
					detail : [{
						constraint: { rowIndex : 0, colIndex : 5 },
						configurator : function(cell){
							cell.columnName = "column2";
						}
					}]
				});
				
			}
			
			
			
			/*
			 * "2" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn3 = e.control;
				
				console.log(app.lookup("ds1").getValue(1, "column4"))
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{
						"name": "column4",
						"dataType": "number"
					},
					{
						"name": "column5",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "self.getValue(getIndex()+1,\"column4\")"
					}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31", "column4": "1"},
					{"column1": "column12", "column2": "column22", "column3": "column32", "column4": "2"},
					{"column1": "column13", "column2": "column23", "column3": "column33", "column4": "3"},
					{"column1": "column14", "column2": "column24", "column3": "column34", "column4": "4"},
					{"column1": "column15", "column2": "column25", "column3": "column35", "column4": "5"},
					{"column1": "column16", "column2": "column26", "column3": "column36", "column4": "6"}
				]
			});
			app.register(dataSet_1);
			
			app.supportMedia("all and (min-width: 1320px)", "eXFrame");
			app.supportMedia("all and (min-width: 1020px) and (max-width: 1319px)", "default");
			app.supportMedia("all and (min-width: 760px) and (max-width: 1019px)", "tablet");
			app.supportMedia("all and (max-width: 759px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("ds1"),
				"columns": [
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
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "column4";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column4";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.targetColumnName = "column5";
								cell.text = "column5";
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
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "column4";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "column5";
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "20px",
				"left": "20px",
				"width": "659px",
				"height": "317px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "1";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "20px",
				"left": "689px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button("btn2");
			button_2.value = "2";
			if(typeof onBtn2Click == "function") {
				button_2.addEventListener("click", onBtn2Click);
			}
			container.addChild(button_2, {
				"top": "20px",
				"left": "799px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_3 = new cpr.controls.Button("btn3");
			button_3.value = "2";
			if(typeof onBtn3Click == "function") {
				button_3.addEventListener("click", onBtn3Click);
			}
			container.addChild(button_3, {
				"top": "50px",
				"left": "689px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	_app.title = "testGrid2";
	cpr.core.Platform.INSTANCE.register(_app);

})();

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
//	app.lookup("ea1").app = _app;
//	app.lookup("ea1")
//debugger;
	cpr.core.App.load(_app.id, function(loadedApp){
		app.lookup("ea1").app = loadedApp;
//		loadedApp.createNewInstance().run();
		
	});
}
