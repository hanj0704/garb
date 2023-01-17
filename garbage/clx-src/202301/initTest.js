/************************************************
 * initTest.js
 * Created at 2023. 1. 9. 오후 3:22:25.
 *
 * @author HANS
 ************************************************/

exports.init = function(){
	console.log("init 함수가 실행되었네요");
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	console.log("앱인스턴스의 init함수입니다");
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	console.log("ONBODYLOAD");
	console.log("홍홍");
	console.log(app.getHost());
	console.log(app.getHostProperty("initValue"));
}

/*
 * "init" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
//	console.log(app.getHostProperty("initValue"));
	var host = app.getHost();
	
	var vsProperty = app.getAppProperty("heyMan");
	console.log(host);
	if(host) {
		vsProperty = host.getAppProperty("heyMan");
		console.log(host.getAppProperty("heyMan"));
	}
	console.log(vsProperty);
}

