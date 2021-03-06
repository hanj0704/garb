/*
 * App URI: 202108/tabTest
 * Source Location: 202108/tabTest.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202108/tabTest", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * tabTest.js
			 * Created at 2021. 8. 25. 오후 2:12:26.
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
				
				
				var mdi = app.lookup("mdi1");
				var tabs = mdi.getTabItems();
				mdi.setSelectedTabItem(tabs[2]);
			};
			// End - User Script
			
			// Header
			
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
			var mDIFolder_1 = new cpr.controls.MDIFolder("mdi1");
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "checkboxGroupSample.clx";
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
				cpr.core.App.load("202108/checkboxGroupSample", function(app) {
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
				tabItem_2.text = "checkboxGrpSample.clx";
				var embeddedApp_2 = new cpr.controls.EmbeddedApp("ea2");
				cpr.core.App.load("202108/checkboxGrpSample", function(app) {
					if(app){
						embeddedApp_2.app = app;
					}
				});
				tabItem_2.content = embeddedApp_2;
				return tabItem_2;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_2);
			
			var tabItem_3 = (function(tabFolder){
				var tabItem_3 = new cpr.controls.TabItem();
				tabItem_3.text = "comboTest.clx";
				var embeddedApp_3 = new cpr.controls.EmbeddedApp("ea3");
				cpr.core.App.load("202108/comboTest", function(app) {
					if(app){
						embeddedApp_3.app = app;
					}
				});
				tabItem_3.content = embeddedApp_3;
				return tabItem_3;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_3);
			mDIFolder_1.setSelectedTabItem(tabItem_1);
			container.addChild(mDIFolder_1, {
				"top": "57px",
				"left": "20px",
				"width": "850px",
				"height": "369px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "20px",
				"left": "20px",
				"width": "140px",
				"height": "27px"
			});
		}
	});
	app.title = "tabTest";
	cpr.core.Platform.INSTANCE.register(app);
})();
