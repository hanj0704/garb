/************************************************
 * tester.js
 * Created at 2022. 11. 30. 오후 5:41:10.
 *
 * @author HANS
 ************************************************/

var mod = cpr.core.Module.require("202212/moduleName");
exports.heyFunc = function(){
	
	alert("HELLo");
}
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
//	var btn1 = e.control;
//	var ea1 = app.lookup("ea1");
//	//임베디드 앱에 불러와진 앱의 인스턴스 객체가 담겨있음. 이 케이스에서는 son 화면의 앱인스턴스가 담김
//	var ins = ea1.getEmbeddedAppInstance();
//	
//	ins.callAppMethod("childFunc");
//	ins.callAppMethod("testFunc2");
	app.lookup("mdi1").addItemWithApp("202212/son");
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var voExp = new cpr.expression.Expression("'tooltip'").evaluate();
	console.log(voExp);
	console.log(typeof voExp);
	
	app.lookup("opt1").displayExp = voExp;
	//'tooltip'
	
}
exports.test = function(self){
	var q = new cpr.expression.Expression("this.tooltip").evaluate(self);
	console.log(q);//'가가가'
	console.log(typeof q);//string
	return q;//'가가가'
}
function test2(){
	return "value";
}
/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
//									test(app.lookup("opt1"))
	app.lookup("opt1").displayExp = "@test(this)";
//	app.lookup("opt1").displayExp = "'tooltip'";
//	console.log(app.lookup("opt1").displayExp);
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
//	app.lookup("opt1").displayExp = test2();
	app.lookup("opt1").displayExp = "this.tooltip";
}

/*
 * "찾기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	
}

/*
 * "replace" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var a = "abcd".replace(/[a-b]/g, function(match,a,b,c){
		console.log(match);
		console.log(a);
		console.log(b);
		return "";
	})
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click2(e){
	var btn3 = e.control;
	
	app.getContainer().redraw();
}

/*
 * 데이터맵에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue
 */
function onDm1Update(e){
	var dm1 = e.control;
	
	console.log("데이터맵이 선언된 영역에서 업데이트 발생");
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click2(e){
	var btn4 = e.control;
	app.lookup("dm1").build({
		"column1" : "간다ㅏㄹ마ㅏ잡디"
	});
}

/*
 * 데이터맵에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDm1Load(e){
	var dm1 = e.control;
	console.log("데이터맵이 선언된 영역에서 빌드 발생");
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	var btn5 = e.control;
	
	var a = 7/3;
	console.log(a);
	console.log(Math.ceil(a));
}

/*
 * 데이터맵에서 before-update 이벤트 발생 시 호출.
 * 데이터가 수정되기 전에 발생하는 이벤트. 발생 메소드 : setValue
 */
function onDm1BeforeUpdate(e){
	var dm1 = e.control;
	console.log("데이터맵이 선언된 영역에서 비포업데이트 발생");
}

/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
//	console.log(e);
//	var btn6 = e.control;
	window.open("https://www.naver.com");
	
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
}

//window.document.body.addEventListener("click", function(ev){
//	console.log(ev);
//});

