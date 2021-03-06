/*
 * App URI: 202112/FocusTester
 * Source Location: 202112/FocusTester.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202112/FocusTester", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * FocusTester.js
			 * Created at 2021. 12. 3. 오후 5:17:47.
			 *
			 * @author HANS
			 ************************************************/
			var isIE = (cpr.core.Platform.INSTANCE.browserInfo.name == "ie");
			
			window.addEventListener("focusin", function(ev){
				if(document.body == ev.relatedTarget){
					
					ev.preventDefault();
					app.lookup("ipb2").focus();
					
				} else {
					
					if(ev.relatedTarget == null || ev.relatedTarget == undefined) {
						
						ev.preventDefault();
						
						var a = app.lookup("ipb2");
						console.log(a.uuid);
						var b = document.getElementById("uuid-"+a.uuid);
						console.log(b);
						var c = b.lastChild.lastChild;
						console.log(c);
						c.focus();
						
			//			console.log("WINDOW FOCUSIN OCCURED");
			//			console.log(ev);
			//			app.lookup("ipb2").focus();
						return false;
					}
				}
			},true);
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
				"top": "20px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var inputBox_1 = new cpr.controls.InputBox("ipb1");
			container.addChild(inputBox_1, {
				"top": "50px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
			container.addChild(numberEditor_1, {
				"top": "80px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var inputBox_2 = new cpr.controls.InputBox("ipb2");
			container.addChild(inputBox_2, {
				"top": "50px",
				"left": "130px",
				"width": "100px",
				"height": "20px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			if(typeof onBodyFocusin == "function"){
				app.getContainer().addEventListener("focusin", onBodyFocusin);
			}
			if(typeof onBodyFocusout == "function"){
				app.getContainer().addEventListener("focusout", onBodyFocusout);
			}
		}
	});
	app.title = "FocusTester";
	cpr.core.Platform.INSTANCE.register(app);
})();
