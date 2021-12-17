/************************************************
 * TEST4.js
 * Created at 2021. 11. 24. 오전 9:27:25.
 *
 * @author ryu
 ************************************************/

var myChannel = null;

/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTabFolderSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabFolder = e.control;
	
	var tabItem = e.newSelection;

	var container = app.lookup("grpBtns");
	container.getChildren().forEach(function(each){
		each.visible = false;
	});
	
	var button = container.getChildren()[tabItem.itemIndex];
	button.visible = true;
}