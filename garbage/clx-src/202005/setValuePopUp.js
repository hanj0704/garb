/************************************************
 * setValuePopUp.js
 * Created at 2020. 5. 26. 오전 9:15:29.
 *
 * @author csj
 ************************************************/

var util = createCommonUtil();

/*
 * 그리드에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGrd1Dblclick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var getRow = app.lookup("grd1").getSelectedRow();
	
	app.close(getRow);
	
}
