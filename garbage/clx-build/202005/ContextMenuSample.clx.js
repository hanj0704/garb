/*
 * App URI: 202005/ContextMenuSample
 * Source Location: 202005/ContextMenuSample.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202005/ContextMenuSample", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * ContextMenuSample.js
			 * Created at 2020. 5. 11. 오후 3:14:13.
			 *
			 * @author HANS
			 ************************************************/
			var vcListBox = null;
			
			/*
			 * Body에서 contextmenu 이벤트 발생 시 호출.
			 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
			 */
			function onBodyContextmenu(/* cpr.events.CMouseEvent */ e){
				/* 샘플로 작성된 영역입니다. 마우스 우클릭 이벤트가 필요한 컨트롤(그리드)에서 contextmenu이벤트를 연결해서 사용하시기 바랍니다.
				* body영역으로 작성되었을 경우에는 전체 영역에서 항상 컨텐스트메뉴 이벤트가 발생하므로 주의 바랍니다.
				* ※반드시 body영역에서 작성되어야 하는 이벤트와 함수가 아닙니다.
				* 필요한 컨트롤별로 이벤트 리스너를 작성할 수도 있고, EventBus를 통해 모든 contextmenu이벤트를 catch하고 콜백에서 제어할 수도 있습니다.
				*/
				
				e.preventDefault();
				//운영체제, 브라우저 자체의 우클릭 이벤트 방지를 위함입니다.
				
				if(vcListBox) {
					vcListBox.dispose();
				}/*
				 * 클릭을 누를때 기존에 열려있던 리스트박스를 삭제하기 위한 코드입니다.
				 * 여러 방법이 있습니다. 화면에 미리 리스트박스를 만들어두고, visible처리를 하거나
				 * 이 예제와 같이 contextmenu이벤트가 발생할 때마다 리스트박스를 지우고 새로 그려줄 수 있습니다.
				 */
				
				var vcNewListBox = new cpr.controls.ListBox();
				vcNewListBox.setItemSet(app.lookup("ds1"), {
					"label": "labels",
					"value": "values"
				});
				//데이터셋을 연결하여서 아이템을 구성할 수도 있고, 직접 아이템을 집어넣어줄 수 있습니다(addItem등의 api).
				
				app.getContainer().floatControl(vcNewListBox,{
					"left" : e.clientX+"px",
					"top" : e.clientY+"px",
					"width" : "100px"
				});//height를 입력하지 않아서 높이를 auto로 가져가게 만들어졌습니다. 아이템이 많아서 자동크기가 아니라, 높이를 고정해주어야 할때는 height속성을 지정해야합니다.
				
				vcNewListBox.addEventListener("value-change", function(e){
				//내부 아이템을 선택했을 때 기능에 대한 스크립트 작성 영역이 될 것 같습니다. value-change, selection-change 등등 이벤트로 사용 가능합니다.
					alert(e.control.value);
					app.getContainer().removeChild(e.control);
				});
			
				vcListBox = vcNewListBox;
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "labels"},
					{"name": "values"}
				],
				"rows": [
					{"labels": "복사", "values": "copyValue"},
					{"labels": "삭제", "values": "deleteValue"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsList");
			dataSet_2.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31", "column4": "column41"},
					{"column1": "column12", "column2": "column22", "column3": "column32", "column4": "column42"},
					{"column1": "column13", "column2": "column23", "column3": "column33", "column4": "column43"},
					{"column1": "column14", "column2": "column24", "column3": "column34", "column4": "column44"},
					{"column1": "column15", "column2": "column25", "column3": "column35", "column4": "column45"},
					{"column1": "column16", "column2": "column26", "column3": "column36", "column4": "column46"},
					{"column1": "column17", "column2": "column27", "column3": "column37", "column4": "column47"}
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
				"dataSet": app.lookup("dsList"),
				"columns": [
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
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "20px",
				"left": "20px",
				"width": "512px",
				"height": "306px"
			});
			
			var inputBox_1 = new cpr.controls.InputBox("ipb1");
			container.addChild(inputBox_1, {
				"top": "20px",
				"left": "542px",
				"width": "100px",
				"height": "20px"
			});
			if(typeof onBodyContextmenu == "function"){
				app.getContainer().addEventListener("contextmenu", onBodyContextmenu);
			}
		}
	});
	app.title = "ContextMenuSample";
	cpr.core.Platform.INSTANCE.register(app);
})();
