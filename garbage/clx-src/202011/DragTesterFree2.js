/************************************************
 * tester.js
 * Created at 2019. 12. 2. 오후 5:46:02.
 *
 * @author HANS
 ************************************************/
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	setDragSource(app.lookup("grd1"));
//	setDropTarget(app.lookup("grd1"));
}

function createDragSourceFeedback() {
	var feedback = new cpr.controls.Output();
	feedback.ellipsis = true;
	feedback.style.css({
		"opacity": "0.8",
		"width": "50px",
		"height": "25px",
		"border": "solid 1px red",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedback;
}


/**
 * 파라미터의 컨트롤을 드래그 가능하도록 드래그 소스를 지정하는 함수.
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control) {
	var feedback = null;
	var actualRect = null;
	new cpr.controls.DragSource(control, {
		options: {
			dataType: "text",
			threadhold: 10
		},
		onDragStart: function(context) {//dragStart에서 사용중인 context.source.detail이라는 대상은 이후 릴리즈에서 depreacted될 대상으로,context.sourceTargetObject로 대체됩니다.
			
			if (context.sourceTargetObject != null && context.sourceTargetObject.relativeTargetName != "header") {
				context.cursor = "grabbing";
				feedback = createDragSourceFeedback();
				control.style.css("opacity", " 0.5");
				context.data = context.sourceTargetObject;
				feedback.value = JSON.stringify(control.getRow(context.source.detail.rowIndex).getRowData());

				var voDragStartLoca = context.dragStartLocation;
				actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x, voDragStartLoca.y, control.getActualRect().width, 25);
				app.floatControl(feedback, actualRect);
				context.source = null;
			} else {
				context.cancel();
			}
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
			app.floatControl(feedback, newRect);
		},
		onDragEnd: function(context) {
			context.cursor = "";
			feedback.dispose();
			feedback = null;
			control.style.removeStyle("opacity");
		}
	});
}
var voPrevRowElement = null;

/**
 * 파라미터로 받은 컨트롤을 드랍가능한 타겟으로 지정하는 함수.
 * @param {cpr.controls.Grid} control2
 */
function setDropTarget(control2) {

	var dropTarget = new cpr.controls.DropTarget(control2, {
		isImportant: function(source) {
			return source.dataType == "text";
		},
		onDragEnter: function(context) {

		},
		onDragLeave: function(context) {

		},
		onDragMove: function(context) {
			var vaElementsOnMouse = elementsFromPoint(context.pointerLocation.x, context.pointerLocation.y);

			var vaClGridRowEle = vaElementsOnMouse.filter(function( /*HTMLElement*/ each) {
				if (each.classList.contains("cl-grid-row")) {
					return each;
				}
			});
			var voGridRowElement = vaClGridRowEle[0];

			if (voGridRowElement && !voGridRowElement.classList.contains("row-bottom")) {
				if (voGridRowElement != voPrevRowElement && voPrevRowElement) {

					voPrevRowElement.classList.remove("row-bottom");
				}
				voPrevRowElement = voGridRowElement;
				voGridRowElement.classList.add("row-bottom");
			}
		},
		onDrop: function(context) {
				var voDragRowData = context.source.control.getRow(context.data.rowIndex).getRowData()
				var vnDragIndex = context.data.rowIndex;
			if (context.target.detail != null) {
				var vnDropIndex = context.target.detail.rowIndex;
				if (vnDropIndex > vnDragIndex) {
					
					control2.insertRowData(vnDropIndex, true, voDragRowData);
					control2.deleteRow(vnDragIndex);
				} else {
					control2.deleteRow(vnDragIndex);
					control2.insertRowData(vnDropIndex, true, voDragRowData);
				}
			} else {
				var vnInsertIdx = Number(voPrevRowElement.getAttribute("aria-rowindex")) - 1;
				var vbInsertAfter = vnInsertIdx == control2.getRowCount() - 1 ? true : false;
				control2.deleteRow(vnDragIndex);
				control2.insertRowData(vnInsertIdx, vbInsertAfter, voDragRowData);
			}
			voPrevRowElement.classList.remove("row-bottom");
		}
	});
}

/**
 * 마우스 포인터가 위치한 곳 밑에 있는 모든 요소를 가져오는 함수입니다.
 * @param {Number} x
 * @param {Number} y
 * @return {HTMLElement}
 */
function elementsFromPoint(x, y) {
	if (document["msElementsFromPoint"]) {
		var nodeList = document["msElementsFromPoint"](x, y);
		if (!nodeList) {
			return [];
		} else {
			return Array.prototype.slice.call(nodeList);
		}
	} else {
		return (document["elementsFromPoint"](x, y) || []);
	}
}

/*
 * 그리드에서 before-selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트.
 */
function onGrd1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var q = e.newSelection.indexOf(e.oldSelection);
	console.log(e.newSelection);
	console.log(e.oldSelection);
	console.log(q);
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.openDialog("202011/miniGrid", {width : 300, height : 350}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}
