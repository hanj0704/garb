/************************************************
 * GetControlTest.js
 * Created at 2021. 10. 28. 오전 10:37:51.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	var vara = new cpr.geometry.Rectangle(150,40,400,400);

	var vaChild = app.getContainer().getAllRecursiveChildren().filter(function(each){
		var b = each.getActualRect().bottomRight;
		
		if(vara.contains(b)){
			return b;
		}
	});
	
	console.log(vaChild)
}

function createFeedback(){
	
	var vcFeedback = new cpr.controls.Output();
	
	vcFeedback.value = "";
	
	vcFeedback.style.css({
		"background-color" : "rgba(73,165,245,0.4)",
		"border" : "solid 1px #40a5f5"
	});
	
	return vcFeedback;
}
function createDragSource(control){
	var feedback = null;
	var rect = null;
	new cpr.controls.DragSource(control, {
		options : {
			dataType : "tex",
			threadhold : 30
		},
		onDragStart: function(context){
			
				
			context.cursor = "grabbing";
			feedback = createFeedback();
			rect = new cpr.geometry.Rectangle(context.dragStartLocation.x, context.dragStartLocation.y, 1, 1);
			app.floatControl(feedback,rect);
			var voDragStartLoca = context.dragStartLocation;
			context.source = null;
		},
		onDragMove: function(context){
			
			var start = context.dragStartLocation;
			var dragStart = context.dragStartLocation;
			var dragDelta = context.dragDelta;
			
			
			rect = new cpr.geometry.Rectangle(dragStart.x, dragStart.y, dragDelta.width, dragDelta.height);
			app.floatControl(feedback,rect);
//			console.log(newRect);
//			app.floatControl(feedback,newRect);
			
		},
		
		onDragEnd: function(context){
			context.cursor = "";
			feedback.dispose();
			feedback = null;
			
			console.log(rect);
			
			var vaChild = app.getContainer().getAllRecursiveChildren().filter(function(each){
				
				var br = each.getActualRect().bottomRight;
				var tl = each.getActualRect().topLeft;
				
				if(rect.contains(br) && rect.contains(tl)){
					return each;
				}
			});
			
			console.log(vaChild);
		}
	});
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	createDragSource(app.getContainer());
}
