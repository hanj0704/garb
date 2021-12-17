/************************************************
 * tester.js
 * Created at 2021. 4. 1. 오전 10:51:10.
 *
 * @author HANS
 ************************************************/


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	//	cpr.events.EventBus.INSTANCE.removeFilter("click", ev);	
}




/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("ipb1").value = "zz";
	app.lookup("ipb1").focus();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
//	app.lookup("grp1").getLayout().setRows(["1fr","1fr","1fr","1fr"]);
//	var rowGroup = app.lookup("grd1").getGridRowGroup(0);
//	
//	while(rowGroup != null) {
//		
//		rowGroup.expanded = false;
//		var a = rowGroup.endRowIndex +1;
//		if(a < app.lookup("grd1").getRowCount()){
//			
//		rowGroup = app.lookup("grd1").getGridRowGroup(a);
//		} else {
//			rowGroup = null;
//		}
//	}
//	while(vcGrid.getViewingStartRowIndex() == 0){
//		
//		var rowGrp = vcGrid.getGridRowGroup(vcGrid.getViewingStartRowIndex());
//		
//		rowGrp.expanded = false;
//	}

}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("calendar1").enabledDateExp = "getMonth() /3 !=0"
//	app.lookup("grd1").group
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("cmb1").setFilter("column3 =='3'");
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb3SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb3 = e.control;
	
	app.lookup("cmb1").setFilter("column3=='"+e.newSelection[0].value+"'");
}


/*
 * "q" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ipb = app.lookup("ipb1");
	
	ipb.value += "q";
	ipb.setSelection({
		start : ipb.value.length,
		end :ipb.value.length
	});
	
	cpr.core.DeferredUpdateManager.INSTANCE.update();
}


/*
 * 인풋 박스에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onIpb1Blur(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
}



/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onIpb1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
//	console.log("CLICK");
}

/*
 * 인풋 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onIpb1Focus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
//	console.log("FOCUS");
}



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	var ds = app.lookup("ds5");
	
	var vcGrid = app.lookup("grd1");
	
	/**
	 * @type {cpr.controls.gridpart.GridConfig}
	 */
	var inits = {
		"dataSet" : null,
		"columns" :[],
		"header" : {
			"rows" :[],
			"cells" :[]
		},
		"detail" : {
			"rows": [],
			"cells" :[]
		}
	};
	
	inits.dataSet = ds;
	inits.header.rows.push({"height" : "24px"});
	inits.detail.rows.push({"height" : "24px"});
	ds.getColumnNames().forEach(function(each,idx){
		inits.columns.push({"width" : "100px"});
		var eachCells = {
			"constraint" : {"rowIndex" : 0,
						   "colIndex" : idx
						  },
			"configurator" : function(cell){
				cell.filterable = true;
				cell.sortable = true;
				cell.targetColumnName = each;
					cell.text = each;
			}
		}
		inits.header.cells.push(eachCells);
		
		inits.detail.cells.push({
			"constraint" : {
							"rowIndex" : 0,
							"colIndex" : idx
			},
			"configurator" : function(cell){
					cell.columnName = each;
			}
		});
	});
	
//	vcGrid.addEventListener("selection-change", function(e){
//		/** @type cpr.controls.provider.GridRow */
//		var selections = e.newSelection[0];
//		
//		selections.getValue(columnName)
//	});
//	console.log(inits);
//	vcGrid.init(inits);
//	vcGrid.redraw();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var a = [1,2,3,4,5,0,13,-1];
	
	console.log(Math.min(a));
	console.log(Math.min(1,5));
	console.log(Math.min.apply(null, a));
}


/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTre1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	console.log("SELECTION_CHANGE");
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTre1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	console.log("ITEM_CLICK");
}

 var a = [3,1,2];


function shuffleArray(inputArray){
    inputArray.sort(function(){
    	return Math.random() - 0.5;
    });
}
var demoArray = ["염소", "차", "염소"];
/*
 * "몬티홀의 문제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick9(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	

shuffleArray(demoArray);
}


var a = false;

/*
 * "문1" 버튼(door1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDoor1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var door1 = e.control;
	
	if(demoArray[1] == "염소") {
		
		if(confirm("door2 안에는 염소가 있었는데 바꿀 기회를 드릴까요?")) {
			console.log(demoArray[2]);
		} else {
			console.log(demoArray[0]);
		}
		
	}
	else if(demoArray[2] == "염소") {
		
		if(confirm("door3 안에는 염소가 있었는데 바꿀 기회를 드릴까요?")) {
			console.log(demoArray[1]);
		} else {
			console.log(demoArray[0]);
		}
		
	}
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var btns = new cpr.controls.Button();
	
	btns.value = "zz";
	
	app.lookup("grp1").floatControl(btns,{
		bottom : "0px",
		left: "0px",
		right : "0px",
		height : "30px"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick11(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.getContainer().updateConstraint(app.lookup("grp1"), {
		
		height : "700px"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick12(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("button1").id = "Zzas";
	console.log(app.lookup("grpp").getParent().getConstraint(app.lookup("grpp")));
}


/*
 * "Button" 버튼(button1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButton1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button1 = e.control;
	
	var grp = app.lookup("grp1");
	
	var verti = new cpr.controls.layouts.VerticalLayout();
	
	grp.setLayout(verti);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick13(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grps = app.lookup("grpp");
	
	grps.getParent().replaceConstraint(grps, {
		"width" : "100px",
		"height": "300px",
		"autoSize":"none"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick14(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grps = app.lookup("grps");
	
	console.log(grps.getActualRect());
	console.log(grps.getOffsetRect());
	console.log(grps.getViewPortRect());
	console.log(grps.getContentPaneRect());
}


/*
 * 임베디드 앱에서 app-ready 이벤트 발생 시 호출.
 * 임베디드 앱의 인스턴스와 관련 자원이 준비되는 시점에 디스패치되는 이벤트.
 */
