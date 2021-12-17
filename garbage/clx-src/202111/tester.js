/************************************************
 * tester.js
 * Created at 2021. 10. 28. 오전 11:46:25.
 *
 * @author HANS
 ************************************************/
cpr.events.EventBus.INSTANCE.addFilter("keydown", function(/*cpr.events.CKeyboardEvent*/e){
	var control = e.control;
	
	e.stopPropagation();
	var clickEvt = new cpr.events.CMouseEvent("click");
	control.dispatchEvent(clickEvt);
});

var scrolled = false;
var started = 0;
/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrp1Scroll(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
//	if(!scrolled){
//		scrolled = true;
//		started = grp1.getViewPortRect().top;
//		console.log(started);
//	}
//	console.log("DELTA : "+ (grp1.getViewPortRect().top - started));
//	a();
}
var a = _.debounce(function(){
		scrolled = false;
	} ,1000)


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb3ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb3 = e.control;
	console.log(app.lookup("ipb1").inputFilter)
	app.lookup("ipb1").inputFilter = ipb3.value;
	
	app.getContainer().redraw();
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
//	var a = /^([\w\-])([\w\-\.])*/;
//	var val = app.lookup("ipb2").value;
//	var bbb = ValueUtil.fixNull(a.exec(val) == "");
//	app.lookup("btn2").focus();
}


/*
 * 그리드에서 cell-resized 이벤트 발생 시 호출.
 * Cell의 크기를 조정했을 때 발생하는 이벤트.
 */
function onGrd1CellResized(/* cpr.events.CGridEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var a = grd1.getColumnLayout();
	console.log(a);
}


/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrd1RowDblclick(/* cpr.events.CGridMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	console.log("쿄쿄ㅛ");
}


/*
 * "buildTest" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	app.lookup("dm1").build({
		column1 : "#",
		column2 : "4"
 	});
 	
 	app.getContainer().redraw();
 	console.log(btn4.userAttr("hey"));
 	
 	var a = /[\w\-\.]/;
 	console.log(a);
 	console.log(a.toString())
}


/*
 * 데이터맵에서 clear 이벤트 발생 시 호출.
 * 데이터 정보를 제거하는 경우 발생하는 이벤트. 발생 메소드 : clear, (특정조건)build build 메소드 사용시 DataMap.alterColumnLayout="server" 일 때 이벤트가 발생합니다.
 */
function onDm1Clear(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataMap
	 */
	var dm1 = e.control;
	console.log("CLEAR");
	console.log(e.baseRow);
	console.log(e.beforeValue);
}


/*
 * 데이터맵에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDm1Load(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataMap
	 */
	var dm1 = e.control;
	console.log("LOAD");
	console.log(e.baseRow);
	console.log(e.beforeValue);
}


/*
 * 데이터맵에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue
 */
function onDm1Update(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataMap
	 */
	var dm1 = e.control;
	console.log("UPDATE");
	console.log(e.baseRow);
	console.log(e.beforeValue);
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
	
	var aa =[1,2,3,4,5,6,7];
	
	aa.shift();
	
	console.log(aa);
	
	var bar = "123456789";
	console.log(bar.substring(1));
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
	
	var a=  [1];
	
	console.log(a.splice(0,1));
	console.log(a);
	console.log(a.indexOf(2));
	app.lookup("btn4").focus();
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb4ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb4 = e.control;
	console.log("카카카캇");
}


/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onNbe2ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.NumberEditor
	 */
	var nbe2 = e.control;
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
}



/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
}
function abc(){
	
	var a= 1;
	var b = 2;
	
}

/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	app.lookup("ipb4").value ="ata";
//	console.log("ㅋㅋ");
}


/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
	app.lookup("ipb4").putValue("adadsdweq");
}


/*
 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
//	var a = moment("2021-11-24 16:17:17:003");
//	var a = new Date("2021-11-24 16:17:17:003");
//	console.log(a);
//	console.log(a.getMilliseconds());
//	var b = moment(a.valueOf());
//	console.log(b);
//	console.log(b.format("YYYY-MM-DD HH:mm:ss:SSS"));
	console.log(app.lookup("grp3").focusable);
	console.log(app.lookup("opt5").focusable);
	console.log(app.lookup("opt6").focusable);
	console.log(app.lookup("opt5").focus());
	app.lookup("opt5").setNextControl(app.lookup("opt6"));
}


/*
 * "Output" 아웃풋(opt7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOpt7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var opt7 = e.control;
	
	console.log("HELLOWORLD");
}


/*
 * 그룹에서 focusin 이벤트 발생 시 호출.
 * 컨트롤 및 컨트롤의 하위 요소가 포커스를 획득하기 직전 발생하는 이벤트.
 */
function onGrp1Focusin(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	
//	console.log("ㅋㅋ");
//	console.log(e);

	grp1.addEventListenerOnce("focusout", aq)
}


function aq(e){
	app.getContainer().addEventListenerOnce("focusin", function(ev){
		console.log(ev);
		abc(e.targetControl,ev.targetControl);
	})
}

function abc(pc1,pc2){
	
	console.log("쿄쿄~~");
	console.log(pc1);
	console.log(pc2);
}



/*
 * 인풋 박스에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onIpb5Blur(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb5 = e.control;
	console.log("blur");
//	cpr.events.EventBus.INSTANCE.omitEvent(function(){
		app.lookup("ipb7").focus();
//	})
}


/*
 * 인풋 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onIpb6Focus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb6 = e.control;
	console.log("focus");
	console.log(e);
}


/*
 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
	console.log(app.lookup("ds3").getRowDataRanged());
	var opts = _.clone(app.lookup("btn14"));
	app.getContainer().addChild(b, {
		top : "800px",
		left: "20px",
		width: "100px",
		height: "20px"
	});
}


/*
 * "Button" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	console.log("ㅋㅅㅋ");
}


/*
 * "Button" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn15 = e.control;
	
	app.ABC = "bbb";
}


/*
 * "Button" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn16Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn16 = e.control;
	console.log(app.hasOwnProperty("ABC"));
	console.log(app.ABC);
}
