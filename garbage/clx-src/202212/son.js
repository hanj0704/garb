/************************************************
 * son.js
 * Created at 2022. 11. 30. 오후 5:41:19.
 *
 * @author HANS
 ************************************************/


exports.childFunc = function(){
	alert("CHILD");
}

function testFunc2 (){
	alert("안됨");
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
}