function onEa1AppReady(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.EmbeddedApp
	 */
	var ea1 = e.control;
	
	console.log("APPREADY");
}


/*
 * 임베디드 앱에서 load 이벤트 발생 시 호출.
 * 임베디드 앱이 준비되고 그려진 후에 디스패치 되는 이벤트.
 */
function onEa1Load(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.EmbeddedApp
	 */
	var ea1 = e.control;
	console.log("APPLOAD");
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick15(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var btn =new cpr.controls.Button();
	btn.value = "Zzz";
	app.lookup("grp").addChild(btn, {
		left:"0px",
		top:"0px",
		width:"100%",
		height:"100%"
	});
	
	var btn2 = new cpr.controls.Button();
	btn2.value = "qwe";
	app.lookup("grp").addChild(btn2, {
		left:"100%",
		top:"0px",
		width:"100%",
		height:"100%"
	});
	var btn3 = new cpr.controls.Button();
	btn3.value = "ztz";
	app.lookup("grp").addChild(btn3, {
		left : "200%",
		top:"0px",
		width:"100%",
		height:"100%"
	});
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	
}



///*
// * 그룹에서 mousedown 이벤트 발생 시 호출.
// * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
// */
//function onGrpMousedown(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Container
//	 */
//	var grp = e.control;
//	console.log(e.clientX);
//	console.log(e.offsetX);
//	console.log(e.pageX);
//	console.log(e.screenX);
//	grp.addEventListenerOnce("mousemove", function(ev){
//		console.log(ev.clientX);
//	console.log(ev.offsetX);
//	console.log(ev.pageX);
//	console.log(ev.screenX);
//	});
//}


/*
 * 그룹에서 touchstart 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
 */
function onGrpTouchstart(/* cpr.events.CTouchEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp = e.control;
	var a = e .touches.item(0);
	console.log(a.clientX);
	console.log(a.pageX);
	console.log(a.screenX);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick16(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var btns = new cpr.controls.Button();
	btns.value = "11";
	app.lookup("grppp").insertChild(0, btns,{
		width:"100px",
		height:"20px",
		autoSize:"none"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick17(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var btns = new cpr.controls.Button();
	btns.value = "33";
	app.lookup("grppp").insertChild(2, btns,{
		width:"100px",
		height:"20px",
		autoSize:"none"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick18(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var btns = new cpr.controls.Button();
	btns.value = "22";
	app.lookup("grppp").insertChild(1, btns,{
		width:"100px",
		height:"20px",
		autoSize:"none"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick19(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grppp2").insertChild(1,app.lookup("b1"));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick20(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grppp2").insertChild(3,app.lookup("b2"));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick21(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("grppp2").insertChild(2,app.lookup("b3"));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick22(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("grppp2").insertChild(1,app.lookup("b4"));
}


/*
 * "몬티홀의 자동화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick23(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var count = 1000;
	var q = 0;
	var i = 0 ;
	while(i < 1000){
		
	var demoArray = ["염소", "차", "염소"];
	
	shuffleArray(demoArray);
	
	var selection = Math.floor(Math.random()*3);
	
	var a = demoArray[selection];
	
	demoArray.splice(selection,1);
	
	var idx = demoArray.indexOf("염소");
	
	demoArray.splice(idx,1);
	
	if(demoArray[0] == "차"){
		q +=1;
	}
	i++;
	};
	
	console.log(q);
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
	
	var a = ['000','009','010','010.1','012','019']
	
	a.sort();
	
}

var btns ;
/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	btns = new cpr.controls.Container();
	
	var flows = new cpr.controls.layouts.FlowLayout();
	
	flows.horizontalAlign = "center";
	flows.verticalAlign = "middle";
	flows.lineWrap = false;
	flows.scrollable = false;
	flows.spacing = 12;
	flows.topMargin = 36;
	flows.rightMargin = 0;
	flows.bottomMargin = 48;
	flows.leftMargin = 0;
	
	btns.setLayout(flows);
	
	
//	for(var i = 0 ; i < 0 ; i++) {
		
		var btt = new cpr.controls.Button();
		btt.value = "Zzz";
		
		btns.addChild(btt, {
				width: "6px",
				height: "6px",
				autoSize: "both"
		});
//	}
	
	app.lookup("grp1").floatControl(btns);
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
	
//	btns.getParent().floatControl(btns,{
////	"width" : "100px",
////	"height":"100px",
//	"top" : "200px",
////	"left":"0px"	
//	});
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
	var a = [];
	
//	app.lookup("sms1").addParameter("header", {
//		
//		"a" : "123",
//		"b" : "zzz"
//	});
//	app.lookup("sms1").send();

	console.log(a.indexOf("abc"));
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
	
}


/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrp2Scroll(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp2 = e.control;
}


/*
 * 그룹에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onGrp2Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp2 = e.control;
	console.log("ㅋㅋ");
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
	
	var tre = app.lookup("tre1");
	var item =tre.getItem(2);
	tre.selectItem(item);
	
	var paren = item.parentItem;
	while(paren){
		tre.expandItem(paren);
		paren = paren.parentItem;
	}
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
	
}
