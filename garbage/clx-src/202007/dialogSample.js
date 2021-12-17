/************************************************
 * dialogSample.js
 * Created at 2020. 7. 23. 오후 4:40:54.
 *
 * @author han
 ************************************************/

var util = createCommonUtil();

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
//	app.openDialog("202007/dialogs", {width : 200, height : 80}, function(dialog){
//		dialog.ready(function(dialogApp){
//			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
//			dialog.style.header.css({"background-color" :"red"});				
//			
//			dialog.initValue = {
//				"opts" : app.lookup("ipb1").value
//			}
//			
//		});
//		dialog.headerTitle = "HELLO";
//		dialog.style.header.css({"background-color" : "red"});
//	}).then(function(returnValue){
//		;
//	});
//	util.Dialog.open(app, "202007/dialogs", 150, 80, function(ev){}, {},{
//		readyFunction : function(/*cpr.controls.Dialog*/dialog) {
//			
//			dialog.style.header.css({"background-color" : "red"});
//		},
//		headerTitle : "키호호호호"
//	});

//	app.openDialog("202007/dialogs", {width : 150, height : 80}, function(dialog){
//		dialog.ready(function(dialogApp){
////			dialogApp.name = "asdasd";
//			dialog.name = "202007/dialogs";
//			dialog.initValue = {
//				"dias" : dialog
//			};
//			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
//		});
//	}).then(function(returnValue){
//		;
//	});
	app.dialogManager.openDialog("202007/dialogs", "202007/dialogs");
/**
 * 
 * @param {cpr.controls.Dialog} dialog
 */
function abc(dialog){
}

}
