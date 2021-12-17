/************************************************
 * copyTest.js
 * Created at 2020. 8. 10. 오전 10:00:55.
 *
 * @author han
 ************************************************/

var copyCat =  createCopyKit();

/*
 * "카피" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	copyCat.copyPage(app);
	
}
