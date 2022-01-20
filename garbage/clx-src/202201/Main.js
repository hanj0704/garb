/************************************************
 * Main.js
 * Created at 2020. 4. 17. 오후 3:41:27.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();
var msUserNm = "";
/************************************************
 * 전역 변수 선언
 ************************************************/

var conn;

var _originalOrder = new cpr.utils.ObjectMap(); // 컨트롤 순서

/************************************************
 * 사용자 정의 함수
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe("app-msg", this, function(poMsgInfo) {
	var vcNotiToastr = app.lookup("notiToastr");
	var vsMsg = cpr.I18N.INSTANCE.message(poMsgInfo["MSG"]) || poMsgInfo["MSG"];
	
	if (poMsgInfo["TYPE"] == "SUCCESS") {
		vcNotiToastr.success(vsMsg);
	} else if (poMsgInfo["TYPE"] == "INFO") {
		vcNotiToastr.info(vsMsg);
	} else if (poMsgInfo["TYPE"] == "WARNING") {
		vcNotiToastr.warning(vsMsg);
	} else if (poMsgInfo["TYPE"] == "DANGER") {
		vcNotiToastr.danger(vsMsg);
	} else if (poMsgInfo["TYPE"] == "PUSH") {
		// Push Message 받은 경우
		var voMsgArr = JSON.parse(vsMsg);
		
		if(Object.keys(voMsgArr["return"]).length > 0) {
			vcNotiToastr.addEventListenerOnce("item-click", function () {
				util.Dialog.open(app, "app/scr/popup/PushMsg", 500, 600, function() {
					
				}, {
					"URL" :  voMsgArr["return"]["message"]["url"]
				});
			});
			vcNotiToastr.info(voMsgArr["return"]["message"]["message"]);
		}
	} else {
		poMsgInfo["TYPE"] = "INFO";
		vcNotiToastr.info(vsMsg);
	}
	
	/* 알림방에 메세지 저장 */
	if (poMsgInfo["PUSH"]){
		stackMsgInfo(poMsgInfo);
	}
});


/**
 * 메세지 스택을 저장합니다.
 * @param {{TYPE: "DEFAULT" | "INFO" | "SUCCESS" | "WARNING" | "DANGER", MSG:String}} poMsgInfo
 */
function stackMsgInfo(poMsgInfo) {
	var vcDsMsgStack = app.lookup("dsMsgStack");
	
	var voNewStack = vcDsMsgStack.insertRowData(0, false, {
		"status" : poMsgInfo["TYPE"],
		"text" : poMsgInfo["MSG"],
		"time" : moment().format("YYYY-MM-DD hh:mm:ss")
	});
	
	createNotificationItem(voNewStack);
	
	util.Control.redraw(app, "btnAlrt");
}


/**
 * 알림방에 표시되는 메세지 아이템을 생성합니다.
 * @param {cpr.data.DataRow} poRow
 */
function createNotificationItem(poRow) {
	var vcGrpNotiItemWrap = app.lookup("grpNotiItemWrap");
	
	var vcNotiItem = new udc.com.main.NotificationItem();
	
	vcNotiItem.status = poRow.getValue("status");
	vcNotiItem.text = poRow.getValue("text");
	vcNotiItem.time = poRow.getValue("time");
	
	/* 아이템 클릭 시 발생할 이벤트 정의 */
	vcNotiItem.addEventListener("item-click", function(e) {
		var vcClickedItem = e.control;
		
		/* 알림 재호출 (다시 저장하지 않으므로 공통 사용하지 않음) */
		cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
			TYPE : vcClickedItem.status,
			MSG : vcClickedItem.text,
			REPLAY : true
		});
		
		removeNotificationItem(vcClickedItem);
	});
	
	/* 아이템 닫기 클릭 시 발생할 이벤트 정의 */
	vcNotiItem.addEventListener("close", function(e) {
		var vcClickedItem = e.control;
		
		removeNotificationItem(vcClickedItem);
	});
	
	vcGrpNotiItemWrap.insertChild(0, vcNotiItem, {
		autoSize : "height"
	});
}


/**
 * 메세지 아이템을 삭제합니다. 파라미터를 넘기지 않는 경우 모든 아이템을 삭제합니다.
 * @param {udc.com.main.NotificationItem} pcItem?
 */
function removeNotificationItem(pcItem) {
	var vcGrpNotiItemWrap = app.lookup("grpNotiItemWrap");
	
	if (ValueUtil.isNull(pcItem)){
		vcGrpNotiItemWrap.removeAllChildren(true);
		return;
	}
	
	var vnItemIdx = vcGrpNotiItemWrap.getChildren().indexOf(pcItem);
	
	vcGrpNotiItemWrap.removeChild(pcItem, true);
	
	app.lookup("dsMsgStack").realDeleteRow(vnItemIdx);
}


