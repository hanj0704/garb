/************************************************************************
 * CmnMainIndex.js
 * @프로그램설명 : 
 *
 * @작성일자 :  2019. 7. 24. 
 * @작성자 1073275
 * 
 * @수정이력 :  수정일자 (수정자) 수정내용 
 *                      
 ************************************************************************/
 
 
/************************************************************************
 ** 글로벌 변수, 상수변수
 ************************************************************************/ 
goWindowInfo = null;

/************************************************************************
 ** 글로벌 함수
 ************************************************************************/ 
/**
* 화면 초기 로딩  혹은 메뉴 클릭시에 로딩하는 함수로 async 형태로 호출됨. 
* @param {any} oInitValue   
*/
exports.init = function(oInitValue){
	// 초기로딩시 호출하는 구문 작성
}

/**
* 업무화면에서 연관업무 화면을 오픈하고자 하는 경우 사용 
* @param {any} oInitValue   
*/
exports.openRightMenu = function(sToggleValue){
	if(!ValueUtil.isNull(sToggleValue)){
		app.lookup("cbgRightMenu").selectItemByValue(sToggleValue);
	}
}

exports.setWindowInfo = function(oWindowInfo){
	goWindowInfo = oWindowInfo;
}


/************************************************************************
 ** 파일내 로컬변수 선언  
 ************************************************************************/ 
var util = new ComUtil(app);
var programManager = cpr.core.Module.require("hlicp/cmn/modules/ProgramWindow");
var mProgram = cpr.core.Module.require("hlicp/cmn/modules/ProgramWindow");
var gbShowLeft = true;
var MENU_LEFT = 200;
var MENU_MIN_LEFT = 50;
var aNctRelCtrls = ["grpAccHeader1","grpAccCont1","grpAccHeader3","grpAccCont3","grpAccHeader2","grpAccCont2"];
var aVriRelCtrls = ["grpAccHeader5","grpAccCont5"];



/************************************************************************
 ** 사용자 정의 자바스크립트 함수를 기술 
 ************************************************************************/ 

  
function toggleLeftArea(){
		
	if (gbShowLeft ) {
		gbShowLeft = false; 
	}else {
		gbShowLeft = true; 		
	}
	
	var nLeftWidth = MENU_LEFT;
	
	var sLeftMenuTitle = "";
	
	app.lookup("grpContent").getLayout().setColumnVisible(1, gbShowLeft);	
	
	app.lookup("optSubTitle").value = sLeftMenuTitle;
	
}




/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 */
function openMenuItem(pcItem, poInitValue) {

	if (pcItem == null){
		return;
	}
	
	var dsMenus = app.lookup("dsTotalMenu");
	var oRow = dsMenus.findFirstRow("value == '" + pcItem.value + "'");
	var sAppId = oRow.getValue("strMenuId");
	var sParentAppId = oRow.getValue("strParentId");
	var sType  = oRow.getValue("strType");
	var bFoldable = oRow.getValue("bFoldable");
	var bInclude = oRow.getValue("bInclude");
	var bSearch = oRow.getValue("bSearch");
	var sMenuGbn = oRow.getValue("sMenuGbn");//계약심사 3가지 안을 구분하기 위해 추가함
	var bLayoutSave = oRow.getValue("bLayoutSave");//언더라이팅 레이아웃 저장 옵션 추가
	
	if(sAppId.indexOf("/") > -1 ) {
			programManager.openPgmWindow(sAppId , sType,  pcItem.label, bFoldable, bInclude, bSearch, sMenuGbn, bLayoutSave);
			app.lookup("tabFloatingMenu").visible = false;
			
			// 기존 활성화 되어있던 영역의 scale크기 적용
			cpr.core.DeferredUpdateManager.INSTANCE.update();
			zoom(scale);
	}
}

function addMenuTab(){
	
	//프로그램 탭 추가
	var tabFloatingMenu = app.lookup("tabFloatingMenu");
	tabFloatingMenu.getTabItems().forEach(function(each){
		tabFloatingMenu.removeTabItem(each);
	});
	
	var gaPgmWindows = programManager.gaPgmWindows;
	
	gaPgmWindows.forEach(function(each){
		var udCtrl = each.ctrl;
		var windowInfo = udCtrl.getAppProperty("windowInfo");
		var newTabItem = new cpr.controls.TabItem();
		newTabItem.userAttr("pgmId", windowInfo.pgmId);
		newTabItem.text = windowInfo.title;
		tabFloatingMenu.addTabItem(newTabItem);
		tabFloatingMenu.setSelectedTabItem(newTabItem);
	});
	
	
	app.lookup("tabFloatingMenu").visible = !app.lookup("tabFloatingMenu").visible ;

}


