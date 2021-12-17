/************************************************
 * LED.js
 * Created at 2021. 2. 3. 오후 1:56:20.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var vbClickable = app.getAppProperty("clickable");
	
	if(vbClickable) {
		
		app.lookup("opt1").style.addClass("cursor-pointer");
		
		app.lookup("opt1").addEventListener("click", function(e){
			var vsStatus = app.getAppProperty("status");
			if(vsStatus == "off") {
				
				app.setAppProperty("status", "on");
			} 
			else {
				app.setAppProperty("status", "off");
			}
			
			e.control.redraw();
			
			var event = new cpr.events.CUIEvent("led-click",{
				content :{
					status : app.getAppProperty("status")
				}
			});
			
			app.dispatchEvent(event);
		});
	}
}
