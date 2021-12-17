/************************************************
 * tester.js
 * Created at 2019. 12. 2. 오후 5:46:02.
 *
 * @author HANS
 ************************************************/
  
//cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getRootDs", function(ctrl){
//	/** @type cpr.controls.UIControl */
//	var control = ctrl;
//	
//	control.getAppInstance();
//	return app.getRootAppInstance().lookup("DS_AA_BB");
//});



/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
//	app.lookup("sms4").send();
	
	var map = new naver.maps.Map('map', {
    useStyleMap: true,
    zoom: 16,
    center: new naver.maps.LatLng(37.5666103, 126.9783882)
});
	var vcEmbPage = new cpr.controls.EmbeddedPage();
	var vsReportTargetUrl = "http://localhost:8080/ClipReport4";
	var postMethod = vcEmbPage.getPostMethod("vsReportTargetUrl");
	
	postMethod.addParameter("crfFilePath", "cmn/reportfile");
	
	
	//보고서 호출 파라미터
	var vcParam = app.lookup("dmParam");
	
	var vsaColNms = vcParam.getColumnNames();
	
	for(var param in vsaColNms) {
		postMethod.addParameter("viewerParameter",param+":="+vcParam.getString(param));
	}
	
	//파라미터 전송(form submit)
	postMethod.submit();
	
	/*
	 * form fild reset (delete all setting parameters)
	 * 초기화
	 */
	postMethod.dispose();

}



//var mapOptions = {
//   	 		center: new naver.maps.LatLng(37.3595704, 127.105399),
//   			 zoom: 10
//		};
//
//		var map = new naver.maps.Map(content, mapOptions);
//		
//		/**
//		 * Access to XMLHttpRequest at '' has been blocked by CORS policy: Response to preflight request 
//		 * doesn't pass access control check: It does not have HTTP ok status.
//		 * 위와 같은 에러는,MAPS API는 javascript 환경에서 보안상의 이슈로 CORS(Cross-Origin Resource Sharing)를 허용하지 않습니다.
//		 * javascript 환경에서 사용하시려면, 동일 도메인을 갖는 backend 서버를 두고, 이 서버에서 API를 호출하는 방식으로 사용 부탁드립니다.

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
	  feedback = control
//	  control.style.css("opacity"," 0.5");
//	  feedback.value = 
	  var actualRect = control.getActualRect();
//	  					{"width" : "500px", "height" : "25px"};
	  app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));
	  context.source = null;
	  
	},
	onDragMove : function(context){
	  context.cursor = "grabbing";
	  	var actualRect = context.source.control.getActualRect();
			var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
	  var hansRect = //newRect;
	  {"width" : 500, "height" :25,"left":newRect.left, "top":newRect.top};
	  app.floatControl(feedback,cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
//	  console.log(context.target.detail);
	},
	onDragEnd : function(context){
	  context.cursor = "";
	  feedback.dispose();
	  feedback = null;
//	  control.style.removeStyle("opacity");
	  
	}
});
}

/**
 * 파라미터로 받은 컨트롤을 드랍가능한 타겟으로 지정하는 함수.
 * @param {cpr.controls.UIControl} control2
 */
function setDropTarget(control2){

	new cpr.controls.DropTarget(control2, {
		isImportant : function(source){
			return source.dataType == "text";
		},
		onDragEnter : function(context){
		},
		onDragLeave: function(context) {
		},
		onDragMove : function(context){
//			console.log(context.);
		},
		onDrop : function(context){
		}
	});
}
//app.lookup("grd2").updateRow(rowIndex, rowdata)
/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
//	setDragSource(app.lookup("grd1"));	
}


/*
 * 그리드에서 mouseup 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 뗄 때 발생하는 이벤트.
 */
function onGrd2Mouseup(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	var lcb = app.lookup("lcb1");
	var ea = new cpr.events.CKeyboardEvent("keydown", {content :{
		"key" : 13
	}});
	ea.keyCode = cpr.events.KeyCode.DOWN;
	var ipb = app.lookup("ipb1");
	ipb.focus();
	ea.keyCode == 13;
	ipb.dispatchEvent(ea);



setDragSource(app.lookup("btn2"));


//	var grd = app.lookup("grd1");
	
//	grd.header.getColumn(0).style.setClasses("ibtn-detail");
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
	
	console.log(moment("20191215111111111","YYYYMMDDHHmmssSSS").format("YYYY-MM-DD"));


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
	
}