var scale = 1.0;
 
 /**
  * 스케일 확대
  */
function scaleIn() {
	
	// max 1.5 설정
	if(scale >= 1.5) {
		alert("더 확대할 수 없습니다.");
		return;
	}
	
	scale += 0.1;
	zoom(scale);
}
 
/**
 * 스케일 축소
 */
function scaleOut() {
	
	// min 0.5 설정
	if(scale <= 0.5) {
		alert("더 축소할 수 없습니다.");
		return;
	}
	
	scale -= 0.1;
	zoom(scale);
}

/**
 * 스케일 초기화
 */
function scaleReset () {
	scale = 1.0;
	zoom(scale);
}

/**
 * 활성화 화면 확대/축소
 * @param {any} scale
 */
function zoom(scale) {
	
	var voProgramWindows = programManager.getAllProgramWindow();
	
	// 띄워져 있는 다이얼로그가 없는 경우 scale 초기화
	if(voProgramWindows.length == 0) {
		scale = 1;
		return;		
	}

 	voProgramWindows.forEach(function(each) {
		var vcEmb = null;
		var voCmnWindowDialog = each.ctrl.getEmbeddedAppInstance();
		var voUdcCmnWindow = voCmnWindowDialog.getContainer().getFirstChild().getEmbeddedAppInstance();
		var voChildren = voUdcCmnWindow.getContainer().getFirstChild().getChildren();
		
		voChildren.forEach(function(item) {
			if(item.type == "embeddedapp") {
				item.style.css({
					"transform":"scale("+scale+")",
					"transform-origin": "0px 0px"
				})
			}
		});
	});
}


/** 워크 플로우, 연관업무 메뉴 관련 스크립트 */

/**
 * 관련업무 연동
 * @param {any} poRelatedDataSet
 */
exports.setRelatedWork = setRelatedWork
/**
 * 관련업무 연동
 * @param {any} poRelatedDataSet
 */
function setRelatedWork(poRelatedDataSet){
	
	var treRelated = app.lookup("treRelated");
	
	treRelated.setItemSet(poRelatedDataSet, {label: "menuNm", value: "menuId", parentValue: "parentId"});
	treRelated.redraw();
}

/**
 * 메모 연동
 * @param {any} poNoteDataSet	메모목록
 * @param {any} poNoteCategory	메모카테고리
 */
exports.setNoteInfo = setNoteInfo

/**
 * 메모 연동
 * @param {any} poNoteDataSet	메모목록
 * @param {any} poNoteCategory	메모카테고리
 */
function setNoteInfo(poNoteDataSet, poNoteCategory){
	
//	app.lookup("dsNotes").clear();
//	poNoteDataSet.copyToDataSet(app.lookup("dsNotes"));
//	
	//메모카테고리버튼
	var grpNoteCategory = app.lookup("grpNoteCategory");
	grpNoteCategory.removeAllChildren();
		
	for(var i=0;i<poNoteCategory.getRowCount();i++){
		var categoryBtn = new cpr.controls.Button(poNoteCategory.getValue(i,"noteCategoryId"));
		
		categoryBtn.value = poNoteCategory.getValue(i,"noteCategoryNm");
		
		categoryBtn.addEventListener("click", function(e){
			
			drawNoteListByCategory(e.control.id);
			
		});
		
		grpNoteCategory.addChild(categoryBtn, {
			"width" : "60px",
			"height" : "30px",
			"autoSize" : "width"
		});
	}
	
	//초기 메모선택
	drawNoteListByCategory(poNoteCategory.getValue(0,"noteCategoryId"));
	
	
	//TODO: 업무메모와 내메모 구분 및 기능 추가 필요.
	//메모 설정 및 쓰기에 대한 기능 추가 필요.
}

/**
 * 카테고리별 메모리스트
 * @param {String} psCategoryId
 */
function drawNoteListByCategory(psCategoryId){
	
	var grpNoteList = app.lookup("grpNoteList");
	grpNoteList.removeAllChildren();
	
	var targetDataSet = app.lookup("dsNotes");
	targetDataSet.setFilter("noteCategoryId == '" + psCategoryId + "'");
		
	for(var i=0;i<targetDataSet.getRowCount();i++){
		var iRow = targetDataSet.getRow(i);
		addNote(iRow);	
	}
	
	setNoteCategoryBtnCss(psCategoryId);
}

