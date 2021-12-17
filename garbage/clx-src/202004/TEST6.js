/************************************************
 * TEST6.js
 * Created at 2020. 4. 27. 오전 10:19:52.
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
	
	var grp = app.lookup("grp1");
	var cont = app.getContainer();
	
	cont.floatControl(grp, {
		top : "100px",
		left : "100px",
		width : "100px",
		height : "100px"
	});
}
