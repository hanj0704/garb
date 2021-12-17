/************************************************
 * testMan.js
 * Created at 2020. 10. 15. 오전 10:08:09.
 *
 * @author HANS
 ************************************************/


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	console.log(button.getActualRect());
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

//	var vcTreGnbNavItem = app.lookup("tre1");
//	
//		vcTreGnbNavItem.style.setClasses(["gnb-nav-item"]);
//		vcTreGnbNavItem.style.item.bindClass().toExpression("\"cl-item-level-\" + (depth + 1)");
//		
//	app.floatControl(app.lookup("grpGnb"),{
//		top : app.lookup("btn1").getActualRect().bottom + "px",
//		left : "0px",
//		right : "0px",
//		bottom : "0px"
//	});
}
function floatMegaMenu() {
	var vcGrpCnt = app.getContainer();
	var vcGrpHd = app.lookup("btn1");
	var vcGrpGnb = app.lookup("grpGnb");
	var vcGrpGnbWrap = app.lookup("grpGnbWrap");
	var vcGrpGnbNavWrap = app.lookup("grpGnbNavWrap");
	
	createSubMenuItems();
	
	app.floatControl(vcGrpGnb, {
		top : vcGrpHd.getActualRect().bottom + "px",
		left : "0px",
		right : "0px",
		height : "600px"
	});
	
	vcGrpGnb.redraw();
}
function createSubMenuItems() {
	var vcGrpGnbNavWrap = app.lookup("grpGnbNavWrap");
	
//	vcGrpGnbNavWrap.removeAllChildren(true);
	
	var vcDsMn = app.lookup("ds2");
	
	for(var idx = 0; idx < 4; idx++){
		
		var vcTreGnbNavItem = new cpr.controls.Tree();
		
		vcTreGnbNavItem.setItemSet(vcDsMn, {
			label : "label",
			value : "value",
			parentValue : "parent"
		});
		

		vcTreGnbNavItem.indent = 0;
		vcTreGnbNavItem.expandAllItems();
		
		vcTreGnbNavItem.style.setClasses(["gnb-nav-item"]);
		vcTreGnbNavItem.style.item.bindClass().toExpression("\"cl-item-level-\" + (depth + 1)");
		
		
		vcGrpGnbNavWrap.addChild(vcTreGnbNavItem, {
			width : 150 + "px",
			height : "100%"
		});
	}
	
	var tres = new cpr.controls.Tree();
	tres.setItemSet(app.lookup("ds3"), {
			label : "label",
			value : "value",
			parentValue : "parent"
	});
	tres.expandAllItems();
		
		tres.style.setClasses(["gnb-nav-item"]);
		tres.style.item.bindClass().toExpression("\"cl-item-level-\" + (depth + 1)");
		vcGrpGnbNavWrap.addChild(tres, {
			width : 150 + "px",
			height : "99%"
		});
}
/*
 * "Button" 버튼(btn1)에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onBtn1Mouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	floatMegaMenu();
}