function setNoteCategoryBtnCss(psCategoryId){
	var grpNoteCategory = app.lookup("grpNoteCategory");
	for(var i=0;i<grpNoteCategory.getChildrenCount();i++){
		if(grpNoteCategory.getChildren()[i].id == psCategoryId)
			grpNoteCategory.getChildren()[i].style.addClass("btn-setting-selected");
		else
			grpNoteCategory.getChildren()[i].style.removeClass("btn-setting-selected");
	}
}

function addNote(psRow){
	
	var grpNoteList = app.lookup("grpNoteList");
	var formLayout = new cpr.controls.layouts.FormLayout();
	formLayout.setRows(["30px","30px"]);
	formLayout.setColumns(["2fr","1fr"]);
	formLayout.horizontalSpacing = 0;
	formLayout.verticalSpacing = 0;
	
	var grpNote = new cpr.controls.Container();
	grpNote.setLayout(formLayout);
	grpNote.style.addClass("note-box");
			
	var optNoteTitle = new cpr.controls.Output();
	var optNoteDate = new cpr.controls.Output();
	var optNoteContent = new cpr.controls.Output();
			
	optNoteTitle.style.addClass("note-title");
	optNoteDate.style.addClass("note-date");
	optNoteContent.style.addClass("note-content");
			
	optNoteTitle.value = psRow.getValue("noteTitle");
	optNoteDate.value = psRow.getValue("noteDate");
	optNoteDate.dataType = "date";
	optNoteDate.format = "YYYY.MM.DD";
	optNoteContent.value = psRow.getValue("noteContent");
	
	grpNote.addChild(optNoteTitle, {
			"colIndex": 0,
			"rowIndex": 0
	});
	grpNote.addChild(optNoteDate, {
		"colIndex": 1,
		"rowIndex": 0
	});
	grpNote.addChild(optNoteContent, {
		"colIndex": 0,
		"rowIndex": 1,
		"colSpan" : 2
	});
			
	grpNoteList.addChild(grpNote, {
		"width" : "400px",
		"height" : "65px"
	});
}


/**
 * 워크플로우 연동
 * @param {any} poWorkFlowDataSet
 */
exports.setWorkFlow = setWorkFlow;
/**
 * 워크플로우 연동
 * @param {any} poWorkFlowDataSet
 */
function setWorkFlow(poWorkFlowDataSet){
	
	var grpWorkFlow = app.lookup("grpWorkFlow");
	
	grpWorkFlow.removeAllChildren();
	
	if(poWorkFlowDataSet instanceof cpr.data.DataSet){
		var flowCnt = poWorkFlowDataSet.getRowCount();
		
		for(var i=0;i<flowCnt;i++){
			var flowNm = poWorkFlowDataSet.getValue(i, "flowNm");
			var flowId = poWorkFlowDataSet.getValue(i, "flowId");
			var appId  = poWorkFlowDataSet.getValue(i, "appId");
			var isCurrentFlow = poWorkFlowDataSet.getValue(i, "currentFlow");
			var optFlowNm = new cpr.controls.Output(flowId);
			
			if(ValueUtil.fixNull(isCurrentFlow)=="Y"){
				optFlowNm.style.css({
					"border" : "solid 1px",
					"text-align" : "center",
					"background-color" : "#8600ff",
					"color" : "white"
				});
			}else{
				optFlowNm.style.css({
					"border" : "solid 1px",
					"text-align" : "center",
					"background-color" : "#e6caff",
					"cursor": "pointer"
				});
				optFlowNm.addEventListener("click", function(e){
					
					var sFlowId = e.control.id;
					if(sFlowId == null){
						return;
					}
					
					var dsMenus = app.lookup("dsWorkFlow");
					var oRow = dsMenus.findFirstRow("flowId == '" + sFlowId + "'");
					var sAppId  = oRow.getValue("appId");
					
					var sFlowNm  = oRow.getValue("flowNm");
					var sType  = oRow.getValue("windowType");
					
					if(sAppId.indexOf("/") > -1 ) {
						if(sType == "M" || sType == "P"){
							programManager.openPgmWindow(sAppId , sType,  sFlowNm);
						}else
							programManager.openPgmWindow(sAppId , "S",  sFlowNm);
						
					}
				});
			}
			optFlowNm.value = flowNm;
			if(i!=0){
				var optArrow = new cpr.controls.Output();
				optArrow.value = "↓";
				optArrow.style.css({
					"text-align" : "center",
					"color" : "white",
					"font-weight" : "bold"
				});
				grpWorkFlow.addChild(optArrow);
			}
			grpWorkFlow.addChild(optFlowNm, {
				"height" : "60px"
			});
			
		}
	}
}


