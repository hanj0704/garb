/************************************************
 * voTest.js
 * Created at 2021. 12. 10. 오후 4:59:39.
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
	
	app.lookup("sms1").send();
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
	
	var sms2 = app.lookup("sms2");
//	sms2.action = app.lookup("ipb6").value;
	sms2.send();
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
	
	var sms = app.lookup("sms3");
	
//	sms.addParameter("code", "BLOD");
//	sms.addParameter("codeNM", "하늘색");
//	var a = {
//		"code" : "BLUE",
//		"codeNM" : "하늘색",
//		"codeDiv": "COLOR"
//	}
//	sms.request
//	sms.addParameter("data", JSON.stringify(a));
	sms.action = "http://localhost:8080/test/tes.do";
//	sms.setRequestObject({
//		"code" : "BLUE",
//		"codeNM" : "하늘색",
//		"codeDiv": "COLOR"
//	});
	
	sms.setRequestEncoder(_requestEncoder);
	sms.send();
}

function _requestEncoder(sms,reqData){
	console.log(reqData);
	
	return {"content" :reqData["data"]["dsList"]};
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms3BeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms3 = e.control;
	sms3.setDataRowHandler(function(/*cpr.protocols.DataSetRow*/rowData) {
		console.log(rowData);
		console.log(rowData.getColumnInfo());
		console.log(rowData.getDataSetInfo());
		return {};
	});
}
