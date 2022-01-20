/************************************************
 * automaticEmbFocusMod.module.js
 * Created at 2021. 11. 19. 오후 3:05:22.
 *
 * @author HANS
 ************************************************/
function keyup(/*cpr.events.CKeyboardEvent*/ev){
	if(ev.keyCode == cpr.events.KeyCode.TAB) {
		/** @type cpr.controls.UIControl */
		var control = ev.control;
		var voAps = control.getAppInstance();
		var first = voAps.getFirstFocusTraversableControl();
		var vaFloated = voAps.getFloatingControls();
		console.log(vaFloated);
		if(vaFloated.length > 0) {
			var a = getFocusableRecursiveCtrl(vaFloated, null, true);
			console.log(a);
			a.focus();
		}
		
	}
}
cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	/** @type cpr.core.AppInstance */
	var control = e.control;
	if(control instanceof cpr.core.AppInstance && !control.isUDCInstance() && !control.isEmbeddedAppInstance()) {
		control.getContainer().addEventListener("focusin", function(e){
			var voRelativeTarget = e.nativeEvent.relatedTarget;
			var vcFirst = control.getFirstFocusTraversableControl();
			if(vcFirst instanceof cpr.controls.EmbeddedApp) {
				
				vcFirst = vcFirst.getEmbeddedAppInstance().getFirstFocusTraversableControl();
			}
			control.getContainer().removeEventListener("keyup", keyup);
			if(voRelativeTarget == null && e.targetControl == vcFirst){
				control.getContainer().addEventListenerOnce("keyup", keyup);	
				
			}
		});
	}
});

var useYn = true;

if(useYn)cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	var control = e.control;
	if(control instanceof cpr.controls.EmbeddedPage) {
		/** @type cpr.controls.EmbeddedPage */
		var vcEmp = control;
		var voAps = vcEmp.getAppInstance();
		var vaChildren = voAps.getContainer().getAllRecursiveChildren();
		var vsFrameName = vcEmp.frameName;
//		debugger;
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
			try{
				/** @type Document */
				var voContent = document.getElementsByName(vsFrameName).item(0).contentWindow;
				if(voContent.hasOwnProperty("cpr")) {
					var vaEb6Native = voContent.document.querySelectorAll('.cl-control');
					/** @type cpr.core.AppInstance */
					var voInstantAps = voContent.app.getInstances()[0];
					var vaInnerChildrens = voInstantAps.getContainer().getAllRecursiveChildren();
					var vcFirstChild = getFocusableCtrl(vaInnerChildrens);
					var vcLastChild = getFocusableCtrl(vaInnerChildrens,true);
					var ctrl = vcEmp;
					setPrevCtrlEB6(vaChildren, ctrl, vcFirstChild);
					setNextCtrlEB6(vaChildren, ctrl, vcLastChild);
					(function(a,b,c){setPrevFocusableCtrl(a,b,c)})(vaChildren,ctrl,vcFirstChild);
					(function(a,b,c){setNextFocusableCtrl(a,b,c)})(vaChildren,ctrl,vcLastChild);
					
				} else {
					/** @type NodeList */
					var vaFocusable = voContent.document.querySelectorAll('button, a[href], input:not([tabindex="-1"]), [tabindex="0"], select, textarea, [contentEditable=true]');
//					var test = voContent.document.querySelectorAll('input[tabindex][type="checkbox"]:not([tabindex="-1"])');
//					console.log(test);
					if(vaFocusable.length > 0) {
						var voFirstChild = vaFocusable[0];
						var voLastChild = vaFocusable[vaFocusable.length-1];
						var ctrl = vcEmp;
						(function(a,b,c){setPrevFocusableCtrl(a,b,c)})(vaChildren,ctrl,voFirstChild);
						(function(a,b,c){setNextFocusableCtrl(a,b,c)})(vaChildren,ctrl,voLastChild);
					}
				}
			} catch(error){
				throw error;
				return false;
			}
		
		});
	}
});

/**
 * 
 * @param {cpr.controls.UIControl} pcCtrl
 */
function checkIsFocusable (pcCtrl){
	
	if(pcCtrl.type == "embeddedapp"|| pcCtrl.type =="embeddedpage"||
	pcCtrl.type == "checkboxgroup" || pcCtrl.type =="radiobutton"
	||pcCtrl instanceof cpr.controls.UDCBase){
		return true;
	} else if(pcCtrl.focusable && pcCtrl.tabIndex != -1) {
		return true;
	} 
	else {
		return false;
	}
}
/**
 * 
 * @param {cpr.controls.EmbeddedPage} pcEmbeddPage
 */
