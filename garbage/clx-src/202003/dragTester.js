/************************************************
 * dragTester.js
 * Created at 2020. 3. 11. 오후 1:54:05.
 *
 * @author HANS
 ************************************************/



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

	createDragSource(app.lookup("cbg1"));
	createDropTarget(app.lookup("btn1"));
	createDropTarget(app.lookup("btn2"));
	createDropTarget(app.lookup("btn3"));
	createDropTarget(app.lookup("btn4"));
}
function createDragSource(pcDragCtrl) {
	
	var dragSource = new cpr.controls.DragSource(pcDragCtrl, {
	options:{
	  dataType : "text",
	  threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
	},
	onDragStart : function(context){
	  
	},
	onDragMove : function(context){
	},
	onDragEnd : function(context){
	}
})
}

function createDropTarget(pcCtrlDrop) {
	
	
	var dropTarget = new cpr.controls.DropTarget(pcCtrlDrop, {
		isImportant : function(source){
			return source.dataType == "text";
		},
		onDragEnter : function(context){
			context.target.control.style.css({
				"border" :"solid 2px orange"
			});
			
			console.log(context.data);
			console.log(context.target.detail);
		},
		onDragLeave: function(context) {
			context.target.control.style.removeStyle("border");
		},
		onDragMove : function(context){
			
		},
		onDrop : function(context){
			var one = vcContainer.getConstraint(context.target.control);
			var two = vcContainer.getConstraint(context.source.control);
			context.target.control.style.removeStyle("border");
			
			vcContainer.updateConstraint(context.source.control,checkConstraint(one));
			vcContainer.updateConstraint(context.target.control,checkConstraint(two));
		}
	});
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
		app.getContainer().getAllRecursiveChildren().forEach(function(each){
		
		if(each.userAttr("hans")== "Y") {
			each.dispose();
		}
	});
}

