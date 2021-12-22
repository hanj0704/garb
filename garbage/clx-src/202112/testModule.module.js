/************************************************
 * testModule.module.js
 * Created at 2021. 12. 22. 오후 4:18:56.
 *
 * @author HANS
 ************************************************/
// XML정보를 읽어야하는 서브미션을 필터링하는 사용자속성명
var msSubUserPropNm = "useXmlRead";

//실제 responseData를 감싸고있는 태그명. responseData 규격에 맞는 태그명으로 수정되어야합니다.
var msDataTagName = "body";
//columnName을 태그명으로 사용한 태그들을 하나로 묶는 행 단위 태그명. responseData 규격에 맞는 태그명으로 수정되어야합니다.
var msRowTagName = "item";


cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
//	/** @type cpr.core.AppInstance */
	var control = e.control;
	
	if(control instanceof cpr.core.AppInstance && !control.isUDCInstance()){
		
		var vaSubmissions = control.getAllDataControls().filter(function(each){
			if(each instanceof cpr.protocols.Submission && each.userAttr(msSubUserPropNm) != "") {
				
				return each;
			}
		});
		
		vaSubmissions.forEach(function(/*cpr.protocols.Submission*/each){
			each.setResponseDecoder(responseDecoder);
		});
	}
	
});

function responseDecoder(submission,resData){
	if (!resData) {
			return null;
		}
		
		var state = null;
		var dataComp = null;
		var dataRow = null;
		var columnName = null;
		
		cpr.core.XMLParser.parse(resData, {
			startDocument: function() {},
			startElement: function(tagName, attrs) {
				if (tagName === msDataTagName) {
					state = msDataTagName;
					return;
				} else if (tagName === msRowTagName) {
					state = "datarow";
					dataRow = null;
					if (dataComp instanceof cpr.data.DataSet) {
						dataRow = dataComp.pushRow();
					}
					return;
				}
				if (state === msDataTagName) {
					dataComp = null;
					var resData = submission.getResponseData(tagName);
					if (resData) {
						dataComp = resData.data;
					}
					if (dataComp) {
						if (dataComp instanceof cpr.data.DataSet) {
							state = "datacollection";
							
							if (resData.isadd === false) {
								dataComp.clear();
							}
						} else if (dataComp instanceof cpr.data.DataMap) {
							state = "datacollection";
						} else {
							// skip notation
						}
					}
				} else if (state === "datarow" || state === "datacolumn") {
					state = "datacolumn";
					columnName = tagName;
				}
			},
			endElement: function(tagName) {
				switch (state) {
					case "datacolumn": {
						state = "datarow";
						return;
					}
					case "datarow": {
						state = "datacollection";
						return;
					}
					case "datacollection": {
						state = msDataTagName;
						return;
					}
				}
			},
			text: function(content) {
				if (state === "datacolumn") {
					if (dataComp) {
						if (dataComp instanceof cpr.data.DataSet) {
							dataRow.putValue(columnName, content);
						} else if (dataComp instanceof cpr.data.DataMap) {
							dataComp.setValue(columnName, content);
						}
					}
				}
			},
			endDocument: function() {
				dataComp = null;
				dataRow = null;
				columnName = null;
			}
		});
		
		return null;
}




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
		
		var vaFloated = voAps.getFloatingControls();
		if(vaFloated.length > 0) {
			
			var a = getFocusableRecursiveCtrl(vaFloated, null, true);
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
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
			try{
				/** @type Document */
				var voContent = document.getElementsByName(vsFrameName).item(0).contentWindow;
				
				if(voContent.hasOwnProperty("app")) {
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
					var vaFocusable = voContent.document.querySelectorAll('button, a[href], input, [tabindex="0"], select, textarea, [contentEditable=true]');
					if(vaFocusable.length > 0) {
						var voFirstChild = vaFocusable[0];
						var voLastChild = vaFocusable[vaFocusable.length-1];
						var ctrl = vcEmp;
						(function(a,b,c){setPrevFocusableCtrl(a,b,c)})(vaChildren,ctrl,voFirstChild);
						(function(a,b,c){setNextFocusableCtrl(a,b,c)})(vaChildren,ctrl,voLastChild);
					}
				}
			} catch(error){
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
	return vcResultCtrl;
}


/**
 * 특정 컨트롤부터 오름차순 혹은 내림차순으로 포커스될수 있는 컨트롤을 찾는 함수.
 * @param {cpr.controls.UIControl[]} paCtrls
 * @param {cpr.controls.EmbeddedPage} pcTargetCtrl 기준이 되는 컨트롤,  해당 컨트롤을 null로 입력할 경우, 처음부터 혹은 마지막부터 컨트롤을 찾습니다.
 * @param {Boolean} pbAsc true : 오름차순, false : 내림차순
 */
function getFocusableRecursiveCtrl(paCtrls, pcTargetCtrl, pbAsc){
	var voAppIns = pcTargetCtrl.getAppInstance();
	var vnIndex = pbAsc ? -1 : paCtrls.length-1 ;
	if(pcTargetCtrl != null){
		vnIndex = paCtrls.indexOf(pcTargetCtrl);
	}
//	debugger;
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
			for(var i = vnIndex-1; i > 0 ; i--) {
				var vcUIControl = paCtrls[i];
				if(checkIsFocusable(vcUIControl)) {
					vcReturnCtrl = vcUIControl;
					if(vcUIControl.getActualRect().width > 0){
						break;
					}
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

