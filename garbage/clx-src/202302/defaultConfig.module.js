///************************************************
// * defaultConfig.module.js
// * Created at 2022. 3. 29. 오후 3:04:22.
// * 	defaults.js파일에서 조작가능한 기본 컨트롤의 속성을 제어하는 모듈입니다.
// *	2022-03-29 그리드 내에 배치된 컨트롤들에 대해 편집 가능한 것을 스타일로 표현하기 위해 border가 보이게
// * 컴포넌트가 배치되야 하므로 grid의 spacing속성이 기본값으로 추가되었습니다.top, bottom에 12 px이 적용되어야 하나,
// * 퍼블리싱이 반영되지 않는 화면이 존재하여 일시적으로 2px의 spacing이 적용됩니다.
// * 2022-03-29 그리드에서 삭제한 행들에 대해 사용자에게 시각적으로 보이지 않게 하기 위하여 showDeletedRow : false가
// * 추가되었습니다.
// * 2022-05-26	그리드에 데이터가 존재하지 않는 경우 기본 메세지로 데이터가 존재하지 않는다는 메세지를 표시하도록
// * noDataMessage 속성의 기본값이 추가되었습니다.
// * --
// * 기능 목록
// * 1. 컨트롤의 기본값 지정.
// * 	- 커스텀 스크롤바 사용  여부 : true
// * 	- 그리드의 기본 속성값 지정
// * 			I. 그리드 셀 내에 배치된 컨트롤의 여백 크기 지정
// * 			II. 그리드에서 사용자가 deleteRow를 사용했을 때, 삭제한 행을 사용자에게 감추기 처리하게 showDeletedRow 속성값 false 지정
// * 			III. 그리드의 행이 존재하지 않을 시 표기되는 noDataMessage 속성값 지정
// * 			IV. 그리드의 헤더 셀에서 좌우 구분선을 잡고 컬럼 사이즈를 변경할 수 있게 resizableColumns 속성 지정
// * 	- 그외 컨트롤 기본 속성값 지정
// *
// * 2. 리소스 요청과 캐시 관련 설정
// * 	- appcache라는 속성은 활성화된 AppInstance가 없을 때 App을 정의하는 Javascript 객체를 캐시할지 여부를 설정합니다.
// * 	fasle로 설정되면 활성화된 AppInstance가 없을 때 App을 삭제하고 다음 App의 요청이 있을 때 서버에 해당 App을 정의하는 clx.js 파일을 요청하게 됩니다.
// * 쉽게 풀면 한번 열었던 화면을 닫고 다시 열었을 때, 기본적으로는 해당 화면의 리소스를 다시 요청하지 않습니다.
// * 디스크 캐시를 하거나 하는 형식이 아니라 아예 서버쪽에 리소스를 달라는 요청 자체를 보내지 않습니다.
// *  이렇게 했을 때, 사용자가 서비스를 사용중인 동안 화면에 대한 수정내역이 발생하여 긴급하게 배포하였을 때, 사용자가 이 수정내역을
// * 페이지 자체를 새로고침 하지 않는이상 확인할 수 있는 방법이 없다고 하여, 닫았던 화면에 대해 다시 열 때 해당 화면에 대한 리소스를 다시 요청하기 위해
// * 함수 내용이 작성되었습니다.
// *  다만 이 함수 내용에도 도메인이 localhost이냐 아니냐에 따라 동작 방식이 약간 다른데, appcache 속성을 false로 지정하면 화면을 열때마다 항상
// * 리소스 요청을 보내면서 캐시도 허용하지 않기 때문에 리소스 요청시 ?p=0.~~~~~ 라는 파라미터를 붙여서 캐싱 자체를 허용하지 않는 구조로
// * 리소스를 요청하게 됩니다. 이는 캐시 정책을 웹서버에 두고 사용하려는 인프라팀과 상의되어 아예 캐시를 사용하지 않는것은 안된다는 결론이 나왔고,
// * 화면을 닫았을 때, 해당 화면에 다른 인스턴스가 존재하지 않는 경우 화면을 언로드 시켜주는 코드를 통해서 리소스 요청을 보낼 수 있도록 수정하였습니다.
// *
// * 3. 화면 로드시 화면에 존재하는 컨트롤들에 대한 공통 조작
// * 	- 화면상에 존재하는 그리드 컬럼에 단일 소팅 기능 추가, 원하지 않는 컬럼이 있을 경우 예외처리 작업까지 수행(ignore-autosort)
// * 	- 화면상에 존재하는 서치인풋 컨트롤에서 특정 사용자 속성값을 만족하면, 해당 서치인풋에 이벤트 리스너를 추가하여 키보드 입력을 막고
// * 데이터가 존재할 때, 데이터를 지울 수 있도록 x 버튼을 표시하도록 설정값 추가.
// * 	- 이미지가 정상적으로 로드되었을 경우 기존에 존재하던 no-image 처리에 대한 클래스 설정을 지우고 제대로 이미지를 표시하도록 처리.
// *	- 이미지 컨트롤에서 요청된 이미지를 정상적으로 불러오지 못했을 경우 대체 이미지를 표시해주는 기능
// * 	- 패스워드등을 입력하는 인풋박스를 사용할 때, 브라우저에서 비밀번호 저장 기능을 사용시 인풋태그의 type='password'인 경우에
// * 패스워드를 자동완성 받을 수 있고, html 구조상 해당 인풋태그와 가장 가까운 상위 인풋 태그에 아이디가 강제로 입력되는것을 막기 위해
// * autocomplete="new-password" 사용
// * @author 1441273
// ************************************************/
//cpr.core.AppConfig.INSTANCE.setEnvValue("useCustomScrollbar", true);
//cpr.core.AppConfig.INSTANCE.setControlValue("inputbox.autocomplete", "nope");
//cpr.core.AppConfig.INSTANCE.setControlValue("searchinput.autocomplete", "nope");
//cpr.core.AppConfig.INSTANCE.setControlValue("grid", {
//	"layout" : {
////		width : 100,
////		height : 32,
//		topSpacing: 8,
//		bottomSpacing: 8,
//		leftSpacing: 10,
//		rightSpacing: 10
//	},
//	"showDeletedRow" : false,
//	"noDataMessage" : "데이터가 없습니다.",
//	"resizableColumns" : "all"
//});
//
//cpr.events.EventBus.INSTANCE.addFilter("unload", function(e){
//var control = e.control;
//
//if(control instanceof cpr.core.AppInstance) {
//	if(control.isUDCInstance()|| control.app.id.indexOf("ospp_udc_common") != -1){
//			return;
//		}
//		var voApp = control.app;
//		var vaInstances = voApp.getInstances();
//		if(vaInstances.length < 1) {
//			voApp.unload();
//		}
//	}
//});
//
//
//cpr.core.AppConfig.INSTANCE.setControlValue("combobox", {
//	"value" : "",
//	"preventInput" : true
//});
//
//cpr.core.AppConfig.INSTANCE.setControlValue("dateinput", {
//	"headerFormat" : "YYYY.MM"
//});
//
//cpr.core.AppConfig.INSTANCE.setControlValue("tabfolder", {
//	"headerArrowPosition" : "none"
//});
//cpr.core.AppConfig.INSTANCE.setControlValue("mdifolder", {
//	"headerArrowPosition" : "none"
//});
//
//cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
//	var control = e.control;
//	if(control instanceof cpr.core.AppInstance && !control.isUDCInstance()){
//
//		var vaAllChild = control.getContainer().getAllRecursiveChildren();
//
//		var vaSearchInputs = vaAllChild.filter(function(each){
//			if(each instanceof cpr.controls.SearchInput) {
//				return each;
//			}
//		});
//		vaSearchInputs.forEach(function(each){
//
//			if(each.userAttr("user-preventInput") == "Y") {
//				each.addEventListener("keydown", function(/*cpr.events.CKeyboardEvent*/ev){
//					if(ev.keyCode != cpr.events.KeyCode.TAB){
//
//						ev.preventDefault();
//					}
//				});
//
//				each.addEventListener("input", function(evt){
//					if(evt.target.value) {
//						evt.target.value = evt.control.value;
//					}
//				});
//			}
//		});
//
//		/** @type cpr.controls.Grid[] */
//		var vaGrids = vaAllChild.filter(function(each){
//			var vsIgnoreAutosort = each.userAttr("ignore-autosort");
//			if(each instanceof cpr.controls.Grid && vsIgnoreAutosort != "all" && vsIgnoreAutosort != "true") {
//				return each;
//			}
//		});
//		if(vaGrids.length < 1) {
//			return;
//		}
//			vaGrids.forEach(function(each){
//				var vsExcludeHead = each.userAttr("ignore-autosort");
//				var vaExclude = [];
//				if(ValueUtil.fixNull(vsExcludeHead) != "") {
//					vaExclude = vsExcludeHead.trim().split(",");
//					vaExclude = vaExclude.map(function(each){
//						return Number(each.trim());
//					});
//				}
//				var vnDetailCount = each.detail.cellCount;
//
//				var setSortColumn = function(pcGrid, paHeaderIdxs, pnTempIdx) {
//					if (paHeaderIdxs.length > 0) {
//						var vnTempHeadIdx = paHeaderIdxs.pop();
//						var voTempHead = pcGrid.header.getColumn(vnTempHeadIdx);
//						voTempHead.sortable = false;
//						if (ValueUtil.fixNull(voTempHead.targetColumnName) != "") {
//							voTempHead.targetColumnName = "";
//						}
//						if (vaExclude.indexOf(pnTempIdx) != -1) {
//							voTempHead.sortColumnName = null;
//						} else {
//							voTempHead.sortColumnName = vsColumnName;
//						}
//					}
//				}
//
//				for(var tempIdx = 0; tempIdx < vnDetailCount ; tempIdx++) {
//
//					var voTempDetail = each.detail.getColumn(tempIdx);
//					var vsColumnType = voTempDetail.columnType;
//					var vsColumnName = voTempDetail.columnName;
//					if(vsColumnType == "normal" && ValueUtil.fixNull(vsColumnName)) {
//						var vaHeaderIdxs = each.getHeaderCellIndices(tempIdx);
//						setSortColumn(each,vaHeaderIdxs,tempIdx);
//					}
//				}
//
//				var voGrdHeader = each.header;
//				var vnLength = voGrdHeader.getRowHeights().length;
//				var removeLastColumnBorder = function(pcGrid) {
//					var vcGrid = pcGrid;
//					var vnCellCnt = vcGrid.header.cellCount;
//					for (var i = 0; i < vnCellCnt; i++) {
//						vcGrid.header.getColumn(i).style.removeClass("border-right-0");
//					}
//					var vaDetails = vcGrid.detail.getCellIndices().reverse();
//					//	}
//					var vaTargetHeader = null;
//					vaDetails.some(function(tester) {
//						vaTargetHeader = vcGrid.getHeaderCellIndices(tester);
//						var vbResult = vaTargetHeader.every(function(each) {
//							return vcGrid.header.getColumn(each).visible;
//						});
//						return vbResult;
//					});
//					vaTargetHeader.forEach(function(each) {
//						vcGrid.header.getColumn(each).style.addClass("border-right-0");
//					});
//				}
//				if( vnLength > 1 ){
//					removeLastColumnBorder(each);
//
//					each.addEventListener("layout-change", function(e){
//						removeLastColumnBorder(e.control);
//					});
//				}
//
//			});
//
//
//	}
//	//이미지가 정상적으로 로드되었을때의 처리
//	if(control instanceof cpr.controls.Image && control.src != "") {
//		control.alt = "";
//		var vaClasses = control.style.getClasses();
//		vaClasses.forEach(function(each){
//
//			if(each.indexOf("no-img") != -1) {
//				control.style.removeClass(each);
//			}
//		});
//	}
//});
//
//cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
//	var control = e.control;
//
//	if(control instanceof cpr.core.AppInstance) {
//		if (!control.isUDCInstance()) {
//
//			var vsAppId = control.app.id;
//			var vsPageNmParam = vsAppId.substring(vsAppId.lastIndexOf("/") + 1, vsAppId.length);
//			var vaIdCheck = ["login", "2factorLogin", "main", "RootMain"];
//			if (vaIdCheck.indexOf(vsPageNmParam) != -1) {
//				var meta = document.getElementsByName("viewport");
//				var viewport = meta.item(0);
//				viewport.setAttribute("content", "width=1440,user-scalable=yes");
//				setTimeout(function(){
//					var meta = document.getElementsByName("viewport");
//					var viewport = meta.item(0);
//					viewport.setAttribute("content", "width=1440,user-scalable=yes");
//
//				}, 2000);
////				control.getContainer().overscrollBehavior = "none";
////				var vsUA = window.navigator.userAgent;
////				var vnInnerWidth = window.innerWidth;
////				if (vsUA.indexOf("X11") != -1 && (vnInnerWidth < 1440 && window.navigator.maxTouchPoints > 0)) {
////					var vnPercent = vnInnerWidth / 1440;
////					vnPercent = Math.floor(vnPercent * 100);
////					document.body.style.zoom = vnPercent + "%";
////				}
//			}
//		}
//
//		var vaCtrls = control.getContainer().getAllRecursiveChildren();
//
//		vaCtrls.forEach(function(each){
//			if(each instanceof cpr.controls.InputBox && each.secret) {// boolean 변수 조건식 비교 금지
//					each.autocomplete = "new-password";
//			}
//		});
//	}
//});
//cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(e){
//	var control = e.control;
//
//	if(control instanceof cpr.controls.TabFolder || control instanceof cpr.controls.MDIFolder) {
//		cpr.core.NotificationCenter.INSTANCE.post("tab-change-for-meaure", {
//
//		});
//	}
//});
//
//cpr.events.EventBus.INSTANCE.addFilter("error", function(e){
//	var control = e.control;
//
//	if(control instanceof cpr.controls.Image) {
//		control.alt = "이미지가 존재하지 않습니다.";
//		control.src = "";
//		var vsClassName = "";
//
//		if(control.getAppInstance().id.indexOf("RootMain") != -1) {
//			if(!control.visible){
//				control.visible= true;
//				cpr.core.DeferredUpdateManager.INSTANCE.update();
//			}
//		}
//		var vnWidth = control.getActualRect().width;
//		if(vnWidth < 65) {
//
//			vsClassName = "no-img-sm";
//		}
//		else if(vnWidth > 330) {
//
//			vsClassName = "no-img-lg";
//		} else {
//
//			vsClassName = "no-img-md";
//		}
//			control.style.setClasses(vsClassName);
//	}
//});
//var msUa = navigator.userAgent;
//var vnInnerWidth = window.innerWidth;
//	var lastTouchEnd = null;
//	var prevTarget = null;
//if(msUa.indexOf("android") || (msUa.indexOf("X11") != -1 && (vnInnerWidth < 1440 && window.navigator.maxTouchPoints > 0))) {
//	cpr.events.EventBus.INSTANCE.addFilter("touchstart", function(/*cpr.events.CTouchEvent*/e){
//		/** @type cpr.controls.UIControl */
//		var control = e.control;
//		var now = moment().valueOf();
//		if (control instanceof cpr.controls.Grid) {
//
//			var vaTouchItem = e.touches;
//			var vnSelectRow = -1;
//			if(vaTouchItem.length > 1) {
//				return;
//			}
//			var voTouchItem = e.touches.item(0);
//
//			var vaElementsOnMouse = elementsFromPoint(voTouchItem.clientX, voTouchItem.clientY);
//			var vbHeader = vaElementsOnMouse.some(function(/*HTMLElement*/each){
//				return each.classList.contains("cl-grid-header");
//			});
//			if(vbHeader) {
//				return;
//			}
//			var vaClGridRowEle = vaElementsOnMouse.filter(function(/*HTMLElement*/each){
//						if(each.classList.contains("cl-grid-row")) {
//							return each;
//						}
//					});
//					if(vaClGridRowEle.length > 0) {
//
//					/** @type Element */
//					var voGridRowElement = vaClGridRowEle[0];
//					vnSelectRow = voGridRowElement.getAttribute("data-rowindex");
//					vnSelectRow = Number(vnSelectRow);
//					control.selectRows(vnSelectRow);
//					}
//
//
//			var voEventTarget = e.target;
//			if (now - lastTouchEnd <= 300 && voEventTarget == prevTarget) {
////					e.preventDefault();
//					var evt = new cpr.events.CMouseEvent("row-dblclick");
//					control.dispatchEvent(evt);
//					var dblclick = new cpr.events.CMouseEvent("dblclick");
//					control.dispatchEvent(dblclick);
//
//					control.setEditRowIndex(vnSelectRow);
//
//					/** @type Array */
//					var vaClGridCellEle = vaElementsOnMouse.filter(function(/*HTMLElement*/each){
//						return each.classList.contains("cl-grid-cell");
//					});
//					if(vaClGridCellEle.length > 0) {
//
//						var voGridCellElement = vaClGridCellEle[0];
//						var vnCellIdx = voGridCellElement.getAtrribute("data-cellindex");
//						vnCellIdx = Number(vnCellIdx);
//						control.focusCell(vnSelectRow, vnCellIdx);
//					}
//			}
//			lastTouchEnd = now;
//			prevTarget = voEventTarget;
//		}
//	});
//}
//
//
//function elementsFromPoint(x, y) {
//	if (document["msElementsFromPoint"]) {
//		var nodeList = document["mselementsFromPoint"](x, y);
//		if (!nodeList) {
//			return [];
//		} else {
//			return Array.prototype.slice.call(nodeList);
//		}
//	} else {
//		return (document["elementsFromPoint"](x, y) || []);
//	}
//}
//
////document.addEventListener("error", function(evt){
////	if(evt.target.tagName.toLowerCase() == "img") {
////		/** @type HTMLElement[] */
////		var vaPaths = evt.path;
////		var vbIsSuccess = vaPaths.some(function(each){
////			var vaClassList = each.classList;
////			if(vaClassList && vaClassList.length > 0 && vaClassList.contains("cl-grid-cell")) {
////				return true;
////			}
////		});
////		if(vbIsSuccess) {
////			evt.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgcng9IjE2IiBmaWxsPSIjRjVGNUY1Ii8+DQo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjQ4Nl83NTQyKSI+DQo8cGF0aCBkPSJNNTAuNzIyNCA2OC43OTg2QzUwLjA2ODUgNjguNzk4NiA0OS40Nzg5IDY4LjcwMTUgNDguOTU1NiA2OC41MDczQzQ4LjQzMTQgNjguMzEzIDQ3Ljk4NDUgNjguMDM0OSA0Ny42MTcgNjcuNjcyOEM0Ny4yNDg1IDY3LjMxMDcgNDYuOTY3OCA2Ni44NzA0IDQ2Ljc3NjUgNjYuMzUwOEM0Ni41ODQ0IDY1LjgzMTMgNDYuNDg4MyA2NS4yNDY3IDQ2LjQ4ODMgNjQuNTk2QzQ2LjQ4ODMgNjMuOTQ1NCA0Ni41ODQ0IDYzLjM2MDggNDYuNzc2NSA2Mi44NDEzQzQ2Ljk2ODcgNjIuMzIxNyA0Ny4yNDg1IDYxLjg4MTQgNDcuNjE3IDYxLjUxOTNDNDcuOTg1NSA2MS4xNTcyIDQ4LjQzMTQgNjAuODc5IDQ4Ljk1NTYgNjAuNjg0OEM0OS40Nzk4IDYwLjQ5MDYgNTAuMDY4NSA2MC4zOTM0IDUwLjcyMjQgNjAuMzkzNEM1MS4zNzYzIDYwLjM5MzQgNTEuOTY3NyA2MC40OTA2IDUyLjQ5NzUgNjAuNjg0OEM1My4wMjc0IDYwLjg3OSA1My40NzMzIDYxLjE1NzIgNTMuODM2MSA2MS41MTkzQzU0LjE5OSA2MS44ODE0IDU0LjQ3OTggNjIuMzIxNyA1NC42NzY2IDYyLjg0MTNDNTQuODczNCA2My4zNjA4IDU0Ljk3MjMgNjMuOTQ1NCA1NC45NzIzIDY0LjU5NkM1NC45NzIzIDY1LjkxOCA1NC41OTgzIDY2Ljk0ODYgNTMuODUxMSA2Ny42ODg4QzUzLjEwMzkgNjguNDI4MSA1Mi4wNiA2OC43OTg2IDUwLjcyMTQgNjguNzk4Nkg1MC43MjI0Wk01MC43MjI0IDY2Ljk4OTJDNTEuNDM4OCA2Ni45ODkyIDUxLjk4MDcgNjYuNzg0NiA1Mi4zNDkyIDY2LjM3NTNDNTIuNzE3NyA2NS45NjYxIDUyLjkwMTQgNjUuMzczOSA1Mi45MDE0IDY0LjU5N0M1Mi45MDE0IDYzLjgyIDUyLjcxNjcgNjMuMjMwNyA1Mi4zNDkyIDYyLjgyNjJDNTEuOTgwNyA2Mi40MjI2IDUxLjQzODggNjIuMjE5OSA1MC43MjI0IDYyLjIxOTlDNDkuMjc5MyA2Mi4yMTk5IDQ4LjU1ODIgNjMuMDExOSA0OC41NTgyIDY0LjU5NkM0OC41NTgyIDY1LjM4MzQgNDguNzQwMSA2NS45Nzg0IDQ5LjEwMyA2Ni4zODE5QzQ5LjQ2NTkgNjYuNzg1NSA1MC4wMDYgNjYuOTg4MiA1MC43MjI0IDY2Ljk4ODJWNjYuOTg5MloiIGZpbGw9IiM3MjcyNzIiLz4NCjxwYXRoIGQ9Ik01Ni43MDIxIDY4LjUzMVY2MC42NjE0SDU4LjA4ODNMNTguNDQ2NSA2MS44MjU5QzU4LjcyNjMgNjEuNDI3IDU5LjA0ODIgNjEuMTAxNyA1OS40MTIgNjAuODQ5OUM1OS43NzQ4IDYwLjU5ODIgNjAuMTkwOSA2MC40NDY0IDYwLjY1NzMgNjAuMzkzNkM2MC44MjMzIDYwLjM3MjggNjEuMDEyNyA2MC4zNyA2MS4yMjU0IDYwLjM4NkM2MS40MzgxIDYwLjQwMjEgNjEuNjExNiA2MC40MzAzIDYxLjc0NjggNjAuNDcyOFY2Mi41NUM2MS42ODQzIDYyLjUwODUgNjEuNTg4MiA2Mi40NzY1IDYxLjQ1ODYgNjIuNDU1N0M2MS4zMjg5IDYyLjQzNSA2MS4xOTM2IDYyLjQyMTggNjEuMDUzNyA2Mi40MTYxQzYwLjkxMzggNjIuNDExNCA2MC43Nzg1IDYyLjQxMTQgNjAuNjQ4OSA2Mi40MTYxQzYwLjUxOTIgNjIuNDIxOCA2MC40MTc1IDYyLjQzNSA2MC4zNDQ4IDYyLjQ1NTdDNTkuODY3MiA2Mi41ODExIDU5LjQ3MjYgNjIuODU0NiA1OS4xNjIgNjMuMjc0MkM1OC44NTA0IDYzLjY5MzggNTguNjk0NiA2NC4yMDMgNTguNjk0NiA2NC44MDA4VjY4LjUzMUg1Ni43MDEySDU2LjcwMjFaIiBmaWxsPSIjNzI3MjcyIi8+DQo8cGF0aCBkPSJNNzAuNjY4IDYwLjU4MjlWNjguNTMwOEg2OS40Mzc2TDY5LjA0ODYgNjcuNjAyQzY4LjcxNjUgNjcuOTQ4MSA2OC4zMDMzIDY4LjIzNDcgNjcuODEwOCA2OC40NjAxQzY3LjMxNzMgNjguNjg1NCA2Ni43OTEyIDY4Ljc5ODYgNjYuMjMwNiA2OC43OTg2QzY1LjYzOTIgNjguNzk4NiA2NS4wOTkgNjguNjk1OCA2NC42MTEyIDY4LjQ5MjFDNjQuMTIzMyA2OC4yODc1IDYzLjcwODIgNjguMDAxOCA2My4zNjU5IDY3LjYzNDFDNjMuMDIzNSA2Ny4yNjczIDYyLjc1NTggNjYuODIzMiA2Mi41NjM2IDY2LjMwNDZDNjIuMzcxNSA2NS43ODUgNjIuMjc1NCA2NS4yMTY0IDYyLjI3NTQgNjQuNTk2OUM2Mi4yNzU0IDYzLjk3NzQgNjIuMzY4NyA2My40MTE3IDYyLjU1NTIgNjIuODk2OEM2Mi43NDE4IDYyLjM4MjkgNjMuMDAzOSA2MS45Mzk4IDYzLjM0MTYgNjEuNTY3M0M2My42Nzg0IDYxLjE5NDkgNjQuMDgzMiA2MC45MDYzIDY0LjU1NjEgNjAuNzAxN0M2NS4wMjgyIDYwLjQ5NzEgNjUuNTQ5NiA2MC4zOTUzIDY2LjEyMTQgNjAuMzk1M0M2Ni4yOTc3IDYwLjM5NTMgNjYuNDk1NSA2MC40MTYgNjYuNzEyOCA2MC40NTg0QzY2LjkzMTEgNjAuNTAwOSA2Ny4xNDU3IDYwLjU2MTIgNjcuMzU5MyA2MC42Mzk1QzY3LjU3MiA2MC43MTc3IDY3Ljc3NDQgNjAuODE0OSA2Ny45NjY1IDYwLjkzMDhDNjguMTU4NyA2MS4wNDY4IDY4LjMxNzMgNjEuMTgyNiA2OC40NDE0IDYxLjM0MDFINjguNTY2NFY2MC41ODQ4SDcwLjY2OFY2MC41ODI5Wk02Ni4zNzA1IDY2Ljk4ODJDNjcuMTE3NyA2Ni45ODgyIDY3LjY4MzkgNjYuNzgwNyA2OC4wNjczIDY2LjM2NjhDNjguNDUxNiA2NS45NTI4IDY4LjY0MzggNjUuMzY3MyA2OC42NDM4IDY0LjYxMkM2OC42NDM4IDYzLjg1NjcgNjguNDQ4OCA2My4yNjY1IDY4LjA1OTggNjIuODQxMkM2Ny42NzA4IDYyLjQxNTkgNjcuMTA3NCA2Mi4yMDM4IDY2LjM3MDUgNjIuMjAzOEM2NS43MTY2IDYyLjIwMzggNjUuMjA4MiA2Mi40MTU5IDY0Ljg0NDQgNjIuODQxMkM2NC40ODA2IDYzLjI2NjUgNjQuMjk5NiA2My44NTY3IDY0LjI5OTYgNjQuNjEyQzY0LjI5OTYgNjUuMzY3MyA2NC40ODE1IDY1Ljk1MjggNjQuODQ0NCA2Ni4zNjY4QzY1LjIwNzMgNjYuNzgxNyA2NS43MTY2IDY2Ljk4ODIgNjYuMzcwNSA2Ni45ODgyWiIgZmlsbD0iIzcyNzI3MiIvPg0KPHBhdGggZD0iTTc2Ljk4OTQgNjAuMzc4NUM3Ny40NzczIDYwLjM3ODUgNzcuOTMxNSA2MC40NTk2IDc4LjM1MTMgNjAuNjIyN0M3OC43NzIgNjAuNzg1OCA3OS4xMzQ5IDYxLjAxNTkgNzkuNDQwOSA2MS4zMTQ4Qzc5Ljc0NjggNjEuNjEzNyA3OS45ODU2IDYxLjk3MTEgODAuMTU3MyA2Mi4zODVDODAuMzI4OSA2Mi43OTk5IDgwLjQxMzggNjMuMjYzOCA4MC40MTM4IDYzLjc3NzdWNjguNTMxSDc4LjQyMTNWNjQuMzI4NEM3OC40MjEzIDYzLjU3MzEgNzguMjU5OSA2My4wMTk2IDc3LjkzOSA2Mi42Njc5Qzc3LjYxNzIgNjIuMzE2MiA3Ny4xOTE4IDYyLjE0MDggNzYuNjYyIDYyLjE0MDhDNzYuMTMyMSA2Mi4xNDA4IDc1LjcwOTYgNjIuMzI0NyA3NS4zNjE2IDYyLjY5MTVDNzUuMDEzNyA2My4wNTkyIDc0Ljg0MDIgNjMuNjA5OSA3NC44NDAyIDY0LjM0NDRWNjguNTMxSDcyLjg0NzdWNjAuNjYxNEg3NC4wOTNMNzQuNDgyIDYxLjYyMTNDNzQuNzgzMyA2MS4xNDg5IDc1LjEzODcgNjAuODIzNiA3NS41NDgyIDYwLjY0NTRDNzUuOTU3NyA2MC40NjcxIDc2LjQzODEgNjAuMzc3NiA3Ni45ODg1IDYwLjM3NzZMNzYuOTg5NCA2MC4zNzg1WiIgZmlsbD0iIzcyNzI3MiIvPg0KPHBhdGggZD0iTTkwLjM5NSA2MC42NjExVjY4LjIzMTlDOTAuMzk1IDY4LjgxOTMgOTAuMjkxNSA2OS4zNDY0IDkwLjA4MzUgNjkuODEzMUM4OS44NzU1IDcwLjI3OTkgODkuNTkyOCA3MC42NzEyIDg5LjIzNDYgNzAuOTg2MUM4OC44NzY0IDcxLjMwMTEgODguNDU1NyA3MS41NDI1IDg3Ljk3MzQgNzEuNzEwM0M4Ny40OTEyIDcxLjg3ODEgODYuOTY4OCA3MS45NTY0IDg2LjQwOTEgNzEuOTQ2Qzg2LjEzODYgNzEuOTQ2IDg1LjgzNTQgNzEuOTMgODUuNDk4NiA3MS44OTg5Qzg1LjE2MSA3MS44Njc4IDg0LjgwMjggNzEuNzk4OSA4NC40MjQgNzEuNjk0M0M4NC4wNDUzIDcxLjU4OTYgODMuNjU4MiA3MS40Mzk3IDgzLjI2NDUgNzEuMjQ1NEM4Mi44Njk5IDcxLjA1MTIgODIuNDg1NiA3MC43ODYyIDgyLjExMjUgNzAuNDUwNUw4My4yNjQ1IDY5LjAxODJDODMuNTc2MSA2OS4yNyA4My44ODQ5IDY5LjQ2OSA4NC4xOTA4IDY5LjYxNjFDODQuNDk2OCA2OS43NjMyIDg0Ljc4NSA2OS44NzU0IDg1LjA1NDYgNjkuOTU0NkM4NS4zMjQyIDcwLjAzMjggODUuNTcwNSA3MC4wODU2IDg1Ljc5NDMgNzAuMTEyQzg2LjAxNzMgNzAuMTM4NCA4Ni4yMDIgNzAuMTUxNiA4Ni4zNDY2IDcwLjE1MTZDODYuNjc4NyA3MC4xNTE2IDg2Ljk3NzIgNzAuMTA0NSA4Ny4yNDIxIDcwLjAxMDJDODcuNTA3IDY5LjkxNTkgODcuNzMyOCA2OS43NjYgODcuOTE5MyA2OS41NjE0Qzg4LjEwNTkgNjkuMzU2OCA4OC4yNTE0IDY5LjA5NDYgODguMzU0OSA2OC43NzRDODguNDU4NSA2OC40NTQ0IDg4LjUxMDcgNjguMDU4NCA4OC41MTA3IDY3LjU4NkM4OC4zNzU1IDY3Ljc1MzggODguMjE1IDY3LjkwMzcgODguMDI4NSA2OC4wMzQ4Qzg3Ljg0MTkgNjguMTY1OCA4Ny42NDQxIDY4LjI3NjIgODcuNDM3IDY4LjM2NTdDODcuMjI5IDY4LjQ1NTMgODcuMDE5MSA2OC41MjMyIDg2LjgwNjUgNjguNTcwNEM4Ni41OTM4IDY4LjYxNzUgODYuMzk0MiA2OC42NDExIDg2LjIwNjcgNjguNjQxMUM4NS41ODM1IDY4LjY0MTEgODUuMDE4MiA2OC41NDg3IDg0LjUwOTkgNjguMzY1N0M4NC4wMDE1IDY4LjE4MTkgODMuNTY3NyA2Ny45MTY5IDgzLjIwOTUgNjcuNTcwOUM4Mi44NTEzIDY3LjIyNDggODIuNTc2MSA2Ni44MDI0IDgyLjM4MzkgNjYuMzAzNkM4Mi4xOTE4IDY1LjgwNTcgODIuMDk1NyA2NS4yMzYyIDgyLjA5NTcgNjQuNTk1OUM4Mi4wOTU3IDYzLjk1NTcgODIuMTk0NiA2My4zNzU4IDgyLjM5MTQgNjIuODU3MkM4Mi41ODgyIDYyLjMzNzYgODIuODY2MiA2MS44OTczIDgzLjIyNDQgNjEuNTM1MkM4My41ODI2IDYxLjE3MzEgODQuMDEzNiA2MC44OTIxIDg0LjUxNjQgNjAuNjkzMkM4NS4wMjAxIDYwLjQ5NDIgODUuNTgyNiA2MC4zOTQzIDg2LjIwNTcgNjAuMzk0M0M4Ni43MTQxIDYwLjM5NDMgODcuMTg0MyA2MC41MTIyIDg3LjYxNTIgNjAuNzQ4OEM4OC4wNDYyIDYwLjk4NDYgODguNDI3NyA2MS4yNTk5IDg4Ljc1OTggNjEuNTc0OEw4OS4xNDg4IDYwLjY2MjFIOTAuMzk0MUw5MC4zOTUgNjAuNjYxMVpNODYuMjg1IDY2Ljc5OTZDODYuOTM4OSA2Ni43OTk2IDg3LjQ0NzMgNjYuNjA4MSA4Ny44MTExIDY2LjIyNTNDODguMTc0IDY1Ljg0MjUgODguMzU1OSA2NS4yODMzIDg4LjM1NTkgNjQuNTQ4OEM4OC4zNTU5IDYzLjgxNDMgODguMTYzNyA2My4yMjQgODcuNzc5NCA2Mi44NDEyQzg3LjM5NTEgNjIuNDU4MyA4Ni44OTIzIDYyLjI2NjkgODYuMjY5MiA2Mi4yNjY5Qzg1LjUzMjIgNjIuMjY2OSA4NC45OTIxIDYyLjQ3NDQgODQuNjQ5OCA2Mi44ODgzQzg0LjMwNzQgNjMuMzAzMiA4NC4xMzU4IDYzLjg1NjcgODQuMTM1OCA2NC41NDg4Qzg0LjEzNTggNjUuMjQwOSA4NC4zMTIxIDY1LjgwMjkgODQuNjY1NiA2Ni4yMDE3Qzg1LjAxODIgNjYuNjAwNiA4NS41NTgzIDY2Ljc5OTYgODYuMjg1IDY2Ljc5OTZaIiBmaWxsPSIjNzI3MjcyIi8+DQo8cGF0aCBkPSJNOTYuMjMzNSA2Ny4wOTg1Qzk2Ljc0MTkgNjcuMDg4MSA5Ny4yMTIxIDY3LjAwMTMgOTcuNjQzIDY2LjgzOTJDOTguMDc0IDY2LjY3NyA5OC40NTU1IDY2LjM5MDMgOTguNzg3NiA2NS45ODExTDk5Ljk3MDQgNjcuMjI1OEM5OS40NDA2IDY3Ljc5ODEgOTguODYyMiA2OC4yMDI2IDk4LjIzNDQgNjguNDQxMkM5Ny42MDY3IDY4LjY3ODggOTYuOTY1OCA2OC43OTg1IDk2LjMxMTkgNjguNzk4NUM5NS42NTggNjguNzk4NSA5NS4wNzQgNjguNzAxNCA5NC41NjAxIDY4LjUwNzJDOTQuMDQ2MSA2OC4zMTI5IDkzLjYxMDQgNjguMDM3NiA5My4yNTIyIDY3LjY4MTJDOTIuODk0IDY3LjMyNDggOTIuNjIxNiA2Ni44OTM4IDkyLjQzNTEgNjYuMzkwM0M5Mi4yNDg1IDY1Ljg4NjggOTIuMTU0MyA2NS4zMjU4IDkyLjE1NDMgNjQuNzA2M0M5Mi4xNTQzIDY0LjA4NjggOTIuMjQ0OCA2My40OTc0IDkyLjQyNjcgNjIuOTY3NUM5Mi42MDg2IDYyLjQzNzYgOTIuODcwNyA2MS45ODEyIDkzLjIxMzEgNjEuNTk4NEM5My41NTU0IDYxLjIxNTYgOTMuOTczMyA2MC45MTk1IDk0LjQ2NjggNjAuNzA5MkM5NC45NTkzIDYwLjQ5OSA5NS41MTgxIDYwLjM5NDMgOTYuMTQwMyA2MC4zOTQzQzk2LjcxMTEgNjAuMzk0MyA5Ny4yMzI2IDYwLjQ4MzkgOTcuNzA1NSA2MC42NjIxQzk4LjE3NzUgNjAuODQwMyA5OC41ODUyIDYxLjEwMDUgOTguOTI3NSA2MS40NDA5Qzk5LjI2OTkgNjEuNzgyMyA5OS41MzQ4IDYyLjE5NjIgOTkuNzIxNCA2Mi42ODQ2Qzk5LjkwNzkgNjMuMTcyMSAxMDAuMDAxIDYzLjcyNTYgMTAwLjAwMSA2NC4zNDUxQzEwMC4wMDEgNjQuNDkyMiA5OS45OTU2IDY0LjYzOTMgOTkuOTg1NCA2NC43ODU1Qzk5Ljk3NTEgNjQuOTMyNiA5OS45NTkyIDY1LjA3OTcgOTkuOTM4NyA2NS4yMjU4SDk0LjE2MjdDOTQuMTgzMiA2NS40OTY0IDk0LjI1MzIgNjUuNzQ4MiA5NC4zNzI2IDY1Ljk4M0M5NC40OTIgNjYuMjE2OCA5NC42NDc3IDY2LjQxNzcgOTQuODM5OSA2Ni41ODM2Qzk1LjAzMjEgNjYuNzUwNSA5NS4yNDc1IDY2Ljg3NzggOTUuNDg2MyA2Ni45NjY1Qzk1LjcyNTEgNjcuMDU1MSA5NS45NzQyIDY3LjA5OTQgOTYuMjMzNSA2Ny4wOTk0VjY3LjA5ODVaTTk2LjEyNDQgNjIuMDkzNEM5NS41NTM1IDYyLjA5MzQgOTUuMDk2NCA2Mi4yNDQzIDk0Ljc1NDEgNjIuNTQ2Qzk0LjQxMTcgNjIuODQ3OCA5NC4yMTQgNjMuMjc4NyA5NC4xNjI3IDYzLjg0MDdIOTguMDcwM0M5OC4wMzk1IDYzLjMwMDQgOTcuODU0OCA2Mi44NzQyIDk3LjUxOCA2Mi41NjIxQzk3LjE4MDQgNjIuMjUgOTYuNzE1OCA2Mi4wOTQ0IDk2LjEyNDQgNjIuMDk0NFY2Mi4wOTM0WiIgZmlsbD0iIzcyNzI3MiIvPg0KPHBhdGggZD0iTTMxLjgzNzEgNjAuODc5NkMzMi4xNzQ4IDYwLjUzODMgMzIuMDM3OCA1OS44NDYzIDMxLjUzMSA1OS4zMzQxQzMxLjAyNDMgNTguODIxOSAzMC4zMzk4IDU4LjY4MzQgMzAuMDAyMSA1OS4wMjQ3QzI5LjY2NDQgNTkuMzY2MSAyOS44MDE0IDYwLjA1ODEgMzAuMzA4MSA2MC41NzAzQzMwLjgxNDkgNjEuMDgyNSAzMS40OTk0IDYxLjIyMSAzMS44MzcxIDYwLjg3OTZaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNNDAuODM1MSA2OS45NzUxQzQxLjE3MjggNjkuNjMzNyA0MS4wMzU4IDY4Ljk0MTggNDAuNTI5MSA2OC40Mjk2QzQwLjAyMjQgNjcuOTE3NCAzOS4zMzc4IDY3Ljc3ODkgMzkuMDAwMSA2OC4xMjAyQzM4LjY2MjQgNjguNDYxNiAzOC43OTk1IDY5LjE1MzUgMzkuMzA2MiA2OS42NjU3QzM5LjgxMjkgNzAuMTc3OSA0MC40OTc1IDcwLjMxNjQgNDAuODM1MSA2OS45NzUxWiIgZmlsbD0iI0YzNzMyMSIvPg0KPHBhdGggZD0iTTMwLjUyNTQgNjMuMTc1MkMzMC42NDkgNjIuNzA4OSAzMC4xODgxIDYyLjE3ODkgMjkuNDk1OSA2MS45OTE0QzI4LjgwMzcgNjEuODA0IDI4LjE0MjMgNjIuMDMgMjguMDE4NyA2Mi40OTYzQzI3Ljg5NTEgNjIuOTYyNiAyOC4zNTYxIDYzLjQ5MjYgMjkuMDQ4MyA2My42OEMyOS43NDA1IDYzLjg2NzUgMzAuNDAxOCA2My42NDE1IDMwLjUyNTQgNjMuMTc1MloiIGZpbGw9IiNGMzczMjEiLz4NCjxwYXRoIGQ9Ik00Mi44MTY0IDY2LjUwNDZDNDIuOTQgNjYuMDM4MyA0Mi40NzkxIDY1LjUwODMgNDEuNzg2OSA2NS4zMjA4QzQxLjA5NDcgNjUuMTMzMyA0MC40MzM0IDY1LjM1OTMgNDAuMzA5NyA2NS44MjU2QzQwLjE4NjEgNjYuMjkxOSA0MC42NDcxIDY2LjgyMTkgNDEuMzM5MyA2Ny4wMDk0QzQyLjAzMTUgNjcuMTk2OSA0Mi42OTI4IDY2Ljk3MDggNDIuODE2NCA2Ni41MDQ2WiIgZmlsbD0iI0YzNzMyMSIvPg0KPHBhdGggZD0iTTI5LjQ5NTkgNjcuMDA5MUMzMC4xODgxIDY2LjgyMTYgMzAuNjQ5IDY2LjI5MTYgMzAuNTI1NCA2NS44MjUzQzMwLjQwMTggNjUuMzU5IDI5Ljc0MDUgNjUuMTMzIDI5LjA0ODMgNjUuMzIwNEMyOC4zNTYxIDY1LjUwNzkgMjcuODk1MSA2Ni4wMzc5IDI4LjAxODcgNjYuNTA0MkMyOC4xNDIzIDY2Ljk3MDUgMjguODAzNyA2Ny4xOTY1IDI5LjQ5NTkgNjcuMDA5MVoiIGZpbGw9IiNGMzczMjEiLz4NCjxwYXRoIGQ9Ik00MS43ODg5IDYzLjY3OTVDNDIuNDgxMSA2My40OTIgNDIuOTQyIDYyLjk2MiA0Mi44MTg0IDYyLjQ5NTdDNDIuNjk0OCA2Mi4wMjk0IDQyLjAzMzQgNjEuODAzNCA0MS4zNDEyIDYxLjk5MDlDNDAuNjQ5IDYyLjE3ODMgNDAuMTg4MSA2Mi43MDgzIDQwLjMxMTcgNjMuMTc0NkM0MC40MzUzIDYzLjY0MDkgNDEuMDk2NiA2My44NjY5IDQxLjc4ODkgNjMuNjc5NVoiIGZpbGw9IiNGMzczMjEiLz4NCjxwYXRoIGQ9Ik0zMS41MzEgNjkuNjY1NUMzMi4wMzc4IDY5LjE1MzMgMzIuMTc0OCA2OC40NjEzIDMxLjgzNzEgNjguMTJDMzEuNDk5NCA2Ny43Nzg2IDMwLjgxNDkgNjcuOTE3MiAzMC4zMDgxIDY4LjQyOTRDMjkuODAxNCA2OC45NDE2IDI5LjY2NDQgNjkuNjMzNSAzMC4wMDIxIDY5Ljk3NDlDMzAuMzM5OCA3MC4zMTYyIDMxLjAyNDMgNzAuMTc3NyAzMS41MzEgNjkuNjY1NVoiIGZpbGw9IiNGMzczMjEiLz4NCjxwYXRoIGQ9Ik00MC41MjkxIDYwLjU3MDVDNDEuMDM1OCA2MC4wNTgzIDQxLjE3MjggNTkuMzY2NCA0MC44MzUxIDU5LjAyNUM0MC40OTc1IDU4LjY4MzcgMzkuODEyOSA1OC44MjIyIDM5LjMwNjIgNTkuMzM0NEMzOC43OTk1IDU5Ljg0NjYgMzguNjYyNCA2MC41Mzg2IDM5LjAwMDEgNjAuODc5OUMzOS4zMzc4IDYxLjIyMTMgNDAuMDIyNCA2MS4wODI4IDQwLjUyOTEgNjAuNTcwNVoiIGZpbGw9IiNGMzczMjEiLz4NCjxwYXRoIGQ9Ik0zNC42MDYgNzAuOTM4N0MzNC43OTE0IDcwLjIzOSAzNC41Njc4IDY5LjU3MDUgMzQuMTA2NSA2OS40NDU2QzMzLjY0NTIgNjkuMzIwNiAzMy4xMjA5IDY5Ljc4NjYgMzIuOTM1NCA3MC40ODYzQzMyLjc1IDcxLjE4NiAzMi45NzM2IDcxLjg1NDUgMzMuNDM0OSA3MS45Nzk0QzMzLjg5NjIgNzIuMTA0MyAzNC40MjA1IDcxLjYzODQgMzQuNjA2IDcwLjkzODdaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzcuOTAwOSA1OC41MTM3QzM4LjA4NjQgNTcuODE0IDM3Ljg2MjggNTcuMTQ1NSAzNy40MDE1IDU3LjAyMDVDMzYuOTQwMiA1Ni44OTU2IDM2LjQxNTggNTcuMzYxNSAzNi4yMzA0IDU4LjA2MTJDMzYuMDQ0OSA1OC43NjA5IDM2LjI2ODUgNTkuNDI5NCAzNi43Mjk4IDU5LjU1NDRDMzcuMTkxMSA1OS42NzkzIDM3LjcxNTQgNTkuMjEzNCAzNy45MDA5IDU4LjUxMzdaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzcuNDAxNSA3MS45Nzg5QzM3Ljg2MjggNzEuODUzOSAzOC4wODY0IDcxLjE4NTQgMzcuOTAwOSA3MC40ODU3QzM3LjcxNTQgNjkuNzg2IDM3LjE5MTEgNjkuMzIwMSAzNi43Mjk4IDY5LjQ0NUMzNi4yNjg1IDY5LjU3IDM2LjA0NDkgNzAuMjM4NSAzNi4yMzA0IDcwLjkzODJDMzYuNDE1OCA3MS42Mzc5IDM2Ljk0MDIgNzIuMTAzOCAzNy40MDE1IDcxLjk3ODlaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzQuMTA4NSA1OS41NTM5QzM0LjU2OTggNTkuNDI5IDM0Ljc5MzQgNTguNzYwNSAzNC42MDc5IDU4LjA2MDhDMzQuNDIyNCA1Ny4zNjExIDMzLjg5ODEgNTYuODk1MiAzMy40MzY4IDU3LjAyMDFDMzIuOTc1NSA1Ny4xNDUxIDMyLjc1MTkgNTcuODEzNiAzMi45Mzc0IDU4LjUxMzNDMzMuMTIyOSA1OS4yMTI5IDMzLjY0NzIgNTkuNjc4OSAzNC4xMDg1IDU5LjU1MzlaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzIuMjM3IDY1LjM3NEMzMi45NTM2IDY1LjM3NCAzMy41MzQ2IDY0Ljk4MjcgMzMuNTM0NiA2NC40OTk5QzMzLjUzNDYgNjQuMDE3MiAzMi45NTM2IDYzLjYyNTkgMzIuMjM3IDYzLjYyNTlDMzEuNTIwNCA2My42MjU5IDMwLjkzOTUgNjQuMDE3MiAzMC45Mzk1IDY0LjQ5OTlDMzAuOTM5NSA2NC45ODI3IDMxLjUyMDQgNjUuMzc0IDMyLjIzNyA2NS4zNzRaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzguNjAwMyA2NS4zNzRDMzkuMzE2OSA2NS4zNzQgMzkuODk3OSA2NC45ODI3IDM5Ljg5NzkgNjQuNDk5OUMzOS44OTc5IDY0LjAxNzIgMzkuMzE2OSA2My42MjU5IDM4LjYwMDMgNjMuNjI1OUMzNy44ODM3IDYzLjYyNTkgMzcuMzAyNyA2NC4wMTcyIDM3LjMwMjcgNjQuNDk5OUMzNy4zMDI3IDY0Ljk4MjcgMzcuODgzNyA2NS4zNzQgMzguNjAwMyA2NS4zNzRaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzQuNTc2MiA2Ny43MjExQzM0LjkzNDUgNjcuMDkzOCAzNC44ODk3IDY2LjM4OTYgMzQuNDc2MSA2Ni4xNDgyQzM0LjA2MjUgNjUuOTA2OCAzMy40MzY4IDY2LjIxOTcgMzMuMDc4NSA2Ni44NDdDMzIuNzIwMiA2Ny40NzQ0IDMyLjc2NSA2OC4xNzg2IDMzLjE3ODYgNjguNDJDMzMuNTkyMiA2OC42NjEzIDM0LjIxNzkgNjguMzQ4NCAzNC41NzYyIDY3LjcyMTFaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzcuNzU3OSA2Mi4xNTE3QzM4LjExNjIgNjEuNTI0MyAzOC4wNzE0IDYwLjgyMDEgMzcuNjU3OCA2MC41Nzg3QzM3LjI0NDIgNjAuMzM3NCAzNi42MTg0IDYwLjY1MDIgMzYuMjYwMSA2MS4yNzc2QzM1LjkwMTggNjEuOTA0OSAzNS45NDY2IDYyLjYwOTEgMzYuMzYwMiA2Mi44NTA1QzM2Ljc3MzggNjMuMDkxOSAzNy4zOTk1IDYyLjc3OSAzNy43NTc5IDYyLjE1MTdaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzcuNjU3OCA2OC40MjA1QzM4LjA3MTQgNjguMTc5MiAzOC4xMTYyIDY3LjQ3NDkgMzcuNzU3OSA2Ni44NDc2QzM3LjM5OTUgNjYuMjIwMyAzNi43NzM4IDY1LjkwNzQgMzYuMzYwMiA2Ni4xNDg4QzM1Ljk0NjYgNjYuMzkwMSAzNS45MDE4IDY3LjA5NDQgMzYuMjYwMSA2Ny43MjE3QzM2LjYxODQgNjguMzQ5IDM3LjI0NDIgNjguNjYxOSAzNy42NTc4IDY4LjQyMDVaIiBmaWxsPSIjRjM3MzIxIi8+DQo8cGF0aCBkPSJNMzQuNDc2MSA2Mi44NTAxQzM0Ljg4OTcgNjIuNjA4NyAzNC45MzQ1IDYxLjkwNDUgMzQuNTc2MiA2MS4yNzcyQzM0LjIxNzkgNjAuNjQ5OCAzMy41OTIyIDYwLjMzNyAzMy4xNzg2IDYwLjU3ODNDMzIuNzY1IDYwLjgxOTcgMzIuNzIwMiA2MS41MjM5IDMzLjA3ODUgNjIuMTUxM0MzMy40MzY4IDYyLjc3ODYgMzQuMDYyNSA2My4wOTE1IDM0LjQ3NjEgNjIuODUwMVoiIGZpbGw9IiNGMzczMjEiLz4NCjwvZz4NCjxkZWZzPg0KPGNsaXBQYXRoIGlkPSJjbGlwMF8yNDg2Xzc1NDIiPg0KPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjE1IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjggNTcpIi8+DQo8L2NsaXBQYXRoPg0KPC9kZWZzPg0KPC9zdmc+DQo=";
////
////		}
////	}
////},true);