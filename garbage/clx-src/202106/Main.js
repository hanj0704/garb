/************************************************
 * Main.js
 * Created at 2020. 4. 17. 오후 3:41:27.
 *
 * @author ryu
 ************************************************/
clientUUID = cpr.core.Platform.INSTANCE.getParameter("clientUUID");

cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(e){
	var control = e.control;
	if(control instanceof cpr.controls.MDIFolder) {
		console.log("selection-change");
		/** @type cpr.controls.TabItem */
		var voSelection = e.newSelection;
		/** @type cpr.controls.EmbeddedApp */
		var vcSelectContent = voSelection.content;
		if(vcSelectContent == undefined) {
			control.addEventListenerOnce("content-ready", function(ev){
				/** @type cpr.controls.EmbeddedApp */
				var vcEmb = ev.content.content;
				
//				console.log(remakePageParam(vcEmb.getEmbeddedAppInstance(), "GetIOValue"));
				
			})
		} else {
			if(vcSelectContent.getEmbeddedAppInstance() == undefined) {
				vcSelectContent.ready(function(){
					var voEmbAppIns = vcSelectContent.getEmbeddedAppInstance();
//					console.log(remakePageParam(voEmbAppIns, "GetIOValue"));
				});
			} else {
				var voEmbAppIns = vcSelectContent.getEmbeddedAppInstance();
//				console.log(remakePageParam(voEmbAppIns, "GetIOValue"));
			}
		} 
	}
});
/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/************************************************
 * 전역 변수 선언
 ************************************************/

var _originalOrder = new cpr.utils.ObjectMap(); // 컨트롤 순서

/************************************************
 * 사용자 정의 함수
 ************************************************/

/**
 * 메인화면의 left메뉴와 상단 메뉴의 enable을 제어합니다.
 * @param {any} pBool
 */
exports.setMainEnabled = function(pBool) {
	
	app.lookup("grpMenuWrap").enabled = pBool;
	app.lookup("grpHeader").enabled = pBool;
}

exports.setApp = function(psAppId) {
	
	cpr.core.App.load(psAppId, function(loadedApp) {
		
		app.lookup("ea1").app = loadedApp;
		
	});
}

exports.selectTreeItem = function(psAppId) {
	
	var vcTree = app.lookup("treMenu");
	
	var vcDsMenu = app.lookup("dsMenu");
	
	var voFirstRow = vcDsMenu.findFirstRow("appId =='" + psAppId + "'");
	
	var value = voFirstRow.getValue("value");
	
	vcTree.selectItemByValue(value);
	
}
/**
 * 메뉴를 토글합니다.
 * @param {cpr.controls.TreeItem} pcItem
 */
function toggleMenuItem(pcItem) {
	var vcTreMenu = app.lookup("treMenu");
	
	/* 클릭한 아이템이 최상위 아이템인 경우 모든 아이템 닫기 */
	if (!vcTreMenu.isExpanded(pcItem) && ValueUtil.isNull(pcItem.parentItem)) {
		vcTreMenu.collapseAllItems();
	}
	
	vcTreMenu.toggle(pcItem);
}

/**
 * 메뉴를 엽니다.
 * @param {cpr.controls.Item} pcItem
 */
function openMenuItem(pcItem) {
	var vsAppId = pcItem.row.getValue("appId");
	
	if (ValueUtil.isNull(vsAppId)) {
		return;
	}
	
	var vcMdiCn = app.lookup("mdiCn");
	var voAlreadyOpenedItem = vcMdiCn.findItemWithAppID(vsAppId);
	
	if (voAlreadyOpenedItem) {
		vcMdiCn.setSelectedTabItem(voAlreadyOpenedItem);
		return;
	}
	
	var vsMenuLabel = pcItem.label;
	
}

/************************************************
 * 컨트롤 이벤트 (앱)
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	
	app.lookup("lblAccTm").value = moment().format("YYYYMMDDHHmmss");
	util.Submit.send(app, "subOnLoad", null, function(pbSuccess) {
		if (pbSuccess) {
			
			/* 메인 파츠 다시 그리기 요청 */
			util.Control.redraw(app, ["grpLogo", "mnuMnMenu", "grpAside", "grpHeader", "mdiCn"]);
		}
	});
}

/************************************************
 * 컨트롤 이벤트 (헤더 영역)
 ************************************************/

/************************************************
 * 컨트롤 이벤트 (레프트 영역)
 ************************************************/

