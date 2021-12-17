/************************************************
 * pop.js
 * Created at 2020. 7. 28. 오후 4:51:42.
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
	
	
//	var a= window.open("about:blank", "hello");
//	
//	var postMan =  new cpr.protocols.HttpPostMethod("popuptest/example.html", "hello");
//	
//	postMan.addParameter("KDA","Ah");
//	
//	postMan.submit();
//	postMan.dispose();

var openWindow = window.open("popuptest/example.html","_popup","width=400,height=500");
	if(openWindow){
		openWindow._mainToPopupParam = {
			param1 : "param1",
			param2 : "param2",
			param3 : "param3",
			_app : app
		}
	}
}
