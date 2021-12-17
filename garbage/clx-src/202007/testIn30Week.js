/************************************************
 * testIn30Week.js
 * Created at 2020. 7. 20. 오후 4:27:58.
 *
 * @author han
 ************************************************/

cpr.core.Platform.INSTANCE.onerror = function(error) {
	console.log(error);
	//클라이언트 사이드에서 주체가 되는 에러가 발생했을 때에만 에러를 캐치할 수 있음	
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
	app.lookup("sms1").send();
//	app.lookup("msm1").send();
}

/*
 * "insert" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	app.lookup("grd1").insertRow(app.lookup("grd1").getSelectedRowIndex(), true);
}


/*
 * "delete" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	app.lookup("grd1").deleteRow(app.lookup("grd1").getSelectedRowIndex());
}


/*
 * 매트릭스 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onMsm1BeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.MatrixSubmission
	 */
	var msm1 = e.control;
//	msm1.setRequestEncoder(_requestEncoder);
	msm1.setDataRowHandler(function(/*cpr.data.Row*/rowData) {
			var vsState = rowData.getState();
		
		switch(vsState){
			case "INSERTED" :
				vsState = "I";
				break;
			case "UPDATED" :
				vsState = "U";
				break;
			case "DELETED" :
				vsState = "D";
				break;
			case "UNCHANGED" :
				vsState = "UC";
				break;
			default :
				break;
		}
		return {"rsltTyp" : vsState};
	});
	
}


function _requestEncoder(submission, reqData){
	
	console.log(reqData);
	return {"content" :reqData};
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
	
	var vcTree = app.lookup("tre1");
	var item = vcTree.getItemByValue("8");
	vcTree.redraw();
	
	var ds2 = app.lookup("ds2");
	
	ds2.setFilter("column2 *='column'");
	
}


///*
// * 서브미션에서 before-submit 이벤트 발생 시 호출.
// * 통신을 시작하기전에 발생합니다.
// */
//function onSms1BeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
//	/** 
//	 * @type cpr.protocols.Submission
//	 */
//	var sms1 = e.control;
//	
//	console.log(sms1.getRequestDataCount());
//	console.log(sms1.getRequestData(0));
//	console.log(sms1.getRequestData(1));
//}




/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	configDataMap2();
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
//	var dm = getDm();
//	console.log(dm.alterColumnLayout);
//	console.log(dm.info);
//	console.log(dm.getDatas());
	app.lookup("msm1").send();
//	app.lookup("sms2").send();
}


///*
// * 서브미션에서 submit-done 이벤트 발생 시 호출.
// * 응답처리가 모두 종료되면 발생합니다.
// */
//function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
//	/** 
//	 * @type cpr.protocols.Submission
//	 */
//	var sms1 = e.control;
//	
//	console.log(getDm().getDatas());
//}


/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onSms1Receive(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
//	debugger;
	console.log("뭔데");
	console.log(sms1.xhr.responseText);
	console.log(sms1.getParameterNames());
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
	console.log(sms2.getParameterNames());
	console.log(sms2.getParameters("SPECIALTHANKS"));
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
	
	console.log(sms1.getParameters("HELLO"));
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
	
}
