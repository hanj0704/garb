/************************************************
 * Untitled3.js
 * Created at 2021. 6. 22. 오후 2:43:40.
 *
 * @author HANS
 ************************************************/

exports.clear = function(){
	clearInterval(inte);
}

exports.startInte = function(){
	onBodyLoad();
}
var inte;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	inte = setInterval(function(){
		console.log("UNTITLE3");
	}, 1000)
}
