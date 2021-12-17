/************************************************
 * ComboListPop.js
 * Created at 2020. 5. 7. 오전 10:02:32.
 *
 * @author daye
 ************************************************/

var vbMobile = false;

/*
 * 사용자 정의 컨트롤에서 value-change 이벤트 발생 시 호출.
 * 토글 버튼의 value를 변경하여 변경된 값이 저장되었을 때 발생하는 이벤트
 */
function onToggleButtonValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type udc.cmn.ToggleButton
	 */
	var toggleButton = e.control;
	
	vbMobile = !vbMobile;
	setComboPopMobile(vbMobile);
}
