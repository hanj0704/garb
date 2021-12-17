/************************************************
 * T_FocusInEmbeddedPage.js
 * Created at 2021. 11. 11. 오후 4:34:47.
 *
 * @author ryu
 ************************************************/



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("ea1").focus();
}


/*
 * 텍스트 에리어에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onTxa1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.TextArea
	 */
	var txa1 = e.control;
}
