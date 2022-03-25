/************************************************
 * MatrixTest.js
 * Created at 2022. 2. 16. 오전 10:33:00.
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
	
//	app.lookup("msm1").send();
	app.lookup("sms1").setDataRowHandler(function(rowdata){
		console.log(rowdata);
		return {"statis" : rowdata.getState()}
	});
	
	app.lookup("sms1").send();
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
	
	app.getContainer().redraw();
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
	
	app.lookup("grd1").insertRow(1, true);
	
}
