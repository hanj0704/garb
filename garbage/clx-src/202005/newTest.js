/************************************************
 * newTest.js
 * Created at 2020. 5. 27. 오후 1:19:25.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var mdi = app.lookup("mdi1");
	
	var tabs = mdi.getTabItems();
	app.lookup("mdi1").setSelectedTabItem(tabs[1]);
	
	
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
		var mdi = app.lookup("mdi1");
	
	var tabs = mdi.getTabItems();
	app.lookup("mdi1").setSelectedTabItem(tabs[0]);
}
