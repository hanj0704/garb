/*
 * App URI: 202003/newTester
 * Source Location: 202003/newTester.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202003/newTester", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			
			var util = createCommonUtil();
			
			
			/*
			 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				
				
				var a = getComputedStyle(document.querySelector(".cl-container .cl-formlayout-column-shade")).backgroundColor;
				console.log(a);
				console.log(rgbToHex(a));
				var b = "238";
				console.log(b.toString(16));
			}
			
			
			
			function rgbToHex(rgbType) {
				  var rgb = rgbType.replace( /[^%,.\d]/g, "" ); 
					console.log(rgb[0]);
					
			        // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
			        rgb = rgb.split( "," ); 
			  return "#" + Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);
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
					{"column1": "column12", "column2": "column22", "column3": "column32"},
					{"column1": "column13", "column2": "column23", "column3": "column33"},
					{"column1": "column14", "column2": "column24", "column3": "column34"},
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
					{"column1": "column127", "column2": "column227", "column3": "column327"},
					{"column1": "column128", "column2": "column228", "column3": "column328"},
					{"column1": "column129", "column2": "column229", "column3": "column329"},
					{"column1": "column130", "column2": "column230", "column3": "column330"},
					{"column1": "column131", "column2": "column231", "column3": "column331"},
					{"column1": "column132", "column2": "column232", "column3": "column332"},
					{"column1": "column133", "column2": "column233", "column3": "column333"},
					{"column1": "column134", "column2": "column234", "column3": "column334"},
					{"column1": "column135", "column2": "column235", "column3": "column335"},
					{"column1": "column136", "column2": "column236", "column3": "column336"},
					{"column1": "column137", "column2": "column237", "column3": "column337"},
					{"column1": "column138", "column2": "column238", "column3": "column338"},
					{"column1": "column139", "column2": "column239", "column3": "column339"},
					{"column1": "column140", "column2": "column240", "column3": "column340"},
					{"column1": "column141", "column2": "column241", "column3": "column341"},
					{"column1": "column142", "column2": "column242", "column3": "column342"},
					{"column1": "column143", "column2": "column243", "column3": "column343"},
					{"column1": "column144", "column2": "column244", "column3": "column344"},
					{"column1": "column145", "column2": "column245", "column3": "column345"},
					{"column1": "column146", "column2": "column246", "column3": "column346"},
					{"column1": "column147", "column2": "column247", "column3": "column347"},
					{"column1": "column148", "column2": "column248", "column3": "column348"},
					{"column1": "column149", "column2": "column249", "column3": "column349"},
					{"column1": "column150", "column2": "column250", "column3": "column350"},
					{"column1": "column151", "column2": "column251", "column3": "column351"},
					{"column1": "column152", "column2": "column252", "column3": "column352"},
					{"column1": "column153", "column2": "column253", "column3": "column353"},
					{"column1": "column154", "column2": "column254", "column3": "column354"},
					{"column1": "column155", "column2": "column255", "column3": "column355"},
					{"column1": "column156", "column2": "column256", "column3": "column356"},
					{"column1": "column157", "column2": "column257", "column3": "column357"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns": [
					{
						"name": "column1",
						"dataType": "number"
					},
					{"name": "column2"}
				],
				"rows": [
					{"column1": "1", "column2": "column21"},
					{"column1": "2", "column2": "column22"},
					{"column1": "3", "column2": "column23"},
					{"column1": "4", "column2": "column24"},
					{"column1": "5", "column2": "column25"},
					{"column1": "6", "column2": "column26"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("ds3");
			dataSet_3.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31", "column4": "column41"},
					{"column1": "column12", "column2": "column22", "column3": "column32", "column4": "column42"},
					{"column1": "column13", "column2": "column23", "column3": "column33", "column4": "column43"}
				]
			});
			app.register(dataSet_3);
			var submission_1 = new cpr.protocols.Submission("sms1");
			app.register(submission_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
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
								cell.control = (function(){
									var inputBox_1 = new cpr.controls.InputBox("ipb1");
									inputBox_1.userAttr({"required": "Y"});
									inputBox_1.bind("value").toDataColumn("column1");
									return inputBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "column2";
								cell.control = (function(){
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.bind("value").toDataColumn("column2");
									return inputBox_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column3";
								cell.control = (function(){
									var inputBox_3 = new cpr.controls.InputBox("ipb3");
									inputBox_3.bind("value").toDataColumn("column3");
									return inputBox_3;
								})();
							}
						}
					]
				}
			});
			if(typeof onGrd1BeforeEditrowChange == "function") {
				grid_1.addEventListener("before-editrow-change", onGrd1BeforeEditrowChange);
			}
			if(typeof onGrd1BeforeUpdate == "function") {
				grid_1.addEventListener("before-update", onGrd1BeforeUpdate);
			}
			if(typeof onGrd1BeforeSelectionChange == "function") {
				grid_1.addEventListener("before-selection-change", onGrd1BeforeSelectionChange);
			}
			if(typeof onGrd1Blur == "function") {
				grid_1.addEventListener("blur", onGrd1Blur);
			}
			if(typeof onGrd1Click == "function") {
				grid_1.addEventListener("click", onGrd1Click);
			}
			container.addChild(grid_1, {
				"top": "48px",
				"right": "20px",
				"bottom": "20px",
				"left": "184px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click2 == "function") {
				button_1.addEventListener("click", onBtn1Click2);
			}
			container.addChild(button_1, {
				"top": "54px",
				"left": "74px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button("btn2");
			button_2.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_2.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_2, {
				"top": "84px",
				"left": "74px",
				"width": "100px",
				"height": "20px"
			});
			if(typeof onBodyClick == "function"){
				app.getContainer().addEventListener("click", onBodyClick);
			}
		}
	});
	app.title = "newTester";
	cpr.core.Platform.INSTANCE.register(app);
})();
