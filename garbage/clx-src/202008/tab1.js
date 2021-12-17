/************************************************
 * tab1.js
 * Created at 2020. 8. 21. 오전 9:54:34.
 *
 * @author han
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
	

	var hostApp = app.getHostAppInstance();
	
	hostApp.callAppMethod("addTabItemFromOutside", "202008/tab2",function(tabItem,/* cpr.core.App*/_app) {
	/** @type cpr.controls.TabItem */	
		var tabs = tabItem;
		tabs.content.addEventListener("app-ready", function(e){
			
			console.log("READY");
			
			/** @type cpr.core.AppInstance */
			var a = tabs.content.getEmbeddedAppInstance();
			
			a.removeAllEventListeners();
			
			a.callAppMethod("helloWorld");
		});
	})
}
