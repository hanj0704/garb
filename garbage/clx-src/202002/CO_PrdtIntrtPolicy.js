/************************************************
 * CO_PrdtIntrtPolicy.js
 * Created at 2020. 2. 20. 오후 2:54:26.
 *
 * @author dmd
 ************************************************/
//var comUtil = createComUtil(app);


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
//	var sms1 = app.lookup("sms1");
//	sms1.send();  //서브미션 전송 
	app.lookup("proinfor").clear(); // 검색 하기 전 최초 화면 초기화 
}



/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
		
//			// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = sms1.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// 서버를 타 SQL문을 실행한 결과 값을 메인 그리드를 redraw
	var grdMain = app.lookup("grd1");
	grdMain.redraw();

	if (grdMain.rowCount > 0) {
		// 첫번째 row 선택
		grdMain.selectRows([ 0 ]);
	}
}


/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var cmb1 = app.lookup("cmb1");
	var cmb2 = app.lookup("cmb2");
	
	if(cmb1 == null){
		alert('상품구분을 선택해주세요')		
	};
	if(cmb2 == null){
		alert('지점을 선택해주세요')	
	}
}
