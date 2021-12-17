/************************************************
 * tester.js
 * Created at 2021. 8. 27. 오전 10:28:29.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var a = "abc";
	var b = a.split("").join("/");
	console.log(b);
}


/**
 * 
 * @param {String} pString
 * @param {String} ps2
 */
exports.hanExps = function(pString,ps2){
	if(ps2=="PM"){
		
	var regEx = /[A-Z]\d*/g;
	
	var res = pString.match(regEx);
		
	console.log(res);
	console.log(res.join("/"));
	return '"'+res.join("/")+'"';

	}else{
		return '"'+pString+'"';
	}
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
	app.lookup("opt2").redraw();
//	console.log(app.lookup("opt1").value);
}


/*
 * "regExp" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	var opt2 = app.lookup("opt2").value;
	console.log(opt2);
	var regExp = /[A-Z]\d*/g;
	
	console.log(regExp.test(opt2));
	console.log(opt2.match(regExp));
	
}



/*
 * "consol ipb" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	console.log(ValueUtil.fixNull(app.lookup("ipb1").value));
}


/*
 * "insert" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("grd1").insertRowData(5, false, {
	"value" : "Align",
	"column3" : "Column33"
	})
}


/*
 * "console row" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	console.log(ValueUtil.fixNumber("zz"));
}


/*
 * "getRow -1" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	console.log(app.lookup("grd1").getRow(-1));
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
	
	app.openDialog("202109/popup", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		
		console.log(returnValue)
	});
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
//	var a = new cpr.events.CKeyboardEvent("keydown",{
//		content : {
//			"key" : "q"
//		},
//		userData :{
//			"key" : "q"
//		},
//		"key" : "q"
//	});
//	console.log(a);
	
	var keyd = new KeyboardEvent("keydown",{"key" : "k"});
	var ipb = app.lookup("ipb1");
	
	var qr = document.querySelector("*[data-usr-" + "han" + "='" + "jin" + "']");
	
	/** @type HTMLElement */
	var chqr = qr.childNodes[0];
	var ip = chqr.childNodes[0];
	ip.dispatchEvent(keyd);
	
//	console.log(keyd);
//	app.lookup("ipb1").dispatchEvent(a);
	
}


/**
 * 
 * @param {String} str
 * @param {Number} index
 * @return {String[]}
 */
function divi(str, index){
	
	var len = str.length;
	
	var resu = [];
	
	resu.push(str.slice(0, index));
	resu.push(str.slice(index,len));
	
	return resu;
	
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
	
	var ipb = app.lookup("ipb1");
	
	var a= ipb.getSelection().start;
	var val = ipb.value;
	
	var di = divi(val,a);
	var hakk = "aabbcc";
	
	var b = di[0];
	var fo = b.length + hakk.length;
	
	
	ipb.value = di.join(hakk);
	ipb.setSelection({start:fo,end:fo});
}


/*
 * "run" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	console.log(app.getHost());
	app.close();
	app.run(app.getHost(),function(aps){
		console.log("ㅋㅅㅋ");
	});
}

	var a = "2021-09-08 16:03:18";
/*
 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
	
	console.log(a);
	var b = moment(a).add(1, "second").format("YYYY-MM-DD HH:mm:ss");
	a = b;
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
	
	b(abab,"bbb");
}


function abab(aa){
	
	console.log(aa);
}

/**
 * 
 * @param {Function} poCallBack
 */
function b(poCallBack,bb) {
	
	if(poCallBack) {
		poCallBack(bb);
//		poCallBack.call(null, bb);
	}
}

/*
 * "exec" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
	
	var vsEx = /[0-9]+/;
	var vsText = "LP123";
	console.log(vsText.match(vsEx));
	console.log(vsText.search(vsEx));
	console.log(vsEx.exec(vsText));
}


/*
 * "Button" 버튼(btn14)에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onBtn14Mouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	
	e.preventDefault();
	e.stopPropagation();
}


/*
 * "Button" 버튼(btn14)에서 mousemove 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 이동할 때 발생하는 이벤트.
 */
function onBtn14Mousemove(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	e.preventDefault();
	e.stopPropagation();
}
// 최대공약수
function gcd(minNum, maxNum){
  return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
}

/*
 * "gcd" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn15 = e.control;
	
	console.log(gcd(1000000,3000000));
}


/*
 * "filter1" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	cpr.core.App.load("202109/filter1", function(loadedApp){
		
		app.lookup("ea1").app =loadedApp;
	});
}


/*
 * "filter2" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	cpr.core.App.load("202109/filter2", function(loadedApp){
		
		app.lookup("ea1").app =loadedApp;
	});
	
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	console.log("ㅋㅋ");
//	var expUd = new udc.aaa.expUd();
	
//	expUd.newProperty3 = "aq";
}
/*
 * 캘린더에서 item-click 이벤트 발생 시 호출.
 * Calendar의 아이템을 클릭 할 때 발생하는 이벤트. relativeTargetName, item을 통해 정보를 얻을 수 있습니다.
 */
function onCalendarItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Calendar
	 */
	var calendar = e.control;
	
	console.log(e.item.value);
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	
	app.lookup("grd1").getViewingStartRowIndex()
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
	app.lookup("grp7").getParent().updateConstraint(app.lookup("grp7"), {
		width : "800px"
	});
}


/*
 * "sl" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var a = "abcdef";
	console.log(a.split("cd"));
	console.log(a.slice(0, 4));
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
	console.log(app.lookup("ds1").getHeaders());
	console.log(app.lookup("dm1").getHeaders());
	console.log(app.lookup("dm1").getColumnNames());
	console.log(app.lookup("ds1").getColumnNames());

}

/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	console.log(window.navigator.userAgent);
}


/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
	
	app.openDialog("202109/verticalTest", {left : 400, top : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}
