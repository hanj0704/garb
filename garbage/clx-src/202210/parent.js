/************************************************
 * parent.js
 * Created at 2022. 10. 7. 오후 6:46:10.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	var meta = document.getElementsByName("viewport");
	var item = meta.item(0);
	
	item.setAttribute("content", "width=device-width,user-scalable=yes");
}
