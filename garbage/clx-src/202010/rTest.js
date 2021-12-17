/************************************************
 * rTest.js
 * Created at 2020. 10. 28. 오전 11:38:22.
 *
 * @author HANS
 ************************************************/

function abc(){
							var group_6 = new cpr.controls.Container();
							// Layout
							var formLayout_5 = new cpr.controls.layouts.FormLayout();
							formLayout_5.topMargin = "0px";
							formLayout_5.rightMargin = "0px";
							formLayout_5.bottomMargin = "0px";
							formLayout_5.leftMargin = "20px";
							formLayout_5.horizontalSpacing = "0px";
							formLayout_5.verticalSpacing = "0px";
							formLayout_5.verticalSeparatorWidth = 1;
							formLayout_5.verticalSeparatorColor = "#E1E4E8";
							formLayout_5.setColumns(["1fr", "40px", "40px"]);
							formLayout_5.setRows(["1fr"]);
							group_6.setLayout(formLayout_5);
							(function(container){
								var output_1 = new cpr.controls.Output();
								output_1.value = "구내식당";
								output_1.style.setClasses(["h3", "align-bottom"]);
								container.addChild(output_1, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var button_4 = new cpr.controls.Button();
								button_4.value = "";
								button_4.icon = "theme/images/controls/button/icon-settings-3-fill.svg";
								button_4.style.setClasses(["btn-lightgray", "border-bottom", "border-top-0", "border-right-0"]);
								button_4.style.icon.css({
									"width" : "24px",
									"height" : "24px"
								});
								container.addChild(button_4, {
									"colIndex": 1,
									"rowIndex": 0
								});
								var button_5 = new cpr.controls.Button();
								button_5.value = "";
								button_5.icon = "theme/images/controls/button/icon-refresh-line.svg";
								button_5.style.setClasses(["btn-lightgray", "border-bottom", "border-top-0", "border-right-0"]);
								button_5.style.icon.css({
									"width" : "24px",
									"height" : "24px"
								});
								container.addChild(button_5, {
									"colIndex": 2,
									"rowIndex": 0
								});
							})(group_6);
							container.addChild(group_6, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var group_7 = new cpr.controls.Container();
							// Layout
							var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
							group_7.setLayout(verticalLayout_2);
							(function(container){
								var group_8 = new cpr.controls.Container();
								// Layout
								var formLayout_6 = new cpr.controls.layouts.FormLayout();
								formLayout_6.topMargin = "0px";
								formLayout_6.rightMargin = "0px";
								formLayout_6.bottomMargin = "0px";
								formLayout_6.leftMargin = "0px";
								formLayout_6.horizontalSpacing = "5px";
								formLayout_6.verticalSpacing = "5px";
								formLayout_6.setColumns(["80px", "1fr"]);
								formLayout_6.setRows(["1fr"]);
								group_8.setLayout(formLayout_6);
								(function(container){
									var output_2 = new cpr.controls.Output();
									output_2.value = "닭가슴살 샐러드";
									output_2.ellipsis = true;
									container.addChild(output_2, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_3 = new cpr.controls.Output();
									output_3.value = "조식";
									output_3.style.setClasses(["badge", "badge-pill", "badge-info"]);
									container.addChild(output_3, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_8);
								container.addChild(group_8, {
									"width": "440px",
									"height": "25px"
								});
								var group_9 = new cpr.controls.Container();
								// Layout
								var formLayout_7 = new cpr.controls.layouts.FormLayout();
								formLayout_7.topMargin = "0px";
								formLayout_7.rightMargin = "0px";
								formLayout_7.bottomMargin = "0px";
								formLayout_7.leftMargin = "0px";
								formLayout_7.horizontalSpacing = "5px";
								formLayout_7.verticalSpacing = "5px";
								formLayout_7.setColumns(["80px", "1fr"]);
								formLayout_7.setRows(["1fr"]);
								group_9.setLayout(formLayout_7);
								(function(container){
									var output_4 = new cpr.controls.Output();
									output_4.value = "떡볶이";
									output_4.ellipsis = true;
									container.addChild(output_4, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_5 = new cpr.controls.Output();
									output_5.value = "중식";
									output_5.style.setClasses(["badge", "badge-pill", "badge-info"]);
									container.addChild(output_5, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_9);
								container.addChild(group_9, {
									"width": "440px",
									"height": "25px"
								});
								var group_10 = new cpr.controls.Container();
								// Layout
								var formLayout_8 = new cpr.controls.layouts.FormLayout();
								formLayout_8.topMargin = "0px";
								formLayout_8.rightMargin = "0px";
								formLayout_8.bottomMargin = "0px";
								formLayout_8.leftMargin = "0px";
								formLayout_8.horizontalSpacing = "5px";
								formLayout_8.verticalSpacing = "5px";
								formLayout_8.setColumns(["80px", "1fr"]);
								formLayout_8.setRows(["1fr"]);
								group_10.setLayout(formLayout_8);
								(function(container){
									var output_6 = new cpr.controls.Output();
									output_6.value = "돈까쓰&모밀 세트";
									output_6.ellipsis = true;
									container.addChild(output_6, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_7 = new cpr.controls.Output();
									output_7.value = "석식";
									output_7.style.setClasses(["badge", "badge-pill", "badge-info"]);
									container.addChild(output_7, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_10);
								container.addChild(group_10, {
									"width": "440px",
									"height": "25px"
								});
							})(group_7);
							
							
							return group_6;
						}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var con = abc();
	
	app.getContainer().addChild(con, {
		"width" : "300px",
		"height" : "330px",
		"left" : "200px",
		"top" : "200px"
	});
}
