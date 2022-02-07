/************************************************
 * Untitled2.js
 * Created at 2022. 1. 24. 오전 10:22:51.
 *
 * @author HANS
 ************************************************/


/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexerSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndexer = e.control;
	console.log("SELECTION_CHANGE");
	console.log(e);
}



/*
 * 페이지 인덱서에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onPageIndexerClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndexer = e.control;
	console.log("CLICK");
	console.log(e);
}
var a = new cpr.utils.ObjectMap();

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var btns = app.lookup("btn1");
	a.put(btns, btns.getParent().getConstraint(btns));
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
	
	var btns = app.lookup("btn1");
	btns.getParent().updateConstraint(btns, {
		width : "300px",
		height : "300px"
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
	var bb = a.get(app.lookup("btn1"))
	console.log(bb);
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
	
	app.openDialog("201909/dynamicGrid", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
		dialog.addEventListener("mousedown", function(/*cpr.events.CMouseEvent*/ev){
//			console.log(ev);
			var pathes = ev.nativeEvent.path;
			var vara = pathes.find(function(each){
				var vaClassList = each.classList;
				if(vaClassList && vaClassList.length > 0) {
					if(vaClassList.contains("cl-dialog-header")) {
						return each;
					}
				}
//				console.log(each)
			});
			console.log(vara);
			
			if(vara) {
				dialog.getAppInstance().addEventListener("", function(e){
					
				});
			}
		});
	}).then(function(returnValue){
		
		;
	});
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
	
	app.lookup("sms2").send();
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
	
	app.lookup("sms3").send()
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
	
	app.lookup("sms4").send()
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
	
	app.lookup("sms5").send();
}

cpr.events.EventBus.INSTANCE.addFilter("submit-progress", function(e){
	var control = e.control;
	console.log(e.nativeEvent.total);
	console.log(e.nativeEvent.loaded);
	console.log(e.total);
	console.log(e.loaded);
});

/*
 * 그리드에서 delete 이벤트 발생 시 호출.
 * Grid의 행이 삭제되었을 때 이벤트.
 */
function onGrd1Delete(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	console.log(e);
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
	var a = app.lookup("grd2").getRow(0).getStateString();
	console.log(a);
	//	app.lookup("grd2").deleteRow(0);
}


/*
 * 그리드에서 delete 이벤트 발생 시 호출.
 * Grid의 행이 삭제되었을 때 이벤트.
 */
function onGrd2Delete(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
	console.log(e);
	var b = app.lookup("grd2").getRow(0).getStateString();
	console.log(b);
}


/*
 * 그리드에서 before-delete 이벤트 발생 시 호출.
 * Grid의 행이 삭제되기 전에 발생하는 이벤트.
 */
function onGrd2BeforeDelete(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
	console.log("before");
	console.log(e);
	
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
	app.lookup("grd2").deleteRow(0);
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
	var fi = fi1.file;
	
	app.lookup("sms6").addFileParameter("beg", fi);
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
	
	app.lookup("sms6").send()
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
	app.lookup("sms7").send().then(function(input){
		app.lookup("grd1").redraw();
	});
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
	
	var grd = app.lookup("grd2");
	
	console.log(grd.detail.getColumn(0));
}
