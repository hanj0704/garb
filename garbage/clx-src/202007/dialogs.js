/************************************************
 * dialogs.js
 * Created at 2020. 7. 23. 오후 4:41:01.
 *
 * @author han
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
//	var voInit = app.getHostProperty("initValue");
//	app.lookup("opt1").value = voInit["opts"];
//	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		
//		console.log(app.lookup("opt1").getActualRect());
		console.log(app.getContainer().getActualRect());
		console.log(app.lookup("btn1").getActualRect());
		console.log(app.lookup("ea1").getEmbeddedAppInstance().getContainer().getActualRect());
		console.log(app.lookup("ea1").getEmbeddedAppInstance().getContainer().getOffsetRect());
		console.log(app.lookup("ea1").getEmbeddedAppInstance().getContainer().getContentPaneRect());
		console.log(app.getContainer().getContentPaneRect());
//		console.log(app.getHostAppInstance().dialogManager.getDialogName(app.getHostProperty("initValue")["dias"]));
		console.log(app.getHostAppInstance().dialogManager.getDialogNames());
	});
	
//console.log(KDA);
}


