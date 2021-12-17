/************************************************
 * customCbxGrp.js
 * Created at 2021. 10. 25. 오전 11:09:39.
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

var msOldValues = "";
function getValue(){
	
	var vsValue = "";
	var vsDelimeter = app.getAppProperty("delimeter");
		
	var vsReturnValue = app.getContainer().getChildren().filter(function(each){
		return each instanceof cpr.controls.CheckBox;
	}).filter(function(each){
		return each.checked == true;
	}).map(function(each){
		return each.trueValue;
	}).join(vsDelimeter);
	return vsReturnValue;
}
/**
 * 
 * @param {String} psLabel
 * @param {String} psTrueValue
 * @param {any} psFalseValue
 */
function registerCheckBox(psLabel, psTrueValue, psFalseValue) {
	
	var vcNewCbx = new cpr.controls.CheckBox();
	
	vcNewCbx.text = psLabel;
	vcNewCbx.trueValue = psTrueValue;
	if(psFalseValue != null){
		
		vcNewCbx.falseValue = psFalseValue;
	}
	
	vcNewCbx.addEventListener("before-value-change",onCbxBeforeValueChange);
	vcNewCbx.addEventListener("value-change",onCbxValueChange);
	
	return vcNewCbx;
}


function onCbxBeforeValueChange(/*cpr.events.CValueChangeEvent*/e){
	
	/** @type cpr.controls.CheckBox */
	var control = e.control;
	
	var vsDelimeter = app.getAppProperty("delimeter");
	
	var vsValues = getValue();
	var vaValues = vsValues.split(vsDelimeter);
	if(ValueUtil.fixNull(vsValues) == ""){
		
		vaValues = [];
	}
	var vsText = control.trueValue;
	var vnIndex = control.getParent().getChildren().indexOf(control);
	
	if(e.newValue == control.trueValue){
		
		if(vaValues.indexOf(vsText) != -1) {
			var err = new Error("value is Invalid");
			throw err;
		} else {
			vaValues.splice(vnIndex, 0, vsText);
		}
	} else {
		if(vaValues.indexOf(vsText) == -1) {
			
			var err = new Error("something is wrong");
			throw err;
		} else {
			
			vaValues.splice(vnIndex,1);
		}
	}
	var vsNewValue = vaValues.join(vsDelimeter);
	var voBeforeSelectionChangeEvt = new cpr.events.CSelectionEvent("before-selection-change",{
		newSelection : vsNewValue,
		oldSelection : vsValues
	});
	
	var vbIsPreventDefaulted = app.getHost().dispatchEvent(voBeforeSelectionChangeEvt);
	
	if(!vbIsPreventDefaulted) {
		
		e.preventDefault();
		control.value = e.oldValue;
	}
	
}

function onCbxValueChange(/*cpr.events.CValueChangeEvent*/e){
	
	/** @type cpr.controls.CheckBox */
	var control = e.control;
	
	var vsDelimeter = app.getAppProperty("delimeter");
	
	var vsValues = getValue();
	var vaValues = vsValues.split(vsDelimeter);
	if(ValueUtil.fixNull(vsValues) == ""){
		
		vaValues = [];
	}
	var vsText = control.trueValue;
	var vnIndex = control.getParent().getChildren().indexOf(control);
//	if(e.newValue == control.trueValue){
//		
//		if(vaValues.indexOf(vsText) != -1) {
//			var err = new Error("value is Invalid");
//			throw err;
//		} else {
//			vaValues.splice(vnIndex, 0, vsText);
//		}
//	} else {
//		if(vaValues.indexOf(vsText) == -1) {
//			
//			var err = new Error("something is wrong");
//			throw err;
//		} else {
//			
//			vaValues.splice(vnIndex,1);
//		}
//	}
	
	var vsNewValue = vaValues.join(vsDelimeter);
	var voSelectionChangeEvt = new cpr.events.CSelectionEvent("selection-change",{
		newSelection : vsNewValue,
		oldSelection : msOldValues
	});
	
	var vbIsPreventDefaulted = app.getHost().dispatchEvent(voSelectionChangeEvt);
	
	app.setAppProperty("value", vsNewValue,false);
	
}

/**
 * 
 * @param {cpr.data.DataSet} pcDa
 */
function monitoringListBuild (pcDa){
	
	var vcDataSet = pcDa;
	
	var vsLabel = app.getAppProperty('labelColumn');
	var vsValue = app.getAppProperty("valueColumn");
	
	if(vcDataSet.getRowCount() > 0){
		
		app.getContainer().removeAllChildren();
		vcDataSet.forEachOfUnfilteredRows(function(dataRow){
			
			var vcNewCbx = registerCheckBox(dataRow.getValue(vsLabel), dataRow.getValue(vsValue));
			
			
			app.getContainer().addChild(vcNewCbx, {
				width : "100px",
				height : "30px",
				autoSize : "both"
			});
		});
	} else {
		
		vcDataSet.addEventListenerOnce("load", function(ev){
			
			monitoringListBuild(ev.control);
		})
	}
	
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	/** @type cpr.data.DataSet */
	var vcDs = app.getAppProperty("dataSet");
	monitoringListBuild(vcDs);
	console.log("LOADED");
}




/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	console.log(e.property);
}
