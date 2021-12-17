/************************************************
 * keyboard.js
 * Created at 2021. 2. 8. 오전 10:42:56.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};





/*
 * "caps" 버튼(btn30)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn30Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn30 = e.control;
	
	app.setAppProperty("caps", !app.getAppProperty("caps"));
	app.getContainer().redraw();
}


/*
 * "shift" 버튼(btn44)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShiftClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn44 = e.control;
	
	app.setAppProperty("caps", true);
	app.getContainer().redraw();
	app.addEventListenerOnce("userEv", function(ev){
		app.setAppProperty("caps", false);
		app.getContainer().redraw();
	});
}


/*
 * 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnTypingClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn17 = e.control;
	
	/** @type cpr.controls.InputBox */
	var vcIpb = app.getAppProperty("targetCtrl");
	
	if(vcIpb.value == null) {
		vcIpb.value = "";
	}
	vcIpb.value = vcIpb.value + btn17.value;
//	vcIpb.setSelection({
//		start : vcIpb.value.length,
//		end : vcIpb.value.length
//	});
	
//	var ev = new cpr.events.CAppEvent("userEv");	
//	app.dispatchEvent(ev);
}


/*
 * "enter" 버튼(btn42)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn42Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn42 = e.control;
	
	app.getHost().dispose();
}


/*
 * "esc" 버튼(btn56)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn56 = e.control;
	app.getHost().dispose();
}



/*
 * "backspace" 버튼(backspace)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBackspaceClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var backspace = e.control;
	
	/** @type cpr.controls.InputBox */
	var vcIpb = app.getAppProperty("targetCtrl");
	
	var vals = vcIpb.value;
	
	
	vcIpb.value = vals.substring(0,vals.length-1);	
}


/*
 * "tab" 버튼(tab)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onTabClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var tab = e.control;
	/** @type cpr.controls.InputBox */
	var vcIpb = app.getAppProperty("targetCtrl");
	
	if(vcIpb.value == null) {
		vcIpb.value = "";
	}
	vcIpb.value = vcIpb.value + "	";
	vcIpb.redraw();
	
	var ev = new cpr.events.CAppEvent("userEv");	
	app.dispatchEvent(ev);
}


/*
 * "clear" 버튼(btn43)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn43Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn43 = e.control;
	
	/** @type cpr.controls.InputBox */
	var vcIpb = app.getAppProperty("targetCtrl");
	
	vcIpb.clear();
}
