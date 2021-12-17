/************************************************
 * testest.js
 * Created at 2021. 6. 24. 오후 3:28:04.
 *
 * @author HANS
 ************************************************/
cpr.events.EventBus.INSTANCE.addFilter("value-change", function(e){
	var control = e.control;
	
	if(control instanceof cpr.controls.InputBox) {
		
		if(control.userAttr("isCookieStarted") == "Y") {
			setCookie(app.app.title+"_"+control.id, control.value,365);
		}
	}
});
cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	var control = e.control;
	
	if(control instanceof cpr.core.AppInstance) {
		
		if(control.app.id.indexOf("udc") == -1) {
				/** @type cpr.controls.InputBox[]*/
			var cookieBoosters = control.getContainer().getAllRecursiveChildren().filter(function(each){
				return each.userAttr("isCookieStarted") == "Y";
			});
			
			cookieBoosters.forEach(function(each){
				var str = getCookie2(control.app.title+"_"+each.id);
				if(str != undefined && str != null && str != "null") {
					
					each.putValue(getCookie2(control.app.title+"_"+each.id));
				}
			});
		}
	}
});




/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	var str = app.lookup("ds1").info;
	console.log(str);
	
	app.lookup("dm1").setValue("column1", str);
	app.lookup("dm1").setValue("column2", b);
	app.lookup("dm1").setValue("column3", btn1.userAttr("sql"));
	
	var a = {
		"aabc" : app.lookup("ds1").info.toString(),
		"bbb" : b,
		"C" : btn1.userAttr("sql")
	};
	
	console.log(JSON.stringify(a));
	console.log(app.lookup("ds1").info.toString());
	app.lookup("sms1").send();
}

///**
// * 쿠키를 설정합니다.
// * 
// * @param {String} psName
// * @param {Strubg} psValue
// * @param {Number} pnExpireDate
// */
//function setCookie(psName, psValue, pnExpireDate) {
//	var voToday = new Date();
//	voToday.setDate(voToday.getDate() + parseInt(pnExpireDate));
//	document.cookie = psName + "=" + escape(psValue) + ";path=/;expires=" + voToday.toGMTString() + ";";
//}
//
//
///**
// * 쿠키를 가져옵니다.
// * @param {String} psName
// */
//function getCookie(psName) {
//	var vsCookie = document.cookie + ";";
//	
//	var vaItems = vsCookie.split("");
//	var vaItemInfo = null;
//	vaItems.forEach(function(each){
//		vaItemInfo = each.split("=");
//		if (psName == vaItemInfo[0].trim()){
//			return unescape(vaItemInfo[1]);
//		}
//	});
//}
// 쿠키 생성 함수
function setCookie(cName, cValue, cDay){
var expire = new Date();
expire.setDate(expire.getDate() + cDay);
cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
document.cookie = cookies;
}



// 쿠키 가져오기 함수
function getCookie2(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
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
	
	setCookie("hanjin", "abbb", 365);
}


/*
 * "getCookie" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	var han = getCookie2("hanjin");
	console.log(han);
	
	console.log(getCookie2("testest_ipb1"))
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
	
	app.lookup("mdi1").addItemWithApp("202106/ttest");
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
	
	var a = 135;
	
//	console.log(parseInt(a/90));
//	console.log(a%90);
	
//	console.log(app.app.title);

	var a = cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
	console.log(a);
}

var angle = 0;
var mbe = 0;
/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	var vcGrpRbt = app.lookup("grp1");
	var nbe = app.lookup("nbe1").numberValue;
	
	var vnAzimuth = parseInt(nbe/90);
	var vnRemain = nbe%90;
//	if(vnAzimuth == 4) {
//		vnAzimuth = 0;
//	}
	console.log(angle);
	console.log(vnAzimuth);
	angle = angle%360;
	console.log(vnAzimuth-Math.abs(angle/90));
	switch(vnAzimuth-Math.abs(angle/90)){
		case 1 :
		if(angle ==90) {
			angle += 90;
		} else {
			
			angle -= 90;
		}
			break;
		case 2 :
		angle -= 180;
			break;
		case 3 : 
		angle += 90;
			break;
		case -1 :
		angle += 90;
			break;
		case -2 :
		angle += 180;
			break;
		case -3 :
		if(nbe ==360){
			
			angle += 90;
		} else{
			
			angle -= 90;
		}
			break;
		default :
			break;
	}
//	if(mbe < 0) {
//		console.log("아 띠용~");
//		nbe = (360-nbe) * -1;
//	} else {
//		
//	if(nbe > 270) {
//		console.log("ㅋㅅㅋ");
//		if(nbe > mbe) {
//			console.log("ㅋㅋ");
//			nbe = (360-nbe)*-1;
//		} else {
////			nbe = (360-nbe)*-1;
//			console.log("타긴하냐?");
//		}
//		
//	}
//	}
//	mbe =  nbe;
//	if(nbe == 360) {
//		mbe = -1;
//	}
console.log(angle);
	vcGrpRbt.style.animateTo({
			"transform" : "rotate(" + (angle) + "deg)"
		}, 1, cpr.animation.TimingFunction.LINEAR);
}



/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onNbe1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.NumberEditor
	 */
	var nbe1 = e.control;
	
//	app.lookup("btn7").click();
}


/*
 * MDI 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onMdi1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;

}


/*
 * MDI 폴더에서 content-load 이벤트 발생 시 호출.
 * TabItem의 Content가 그려지고 브라우저에 표현되기 직전에 호출됨.
 */
function onMdi1ContentLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	
}


/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
	
}
