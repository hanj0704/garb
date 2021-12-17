/************************************************
 * mdiTester.js
 * Created at 2021. 10. 15. 오후 1:20:10.
 *
 * @author HANS
 ************************************************/




/*
 * MDI 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onMdi1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	console.log(e.newSelection.text);
	cpr.core.NotificationCenter.INSTANCE.post("SELECTIONCHANGERMAN", {
		type : "MANDU",
		inner : "KIMCHI"
	},e.newSelection.text);
}