/**
 * 컨트롤 순서를 기억합니다.
 */
function backup() {
	
	var vcGrpCont = app.getContainer();
	vcGrpCont.getChildren().forEach(function(each, index){
		_originalOrder.put(each.id, index);
	});
}


/**
 * 특정 컨트롤을 플로팅합니다.
 * @param {cpr.controls.UIControl} pcControl
 * @param {{top:String, right:String, bottom:String, left:String, width:String, height:String}} poConstraint
 * @param {Function} poCallbackFunc
 */
function floating(pcControl, poConstraint, poCallbackFunc) {
	var vcFloatingTarget = pcControl;
	
	var vcGrpCont = app.getContainer();
	
	var vcGrpOverlay = new cpr.controls.Container();
	vcGrpOverlay.setLayout(new cpr.controls.layouts.XYLayout());
	
	vcGrpOverlay.userAttr("floated-configuration", "true");
	
	vcGrpOverlay.addEventListenerOnce("click", function(e) {
		unfloating(vcFloatingTarget);
		if (_.isFunction(poCallbackFunc)) poCallbackFunc();
	});
	
	vcGrpCont.addChild(vcGrpOverlay, {
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px"
	});
	
	util.Control.setVisible(app, true, vcFloatingTarget.id);
	
	vcGrpCont.floatControl(vcFloatingTarget, poConstraint);
	
	vcFloatingTarget.focus();
}


/**
 * 특정 컨트롤의 플로팅을 해제합니다.
 * @param {cpr.controls.UIControl} pcControl
 */
function unfloating(pcControl) {
	var vcGrpCont = app.getContainer();
	vcGrpCont.getChildren().filter(function(each){
		return each.userAttr("floated-configuration") == "true";
	}).forEach(function(each){
		vcGrpCont.removeChild(each, true);
	});
	app.getFloatingControls().filter(function(each){
		return each.userAttr("floated-configuration") == "true";
	}).forEach(function(each){
		each.dispose();
	});

	var voActualRect = pcControl.getActualRect();
	vcGrpCont.insertChild(_originalOrder.get(pcControl.id), pcControl, {
		top : voActualRect.top + "px",
		bottom : voActualRect.bottom + "px",
		left : voActualRect.left + "px",
		width : voActualRect.width + "px",
//		height : voActualRect.height + "px"
	});
	
	if (pcControl.userAttr("prevent-hide") != "true"){
		util.Control.setVisible(app, false, pcControl.id);
	}
}


/**
 * 트리 메뉴를 숨기고 미니 메뉴를 표시합니다.
 */
