/************************************************
 * main.js
 * Created at 2021. 2. 8. 오후 12:49:09.
 *
 * @author csj
 ************************************************/



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ea = app.lookup("ea1");
	console.log(ea.app);
	var windowOpen = window.open("202102/sj/popUp.html?appId=" + ea.app.id, null, "width=400, height=600, scrollbars=yes, resizable=true");
	
	if(windowOpen){
		windowOpen._ea = ea;//ea.getEmbeddedAppInstance();
	}
	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	cpr.core.App.load("202102/tester", function(loadedApp){
		app.lookup("ea1").app = loadedApp;
	});
	app.lookup("ea1")
}
