/************************************************
 * Untitled.js
 * Created at 2022. 1. 17. 오후 2:47:02.
 *
 * @author HANS
 ************************************************/

cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getHas", function(psValue){
	/** @type String */
	var vsValue = psValue;
	
	vsValue.replace("전체,", "");
});
var hansTuner = createTreecellTuner(app.lookup("dsMenu"), "MN_LABEL", "MN_VALUE", "PARENT","LEVEL","LEVEL_SORT_COL");
	
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	console.log("ㅎ허");
	
	var cal = app.lookup("cal1");
	
	cal.putValues(["20220313","20220117"]);
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
	
	console.log(app.lookup("cal1").values)
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
	
	
	var grd = app.lookup("grd1");
	
	var a = grd.getHeaderCellIndices(2);
	console.log(a);
}


var start = null;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	app.lookup("cmb1").getItems().forEach(function(each){
//		each.row.setAttr("HH", "HEY");
//	});
//	app.lookup("subMenuList").send().then(function(input){
//		var hansTuner = createTreecellTuner(app.lookup("dsMenu"), "MN_LABEL", "MN_VALUE", "PARENT","LEVEL","LEVEL_SORT_COL");
//		hansTuner.getTreeData();
//		app.getContainer().redraw();
//	});
//	app.lookup("subList").send();
//		 start = moment();
//		console.log(start.format("YYYY-MM-DD HH:mm:ss"));
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
//	app.getContainer().redraw();
//	var hansTuner = createTreecellTuner(app.lookup("ds1"), "label", "value", "parent","LEVEL","LEVEL_SORT_COL");
//		hansTuner.getTreeData();
//		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
//			var end = moment();
//			console.log(end.format("YYYY-MM-DD HH:mm:ss"));
//			
//			console.log(moment.duration(end.valueOf()-start.valueOf()).asSeconds());
//		});
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
	app.lookup("tre1").getItems().forEach(function(each,idx){
		console.log(idx + " : "+ each.row.getIndex());
		console.log(each.row.getRowData())
		console.log(each.depth);
	});
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var tre = app.lookup("tre1");
	calculateIndex(tre);
	
}


/**
 * 
 * @param {cpr.controls.Tree} pcTree
 */
function calculateIndex(pcTree){
	var vcTre = pcTree;
	var vaItems = vcTre.findItems({depth : 0})
	console.log(vaItems);
	var vnGlobalIndex = 0;
	vaItems.forEach(function(each){
		each.row.setValue("LEVEL_SORT_COL", vnGlobalIndex);
		vnGlobalIndex++;
		each.row.setValue("LEVEL", each.depth+1);
		var vaChildren = each.children;
		if(vaChildren.length > 0) {
			
		}
	});
}

var sortIdx = 0;
function hanItems (/*cpr.controls.TreeItem[]*/paTreeItems){
		
	paTreeItems.forEach(function(each,idx){
		var eachRow = each.row;
		eachRow.setValue("LEVEL", each.depth+1);
		eachRow.setValue("LVEVL_SORT_COL", sortIdx);
		eachRow.setValue("label", eachRow.getValue("label")+"z")
		sortIdx = sortIdx + 1;
		var vaChildren = each.children;
//		
		if(vaChildren.length > 0) {
			hanItems(vaChildren);
		}
	})
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
	
	var tre2 = app.lookup("tre2");
	var localStart = moment();
	console.log(localStart.format("YYYY-MM-DD HH:mm:ss"));
	
//	var Prom = new Promise(function(resolve,reject) {
		var vas = tre2.findItems({depth : 0});
		hanItems(vas);
//		tre2.getItems().forEach(function(each,idx){
//			
//			each.row.setValue("LEVEL",each.depth+1);
//			each.row.setValue("LEVEL_SORT_COL", sortIdx);
//			sortIdx +=1;
//			each.row.setValue("label",each.row.getValue("label")+"ㅋ");
////			if(idx == tre2.getItems().length-1) {
////				resolve();
////			}
//		});
//	});
//	Prom.then(function(input){
		console.log(sortIdx);
		sortIdx = 0;
		var localEnd = moment();
		app.getContainer().redraw();
		console.log(localEnd.format("YYYY-MM-DD HH:mm:ss"));
		console.log(moment.duration(localEnd.valueOf()-localStart.valueOf()).asSeconds());
//	});
	
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
	
	var hansTuner = createTreecellTuner(app.lookup("dsMenu"), "MN_LABEL", "MN_VALUE", "PARENT","LEVEL","LEVEL_SORT_COL");
	hansTuner.getTreeData();
//	console.log(app.lookup("dsMenu").getRowDataRanged());
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
	var maxLength = 300;
	var a = []
	for(var i = 0 ;  i < maxLength; i++) {
		var ramdomNum = Math.round(Math.random());
		var temp = {"label":"label"+i,
					"value":"value"+i,
					"parent" : ""}
		console.log(ramdomNum);
		if(ramdomNum == 1) {
			
			var parentHoobo = a.map(function(each){
				return each["value"];
			});
			var parentNum = Math.round(Math.random() * a.length);
			
			temp.parent = parentHoobo[parentNum];
		}
		a.push(temp);
	}
	console.log(a);
	app.lookup("ds2").build(a);
	app.lookup("tre2").redraw();
//	var hansTuner = createTreecellTuner(app.lookup("ds2"), "MN_LABEL", "MN_VALUE", "PARENT","LEVEL","LEVEL_SORT_COL");
//		hansTuner.getTreeData();
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
	app.lookup("subSave").send();
}





/*
 * "send" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	//	app.lookup("subList").send();
		 start = moment();
		console.log(start.format("YYYY-MM-DD HH:mm:ss"));
	app.lookup("subList").send().then(function(input){
		app.getContainer().redraw();
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
			var end = moment();
			console.log(end.format("YYYY-MM-DD HH:mm:ss"));
			
			console.log(moment.duration(end.valueOf()-start.valueOf()).asSeconds());
		});
	});
}


/*
 * "조회후 tune" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	app.lookup("subList").send().then(function(input){
		var hansTuner = createTreecellTuner(app.lookup("ds1"), "label", "value", "parent","LEVEL","LEVEL_SORT_COL");
		hansTuner.getTreeData();
	});
}


/*
 * "action변경" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	var vsLength = app.lookup("nbe2").value;
	app.lookup("subList").action = "data/com/JsonFile"+vsLength+".json"
}

var globArr = [];

/*
 * "array10000push" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	for(var i = 0 ; i < 10000; i++) {
		globArr.push(i);
	}
	console.log("zz");
}


/*
 * "10000forEach" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	var glo1 = moment();
	console.log(glo1.format("HH:mm:ss"));
	new Promise(function(resolve,reject){
		
	globArr.forEach(function(each,idx){
		each = each+1;
		if(idx == globArr.length-1) {
			resolve();
		}
	});
	}).then(function(input){
		console.log(globArr);
			var glo2 = moment();
			console.log(glo2.format("HH:mm:ss"));
			console.log(moment.duration(glo2.valueOf()-glo1.valueOf()).asSeconds());
	});
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx1 = e.control;
	
	app.lookup("tre2").redraw();
	app.lookup("grd1").redraw();
}
