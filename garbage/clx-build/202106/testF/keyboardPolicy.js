/************************************************
 * keyboardPolicy.module.js
 * Created at 2021. 6. 29. 오후 4:11:18.
 *
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("click", function(e){
	/** @type cpr.controls.UIControl */
	var control = e.control;
	
	if(control instanceof cpr.controls.InputBox && control.userAttr("userReadOnly") == "" && !control.readOnly) {
		var rootApp = control.getAppInstance().getRootAppInstance(); 
		 rootApp.openDialog("app/com/login/keyboard", {width : 700, height : 400}, function(dialog){
		 	dialog.headerVisible = false;
		 	dialog.ready(function(dialogApp){
		 		dialogApp.setAppProperty("targetCtrl", control);
		 		dialogApp.setAppProperty("isSecret", control.secret);
//		 		dialogApp.targetCtrl = control;
		 		// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		 	});
		 	dialog.addEventListener("overlay-click", function(ev){
		 		dialog.close();
		 	});
		 }).then(function(returnValue){
		 	control.value = returnValue;
		 });
	} else if(control instanceof cpr.controls.NumberEditor && control.userAttr("userReadOnly") == "") {
		var rootApp = control.getAppInstance().getRootAppInstance();
		rootApp.openDialog("app/com/login/numberKeyboard", {width : 550, height : 250}, function(dialog){
			dialog.headerVisible = false;
			dialog.ready(function(dialogApp){
				dialogApp.setAppProperty("targetCtrl", control);
			});
			dialog.addEventListenerOnce("overlay-click", function(ev){
				dialog.close();
			})
		}).then(function(returnValue){
				if(returnValue) {
					control.value = returnValue;
				}
			})
	}
});