function collapseSideMenu() {
	var vcGrpCont = app.getContainer();
	var vcGrpHeader = app.lookup("grpHeader");
	var vcGrpAside = app.lookup("grpAside");
	var vcMnuMnMenu = app.lookup("mnuMnMenu");
	var vcMdiCn = app.lookup("mdiCn");
	
	var vsStndSize = "60px";
	
	/* 상태에 따라 컨트롤 크기 및 위치 변경 */
	vcGrpCont.updateConstraint(vcGrpHeader, {
		left : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcGrpAside, {
		width : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcMdiCn, {
		left : vsStndSize
	});
	
	/* 상태에 따라 컨트롤 숨김 또는 표시 */
	util.Control.setVisible(app, true, "mnuMnMenu");
	util.Control.setVisible(app, false, ["grpMenuWrap", "grpLogo"]);
}


/**
 * 미니 메뉴를 숨기고 트리 메뉴를 표시합니다.
 */
function expandSideMenu() {
	var vcGrpCont = app.getContainer();
	var vcGrpHeader = app.lookup("grpHeader");
	var vcGrpAside = app.lookup("grpAside");
	var vcMnuMnMenu = app.lookup("mnuMnMenu");
	var vcMdiCn = app.lookup("mdiCn");
	
	var vsStndSize = "230px";
	
	/* 상태에 따라 컨트롤 크기 및 위치 변경 */
	vcGrpCont.updateConstraint(vcGrpHeader, {
		left : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcGrpAside, {
		width : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcMdiCn, {
		left : vsStndSize
	});
	
	/* 상태에 따라 컨트롤 숨김 또는 표시 */
	util.Control.setVisible(app, false, "mnuMnMenu");
	util.Control.setVisible(app, true, ["grpMenuWrap", "grpLogo"]);
}


/**
 * 모바일 레이아웃으로 변경합니다.
 */
function changeToMobile() {
	/* 상태에 따른 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "grpHeader", null, {
		left : "0px"
	});
	
	util.Control.updateConstraint(app, "grpAside", null, {
		width : "0px"
	});
	
//	util.Control.updateConstraint(app, "mnuMnMenu", null, {
//		width : "0px"
//	});
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		left : "0px"
	});
	
	/* 컨트롤 숨김 또는 표시 설정 */
	util.Control.setVisible(app, true, ["btnDropdown"]);
	util.Control.setVisible(app, false, ["cbxToggle", "grpNav" ,"mnuMnMenu"]);
	
	/* 상태에 따른 레이아웃 변경 */
	app.lookup("mdiCn").addHeaderControl(app.lookup("grpCnHdR"), {position : "right", width : "35"});
	
	/* 컨트롤 다시 그리기 요청 */
	util.Control.redraw(app, ["grpHeader", "mdiCn"]);
}


/**
 * 디폴트 레이아웃으로 변경합니다.
 */
function changeToDefault() {
	var vbExpanded = app.lookup("cbxToggle").checked;
	
	var vsToggleWidth = null;
	
	var vsStdrSize = null;
	if (vbExpanded){
		vsStdrSize = "230px";
		util.Control.setVisible(app, false, "mnuMnMenu");
	} else {
		vsStdrSize = "60px";
		util.Control.setVisible(app, true, "mnuMnMenu");
	}
	
	/* 컨텐츠 확대 상태의 경우 상태 되돌리기 */
	if (app.lookup("btnZoom").style.hasClass("cl-selected")){
		app.lookup("btnZoom").click();
	}
	
	/* 상태에 따른 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "grpHeader", null, {
		left : vsStdrSize
	});
	
	util.Control.updateConstraint(app, "grpAside", null, {
		top : "0px",
		bottom : "0px",
		width : vsStdrSize
	});
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		left : vsStdrSize
	});
	
	/* 컨트롤 숨김 또는 표시 설정 */
	util.Control.setVisible(app, false, ["btnDropdown", "grpCnHdRVrt"]);
	util.Control.setVisible(app, true, ["cbxToggle", "grpNav"]);
	
	/* 상태에 따른 레이아웃 변경 */
	app.lookup("mdiCn").addHeaderControl(app.lookup("grpCnHdR"), {position : "right", width : "140"});
	
	/* 컨트롤 다시 그리기 요청 */
	util.Control.redraw(app, ["grpHeader", "mdiCn"]);
}


/**
 * 메뉴를 토글합니다.
 * @param {cpr.controls.Tree} pcTree
 * @param {cpr.controls.TreeItem} poItem
 */
function toggleMenuItem(pcTree,poItem) {
	var vcTreMenu = pcTree;

	/* 클릭한 아이템이 최상위 아이템인 경우 모든 아이템 닫기 */
	if (!vcTreMenu.isExpanded(poItem) && ValueUtil.isNull(poItem.parentItem)){
		vcTreMenu.collapseAllItems();
	}
	
	vcTreMenu.toggle(poItem);
}


/**
 * 메뉴를 엽니다.
 * @param {cpr.controls.Item} pcItem
 */
function openMenuItem(pcItem) {
	var vsAppId = pcItem.row.getValue("APP_ID");
	if (ValueUtil.isNull(vsAppId)){
		return;
	}
	
	var vcMdiCn = app.lookup("mdiCn");
	var voAlreadyOpenedItem = vcMdiCn.findItemWithAppID(vsAppId);
	
	if (voAlreadyOpenedItem){
		vcMdiCn.setSelectedTabItem(voAlreadyOpenedItem);
		return;
	}
	
	var vsMenuLabel = pcItem.label;
	
	/* 화면분할 유지한 채 메뉴 오픈 */
	vcMdiCn.addItemWithApp(vsAppId, true);
}

exports.openMenuItem = openMenuItem;

/**
 * 범용 브라우저 3개 띄우기
 * @param {cpr.controls.TreeItem} poItem
 */
function openBrowser(poItem){
	
	//전용브라우저 내 페이지 open
	openMenuItem(poItem);
	
	//범용브라우저 3개
	var serviceName = "WinInfo.OpenBrowser";
	var openInfo = {
		"filePath":[
			cpr.core.AppConfig.INSTANCE.getVarConfig().getValue("iePath"),
			cpr.core.AppConfig.INSTANCE.getVarConfig().getValue("chromePath"),
			cpr.core.AppConfig.INSTANCE.getVarConfig().getValue("edgePath")
		],
		"url":"http://localhost:8080/app/scr/funcs/PAGE-11.clx"
	}
	
	conn.send(serviceName, openInfo, function(ev){		
		util.Msg.log(serviceName + " 브라우저 오픈" + JSON.stringify(ev));
	});
}


/**
 * 
 * @param {cpr.controls.TreeItem} poItem
 */
function openMenuFromSubMenu(poItem){
//	poItem.
	var vcMenuTab = app.lookup("menuTab");
	var vaTrees = [app.lookup("treMenu"),app.lookup("treMenu2"),app.lookup("treMenu3")];
	var voRow = poItem.row;
	var vsFavorite = voRow.getValue("FAVORITE");
	if(ValueUtil.fixNull(vsFavorite) != "") {
		var vcTree = vaTrees[2];
		vcMenuTab.setSelectedTabItem(vcMenuTab.getTabItems()[2]);
		vcTree.selectItem(poItem);
		//openMenuItem(poItem);
		
		//HTML5화면구현 클릭시 범용브라우저(3개) 실행
		if(poItem.value == "m00301") {
			openBrowser(poItem);
		} else {
			openMenuItem(poItem);
		}
		
//		vcTree.sele
	} else {
		var vsValue = voRow.getValue("MN_VALUE");
		var vcTree = vaTrees.find(function(each){
			var vcTempTree = each;
			var voItem = vcTempTree.findItem({value : vsValue});
			if(ValueUtil.fixNull(voItem) != "") {
				return each;
			}
		});
		var vnIndex = vaTrees.indexOf(vcTree);
		vcMenuTab.setSelectedTabItem(vcMenuTab.getTabItems()[vnIndex]);
		vcTree.selectItem(poItem);
		if(poItem.parentItem) {
			if(!vcTree.isExpanded(poItem.parentItem)) {
				
				toggleMenuItem(vcTree, poItem.parentItem);
			}
		}
		//openMenuItem(poItem);
		
		//HTML5화면구현 클릭시 범용브라우저(3개) 실행
		if(poItem.value == "m00301") {
			openBrowser(poItem);
		} else {
			openMenuItem(poItem);
		}
	}
//	if (ValueUtil.isNull(vsAppId)){
//		return;
//	}
}

exports.openMenuFromSubMenu = openMenuFromSubMenu;
/**
 * 컨텐츠 영역 (MDIFolder)를 확대합니다.
 */
function zoomInContent() {
	util.Control.updateConstraint(app, "mdiCn", null, {
		top : "0px",
		left : "0px"
	});
	
	app.lookup("btnZoom").style.addClass("cl-selected");
	app.lookup("btnVrtZoom").style.addClass("cl-selected");
}


/**
 * 컨텐츠 영역 (MDIFolder)를 축소합니다.
 */
function zoomOutConent() {
	var voHeaderActualRect = app.lookup("grpHeader").getActualRect();
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		top : voHeaderActualRect.height + "px",
		left : voHeaderActualRect.left + "px"
	});

	app.lookup("btnZoom").style.removeClass("cl-selected");
	app.lookup("btnVrtZoom").style.removeClass("cl-selected");
}


/**
 * 루트 아이템 선택 시, 트리메뉴에서 서브메뉴아이템만 보이도록 필터합니다.
 * @param {cpr.controls.MenuItem} poItem
 */
function filterTreeSubMenu (poItem) {
	
	if(!poItem) return;
	
	var treMenu = app.lookup("treMenu");
	var treMiniMenu = app.lookup("mnuMnMenu");

	if(poItem.parentItem == null) {
		treMenu.setFilter("hasAncestor('" + poItem.value + "') || (value == '" + poItem.value + "' && " + poItem.depth + " >0 )");
		treMiniMenu.setFilter("hasAncestor('" + poItem.value + "') || (value == '" + poItem.value + "' && " + poItem.depth + " >0 )");
		util.Control.redraw(app, ["treMenu", "mnuMnMenu"]);
	}
}

/**
 * 
 * @param {cpr.controls.MenuItem} poItem
 */
function findRootItem (poItem) {
	
	var vcTree = app.lookup("treMenu");
	vcTree.collapseAllItems();
	
	var next =vcTree.getItemByValue(poItem.value);
	var rootItem = next;

	// 선택된 아이템의 최상위 부모 찾기
	while(next != null){
		next = vcTree.getItemByValue(next.parentValue);
		if(next != null){
			rootItem = next;
		}
	}
	
	return rootItem;
}


/**
 * 
 * @param {String} psAppId
 * @param {Boolean} pbFavorite
 */
function setMenuFavorite(psAppId,pbFavorite){
	var vcDsMenu = app.lookup("dsMenuFavorite");
	if(pbFavorite) {
		vcDsMenu.addRowData({
			"FAVORITE_APP_ID" : psAppId
		})
	} else {
		var voRow = vcDsMenu.findFirstRow("FAVORITE_APP_ID == '"+psAppId+"'")
		if(voRow) {
			
			var vnRowIndex = voRow.getIndex();
			vcDsMenu.deleteRow(vnRowIndex);
		}
	}
	app.lookup("subFavSave").send();
	
}
exports.setMenuFavorite = setMenuFavorite;

function getMenuFavorite(psAppId) {
	var vcDsMenu = app.lookup("dsMenu");
	var voRow = vcDsMenu.findFirstRow("APP_ID =='"+psAppId+"'");
	
	if(voRow) {
		var vsFavorite = voRow.getValue("IS_FAVORITE");
		return vsFavorite;
	} else {
		return "false"
	}
}

exports.getMenuFavorite = getMenuFavorite
/**
 * 이미지 캡처 혹은 파일 다운로드시, 다운로드하여 저장되는 디렉토리명과, 파일명을 관리하고 내보내는 함수입니다.
 * 파라미터로 image, 혹은 data 파일 디렉토리를 구분해야하며, image라고 집어넣지 않은 다른 모든 경우는
 * 데이터 파일 경로가 리턴됩니다.
 * @param {"image"|"data"} psType
 */
exports.getFileConfig = function(psType){
	
	var vcDmFileConfig = app.lookup("dmFileConfig");
	var vsNameColNm = "DATA_FILE_NAME";
	var vsPathColNm = "DATA_FILE_PATH";
	if(psType == "image") {
		vsNameColNm = "IMAGE_FILE_NAME";
		vsPathColNm = "IMAGE_FILE_PATH"
	}
	var voReturn = {
		"FILE_NAME" : vcDmFileConfig.getValue(vsNameColNm),
		"FILE_PATH" : vcDmFileConfig.getValue(vsPathColNm)
	}
	return voReturn;
}

exports.conn = function () {
	return conn;
}

/************************************************
 * 컨트롤 이벤트 (앱)
 ************************************************/
cpr.core.AppConfig.INSTANCE.setControlValue("tree", {
	"useCustomScrollbar" : true
});

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	conn = new exdevice.Connector();
	conn.onready = function(){
		cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
			"TYPE" : "SUCCESS",
			"MSG" : "eXDevice 가 정상적으로 연결되었습니다."
		});
		
		conn.send("nhTcpsvc.Connect", {}, function(msg) {
			var browserInfo = {
				"filePath": cpr.core.AppConfig.INSTANCE.getVarConfig().getValue("obrowserPath")
			}
			conn.send("nhTcpsvc.SetDefaultBrowser",browserInfo, function(msg2){
			}, true)
			
			cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
				"TYPE" : "PUSH",
				"MSG" : JSON.stringify(msg)
			});
		})
	}
	conn.connect();
	
	var vsUserNm = cpr.core.Platform.INSTANCE.getParameter("userNm");
	if(ValueUtil.fixNull(vsUserNm) != "") {
		util.Control.setValue(app, "optUser", vsUserNm+" 님 안녕하세요!");
		msUserNm = vsUserNm;
	}
	//defaults.js관련 추가 
	//append kimjj 2021-11-04
	 var config = cpr.core.AppConfig.INSTANCE; 
      config.getControlConfig().setValue("combobox.maxVisibleItems", 7); 
      config.getEnvConfig().setValue("appcache", false);
      
	backup();
	util.Submit.send(app, "subMenuList", function(){
//		util.Control.redraw(app, ["grpLogo", "mnuMnMenu", "grpAside", "grpHeader", "mdiCn"]);
//			util.Control.redraw(app, "treMenu3");
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess){
			
			app.lookup("optTime").value = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
			
			/* 메인 파츠 다시 그리기 요청 */
			var vcDSFa = app.lookup("dsMenuFavorite");
			var vcDsMenu = app.lookup("dsMenu");
			console.log(vcDsMenu.getRowDataRanged());
//			vcDsMenu.
			vcDSFa.forEachOfUnfilteredRows(function(dataRow){
				console.log(dataRow.getRowData())
				var row = vcDsMenu.findFirstRow("APP_ID == '"+dataRow.getValue("FAVORITE_APP_ID")+"'");
				if(row) {
					
					row.setValue("IS_FAVORITE", "true");
				}
			});
			util.Control.redraw(app, ["grpLogo", "mnuMnMenu", "grpAside", "grpHeader", "mdiCn"]);
			util.Control.redraw(app, "treMenu3");
//			util.Submit.send(app, "subUserList", function(pbSuccess2) {
//				if(pbSuccess2) {
//					var dsUserInfo = app.lookup("dsUserInfo");
//					var data =dsUserInfo.getRowData(0);
//					
//					// TODO 인코딩 파일 확인 필요
//					var vsUserInfo = cpr.utils.HTMLEncoder.encodeForHTML(data["CNAME"]) + "/" + data["MABN"];
//					util.Control.setValue(app, "optUser", vsUserInfo);
//				}
//			});
			}
		});
	});
	
	
	
}


