/*
 * App URI: 202102/sj/emb1
 * Source Location: 202102/sj/emb1.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202102/sj/emb1", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * emb1.js
			 * Created at 2021. 2. 8. 오전 10:24:46.
			 *
			 * @author csj
			 ************************************************/
			
			
			
			
			
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				
				var initValue = app.getHost().initValue;
				if (initValue) {
					console.log(initValue);
					app.getAllDataControls().forEach(function(each, idx) {
						console.log(each.type);
						if(each.type == "datamap"){
							/** @type cpr.data.DataMap */
							var dataMap = initValue[idx];
							dataMap.copyToDataMap(each);
						}else if(each.type == "dataset"){
							
						}
					});
				}
				
			}
			
			
			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(/* cpr.events.CEvent */ e){
				
			};
			// End - User Script
			
			// Header
			app.declareAppProperty("appId", null);
			app.declareAppProperty("data", null);
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "column1",
						"defaultValue": ""
					},
					{
						"name": "column2",
						"defaultValue": ""
					}
				]
			});
			app.register(dataMap_1);
			
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
			var image_1 = new cpr.controls.Image();
			image_1.src = "202010/EK6rb7qWoAEyBCq.jpg";
			(function(image_1){
			})(image_1);
			container.addChild(image_1, {
				"top": "93px",
				"right": "10px",
				"bottom": "13px",
				"left": "10px"
			});
			
			var group_1 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "5px";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "5px";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.bind("value").toDataMap(app.lookup("dm1"), "column1");
				container.addChild(inputBox_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				inputBox_2.bind("value").toDataMap(app.lookup("dm1"), "column2");
				container.addChild(inputBox_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"right": "20px",
				"left": "20px",
				"height": "61px"
			});
			if(typeof onBodyPropertyChange == "function"){
				app.addEventListener("property-change", onBodyPropertyChange);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "emb1";
	cpr.core.Platform.INSTANCE.register(app);
})();
