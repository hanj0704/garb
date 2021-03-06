/*
 * App URI: 202107/embApp
 * Source Location: 202107/embApp.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202107/embApp", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * embApp.js
			 * Created at 2021. 7. 19. 오후 2:46:20.
			 *
			 * @author HANS
			 ************************************************/
			
			var isExpanded = false;
			
			/*
			 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				var a = !app.lookup("복지지도").getAppProperty("expanded");
				console.log(a);
				app.lookup("복지지도").setAppProperty("expanded", a);
				
			}
			
			
			/*
			 * "▶" 버튼(btnOpen)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnOpenClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnOpen = e.control;
				var vcGrpCont = app.getContainer();
				var vcGrpMenuWrap = app.lookup("grpMenuWrap");
				var vcGrpMenu = app.lookup("grpMenu");
				
				if (isExpanded) {
			//		var animator = new cpr.animation.Animator(0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
			//		animator.addTask(function() {
						vcGrpCont.updateConstraint(vcGrpMenuWrap, {width: "19px"});
						
			//			vcGrpMenuWrap.style.animateTo({
			//				"width" : "19px"
			//			}, 0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
			//		});
					
			//		animator.run().then(function() {
						isExpanded = !isExpanded;
						
			//			vcGrpMenu.visible = false;
						
						btnOpen.value = "▶";
			//			btnOpen.style.addClass("open");
			//			if (btnOpen.style.hasClass("close")) {
			//				btnOpen.style.removeClass("close");
			//			}
			//		});
				} else {
			//		var animator = new cpr.animation.Animator(0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
			//	vcGrpMenu.visible = true;
			//		animator.addTask(function() {
						vcGrpCont.updateConstraint(vcGrpMenuWrap, {width: "401px"});
						
			//			vcGrpMenuWrap.style.animateTo({
			//				"width" : "401px"
			//			}, 0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
			//		});
			//		
			//		animator.run().then(function() {
						isExpanded = !isExpanded;
						
						
						
						btnOpen.value = "◀";
						vcGrpCont.addEventListenerOnce("transitionend", function(){
							console.log("ㅋㅅㅋ");
						})
			//			btnOpen.style.addClass("close");
			//			if (btnOpen.style.hasClass("open")) {
			//				btnOpen.style.removeClass("open");
			//			}
			//		});
				}
			}
			
			
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				var vcGrpCont = app.getContainer();
				var vcGrpMenuWrap = app.lookup("복지지도");
				
				
				vcGrpCont.floatControl(vcGrpMenuWrap, {
					top: "0px",
					bottom: "0px",
					left:  "0px",
					width: "19px"
				});
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
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("복지지도");
			embeddedApp_1.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "black",
				"border-left-style" : "solid",
				"border-right-width" : "1px",
				"border-bottom-width" : "1px",
				"border-left-color" : "black",
				"border-top-color" : "black",
				"border-bottom-style" : "solid",
				"border-right-color" : "black",
				"border-left-width" : "1px",
				"border-top-style" : "solid"
			});
			cpr.core.App.load("202107/tester", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"width": "34px",
				"height": "230px"
			});
			
			var output_1 = new cpr.controls.Output("opt1");
			output_1.value = "Output";
			container.addChild(output_1, {
				"width": "26px",
				"height": "127px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"width": "143px",
				"height": "87px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "embApp";
	cpr.core.Platform.INSTANCE.register(app);
})();
