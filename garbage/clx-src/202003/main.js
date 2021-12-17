/************************************************
 * Untitled.js
 * Created at 2020. 3. 4. 오후 2:06:47.
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
	
	var buttons= new cpr.controls.Button("btt");
	
	app.getContainer().addChild(buttons, {width: "218.5px", height: "343.5px", left: "547px", top: "414.5px"});
	
	var droptarget = new cpr.controls.DropTarget(buttons, {
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
	
	app.openDialog("202003/popup", {width : 400, height : 400}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	console.log(app.lookup("btt").hasOwnProperty("DropTarget"));
}