/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	var vbMbScrn = e.screen.name != "default";
	
	if (vbMbScrn){
		changeToMobile();
	} else {
		changeToDefault();
	}
	
	transitionEnd();
}


/************************************************
 * 컨트롤 이벤트 (헤더 영역)
 ************************************************/

/*
 * 버튼(btnMToggle)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMToggleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMToggle = e.control;
	
	/* 모바일일 때 트리 메뉴를 표시 */
	util.Control.setVisible(app, true, "grpMenuWrap");
	
	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
	floating(app.lookup("grpAside"), {
		top: "0px",
		left: "0px",
		bottom: "0px",
		width: "230px"
	}, function() {
		/* 플로팅 해제 후 토글 상태에 따라 일반 메뉴 또는 미니 메뉴 표시 */
		if (app.lookup("cbxToggle").checked){
			util.Control.setVisible(app, true, "grpMenuWrap");
			util.Control.setVisible(app, false, "mnuMnMenu");
		} else {
			util.Control.setVisible(app, app.targetScreen.name == "default", "mnuMnMenu");
			util.Control.setVisible(app, false, "grpMenuWrap");
		}
	});
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxToggleValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbxToggle = e.control;
	
	/* 트리 메뉴 <-> 미니 메뉴로 변경 */
	if (!cbxToggle.checked){ // change to mini-menu
		collapseSideMenu();
	} else { // change to menu
		expandSideMenu();
	}
}


