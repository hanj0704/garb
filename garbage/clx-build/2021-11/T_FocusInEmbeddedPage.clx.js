/*
 * App URI: 2021-11/T_FocusInEmbeddedPage
 * Source Location: 2021-11/T_FocusInEmbeddedPage.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("2021-11/T_FocusInEmbeddedPage", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * T_FocusInEmbeddedPage.js
			 * Created at 2021. 11. 11. 오후 4:34:47.
			 *
			 * @author ryu
			 ************************************************/
			
			
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				app.lookup("ea1").focus();
			}
			
			
			/*
			 * 텍스트 에리어에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onTxa1Keydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.TextArea
				 */
				var txa1 = e.control;
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
			var group_1 = new cpr.controls.Container("grp");
			group_1.style.setClasses(["cl-form-group"]);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "5px";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "5px";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.setColumns(["100px", "1fr", "100px", "1fr"]);
			formLayout_1.setUseColumnShade(0, true);
			formLayout_1.setUseColumnShade(2, true);
			formLayout_1.setRows(["25px", "25px", "25px", "25px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "인풋박스";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				container.addChild(inputBox_1, {
					"colIndex": 1,
					"rowIndex": 0,
					"colSpan": 3,
					"rowSpan": 1
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "체크박스";
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var checkBox_1 = new cpr.controls.CheckBox("cbx1");
				checkBox_1.text = "Check";
				container.addChild(checkBox_1, {
					"colIndex": 1,
					"rowIndex": 1,
					"colSpan": 1,
					"rowSpan": 1
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "UDC";
				container.addChild(output_3, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "콤보박스";
				container.addChild(output_4, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var comboBox_1 = new cpr.controls.ComboBox("cmb1");
				(function(comboBox_1){
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"colIndex": 1,
					"rowIndex": 2
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "데이트인풋";
				container.addChild(output_5, {
					"colIndex": 2,
					"rowIndex": 2
				});
				var dateInput_1 = new cpr.controls.DateInput("dti1");
				container.addChild(dateInput_1, {
					"colIndex": 3,
					"rowIndex": 2
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "마스크에디터";
				container.addChild(output_6, {
					"colIndex": 0,
					"rowIndex": 3
				});
				var maskEditor_1 = new cpr.controls.MaskEditor("mse1");
				container.addChild(maskEditor_1, {
					"colIndex": 1,
					"rowIndex": 3
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "서치인풋";
				container.addChild(output_7, {
					"colIndex": 2,
					"rowIndex": 3
				});
				var searchInput_1 = new cpr.controls.SearchInput();
				container.addChild(searchInput_1, {
					"colIndex": 3,
					"rowIndex": 3
				});
				var output_8 = new cpr.controls.Output();
				output_8.value = "텍스트에리어";
				container.addChild(output_8, {
					"colIndex": 0,
					"rowIndex": 4
				});
				var textArea_1 = new cpr.controls.TextArea("txa1");
				if(typeof onTxa1Keydown == "function") {
					textArea_1.addEventListener("keydown", onTxa1Keydown);
				}
				container.addChild(textArea_1, {
					"colIndex": 1,
					"rowIndex": 4,
					"colSpan": 3,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"left": "20px",
				"width": "616px",
				"height": "309px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "Button";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "309px",
				"left": "646px",
				"width": "100px",
				"height": "20px"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.setClasses(["cl-form-group"]);
			// Layout
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.scrollable = false;
			formLayout_2.topMargin = "5px";
			formLayout_2.rightMargin = "5px";
			formLayout_2.bottomMargin = "5px";
			formLayout_2.leftMargin = "5px";
			formLayout_2.horizontalSpacing = "10px";
			formLayout_2.verticalSpacing = "10px";
			formLayout_2.horizontalSeparatorWidth = 1;
			formLayout_2.verticalSeparatorWidth = 1;
			formLayout_2.setColumns(["100px", "1fr", "100px", "1fr"]);
			formLayout_2.setUseColumnShade(0, true);
			formLayout_2.setUseColumnShade(2, true);
			formLayout_2.setRows(["25px", "25px", "25px", "25px", "1fr"]);
			group_2.setLayout(formLayout_2);
			(function(container){
				var output_9 = new cpr.controls.Output();
				output_9.value = "인풋박스";
				container.addChild(output_9, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				container.addChild(inputBox_2, {
					"colIndex": 1,
					"rowIndex": 0,
					"colSpan": 3,
					"rowSpan": 1
				});
				var output_10 = new cpr.controls.Output();
				output_10.value = "체크박스";
				container.addChild(output_10, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var checkBox_2 = new cpr.controls.CheckBox("cbx2");
				checkBox_2.text = "Check";
				container.addChild(checkBox_2, {
					"colIndex": 1,
					"rowIndex": 1,
					"colSpan": 1,
					"rowSpan": 1
				});
				var output_11 = new cpr.controls.Output();
				output_11.value = "UDC";
				container.addChild(output_11, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var output_12 = new cpr.controls.Output();
				output_12.value = "콤보박스";
				container.addChild(output_12, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var comboBox_2 = new cpr.controls.ComboBox("cmb2");
				(function(comboBox_2){
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"colIndex": 1,
					"rowIndex": 2
				});
				var output_13 = new cpr.controls.Output();
				output_13.value = "데이트인풋";
				container.addChild(output_13, {
					"colIndex": 2,
					"rowIndex": 2
				});
				var dateInput_2 = new cpr.controls.DateInput("dti2");
				container.addChild(dateInput_2, {
					"colIndex": 3,
					"rowIndex": 2
				});
				var output_14 = new cpr.controls.Output();
				output_14.value = "마스크에디터";
				container.addChild(output_14, {
					"colIndex": 0,
					"rowIndex": 3
				});
				var maskEditor_2 = new cpr.controls.MaskEditor("mse2");
				container.addChild(maskEditor_2, {
					"colIndex": 1,
					"rowIndex": 3
				});
				var output_15 = new cpr.controls.Output();
				output_15.value = "서치인풋";
				container.addChild(output_15, {
					"colIndex": 2,
					"rowIndex": 3
				});
				var searchInput_2 = new cpr.controls.SearchInput();
				container.addChild(searchInput_2, {
					"colIndex": 3,
					"rowIndex": 3
				});
				var output_16 = new cpr.controls.Output();
				output_16.value = "텍스트에리어";
				container.addChild(output_16, {
					"colIndex": 0,
					"rowIndex": 4
				});
				var textArea_2 = new cpr.controls.TextArea("txa2");
				container.addChild(textArea_2, {
					"colIndex": 1,
					"rowIndex": 4,
					"colSpan": 3,
					"rowSpan": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "724px",
				"left": "20px",
				"width": "616px",
				"height": "309px"
			});
			
			var embeddedPage_1 = new cpr.controls.EmbeddedPage("ep2");
			embeddedPage_1.src = "2021-11/NewFile.html";
			container.addChild(embeddedPage_1, {
				"top": "1043px",
				"left": "20px",
				"width": "954px",
				"height": "172px"
			});
		}
	});
	app.title = "T_FocusInEmbeddedPage";
	cpr.core.Platform.INSTANCE.register(app);
})();
