/************************************************
 * tester.js
 * Created at 2022. 2. 28. 오후 3:58:57.
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
	
	
	var grd = app.lookup("grd1");
	
	var voDetail = grd.detail.getColumn(0);
	console.log(voDetail);
	voDetail.style.css("background-color","red");
}

var i = 0 ;
/*
 * "matrix" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("msm1").addRequestData("headers"+i, {
		"abab" :"aaa",
		"bbb" :"q"
	});
	i += 1;
	app.lookup("msm1").send();
	
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
	
	console.log(msm1.getAllRequestDatas());
	console.log(msm1.getAllRequestDatas()[0]);
	console.log(msm1.getHeaderNames());
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
	
//	msm1.removeAllHeader();
//	msm1.removeAllRequestDatas();
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
//	var a = [{
//		"a" : 1,
//		"b" : 2
//		},
//		{
//		"a" : 2,
//		"b" : 3
//	},{
//		"a" : 3,
//		"b" : 4
//	}]
//	app.lookup("sms2").setRequestObject(a);
//	app.lookup("sms2").addParameter("bb", );
//	app.lookup("sms2").setRequestEncoder(_requestEncoder1);
//	app.lookup("sms2").setRequestEncoder(_requestEncoder2);
	app.lookup("sms2").send();
}

function _requestEncoder1(submission,reqData){
	reqData["aa"] = "zz";
	return {
		"content" : reqData
	}
}

function _requestEncoder2(submission,reqData){
	reqData["qq"] = "qbc";
	return {
		"content" : reqData
	}
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
	app.lookup("sms2").send();
//	var vara = new XMLHttpRequest();
//	vara.getResponseHeader();
//	vara.open("get","http://127.0.0.1:52194/garbage/clx-src/data/d1.json?v=123123123" , false);
//	vara.send();
//	var a= new cpr.protocols.HttpPostMethod("http://localhost:8080/hey.do?abc=132", "_blank");
//	a.submit();
//	a.dispose();
//	
//	var va = new XMLHttpRequest();
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
	
	var sub = new cpr.protocols.Submission();
	sub.method = "get";
	sub.mediaType = "application/x-www-form-urlencoded;simple";
	sub.action = "https://naver.com//hey.xlsx?abc=132";
	sub.responseType = "filedownload";
	sub.send();
//	var aTag = document.createElement("a");
//	aTag.target = "_blank";
//	aTag.href = "http://127.0.0.1:52194/garbage/clx-src/data/d1.json";
//	aTag.addEventListener("click", function(ev){
//		document.removeChild(aTag);
//		aTag = null;
//	});
//	document.appendChild(aTag);
//	aTag.click();
	
	
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
	
	
	console.log(app.lookup("ipb1").length);
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	var sub = app.lookup("subUpload");
	sub.removeAllFileParameters();
	fi1.files.forEach(function(each){
		sub.addFileParameter("file1", each);
	});
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
	
	app.lookup("subUpload").send();
}


/*
 * "Button" 버튼(btn6)에서 value-change 이벤트 발생 시 호출.
 * Button의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onBtn6ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
}


/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTre1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	var a = e.newSelection[0];
	var q = a.row.getValue("appId");
	app.lookup("mdi1").addItemWithApp(q);
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange2(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	var file = fi1.file;
	app.lookup("sms3").addFileParameter("file", file);
	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var sms = app.lookup("sms3");
//	sms.setRequestEncoder(function(pcSub,poReqData){
//		var voRetu = poReqData["data"];
//		voRetu["file"] = "파일객체[]?"
//		return {
//			"content" : voRetu
//		}
//	});
	sms.send();
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	debugger;
//	var a = new udc.com.Untitled();
////	cpr.core.Platform.INSTANCE.get
//	app.floatControl(a,{
//		left :"0px",
//		top : "0px",
//		width:"100px",
//		height:"10px"
//	});
	app.lookup("sms4").send();
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	console.log(navigator.platform);
	btn3.value = navigator.userAgent;
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms4SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms4 = e.control;
	
	console.log(sms4.xhr);
	console.log(sms4.xhr.responseText);
}
