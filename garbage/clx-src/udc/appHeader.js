
var util = createCommonUtil();

var openedByChange = false;

var mbCollapsed = false;
var mnOriginCtrlHeight = "0px";
var maResizeCtrlsConstraint = [];

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//어플리케이션 메뉴 정보
	var voMenuInfo = util.Auth.getMenuInfo(app); 
	//어플리케이션 타이틀 셋팅
	var vcTitle = app.lookup("optTitle");
	var vcPgmTitle = app.lookup("ipbPgmId");

	var hostApp = app.getHostAppInstance();
	if(!util.Dialog.isPopup(hostApp)){
		vcPgmTitle.value = voMenuInfo.get("PGM_ID");
		
		if(hostApp.targetScreen.name == "mobile" || hostApp.targetScreen.name == "tablet"){
			util.Control.setVisible(app, false, "ipbPgmId");
		}

		if(!(hostApp.getContainer().getLayout() instanceof cpr.controls.layouts.FormLayout)){
			hostApp.getContainer().style.css("min-width", "1320px");
			hostApp.getContainer().style.css("min-height", "680px");
		}
		
		var vcGrpMenuPath = app.lookup("grpMenuPath");
		
		
		var vnIndex = 0;
	}
	
	
	//그리드 초기화
	//그리드ID가 지정된 경우가 아니면... 화면 내의 모든 그리드를 대상으로 초기화 작업을 수행한다.
	var vaGridIds = [];
	if(!ValueUtil.isNull(app.getAppProperty("gridIds"))){
		vaGridIds = ValueUtil.split(app.getAppProperty("gridIds"), ",");
	}else{
		vaGridIds = util.Group.getAllChildrenByType(hostApp, "grid");
	}
	util.Grid.init(hostApp, vaGridIds);
}



/**
 * 헤더 신규/삭제/저장 버튼 활성/비활성화
 * @param {Boolean} pbEnable
 * @param {Array} paStatus [I:신규, D:삭제, D:저장]
 */
exports.setEnableCtrls = function(pbEnable, paStatus){
//	var vaBtnIds = null;
//	if(ValueUtil.isNull(paStatus)){
//		vaBtnIds = ["btnNew", "btnDelete", "btnSave"];
//	}else{
//		vaBtnIds = new Array();
//		for(var i = 0; i < paStatus.length; i++){
//			if("I" == paStatus[i]){
//				vaBtnIds.push("btnNew");
//			}else if("D" == paStatus[i]){
//				vaBtnIds.push("btnDelete");
//			}else if("S" == paStatus[i]){
//				vaBtnIds.push("btnSave");
//			}
//		}
//	}
//	
//	if(pbEnable && app.lookup("grpButtons").enabled === false){
//		util.Control.setEnable(app, true, "grpButtons");
//	}
//	
//	util.Control.setEnable(app, pbEnable, vaBtnIds);
}
