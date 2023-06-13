/************************************************
 * openerTester.js
 * Created at 2021. 11. 11. 오후 2:15:34.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log("하하하!");
	console.log(window.opener);
	console.log(window.opener.hanstest);
	console.log(window.hanstest);
}
