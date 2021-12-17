/************************************************
 * hintCheckBox.js
 * Created at 2020. 3. 19. 오후 3:34:34.
 *
 * @author HANS
 ************************************************/
var hints = [];
/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx1ValueChange( /* cpr.events.CValueChangeEvent */ e) {
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx1 = e.control;

	var voHostApp = app.getHostAppInstance();

	if (cbx1.checked) {

		var vcContainer = voHostApp.getContainer();
		vcContainer.getAllRecursiveChildren().forEach(function( /** cpr.controls.UIControl*/ each, idx) {

			if (each instanceof cpr.controls.Grid) {
				var rowHeights = each.header.getRowHeights();
				var rowHeights2 = each.detail.getRowHeights();

				var gridAR = each.getActualRect();

				var topRight = gridAR.topRight;
				var trY = topRight.y;
				var trX = topRight.x;

				var a = rowHeights.concat(rowHeights2);

				var width = 40;
				a.forEach(function(each) {
					if (each.height) {

						var horizontal = new udc.Horizontal();

						horizontal.optValue = each.height;

						app.getContainer().floatControl(horizontal, {
							"width": width + "px",
							"height": each.height + "px",
							"left": topRight.x - width + "px",
							"top": trY + "px"
						});
						trY += each.height;
					}
				});
				var heightHori = new udc.Horizontal();
				heightHori.optValue = gridAR.height;
				app.getContainer().floatControl(heightHori, {
					"width": "40px",
					height: gridAR.height + "px",
					"left": trX - 2 * width + "px",
					"top": topRight.y + "px"
				});
			} else if (each instanceof cpr.controls.Container) {
				
				
				
			} else {
				var classUserAttr = each.userAttr("viewClass");
				var hasClass = each.style.getClasses();
				if (
					//				classUserAttr =="Y"
					hasClass.length > 0
				) {
					var classes = each.style.getClasses();

					var voActualRect = each.getActualRect().bottomCenter;
					var voViewPortRect = vcContainer.getViewPortRect();

					var vcOptHint = new cpr.controls.Output();
					vcOptHint.value = "class : " + classes;
					vcOptHint.unselectable = false;
					vcOptHint.style.setClasses("hint-box", "top");
					vcContainer.floatControl(vcOptHint, {
						"width": "150px",
						"left": voActualRect.x - 75 + "px",
						"top": voActualRect.y + voViewPortRect.top + 10 + "px"
					});
					hints.push(vcOptHint);

					vcOptHint.addEventListener("mouseenter", function(e) {
						vcOptHint.style.css("z-index", "5");
					});
					vcOptHint.addEventListener("mouseleave", function(e) {
						vcOptHint.style.removeStyle("z-index");
					});

				}
			}

		});
	} else {

		hints.forEach(function(each) {
			each.dispose();
		});
	}
}