/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpLogoWrapClick( /* cpr.events.CMouseEvent */ e) {
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
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreMenuItemClick( /* cpr.events.CItemEvent */ e) {
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)) {
		return;
	}
	
	//	toggleMenuItem(vcMenuItem);
	//	
	//	openMenuItem(vcMenuItem);
	//	
	//	app.lookup("mnuMnMenu").selectItemByValue(vcMenuItem.value);
}
/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTreMenuSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
	var voSelectedTreeItem = e.newSelection[0];
//	
	var vsAppId = voSelectedTreeItem.row.getValue("appId");
//	//	if(vsAppId != null){
//	//		
//	//		cpr.core.App.load(vsAppId, function(loadedApp){
//	//			
//	//			app.lookup("ea1").app = loadedApp;
//	//		});
//	//	}
	var vcMdi = app.lookup("mdi1");
	
	if (vcMdi.findItemWithAppID(vsAppId)) {
		
		vcMdi.setSelectedTabItem(vcMdi.findItemWithAppID(vsAppId));
		
		var a = vcMdi.findItemWithAppID(vsAppId);
		var rpp = a.content.getEmbeddedAppInstance();
	} else {
		
		vcMdi.addItemWithApp(vsAppId);
		}
//		vcMdi.addEventListenerOnce("content-load", function(ev) {
//			var ctrl = ev.control;
//			var emb = ev.content.content;
//			/** @type cpr.core.AppInstance */
//			var a = emb.getEmbeddedAppInstance();
//			console.log(a);
//			/** @type cpr.controls.MDIFolder*/
//			var mdmd = a.getContainer().getChildren().filter(function(each) {
//				return each instanceof cpr.controls.MDIFolder;
//			});
//			var rpp ;
//			if (mdmd) {
//				rpp = remakePageParam(mdmd.getSelectedTabItem().content.getEmbeddedAppInstance(), "GetIOValue")
//			}else {
//				
//				rpp = remakePageParam(a, "GetIOValue");
//			}
//			console.log(rpp);
//		})
//	}
	
	//	var a = cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
	//	
	//	var b = a.filter(function(each){
	//		if(each.id.indexOf("udc") == -1) {
	//			return each;
	//		}
	//	});
	//	console.log(b);
	//	remakePageParam(poAppInstance, psActionCommand)
}

/************************************************
 * 컨트롤 이벤트 (컨텐츠 영역)
 ************************************************/

/************************************************
 * 컨트롤 이벤트 (라이트 영역)
 ************************************************/

/*
 * "Buzzer Off" 버튼(btnBuzzer)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnBuzzerClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnBuzzer = e.control;
	
	if (btnBuzzer.userAttr("buzzer") == "on") {
		
		btnBuzzer.value = "Buzzer On";
		btnBuzzer.userAttr("buzzer", "off");
		btnBuzzer.icon = "theme/images/icons/volume-x.svg"
	} else {
		btnBuzzer.value = "Buzzer Off";
		btnBuzzer.userAttr("buzzer", "on");
		btnBuzzer.icon = "theme/images/icons/volume-2.svg"
		
	}
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	//	if ( (stompWS == null || !stompWS.connected) ) {
	//		var url = '';
	//		var sock = null ;	
	//		var stomp = null;
	//		var cnt = 0 ; 
	//		var cntMax = 5 ; 
	//		url = '/websocket';
	//		sock = new SockJS(url);	
	//		stomp = Stomp.over(sock);
	//		stompWS = stomp;
	//		stompWS.debug = null;
	//		stompWS.connect({name:"test", id : "test"},function(frame) {
	//			stompWS.subscribe('/ws/MonitorWafers/init', function(rtnJsonStr){
	//
	//			},{id : "test1"});
	//			stompWS = this ;  
	//			return this ;
	//		}, function(frame){
	//		 		// 서버 종료로 disconnect 되는 경우
	//		 		console.log("notConnected!")
	//			 	var timer = setInterval(function(){
	//	//		 		if(true) {
	//			 		if(cnt >= cntMax) {
	//			 		 	clearInterval(timer);
	//			 		} else {
	//				 		cnt++;
	//				 		if (stompWS) {
	//							stompWS.disconnect();
	//						}
	//				 		test();
	//			 		}
	//			 	}, 5000);
	//		 });
	//	} else {
	//		console.log("aaaaaaaaaaaaa")
	//		return stompWS ;
	//	}
}

/*
 * 트리에서 before-selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onTreMenuBeforeSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
}
