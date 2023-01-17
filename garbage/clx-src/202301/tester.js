/************************************************
 * tester.js
 * Created at 2023. 1. 2. 오전 11:16:57.
 *
 * @author HANS
 ************************************************/

exports.callerMan = function(){
	console.log("하하");
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var ea = app.lookup("ea1");
	cpr.core.App.load("202212/tester4", function(loadedApp){
		ea.app = loadedApp;
		
	});
	
	app.lookup("btn2").getParent().reorderChild(app.lookup("btn2"), 300);
	
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
//	var btn1 = e.control;
//	var parent = app.lookup("btn1").getParent();
//	
//	var btn = new cpr.controls.Button();
//	
//	btn.value = "zz";
//	
//	parent.insertChild(parent.getChildren().length,btn, {
//		"width" : "100px",
//		"height": "25px"
//	});
//	app.lookup("btn2").getParent().reorderChild(app.lookup("btn2"), 300);
	console.log(app.lookup("grp1").getViewPortRect());
	console.log(app.lookup("btn3").getActualRect());
	console.log(app.lookup("btn3").getOffsetRect());
	console.log(app.lookup("btn3").getActualRect(true));
	console.log(app.lookup("btn3").getOffsetRect(true));
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
//	var ms = app.lookup("msm1");
//	ms.addRequestData(path, data);
	var a = "확정이율기간 재설정 내역조회";
	console.log(a.replace(/[\s]/g, ""))
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(e){
	var fi1 = e.control;
	
	console.log("valuechange");
	console.log(fi1.file);
}

/*
 * 파일 인풋에서 clear 이벤트 발생 시 호출.
 * FileInput의 클리어버튼을 클릭하여 값이 Clear될때 발생하는 이벤트
 */
function onFi1Clear(e){
	var fi1 = e.control;
	
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	var ea = app.lookup("ea1");
	cpr.core.App.load("202301/initTest", function(loadedApp){
		
		ea.app = loadedApp;
		ea.initValue = {
			"zz" : "zzz"
		}
//		ea.heyMan = false;
		ea.setAppProperty("heyMan", false);
		ea.ready(function(apps){
			console.log("임베디드앱의 ready 함수입니다.");
			var q = apps.hasAppMethod("init");
			if(q){
				apps.callAppMethod("init");
			}
		});
		ea.addEventListener("app-ready", function(e){
			console.log("앱레디함수가 수행됩니다");
		});
		
	});
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	/** @type cpr.core.App */
	var q= cpr.core.Platform.INSTANCE.lookup("202301/tester");
	console.log(q);
	
	cpr.core.Platform.INSTANCE.getAllRunningAppInstances().find(predicate, thisArg)
}

/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	console.log(app.lookup("msm1") instanceof cpr.protocols.AbstractSubmission);
	app.lookup("msm1").send();
}

/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
	
	app.lookup("sms1").send();
}

/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(e){
	var btn8 = e.control;
	var a = [1,2,3,4,5];
	
	for(var q of a) {
		console.log(q);
	}
}

var q = null;
/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(e){
	var btn9 = e.control;
	
	q = window.open("./202301/index.html", "_blank","width=500,height=500");
	
	window.addEventListener("message", function(e){
		console.log(e);
	});
}

/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(e){
	var btn10 = e.control;
		q.postMessage("zz", "*");
}
