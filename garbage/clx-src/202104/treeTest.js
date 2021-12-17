/************************************************
 * treeTest.js
 * Created at 2021. 4. 29. 오후 3:48:34.
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
//	app.lookup("tre1").delete
//	app.lookup("tre1").addIte
//	app.lookup("tre1").deleteItem(1);
app.lookup("tre1").insertItemAfter(new cpr.controls.TreeItem("aa", "bb", ""), app.lookup("tre1").getItem(0));
//	app.lookup("tre1").addItem(new cpr.controls.TreeItem("aa", "bb", ""));
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var a = app.lookup("ds1").getRowDataRanged();
	console.log(a);
}
