/************************************************
 * focuser.module.js
 * Created at 2021. 4. 8. 오후 4:59:06.
 *
 * @author HANS
 ************************************************/

var userAttrNm1 = "inputType";
var userAttrNm2 = "moveTarget"

cpr.events.EventBus.INSTANCE.addFilter("focus", function(e) {
	var control = e.control;
	
	if(control instanceof cpr.controls.InputBox) {
		
		var vsUserAtt = control.userAttr(userAttrNm1);
		
		if(vsUserAtt != "") {
			
			if(vsUserAtt == "keyboard") {
				
				var rootApp = control.getAppInstance().getRootAppInstance();
				var controlRect = control.getActualRect();
				rootApp.openDialog("202104/keyboard", {width : 600, height : 300,top:controlRect.bottom,left:controlRect.bottomLeft.x}, function(dialog){
					dialog.headerVisible = false;
					dialog.ready(function(dialogApp){
						dialogApp.setAppProperty("targetCtrl", control);
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
					});
				}).then(function(returnValue){
					;
				});
			} else if(vsUserAtt == "popup") {
				
				var popID = userAttrNm2;
				
				rootApp.openDialog(popID, {width : 500, height : 500}, function(dialog){
					dialog.ready(function(dialogApp){
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
					});
				}).then(function(returnValue){
					if(returnValue) {
						control.value = returnValue;
					}
				});
			}
		}
	}
});