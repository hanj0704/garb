/************************************************
 * formTest.js
 * Created at 2022. 11. 21. 오후 1:26:26.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(e){
	var btn17 = e.control;
	
	
	var grp = app.lookup("grp1");
	
	var lay = grp.getLayout();
	lay.setRows(["20px","20px","20px","20px"]);
}

/*
 * "setColumns" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(e){
	var btn18 = e.control;
	
	var grp = app.lookup("grp1");
	
	var lay = grp.getLayout();
	
	lay.setColumns(["100px","1fr","100px","1fr"]);
}
