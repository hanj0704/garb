/************************************************
 * DynamicGrid.js
 * Created at 2021. 1. 12. 오후 2:15:13.
 *
 * @author ryu54
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}


/*
 * "동적 생성" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	createGrid(app.lookup("grd1"), {
		header : app.lookup("dsGrdHd"),
		detail : app.lookup("dsList")
	});
}