function getFocusableEmbeddedPage(pcEmbeddPage){
	var vsFrameName = pcEmbeddPage.frameName;
	var voContent = document.getElementsByName(vsFrameName).item(0).contentWindow;
	var vaFocusable = [];
	if(voContent.hasOwnProperty("app")){
		vaFocusable = voContent.document.querySelectorAll('.cl-control');
	} else {
		
		vaFocusable = voContent.document.querySelectorAll('button, a[href], input, [tabindex="0"], select, textarea, [contentEditable=true]');
	}
	
	
	return vaFocusable;
}

/**
 * 임베디드 페이지 리소스가 빌더로 만든 페이지 일 경우, 해당 페이지 내에서 포커스될수있는 가장 첫번째 혹은 가장 마지막 컨트롤을 찾는 함수.
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {Boolean} startRight? 
 */
function getFocusableCtrl(paCtrls,startRight) {
	var vaCtrls = paCtrls;
	var vcResultCtrl = null;
	if(startRight) {
		vaCtrls.reverse();
	}
	vcResultCtrl = vaCtrls.find(function(ele){
		if(checkIsFocusable(ele))  {
			return ele;
		}
	});
	
	if(vcResultCtrl instanceof cpr.controls.EmbeddedApp) {
		var vaTempCtrls = vcResultCtrl.getEmbeddedAppInstance().getContainer().getAllRecursiveChildren();
		return getFocusableCtrl(vaTempCtrls,startRight)
	} else {
		
		return vcResultCtrl;
	}
}


/**
 * 특정 컨트롤부터 오름차순 혹은 내림차순으로 포커스될수 있는 컨트롤을 찾는 함수.
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {cpr.controls.EmbeddedPage} pcTargetCtrl 기준이 되는 컨트롤,  해당 컨트롤을 null로 입력할 경우, 처음부터 혹은 마지막부터 컨트롤을 찾습니다.
 * @param {Boolean} pbAsc true : pcTargetCtrl 기준 하위 컨트롤을 찾음, false : pcTargetCtrl 기준 상위 컨트롤을 찾음
 */
function getFocusableRecursiveCtrl(paCtrls, pcTargetCtrl, pbAsc){
//	debugger;
	var voAppIns =null;
	if(pcTargetCtrl != null) {
		
		voAppIns = pcTargetCtrl.getAppInstance();
	} else {
		
		voAppIns = paCtrls[0].getAppInstance();
	}
	
	var vnIndex = pbAsc ? -1 : paCtrls.length ;
	if(pcTargetCtrl != null){
		vnIndex = paCtrls.indexOf(pcTargetCtrl);
	}
	var vcReturnCtrl = null;
		
		if(pbAsc) {
		
		if(vnIndex == paCtrls.length-1) {
			if(pcTargetCtrl instanceof cpr.controls.EmbeddedPage && pcTargetCtrl.getAppInstance().isEmbeddedAppInstance()) {	
				var vcHostAppIns = pcTargetCtrl.getAppInstance().getHostAppInstance();
				var vcHost = pcTargetCtrl.getAppInstance().getHost();
				var vaRecursiveChild = vcHostAppIns.getContainer().getAllRecursiveChildren();
				return getFocusableRecursiveCtrl(vaRecursiveChild, vcHost, pbAsc);
			}
			vnIndex = -1
		}
		for(var i = vnIndex +1 ; i < paCtrls.length ; i++) {
			
			var vcUIControl = paCtrls[i];
			if(checkIsFocusable(vcUIControl)) {
				vcReturnCtrl = vcUIControl;
				if(vcUIControl.getActualRect().width > 0){
					break;
				}
			}
		}
		} else {
			for(var i = vnIndex-1; i >= 0 ; i--) {
				var vcUIControl = paCtrls[i];
				if(checkIsFocusable(vcUIControl)) {
					vcReturnCtrl = vcUIControl;
					if(vcUIControl.getActualRect().width > 0){
						break;
					}
				}
			}
			
			//
			if(vcReturnCtrl == null) {
				
				if(pcTargetCtrl instanceof cpr.controls.EmbeddedPage && pcTargetCtrl.getAppInstance().isEmbeddedAppInstance()) {	
				var vcHostAppIns = pcTargetCtrl.getAppInstance().getHostAppInstance();
				var vcHost = pcTargetCtrl.getAppInstance().getHost();
				var vaRecursiveChild = vcHostAppIns.getContainer().getAllRecursiveChildren();
				return getFocusableCtrl(vaRecursiveChild, !pbAsc);
			}
			}
		}
	
	if(vcReturnCtrl instanceof cpr.controls.EmbeddedPage) {
		
		var vaEmbFocusable = getFocusableEmbeddedPage(vcReturnCtrl);
		if(pbAsc){
			vcReturnCtrl = vaEmbFocusable[0];
		} else {
			vcReturnCtrl = vaEmbFocusable[vaEmbFocusable.length-1];
		}
	} else if(vcReturnCtrl instanceof cpr.controls.EmbeddedApp) {
		var vaChild = vcReturnCtrl.getEmbeddedAppInstance().getContainer().getAllRecursiveChildren();
		console.log("여길 타는사람이 얼마나 있겠냐");
		return  getFocusableCtrl(vaChild,!pbAsc);
	} 
	else if(vcReturnCtrl == null && voAppIns.isEmbeddedAppInstance()) {
		var vcHost = voAppIns.getHost();
		var voTempHostAppIns = voAppIns.getHostAppInstance();
		var vaTempChildren = voTempHostAppIns.getContainer().getAllRecursiveChildren();
		return getFocusableRecursiveCtrl(vaTempChildren, vcHost, pbAsc)
		
	}
	return vcReturnCtrl;
	
}

