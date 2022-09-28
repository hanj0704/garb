/************************************************
 * T006.js
 * Created at 2022. 1. 21. 오전 9:26:43.
 *
 * @author ryu
 ************************************************/


/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTabFolderSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabFolder = e.control;
	
	var a = e.newSelection
	/** @type cpr.controls.Container */
	var con = a.content;
	console.log(con);
	console.log(con.getViewPortRect());
	debugger;
	
}


/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var tab = app.lookup("tab1");
}
