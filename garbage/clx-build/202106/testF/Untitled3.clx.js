/*
 * App URI: 202106/testF/Untitled3
 * Source Location: 202106/testF/Untitled3.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202106/testF/Untitled3", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Untitled3.js
			 * Created at 2021. 6. 22. 오후 2:43:40.
			 *
			 * @author HANS
			 ************************************************/
			
			exports.clear = function(){
				clearInterval(inte);
			}
			
			exports.startInte = function(){
				onBodyLoad();
			}
			var inte;
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				
				inte = setInterval(function(){
					console.log("UNTITLE3");
				}, 1000)
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
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "3";
			container.addChild(button_1, {
				"top": "6px",
				"left": "107px",
				"width": "100px",
				"height": "20px"
			});
			
			var tabFolder_1 = new cpr.controls.TabFolder();
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "tab1";
				var group_1 = new cpr.controls.Container("grp1");
				// Layout
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_1.setLayout(xYLayout_2);
				(function(container){
					var button_2 = new cpr.controls.Button("btn2");
					button_2.value = "Button";
					container.addChild(button_2, {
						"top": "64px",
						"left": "52px",
						"width": "100px",
						"height": "20px"
					});
					var button_3 = new cpr.controls.Button("btn3");
					button_3.value = "Button";
					container.addChild(button_3, {
						"top": "126px",
						"left": "62px",
						"width": "100px",
						"height": "20px"
					});
					var button_4 = new cpr.controls.Button("btn4");
					button_4.value = "Button";
					container.addChild(button_4, {
						"top": "171px",
						"left": "123px",
						"width": "100px",
						"height": "20px"
					});
					var button_5 = new cpr.controls.Button("btn5");
					button_5.value = "Button";
					container.addChild(button_5, {
						"top": "171px",
						"left": "233px",
						"width": "100px",
						"height": "20px"
					});
					var button_6 = new cpr.controls.Button("btn6");
					button_6.value = "Button";
					container.addChild(button_6, {
						"top": "107px",
						"left": "267px",
						"width": "100px",
						"height": "20px"
					});
				})(group_1);
				tabItem_1.content = group_1;
				return tabItem_1;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_1);
			
			var tabItem_2 = (function(tabFolder){
				var tabItem_2 = new cpr.controls.TabItem();
				tabItem_2.text = "tab 2";
				var group_2 = new cpr.controls.Container("grp2");
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var button_7 = new cpr.controls.Button("btn7");
					button_7.value = "Button";
					container.addChild(button_7, {
						"top": "139px",
						"left": "131px",
						"width": "100px",
						"height": "20px"
					});
					var button_8 = new cpr.controls.Button("btn8");
					button_8.value = "Button";
					container.addChild(button_8, {
						"top": "149px",
						"left": "454px",
						"width": "100px",
						"height": "20px"
					});
					var button_9 = new cpr.controls.Button("btn9");
					button_9.value = "Button";
					container.addChild(button_9, {
						"top": "260px",
						"left": "214px",
						"width": "100px",
						"height": "20px"
					});
					var button_10 = new cpr.controls.Button("btn10");
					button_10.value = "Button";
					container.addChild(button_10, {
						"top": "260px",
						"left": "212px",
						"width": "100px",
						"height": "20px"
					});
					var button_11 = new cpr.controls.Button("btn11");
					button_11.value = "Button";
					container.addChild(button_11, {
						"top": "93px",
						"left": "263px",
						"width": "100px",
						"height": "20px"
					});
					var button_12 = new cpr.controls.Button("btn12");
					button_12.value = "Button";
					container.addChild(button_12, {
						"top": "216px",
						"left": "334px",
						"width": "100px",
						"height": "20px"
					});
					var button_13 = new cpr.controls.Button("btn13");
					button_13.value = "Button";
					container.addChild(button_13, {
						"top": "158px",
						"left": "283px",
						"width": "100px",
						"height": "20px"
					});
				})(group_2);
				tabItem_2.content = group_2;
				return tabItem_2;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_2);
			
			var tabItem_3 = (function(tabFolder){
				var tabItem_3 = new cpr.controls.TabItem();
				tabItem_3.text = "tab 3";
				var group_3 = new cpr.controls.Container("grp3");
				// Layout
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var button_14 = new cpr.controls.Button("btn14");
					button_14.value = "Button";
					container.addChild(button_14, {
						"top": "78px",
						"left": "151px",
						"width": "100px",
						"height": "20px"
					});
					var button_15 = new cpr.controls.Button("btn15");
					button_15.value = "Button";
					container.addChild(button_15, {
						"top": "145px",
						"left": "132px",
						"width": "100px",
						"height": "20px"
					});
					var button_16 = new cpr.controls.Button("btn16");
					button_16.value = "Button";
					container.addChild(button_16, {
						"top": "164px",
						"left": "132px",
						"width": "100px",
						"height": "20px"
					});
					var button_17 = new cpr.controls.Button("btn17");
					button_17.value = "Button";
					container.addChild(button_17, {
						"top": "236px",
						"left": "222px",
						"width": "10px",
						"height": "10px"
					});
					var button_18 = new cpr.controls.Button("btn18");
					button_18.value = "Button";
					container.addChild(button_18, {
						"top": "245px",
						"left": "296px",
						"width": "100px",
						"height": "20px"
					});
					var button_19 = new cpr.controls.Button("btn19");
					button_19.value = "Button";
					container.addChild(button_19, {
						"top": "156px",
						"left": "335px",
						"width": "100px",
						"height": "20px"
					});
				})(group_3);
				tabItem_3.content = group_3;
				return tabItem_3;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_3);
			
			var tabItem_4 = (function(tabFolder){
				var tabItem_4 = new cpr.controls.TabItem();
				tabItem_4.text = "tab 4";
				var group_4 = new cpr.controls.Container("grp4");
				// Layout
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
					var button_20 = new cpr.controls.Button("btn20");
					button_20.value = "Button";
					container.addChild(button_20, {
						"top": "76px",
						"left": "409px",
						"width": "100px",
						"height": "20px"
					});
					var button_21 = new cpr.controls.Button("btn21");
					button_21.value = "Button";
					container.addChild(button_21, {
						"top": "106px",
						"left": "428px",
						"width": "100px",
						"height": "20px"
					});
					var button_22 = new cpr.controls.Button("btn22");
					button_22.value = "Button";
					container.addChild(button_22, {
						"top": "125px",
						"left": "435px",
						"width": "12px",
						"height": "10px"
					});
					var button_23 = new cpr.controls.Button("btn23");
					button_23.value = "Button";
					container.addChild(button_23, {
						"top": "168px",
						"left": "495px",
						"width": "14px",
						"height": "12px"
					});
					var button_24 = new cpr.controls.Button("btn24");
					button_24.value = "Button";
					container.addChild(button_24, {
						"top": "190px",
						"left": "519px",
						"width": "10px",
						"height": "10px"
					});
					var button_25 = new cpr.controls.Button("btn25");
					button_25.value = "Button";
					container.addChild(button_25, {
						"top": "210px",
						"left": "538px",
						"width": "17px",
						"height": "21px"
					});
					var button_26 = new cpr.controls.Button("btn26");
					button_26.value = "Button";
					container.addChild(button_26, {
						"top": "241px",
						"left": "565px",
						"width": "10px",
						"height": "21px"
					});
					var button_27 = new cpr.controls.Button("btn27");
					button_27.value = "Button";
					container.addChild(button_27, {
						"top": "272px",
						"left": "574px",
						"width": "10px",
						"height": "11px"
					});
					var button_28 = new cpr.controls.Button("btn28");
					button_28.value = "Button";
					container.addChild(button_28, {
						"top": "282px",
						"left": "583px",
						"width": "100px",
						"height": "20px"
					});
				})(group_4);
				tabItem_4.content = group_4;
				return tabItem_4;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_4);
			
			var tabItem_5 = (function(tabFolder){
				var tabItem_5 = new cpr.controls.TabItem();
				tabItem_5.text = "tab 5";
				var group_5 = new cpr.controls.Container("grp5");
				// Layout
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
				(function(container){
					var button_29 = new cpr.controls.Button("btn29");
					button_29.value = "Button";
					container.addChild(button_29, {
						"top": "55px",
						"left": "783px",
						"width": "100px",
						"height": "20px"
					});
					var button_30 = new cpr.controls.Button("btn30");
					button_30.value = "Button";
					container.addChild(button_30, {
						"top": "85px",
						"left": "716px",
						"width": "15px",
						"height": "20px"
					});
					var button_31 = new cpr.controls.Button("btn31");
					button_31.value = "Button";
					container.addChild(button_31, {
						"top": "115px",
						"left": "693px",
						"width": "13px",
						"height": "16px"
					});
					var button_32 = new cpr.controls.Button("btn32");
					button_32.value = "Button";
					container.addChild(button_32, {
						"top": "141px",
						"left": "665px",
						"width": "18px",
						"height": "16px"
					});
					var button_33 = new cpr.controls.Button("btn33");
					button_33.value = "Button";
					container.addChild(button_33, {
						"top": "167px",
						"left": "628px",
						"width": "27px",
						"height": "21px"
					});
					var button_34 = new cpr.controls.Button("btn34");
					button_34.value = "Button";
					container.addChild(button_34, {
						"top": "198px",
						"left": "595px",
						"width": "23px",
						"height": "20px"
					});
					var button_35 = new cpr.controls.Button("btn35");
					button_35.value = "Button";
					container.addChild(button_35, {
						"top": "224px",
						"left": "588px",
						"width": "100px",
						"height": "20px"
					});
					var button_36 = new cpr.controls.Button("btn36");
					button_36.value = "Button";
					container.addChild(button_36, {
						"top": "224px",
						"left": "580px",
						"width": "10px",
						"height": "20px"
					});
					var button_37 = new cpr.controls.Button("btn37");
					button_37.value = "Button";
					container.addChild(button_37, {
						"top": "254px",
						"left": "566px",
						"width": "100px",
						"height": "20px"
					});
					var button_38 = new cpr.controls.Button("btn38");
					button_38.value = "Button";
					container.addChild(button_38, {
						"top": "273px",
						"left": "540px",
						"width": "100px",
						"height": "20px"
					});
				})(group_5);
				tabItem_5.content = group_5;
				return tabItem_5;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_5);
			tabFolder_1.setSelectedTabItem(tabItem_1);
			container.addChild(tabFolder_1, {
				"top": "36px",
				"left": "4px",
				"width": "940px",
				"height": "455px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "Untitled3";
	cpr.core.Platform.INSTANCE.register(app);
})();
