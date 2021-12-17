/************************************************
 * TEST4.js
 * Created at 2021. 4. 29. 오후 5:15:03.
 *
 * @author ryu54
 ************************************************/

/**
 * 
 * @param {cpr.controls.Container} container
 */
function executeFloatingHeader(container) {
	var voAppIns = container.getAppInstance();
	
	container.userAttr("floating-header-configure", "true");
	
	var voRtAppIns = voAppIns.getRootAppInstance();
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		var voActlRct = container.getActualRect();
		
		var vcPlaceholder = new cpr.controls.Output();
		
		voAppIns.getContainer().addChild(vcPlaceholder, {
			height : "200px"
		});
		
		voRtAppIns.floatControl(container, {
			left : "0px",
			right : "0px",
			height : "200px",
			top : "0px"
		});
	});
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	executeFloatingHeader(app.lookup("grp"));
}
