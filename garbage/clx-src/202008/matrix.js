/************************************************
 * matrix.js
 * Created at 2020. 8. 20. 오전 10:10:05.
 *
 * @author han
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
	
	app.lookup("msm1").send();
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
	
//	sms1.setResponseDecoder(_responseDecode);
}


///**
// * @private
// * @param {cpr.protocols.Submission} submission
// * @param {Object} resData
// */
//function _responseDecode(submission, resData) {
//	var _app = submission.getAppInstance();
//	var resDataObj = JSON.parse(resData);
//	var checkIsMap = true;
//	var voData = resDataObj["output"];
//	var res = {};
//	
//	for (var keys in voData) {
//		res[keys] = voData[keys];
//	}
//	
//	for (var resKey in res) {
//		if(res[resKey] instanceof Array) {
//			checkIsMap = false;
//		}
//	}
//	
//	if(checkIsMap) {
//		res = resData;
//	}
//		return {
//			contentType: "application/json",
//			content: res
//		};
//}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
	console.log(sms1.xhr.responseText);
	
	console.log(app.lookup("dm1").getDatas());
	console.log(app.lookup("ds2").getRowDataRanged());
}


/*
 * 매트릭스 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onMsm1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.MatrixSubmission
	 */
	var msm1 = e.control;
	console.log(app.lookup("dm1").getDatas());
	console.log(app.lookup("ds2").getRowDataRanged());
}
