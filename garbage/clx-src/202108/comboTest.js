/************************************************
 * comboTest.js
 * Created at 2021. 8. 20. 오전 9:43:15.
 *
 * @author HANS
 ************************************************/



/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	console.log("OPEN")
}
