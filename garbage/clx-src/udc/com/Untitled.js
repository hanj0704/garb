/************************************************
 * Untitled.js
 * Created at 2022. 1. 5. 오후 5:43:13.
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
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb1 = e.control;
	
	var voSele = e.newSelection;
	if(voSele.label == "직접입력"){
		
		app.getContainer().getLayout().setColumnVisible(1, true);
	} else {
		app.getContainer().getLayout().setColumnVisible(1, false);
	}
	
}
