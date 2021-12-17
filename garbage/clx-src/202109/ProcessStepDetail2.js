/************************************************
 * ProcessStepDetail.js
 * Created at 2021. 8. 6. 오후 1:19:05.
 *
 * @author HANS
 ************************************************/

var util = createCommonUtil();

exports.getStepTime = function(){
	
	var vbChamberASelect = util.DataMap.getValue(app, "dmStepInfo", "SELECTION_CHAMBER_A") == "TRUE" ? 1 : 0;
	var vbChamberBSelect = util.DataMap.getValue(app, "dmStepInfo", "SELECTION_CHAMBER_B") == "TRUE" ? 1 : 0;
	var vbChamberCSelect = util.DataMap.getValue(app, "dmStepInfo", "SELECTION_CHAMBER_C") == "TRUE" ? 1 : 0;
	var vnMaxStepTime = Number(util.DataMap.getValue(app, "dmStepInfo", "MAXIMUM_STEP_TIME"));
	/** @type String */
	var vsLoopControl = util.DataMap.getValue(app, "dmStepInfo", "LOOP");
	var vnRepeatCnt = 0;
	var vsLoopCtrl = app.getAppProperty("loopValue");
	
	if(vsLoopControl != "" && vsLoopControl != null) {
		
		var vaLoopCtrl  = vsLoopControl.split(" ");
		var vnRepeat = vaLoopCtrl[1];
		vnRepeatCnt = Number(vnRepeat);
	} else if(vsLoopCtrl != "" && vsLoopCtrl != null){
		
		var vaLoopCtrl = vsLoopCtrl.split("X");
		var vsRepeat = vaLoopCtrl[1].trim();
		vnRepeatCnt = Number(vsRepeat);
	}
	
	return {
		A : vbChamberASelect*vnRepeatCnt*vnMaxStepTime,
		B : vbChamberBSelect*vnRepeatCnt*vnMaxStepTime,
		C : vbChamberCSelect*vnRepeatCnt*vnMaxStepTime
	}
}

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/**
 * LOOP컬럼안에 있는 값을 display되는 값으로 해석하는 함수입니다.
 * LOOP컬럼값은 " " 공백 하나로 start Step Index와 Repeat횟수를 구분합니다.
 * 표현식 내에서 수행되는 함수입니다.
 * @param {String} psLoopCol
 * @param {String} psLoopVal
 */
exports.getLoopExp = function(psLoopCol,psLoopVal){
	
	var vsStr = psLoopCol;
	var vsResult = "";
	if(psLoopVal != "" && psLoopVal != null){
		vsResult = psLoopVal;
	}else {
		if(vsStr != "") {
		
			var vaStr = vsStr.split(" ");
			var vsStartIndex = vaStr[0];
			var vsRepeat = vaStr[1];
		
			vsResult = "("+vsStartIndex+ " ~ "+app.getAppProperty("rowIndex")+ ") X "+ vsRepeat;
		} 
	}
	return vsResult;
}

/*
 * 해당 행이 가진 스텝의 행정보를 리턴합니다.
 */
exports.getStepRowData = function(){
	
	var voData = app.lookup("dmStepInfo").getDatas();
	voData.STEP_NUMBER = app.getAppProperty("rowIndex");
	
	return voData;
}

/*
 * 스텝 의 행 데이터를 가져와 데이터맵에 빌드하는 함수입니다.
 * 최초 로드시, 앱속성 dataRow가 수정되었을 떄 수행됩니다.
 */
function StepRowDataBuild() {
	
	var voRowData = app.getAppProperty("dataRow");
	if(voRowData != null) {
		app.lookup("dmStepInfo").build(voRowData);
		app.getContainer().redraw();
	}
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subComboList", null, function(){
		util.Control.redraw(app, ["cmbChA","cmbChB","cmbChC","cmbHost"]);
	});
}



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	StepRowDataBuild();
}


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	if(e.property == "rowIndex") {
		
		app.lookup("nbeStepNum").redraw();
	} else if(e.property == "dataRow") {
		
		StepRowDataBuild();
	}
}


