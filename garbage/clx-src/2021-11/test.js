/************************************************
 * test.js
 * Created at 2021. 11. 22. 오전 10:46:31.
 *
 * @author HANS
 ************************************************/



/*
 * 라디오 버튼에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onRdb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb1 = e.control;
	
	if(e.keyCode == cpr.events.KeyCode.TAB) {
		console.log("HEY");
		e.preventDefault();
		e.stopPropagation();
	}
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
	
	var btn2 = app.lookup("btn2");
	
	console.log(btn2.focusable);
}
