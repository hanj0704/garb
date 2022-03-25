/************************************************
 * tester.js
 * Created at 2021. 11. 29. 오후 1:05:43.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var a = "2021-11-29 15,11,21,098";
	
	var b = new Date(a);
	console.log(b);
	console.log(b.toDateString());
	
	var ex = /[^0-9\s\-]/g;
	var c = a.match(ex);
	c = _.uniq(c);
	
	console.log(c);
	
	console.log(a.replace(ex, ":"))
}

/**
 * 
 * @param {String} a
 * @param {String} b
 */
function check1(a,b){
	
	var reg = new RegExp(a);
	reg.global = true;
	console.log(reg);
	console.log(b.match(reg));
	app.lookup("opt2").value = b.match(reg);
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
	check1(ipb1.value,app.lookup("ipb2").value);
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb2ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb2 = e.control;
	check1(app.lookup("ipb1").value,ipb2.value);
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
	
	app.lookup("ipb3").value = "가하하하";
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
	
	var a = false && true;
	
	console.log(a);
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
	
	console.log(app.getContainer().getAllRecursiveChildren());
	console.log(app.isEmbeddedAppInstance());
	app.getContainer().isFloated();
	
	app.lookup("grp1").getAllRecursiveChildren()
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	app.getContainer().floatControl(app.lookup("btn5"),{
		left : "0px",
		top : "0px",
		width : "100px",
		height : "20px"
	});
	
	app.floatControl(app.lookup("btn8"),{
		left : "100px",
		top : "0px",
		width : "100px",
		height : "20px"
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
	
//	console.log(app.getContainer().getAllRecursiveChildren());
//	console.log(app.getFloatingControls());
	var child = app.getContainer().getAllRecursiveChildren();
	
	var rect = app.getContainer().getViewPortRect();
	console.log(rect.top);
	var a = child.reduce(function(a, b){
		var aRect = a.getActualRect();
		var bRect = b.getActualRect();
		return Math.abs(aRect.top) < Math.abs(bRect.top) ? a : b;
	});
	console.log(a);
	
}

function findClosest(){
	
	var floatingControls = app.getFloatingControls();
	
	if(floatingControls.length > 0) {
		
		var first = floatingControls.shift();
		if(first instanceof cpr.controls.Container) {
			return first.getChildren()[0];
		}
	}
}


function getSuperRecursive(){

	var vaFinalChild = [];
	var vaChilds = app.getContainer().getAllRecursiveChildren();
	
	vaChilds.forEach(function(each){
		
		if(each instanceof cpr.controls.EmbeddedApp) {
			
			var voTempAps = each.getEmbeddedAppInstance();
			var vaTempChild = voTempAps.getContainer().getAllRecursiveChildren();
			vaTempChild.forEach(function(eachT){
				vaFinalChild.push(eachT);
			});
		} else {
			
			vaFinalChild.push(each);
		}
	});

	return vaFinalChild;
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
	
	console.log(btn8.getActualRect());
	console.log(btn8.getOffsetRect());
}


/*
 * "DATE" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	/** @type String */
	var vsDateStr = "2021-11-12 11-11-33";
	var vsDateRegExp = /[^0-9\s\-]/g;
	var vaResult = vsDateStr.match(vsDateRegExp);
	if(vaResult != null && vaResult.length > 0) {
		vaResult.forEach(function(each){
			vsDateStr =vsDateStr.replace(each, ":");
		});
	}
	var dater = new Date(vsDateStr);
	console.log(dater);
}


/*
 * "rect" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
//	console.log(btn10.getActualRect());
//	console.log(cpr.core.Platform.INSTANCE.getAllLoadedApps());
//	console.log(cpr.core.Platform.INSTANCE.getAllRunningAppInstances());
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
	
	console.log(app.lookup("aa").value);
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
	
	
	app.lookup("cal1").values  = ["zz",null];
	console.log(app.lookup("cal1").values);
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
	
	console.log(app.lookup("cal1").values);
}

/*
 * "join" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	var a = ["",""];
	console.log(a.join(","));

}


/*
 * "moment hour" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn15 = e.control;
	var a = "YYYY-MM-DD HH:mm:ss";
	
	var mo = moment().format(a);
	var mo2 = moment(mo,a);
	console.log(mo2);
	console.log(mo2.hour());
}


/*
 * "Button" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn17 = e.control;
	console.log(app.lookup("dti1").displayText);
	console.log(app.lookup("dti1").value);
	console.log(app.lookup("dti1").dateValue);
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
	
	app.lookup("dti1").visible = !app.lookup("dti1").visible;
}


/*
 * 인풋 박스에서 clear 이벤트 발생 시 호출.
 * 인풋박스에서 esc키 또는 클리어버튼을 클릭하여 인풋의 값이 Clear될때 발생하는 이벤트
 */
function onIpb4Clear(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb4 = e.control;
	
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
	
	var a = [1,2,3,4];
	
	console.log(a[6]);
	var b = a[6];
	
	console.log(b== null);
	console.log(b == "");
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
	
	var a = "adsd";
	var tim = new Date(a);
//	console.log(tim);
//	console.log(typeof tim);
//	console.log(tim == "Invalid Date");
	console.log(isNaN(tim.valueOf()))
}


/*
 * "Button" 버튼(btn20)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn20Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn20 = e.control;
	var ds = app.lookup("ds1");
	
	var a = ds.findAllRow("true");
	
	console.log(a);
	a.forEach(function(each){
		console.log(typeof each);
		console.log(each);
	});
	ds.getRowDataRanged().forEach(function(each){
		console.log(typeof each);
		console.log(each);
	});
//	a.forEach(function(each){
//		each.
//	});
}




/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트.
 */
function onIpb5Keyup(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb5 = e.control;
	
	
	
}


/*
 * "Button" 버튼(btn21)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn21Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn21 = e.control;
	var CK  = new cpr.events.CKeyboardEvent("keyup",{
		key : "e",
	});
	
	app.lookup("ipb5").dispatchEvent(CK);
}


/*
 * "Button" 버튼(btn22)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn22Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn22 = e.control;
	
	var a= encodeURI("한진");
	var b = unescape("%ED%95%9C%EC%A7%84");
	console.log(a);
	console.log(b);
}
var chartNeededProp = {
	
	"bar" : {
		property : ["grid","xAxis","yAxis","tooltip","series"]
	},
	"line" : {
		property : ["grid","xAxis","yAxis","tooltip","series","dataZoom"]
	},
	"scatter" : {
		property : ["xAxis","yAxis","series"]
	},
	"pie" : {
		property : ["title","tooltip","legend","series"]
	}
}
function abc(){
	return chartNeededProp["bar"].property;
}

var avc = {
	"A" : []
}

function ges(){
	
	return JSON.parse(JSON.stringify(avc["A"]))
}
/*
 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	var b = abc();
	
	b.push("ASDASD");
	console.log(b);
	console.log(chartNeededProp);
	console.log(ges());
	var c = [];
	
	console.log(JSON.stringify(c))
}


/*
 * "func to str" 버튼(btn23)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn23Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn23 = e.control;
	
	console.log(JSON.stringify(ges));
}


/*
 * "Button" 버튼(btn24)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn24Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn24 = e.control;
	
	var file = app.lookup("fi1").files;
	
	var sms = app.lookup("sms1");
	
	file.forEach(function(each,idx){
		
		sms.addFileParameter("file_"+idx, each);
	});
	
	sms.send();
}


/*
 * 서브미션에서 submit-upload-progress 이벤트 발생 시 호출.
 * multipart/form-data 일 때 서버로 일정 크기의 데이터를 전송했을 때 발생합니다. 하나의 요청에 대해 여러 번 발생할 수 있습니다.
 */
function onSms1SubmitUploadProgress(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	console.log("UPLOAD PROGRESS");
	console.log(e.loaded);
	console.log(e.total);
}

cpr.core.NotificationCenter.INSTANCE.subscribe("app-msg", this, function(poMsgInfo){
	
	console.log(poMsgInfo);
	var a= ValueUtil.isNull(poMsgInfo["DELAY"]);
	console.log(a);
	var vcs = app.lookup("noti");
	var vnDe = poMsgInfo["DELAY"];
	var vsMsg = poMsgInfo["MSG"];
	console.log(vnDe);
	console.log(typeof vnDe);
	vcs.infoDelay = vnDe;
	vcs.delay = vnDe;
	vcs.info(poMsgInfo["MSG"]);
	vcs.notify(vsMsg);
});

/*
 * "delayTest" 버튼(btn26)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn26Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn26 = e.control;
	var voTest  = {};
	voTest.DELAY = 1000;
	voTest.TYPE = "뮤";
	voTest.MSG = "쿄쿄쿄쿄쿄";
	cpr.core.NotificationCenter.INSTANCE.post("app-msg", voTest);
}


var mcBtn = null;
/*
 * "float1" 버튼(btn27)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn27Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn27 = e.control;
	if(!(mcBtn instanceof cpr.controls.Button))
	mcBtn = new cpr.controls.Button();
	
	app.floatControl(mcBtn,{
		"left" : "500px",
		"top" : "500px",
		"width" : "100px",
		"height" : "30px"
	});
}
/*
 * "float2" 버튼(btn28)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn28Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn28 = e.control;
	app.floatControl(mcBtn,{
		"left" : "700px",
		"top" : "500px",
		"width" : "100px",
		"height" : "30px"
	});
	
	app.getContainer().redraw();
}


/*
 * "Button" 버튼(btn29)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn29Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn29 = e.control;
	
	
	var ds = app.lookup("ds1");
	var a = ds.getRow(1);
}


/*
 * "null병합" 버튼(btn30)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn30Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn30 = e.control;
	
	var a = 1;
	var b = 2;
	
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
	
	var grp = app.lookup("grp3");
	
	console.log(grp.getActualRect());
	console.log(grp.getContentPaneRect());
	
}


/*
 * "Button" 버튼(btn33)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn33Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn33 = e.control;
	
	app.lookup("sms2").send();
	
//	app.lookup("sms2").parameter
}


/*
 * "Button" 버튼(btn34)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn34Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn34 = e.control;
	
	var ha = app.lookup("ha");
	
	
	console.log(ha instanceof cpr.controls.UDCBase);
}


/*
 * "Button" 버튼(btn35)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn35Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn35 = e.control;
	
	console.log(isNaN(1));
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd2SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
	
}


/*
 * "float and openDLaig" 버튼(btn36)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn36Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn36 = e.control;
	
	
}


/*
 * "Button" 버튼(btn37)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn37Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn37 = e.control;
	
	var grd = app.lookup("grd2");
	grd.getExportData({
		exceptStyle : true,
		applyFormat : true,
		excludeCols : [cellIndex]
	})
//	var a = grd.getFilter();
//	grd.filter(a + "&& getIndex() != 2");
}


/*
 * "Button" 버튼(btn38)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn38Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn38 = e.control;
	var grd = app.lookup("grd2");
	grd.filter("column1 > 4");
	grd.redraw();
}


/*
 * 캘린더에서 value-change 이벤트 발생 시 호출.
 * Calendar의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCal1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Calendar
	 */
	var cal1 = e.control;
	var va = e.newValue;
	var a = moment(va,"YYYYMMDD");
//	console.log(a.week());
//	console.log(a.week() - a.startOf("month").week() + 1);
//	console.log(moment().startOf('month').week());
	var df = a.week() - a.startOf("month").week()+1;
	df = df == -47 ? 5 : df;
	console.log(df);
	console.log(e.newValue);
//	var vara = moment.duration(a.diff(moment("20210101","YYYYMMDD"))).asDays();
//	console.log(moment.duration(a.diff(moment("20210101","YYYYMMDD"))).asDays());
////	console.log(a.weekday());
////	console.log(a.weeks()%7);
//	var b = moment("20200101","YYYYMMDD");
////	console.log(b);
//	console.log(b.add(vara, "day").format("YYYYMMDD"));
}


/*
 * "Button" 버튼(btn39)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn39Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn39 = e.control;
	
	var a = moment("20200608","YYYYMMDD");
	var b = moment("20190610","YYYYMMDD");
	
	console.log(moment.duration(a.diff(b)).asDays())
}


/*
 * "send" 버튼(btn40)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn40Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn40 = e.control;
	app.lookup("sms3").send();
}
