/************************************************
 * numberinput.js
 * Created at 2020. 4. 21. 오후 2:58:02.
 *
 * @author tomato
 ************************************************/


/*
 * 사용자 정의 컨트롤에서 value-change 이벤트 발생 시 호출.
 */
function onNumberInputValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type udc.ctrl.NumberInput
	 */
	var numberInput = e.control;
	alert(numberInput.value);
}
