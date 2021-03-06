/*
 * App URI: 202101/Floating
 * Source Location: 202101/Floating.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202101/Floating", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Floating.js
			 * Created at 2021. 1. 5. 오후 3:41:32.
			 *
			 * @author ryu54
			 ************************************************/
			
			
			
			/*
			 * "플로팅" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				/* 오버레이(레이어) 동적 생성 */
				var vcGrpCvr = new cpr.controls.Container();
				vcGrpCvr.style.css({
					"opacity" : "1",
					"background-color" : "rgba(0,0,0,.25)"
				});
				
				/* 오버레이 내에 어사이드 영역을 붙임 */	
				var vcGrpAsd = app.lookup("grpAside");
				vcGrpCvr.addChild(vcGrpAsd, {
					top : "0px",
					bottom : "0px",
					left : "0px",
					width: "260px"
				});
				
				/* 애니메이션 추가 */
				vcGrpAsd.style.css("opacity", "1");
				vcGrpAsd.style.animateFrom({
					"opacity" : "0",
					"transform" : "translate3d(-10%, 0px, 0px)"
				}, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT);
				
				/* 오버레이 클릭 시 플로팅이 해제되도록 함 */
				vcGrpCvr.addEventListenerOnce("click", function(e){
					var control = e.control;
					
					app.getContainer().insertChild(0, vcGrpAsd, {
						top : "0px",
						bottom : "0px",
						left : "-260px",
						width : "260px"
					});
					
					/* 오버레이 파기 */
					control.dispose();
				});
				
				/* 어사이드 영역을 플로팅 */
				app.floatControl(vcGrpCvr, {
					top : "0px",
					right : "0px",
					bottom : "0px",
					left : "0px"
				});
			}
			
			
			/*
			 * 그룹에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onGrpAsideClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpAside = e.control;
				
				e.stopPropagation();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"},
					{"name": "parent"}
				],
				"rows": [
					{"label": "label1", "value": "value1", "parent": ""},
					{"label": "label2", "value": "value2", "parent": ""},
					{"label": "label3", "value": "value3", "parent": ""},
					{"label": "label4", "value": "value4", "parent": ""},
					{"label": "label5", "value": "value5", "parent": ""},
					{"label": "label6", "value": "value6", "parent": "value1"},
					{"label": "label7", "value": "value7", "parent": "value1"},
					{"label": "label8", "value": "value8", "parent": "value6"},
					{"label": "label9", "value": "value9", "parent": "value2"},
					{"label": "label10", "value": "value10", "parent": "value2"}
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
			var group_1 = new cpr.controls.Container("grpAside");
			group_1.style.setClasses(["aside"]);
			group_1.style.css({
				"background-color" : "#b1c7e3"
			});
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var tree_1 = new cpr.controls.Tree("tre1");
				(function(tree_1){
					tree_1.setItemSet(app.lookup("ds1"), {
						"label": "label",
						"value": "value",
						"parentValue": "parent"
					});
				})(tree_1);
				container.addChild(tree_1, {
					"top": "50px",
					"right": "0px",
					"bottom": "0px",
					"left": "0px"
				});
				var output_1 = new cpr.controls.Output();
				output_1.value = "로고영역";
				container.addChild(output_1, {
					"top": "0px",
					"right": "0px",
					"left": "0px",
					"height": "50px"
				});
			})(group_1);
			if(typeof onGrpAsideClick == "function") {
				group_1.addEventListener("click", onGrpAsideClick);
			}
			container.addChild(group_1, {
				"top": "0px",
				"bottom": "0px",
				"left": "-280px",
				"width": "280px"
			});
			
			var output_2 = new cpr.controls.Output();
			output_2.value = "← 숨겨진 그룹";
			container.addChild(output_2, {
				"top": "20px",
				"right": "130px",
				"left": "20px",
				"height": "20px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "플로팅";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "20px",
				"right": "20px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "Floating";
	cpr.core.Platform.INSTANCE.register(app);
})();
