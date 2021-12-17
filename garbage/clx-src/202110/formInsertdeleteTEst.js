/************************************************
 * formInsertdeleteTEst.js
 * Created at 2021. 10. 13. 오후 4:40:54.
 *
 * @author HANS
 ************************************************/



/*
 * "insert" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	var vcGrp = app.lookup("grp1");
	var nb = app.lookup("nbe1").numberValue;
	var voLay = vcGrp.getLayout();
	
	voLay.insertColumns(["250px"], nb+1);
}


/*
 * "insert before" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	var vcGrp = app.lookup("grp1");
	var nb = app.lookup("nbe1").numberValue;
	var voLay = vcGrp.getLayout();
	
	voLay.insertColumns(["250px"], nb);
}


/*
 * "addBtn" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var vcGrp = app.lookup("grp1");
	var nb = app.lookup("nbe1").numberValue;
	var btn = new cpr.controls.Button();
	btn.value = "azzaa";
	vcGrp.addChild(btn, {
		rowIndex : 0,
		colIndex : nb
	});
}
