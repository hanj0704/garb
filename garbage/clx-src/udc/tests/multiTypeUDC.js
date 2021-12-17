/************************************************
 * multiTypeUDC.js
 * Created at 2020. 7. 22. 오후 5:48:10.
 *
 * @author han
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};



/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
//	app.getAppProperty("comboboxDataSet");
//	app.getAppProperty("controlVisible");
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	console.log(app.getAppProperty("comboboxDataSet"));
	console.log(app.getAppProperty("controlVisible"));
	
	var vsCtrlType = app.getAppProperty("controlVisible");
/** @type cpr.data.DataSet */
	var vcDataSet = app.getAppProperty("comboboxDataSet");

	if(vsCtrlType == "combobox") {
		
		var vcContainer = app.getContainer();
		vcContainer.getLayout().setColumnVisible(0, false);
		vcContainer.getLayout().setColumnVisible(1, true);
	}
	else if(vsCtrlType =="inputbox") {
		
		var vcContainer = app.getContainer();
		vcContainer.getLayout().setColumnVisible(0, true);
		vcContainer.getLayout().setColumnVisible(1, false);
	}
	
	var vaColumnNms = vcDataSet.getColumnNames();
		
	app.lookup("cmbUdc1").setItemSet(vcDataSet, {
		label : vaColumnNms[0],
		value : vaColumnNms[1]
	});
}


/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpb1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	alert("ㅋㅋ");
}


/*
 * 콤보 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onCmb1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	console.log("머하누");
}