/**
 * 
 * @param {cpr.controls.EmbeddedPage} pcEmbPage
 * @param {Boolean} pBool
 */
function getFocusableRecursiveFloated(pcEmbPage, pBool){
	console.log("타긴하냐?");
	var vcEmbPage = pcEmbPage;
	var voAppIns = pcEmbPage.getAppInstance();
	var vcReturnCtrl = null;
	var vaFloated = voAppIns.getFloatingControls();
	var vaRecursiveChild = [];
	if(vaFloated.length >1) {
		
		vaFloated.forEach(function(each){
			if(each instanceof cpr.controls.EmbeddedApp && !each.getAppInstance().isUDCInstance()) {
				
				/*
				 * 위협점 : 임베디드 페이지가 로드가 다 되었다고 하더라도, 임베디드 앱의 로드가 다 완료되었다는 보장이 존재하지 않음
				 * 여기서 이를 동기적으로 기다렸다가 배열에 집어넣는 작업을 수행하기는 구조적 문제가 발생할수도 있으니, 우선 그대로 진행
				 */
				var voEmbAppIns = each.getEmbeddedAppInstance();
				var vaChild = voEmbAppIns.getContainer().getAllRecursiveChildren();
				vaRecursiveChild.push(each);
			} else if(each instanceof cpr.controls.Container){
				var vaContChildrens = each.getAllRecursiveChildren().forEach(function(eachs){
					vaRecursiveChild.push(eachs)
				});
			} else {
				vaRecursiveChild.push(each);
			}
		});
		
		if(vaRecursiveChild.indexOf(vcEmbPage) == 0) {
			if(pBool) {
	 		
		 		vcReturnCtrl = getFocusableRecursiveCtrl(vaRecursiveChild, vcEmbPage, pBool);
		 	} else {
		 		var vaHanChildren = voAppIns.getContainer().getAllRecursiveChildren();
		 		vcReturnCtrl = vaHanChildren.pop();
		 		
//		 		vcReturnCtrl = voAppIns.getLastFocusTraversableControl();
		 	}
		}
		else if(vaRecursiveChild.indexOf(vcEmbPage) == vaRecursiveChild.length-1){
			
			if(pBool) {
				
				vcReturnCtrl = voAppIns.getFirstFocusTraversableControl();
			} else {
				
				vcReturnCtrl = getFocusableRecursiveCtrl(vaRecursiveChild, vcEmbPage, pBool);
			}
		} else {
			vcReturnCtrl = getFocusableRecursiveCtrl(vaRecursiveChild, vcEmbPage, pBool);
		}
		
	 } else {
	 	if(pBool) {
	 		
		 	vcReturnCtrl = voAppIns.getFirstFocusTraversableControl();
	 	} else {
	 		
	 		vcReturnCtrl = voAppIns.getLastFocusTraversableControl();
	 	}
	 	
	 }
	 
	 return vcReturnCtrl;
}
/**
 * 임베디드 페이지 리소스가 빌더로 작성된 페이지인 경우, 임베디드 페이지내 포커스 될수있는 컨트롤의 마지막 컨트롤이 블러처리될 경우, 
 * 임베디드 페이지의 바로 다음 컨트롤에 포커스를 이동하는 함수
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {cpr.controls.EmbeddedPage} pcTargetCtrl
 * @param {cpr.controls.UIControl} pcChildElement
 */
function setNextCtrlEB6(paCtrls, pcTargetCtrl, pcChildElement){
	console.log("안탐");
	var vnIndex = paCtrls.indexOf(pcTargetCtrl);
	var vcUIControl = getFocusableRecursiveCtrl(paCtrls,pcTargetCtrl,true);
	if(pcChildElement.type =="checkboxgroup"){
		/** @type Document */
		var voContent = document.getElementsByName(pcTargetCtrl.frameName).item(0).contentWindow;
		pcChildElement.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/e){
				if(e.keyCode ==cpr.events.KeyCode.TAB && !e.shiftKey) {
					var voActiv = voContent.document.activeElement;
					var voItem = voActiv.closest(".cl-checkbox");
					var voCtrl = voActiv.closest(".cl-control");
					var voLast = voCtrl.querySelector(".cl-last-row.cl-last-column");
					if(voItem == voLast) {
						e.stopPropagation();
						e.preventDefault();
						vcUIControl.focus();
					}
				}
			});
	} else {
		pcChildElement.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/e){
				if(e.keyCode ==cpr.events.KeyCode.TAB && !e.shiftKey) {
						e.stopPropagation();
						e.preventDefault();
						vcUIControl.focus();
				}
			});
	}
	
			
}

