/*
 * App URI: 202101/tree1
 * Source Location: 202101/tree1.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202101/tree1", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * tree1.js
			 * Created at 2021. 1. 27. 오후 4:39:17.
			 *
			 * @author HANS
			 ************************************************/;
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
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var output_1 = new cpr.controls.Output("opt1");
			output_1.value = "Output";
			output_1.style.setClasses(["isred"]);
			container.addChild(output_1, {
				"top": "20px",
				"left": "20px",
				"width": "298px",
				"height": "150px"
			});
		}
	});
	app.title = "tree1";
	cpr.core.Platform.INSTANCE.register(app);
})();
