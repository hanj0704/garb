/************************************************
 * tester4.js
 * Created at 2022. 12. 29. 오후 4:50:19.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var elements = document.querySelectorAll(".test");
var vnLength = elements.length;

for(var i = 0 ; i < vnLength ; i++) {
	var item = elements.item(i);
	var element = item.querySelector(".cl-layout-content");
	if(element) {
		console.log(element);
//		element.style.padding = 5;
//		element.setAttribute("padding", "5px");
		element.style.paddingLeft = "5px";
		element.style.paddingRight = "5px";
	}
}
}