/**
 * 연관버튼 연동
 * @param {any} poRelatedButtonDataSet
 */
exports.setRelatedButton = setRelatedButton
	
	
/**
 * 연관버튼 연동
 * @param {any} poRelatedButtonDataSet
 */
function setRelatedButton(poRelatedButtonDataSet){
	
	var grpRelatedButton = app.lookup("grpRelatedButton");
	
	grpRelatedButton.removeAllChildren();
	
	for(var i=0;i<poRelatedButtonDataSet.getRowCount();i++){
		var relatedBtn = new cpr.controls.Button("relatedBtn_"+i);
		relatedBtn.value = poRelatedButtonDataSet.getValue(i,"btnNm");
		relatedBtn.style.addClass(poRelatedButtonDataSet.getValue(i,"btnClass"));
		
		//TODO: 연관버튼 클릭 이벤트 추가 필요
		
		grpRelatedButton.addChild(relatedBtn, {
			"width" : "30px",
			"height" : "30px",
			"autoSize" : "width"
		});
	}
}


/*
 * 체크 박스 그룹에서 selection-change 이벤트 발생 시 호출.
 * 체크박스 그룹의 아이템을 선택하여 변경한 값이 저장된 후에 발생하는 이벤트.
 */
function onCbgRightMenuSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.CheckBoxGroup
	 */
	var cbgRightMenu = e.control;
	
	
	//업무 체크
	if(programManager.gaPgmWindows.length>0){
		var nLastIdx = programManager.gaPgmWindows.length-1;
		var sActivePgm = programManager.gaPgmWindows[nLastIdx].src;
		if(sActivePgm.indexOf("hlicp/nct")>-1){
			util.Control.setVisible(true, aNctRelCtrls);
			util.Control.setVisible(false, aVriRelCtrls);
		}else if(sActivePgm.indexOf("hlicp/vri")>-1){
			util.Control.setVisible(true, aVriRelCtrls);
			util.Control.setVisible(false, aNctRelCtrls);
		}else{
			util.Control.setVisible(true, aNctRelCtrls);
			util.Control.setVisible(true, aVriRelCtrls);
		}
	}
	
	
	var aChkValues = cbgRightMenu.values;
	var menuCnt = aChkValues.length;
	
	switch(menuCnt){
		case 0 : {
			//메뉴 사라짐
			var rightMenu = app.lookup("grpRightMenu");
			rightMenu.style.animateTo({
				"right" : "-250px"
			}, 0.3, cpr.animation.TimingFunction.EASE_OUT);
			
			setTimeout(function(){
				app.lookup("grpRightMenu").visible = false; 
			}, 300);
			
			break;
		}
		
		case 1 : {
			
			var grpRightMenu = app.lookup("grpRightMenu");
			if(aChkValues[0]=="01"){
				grpRightMenu.getLayout().setColumnVisible(0, true);
				grpRightMenu.getLayout().setColumnVisible(1, false);
				
				//setRelatedWork(app.lookup("dsRelatedWork"));
				//setNoteInfo(app.lookup("dsNotes"), app.lookup("dsNoteCategory"));
				//setRelatedButton(app.lookup("dsRelatedButton"));
				
				var showConstraint = {
					"top": "45px",
					"bottom": "0",
					"right": "-400px",
					"width": "400px"
				};
			}else{
				grpRightMenu.getLayout().setColumnVisible(1, true);
				grpRightMenu.getLayout().setColumnVisible(0, false);
				
				setWorkFlow(app.lookup("dsWorkFlow"));
				
				var showConstraint = {
					"top": "45px",
					"bottom": "0",
					"right": "-150px",
					"width": "150px"
				};
			}
			
			grpRightMenu.style.css(showConstraint);
			grpRightMenu.visible = true;
			app.floatControl(grpRightMenu);
			
			grpRightMenu.style.animateTo({
				"right" : "0px"
			}, 0.3, cpr.animation.TimingFunction.EASE_IN);
			
			break;
		}
		
		case 2 : {
			
			var grpRightMenu = app.lookup("grpRightMenu");
			grpRightMenu.getLayout().setColumnVisible(0, true);
			grpRightMenu.getLayout().setColumnVisible(1, true);
			
			//setRelatedWork(app.lookup("dsRelatedWork"));
			//setNoteInfo(app.lookup("dsNotes"), app.lookup("dsNoteCategory"));
			//setRelatedButton(app.lookup("dsRelatedButton"));
			setWorkFlow(app.lookup("dsWorkFlow"));
				
			var showConstraint = {
				"top": "45px",
				"bottom": "0",
				"right": "-550px",
				"width": "550px"
			};
			grpRightMenu.style.css(showConstraint);
			grpRightMenu.visible = true;
			app.floatControl(grpRightMenu);
			
			
			grpRightMenu.style.animateTo({
				"right" : "0px"
			}, 0.3, cpr.animation.TimingFunction.EASE_IN);
			
			break;
		}
	}
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreRelatedItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treRelated = e.control;
	var pcItem = e.item;
	
	if (pcItem == null){
		return;
	}
	
	var dsMenus = app.lookup("dsRelatedWork");
	var oRow = dsMenus.findFirstRow("menuId == '" + pcItem.value + "'");
	var sAppId = oRow.getValue("appId");
	var sParentAppId = oRow.getValue("parentId");
	var sType  = oRow.getValue("windowType");
	
	if(sAppId.indexOf("/") > -1 ) {
		if(sType == "M" || sType == "P"){
			programManager.openPgmWindow(sAppId , sType,  pcItem.label);
		}else
			programManager.openPgmWindow(sAppId , "S",  pcItem.label);
		
	}
}