/*
 * "Button" 버튼(btn6)에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onBtn6Mousedown(e){
	var btn6 = e.control;
	if(e.which == 2) {
		btn6.click();
	}
}

/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
//	app.lookup("btn6").style.removeStyle("opacity");
//	app.lookup("btn11").style.removeStyle("opacity");
//	app.lookup("btn12").style.removeStyle("opacity");
	app.lookup("btn6").style.css({
		"animation" : "txt_bot 5s 0s ease-in-out both",
		"opacity" : "1"
	});
	app.lookup("btn11").style.css({
		"animation" : "txt_bot 5s 0.3s ease-in-out both",
		"opacity" : "1"
	});
	app.lookup("btn12").style.css({
		"animation" : "txt_left 5s 0.6s ease-in-out both",
		"opacity" : "1"
	});
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	app.lookup("btn6").style.css("opacity", "0");
	app.lookup("btn11").style.css("opacity", "0");
	app.lookup("btn12").style.css("opacity", "0");
	app.lookup("btn8").style.css("opacity", "0");
}
/*
 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onBodyScroll(e){
//	var group = e.control;
//	var q = e.scrollTop + window.innerHeight
	deboun();
}
var deboun = _.throttle(func, 300);

function func(e){
//	console.log(e);
	console.log("하하");
//	console.log(window.innerHeight);
//	console.log( document.body.getClientRects());
//	console.log(document.body.getBoundingClientRect());
//	console.log(app.lookup("btn8").getActualRect().top);
//	console.log(window.innerHeight > app.lookup("btn8").getActualRect().bottom);
	if(window.innerHeight > app.lookup("btn8").getActualRect().bottom) {
		app.lookup("btn8").style.css({
			"animation" : "txt_top 5s 0s ease-in-out both",
			"opacity" : "1"
		})
	}
}
//window.addEventListener("scroll", function(ev){
//	console.log(ev);
//	console.log("힝행홍");
//},{
//	capture : true
//});
/*
 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(e){
	var btn13 = e.control;
	
//	console.log(app.lookup("btn8").getActualRect());
//	console.log(app.lookup("btn8").getOffsetRect(true));
//	console.log(app.lookup("btn8").getOffsetRect(false));
	console.log(app.lookup("grp1").getOffsetRect());
}

/*
 * "Button" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(e){
	var btn14 = e.control;
	var mdi = app.lookup("mdi1");
	/** @type cpr.controls.EmbeddedApp */
	var tabs = mdi.getTabItems()[0].content;
	tabs.app = null;
	cpr.core.App.load("202212/son", function(loadedApp){
		tabs.app = loadedApp;
		tabs.redraw(); 
	});
	
}

/*
 * "Button" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(e){
	var btn15 = e.control;
	
	var all = cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
	var q = all.filter(function(each){
		return each.app.id == "202212/son";
	});
	console.log(q);
	q.forEach(function(each){
		console.log(each.id);
	});
	console.log(cpr.core.AppConfig.INSTANCE.getEnvConfig("appcache"));
	console.log(cpr.core.AppConfig.INSTANCE.toJSON());
}

/*
 * "Button" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn16Click(e){
	var btn16 = e.control;
	app.lookup("mdi1").addItemWithApp("202212/son");
}

/*
 * "delete" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(e){
	var btn17 = e.control;
	
	app.lookup("mdi1").closeAll();
}

/*
 * "Button" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(e){
	var btn18 = e.control;
	
	var tre = app.lookup("tre");
	var grd = app.lookup("grd1");
	
	grd.setTreeCheckIndex(1, true);

}

/*
 * "Button" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn19Click(e){
	var btn19 = e.control;
	
	var objMap = new cpr.utils.ObjectMap();
	var data = {};
	objMap.put({"column1" : "광","column2":"공"}, data);
	
	var parents = data;
	console.log(parents);
	parents["영업1팀"] = "가가";
	
	var valueCol = parents["크크"];
	if (valueCol == null) {
		valueCol = {};
		parents["크크"] = valueCol;
	}
	parents = valueCol;
	console.log(parents);
	console.log(objMap);
	parents["가가"] = "호호";
	console.log(parents);
	console.log(objMap);
}

/*
 * "Button" 버튼(btn20)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn20Click(e){
	var btn20 = e.control;
	var a = decodeURI("%E2%80%8B");
	console.log(a);
	console.log(encodeURI("https://edu.tomatosystem.co.kr/eXCFrame-v2 EDU-sample"))
	console.log(decodeURI("https://edu.tomatosystem.co.kr/eXCFrame-v2%E2%80%8BEDU-sample"));
}
/*
 * "send" 버튼(btn21)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn21Click(e){
	var btn21 = e.control;
	app.lookup("sms1").setResponseDecoder(function(sub,res){
		console.log(res);
		var resMan = JSON.parse(res);
		resMan["dm1"]["column3"] = "5";
		
		return {
			contentType : "application/json",
			content : resMan
		}
	});
	app.lookup("sms1").send();
}

/*
 * "getDatas" 버튼(btn22)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn22Click(e){
	var btn22 = e.control;
	console.log(app.lookup("dm1").getDatas());
}
