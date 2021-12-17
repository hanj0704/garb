/************************************************
 * gtPop.js
 * Created at 2020. 12. 22. 오후 2:22:49.
 *
 * @author HANS
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
		
	var inits = app.getHostProperty("initValue");
	
	console.log(inits["aaa"]);
	
	app.lookup("ep1").src = inits["aaa"];
}