/*
 * "▣" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShowActiveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnShowActive = e.control;

	//활성화된 프로그램 배열
	var gaPgmWindows = programManager.gaPgmWindows;
	if(gaPgmWindows.length==0){
		//활성화된 프로그램이 존재하지 않는 경우 리턴
		var util = new ComUtil(app);
		util.Msg.alert("CMN00001", ["활성화된 프로그램이 존재하지 않습니다."]);
		return;
	}
	
	//선택한 메뉴 탭에 추가
	addMenuTab();
	
}

/**
 * 플로팅 영역에 활성화된 프로그램 추가
 * @param {any} poPgm 프로그램
 * @param {any} grpFloatActive 플로팅컨트롤
 */
function addToFloatActiveGroup(poPgm, grpFloatActive){
	
	//윈도우창 정보 조회
	var udCtrl = poPgm.ctrl;
	var windowInfo = udCtrl.getAppProperty("windowInfo");
	
	var optPgmTitle = new cpr.controls.Button(poPgm.pgmId);
	optPgmTitle.value = windowInfo.title;
	optPgmTitle.style.css("text-align", "center");
	optPgmTitle.style.css("valign", "middle");
	optPgmTitle.style.css("padding", "3px 10px 3px 10px");
	optPgmTitle.style.css("min-height", "24px");
	
	optPgmTitle.addEventListener("mousemove", function(e){
		e.control.style.css({
			"border" : "solid 2px red"
		});
	});
	optPgmTitle.addEventListener("mouseleave", function(e){
		e.control.style.css({
			"border" : ""
		});
	});
	optPgmTitle.addEventListener("click", function(e){
		var pgmId = windowInfo.pgmId ;//e.control.id;
		programManager.active(pgmId);
		
		app.lookup("grpFloatActive").dispose();
	});
	
	//활성프로그램 추가
	var constraint = {
		"height" : "24px",
		"autoSize": "width"
	}
	grpFloatActive.addChild(optPgmTitle, constraint);	
	
}


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
//	util.Submit.send("subMenu", function(){
//		app.lookup("treMenu").redraw();
//	});


	window.addEventListener("resize", function(e) {
		var programManager = cpr.core.Module.require("hlicp/cmn/modules/ProgramWindow");
	 	programManager.handleResize(app.lookup("grpContentArea").getActualRect());	 	
		app.setAppProperty("contentRect", app.lookup("grpContentArea").getActualRect());
	
	});
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 * 2019. 9. 10.
 */
function onIpb1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 * 2019. 9. 10.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		onIpb1ValueChange();
	}
}



/* 메인 로직 류다은 추가 */


