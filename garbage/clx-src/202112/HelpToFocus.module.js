///************************************************
// * HelpToFocus.module.js
// * 
// * 앱 인스턴스에 특정 컨트롤을 플로팅하는 경우
// * cl-aside 영역에 먼저 포커스가 갈 수 있도록
// * 돕는 공통 모듈
// *
// * ※주의※ 모든 경우에 따라 소스를 작성하는 것은
// * 불가능하므로 구조에 맞게 수정하여 사용할 것
// ************************************************/
//cpr.events.EventBus.INSTANCE.addFilter("load", function(e) {
//	if (e.control instanceof cpr.core.AppInstance) {
//		/** @type cpr.core.AppInstance */
//		var appInstance = e.control;
//
//		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
//	
//		// 앱 인스턴스에 플로팅된 건트롤이 있는 경우 플로팅된 대상의 첫번째 컨트롤에 포커스합니다.
//		var floatingControls = appInstance.getFloatingControls();
//		console.log(floatingControls);
//		if (floatingControls.length > 0) { // 플로팅된 컨트롤이 있는 경우
//			var firstControl = floatingControls[0];
//			console.log(floatingControls);
//			
//			if (firstControl.type == "embeddedpage") { // 첫번째 컨트롤이 임베디드 페이지인 경우
//				/** @type cpr.controls.EmbeddedPage */
//				var ep = firstControl;
//				/** @type HTMLElement */
//				var element = document.querySelector(".cl-aside").firstChild;
//				/** @type HTMLIFrameElement */
//				var frame = element.querySelector("iframe");
//				frame.contentWindow.focus();
//			} else if (firstControl.type == "embeddedapp") { // 첫번째 컨트롤이 임베디드 앱인 경우
//				firstControl.addEventListenerOnce("load", function(e){
//					/** @type cpr.controls.EmbeddedApp */
//					var ea = e.control;
//					var ep = _getEmbeddedPage(ea);
//					if (ep){
//						/** @type HTMLIFrameElement */
//						var frame = document.getElementsByName(ep.frameName).item(0);
//						frame.contentWindow.focus();	
//					} else {
//						var eaAppInstance = ea.getEmbeddedAppInstance();
//						var control = eaAppInstance.getFirstFocusTraversableControl();
//						control.focus();
//					}
//				});
//			} else if (firstControl instanceof cpr.controls.UDCBase) { // 첫번째 컨트롤이 UDC인 경우
//				var ep = _getEmbeddedPage(firstControl);
//				if (ep){
//					/** @type HTMLIFrameElement */
//					var frame = document.getElementsByName(ep.frameName).item(0);
//					frame.contentWindow.focus();	
//				} else {
//					var eaAppInstance = firstControl.getEmbeddedAppInstance();
//					var control = eaAppInstance.getFirstFocusTraversableControl();
//					control.focus();
//				}
//			} else if (firstControl.type == "container") { // 첫번째 컨트롤이 컨테이너인 경우
//				/** @type cpr.controls.Container */
//				var container = firstControl;
//				var firstChild = container.getFirstChild();
//				while (firstChild.type == "container") {
//					if (firstChild.type == "container") {
//						/** @type cpr.controls.Container */
//						var inner = firstChild;
//						firstChild = inner.getFirstChild();
//					}
//				}
//				
//				firstChild.focus();
//			} else { // 첫번째 컨트롤이 기타 컨트롤인 경우
//				//TODO 특이 케이스에 해당하는 컨트롤이 있는 경우 else if 문을 추가하세요.
//				firstControl.focus();
//			}
//		}
//				
//		});
//	} 
//});
//
//
///**
// * 임베디드 페이지 또는 UDC가 부모인 경우
// * 해당 컨트롤 내부에서 시각적으로 표시되는 가장 첫번째 컨트롤이 임베디드 페이지인지 확인하고
// * 해당 컨트롤을 반환합니다.
// * @param {cpr.controls.EmbeddedApp} parent
// * @return {cpr.controls.EmbeddedPage}
// */
//function _getEmbeddedPage(parent) {
//	var appInstance = parent.getEmbeddedAppInstance();
//	if (appInstance){
//		var control = _visualFirstChild(appInstance.getContainer());
//		if (control instanceof cpr.controls.EmbeddedPage){
//			return control;
//		}
//	}
//	
//	return null;
//}
//
///**
// * 특정 조건에 따라 눈에 표시되는 컨트롤 중 첫 번째 컨트롤을 반환합니다.
// * (조건 => 컨테이너 컨트롤이 아니고, visible이 false가 아닌 컨트롤)
// * @param {cpr.controls.Container} container
// * @return {cpr.controls.UIControl}
// */
//function _visualFirstChild(container) {
//	//TODO 시각적으로 표시되는 컨트롤에 대한 조건이 변경되는 경우 소스를 수정해야 합니다.
//	var controls = container.getAllRecursiveChildren(false).filter(function(each){
//	return each.type !="container" && each.visible == true;
//	});
//	
//	if (controls.length > 0){
//		return controls[0];
//	}
//	return null;
//}