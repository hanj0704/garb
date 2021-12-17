/************************************************
 * SocketHandler.js
 * Created at 2021. 1. 29. 오전 11:09:31.
 *
 * @author HANS
 ************************************************/

var webSock = null;

/*
 * "소켓연결" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	webSock = new WebSocket("ws://localhost:8080/echo");
	
	webSock.onopen = function(event) {
		console.log("WebSocket is connected");
	}
	
	webSock.onmessage = function(event){
		var message = event.data;
		console.log(message);
	};
	
	webSock.onerror = function(error){
		console.log(error);
	}
}



/*
 * "sendMessage" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var json = {
		"target" : app.lookup("ipb1").value,
		 "direction":app.lookup("ipb2").value,
		 "arm" : app.lookup("ipb3").value,
		 "pick" : app.lookup("ipb4").value
	}
	var jsonStr = JSON.stringify(json);
	
	webSock.send(jsonStr);
	
}



/*
 * "sendMessage" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
		var json = {
		"target" :	"0",
		 "direction":"0",
		 "arm" : "100",
		 "pick" : "0"
	}
	var jsonStr = JSON.stringify(json);
	
	webSock.send(jsonStr);
}


/*
 * "sendMessage" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
		var json = {
		"target" : "0",
		 "direction":"270",
		 "arm" : "0",
		 "pick" : "100"
	}
	var jsonStr = JSON.stringify(json);
	
	webSock.send(jsonStr);
}
