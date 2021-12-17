/************************************************
 * Untitled.js
 * Created at 2021. 3. 31. 오후 2:39:57.
 *
 * @author HANS
 ************************************************/



/*
 * 탭 폴더에서 close 이벤트 발생 시 호출.
 * 탭 아이템을 닫을 때 발생하는 이벤트이며, 사용자가 취소할 수 있습니다.
 */
function onTabFolderClose(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabFolder = e.control;
	
	e.preventDefault();
}


/*
 * 탭 폴더에서 tabheader-click 이벤트 발생 시 호출.
 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트입니다.
 */
function onTabFolderTabheaderClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabFolder = e.control;
	
	console.log("CLICK");
}
