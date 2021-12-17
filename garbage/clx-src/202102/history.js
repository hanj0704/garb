/************************************************
 * history.js
 * Created at 2021. 2. 25. 오전 9:48:54.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var state = { 'page_id': 1, 'user_id': 5,"url":"http://127.0.0.1:52194/garbage/clx-src/202102/tester.clx.html"}
var title = ''
var url = 'http://127.0.0.1:52194/garbage/clx-src/202102/tester.clx.html'

history.pushState(state, title, url)
}
window.addEventListener("popstate", function(e){
	console.log(e);
	var state = e.state.url;
	window.location.href = state;
});