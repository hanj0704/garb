/************************************************
 * tester.js
 * Created at 2022. 1. 3. 오전 9:30:47.
 *
 * @author HANS
 ************************************************/
var mcPrevCtrl = null;

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
//	app.lookup("sms1").send();

	var vcGrd = app.lookup("grd1");
}


/*
 * 그리드에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onGrd1Focus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	if(mcPrevCtrl != app.lookup("btn7")){
		
		app.lookup("btn2").focus();
	}
}



/*
 * "Button" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn12 = e.control;
	
	app.lookup("cmb1").value = "zz,w";
	
	console.log(app.lookup("ds1").getColumnData('column6'))
	
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
	app.dialogManager.openDialog("202112/tester", "ABC",{modal : false,width:300,height:300});
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
	app.dialogManager.openDialog("202111/tester", "ABC",{modal : false,width:300,height:300});
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
	app.dialogManager.openDialog("202110/tester", "ABC",{modal : false,width:300,height:300});
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	console.log(e.keyCode);
	
	if(e.keyCode == 116){
		console.log("ㅋㅋ");
		e.preventDefault();
	}
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
	
	var a = app.lookup("ha");
	
	console.log(a instanceof cpr.controls.EmbeddedApp);
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
	var cb = app.lookup("cbx1");
	
	console.log(cb.checked.toString());
	
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
	var a = "한글";
	
	console.log(a.toLowerCase());
	var b = "#가나#다라";
	console.log(b.toLowerCase());
	var c = "#Upload";
	console.log(c.toLowerCase());
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
	console.log(window.document.domain);
//	app.lookup("grd1").exportD
//	window.location.href = "http://localhost:8080/app/com/main/Main.clx";
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
	
}


/*
 * 데이터셋에서 sort 이벤트 발생 시 호출.
 * 데이터가 정렬되는 경우 발생하는 이벤트. 발생 메소드 : setSort, setSortExpr, clearSort
 */
function onDs1Sort(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	console.log(e);
	e.preventDefault();
	e.stopPropagation();
	return false;
}


/*
 * 그리드에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrd1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
}


/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
}


/*
 * 콤보 박스에서 close 이벤트 발생 시 호출.
 * 리스트박스를 닫을때 발생하는 이벤트.
 */
function onCmb1Close(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
}


/*
 * 콤보 박스에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onCmb1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
}


/*
 * 사용자 정의 컨트롤에서 value-change 이벤트 발생 시 호출.
 */
function onUdcCntyCdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type udc.udcCntyCd
	 */
	var udcCntyCd = e.control;
	console.log("ㅋㅋ");
	console.log(e);
	
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
	
	app.lookup("opt2").format = "";
	app.lookup("opt2").redraw();
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb2SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb2 = e.control;
	
	
}
