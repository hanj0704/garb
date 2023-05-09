/************************************************
 * parent.js
 * Created at 2023. 3. 16. 오후 5:27:38.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.dialogManager.openDialog("202303/child", "zz",{width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
		dialog.initValue = app.lookup("dm1").getDatas();
	}).then(function(returnValue){
		;
	});
}
