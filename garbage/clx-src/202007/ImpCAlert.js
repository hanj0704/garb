/************************************************
 * ImpCAlert.js
 * Created at 2020. 3. 23. 오후 2:07:34.
 *
 * @author ryu
 ************************************************/


var moOriginalConstraint = new cpr.utils.ObjectMap();


/**
 * 현재 컨스트레인트를 저장합니다.
 */
function backup() {
	var voHostAppIns = app.getHostAppInstance();
	var voDialogMngr = voHostAppIns.dialogManager;
	
	var vsActiveDialogNm = voDialogMngr.getActiveDialogName();
	
	moOriginalConstraint.put("constraint", voDialogMngr.getConstraintByName(vsActiveDialogNm));
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var voHostAppIns = app.getHostAppInstance();
	
	if (voHostAppIns){
		/** @type {{strCd:"process"|"confirm"|"warning"|"info"|"danger"|"error",strTitle:String,strMsg:String}} */
		var voInitValue = app.getHostProperty("initValue");
		
		if (_.keys(voInitValue).length > 0){
			var vcDsAlert = app.lookup("dsAlert");
			var vcDmReq = app.lookup("dmReq");
			
			vcDmReq.setValue("strCd", voInitValue["strCd"]);
			vcDmReq.setValue("strMsg", voInitValue["strMsg"]);
			
			var voFindedRow = vcDsAlert.findFirstRow("alertCd == '" + vcDmReq.getValue("strCd") + "'");
			if (voFindedRow != null){
				var vsTitle = voFindedRow.getValue("alertCdNm");
				
				/** @type cpr.controls.Dialog */
				var vcDialog = app.getHost();
				
				if (ValueUtil.isNull(voInitValue.strTitle)){
					vcDialog.headerTitle = vsTitle + " 메세지";
				} else {
					vcDialog.headerTitle = voInitValue.strTitle;
				}
			}
		}
		
		app.getContainer().redraw();
	}
	
	backup();
}


/*
 * "확인" 버튼(btnSubmit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSubmitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSubmit = e.control;
	
	app.close(true);
}


/*
 * "취소" 버튼(btnCancel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancel = e.control;
	
	app.close(false);
}


/*
 * "상세보기 ▼" 버튼(btnShowDtl)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShowDtlClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnShowDtl = e.control;
	
	var vcGrpCont = app.getContainer();
	var voGrpContLayout = vcGrpCont.getLayout();
	
	var vbExpanded = voGrpContLayout.isRowVisible(1);
	
	btnShowDtl.value = vbExpanded == true ? "상세보기 ▼" : "상세보기 ▲";
	voGrpContLayout.setRowVisible(1, !vbExpanded);

	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
		var voHostAppIns = app.getHost().getAppInstance();
		var voDialogMngr = voHostAppIns.dialogManager;

		var vsDialogNm= voDialogMngr.getActiveDialogName();

		if (voGrpContLayout.isRowVisible(1) == false){ // 접기 상태일 때
			voDialogMngr.updateConstraintByName(vsDialogNm, moOriginalConstraint.get("constraint"));
			return;
		}
		
		var vcGrpErrorBox = app.lookup("grpErrorBox");
		var voActualRect = vcGrpErrorBox.getActualRect();

		var voDialogConstraint = voDialogMngr.getConstraintByName(vsDialogNm);
		
		var voNewConstraint = {
			"top" : voDialogConstraint["top"] - (voDialogConstraint["height"] / 2),
			"left" : voDialogConstraint["left"],
			"height" : voDialogConstraint["height"] + vcGrpErrorBox.getActualRect().height,
			"width" : voDialogConstraint["width"]
		}
		
		voDialogMngr.replaceConstraintByName(vsDialogNm, voNewConstraint);
	});
}
