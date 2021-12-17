/************************************************
 * tab2.js
 * Created at 2020. 8. 21. 오전 9:54:40.
 *
 * @author han
 ************************************************/

function helloWorld(){
	
	console.log("HI THERE");
}

exports.helloWorld = helloWorld;

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	console.log("BODY_LOADED");
}
