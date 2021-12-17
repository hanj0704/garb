/************************************************
 * moveTab.module.js
 * Created at 2020. 9. 14. 오후 3:29:13.
 *
 * @author daye
 * 
 * [ 수정사항 ]
 * - Drop 시 영역을 벗어났을 때, 타겟스타일이 삭제되도록 수정되었습니다. (2020.09.16)
 * - 타겟영역을 border 가 아닌 backgroud-color 색상으로 변경되었습니다. 타겟 아이템의 뒤로 탭아이템이 이동하도록 수정되었습니다. (2020.09.16)
 * 
 ************************************************/

/*
 * 본 모듈은 탭 아이템을 이동 할 수 있는 모듈입니다.
 * 탭폴더(또는 MDI 폴더)의 사용자속성(tabMovable=true)을 설정하면 모듈에서 제공하는 기능을 사용 할 수 있습니다.
 */

/************************************************
 * 전역변수
 ************************************************/
/**
 * 이전 타겟이였던 탭아이템
 */
var moPrevTargetItem = null;



/************************************************
 * 이벤트 필터
 ************************************************/
cpr.events.EventBus.INSTANCE.addFilter("load", fn_load);

function fn_load(e) {
	var control = e.control;
	
	if(control instanceof cpr.core.AppInstance) {
		var container = control.getContainer();
		var vaTabFolder = container.getAllRecursiveChildren().filter(function(each){
			return each.userAttr("tab-movable")=="true";
		});
		
		vaTabFolder.forEach(function(ctrl){
			_setDragSource(control, ctrl);
			_setDropTarget(control, ctrl);
		});
	}
}

/**
 * 드래그 중인 걸 표시하기 위한 컨트롤 생성
 * @param {cpr.controls.UIControl} pcDragCtrl
 * @param {cpr.controls.TabItem item
 */
function _createDragSourceFeedback(pcDragCtrl, item) {

	var feedback = new cpr.controls.Output();
	var voItemEl = document.getElementById("uuid-"+pcDragCtrl.uuid).querySelectorAll(".cl-tabfolder-item").item(item.itemIndex); 
	var voStyle = getComputedStyle(voItemEl); 
	
	/* 현재의 탭 스타일과 동일하게 적용 */
	// TODO 탭스타일 또는 클래스를 적용하십시오.
//	feedback.style.css({
////		"opacity" : "0.7",
//		"width" : voStyle.width,
//		"background": voStyle.background,
//		"border-top" : voStyle.borderTop,
//		"border-left" : voStyle.borderLeft,
//		"border-right" : voStyle.borderRight,
//		"border-bottom" : voStyle.borderBottom,
//		"color": voStyle.color,
//		"font" : voStyle.font,
//		"overflow" : voStyle.overflow,
//		"padding" : voStyle.padding,
//		"text-align": voStyle.textAlign,
//	});
	
	feedback.style.css({
		"opacity": "0.8",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});

//	feedback.style.addClass("className");

	feedback.userAttr("drag", "true");

	return feedback;
}

/**
 * 드래그 소스 설정
 * @param {cpr.core.AppInstance} app
 * @param {cpr.controls.UIControl} pcDragCtrl
 */
function _setDragSource(app, pcDragCtrl) {

	var feedback = null;
	
	var dragSource = new cpr.controls.DragSource(pcDragCtrl, {
		options: {
			dataType: "text",
			threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
		},
		onDragStart: function(context) {
			if(context.sourceTargetObject != null && context.sourceTargetObject.item instanceof cpr.controls.TabItem) {
				var voTabItem = context.sourceTargetObject.item;
				
				context.cursor = "grabbing";
				context.data = voTabItem;
				
				feedback = _createDragSourceFeedback(pcDragCtrl, voTabItem);
				feedback.value = voTabItem.text;
				
				var voItemRect = voTabItem.getActualRect();	
				
				var vnDrgStartLocation = context.dragStartLocation;
				if(voItemRect.top > vnDrgStartLocation.y || (voItemRect.top + voItemRect.height) < vnDrgStartLocation.y) {
					context.cancel();
				} else {
					var newRect =cpr.controls.layouts.XYLayout.createConstraintWithRect(voItemRect);
					app.getRootAppInstance().floatControl(feedback, newRect);
				}
			} else {
				context.cancel();
			}
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			
			/* 탭아이템 영역 안에서만 드래그가 가능하도록 rect 설정 */
			var voActuralRect = context.data.getActualRect();
			var voTraslateRect = voActuralRect.getTranslatedByDimension(context.dragDelta);
			var newRect = new cpr.geometry.Rectangle(voTraslateRect.left, voActuralRect.top, voTraslateRect.width, voTraslateRect.height);
			
			app.getRootAppInstance().floatControl(feedback, newRect);
		},
		onDragEnd: function(context) {
			context.cursor = "";
			feedback.dispose();
			feedback = null;
			
			/* 포커스 스타일 제거 */
			if(moPrevTargetItem) {
//				moPrevTargetItem.style.border = "0px";
				moPrevTargetItem.style.backgroundColor = "white";
				moPrevTargetItem = null;
			}
		}
	});
}



