/************************************************
 * Untitled.js
 * Created at 2022. 9. 29. 오전 10:23:31.
 *
 * @author HANS
 ************************************************/

/*
 * "Output" 아웃풋(opt1)에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onOpt1Dblclick(e){
	var opt1 = e.control
	console.log("더블클릭");
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var meta = document.getElementsByName("viewport");
	var item = meta.item(0);
	item.setAttribute("content", "width=1440,user-scalable=no");	
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	app.lookup("opt2").value = navigator.userAgent;
}

var msUa = navigator.userAgent;

var lastTouchEnd = null;

var prevTarget = null;



cpr.events.EventBus.INSTANCE.addFilter("touchstart", function( /*cpr.events.CTouchEvent*/ e) {
			var control = e.control;
			if (control instanceof cpr.controls.Grid) {
				
				var touchs = e.touches;
				if(touchs.length > 1) {
					return;
				}
				var voTouchItem = e.touches.item(0);
				/** @type Array */
				var vaElementsOnMouse = elementsFromPoint(voTouchItem.clientX, voTouchItem.clientY);
				
				var vaClGridRowEle = vaElementsOnMouse.filter(function( /*HTMLElement*/ each) {
					if (each.classList.contains("cl-grid-row")) {
						return each;
					}
				});
				/** @type Element */
				var voGridRowElement = vaClGridRowEle[0];
//				console.log(voGridRowElement);
//				console.log(voGridRowElement.getAttribute("data-rowindex"));
				var vnSelectRow = voGridRowElement.getAttribute("data-rowindex");
				vnSelectRow = Number(vnSelectRow);
				control.selectRows(vnSelectRow);

				var now = moment().valueOf();
				var voEventTarget = e.target;
				if (now - lastTouchEnd <= 300) {
						e.preventDefault();
					if (voEventTarget == prevTarget) {
						var evt = new cpr.events.CMouseEvent("row-dblclick",{
						});
						control.dispatchEvent(evt);
//						var evt2 = new cpr.events.CMouseEvent("click");
//						control.dispatchEvent(evt2);
//						console.log(control);
//						var voTouchItem = e.changedTouches.item(0);
//						/** @type Array */
//						var vaElementsOnMouse = elementsFromPoint(voTouchItem.clientX, voTouchItem.clientY);
//						
//						var vaClGridRowEle = vaElementsOnMouse.filter(function( /*HTMLElement*/ each) {
//							if (each.classList.contains("cl-grid-row")) {
//								return each;
//							}
//						});
//						/** @type Element */
//						var voGridRowElement = vaClGridRowEle[0];
//						console.log(voGridRowElement);
//						console.log(voGridRowElement.getAttribute("data-rowindex"));
//						var vnSelectRow = voGridRowElement.getAttribute("data-rowindex");
//						vnSelectRow = Number(vnSelectRow);
						control.setEditRowIndex(vnSelectRow);
						
						
						var vaCells = vaElementsOnMouse.filter(function(/*HTMLElement*/each){
							if(each.classList.contains("cl-grid-cell")) {
								return each;
							}
						});
						/** @type Element */
						var voGridCellElement = vaCells[0];
						var vnCellIdx = voGridCellElement.getAttribute("data-cellindex");
						vnCellIdx = Number(vnCellIdx);
						console.log(vnCellIdx);
						control.focusCell(vnSelectRow, vnCellIdx);
					}
				}
lastTouchEnd = now;
prevTarget = voEventTarget;
}
});

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
 * 그리드에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGrd1Dblclick(e){
	var grd1 = e.control;
}

/*
 * 그리드에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrd1Click(e){
	var grd1 = e.control;
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrd1RowDblclick(e){
	var grd1 = e.control;
}

