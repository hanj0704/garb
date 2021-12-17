/************************************************
 * tester.js
 * Created at 2020. 1. 2. 오후 3:23:53.
 *
 * @author HANS
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe("message", app, function(msg){
		var notifier = app.lookup("noti");
		console.log(msg);
	if (msg.success == true) {
		notifier.success(msg.text);
	} else if (msg.info == true) {
		notifier.info(msg.msg);
	} else if (msg.warning == true) {
		notifier.warning(msg.msg);
	} else if (msg.danger == true) {
		notifier.danger(msg.msg);
	} else {
		notifier.info(msg);
	}
});

function createDragSourceFeedback(){
	var feedback = new cpr.controls.Output();
	feedback.style.css({
		"opacity" : "0.8",
		"width": "50px",
		"height": "25px",
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
 * 파라미터의 컨트롤을 드래그 가능하도록 드래그 소스를 지정하는 함수.
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control){
	var feedback = null;
//  	var insData = control.getSelectedRow().getRowData();
  new cpr.controls.DragSource(control, {
	options:{
	  dataType : "text",
	  threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
	},
	onDragStart : function(context){
	  context.cursor = "grabbing";
	  feedback = createDragSourceFeedback();
	  control.style.css("opacity"," 0.5");
	  context.data = "아니이게누구야";
	  feedback.value = JSON.stringify(control.getSelectedRow().getRowData());
	  var actualRect = //control.getActualRect();
	  					{"width" : "500px", "height" : "25px"};
	  app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));
	  context.source = null;
	  
	},
	onDragMove : function(context){
	  context.cursor = "grabbing";
	  var actualRect = context.source.control.getActualRect();
	  var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
	  var hansRect = {"width" : 500, "height" :25,"left":newRect.left, "top":newRect.top};
	  app.floatControl(feedback,cpr.controls.layouts.XYLayout.createConstraintWithRect(hansRect));
//	  console.log(context.target.detail);
	},
	onDragEnd : function(context){
	  context.cursor = "";
	  feedback.dispose();
	  feedback = null;
	  control.style.removeStyle("opacity");
	  
	}
});
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	var imgFile = fi1.file;
	
	var img1 = app.lookup("img1");
	var reader = new FileReader();
	reader.onload = function(e){
		img1.src = e.target.result;
		img1.redraw();
	}
	reader.readAsDataURL(imgFile);
	
}




/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var script = document.createElement("script");
	
	script.src ="./thirdparty/ckeditor/ckeditor.js";
	script.type ="text/javascript";
	
	document.head.appendChild(script);
	var editor = document.createElement("textarea");
	editor.setAttribute("id","editor");
	e.content.appendChild(editor);
//	document.cla
	// API가 로드된 후 이벤트 실행
	script.addEventListener("load", function(){

	CKEDITOR.replace("editor",{
		height : 600
	});
	});
	
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	var buttons = new cpr.controls.Button("bttt");
//	
//	app.floatControl(buttons,{
//		"width" : "100px",
//		"height": "20px",
//		"bottom" :"20px",
//		"right":"20px"
//	});
//	
//	setDragSource(app.lookup("bttt"));

//	var a = ["1234"];
//	
//	if(!(a instanceof Array)) {
//		a = [a];
//	}
//	console.log(a);
//	console.log(typeof a);
	
	
//	var details = app.lookup("grd1").detail;
	

//	app.lookup("ds1").getRowStateIndices	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	window.location.href ="/cisweb/change.do?q=그리드를 동적으로&qw=그려주고";
	
	
//	var a = "search.do?q=그리드를 동적으로&oq=그려다가";
//	
//	var params = a.substr(a.indexOf("?")+1);
//	console.log(params);
//	
//	var q = params.split("&");
//	console.log(q);
//	q.forEach(function(each){
//		var w = each.split("=");
//		console.log(w);
//	});
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange2(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	var emb = app.lookup("ep1");
	var htm = app.lookup("htm");
	var reader = new FileReader();
	reader.onload = function(e){
//		emb.src = "C:\Users\HANS\Desktop\abc\index.html";
//		e.target.result;
		htm.data = e.target.result;
		emb.redraw();
		htm.redraw();
	}
//	reader.readAsDataURL(fi1.file);
	
	
	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	/** @type cpr.core.App */
	var apps = cpr.core.Platform.INSTANCE.lookup("202001/tester");
	apps.createNewInstance().run();
	
//	var ap = cpr.core.App.load("201909/DeferredUpdateManager", function(loadedApp){
//		loadedApp.createNewInstance().run();
//	});
	
//	app.close();
//	apps.createNewInstance().run();
}
