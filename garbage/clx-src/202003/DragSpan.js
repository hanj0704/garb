/************************************************
 * DragSpan.js
 * Created at 2020. 3. 10. 오전 10:48:11.
 *
 * @author daye
 ************************************************/



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	createDragManager2(app);
}


