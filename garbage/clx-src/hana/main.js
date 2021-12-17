/************************************************
 * windowopen2.js
 * Created at 2019. 7. 10. 오전 10:33:33.
 *
 * @author tomato
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
	
	var filePath = "파일경로를 적어주어야 합니다.";//파일 경로를 적어 주어야 합니다.
	
	var openWindow = window.open("./" + filePath + "/popup.clx.html","_popup","width=400,height=500");
	if(openWindow){
		openWindow._mainToPopupParam = {
			param1 : "param1",
			param2 : "param2",
			param3 : "param3",
			_app : app
		}
	}
}

exports.test = function(){
	alert("success");
}