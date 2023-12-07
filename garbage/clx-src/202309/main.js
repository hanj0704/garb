/************************************************
 * main.js
 * Created at 2023. 9. 1. 오후 4:45:44.
 *
 * @author HANS
 ************************************************/


function test(){
	
	app.lookup("ea2").getEmbeddedAppInstance().callAppMethod("test", "202307/tester");
}

exports.test = test;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	setTimeout(function(){
		console.log(app.lookup("ea1").getEmbeddedAppInstance().hasAppMethod("test"));
		app.lookup("ea1").getEmbeddedAppInstance().callAppMethod("test", "202308/tester");
		
	}, 1000)
}



 