/*
 * App URI: 202103/Main2
 * Source Location: 202103/Main2.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202103/Main2", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Main.js
			 * Created at 2021. 3. 10. 오전 9:24:44.
			 *
			 * @author HANS
			 ************************************************/
			
			var isMobile = cpr.utils.Util.detectBrowser();
			var startMovement = 0;
			function onMouseMove(e){
			}
			
			function onTouchMove(e){
				var mdi1 = app.lookup("mdi1");
				var sel = mdi1.getSelectedTabItem().itemIndex;
				var delta = e.touches[0];
				var move = delta.clientX;
				if(Math.abs(startMovement - move) > 10) {
					
					if (startMovement - move < 0 && sel > 0){//왼쪽
						var item = mdi1.getTabItems()[sel-1];
						if(app.getFloatingControls().length < 1){
						var	movv = item.content;
						console.log("한번만이라도~");
						app.floatControl(movv,{
							"left": -1*mdi1.getActualRect().width+"px",
							"top" : "45px",
							"width" : mdi1.getActualRect().width+"px",
							"bottom" : "0px"
						});
						
						} else {
							console.log("zz");
							var ri = app.getFloatingControls()[0];
							console.log(ri);
							if (Math.abs(startMovement - move) > 100) {
								window.removeEventListener("touchmove", onTouchMove);
			//					
								ri.style.animateFrom({
									"transform": "translate3d(-270px,0px,0px)"
								});
								app.floatControl(ri, {
									"left" :"0px",
									"top" : "45px",
									"width" : mdi1.getActualRect().width+"px",
									"bottom" : "45px"
								});
								ri.addEventListenerOnce("transitionend", function(e){
									console.log("ㅋㅋ!!");
									mdi1.setSelectedTabItem(item);
									item.content = ri;
								});
							} else {
								console.log(mdi1.getActualRect().right - (startMovement - move));
							app.floatControl(ri, {
								"left" : -1*mdi1.getActualRect().right - (startMovement - move) +"px",
								"top" : "45px",
							"width" : mdi1.getActualRect().width+"px",
							"bottom" : "45px"
							});
							}
						}
					}
					else if(startMovement - move > 0 && sel < mdi1.getTabItems().length -1) {
						
						var item = mdi1.getTabItems()[sel+1];
						if(app.getFloatingControls().length < 1){
						var	movv = item.content;
						console.log("한번만이라도~");
						app.floatControl(movv,{
							"left": mdi1.getActualRect().width+"px",
							"top" : "45px",
							"width" : mdi1.getActualRect().width+"px",
							"bottom" : "0px"
						});
						
						} else {
							var ri = app.getFloatingControls()[0];
							if (startMovement - move > 100) {
								window.removeEventListener("touchmove", onTouchMove);
			//					
								ri.style.animateFrom({
									"transform": "translate3d(270px,0px,0px)"
								});
								app.floatControl(ri, {
									"left" :"0px",
									"top" : "45px",
									"width" : mdi1.getActualRect().width+"px",
									"bottom" : "45px"
								});
								ri.addEventListenerOnce("transitionend", function(e){
									console.log("ㅋㅋ!!");
									mdi1.setSelectedTabItem(item);
									item.content = ri;
								});
							} else {
								console.log(mdi1.getActualRect().right - (startMovement - move));
							app.floatControl(ri, {
								"left" : mdi1.getActualRect().right - (startMovement - move) +"px",
								"top" : "45px",
							"width" : mdi1.getActualRect().width+"px",
							"bottom" : "45px"
							});
							}
						}
					}
				} 
			}
			
			function onTouchEnd(e){
				window.removeEventListener("touchmove", onTouchMove);
				window.removeEventListener("touchend", onTouchEnd);			
							
			}
			/*
			 * MDI 폴더에서 mousedown 이벤트 발생 시 호출.
			 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
			 */
			function onMdi1Mousedown(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.MDIFolder
				 */
				var mdi1 = e.control;
				mdi1.addEventListener("mousemove", onMouseMove);
				mdi1.addEventListenerOnce("mouseup", function(e){
					
					mdi1.removeEventListener("mousemove",onMouseMove);
				});
			}
			
			
			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(/* cpr.events.CEvent */ e){
				
				console.log(isMobile.mobile);
				
				var mdi1 = app.lookup("mdi1");
				remodeling(mdi1);
			//	if(isMobile.mobile) {
			//		mdi1.addEventListener("touchstart", function(e){
			//			startMovement = e.touches[0].clientX;
			//			window.addEventListener("touchmove", onTouchMove);
			//			
			//			window.addEventListener("touchend", function(ev){
			//				window.removeEventListener("touchmove", onTouchMove);
			//			});
			//		});	
			//	}
				
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
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			xYLayout_1.scrollable = false;
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.setClasses(["header"]);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "1fr";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "1fr";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "5px";
			formLayout_1.verticalSpacing = "5px";
			formLayout_1.setColumns(["30px", "1fr", "20px", "30px", "30px"]);
			formLayout_1.setRows(["30px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button();
				button_1.style.setClasses(["btn-nav-toggle"]);
				container.addChild(button_1, {
					"colIndex": 3,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button();
				button_2.style.setClasses(["btn-nav-setting"]);
				container.addChild(button_2, {
					"colIndex": 4,
					"rowIndex": 0
				});
				var button_3 = new cpr.controls.Button();
				button_3.value = "";
				button_3.style.setClasses(["btn-nav-search"]);
				container.addChild(button_3, {
					"colIndex": 0,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"left": "0px",
				"height": "45px"
			});
			
			var mDIFolder_1 = new cpr.controls.MDIFolder("mdi1");
			mDIFolder_1.headerPosition = "bottom";
			mDIFolder_1.itemSizing = "fill";
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "홈";
				var embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
				cpr.core.App.load("scr/Home", function(app) {
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
				tabItem_2.text = "금융";
				var embeddedApp_2 = new cpr.controls.EmbeddedApp("ea2");
				cpr.core.App.load("scr/ministock", function(app) {
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
				tabItem_3.text = "tab 3";
				var group_2 = new cpr.controls.Container("grp1");
				// Layout
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_2);
				(function(container){
					var button_4 = new cpr.controls.Button("btn1");
					button_4.value = "Button";
					container.addChild(button_4, {
						"top": "7px",
						"right": "20px",
						"bottom": "20px",
						"left": "20px"
					});
				})(group_2);
				tabItem_3.content = group_2;
				return tabItem_3;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_3);
			
			var tabItem_4 = (function(tabFolder){
				var tabItem_4 = new cpr.controls.TabItem();
				tabItem_4.text = "tab 4";
				var group_3 = new cpr.controls.Container("grp2");
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_3);
				(function(container){
				})(group_3);
				tabItem_4.content = group_3;
				return tabItem_4;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_4);
			mDIFolder_1.setSelectedTabItem(tabItem_1);
			if(typeof onMdi1Mousedown == "function") {
				mDIFolder_1.addEventListener("mousedown", onMdi1Mousedown);
			}
			container.addChild(mDIFolder_1, {
				"top": "45px",
				"right": "0px",
				"bottom": "0px",
				"left": "0px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "Main2";
	cpr.core.Platform.INSTANCE.register(app);
})();
