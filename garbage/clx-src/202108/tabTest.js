/************************************************
 * tabTest.js
 * Created at 2021. 8. 25. 오후 2:12:26.
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
	
	
	var mdi = app.lookup("mdi1");
	var tabs = mdi.getTabItems();
	mdi.setSelectedTabItem(tabs[2]);
}
