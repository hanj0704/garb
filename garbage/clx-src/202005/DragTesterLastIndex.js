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
function onBodyLoad(/* cpr.events.CEvent */ e){
	setDragSource(app.lookup("grd1"));	
	setDropTarget(app.lookup("grd2"));
}


function createDragSourceFeedback(){
	var feedback = new cpr.controls.Output();
	feedback.ellipsis = true;
	feedback.style.css({
		"opacity" : "0.8",
		"border": "solid 1px red",
		"text-align" : "center",
		"color" : "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedback;
}

/**
 * 드래그를 시작하는 컨트롤에 드래그 소스를 부여하는 함수
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control){
	var feedback = null;
	var actualRect = null;
  new cpr.controls.DragSource(control, {
	options:{
	  dataType : "text",
	  threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
	},
	onDragStart : function(context){
	if(context.sourceTargetObject != null && context.sourceTargetObject.relativeTargetName != "header") {
	  context.cursor = "grabbing";
	  feedback = createDragSourceFeedback();
	  control.style.css("opacity"," 0.5");
	  context.data = context.sourceTargetObject;
	  feedback.value = JSON.stringify(control.getRow(context.sourceTargetObject.rowIndex).getRowData());
	  var voDragStartLoca = context.dragStartLocation;
	  actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x, voDragStartLoca.y, control.getActualRect().width, 25);
	  app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));
	  context.source = null;
	} else {
		context.cancel();
	}
	  
	},
	onDragMove : function(context){
	  context.cursor = "grabbing";
	  var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
	  app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
	},
	onDragEnd : function(context){
	  context.cursor = "";
	  feedback.dispose();
	  feedback = null;
	  control.style.removeStyle("opacity");
	}
});
}

/**
 * 드랍하는 그래드에 드랍 타겟을 부여하는 함수
 * @param {cpr.controls.UIControl} control2
 */
function setDropTarget(control2){

	new cpr.controls.DropTarget(control2, {
		isImportant : function(source){
			return source.dataType == "text";
		},
		onDrop : function(context){
			control2.insertRowData(context.target.control.getRowCount(),false,context.source.control.getRow(context.data.rowIndex).getRowData());
		}
	});
}
