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
	setDropTarget(app.lookup("grd2"));
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
		onDragStart: function(context) {
			console.log(context.sourceTargetObject.relativeTargetName);
			if (context.sourceTargetObject != null && context.sourceTargetObject.relativeTargetName != "header") {

				context.cursor = "grabbing";
				feedback = createDragSourceFeedback();
				control.style.css("opacity", " 0.5");
				context.data = context.sourceTargetObject;
				feedback.value = JSON.stringify(control.getRow(context.sourceTargetObject.rowIndex).getRowData());

				var voDragStartLoca = context.dragStartLocation;
				actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x, voDragStartLoca.y, control.getActualRect().width, 25);
				app.floatControl(feedback, actualRect);
				//cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect)
				context.source = null;
			} else {
				context.cancel();
			}
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
			app.floatControl(feedback, newRect);
			//cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect)
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
 * @param {cpr.controls.UIControl} control2
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
				if (voGridRowElement != voPrevRowElement) {
					if (voPrevRowElement != null) {
						voPrevRowElement.classList.remove("row-bottom");
					}
				} 
					voPrevRowElement = voGridRowElement;
				voGridRowElement.classList.add("row-bottom");
			}

		},
		onDrop: function(context) {

			if (context.target.detail != null) {
				control2.insertRowData(context.target.detail.rowIndex, true, context.source.control.getRow(context.data.rowIndex).getRowData());
			} else {
				var vnInsertIdx = Number(voPrevRowElement.getAttribute("aria-rowindex")) - 1;
				var vbInsertAfter = vnInsertIdx == control2.getRowCount() - 1 ? true : false;
				control2.insertRowData(vnInsertIdx, vbInsertAfter, context.source.control.getRow(context.data.rowIndex).getRowData());
				voPrevRowElement.classList.remove("row-bottom");
			}
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
 * 그리드에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onGrd2Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
	
	console.log("Drop");

}
