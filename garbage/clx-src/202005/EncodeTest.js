/************************************************
 * EncodeTest.js
 * Created at 2020. 5. 12. 오전 11:00:52.
 *
 * @author HANS
 ************************************************/
//cpr.core.AppConfig.INSTANCE.setProtocolValue("submission", {"contextPath" : "garbage-webs/"});

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
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms1BeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
//	app.lookup("sms1").setRequestEncoder(_requestEncode);
//	app.lookup("sms1").setResponseDecoder(_responseDecoder);

}

/**
 * 
 * @param {cpr.protocols.Submission} submission
 */
function getResponseComp(submission){
	
	var sub = submission;
	
	var dataColl = [];
	var cnt = sub.getResponseDataCount();
	if(cnt > 0) {
		
//		for(var i = 0 ; i < cnt ; i++) {
//			
//			dataColl.push({"alias":sub.getResponseData(i).alias,"type":typeof sub.getResponseData(i).data});
//		}
	}
	
	return dataColl;
}

/**
 * 
 * @param {cpr.protocols.Submission} submission
 * @param {Object} resData
 */
function _responseDecoder(submission,resData){
	
	
	var jsonOb = JSON.parse(resData);
	for(var key in jsonOb) {
		var ctrls = app.lookup(key);
		if(ctrls){
			ctrls.dataSet.build(jsonOb[key]);
			ctrls.redraw();
		}
	}

//	var resJson = {};
//	resJson["ds1"] = jsonOb;
	
	return {contentType : "application/json", content : resData};
}

function _requestEncode(submission,reqData){
	
	var sub = submission;
//	var realReqData = {"data" : {
//		"dm1": {
//			"objs":{}
//		}
//	}};
	var voJsonType = reqData["data"];
	
	var q =[];
	for(var keys  in voJsonType){
		q.push(voJsonType[keys]);
	}
	
	return {"content" : q};
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
//	var responseText = sms1.xhr.responseText;
	
	app.getContainer().redraw();
	
	console.log(sms1.xhr.status);
	console.log(sms1.xhr.statusText);
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
	
//	var a = {
//		"ab" : 1,
//		"bc" : 2,
//		"cd" : 3
//	}
//	
//	for(var voca in a) {
//		console.log(voca);
//	}
//	
//	var kkk = Object.keys(a);
//	
//	console.log(kkk);
//	
//	for(var ca in kkk) {
//		console.log(ca);
//	}
	app.lookup("sms2").send();
//	console.log(app.lookup("sms1").getResponseData(0).data.type);
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
	
	app.lookup("sms3").send();
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
	
	app.lookup("sms4").send();
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
	
	app.lookup("sms5").send();
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms2SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms2 = e.control;
		console.log(sms2.xhr.status);
	console.log(sms2.xhr.statusText);
}