/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {cpr.controls.UIControl} pcDropCtrl
 */
function _setDropTarget(app, pcDropCtrl) {
	
//	var vaTargetItems = document.getElementById("uuid-"+pcDropCtrl.uuid).querySelectorAll(".cl-tabfolder-item");	
//	var voTargetEl = null;
//	var feedback = null;
	
	var dropTarget = new cpr.controls.DropTarget(pcDropCtrl, {
		isImportant: function(source) {
			return source.dataType == "text";
		},
		onDragEnter: function(context) {
//			feedback = app.getFloatingControls().filter(function(each){
//				return each.userAttr("drag") == "true";
//			})[0];
		},
		onDragLeave: function(context) {
			
		},
		onDragMove: function(context) {
			
//			if(context.targetItem instanceof cpr.controls.TabItem) {
//				var voTargetItem = context.targetItem;
//				vnTargetIndex = voTargetItem.itemIndex;
//				voTargetEl = vaTargetItems.item(vnTargetIndex);
//			}
//			
//			if(feedback) {
//
//				var vnTabSpacing = context.target.control.itemSpacing;
//				var voFeedbackRect = feedback.getActualRect();
//				
////				voNewTab.visible = true;
//				pcDropCtrl.insertTabItem(vnTargetIndex, voNewTab);
//			}
			
			context.cursor = context.targetItem ? "grabbing" : "no-drop";
			if(context.targetItem instanceof cpr.controls.TabItem && context.source.control.id == context.target.control.id) {
				var voTargetItem = context.targetItem;

				if (moPrevTargetItem) {
					moPrevTargetItem.classList.remove("mv-left");
					moPrevTargetItem.classList.remove("mv-right");
//					moPrevTargetItem.style.border = "0px";
					moPrevTargetItem.style.backgroundColor = "white";
				}

				var voTargetEl = document.getElementById("uuid-"+pcDropCtrl.uuid).querySelectorAll(".cl-tabfolder-item").item(voTargetItem.itemIndex);
				if(voTargetEl) {
					
					var voItemRect = voTargetItem.getActualRect();
					var vnTabSpacing = context.target.control.itemSpacing;
					var vnDragDeltaX = context.dragStartLocation.x + context.dragDelta.width;
					
					if(vnDragDeltaX  <= (voItemRect.left + parseInt(voItemRect.width)/2 )) { // background-color : rgba(255, 0, 0,0.3);
						voTargetEl.setAttribute("style", voTargetEl.style.cssText + "background-color: rgba(255, 0, 0,0.3);");
						voTargetEl.classList.add("mv-left");
					} else {
						voTargetEl = document.getElementById("uuid-"+pcDropCtrl.uuid).querySelectorAll(".cl-tabfolder-item").item(voTargetItem.itemIndex+1);
						if(voTargetEl) {
							voTargetEl.setAttribute("style", voTargetEl.style.cssText + "background-color: rgba(255, 0, 0,0.3);");
							voTargetEl.classList.add("mv-right");
						}
					}

					moPrevTargetItem = voTargetEl;
				}
				
			}

			
		},
		onDrop: function(context) {
			
			/** @type cpr.controls.TabFolder */
			var vcTabfolder = context.source.control;

//			if(context.targetItem instanceof cpr.controls.TabItem) {
			if(moPrevTargetItem) {
				
				/* 탭아이템 이동 */
				var vbDirection = moPrevTargetItem.classList.contains("mv-right") ? true : false;
				var vnMvIndex = _.values(document.getElementById("uuid-"+pcDropCtrl.uuid).querySelectorAll(".cl-tabfolder-item")).indexOf(moPrevTargetItem);
				vcTabfolder.removeTabItem(context.data);
				vcTabfolder.insertTabItem(vnMvIndex, context.data);
			}
		}
	});
}

