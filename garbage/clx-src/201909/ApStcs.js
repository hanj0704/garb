/************************************************
 * ApStcs.js
 * Created at 2019. 9. 26. 오후 4:34:52.
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
	
	var as = app.lookup("appStack");
	
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	console.log("AppStcs화면에서 호출한 콘솔 ,hostAppInstance().id : " +app.getHostAppInstance().id);
}
