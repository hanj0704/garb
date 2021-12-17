/************************************************
 * gridTest.js
 * Created at 2020. 11. 30. 오전 11:11:55.
 *
 * @author HANS
 ************************************************/



/*
 * "width수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd1");
	
	var cl = grd.getColumnLayout();
	cl.columnLayout[0].width = 150;
	
	grd.setColumnLayout(cl);
	grd.autoFit = grd.autoFit;
	grd.redraw();
}
