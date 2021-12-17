/************************************************
 * dateTester.js
 * Created at 2020. 8. 25. 오후 4:37:59.
 *
 * @author han
 ************************************************/



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	cpr.I18N.INSTANCE.currentLanguage = cmb1.value;
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	console.log(app.lookup("dti1").value);
}
