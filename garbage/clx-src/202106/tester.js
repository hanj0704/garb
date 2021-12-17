/************************************************
 * tester.js
 * Created at 2021. 6. 1. 오후 1:30:08.
 *
 * @author HANS
 ************************************************/


cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getChamberWaferName", function(evev){
	
	console.log(evev);
});


//	var util = createCommonUtil();
var a = 0 ;
var b = 0;
var c = 0;
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	if( a == 0 && b == 0){
		a = moment().valueOf();
	}
	 else if(a != 0 && b == 0) {
	 	
	 	b = moment().valueOf();
	 } else {
	 	c = moment.duration(b-a)/1;
	 	
	 }
	 if(c != 0) {
	 	
		 console.log(c);
	 }
	 
}
var q ;

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	
	q = setInterval(function(args){
		app.lookup("btn1").click();
	}, 1000)
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
	clearInterval(q);
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
	
	
	app.lookup("sms1").send();
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
	
	var a = fi1.file;
	var b = new FileReader();;
	
	app.lookup("sms1").addFileParameter("FI1", a);
	
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
	
	
	var dm = app.lookup("dm1");
	dm.setValue("AA_BB","A");
	dm.setValue("AAA__BBB","N");
	dm.setValue("column3","C");
	dm.setValue("column4","D");
	dm.setValue("column5","E");
	dm.setValue("column6","F");
	
	app.lookup("ud1").binders();
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
	
	var dm = app.lookup("dm1");
	dm.setValue("AA_BB","B");
	dm.setValue("AAA__BBB","C");
	dm.setValue("column3","D");
	dm.setValue("column4","E");
	dm.setValue("column5","F");
	dm.setValue("column6","G");
	
	app.lookup("ud1").binders();
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
	console.log("TMC.Simlop.sim_LP2_MPLine1".toLowerCase());
	console.log("TMC.SimIop.sim_LP2_MPLine2".toLowerCase());
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	var a = "AAA__BBB";
	
	var  b = a.replace("__", ".");
	
	console.log(b);	
}


/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	var ds = app.lookup("ds1");
	
	var a =ds.getHeader("A.B");
	console.log(a.getName());
	console.log(a.getColumnType());
	console.log(a.getDataType());
	a.userAttr("abc","zzz");
	console.log(a.userAttr("abc"));
	a.setInfo("dpqpqp");
	console.log(a.getInfo());
	
	console.log(ds.getRowDataRanged());
	ds.forEachOfUnfilteredRows(function(dataRow){
		console.log(dataRow.getValue("A.B"));
		console.log(dataRow.getValue("C.D"));
		console.log(dataRow.getNumber("C.D"));
	});
	
	console.log(ds.isDisplayColumn("A.B"));
	console.log(ds.isExistColumn("A.B"));
	console.log(ds.getMax("getValue('C.D')"));
	console.log(ds.getMin("C.D"));
	console.log(ds.getMax("column1"));
	console.log(ds.getMin("column1"));
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
	
	var ds = app.lookup("ds1");

	var a = ds.findAllRow("C.D > 2");
	console.log(a);
	
	var b = ds.findAllRow("getValue(\"C.D\") > 3");
	console.log(b);
	
	var c = ds.findAllRow("\"C.D\" > 3");
	console.log(c);
	
	var d = ds.findAllRow("Number(\"C.D\") > 2");
	console.log(d);
	
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
	var dm = app.lookup("dm2");
	
	console.log(dm.getValue("E.R"));
	
	
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
//	util.Msg.alert("zzz");
	console.log("ㅋㅋ");
}


/*
 * "Button" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn18 = e.control;
	
	
	app.getContainer().redraw();
}


/*
 * "Button" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn19Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn19 = e.control;
	
//	console.log(isNaN(0));
//	console.log(isNaN(1));
//	console.log(isNaN("true"));
//	console.log(isNaN("false"));
//	console.log(isNaN());
//	console.log(isNaN(undefined));
//	console.log(isNaN(null));
	console.log(Boolean(0));
	console.log(Boolean(1));
	console.log(Boolean("true"));
	console.log(Boolean("false"));
	console.log(Boolean(undefined));
	console.log(Boolean(null));
	console.log("ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ");
	console.log(!!0);
	console.log(!!1);
	console.log(!!"true");
	console.log(!!"false");
	console.log(!!undefined);
	console.log(!!null)
}


/*
 * "Button" 버튼(btn27)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn27Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn27 = e.control;
	window.close();
}



//setTimeout(function(){
//		window.close();
//	} ,2000)


/*
 * "Button" 버튼(btn29)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn29Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn29 = e.control;
	
	var aqq = app.getContainer().getChildren().filter(function(each){
		return each.userAttr("isHan") =="Y"
	});
	console.log(aqq);
}


/*
 * "tester" 버튼(btn28)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn28Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn28 = e.control;
	console.log(app.lookup("btn30").getActualRect());
}


/*
 * "Button" 버튼(btn31)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn31Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn31 = e.control;
	
	var q = {};
	var a = "";
	
	for(var i = 1 ; i <= 900 ; i++) {
		var res = 'app.lookup("sub'+i+'").send();\n'
		a += res;
	}
	
	console.log(a);
//	q["aa"] = a;
//	
//	console.log(JSON.stringify(q));
}