// 사용자 정의 함수

/** @type Array */
var maFilterableChildren = []; // 루트 메뉴에 속한 모든 아이템의 ParentValue

/**
 * 루트 메뉴와 루트 메뉴에 속하는 하위 노드 아이템의 부모값을 추출합니다.
 * @param {cpr.controls.TreeItem} pcItem
 */
function extractItems(pcItem) {
	var vcTreMenu = app.lookup("treMenu");
	
	
	maFilterableChildren = []; // 초기화

	var vaIncludedItmes = vcTreMenu.getSelection();
	
	vaIncludedItmes.forEach(function(item){
		var vsParentValue = item.parentValue;
		
		//FIXME 트리 부모값(parentValue)에 대한 값이 변경 되면 아래 부분 수정 필요
		if (vsParentValue != "" && maFilterableChildren.indexOf(vsParentValue) == -1){
			maFilterableChildren.push(vsParentValue);
		}
	});
	
	vcTreMenu.clearSelection();
}


/**
 * 루트 메뉴를 누르면 아이콘 메뉴를 표시하고, 큰 아이콘 메뉴는 숨깁니다.
 * @param {Boolean} pbVisible 아이콘 메뉴 표시 여부 (true 지정 시 아이콘 메뉴는 보이고, 큰 아이콘 메뉴는 슘겨집니다.)
 */
function setMenuLayout(pbVisible) {
	// 루트 아이템을 눌렀으므로 아이콘 메뉴를 표시
	var vcGrpMainMenuWrap = app.lookup("grpMainMenuWrap");
	var voGrpMainMenuWrapLayout = vcGrpMainMenuWrap.getLayout();
	
	voGrpMainMenuWrapLayout.setColumnVisible(0, pbVisible);
	
	// 대메뉴 하단에 보이는 아이콘 박스를 숨김
	var vcGrpMenuInner = app.lookup("grpMenuInner");
	var voGrpMenuInnerLayout = vcGrpMenuInner.getLayout();
	
	voGrpMenuInnerLayout.setRowVisible(1, !pbVisible);
}


/**
 * 메뉴의 필터를 제거하고, 루트 메뉴를 표시합니다.
 */
function clearMenuFilter() {
	var vcTreMenu = app.lookup("treMenu");
	vcTreMenu.clearFilter();
	
	vcTreMenu.collapseAllItems();
	
	setMenuLayout(false);
	
	vcTreMenu.redraw();
}


/**
 * 검색을 통해 아이템을 선택할 경우에 대한 함수 
 * @param {cpr.controls.TreeItem} pcItem
 */
function setMenuStateAfterSearch(pcItem) {
	var vcTreMenu = app.lookup("treMenu");
	var vcTreeItem = pcItem; // 현재 선택한 아이템
	
	var vcTmpTreeItem = "";
	var vaFilterableItemIdx = [];
	//TODO 선택한 아이템의 최상위 부모 아이템을 찾는다.
	while(vcTmpTreeItem != null){
		vcTmpTreeItem = vcTreMenu.findItem({value : vcTreeItem.parentValue});
		
		if (vcTmpTreeItem != null){
			vcTreMenu.selectItem(vcTmpTreeItem.row.getIndex());
			vaFilterableItemIdx.push(vcTmpTreeItem.row.getIndex());
			vcTreeItem = vcTmpTreeItem;
		}
	}
	

	vcTreMenu.selectItems(vaFilterableItemIdx);
		
	// 트리에 스타일 적용
	vcTreMenu.style.addClass("active");
	
	setMenuLayout(true); // 메뉴 레이아웃 설정 (아이콘 메뉴 표시는 표시하고, 큰 아이콘 메뉴는 숨김)
	
//	extractItems(vcTreeItem);
//	
//	vcTreMenu.setFilter("'" + vcTreeItem.value + "' == value || isFilterableItem(parentValue)");
//	
//	vcTreMenu.redraw();
}


// 일반 이벤트

/*
 * 버튼(btnPrevMenu)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 9. 26.
 * 
 * 루트 메뉴를 클릭하면 해당 루트 메뉴에 대한 자식 트리 노드가 보여지는 메뉴에서 루트 메뉴만 보여지는 메뉴로 변경된다.
 */
function onBtnPrevMenuClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPrevMenu = e.control;

	clearMenuFilter();
}


