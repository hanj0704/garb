/*
 * App URI: 202106/scrollTest
 * Source Location: 202106/scrollTest.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202106/scrollTest", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * scrollTest.js
			 * Created at 2021. 7. 6. 오전 9:53:19.
			 *
			 * @author HANS
			 ************************************************/
			
			
			
			/*
			 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
			 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
			 */
			function onBodyScroll(/* cpr.events.CUIEvent */ e){
				
				var ctr = e.control;
				
			//	console.log(e.control.getActualRect());
			//	console.log(ctr.getOffsetRect());
				console.log(ctr.getViewPortRect());
			//	console.log(ctr.getContentPaneRect());
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
			button_1.value = "Button";
			container.addChild(button_1, {
				"top": "1422px",
				"left": "486px",
				"width": "284px",
				"height": "151px"
			});
			if(typeof onBodyScroll == "function"){
				app.getContainer().addEventListener("scroll", onBodyScroll);
			}
		}
	});
	app.title = "scrollTest";
	cpr.core.Platform.INSTANCE.register(app);
})();
