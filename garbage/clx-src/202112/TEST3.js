/************************************************
 * TEST3.js
 * Created at 2021. 11. 24. 오전 9:08:06.
 *
 * @author ryu
 ************************************************/



/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	// 임베디드 페이지를 상단에 띄우기
	var ep = new cpr.controls.EmbeddedPage();
	ep.style.css("background-color", "navy");
	ep.src = "2021-11/NewFile.html";
//	var ep = app.lookup("ep1");
	app.floatControl(ep, {
		top: "0px",
		right: "0px",
		left: "0px",
		height: "80px"
	});
	
	// 헤더 띄우기
	var header = app.lookup("header");
	app.floatControl(header, {
		top: "80px",
		right: "0px",
		left: "0px",
		height: "100px"
	});
}
