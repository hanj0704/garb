/************************************************
 * dragDropModule.module.js
 * Created at 2020. 5. 20. 오전 10:28:30.
 *
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("load", function(e) {

    var control = e.control;

    if (control instanceof cpr.core.AppInstance) {

        control.getContainer().getAllRecursiveChildren().forEach(function(each) {

            if (each.userAttr("draggable") == "Y") {

                _setDragSource(each);
                _setDropTarget(each.getParent());
            }
        });
    }
});

var feedback;

function createDragSourceFeedback() {

    var feedback = new cpr.controls.Button();
    feedback.style.css({
        "opacity": "0.8",
        "cursor": "move"
    });
    return feedback;
}

/**
 * 마우스 드래그 드랍을 통해서 컨트롤의 위치를 변경하게 만드는 함수입니다.
 * @param {cpr.controls.UIControl} pcCtrl
 */
function _setDragSource(pcCtrl) {
    /** @type cpr.core.AppInstance */
    var _app = pcCtrl.getAppInstance();
    var actualRect;
    new cpr.controls.DragSource(pcCtrl, {
        options: {
            dataType: "text",
            threadhold: 10
        },
        onDragStart: function(context) {
            context.cursor = "grabbing";
            feedback = createDragSourceFeedback(pcCtrl);
            feedback.value = pcCtrl.value;
            pcCtrl.style.css("opacity", " 0.5");
            var voDragStartLoca = context.dragStartLocation;
            var vcCtrlRect = pcCtrl.getActualRect();
            actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x, voDragStartLoca.y, vcCtrlRect.width, vcCtrlRect.height);
            _app.floatControl(feedback, actualRect);
            context.source = null;
			
        },
        onDragMove: function(context) {
            context.cursor = "grabbing";
            var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
            _app.floatControl(feedback, newRect);
        },
        onDragEnd: function(context) {
            feedback.dispose();
            feedback = null;
            pcCtrl.style.removeStyle("opacity");
			console.log("ONDRAGEND");
        }
    });
}

/**
 * 
 * @param {cpr.controls.Container} pcCtrl
 */
function _setDropTarget(pcCtrl){
	
	new cpr.controls.DropTarget(pcCtrl, {
			isImportant : function(source){
			return source.dataType == "text";
		},
		onDrop: function(context){
			var voDraggableArea = pcCtrl.getActualRect();
			var actualRect = feedback.getActualRect();
			  if (actualRect.bottomRight.x < voDraggableArea.bottomRight.x
                && actualRect.bottomRight.y < voDraggableArea.bottomRight.y) {
				actualRect.left = actualRect.left - voDraggableArea.left;
				actualRect.top = actualRect.top - voDraggableArea.top;
				pcCtrl.addChild(context.source.control, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));
            } 
		}
	});
	
}