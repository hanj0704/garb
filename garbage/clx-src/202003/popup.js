/************************************************
 * Untitled2.js
 * Created at 2020. 3. 4. 오후 3:11:59.
 *
 * @author HANS
 ************************************************/
var feedback;
function _createDragSourceFeedback(voRect){

var feedbacks = new cpr.controls.Output();
	feedbacks.style.css({
		"opacity" : "0.8",
		"width": voRect.width + "px",
		"height": voRect.height +"px",
		"border": "solid 1px red",
		"text-align" : "center",
		"color" : "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedbacks;
}
function createDrag(control){
	
	var voRootApp = app.getRootAppInstance();
	var dragSource = new cpr.controls.DragSource(control,  {
	options:{
	  dataType : "text",
	  threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
	},
	onDragStart : function(context){
	  context.cursor = "grabbing";
	  var actualRect = control.getActualRect();
	  feedback = _createDragSourceFeedback(actualRect);
	  control.style.css("opacity"," 0.5");
	  var newActualRect = actualRect.getTranslatedByDimension(context.dragDelta);
	  voRootApp.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(newActualRect));
	  context.source = null;
	  
	},
	onDragMove : function(context){
	  context.cursor = "grabbing";
	  var actualRect = context.source.control.getActualRect();
	  var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
	  voRootApp.floatControl(feedback,cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
	},
	onDragEnd : function(context){
	  context.cursor = "";
	  feedback.dispose();
	  feedback = null;
	  control.style.removeStyle("opacity");
	}
});
}

function createDrop (control) {
	var droptarget = new cpr.controls.DropTarget(control, {
		isImportant : function(source){
			return source.dataType == "text";
		},
		onDragEnter : function(context){
			context.target.control.style.css({
				"border" :"solid 2px orange"
			});
		},
		onDragLeave: function(context) {
			context.target.control.style.removeStyle("border");
		},
		onDragMove : function(context){
			
		},
		onDrop : function(context){
			context.target.control.style.css({
				"border" :"solid 2px orange"
			});
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	createDrag(app.lookup("btn1"));
	createDrop(app.lookup("btn2"));
	
}
