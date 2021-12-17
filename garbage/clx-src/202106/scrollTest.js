/************************************************
 * scrollTest.js
 * Created at 2021. 7. 6. 오전 9:53:19.
 *
 * @author HANS
 ************************************************/



/*
 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onBodyScroll(/* cpr.events.CUIEvent */ e){
	
	var ctr = e.control;
	
//	console.log(e.control.getActualRect());
//	console.log(ctr.getOffsetRect());
	console.log(ctr.getViewPortRect());
//	console.log(ctr.getContentPaneRect());
}