/*
 * 버튼(btnSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	
	var voActualRect = app.lookup("grpHeader").getActualRect();
	
	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
	floating(app.lookup("schUnfd"), {
		top: voActualRect.top + "px",
		left: voActualRect.left + "px",
		right: "0px",
		height: voActualRect.height + "px"
	});
}



/************************************************
 * 컨트롤 이벤트 (레프트 영역)
 ************************************************/

/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpLogoWrapClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpLogoWrap = e.control;
	
	/* 이벤트 추가 전파 방지 */
	e.stopPropagation();
	
	/* 메인 새로고침 */
	cpr.core.App.load("app/com/main/Main", function(loadedApp) {
		loadedApp.createNewInstance().run();
		app.dispose();
	});
}


/*
 * 버튼(btnPfSetting)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPfSettingClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPfSetting = e.control;
	
	util.Msg.notify(app, "INF-M000", "준비 중인 서비스입니다.");
}


/*
 * 버튼(btnLogout)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLogoutClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLogout = e.control;
	
	//TODO 로그아웃 관련 로직을 작성하십시오.
	
	/* 로그인 화면으로 전환 (SPA 전환) */
	cpr.core.App.load("app/com/login/Login", function(loadedApp){
		loadedApp.createNewInstance().run();
		app.dispose();
	});
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	toggleMenuItem(treMenu,vcMenuItem);
	
	//openMenuItem(vcMenuItem);
	
	//메뉴 내 HTML5화면구현 클릭시 범용브라우저(3개) 실행
	if(vcMenuItem.value == "m00301") {
			openBrowser(vcMenuItem);
	} else {
			openMenuItem(vcMenuItem);
	}
	
	app.lookup("mnuMnMenu").selectItemByValue(vcMenuItem.value);
}


