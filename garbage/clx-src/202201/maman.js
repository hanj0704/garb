/************************************************
 * maman.js
 * Created at 2022. 1. 21. 오후 2:30:43.
 *
 * @author HANS
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var btn = app.lookup("btn13");
	
	console.log(btn.getActualRect());
	console.log(btn.getOffsetRect());
	app.floatControl(btn,{
		top : btn.getActualRect().top+"px",
		left: "0px",
		right : "0px",
		bottom : "20px"
	});
}
