/************************************************
 * abcd.module.js
 * Created at 2020. 10. 20. 오후 6:43:58.
 *
 * @author HANS
 ************************************************/


/**
 * 
 * @param {cpr.core.AppInstance} _app
 */
globals.abc = function(_app){
	
	_app.openDialog("202010/GridWidthConfigurer", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		
		return returnValue;
	});
}