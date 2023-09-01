/************************************************
 * tester.js
 * Created at 2023. 9. 1. 오후 4:13:26.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.floatControl(app.lookup("grp1"),{
		bottom : "0px",
		left:"0px",
		right:"0px",
		height:"50px"
	});
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	console.log(app.lookup("ipb1").value);
}

/*
 * 인풋 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onIpb1Focus(e){
	var ipb1 = e.control;
	console.log(app.lookup("btn2").focused);
}
