/************************************************
 * PF2.js
 * Created at 2020. 1. 30. 오후 5:06:10.
 *
 * @author csj
 ************************************************/


/**
 * 눈금자 및 스케줄 데이터 동적 생성
 */
function drawScreen() {

	var vcTimeLine = app.lookup("timeLine");
	var vcDs3 = app.lookup("dsTimeLine");

	/* 시간에 대한 눈금자를 동적으로 생성 - 30px 기준 */
	for (var i = 0; i < vcDs3.getRowCount(); i++) {
		var vnTop = 0 + (i * 30); // 시
		var vnTop2 = 1 + (i * 30); // 시간 텍스트
		var vnTop3 = 15 + (i * 30); // 분
		var vcRowData = vcDs3.getRowData(i);

		/*시간 눈금 */
		var vcOutput = new cpr.controls.Output();
		vcOutput.style.css({
			"background-color": "silver"
		});
		vcTimeLine.addChild(vcOutput, {
			"top": vnTop + "px",
			"width": "13px", 
			"left": "12px",
			"height": "1px"
		});

		/*두번째 시간표시 */
		var vcDsRowData = vcDs3.getRowData(i);
		var vcOutput2 = new cpr.controls.Output();
		vcOutput2.value = vcRowData["timeLine"];
		vcOutput2.style.css({
			"text-align": "center",
			"font-size": "12px"
		});
		vcTimeLine.addChild(vcOutput2, {
			"top": vnTop2 + "px",
			"width": "25px",
			"left": "0px",
			"height": "15px"
		});

		/* 분 눈금 */
		var vcOutput3 = new cpr.controls.Output();
		vcOutput3.style.css({
			"background-color": "silver"
		});
		vcTimeLine.addChild(vcOutput3, {
			"top": vnTop3 + "px",
			"width": "7px",
			"left": "18px",
			"height": "1px"
		});
	}

	/* 그려진 시간에 맞게 스케줄을 동적 생성 */
	var ds1 = app.lookup("dsSteel");

	var vcLayout1 = app.lookup("1M");
	var vcLayout2 = app.lookup("2M");
	var vcLayout3 = app.lookup("3M");
	var vcLayout4 = app.lookup("4M");
	var vcLayout5 = app.lookup("5M");
	var vaWeek = [vcLayout1, vcLayout2, vcLayout3, vcLayout4, vcLayout5]; // 연주 객체

	/* 연주 종류에 따라 동적으로 스케줄 생성 */
	for (var j = 0; j < vaWeek.length; j++) {
		var vnAddnum = 0;
		var isNext = false;
		ds1.clearFilter();
		ds1.setFilter(" softCastNo == '" + (j + 1) + "'  ");
		
		/* 필터된 연주 데이터를 기준으로 스케줄 생성 */
		for (var i = 0; i < ds1.getRowCount(); i++) {
			var vcSchDetail = new udc.com.SchDetail(); // 스케줄 UDC 컨트롤

			var vcRow = ds1.getRowData(i);

			/* 마지막을 제외한 나머지 스케줄 컨트롤에 한하여 border-bottom을 그리지 않기 위해 계산 */
			if (ds1.getRowData(i + 1) != null) {
				if (ds1.getRowData(i)["softCastEndDt"] == ds1.getRowData(i + 1)["softCastStrDt"]) {
					isNext = true;
				} else {
					isNext = false;
				}
			} else {
				isNext = false;
			}

			var vsTimeOn = vcRow["softCastStrDt"];
			var vsTImeEnd = vcRow["softCastEndDt"];
			
			/* 시간 데이터를 통해 위치 및 크기 계산하여 연주 스케줄 추가 */
			var vnTimeH = parseInt(vsTimeOn.substring(8, 10)) + parseInt(vnAddnum);
			var vnTimeM = vsTimeOn.substring(10, 12);
			var vnTimeH1 = parseInt(vsTImeEnd.substring(8, 10)) + parseInt(vnAddnum);
			var vnTimeM1 = vsTImeEnd.substring(10, 12);

			if (vnTimeH > vnTimeH1) {
				vnTimeH1 = 24 + parseInt(vnTimeH1);
			}
			var vnHeight = 0;

			var vnTop = parseInt(vnTimeH) * 30 + Math.round((parseInt(vnTimeM) / 2));

			vnHeight = ((parseInt(vnTimeH1) - parseInt(vnTimeH)) * 30) + ((parseInt(vnTimeM1) - parseInt(vnTimeM))) / 2;
			
			/* 스케줄 컨트롤에 데이터 전달 */
			vcSchDetail.setAppProperty("voRowData", vcRow);
			if (isNext == false) {
				vcSchDetail.style.css({
					"border-bottom": "1px solid #cccccc"
				});
			}
			
			/* 컨테이너에 스케줄 컨트롤 추가 */
			vaWeek[j].addChild(vcSchDetail, {
				"top": vnTop + "px",
				"right": "0px",
				"left": "0px",
				"height": Math.round(vnHeight) + "px"
			});
		}
	}
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	/* 서브미션 전송 */
	app.lookup("subInit").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubInitSubmitSuccess( /* cpr.events.CSubmissionEvent */ e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subInit = e.control;
	
	/* 눈금자 및 스케줄 컨트롤 동적 생성 */
	drawScreen();
}