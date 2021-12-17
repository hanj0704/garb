/************************************************
 * socket.js
 * Created at 2021. 1. 29. 오전 9:31:13.
 *
 * @author HANS
 ************************************************/
var webs = null;


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	webs = new WebSocket("ws://localhost:8080/echo");
	
	webs.onopen = function(event) {
		console.log("WebSocket is connected");
	}
	
	webs.onmessage = function(event){
		var message = event.data;
		console.log(message);
		
		var json = JSON.parse(message);
		
		var bot = app.lookup("bot");
		bot.controlArm(parseInt(json["arm"]));
		bot.controlDirection(parseInt(json["direction"]));
		bot.controlPicker(parseInt(json["pick"]));
	};
	
	webs.onerror = function(error){
		console.log(error);
	}
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var json = {
		"direction" : "180",
		"pal" : "0",
		"zip" : "100"
	}
	
	var a = JSON.stringify(json);
	webs.send(a);
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	app.lookup("bot").moveDebug(100);
}
