

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	console.log(app.lookup("dsSequenceStepList").getRowDataRanged());
	console.log(app.lookup("dsStationSubList").getRowDataRanged());
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	app.lookup("sms1").send();
	
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
	app.lookup("grd1").redraw();
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
	
	app.lookup("cmb3").value = "value1,value2";
	
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
	
	app.lookup("cmb3").values = "value1,value2";
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
	console.log(app.lookup("grd1").getRow(0).getRowData());
	app.lookup("cmb2").clearSelection(false);
	console.log(app.lookup("grd1").getRow(0).getRowData());
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
//	var vcSelec = grd1.getSelectedRow();
//	
//	var mod = vcSelec.getValue("ModuleName");
//	
//	var vsSta= app.lookup("cmb1").dataSet.findFirstRow("STA_VALUE=='"+mod+"'");
//	var multi = vsSta.getValue("MULTIPLE");
//	
//	app.lookup("cmb2").multiple = multi == "Y"? true : false;

	console.log(e.newSelection);
	console.log(e.targetObject);
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
	
	
	var a = "abcdefghijk";
	var vnLen = a.length
	for(var i = 0 ; i < vnLen ; i++) {
		
		var sub = a.substr(i, 1);
		console.log(sub);
	}
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
	
	
	var a = "Pressure < 1";
	
//	var b = a.replace(/[0-9]/g, "");
//	console.log(b);
	
	var c = a.search(/[<>]/);
	
	console.log(c);
	console.log(isNaN("123"))
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
	
	console.log(Boolean(0));
//	var a = "aa";
//	
//	var hanExp = /Gas\d+/;
//	
//	console.log(hanExp.exec(a));
//	console.log(hanExp.test(a));
//	console.log(a.match(hanExp));
	
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
	
//	var cm = app.lookup("cmb4");
//	
////	cm.value = "B";
//	cm.selectItemByValue("B");

}


/*
 * 콤보 박스에서 change 이벤트 발생 시 호출.
 * 값이 변경 되었을때 발생하는 DOM 이벤트.
 */
function onCmb4Change(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb4 = e.control;
	
	console.log("CHANGE");
}


/*
 * 콤보 박스에서 select 이벤트 발생 시 호출.
 * 사용자가 텍스트를 선택할 때 발생하는 이벤트.
 */
function onCmb4Select(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb4 = e.control;
	
	console.log("SELECT");
}


/*
 * 콤보 박스에서 input 이벤트 발생 시 호출.
 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
 */
function onCmb4Input(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb4 = e.control;
	console.log("INPUT");
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb4SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb4 = e.control;
	console.log("SELECT_CHANGE");
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
	
	console.log(app.lookup("grd1").getEditRowIndex());
}


/*
 * 그리드에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrd1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	console.log(app.lookup("grd1").getEditRowIndex());
}


/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
//	console.log(e.rowIndex);
	
	
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
//	var detail  = app.lookup("grd1").detail;
//	
//	for(var i = 0; i < detail.getCellIndices().length ; i++){
//		
//		var column = detail.getColumn(i);
//		
//	}
	
//	console.log(!undefined);
//	
//	console.log(!false);
//	
//	var a = {
//		q : 1
//	}
//	console.log(a.w);

	var vcGrid = app.lookup("grd1");
	
	console.log(vcGrid.getRow(15));
	console.log(vcGrid.getSelectedRow());
	
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
	
	var a = new Array(99).fill("").map(function(v,i){
		return {
			label : i ? String(i) : "직접입력",
			value : i
		}
	});
	console.log(a);
}


/*
 * "map test" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn12 = e.control;
	var a = ["a","b","c"];
	
	var b = [0,1];
	
	var c= b.map(function(each){
		return a[each];
	});
	console.log(c);
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
	
	var ds = app.lookup("dsColDataSort");
	
	ds.setSort("column2 asc");
	console.log(ds.getColumnData("column1"));
}
