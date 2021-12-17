/************************************************
 * testest.js
 * Created at 2021. 7. 14. 오후 5:00:55.
 *
 * @author HANS
 ************************************************/

/**
 * 지정한 개수만큼 앞에 자동으로 0을 채워넣습니다.
 * @param {Number} width
 * @param {String} str
 */
function fillZero(width, str){
    return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;//남는 길이만큼 0으로 채움
}

window.addEventListener("close", function(e){
	console.log("케케케");
});
window.addEventListener("beforeunload", function(e){
	console.log("ㅋㅋㅋㅋㅋ");
})

cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getSlotInfo", function(poBindInfo){
	
	
	var voReturn = null;
	var vcCtrl = null;
	if(poBindInfo instanceof cpr.bind.DataMapContext) {
		
		vcCtrl = poBindInfo.dataMap;
		
		if(vcCtrl.id.indexOf("LP") != -1) {
			//LOADPORT DATAMAP
			
		}
	}
//	/** @type cpr.data.DataCollection */
//	var vcCtrl = app.lookup(psCtrl);
//	
//	if(vcCtrl) {
//		
//		
//		if(vcCtrl.id.indexOf("LP") == -1) {
//			
//		} else {
//			
//			
//		}
//	}
//	
//	return voReturn;
})

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
}

//window.onbeforeunload = function(){
//	console.log("ㅋㅋ");
//	this.open("http://naver.com");
//}

/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
	console.log("타긴하냐>?");
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
	
	var a = app.lookup("opt1").getBindContext();
	var b = a.evaluate("getSlotInfo(this)");
	console.log(b);
}


/*
 * "regular express" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	var opt2 = app.lookup("opt2").value;
	var finder = /Wfr\d+No/;
	var a= opt2.match(finder);
	console.log(a);
}


/*
 * "Array reg exp" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var dmA = app.lookup("dmChAClusterInfo").getColumnNames();
	 dmA = dmA.filter(function(each,idx){
		if(each.match(/WfrNo/) != null) {
			return each;
		}
	});
	
	console.log(dmA);
}




/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	app.getContainer().redraw();
}


/*
 * "udc 에 바인딩시켜보기" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	app.lookup("hanSlot").creater(app.lookup("dm2"));
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
	zpzpzp();
}

function zpzpzp() {
	app.lookup("btn7").addEventListenerOnce("click", function(){
		
		console.log("did you miss me?");
		zpzpzp();
	})
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
	
	console.log("ㅋㅋ");
}


/*
 * "udc app title 찾기" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	
	console.log(app.lookup("hanSlot").app.title);
}


/*
 * "Button" 버튼(btn10)에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onBtn10Contextmenu(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
	e.preventDefault();
	
	alert("ㅋㅅㅋ");
}


/*
 * "classTest" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
	btn11.style.addClass("aaaa");
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	console.log("ㅁㅁㅁ");
}


/*
 * "load dispatch" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn12 = e.control;
	
	var newEv = new cpr.events.CEvent("load");
	
	app.dispatchEvent(newEv);
	
	app.lookup(id);
	
	var vas = cpr.core.Platform.INSTANCE.getAllRunningAppInstances().filter(function(each){
		return !each.isUDCInstance();
	});
	
	vas.forEach(function(each){
		var vaKeys = Object.keys(stomp.subscriptions);
		
		if(vaKeys.indexOf(each) != null) {
			
			
		}
	});
}


/*
 * "Button prop test" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	''/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
	
//	var a = cpr.controls.Button;
//	var b = new cpr.controls.Button();
//	console.log(Object.getOwnPropertyNames(b));
//	console.log(Object.getOwnPropertyNames(a));
//	var a = btn13.constructor.bind(null);
	
//	console.log(a);
	
	console.log(Object.getOwnPropertyNames(btn13.valueOf()));
	var a = Object.create(btn13);
	console.log(btn13.propertyIsEnumerable("value"));
	
	app.getContainer().addChild(a, {
		width: "100px",
		height :"100px"
	});
}
