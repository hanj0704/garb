/************************************************
 * DesignGuide.js
 * Created at 2020. 3. 23. 오후 3:03:46.
 *
 * @author ryu
 ************************************************/


/*
 * "행추가" 버튼(btnAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAdd = e.control;
	
	var vcGrid = app.lookup("grd1");
	
	vcGrid.insertRow(vcGrid.rowCount, false);
}


/*
 * "행삭제" 버튼(btnDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDelete = e.control;
	
	var vcGrid = app.lookup("grd1");
	
	vcGrid.deleteRow(vcGrid.getCheckRowIndices());
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx5ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx5 = e.control;
	
	app.lookup("grd1").redraw();
}


/*
 * "OPEN" 버튼(btnDialog)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDialogClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDialog = e.control;
	
	app.getRootAppInstance().openDialog("app/imp/ImpCGrid", {width : 600, height : 450}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}


/*
 * "처리 메세지" 버튼(btnAlert)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAlertClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAlert = e.control;
	
	var vsAlertCd = btnAlert.userAttr("alert-code");
	var vsAlertMsg = btnAlert.userAttr("alert-msg");
	
	app.getRootAppInstance().openDialog("app/imp/ImpCAlert", {width : 320, height : 210, resizable : false, headerMovable : false}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.initValue = {
				"strCd" : vsAlertCd,
				"strMsg" : vsAlertMsg
			}
		});
		dialog.addEventListener("close", function(e) {
			/** @type Boolean */
			var vbReturnValue = e.control.returnValue;
			app.lookup("optAlert").value = vbReturnValue != null && vbReturnValue != "" ? vbReturnValue.toString() : "";
		});
	});
}


var util = createNewHintKit();


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vcHintCheckBox = new cpr.controls.Container();
	var vLayout = new cpr.controls.layouts.VerticalLayout();
	
	vcHintCheckBox.setLayout(vLayout);
	vcHintCheckBox.style.css({
		"background-color" : "#ffffff",
		"opacity" : 0.9
	});
	
	var vcClassCheck = new cpr.controls.CheckBox();
	vcClassCheck.text = "클래스 정보확인"
	vcClassCheck.addEventListener("value-change", function(e){
		util.configClassInfoHints(app, e.newValue);
	});
	var vcConstraintCheck = new cpr.controls.CheckBox();
	vcConstraintCheck.text = "Layouts";
	vcConstraintCheck.addEventListener("value-change", function(e){
		util.configConstriantInfoHints(app, e.newValue);
	});
	var vcGridCheck = new cpr.controls.CheckBox();
	vcGridCheck.text = "그리드 정보확인";
	vcGridCheck.addEventListener("value-change", function(e){
		util.configGridInfoHints(app, e.newValue);
	});
	
	var vcFormDivisionCheck = new cpr.controls.CheckBox();
	vcFormDivisionCheck.text = "Layouts";
	vcFormDivisionCheck.addEventListener("value-change", function(e){
		util.showFormDivision(app, e.newValue);
	});
	
	vcHintCheckBox.addChild(vcClassCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});	
	vcHintCheckBox.addChild(vcConstraintCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});	
	vcHintCheckBox.addChild(vcGridCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});	
	vcHintCheckBox.addChild(vcFormDivisionCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});	
	
	app.floatControl(vcHintCheckBox,{
		"top" : "calc(50% - 50px)",
		"right" : "20px",
		"width" : "150px"
//		"height" : "150px"
	});
}