/**
 * 임베디드 페이지 리소스가 빌더로 작성된 페이지인 경우, 임베디드 페이지내 포커스 될수있는 컨트롤읠 가장 첫번째 컨트롤이 블러처리 될 경우,
 * 임베디드 페이지의 바로 이전 컨트롤에 포커스를 이동시키는 함수
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {cpr.controls.EmbeddedPage} pcTargetCtrl
 * @param {cpr.controls.UIControl} pcChildElement
 */
function setPrevCtrlEB6(paCtrls, pcTargetCtrl, pcChildElement) {
	console.log("안탐ㅁ");
	var vnIndex = paCtrls.indexOf(pcTargetCtrl);
	
	var vcUIControl = getFocusableRecursiveCtrl(paCtrls,pcTargetCtrl,false);
	if(pcChildElement.type =="checkboxgroup"){
		/** @type Document */
		var voContent = document.getElementsByName(pcTargetCtrl.frameName).item(0).contentWindow.document;
		pcChildElement.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/e){
				if(e.keyCode ==cpr.events.KeyCode.TAB && e.shiftKey) {
					var voActiv = voContent.activeElement;
					var voItem = voActiv.closest(".cl-checkbox");
					var voCtrl = voActiv.closest(".cl-control");
					var voFirst = voCtrl.querySelector(".cl-first-row.cl-first-column");
					if(voItem == voFirst) {
						e.stopPropagation();
						e.preventDefault();
						vcUIControl.focus();
					}
				}
			});
		
	} else {
		
		pcChildElement.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/e){
			if(e.keyCode ==cpr.events.KeyCode.TAB && e.shiftKey) {
				e.stopPropagation();
				e.preventDefault();
				vcUIControl.focus();
			}
		});
	}
}
/**
 * 임베디드 페이지 바로 이전에 있는 컨트롤에서 탭키를 누를시, 임베디드 페이지 내 포커스될 수 있는 가장 첫번째 컨트롤로 포커스를 이동하는 함수.
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {cpr.controls.EmbeddedPage} pcTargetCtrl
 * @param {Element} pcChildElement
 */
function setPrevFocusableCtrl(paCtrls, pcTargetCtrl,pcChildElement){
//	debugger;
	var vnIndex = paCtrls.indexOf(pcTargetCtrl);
	var vcUIControl = null;
	if(vnIndex == -1 && pcTargetCtrl.isFloated()) {
		vcUIControl = getFocusableRecursiveFloated(pcTargetCtrl,false);
	}  else {
		vcUIControl = getFocusableRecursiveCtrl(paCtrls,pcTargetCtrl,false)
	}
			var vcFocusable = pcChildElement;
//			console.log("ㅋㅅㅋ");
//			console.log(vcUIControl);
//			console.log(vcFocusable);
			vcUIControl.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/e){
				if(e.keyCode == cpr.events.KeyCode.TAB && !e.shiftKey) {
					console.log("탭")
					e.stopPropagation();
					e.preventDefault();
					vcFocusable.focus();
				}
			});
}

/**
 * 임베디드 페이지의 바로 다음에 있는 컨트롤에서 shift + tab 키를 누를시, 임베디드 페이지 내 포커스 될 수 있는 가장 마지막 컨트롤로 포커스를 이동하는 함수.
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {cpr.controls.EmbeddedPage} pcTargetCtrl
 * @param {Element} pcChildElement
 */
function setNextFocusableCtrl(paCtrls, pcTargetCtrl,pcChildElement) {
	
	var vnIndex = paCtrls.indexOf(pcTargetCtrl);
	var vcUIControl = null;
	if(vnIndex == -1 && pcTargetCtrl.isFloated()) {
		vcUIControl = getFocusableRecursiveFloated(pcTargetCtrl,true);
	}  else {
		vcUIControl = getFocusableRecursiveCtrl(paCtrls,pcTargetCtrl,true)
	}			
			var vcFocusable = pcChildElement;
//			console.log("ㅋㅁㅋ");
//			console.log(vcUIControl);
//			console.log(vcFocusable);
			vcUIControl.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/e){
				if(e.keyCode == cpr.events.KeyCode.TAB && e.shiftKey) {
					console.log("쉬프트탭");
					e.stopPropagation();
					e.preventDefault();
					vcFocusable.focus();
				}
			});
}