/*
 * 메뉴에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onMnuMnMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Menu
	 */
	var mnuMnMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	openMenuItem(vcMenuItem);
	
	app.lookup("treMenu").selectItemByValue(vcMenuItem.value);
}

/************************************************
 * 컨트롤 이벤트 (컨텐츠 영역)
 ************************************************/


/*
 * 버튼(btnDfItem)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDfItemClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDfItem = e.control;
	
	/* 디폴트 탭 아이템 선택 스타일 설정 */
	var vbSelcted = btnDfItem.style.hasClass("cl-selected");
	if (vbSelcted == false){
		btnDfItem.style.addClass("cl-selected");
	}
	
	/* 디폴트 탭 아이템 선택 (숨겨진 탭 아이템 선택) */
	var vcMdiCn = app.lookup("mdiCn");
	vcMdiCn.setSelectedTabItem(vcMdiCn.getTabItems()[0], false);
}


/*
 * MDI 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onMdiCnSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	/* 선택 아이템에 따라 디폴트 탭 아이템 스타일 설정 */
	if (mdiCn.getTabItems()[0] == e.newSelection){
		app.lookup("btnDfItem").style.addClass("cl-selected");
	} else {
		app.lookup("btnDfItem").style.removeClass("cl-selected");
	}
}


/*
 * MDI 폴더에서 content-init 이벤트 발생 시 호출.
 * TabItem의 Content가 그려질 준비를 마쳤을 때 호출되는 이벤트로 컨트롤을 그리는 스크립트가 동작한 후 호출됨.
 */
function onMdiCnContentInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
}


/*
 * MDI 폴더에서 content-ready 이벤트 발생 시 호출.
 * TabItem의 Content가 그려질 준비를 마쳤을 때 호출되는 이벤트로 컨트롤을 그리는 스크립트가 동작하기 전에 호출됨.
 */
function onMdiCnContentReady(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
}


/*
 * MDI 폴더에서 close 이벤트 발생 시 호출.
 * 탭 아이템을 닫을 때 발생하는 이벤트이며, 사용자가 취소할 수 있습니다.
 */
function onMdiCnClose(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	var vaLastTabItems = _.reject(mdiCn.getTabItems(), function(each) {
		return each == e.content;
	});
	
	if (vaLastTabItems.length > 1){
		return;
	}
	
	mdiCn.setSelectedTabItem(vaLastTabItems[0]);
}


/*
 * 버튼(btnDropdown)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDropdownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDropdown = e.control;
	
	var vcGrpCnHdRVrt = app.lookup("grpCnHdRVrt");
	
	var voActualRect = btnDropdown.getActualRect();
	var voTargetConstraint = app.getContainer().getConstraint(vcGrpCnHdRVrt);
	
	floating(vcGrpCnHdRVrt, {
		top : voActualRect.bottomCenter.y + "px",
		right : "5px",
		height : voTargetConstraint.height,
		width: voTargetConstraint.width	
	});	
}


/*
 * 버튼(btnZoom)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnZoomClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnZoom = e.control;
	
	var vbZoomed = btnZoom.style.hasClass("cl-selected");
	if (vbZoomed){
		zoomOutConent();
	} else {
		zoomInContent();
	}
}


/*
 * 버튼(btnRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRefreshClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRefresh = e.control;
	
	/* 현재 선택되어 있는 화면을 새로고침 합니다. */
	var vcMdiCn = app.lookup("mdiCn");
	
	var vcSelectedTabItem = vcMdiCn.getSelectedTabItem();
	var vcItemCn = vcSelectedTabItem.content;
	
	if (vcItemCn instanceof cpr.controls.EmbeddedApp){
		var vsAppId = vcItemCn.app.id;
		vcItemCn.app = null;
		cpr.core.App.load(vsAppId, function(loadedApp){
			vcItemCn.app = loadedApp;
			vcItemCn.redraw();
		});
	}
}


/*
 * 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	
	var vcMdiCn = app.lookup("mdiCn");
	
	/* 디폴트 탭 아이템을 제외한 나머지 탭 아이템을 모두 닫음 */
	vcMdiCn.closeOthers(vcMdiCn.getTabItems()[0]);
	app.lookup("btnDfItem").click();
}



/************************************************
 * 컨트롤 이벤트 (플로팅 영역)
 ************************************************/

