/*
 * App URI: 202003/dragTester
 * Source Location: 202003/dragTester.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202003/dragTester", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * dragTester.js
			 * Created at 2020. 3. 11. 오후 1:54:05.
			 *
			 * @author HANS
			 ************************************************/
			
			
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
			
				createDragSource(app.lookup("cbg1"));
				createDropTarget(app.lookup("btn1"));
				createDropTarget(app.lookup("btn2"));
				createDropTarget(app.lookup("btn3"));
				createDropTarget(app.lookup("btn4"));
			}
			function createDragSource(pcDragCtrl) {
				
				var dragSource = new cpr.controls.DragSource(pcDragCtrl, {
				options:{
				  dataType : "text",
				  threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
				},
				onDragStart : function(context){
				  
				},
				onDragMove : function(context){
				},
				onDragEnd : function(context){
				}
			})
			}
			
			function createDropTarget(pcCtrlDrop) {
				
				
				var dropTarget = new cpr.controls.DropTarget(pcCtrlDrop, {
					isImportant : function(source){
						return source.dataType == "text";
					},
					onDragEnter : function(context){
						context.target.control.style.css({
							"border" :"solid 2px orange"
						});
						
						console.log(context.data);
						console.log(context.target.detail);
					},
					onDragLeave: function(context) {
						context.target.control.style.removeStyle("border");
					},
					onDragMove : function(context){
						
					},
					onDrop : function(context){
						var one = vcContainer.getConstraint(context.target.control);
						var two = vcContainer.getConstraint(context.source.control);
						context.target.control.style.removeStyle("border");
						
						vcContainer.updateConstraint(context.source.control,checkConstraint(one));
						vcContainer.updateConstraint(context.target.control,checkConstraint(two));
					}
				});
			}
			
			/*
			 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn3 = e.control;
					app.getContainer().getAllRecursiveChildren().forEach(function(each){
					
					if(each.userAttr("hans")== "Y") {
						each.dispose();
					}
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
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var checkBoxGroup_1 = new cpr.controls.CheckBoxGroup("cbg1");
			checkBoxGroup_1.colCount = 1;
			checkBoxGroup_1.userAttr({"viewClass": "Y"});
			checkBoxGroup_1.style.setClasses(["asda"]);
			checkBoxGroup_1.style.css({
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
			(function(checkBoxGroup_1){
				checkBoxGroup_1.addItem(new cpr.controls.Item("label1", "value1"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("label2", "value2"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("label3", "value3"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("label4", "value4"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("label5", "value5"));
			})(checkBoxGroup_1);
			if(typeof onCbg1ItemClick == "function") {
				checkBoxGroup_1.addEventListener("item-click", onCbg1ItemClick);
			}
			if(typeof onCbg1Click == "function") {
				checkBoxGroup_1.addEventListener("click", onCbg1Click);
			}
			container.addChild(checkBoxGroup_1, {
				"top": "37px",
				"left": "20px",
				"width": "231px",
				"height": "353px"
			});
			
			var group_1 = new cpr.controls.Container("grp1");
			group_1.style.setClasses(["cl-form-group"]);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "5px";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "5px";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.setColumns(["100px", "1fr"]);
			formLayout_1.setUseColumnShade(0, true);
			formLayout_1.setRows(["25px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "Button";
				container.addChild(button_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button("btn2");
				button_2.value = "Button";
				container.addChild(button_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var button_3 = new cpr.controls.Button("btn3");
				button_3.value = "Button";
				if(typeof onBtn3Click == "function") {
					button_3.addEventListener("click", onBtn3Click);
				}
				container.addChild(button_3, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var button_4 = new cpr.controls.Button("btn4");
				button_4.value = "Button";
				container.addChild(button_4, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "45px",
				"left": "335px",
				"width": "400px",
				"height": "200px"
			});
			
			var button_5 = new cpr.controls.Button("btn5");
			button_5.value = "Button";
			container.addChild(button_5, {
				"top": "784px",
				"left": "576px",
				"width": "278px",
				"height": "153px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
			container.addChild(embeddedApp_1, {
				"top": "290px",
				"left": "367px",
				"width": "320px",
				"height": "240px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "dragTester";
	cpr.core.Platform.INSTANCE.register(app);
})();
