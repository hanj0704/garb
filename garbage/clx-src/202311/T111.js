/************************************************
 * @파일명 : CM0101120F.js
 * @작성자 : You Minsang
 * @작성일자 : 2022. 10. 5. 오전 9:42:15
 * @수정로그 :
 * [일자, 수정자] 내용
 ************************************************/

/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/************************************************
 * 전역 변수 선언
 ************************************************/

/************************************************
 * 사용자 정의 함수
 ************************************************/

/**
 * 목록 데이터를 조회한다.
 * @param {String} psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList(psStatus) {

 	util.DataMap.setValue(app, "dmComParam", "AUTHRT_GROUP_ID", app.lookup("cmbAuthGrp").value);

	// 조회 COM_SQL_ID 셋팅
//	util.DataMap.setValue(app, "dmComParam", "COM_XML_ID", "cmd.CM0101120FMapper");
//	util.DataMap.setValue(app, "dmComParam", "COM_SQL_ID", "{selectList1:dsAuthrt}{selectList2:dsAuthrtUp}");
	//조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess) {

		if (pbSuccess) {

			// 권한그룹 타이틀 변경
			var vsAuthrtGrpNm = app.lookup("cmbAuthGrp").getSelectionFirst().label;
			app.lookup("udccomgridtitle3").title = "상위권한그룹 : " + vsAuthrtGrpNm;
			app.lookup("udccomgridtitle3").redraw();

			if (psStatus == "save") {
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			} else {
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
			}
		}
	});
}

/**
 * 데이터를 저장한다.
 */
function doSave() {

	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, "grdUpAuth", "MSG")) return false;

	// 저장 COM_SQL_ID 셋팅
	util.DataMap.setValue(app, "dmComParam", "COM_XML_ID", "cmd.CM0101120FMapper");
	util.DataMap.setValue(app, "dmComParam", "COM_SQL_ID", "{delete,insert:dsAuthrtUp}");

	//저장 서브미션 호출
	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			doList("save");
		}

		//다시 그리기
		util.Control.redraw(app, "grdMst");
		util.Control.redraw(app, "grdUpAuth");
	});
}

/************************************************
 * 이벤트
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {

	// 상위권한그룹메뉴 호출
//	util.DataMap.setValue(app, "dmComParam", "COM_XML_ID", "cmd.CM010112Mapper");
//	util.DataMap.setValue(app, "dmComParam", "COM_SQL_ID", "{selectListMenu:dsComAurth}{selectListUserType:dsUserTypeCd}");

//	//공통코드 서브미션 호출
	util.Submit.send(app, "subOnload", function(pbSuccess) {

	});

	

}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onUdcBtnSearch1Search(e) {
	var udcBtnSearch1 = e.control;

	//조회조건 유효성 체크
	if (!util.validate(app, "grpSearch")) return false;

	//데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdUpAuth", "CRM", null, function() {
			doList();
		})) return false;

	doList();
}


/*
 * "저장" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;

	doSave();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbAuthGrpSelectionChange(e){
	var cmbAuthGrp = e.control;
	
	// onLoad 서브미션 호출 콜백에서 적용한다(화면 로드시 조회처리).
	util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	util.Submit.send(app, "subOnload", function(pbSuccess) {

	});
	
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	util.Submit.send(app, "subOnload2", function(pbSuccess) {

	});
	
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var grd = app.lookup('grdMst');
	
	var index = grd.getCheckRowIndices();
//	index  = Array.prototype.reverse.call(index);
//	grd.deleteRow(index, false);
//	console.log(index);
//	console.time("delete");
//	for(var idx of index) {
//		console.log(idx);
//		grd.dataSet.realDeleteRow(idx);
//	}
//	console.timeEnd("delete");
	
	
	
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	var grd = app.lookup('grdMst');
	var startDate = new Date();
	console.log(startDate);
	for(var i =0; i < 20000; i++){
		console.log(grd.findFirstRow("column1 == \"5\""));
	}
	console.log(new Date() - startDate);
	
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	var grd = app.lookup('grdMst');
	
	var grd2 = app.lookup('grdUpAuth');
	
//	for(var i =0 ; i <grd.getCheckRowIndices().length; i++){
//		grd2.insertRowData(i, true, grd.getRow(grd.getCheckRowIndices()[i]).getRowData());
//	}
	
	var data = grd.dataSet.getRowDataRanged().filter(function(each,idx){
		if(grd.getRow(idx).rowChecked){
			return true;
		}
	});
	
	console.log(data.length);
	grd2.dataSet.build(data);
	
	
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	var btn5 = e.control;
	
}
