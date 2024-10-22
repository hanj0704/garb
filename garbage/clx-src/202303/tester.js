/************************************************
 * tester.js
 * Created at 2023. 3. 3. 오전 9:08:46.
 *
 * @author HANS
 ************************************************/
exports.testtest = function(a,b){
	console.log(a);
	console.log(b);
	console.log(a.value);
	return "";
}
cpr.events.EventBus.INSTANCE.addFilter("cell-mouseover", function(e){
	var control = e.control;
	console.log(e);
});
cpr.expression.ExpressionEngine.INSTANCE.registerFunction("HJ", function(p1,p2){
	console.log(this);
	var row = app.lookup("dsCode").findFirstRow("cdKind == '"+p1+"' && cdVal == '"+p2+"'")
	
	if(row) {
		return row.getValue("cdName");
	} else {
		return "";
	}
});
/**
	 * 만나이를 계산해 반환합니다(양력기준)
	 * @param {String} psBirthDay 계산대상날짜(8자리) ex)20000101
	 * @param {String} psCalcPointDay 날짜계산기준일 default : today(8자리)
	 * @return {Number} 만나이 반환
	 */
	function getInternationalAge(psBirthDay, psCalcPointDay) {
		if (!psBirthDay) {
			return 0;
		}
		
		var dBirthDay = new Date(psBirthDay.substring(0, 4), ValueUtil.fixNumber(psBirthDay.substring(4, 6)) - 1, psBirthDay.substring(6, 8));
		
		//입력한 생일이 현재보다 미래일 경우
		if (new Date() < dBirthDay) {
			return 0;
		}
		
		/**
		 * 나이계산시점 default : today
		 * @type Date
		 */
		var dCalcPointday;
		
		if (!psCalcPointDay) {
			dCalcPointday = new Date();
		} else {
			dCalcPointday = new Date(psCalcPointDay.substring(0, 4), ValueUtil.fixNumber(psCalcPointDay.substring(4, 6)) - 1, psCalcPointDay.substring(6, 8));
		}
		
		var oBirth = {
			year: dBirthDay.getFullYear(),
			month: dBirthDay.getMonth() + 1,
			day: dBirthDay.getDate()
		}
		
		var oCurrent = {
			year: dCalcPointday.getFullYear(),
			month: dCalcPointday.getMonth() + 1,
			day: dCalcPointday.getDate()
		}
		
		var timeOfBirthDay = new Date(oBirth.month + "-" + oBirth.day);
		var timeOfCurrnet = new Date(oCurrent.month + "-" + oCurrent.day);
		
		//생일이전인지
		var isBeforeBirthDay = timeOfCurrnet < timeOfBirthDay;
		
		return isBeforeBirthDay ? oCurrent.year - oBirth.year - 1 : oCurrent.year - oBirth.year;
	}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	var sub = app.lookup("sms1");
	var data = {
		"header" : {
			q: 1
		},
		"data" : {
			w: "2"
		}
	}
	sub.addFileParameter("test", new Blob([JSON.stringify(data)],{type:"application/json"}));
	sub.send();
	
//	app.lookup("t1").name
//	app.lookup("t1").getSelectedTabItem().userAtt
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	
	var btn2 = e.control;
	
	console.log(app.lookup("msm1"));
	console.log(app.lookup("msm1").test);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("grd1").bottomSplit = 1;
	app.lookup("grd1").bottomSplitHeight = 60;
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var q = getInternationalAge("19950704", "20230815");
	console.log(q);
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	cpr.core.ResourceLoader.loadScript("thirdparty/findIndex.js");
}