/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpb2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb2 = e.control;
	var vsBorrowedLoop = app.getAppProperty("loopValue");
	if(vsBorrowedLoop == null || vsBorrowedLoop == ""){
		console.log(app.lookup("nbeStepNum").numberValue);
		util.Dialog.open(app, "app/popup/recipe/RecipeLoopControlPop", 400, 340, function(ev){
			/** @type cpr.controls.Dialog */
			var control = ev.control;
			
			var vsReturnValue = control.returnValue;
			if(vsReturnValue) {
				
				if(vsReturnValue == "Delete") {
					
					vsReturnValue = "";
				}	
					util.DataMap.setValue(app, "dmStepInfo", "LOOP", vsReturnValue)
					app.getHostAppInstance().callAppMethod("refreshLoop")
			}
		}, {
			loop :util.DataMap.getValue(app, "dmStepInfo", "LOOP"),
			stepIndex : app.lookup("nbeStepNum").numberValue
		}, {
			resizable : false
		})
	}
}


/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpb3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb3 = e.control;
	var vsStepEndCtrl = util.DataMap.getValue(app, "dmStepInfo", "STEP_END_CONTROL");
	
	util.Dialog.open(app, "app/popup/recipe/RecipeStepEndControlPopup", 400, 460, function(ev){
		/** @type cpr.controls.Dialog */
		var control = ev.control;
		
		var vsReturnValue = control.returnValue;
		if(vsReturnValue) {
			console.log(vsReturnValue);
			util.DataMap.setValue(app, "dmStepInfo", "STEP_END_CONTROL", vsReturnValue);
			util.Control.redraw(app, "ipb3");
		}
	},{
		stepEndControl : vsStepEndCtrl
	},{
		resizable : false
	})
	
}


/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpbPresCHClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPresCH = e.control;
	
	var vsPressure = ipbPresCH.value;
	
	util.Dialog.open(app, "app/popup/recipe/RecipeChPressurePopup", 400, 260, function(ev){
		
		/** @type cpr.controls.Dialog */
		var control = ev.control;
		var vsReturnValue = control.returnValue;
		
		if(vsReturnValue) {
			
			ipbPresCH.value = vsReturnValue;
			ipbPresCH.redraw();
		}
	},{
		pressure : vsPressure
	},{
		resizable : false
	})
}


/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpbHeatChClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbHeatCh = e.control;
	
	var vsHeat = ipbHeatCh.value;
	
	util.Dialog.open(app, "app/popup/recipe/RecipeHeatPopup", 400, 340, function(ev){
		
		/** @type cpr.controls.Dialog */
		var control = ev.control;
		var vsReturnValue = control.returnValue;
		
		if(vsReturnValue){
			
			ipbHeatCh.value = vsReturnValue;
			ipbHeatCh.redraw();
		}
	},{
		heat : vsHeat
	},{
		resizable : false
	})
}


/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpbGasClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbGas = e.control;
	
	var vsGas = ipbGas.value;
	var vnRowIndex = app.getAppProperty("rowIndex");
	
	var vsColumnName = "";
	var voBindInfo = ipbGas.getBindInfo("value");
	var vsFieldLabel = ipbGas.fieldLabel;
	if(voBindInfo) {
		
		vsColumnName = voBindInfo.columnName;
	
		var vsMFCExp = /GAS\d+/;
		
		var vaGasString = vsMFCExp.exec(vsColumnName);
		
		if(vaGasString != null) {
			var vsGasString = vaGasString[0];
			
			vsGasString = vsGasString.replace("GAS","");
			vsFieldLabel = vsGasString + " [" +vsFieldLabel+"]";
		}
	}
	
	util.Dialog.open(app, "app/popup/recipe/RecipeGasPopup", 400, 220, function(ev){
		
		/** @type cpr.controls.Dialog */
		var control = ev.control;
		var vsReturnValue = control.returnValue;
		
		if(vsReturnValue) {
			
			ipbGas.value = vsReturnValue;
			ipbGas.redraw();
		}
	},{
		value : vsGas,
		stepIndex: vnRowIndex,
		title : "Step"+vnRowIndex + " : "+"MFC"+vsFieldLabel
	},{
		resizable : false
	})
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbChSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbCh = e.control;
	var vsMethodNm = "refreshMaximumTime";
	var voHostAppIns = app.getHostAppInstance();
	if(voHostAppIns.hasAppMethod(vsMethodNm)){
		
		voHostAppIns.callAppMethod(vsMethodNm);
	}
}

