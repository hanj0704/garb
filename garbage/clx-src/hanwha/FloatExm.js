/************************************************
 * Search.js
 * Created at 2019. 10. 16. 오후 4:00:29.
 *
 * @author ryu
 ************************************************/


/**
 * 검색조건을 플로팅합니다.
 */
function floatingSearchBox() {
	var vcEaContent = app.lookup("eaContent");
	
	var voEaAppIns = vcEaContent.getEmbeddedAppInstance();
	if (voEaAppIns){
		/** @type cpr.controls.Container */
		var vcSearchBox = voEaAppIns.lookup("grpSearch");
		
		var voSearchBoxLayout = vcSearchBox.getLayout();
		
		createBlank(voEaAppIns.getContainer(), vcSearchBox);
		
		voSearchBoxLayout.getRows().forEach(function(each, index){
			voSearchBoxLayout.setRowVisible(index, true);
		});
		
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		
		var voActualRect = vcSearchBox.getActualRect();
		
		voEaAppIns.floatControl(vcSearchBox, {
			width : "100%",
			height : voActualRect.height + "px",
			top : "0px"
		});
	}
}


/**
 * 
 * @param {cpr.controls.Container} pcParentContainer
 * @param {cpr.controls.Container} pcTargetControl
 */
function createBlank(pcParentContainer, pcTargetControl) {
	var vnBeforeHeight = pcTargetControl.getActualRect().height;
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(e) {
		var vcBlank = new cpr.controls.Container("grpBlank");
		pcParentContainer.insertChild(0, vcBlank, {
			height : vnBeforeHeight + "px"
		});
	});
}


/**
 * 검색조건을 다시 붙입니다.
 */
function removeFloatingSearchBox() {
	var vcEaContent = app.lookup("eaContent");
	
	var voEaAppIns = vcEaContent.getEmbeddedAppInstance();
	if (voEaAppIns){
		/** @type cpr.controls.Container */
		var vcSearchBox = voEaAppIns.lookup("grpSearch");
		var voSearchBoxLayout = vcSearchBox.getLayout();
		
		voSearchBoxLayout.getRows().forEach(function(each, index){
			var vsMustShowIdx = vcSearchBox.userAttr("must-show-index");
			var vaMustShowIdx = vsMustShowIdx != null && vsMustShowIdx != "" ? vsMustShowIdx.split(",") : null;
			
			voSearchBoxLayout.setRowVisible(index, false);
			
			if (vaMustShowIdx.length > 0 && vaMustShowIdx.indexOf(index.toString()) != -1){
				voSearchBoxLayout.setRowVisible(index, true);
			}
		});
		
		var vcContainer = voEaAppIns.getContainer();
		vcContainer.insertChild(0, vcSearchBox, {
			autoSize : "height"
		});
		
		vcContainer.removeChild(voEaAppIns.lookup("grpBlank"), true);
		
		vcContainer.redraw();
	}	
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	// 버튼이 토글되었을 때에 대한 스타일을 정의합니다.
	if (e.property == "isFloating"){
		var vaSearchOnCtrl = ["btnSearchDtl", "optTriangle", "optTriangleCover"];
		vaSearchOnCtrl.forEach(function(/* String */id){
			/** @type cpr.controls.UIControl */
			var vcCtrl = app.lookup(id);
			if (e.newValue){
				vcCtrl.style.addClass("on");
			} else {
				vcCtrl.style.removeClass("on");
			}
		});
	}
}


/*
 * 버튼(btnSearchDtl)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchDtlClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearchDtl = e.control;
	
	// 버튼을 눌렀을 때 디테일 조건을 표시 여부를 적용합니다.
	app.setAppProperty("isFloating", !app.getAppProperty("isFloating"));
	
	if (app.getAppProperty("isFloating")){ // 플로팅 되었을 때
		floatingSearchBox();
	} else { // 플로팅 되지 않았을 때
		removeFloatingSearchBox();
	}
}


/*
 * "X" 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	
	//TODO 해당 버튼이 클릭되었을 때 콜백을 정의합니다.
	
	
}
