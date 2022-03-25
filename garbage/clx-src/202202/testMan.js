/************************************************
 * testMan.js
 * Created at 2022. 2. 11. 오후 1:49:11.
 *
 * @author HANS
 ************************************************/



/*
 * "href" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var method = new cpr.protocols.HttpPostMethod("http://localhost:8080/tes/page.do", "_self");
	method.submit();
	method.dispose();
	
}


/*
 * "ㄴ둥" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	app.lookup("sms2").setHeader("Cache-Control", "max-age=36000");
	app.lookup("sms2").send();
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
	
	app.lookup("sms3").send();
}


/*
 * MDI 폴더에서 content-load 이벤트 발생 시 호출.
 * TabItem의 Content가 그려지고 브라우저에 표현되기 직전에 호출됨.
 */
function onMdi1ContentLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	console.log(e);
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	app.lookup("mdi1").addItemWithApp("201909/dynamicGrid")
}
