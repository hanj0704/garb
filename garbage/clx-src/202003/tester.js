/************************************************
 * tester.js
 * Created at 2020. 3. 2. 오후 4:31:38.
 *
 * @author HANS
 ************************************************/

var objs = {};
var filtered;
var vcGrp = null;

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	app.lookup("sms4").send();

	
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms4SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms4 = e.control;
	var dsList = app.lookup("dsList");
		for(var i  = 0 ; i < dsList.getRowCount() ; i++) {
		var button = new cpr.controls.Button();
		var random = Math.random();
		if(random < 0.5) {
			
		button.value = dsList.getValue(i, "value");
		}else {
		button.bind("value").toExpression("' '");
		button.style.css({"background" :"tomato"})
		}
		
		app.getContainer().addChild(button, {
			"with" : "100px",
			"height" : "20px",
			"autoSize" : "none"
		});
	}
	
 filtered = app.getContainer().getAllRecursiveChildren().filter(function(each){
		if(each.getBindInfo("value") ===undefined) {
			return each;
		}
	});

	filtered.forEach(function(each,idx){
		objs[idx] = each.value;
	});
}


/*
 * 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var size = Object.keys(objs).length-1;
	filtered.forEach(function(each,idx){
		each.value = objs[size-idx];
	});	
	
	app.getContainer().redraw();
}




/*
 * "빌드버튼" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("sms1").send();
}


/*
 * "빌드버튼" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	console.log(app.lookup("mse1").value);
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	vcGrp = new cpr.controls.Container("grp1");
	var form = new cpr.controls.layouts.FormLayout();
	form.setRows(["1fr","1fr"]);
	form.setColumns(["1fr","1fr"]);
	vcGrp.setLayout(form);
	
	app.getContainer().floatControl(vcGrp, {
		"width" : "300px",
		"height" : "300px",
		"left" : "300px",
		"top" : "300px"
	});
	
	vcGrp.addChild(app.lookup("opt1"), {
		"rowIndex" : 0,
		"colIndex" : 0
	});
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	vcGrp = new cpr.controls.Container("grp1");
	var form = new cpr.controls.layouts.FormLayout();
	form.setRows(["1fr","1fr","1fr"]);
	form.setColumns(["1fr","1fr","1fr"]);
	vcGrp.setLayout(form);
	
	app.getContainer().floatControl(vcGrp, {
		"width" : "300px",
		"height" : "300px",
		"left" : "300px",
		"top" : "300px"
	});
	app.lookup("grp1").addChild(app.lookup("opt1"), {
		"rowIndex" : 1,
		"colIndex" : 1
	});
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;

	app.lookup("grd1").filter("column2 *= '동'");	
}


/*
 * 그리드에서 mouseup 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 뗄 때 발생하는 이벤트.
 */
function onGrd1Mouseup(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	console.log("MOUSEUP");
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	app.openDialog("Untitled", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			
			cpr.core.App.load("201909/ep", function(loadedApp){
				dialog.app = loadedApp;
				dialog.redraw();
			});
			
		});
	}).then(function(returnValue){
		;
	});
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb2ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb2 = e.control;
	
	console.log("변경됨");
}


/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	app.lookup("ds1").setValue(0, "column1", "가가가");
	app.lookup("grd1").redraw();
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb3ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb3 = e.control;
	console.log("ㅁㅁ");
	
	app.lookup("ds1").setValue(0, "column1", "가가가");
}
