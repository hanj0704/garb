/************************************************
 * Untitled.js
 * Created at 2021. 1. 15. 오후 3:44:25.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("sms1").send();	
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
	
	var endPoint = "http://api.vworld.kr/req/search?size=10&page=1&callback=_callback_";
	
	cpr.core.ResourceLoader.loadJsonp(endPoint).then(function(input){
		
		console.log(input);
	});
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
	app.lookup("sms2").send();
	
}


/*
 * "jsonp" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var endPoint = "http://localhost:8080/simples/hi.do?id=4";
	cpr.core.ResourceLoader.loadJsonp(endPoint).then(function(input){
		console.log(input);
	});
	console.log(cpr.core.ResourceLoader.JSONP_CALLBACK_TEMPLATE);
}


/*
 * "jsonp" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var submission = new cpr.protocols.Submission();
	
	submission.action = "http://localhost:8080/simples/hi.do?id=4";
	submission.method = "get";
	submission.send();
}
