/************************************************
 * Untitled.js
 * Created at 2024. 10. 24. 오후 2:28:26.
 *
 * @author HAN
 ************************************************/

/*
 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onBodyScroll(e){
	var group = e.control;
	console.log(e.scrollTop);
}
