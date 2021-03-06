/*
 * App URI: 202105/dragTest
 * Source Location: 202105/dragTest.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202105/dragTest", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * dragTest.js
			 * Created at 2021. 5. 7. 오전 10:27:21.
			 *
			 * @author HANS
			 ************************************************/
			
			
			
			function listener(e){
				
				console.log(e)
			}
			
			function listener2(e){
				window.removeEventListener("touchmove", listener);
			}
			/*
			 * 그룹에서 touchstart 이벤트 발생 시 호출.
			 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
			 */
			function onGrp1Touchstart(/* cpr.events.CTouchEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grp1 = e.control;
				
				window.addEventListener("touchmove", listener,{passive:false});
				window.addEventListener("touchend", function(){
					window.removeEventListener("touchmove", listener);
				});
			}
			
			
			/*
			 * 그룹에서 touchmove 이벤트 발생 시 호출.
			 * 하나 이상의 터치 포인트가 터치 표면을 따라 이동할 때 발생하는 이벤트.
			 */
			function onGrp1Touchmove(/* cpr.events.CTouchEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grp1 = e.control;
				
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
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grp1");
			// Layout
			var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
			flowLayout_1.lineWrap = false;
			group_1.setLayout(flowLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "Button";
				container.addChild(button_1, {
					"width": "355px",
					"height": "700px"
				});
				var button_2 = new cpr.controls.Button("btn2");
				button_2.value = "Button";
				container.addChild(button_2, {
					"autoSize": "none",
					"width": "355px",
					"height": "700px"
				});
				var button_3 = new cpr.controls.Button("btn3");
				button_3.value = "Button";
				container.addChild(button_3, {
					"autoSize": "none",
					"width": "355px",
					"height": "700px"
				});
				var button_4 = new cpr.controls.Button("btn4");
				button_4.value = "Button";
				container.addChild(button_4, {
					"autoSize": "none",
					"width": "355px",
					"height": "700px"
				});
				var button_5 = new cpr.controls.Button("btn5");
				button_5.value = "Button";
				container.addChild(button_5, {
					"autoSize": "none",
					"width": "355px",
					"height": "700px"
				});
				var button_6 = new cpr.controls.Button("btn6");
				button_6.value = "Button";
				container.addChild(button_6, {
					"autoSize": "none",
					"width": "355px",
					"height": "700px"
				});
				var button_7 = new cpr.controls.Button("btn7");
				button_7.value = "Button";
				container.addChild(button_7, {
					"autoSize": "none",
					"width": "355px",
					"height": "700px"
				});
			})(group_1);
			if(typeof onGrp1Touchstart == "function") {
				group_1.addEventListener("touchstart", onGrp1Touchstart);
			}
			if(typeof onGrp1Touchmove == "function") {
				group_1.addEventListener("touchmove", onGrp1Touchmove);
			}
			container.addChild(group_1, {
				"width": "845px",
				"height": "401px"
			});
		}
	});
	app.title = "dragTest";
	cpr.core.Platform.INSTANCE.register(app);
})();
