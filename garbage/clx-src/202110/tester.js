/************************************************
 * tester.js
 * Created at 2021. 10. 5. 오후 4:00:30.
 *
 * @author HANS
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe("SELECTIONCHANGERMAN", app, function(data){
	console.log(data);
},"two");


/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onNbe1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.NumberEditor
	 */
	var nbe1 = e.control;
	console.log("ㅋㅋ");
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
	
	app.lookup("dm1").build({
		"column1" : 123
	});
	
	app.lookup("nbe1").redraw();
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
	var a = true;
	
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
	
	var ds = app.lookup("ds1");
	
	ds.moveRowIndex(2, ds.getRowCount()-1);
	app.lookup("grd1").redraw();
}


/*
 * 그리드에서 scroll 이벤트 발생 시 호출.
 * 그리드 디테일 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrd1Scroll(/* cpr.events.CScrollEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	app.lookup("grU").redraw();
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
	
	var img = app.lookup("img1");
	
	var vaItems = img.getItems();
	
	var vaFilt = vaItems.filter(function(each){
		return each.value =="value1";
	});
	
	console.log(vaFilt);
}


/*
 * 이미지에서 item-click 이벤트 발생 시 호출.
 * 이미지 영역 아이템 클릭시 발생하는 이벤트.
 */
function onImg1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var img1 = e.control;
	
	var item = e.item;
	console.log(item);
	
	item.label = "aaa";
	
	console.log(item);
	
	
	app.lookup("img1").redraw();
}


/*
 * "Button" 버튼(btn5)에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onBtn5Mouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	btn5.style.css("z-index","15");
}


/*
 * "Button" 버튼(btn5)에서 mouseleave 이벤트 발생 시 호출.
 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
 */
function onBtn5Mouseleave(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	btn5.style.removeStyle("z-index");
}


/*
 * "numFind" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var vsFind = /\d+/;
	
	var vsFinded = "MFC132";
	
	console.log(vsFinded.match(vsFind));
}


/*
 * "substr -2" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
	var a= "abcdefghijk";
	console.log(a);
	console.log(a.substring(2));
	console.log(a.substr(-2));
	console.log(a.slice(0, -2));
	console.log(a);
}


/*
 * 루트 컨테이너에서 focusin 이벤트 발생 시 호출.
 * 컨트롤 및 컨트롤의 하위 요소가 포커스를 획득하기 직전 발생하는 이벤트.
 */
function onBodyFocusin(/* cpr.events.CFocusEvent */ e){
	
	console.log("FOCUSIN");
	console.log(e);
}


/*
 * 루트 컨테이너에서 focusout 이벤트 발생 시 호출.
 * 컨트롤 밑 컨트롤의 하위 요소가 포커스를 잃기 직전 발생하는 이벤트.
 */
function onBodyFocusout(/* cpr.events.CFocusEvent */ e){
	
	console.log("FOCUSOUT");
}


/*
 * 루트 컨테이너에서 host-change 이벤트 발생 시 호출.
 * 앱이 다른 부모 앱에 포함되거나 부모 앱으로 부터 이탈할 때 발생하는 이벤트 입니다.
 */
function onBodyHostChange(/* cpr.events.CEvent */ e){
	
	console.log("HOST_CHANGER");
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
	
	var ds = app.lookup("ds1");
	var a = ds.getRowData(0);
	var b = ds.getRowData(0);
	
	console.log(JSON.stringify(a) == JSON.stringify(b));
	console.log(JSON.stringify(null))
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
	btn10.setBindContext(null);
	
	console.log(btn10.getBindContext());
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
	
//	app.lookup("dsPrcSumXXYYList").build({
//    "RECIPE_NAME": "111",
//    "WAFER_NO": "2",
//    "POS_WAFER_T": "0",
//    "RUN_PROC_STEP_T": "80",
//    "PROC_STOP_T": "0",
//    "NUM_STOPS": "0",
//    "NUM_WARNINGS": "0",
//    "NUM_FAULTS": "0"
//})
	app.lookup("dsPrcSumXXYYList").build([{
    "RECIPE_NAME": "111",
    "WAFER_NO": "2",
    "POS_WAFER_T": "0",
    "RUN_PROC_STEP_T": "80",
    "PROC_STOP_T": "0",
    "NUM_STOPS": "0",
    "NUM_WARNINGS": "0",
    "NUM_FAULTS": "0"
}])
	
	console.log(app.lookup("dsPrcSumXXYYList").getRowDataRanged());
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
	
	app.lookup("ds2").build([
		
	])
}



/*
 * 루트 컨테이너에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onBodyMousedown(/* cpr.events.CMouseEvent */ e){
	
	console.log(e);
	app.lookup("opt2").value = "CLICK";
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
	
	
//	app.lookup("ds1")
}

var abc = null;

/*
 * "Button" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	
	abc = setInterval(function(){
		console.log("하하하!");
	}, 1000);
	
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
	
	clearInterval(abc);
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
	
	
	
	var a = function(){}
	
	a.prototype.avc = "1";
	
	var b = cpr.controls.CheckBoxGroup.prototype;
	console.log(b);
	a.prototype = b;
	
	console.log(a);
	console.log(a.prototype);
	
	var c = new a();
	
	console.log(c);

	
}
