/************************************************
 * cntyCd.js
 * Created at 2020. 7. 23. 오전 10:44:17.
 *
 * @author HanaTI
 ************************************************/
var util = createCommonUtil();

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};


exports.valueChanger = function(){
	
	console.log(app.lookup("ipbCntyCd").value);
	app.lookup("ipbCntyCd").redraw();
}
/*
 * 서치 인풋에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onSearchInputClick(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.SearchInput
	 */
	var searchInput = e.control;
	util.Dialog.open(app, "biz/cm/IQ64", 700, 400, function(e){
		/** @type cpr.controls.Dialog */
		var dialog = e.control;
		
		var returnValue = dialog.returnValue;
		if(returnValue){
			util.Control.setValue(app, "ipbCntyNm", returnValue["cntyNm"]);
			util.Control.setValue(app, "ipbCntyCd", returnValue["cntyCd"]);	
		}
	}, null, true);	
	
	var event = new cpr.events.CUIEvent("search");
	app.dispatchEvent(event);
	
}


/*
 * 서치 인풋에서 value-change 이벤트 발생 시 호출.
 * SearchInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onIpbCntyCdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.SearchInput
	 */
	var ipbCntyCd = e.control;
	
	console.log("valueChange");
}


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	console.log("PROPERTY_CHANGE");
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbCntyNmValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbCntyNm = e.control;
	
	console.log("뭐지요");
	console.log(e);
	var evts = new cpr.events.CValueChangeEvent("value-change");
	console.log(evts);
	app.dispatchEvent(e);
}
