/************************************************
 * scrolls.js
 * Created at 2024. 10. 16. 오후 5:36:55.
 *
 * @author HAN
 ************************************************/

/*
 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onBodyScroll(e){
	var group = e.control;
//	console.log("scroll");
//	e.preventDefault();
//	e.stopPropagation();
//	e.stopImmediatePropagation();
	app.getContainer().scrollTo(0, 0);
	console.log("오잉");
}

window.addEventListener("wheel", function(e){
//	console.log(e);
//	app.getContainer().scrollTo(0, 0, 0.2,cpr.animation.TimingFunction.LINEAR);
});