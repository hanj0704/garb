/************************************************
 * T_Focus.js
 * Created at 2021. 11. 11. 오후 3:04:32.
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
	
	var itemRow = app.lookup("cbg2").getItem(0).row;
	console.log(itemRow);
}
