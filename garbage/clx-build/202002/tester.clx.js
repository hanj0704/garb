/*
 * App URI: 202002/tester
 * Source Location: 202002/tester.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202002/tester", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			///************************************************
			// * tester.js
			// * Created at 2020. 2. 3. 오후 4:56:00.
			// *
			// * @author HANS
			// ************************************************/
			//
			//var util = createCommonUtil();
			//
			//cpr.events.EventBus.INSTANCE.addFilter("before-selection-change", function(/* cpr.events.CSelectionEvent */e){
			//	var controls = e.control;
			//	
			//	if(controls.userAttr("check-before")) {
			//		
			//		if(e.oldSelection.text == "newTester") {
			//			console.log(e.oldSelection.content.getAppInstance());
			//			
			//			var aa = e.oldSelection.content.getAppInstance()
			//			console.log(aa);
			//				console.log(aa.lookup("grd1"));
			///** @type cpr.controls.Grid */
			//			var grd = aa.lookup("grd1");
			//			
			//			if(grd.getEditRowIndex()) {
			//				e.preventDefault();
			//				alert("경고");
			//			}
			//		}
			//	
			//	}
			//	
			//});
			//
			//
			//var summerNote ="";	
			//var rects = null;
			//function _createSlash(x,y) {
			//	var snippet = new cpr.controls.HTMLSnippet();
			//	snippet.style.addClass("slash");
			//	snippet.value ='<svg width="200" height="200">'
			//	 + '<line x1="200" y1="0" x2="0" y2="200" style="stroke:rgb(255,0,0);stroke-width:1"/>'
			//	  + '</svg>';
			//	  
			//	  return snippet;
			//}
			//
			///*
			// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
			//	/** 
			//	 * @type cpr.controls.Button
			//	 */
			//	var btn1 = e.control;
			//	
			////	var a = _createSlash(100, 100);
			////	
			////	app.getContainer().addChild(a, {
			////		"left" : "0px",
			////		"top" : "0px",
			////		"width" : "200px",
			////		"height": "200px"
			////	});
			//	var a = moment().toDate();
			//	console.log(a);
			//	app.lookup("btn1").value = a;
			//}
			//
			//
			///*
			// * Body에서 load 이벤트 발생 시 호출.
			// * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			// */
			//function onBodyLoad(/* cpr.events.CEvent */ e){
			////	var container = app.lookup("grp1");
			////	rects = container.getActualRect();
			////	console.log(rects);
			////	var event = new cpr.events.CUIEvent("container-resize");
			//	
			////	window.addEventListener("resize", function(e){
			////	
			////		if(container.getActualRect().width != rects.width) {
			////			
			////			rects = container.getActualRect();
			//////			app.dispatchEvent(event); 
			////		}
			////	});
			//	
			//
			////	var res = new cpr.events.resize.ResizeObserver(function(e){
			////		console.log("lol");
			////	});
			////	var cont = app.getContainer();
			////	console.log(cont.uuid);
			////	res.observe(document.getElementById("uuid-"+cont.uuid));
			//
			//}
			///*
			// * 쉘에서 load 이벤트 발생 시 호출.
			// */
			//function onShl1Load(/* cpr.events.CUIEvent */ e){
			//	/** 
			//	 * @type cpr.controls.UIControlShell
			//	 */
			//	var shl1 = e.control;
			//	summerNote = document.createElement("div");
			//	summerNote.setAttribute("id", "summer");
			//	e.content.appendChild(summerNote);
			//
			//	$(document).ready(function() {
			//		$("#summer").summernote({
			//			height: 400,
			//			lang: "ko-KR"
			//		});
			//	});
			//}
			//
			//
			//
			///*
			// * "초기화" 버튼(btn2)에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBtn2Click(/* cpr.events.CMouseEvent */ e){
			//	/** 
			//	 * @type cpr.controls.Button
			//	 */
			//	var btn2 = e.control;
			////	app.lookup("cmb1").value = "value2";
			////	app.lookup("cmb1").selectItemByValue();
			////	app.lookup("cbx1").checked = true;
			////	app.lookup("cbx1").value = app.lookup("cbx1").trueValue;
			////	console.log(app.lookup("cbx1").value);
			//	
			//}
			//
			//
			///*
			// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBtn1Click(/* cpr.events.CMouseEvent */ e){
			//	/** 
			//	 * @type cpr.controls.Button
			//	 */
			//	var btn1 = e.control;
			//	
			//	console.log(app.lookup("ds2").getValue(0, "column1"));
			//}
			//
			//
			///*
			// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBtn1Click3(/* cpr.events.CMouseEvent */ e){
			//	/** 
			//	 * @type cpr.controls.Button
			//	 */
			//	var btn1 = e.control;
			//	app.lookup("cbx1").checked = true;
			//}
			//
			//
			//
			//
			///*
			// * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
			//	/** 
			//	 * @type cpr.controls.Button
			//	 */
			//	var btn2 = e.control;
			//}
			//
			//
			///*
			// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBtn1Click4(/* cpr.events.CMouseEvent */ e){
			//	/** 
			//	 * @type cpr.controls.Button
			//	 */
			//	var btn1 = e.control;
			//	
			//}
			//
			//
			//
			//var a = "5";
			//
			///*
			// * 임베디드 페이지에서 load 이벤트 발생 시 호출.
			// * 페이지의 Load가 완료되었을 때 호출되는 Event.
			// */
			//function onEp1Load(/* cpr.events.CEvent */ e){
			//	/** 
			//	 * @type cpr.controls.EmbeddedPage
			//	 */
			//	var ep1 = e.control;
			//
			//	ep1.setPageProperty("_pageNm", "../Untitled");
			//	ep1.callPageMethod("callPageTransition");
			//}
			//
			//
			///*
			// * Body에서 click 이벤트 발생 시 호출.
			// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			// */
			//function onBodyClick(/* cpr.events.CMouseEvent */ e){
			//	
			//	var item = app.lookup("mdi3").getSelectedTabItem();
			//	
			///** @type cpr.controls.Grid */
			//	var grid = item.content.getAppInstance().lookup("grd1");
			//	
			//	//업데이트 된 행이 있는지, 편집중인 행이 있는지
			//	//util.validate(item.content.app, "grd1");
			//	
			////	if(util.validate(grid1)) {
			////		comfirm("저장하지않은행이있습니다 저장할까요? " , "확이;ㄴ","취소");
			////	} 
			//}
			//
			//
			///*
			// * MDI 폴더에서 before-selection-change 이벤트 발생 시 호출.
			// * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
			// */
			//function onMdi1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
			//	/** 
			//	 * @type cpr.controls.MDIFolder
			//	 */
			//	var mdi1 = e.control;
			//}
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "label1", "value": "value1"},
					{"label": "label2", "value": "value2"},
					{"label": "label3", "value": "value3"},
					{"label": "label4", "value": "value4"},
					{"label": "label5", "value": "value5"},
					{"label": "label6", "value": "value6"},
					{"label": "label7", "value": "value7"},
					{"label": "label8", "value": "value8"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"}
				],
				"rows": [{"column1": "value1", "column2": "column21", "column3": "column31"}]
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
			xYLayout_1.animationDuration = 0.35;
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			container.addChild(button_1, {
				"top": "82px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.userAttr({"check-before": "true"});
			grid_1.init({
				"dataSet": app.lookup("ds1"),
				"columns": [
					{"width": "100px"},
					{"width": "100px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.targetColumnName = "label";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "label";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.targetColumnName = "value";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "value";
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
								cell.columnName = "label";
								cell.control = (function(){
									var inputBox_1 = new cpr.controls.InputBox("ipb1");
									inputBox_1.bind("value").toDataColumn("label");
									return inputBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "value";
								cell.control = (function(){
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.bind("value").toDataColumn("value");
									return inputBox_2;
								})();
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "112px",
				"left": "20px",
				"width": "326px",
				"height": "315px"
			});
			
			var mDIFolder_1 = new cpr.controls.MDIFolder("mdi3");
			mDIFolder_1.userAttr({"check-before": "true"});
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "newTester";
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
				cpr.core.App.load("202003/newTester", function(app) {
					if(app){
						embeddedApp_1.app = app;
					}
				});
				tabItem_1.content = embeddedApp_1;
				return tabItem_1;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_1);
			
			var tabItem_2 = (function(tabFolder){
				var tabItem_2 = new cpr.controls.TabItem();
				tabItem_2.text = "page01";
				var embeddedApp_2 = new cpr.controls.EmbeddedApp("ea2");
				cpr.core.App.load("202002/awer31qe32eqwd", function(app) {
					if(app){
						embeddedApp_2.app = app;
					}
				});
				tabItem_2.content = embeddedApp_2;
				return tabItem_2;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_2);
			mDIFolder_1.setSelectedTabItem(tabItem_1);
			if(typeof onMdi1BeforeSelectionChange == "function") {
				mDIFolder_1.addEventListener("before-selection-change", onMdi1BeforeSelectionChange);
			}
			container.addChild(mDIFolder_1, {
				"top": "112px",
				"left": "356px",
				"width": "648px",
				"height": "315px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			if(typeof onBodyClick == "function"){
				app.getContainer().addEventListener("click", onBodyClick);
			}
		}
	});
	app.title = "tester";
	cpr.core.Platform.INSTANCE.register(app);
})();