var vnSelectedFilterItem = 0;

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSchUnfdSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.SearchInput
	 */
	var schUnfd = e.control;
	
	//TODO 통합검색 로직을 작성하십시오.
	var vsFindWrd = schUnfd.value;
	var vcTreeMenu = app.lookup("treMenu2");
	
	if(vsFindWrd == "" || vsFindWrd == null) {
		vcTreeMenu.collapseAllItems();
		app.getFloatingControls().filter(function(each){
			return each.userAttr("floated-configuration") == "true";
		}).forEach(function(each){
			each.dispose();
		});
	} else {
		var findItems = vcTreeMenu.dataSet.findAllRow("(MN_LABEL *=  '" + vsFindWrd + "' ||" +" MN_LABEL.toLowerCase() *= '"+vsFindWrd.toLowerCase()+"' ||"
		 + " HASH_CODE.toLowerCase() *= '"+vsFindWrd.toLowerCase()+"') && APP_ID != ''");
		if (findItems.length > 0) {
			var newContainer = new cpr.controls.Container("tempCont");
			var flowLayout = new cpr.controls.layouts.FlowLayout();
			flowLayout.horizontalAlign = "left";
			flowLayout.verticalAlign = "middle";
			flowLayout.horizontalSpacing = 10;
			flowLayout.verticalSpacing = 0;
			flowLayout.leftMargin = 10;
			flowLayout.topMargin = 10;
			newContainer.setLayout(flowLayout);
			newContainer.style.addClass("card");
			newContainer.userAttr("floated-configuration", "true");
			var rect = schUnfd.getActualRect();
			
			app.floatControl(newContainer,{
				left : (rect.left + 5)+"px",
				top : (rect.bottom + 5)+"px",
				width : (rect.width -10)+"px",
				height : "50px"
			});
			findItems.forEach(function(each){
				
				var newBtn = new cpr.controls.Button();
				newBtn.value = each.getValue("MN_LABEL");
				newBtn.style.setClasses("pr-1 pl-1");
				newBtn.addEventListener("click", function(ev){
					var btnControl = ev.control;
					var voTempItem = vcTreeMenu.findItem({label : btnControl.value});
					if(ValueUtil.fixNull(voTempItem) != ""){
						openMenuFromSubMenu(voTempItem)
//						toggleMenuItem(vcTreeMenu,)
//						vcTreeMenu.selectItem(voTempItem);
//						openMenuItem(voTempItem);
						unfloating(app.lookup("schUnfd"));
					}
				});
				newContainer.addChild(newBtn, {
					"width" : "100px",
					"height" : "30px",
					"autoSize" : "width"
				});
			});
			vcTreeMenu.redraw();
		} else {
			
			app.getFloatingControls().filter(function(each){
				return each.userAttr("floated-configuration") == "true";
			}).forEach(function(each){
				each.dispose();
			});
			util.Msg.notify(app, "INF-M000", "찾으신 화면이 존재하지 않습니다.", "INFO");
			return false;
		}
	}
	
//	util.Msg.notify(app, "INF-M000", "통합검색이 완료되었습니다.", "SUCCESS");
}


/*
 * "Clear All" 아웃풋(optNtClrAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtClrAllClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optNtClrAll = e.control;
	
	/* 메세지 정보 모두 삭제 */
	app.lookup("dsMsgStack").clear();
	
	/* 메세지 아이템 삭제 */
	
	util.Control.redraw(app, ["grpNotiBox", "btnAlrt"]);
}


/*
 * "View All" 아웃풋(optNtVwAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtVwAllClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optNtVwAll = e.control;
	
	//TODO 공지사항 또는 알림 관련 로직을 작성하십시오.
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpCnHdRVrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpCnHdRVrt = e.control;
	
	unfloating(grpCnHdRVrt);	
}


/*
 * 버튼(btnVrtZoom)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtZoomClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtZoom = e.control;
	
	app.lookup("btnZoom").click();
}


/*
 * 버튼(btnVrtRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtRefreshClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtRefresh = e.control;
	
	app.lookup("btnRefresh").click();
}


/*
 * 버튼(btnVrtClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtClose = e.control;
	
	app.lookup("btnClose").click();
}


/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImgLogoClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var imgLogo = e.control;
	
	location.reload("");
}


/*
 * "로그아웃" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	util.Submit.send(app, "subLogout", function(pbSuccess){
			
			if(pbSuccess){
				top.location.href = top.location.href
			}
	});
}


/**
 * 메인 화면에 transition 으로 인해 그리드 column넓이를 재계산을 위한 redraw
 */
function transitionEnd(){
	
	var container = app.getContainer();
	var layout = container.getLayout();
	var animationDuration = layout.animationDuration;
	
	//animation duration이 0일경우 다시 그리지 않는다.
	if(animationDuration == 0){
		return ;
	}	
	
	var transitionTime = (animationDuration * 1000);
	var event = new cpr.events.CAppEvent('windowResize');
	
	setTimeout(function(){
		app.lookup("mdiCn").redraw();
		
		app.dispatchEvent(event);
	}, transitionTime);
}



/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubFavSaveSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subFavSave = e.control;
	app.lookup("subOnLoad").send();
}


/*
 * 버튼(btnAlrt)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAlrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAlrt = e.control;
	
	var vcGrpNotiBox = app.lookup("grpNotiBox");
	
	var voActualRect = btnAlrt.getActualRect();
	var voTargetConstraint = app.getContainer().getConstraint(vcGrpNotiBox);
	
	floating(vcGrpNotiBox, {
		top : "59px",
		left : voActualRect.centerRight.x - parseInt(voTargetConstraint.width) + "px",
		height: voTargetConstraint.height,
		width: voTargetConstraint.width
	});
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	console.log(app.lookup("dsMenu").getRowDataRanged());
}
