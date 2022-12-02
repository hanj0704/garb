/************************************************
 * study.js
 * Created at 2022. 11. 24. 오후 3:16:07.
 *
 * @author HANS
 ************************************************/

function hello() {
	
	return false;
}

exports.secondFuncName = hello;

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
//	var btn1 = e.control;
//	app.getContainer().redraw();


	//case1.데이터셋에서 반복문 미친듯이 돌리기
	var ds = app.lookup("ds2");
	
	var vaResultRow = [];//전체 자식을 재귀적으로 담는 배열
	
	var vsFindData = "value1";
	var vaForRow = ds.findAllRow("parentC == '"+vsFindData+"'");
	while(vaForRow.length > 0) {
		vaResultRow.push(...vaForRow);
		var tempRow = [];
		
		vaForRow.forEach(function(each){
			 var vaTempFinededRow = ds.findAllRow("parentC == '"+each.getValue("value")+"'");
			 tempRow.push(...vaTempFinededRow);
		});//value2를 부모로 가지는 행들을 전부 tempRow에 들어가게됨.
		if(tempRow.length > 0) {
			
		vaForRow = tempRow;
		} else {
			vaForRow = [];
		}
	}
//	if(vaForRow.length > 0) {
		
//	}
	vaResultRow = vaResultRow.filter(function(/*cpr.data.Row*/each){
		return each.getValue("MENU_DESC").indexOf("인풋박스의값") != -1;
	});
	vaResultRow.forEach(function(each){
		var newItem = new cpr.controls.Container();
		console.log(each.getValue("label"));
	});
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	//case2. 부모-자식관계 데이터 표현을 잘하는 보이지 않는 사이드네비게이션 만들기,(hasAncestor,parentItem);
	
	var notvisibleSideNav = new cpr.controls.SideNavigation();
	notvisibleSideNav.setItemSet(app.lookup("ds2"), {
		label: "label",
		value: "value",
		parentValue: "parentC"
	});
	var vsFindedValue = "value1";
	var vsInputValue = "풋";
	notvisibleSideNav.setFilter("hasAncestor('"+vsFindedValue+"') && this.row.getValue('MENU_DESC') *= '풋'");
	notvisibleSideNav.getItems().forEach(function(each){
		if(each.row.getValue("MENU_DESC").indexOf(vsInputValue) != -1) {
			
			createSearchItem(each.row);
		}
		var voTempRow = each.row;
		
	});
}
/**
 * 
 * @param {cpr.data.Row} poRow
 */
function createSearchItem(poRow){
	var container = app.lookup("grpTarget");
	var group_5 = new cpr.controls.Container();
						group_5.style.setClasses(["card", "cursor-pointer"]);
						var formLayout_1 = new cpr.controls.layouts.FormLayout();
						formLayout_1.scrollable = false;
						formLayout_1.topMargin = "10px";
						formLayout_1.rightMargin = "20px";
						formLayout_1.bottomMargin = "10px";
						formLayout_1.leftMargin = "20px";
						formLayout_1.horizontalSpacing = "6px";
						formLayout_1.verticalSpacing = "6px";
						formLayout_1.setColumns(["1fr"]);
						formLayout_1.setRows(["24px", "27px", "1fr"]);
						group_5.setLayout(formLayout_1);
						(function(container){
							var group_6 = new cpr.controls.Container();
							var flowLayout_2 = new cpr.controls.layouts.FlowLayout();
							flowLayout_2.scrollable = false;
							flowLayout_2.horizontalSpacing = 0;
							flowLayout_2.verticalSpacing = 0;
							group_6.setLayout(flowLayout_2);
							(function(container){
								var output_2 = new cpr.controls.Output();
								output_2.value = "그리드";
								output_2.style.setClasses(["badge"]);
								container.addChild(output_2, {
									"autoSize": "width",
									"width": "64px",
									"height": "100%"
								});
							})(group_6);
							container.addChild(group_6, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_3 = new cpr.controls.Output();
							output_3.value = poRow.getValue("DESC");
							container.addChild(output_3, {
								"colIndex": 0,
								"rowIndex": 2
							});
							var output_4 = new cpr.controls.Output();
							output_4.value = poRow.getValue("MENU_NM");
							output_4.style.setClasses(["h4"]);
							container.addChild(output_4, {
								"colIndex": 0,
								"rowIndex": 1
							});
						})(group_5);
						container.addChild(group_5, {
							"autoSize": "height",
							"width": "400px",
							"height": "102px"
						});
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	app.lookup("ds2").setFilter("column1 > 3");
}

/*
 * "hasAncestor" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	app.lookup("side1").setFilter("hasAncestor('value1')");
}

/*
 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onBodyScroll(e){
	var group = e.control;
	
	if(e.scrollTop > 0) {
		app.floatControl(app.lookup("btn1"),{
			width : "100%",
			top : "0px",
			height: "30px"
		});
	} else {
		app.getContainer().addChild(app.lookup("btn1"), {
			left: "20px",
			top : "20px",
			height : "20px",
			width : "100px"
		});
	}
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	app.lookup("side1").setFilter("label *= '1'");
}
