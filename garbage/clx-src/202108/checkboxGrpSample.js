/************************************************
 * checkboxGrpSample.js
 * Created at 2021. 7. 26. 오후 4:40:59.
 *
 * @author HANS
 ************************************************/



/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTre1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	var a = e.newSelection[0];
	
	cpr.core.App.load(a.value, function(loadedApp){
		
		app.lookup("ea1").app = loadedApp;
	});
}
