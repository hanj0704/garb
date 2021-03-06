/*
 * App URI: 202102/tester25
 * Source Location: 202102/tester25.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202102/tester25", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * tester25.js
			 * Created at 2021. 2. 25. 오전 10:55:52.
			 *
			 * @author HANS
			 ************************************************/
			
			cpr.core.AppConfig.INSTANCE.setControlValue("container", {
					"useCustomScrollbar" : true
			});
			
			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(/* cpr.events.CEvent */ e){
			}
			
			
			
			/*
			 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				var start = moment("202102","YYYYMM").startOf('month');
				var daystart = start.day();
				console.log(daystart);
				var end = moment("202102","YYYYMM").endOf("month");
				var dayend = end.day();
				console.log(dayend);
			//	var dem = moment("20210207","YYYYMMDD").day();
			//	console.log(dem);
				
				var firstweekdayLen = 7-daystart;
				var endweekdayLen = dayend +1;
				console.log(firstweekdayLen);
				console.log(endweekdayLen);
				
				var dayLeng = end.diff(start,"days")+1;
				console.log(dayLeng);
				var a = dayLeng - firstweekdayLen - endweekdayLen;
				console.log(a);
				var b = a/7;
				
				var leng = b;
				
				var cont = new cpr.controls.Container();
				var lay = new cpr.controls.layouts.FormLayout();
				
				lay.setColumns([firstweekdayLen+"fr"]);
				
				for(var i = 0 ; i < leng ; i++) {
					
					lay.insertColumns(["7fr"]);
				}
				lay.insertColumns([endweekdayLen+"fr"]);
				
				lay.setRows(["30px"]);
				lay.verticalSeparatorWidth = 1;
				lay.horizontalSeparatorWidth = 1
				cont.setLayout(lay);
				
				cont.style.css("border","solid 1px black");
				
				app.floatControl(cont,{
					top :  "100px",
					left : "100px",
					width: "300px",
					height:"32px"
				});
				
				console.log(lay.getColumns());
					
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
				var start = moment("202110","YYYYMM").startOf('month');
				var daystart = start.day();
				console.log(daystart);
				var end = moment("202110","YYYYMM").endOf("month");
				var dayend = end.day();
				console.log(dayend);
				var firstweekdayLen = 7-daystart;
				var endweekdayLen = dayend +1;
				console.log(firstweekdayLen);
				console.log(endweekdayLen);
				
				var dayLeng = end.diff(start,"days")+1;
				console.log(dayLeng);
				var a = dayLeng - firstweekdayLen - endweekdayLen;
				console.log(a);
				var b = a/7;
				
				var leng = b;
				
				var cont = app.lookup("grpZone2");
				var lay = cont.getLayout();
				
				lay.setColumns([firstweekdayLen+"fr"]);
				
				for(var i = 0 ; i < leng ; i++) {
					
					lay.insertColumns(["7fr"]);
				}
				lay.insertColumns([endweekdayLen+"fr"]);
				
				lay.verticalSeparatorWidth = 1;
				lay.horizontalSeparatorWidth = 1
				cont.setLayout(lay);
				
				console.log(lay.getColumns());
					
			}
			
			
			/*
			 * "Output" 아웃풋(opt1)에서 mouseenter 이벤트 발생 시 호출.
			 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
			 */
			function onOpt1Mouseenter(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Output
				 */
				var opt1 = e.control;
				
				console.log("mouseEnder");
			}
			
			
			/*
			 * 그리드에서 cell-mouseover 이벤트 발생 시 호출.
			 * Grid의 Cell mouseover시 발생하는 이벤트.
			 */
			function onGrd1CellMouseover(/* cpr.events.CGridMouseEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grd1 = e.control;
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
					{"column1": "column14", "column2": "column24", "column3": "column34"}
				]
			});
			app.register(dataSet_1);
			
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
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "9px",
				"left": "9px",
				"width": "100px",
				"height": "20px"
			});
			
			var group_1 = new cpr.controls.Container("grpZone2");
			group_1.style.setClasses(["calendar-header"]);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.setColumns(["7fr", "7fr", "7fr", "7fr", "7fr"]);
			formLayout_1.setRows(["30px", "30px"]);
			formLayout_1.setUseRowShade(0, true);
			formLayout_1.setUseRowShade(1, true);
			group_1.setLayout(formLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container("grp16");
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "0px";
				formLayout_2.rightMargin = "0px";
				formLayout_2.bottomMargin = "0px";
				formLayout_2.leftMargin = "0px";
				formLayout_2.horizontalSpacing = "0px";
				formLayout_2.verticalSpacing = "0px";
				formLayout_2.setColumns(["24px", "1fr", "24px"]);
				formLayout_2.setRows(["1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var button_2 = new cpr.controls.Button("btn2");
					button_2.icon = "../theme/images/controls/button/icon-arrow-left-s-line.svg";
					button_2.style.setClasses(["btn-prev", "btn-transparent"]);
					container.addChild(button_2, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var button_3 = new cpr.controls.Button("btn3");
					button_3.value = ">";
					button_3.icon = "../theme/images/controls/button/icon-arrow-right-s-line.svg";
					button_3.style.setClasses(["btn-next", "btn-transparent"]);
					container.addChild(button_3, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var output_1 = new cpr.controls.Output("optMonth");
					output_1.value = "1";
					output_1.dataType = "date";
					output_1.dateValueFormat = "M";
					output_1.format = "M";
					output_1.displayExp = "value + \"월\"";
					output_1.style.css({
						"text-align" : "center"
					});
					container.addChild(output_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 5,
					"rowSpan": 1
				});
				var output_2 = new cpr.controls.Output("optWeek1");
				output_2.value = "1주";
				output_2.style.css({
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_3 = new cpr.controls.Output("optWeek2");
				output_3.value = "2주";
				output_3.style.css({
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var output_4 = new cpr.controls.Output("optWeek3");
				output_4.value = "3주";
				output_4.style.css({
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var output_5 = new cpr.controls.Output("optWeek4");
				output_5.value = "4주";
				output_5.style.css({
					"text-align" : "center"
				});
				container.addChild(output_5, {
					"colIndex": 3,
					"rowIndex": 1
				});
				var output_6 = new cpr.controls.Output("optWeek5");
				output_6.value = "5주";
				output_6.style.css({
					"text-align" : "center"
				});
				container.addChild(output_6, {
					"colIndex": 4,
					"rowIndex": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "9px",
				"left": "130px",
				"width": "713px",
				"height": "60px"
			});
			
			var button_4 = new cpr.controls.Button("btn4");
			button_4.value = "Button";
			if(typeof onBtn4Click == "function") {
				button_4.addEventListener("click", onBtn4Click);
			}
			container.addChild(button_4, {
				"top": "49px",
				"left": "9px",
				"width": "100px",
				"height": "20px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("ds1"),
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
								cell.control = (function(){
									var output_7 = new cpr.controls.Output("opt1");
									output_7.value = "Output";
									if(typeof onOpt1Mouseenter == "function") {
										output_7.addEventListener("mouseenter", onOpt1Mouseenter);
									}
									output_7.bind("value").toDataColumn("column1");
									return output_7;
								})();
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
			if(typeof onGrd1CellMouseover == "function") {
				grid_1.addEventListener("cell-mouseover", onGrd1CellMouseover);
			}
			container.addChild(grid_1, {
				"top": "106px",
				"left": "90px",
				"width": "615px",
				"height": "330px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "tester25";
	cpr.core.Platform.INSTANCE.register(app);
})();