/*
 * 버튼(btnToggle)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 9. 26.
 * 
 * 해당 버튼을 클릭하면 대메뉴가 숨겨지거나 표시된다.
 */
function onBtnToggleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnToggle = e.control;

	var vcGrpContent = app.lookup("grpContent"); // 메인 컨테이너
	var voGrpContentLayout = vcGrpContent.getLayout();
	
	var vcGrpMainMenuWrap = app.lookup("grpMainMenuWrap"); // 아이콘 메뉴와 메뉴를 감싸는 컨테이너
	var voGrpMainMenuWrapLayout = vcGrpMainMenuWrap.getLayout();
	
	var vsColumnWidth = null;
	
	// 특정 클래스가 적용되어 있는지 없는지에 따라 메뉴를 숨기거나 표시
	if (btnToggle.style.hasClass("on")){
		voGrpMainMenuWrapLayout.setColumnVisible(1, true); // 메뉴 표시		
		btnToggle.style.removeClass("on"); // 메뉴 숨김 표시에 대한 스타일 제거
		vsColumnWidth = "360px";	
	} else {
		voGrpMainMenuWrapLayout.setColumnVisible(1, false); // 메뉴 숨김
		btnToggle.style.addClass("on"); // 메뉴 숨김 표시에 대한 스타일 추가
		
		vsColumnWidth = "40px";	
	}
	
	var vaGrpContentColumns = voGrpContentLayout.getColumns();
	vaGrpContentColumns[0] = vsColumnWidth;
	voGrpContentLayout.setColumns(vaGrpContentColumns);
	
	// 메뉴 숨김표시 상태에서 루트 메뉴로 돌아가지 않도록 enabled 설정
	app.lookup("btnPrevMenu").enabled = !app.lookup("btnPrevMenu").enabled;

	cpr.core.DeferredUpdateManager.INSTANCE.update();
	setTimeout(resizeContent(), 1000);
	
}
function resizeContent(){
	app.setAppProperty("contentRect", app.lookup("grpContentArea").getActualRect() );
	programManager.handleResize( app.lookup("grpContentArea").getActualRect());
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 * 2019. 9. 26.
 * 
 * 클릭한 아이템을 포함한 자식, 자손 노드를 대메뉴에 표시한다.
 */
function onTreMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var vcTreMenu = e.control;
	
	var vcTreeItem = e.item; // 현재 선택한 아이템
	//선택한 메뉴를 호출 
	openMenuItem(vcTreeItem);
	
	// 트리에 스타일 적용
	vcTreMenu.style.addClass("active");
	setMenuLayout(true); // 메뉴 레이아웃 설정 (아이콘 메뉴 표시는 표시하고, 큰 아이콘 메뉴는 숨김)
	
	vcTreMenu.toggle(vcTreeItem); // 클릭 시 메뉴가 펼쳐지도록 설정
	
	//FIXME parentValue가 DB에서 공백("")이 아닌 다른 값으로 넘어올 경우 변경 필요
	// 선택한 아이템이 루트인 경우 필터를 다시 적용하지 않도록 리턴한다.
	if (vcTreeItem.parentValue != ""){
		vcTreMenu.clearSelection();
		// 서브메뉴를 클릭시 모두 펼치도록 처리  (장진경과장님- 현업요청사항 전달 수용 및 처리 (2019.11.07))
		var nDepth = util.Tree.getTreeDepth("treMenu", vcTreeItem);
		if(nDepth == 1) {
			vcTreMenu.expandAllItems(vcTreeItem);
		}
		return;
	}
	extractItems(vcTreeItem);
	vcTreMenu.setFilter("'" + vcTreeItem.value + "' == value || isFilterableItem(parentValue)");
	vcTreMenu.redraw();
	
}

cpr.expression.ExpressionEngine.INSTANCE.registerFunction("isFilterableItem", function(psParentValue) {
	return maFilterableChildren.indexOf(psParentValue) > -1;
});



/************************************************************************
 ** 자동으로 생성되는 이벤트 자바스크립트 함수를 배치
 ** (이벤트 생성시 자동으로 스크립트 함수가 하위에 표시됩니다. ) 
 ************************************************************************/ 


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	programManager.setApp(app.lookup("grpContentArea"));
	app.setAppProperty("contentRect", app.lookup("grpContentArea").getActualRect());
}



/*
 * 버튼(btnMenuSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 9. 26.
 */
function onBtnMenuSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMenuSearch = e.control;
	
	var vcIpbSearch = app.lookup("ipbMenuSearch");
	var vsSearchValue = vcIpbSearch.value;
	
	var vcTreMenu = app.lookup("treMenu");
	var vcDsTotalMenu = vcTreMenu.dataSet;
	
	var voFindFirstRow = vcDsTotalMenu.findFirstRow("strMenuNm *= '" + vsSearchValue + "'");
	
	if (voFindFirstRow == null){
		alert("검색 결과 없음!");
		return;
	}
	
	var vcFindedTreeItem = vcTreMenu.findItem({value : voFindFirstRow.getValue("value")});
	//TODO 루트 메뉴에 대한 하위 노드를 필터해야하는 로직, 루트 메뉴 좌측에 표시되는 아이콘 메뉴를 열어주는 부분 등이 덜 작성되어서 나중에 수정 필요
//	setMenuStateAfterSearch(vcFindedTreeItem);

	vcTreMenu.focusItem(vcFindedTreeItem);
	openMenuItem(vcFindedTreeItem);
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 * 2019. 9. 26.
 */
function onIpbMenuSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbMenuSearch = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("btnMenuSearch").click();
	}
}





/*
 * 버튼(btnChangePositionA)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 9. 27.
 * 열려진 창을 계단식으로 배열하고 신규로 오픈시에도 선택된 패턴으로 처리되도록
 */
function onBtnChangePositionAClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnChangePosition = e.control;
	changePosition(btnChangePosition, "A");
	
	
}


/*
 * 버튼(btnChangePositionB)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 9. 27.
 */
function onBtnChangePositionBClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnChangePosition = e.control;
	changePosition(btnChangePosition, "B");
}


/*
 * 버튼(btnChangePositionC)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 9. 27.
 */
function onBtnChangePositionCClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnChangePosition = e.control;
	changePosition(btnChangePosition, "C");
}

function changePosition(poBtn, psType){
	
	var bOn = setStyleOn(poBtn);
	programManager.setViewType(psType);
	programManager.changeFormation(psType);
	setWindowType(psType);
}



/*
 * Body에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 * 2019. 9. 30.
 */
function onBodyMeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	
}


/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 * 2019. 9. 30.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
}


/*
 * "세부내용 편집" 버튼(btnPop)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 10. 24.
 */
function onBtnPopClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPop = e.control;
	//변액 팝업화면 호출
	util.Dialog.open("hlicp/vri/app/퍼블/일검증P01",640, 290);
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 * 2019. 10. 25.
 */
function onGridMenualSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var gridMenual = e.control;
	//언더라이팅 팝업화면 호출
	var sMenualTitle = gridMenual.getCellValue(gridMenual.getSelectedRowIndex(), 0);
	var sMenualPath  = gridMenual.getCellValue(gridMenual.getSelectedRowIndex(), 1);
	
	var initValue = {"menualTitle": sMenualTitle ,
					 "menualPath" : sMenualPath};
	util.Dialog.open("hlicp/nct/app/퍼블/전자 매뉴얼P01",800, 630,function(e){},initValue);
}

			
			

/*
 * 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 11. 15.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	util.print();
}


/*
 * 버튼(btn20)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 11. 15.
 */
function onBtn20Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn20 = e.control;
	
	util.print();
}


/*
 * 탭 폴더에서 tabheader-click 이벤트 발생 시 호출.
 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트입니다.
 * 2019. 12. 5.
 */
function onTabFloatingMenuTabheaderClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabFloatingMenu = e.control;
	var tabIdx = e.item.itemIndex;
	var pgmId = app.lookup("tabFloatingMenu").getTabItems()[tabIdx].userAttr("pgmId");
	programManager.active(pgmId);
}



/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 * 2020. 1. 14.
 */
function onTreMenuSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
}

//

function setWindowType(psType){
	var sWindowType = app.getAppProperty("windowType");
	if(sWindowType != psType){
		app.setAppProperty("windowType", psType);
	}
	app.lookup("grpWindowTypes").redraw();
}

/*
 * "-" 버튼(btn33)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 1. 29.
 */
function onBtn33Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn33 = e.control;
	scaleOut();
}


/*
 * "+" 버튼(btn34)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 1. 29.
 */
function onBtn34Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn34 = e.control;
	scaleIn();
}


/*
 * "o" 버튼(btn35)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 2. 26.
 */
function onBtn35Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn35 = e.control;
	scaleReset();
}
