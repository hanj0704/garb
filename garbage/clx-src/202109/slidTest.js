/************************************************
 * slidTest.js
 * Created at 2021. 9. 15. 오후 5:56:10.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	app.lookup("grp1").scrollTo(300, 0);
	app.lookup("grp2").scrollTo(300, 0);
}
