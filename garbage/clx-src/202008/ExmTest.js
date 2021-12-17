/************************************************************************
 * ExmGuideBindParentRowM.js
 * @프로그램설명 : bindParentRow API에 대한 예제이다.
 *
 * @작성일자 :  2020. 8. 14. 
 * @작성자	  1074023
 * 
 * @수정이력 :  수정일자 (수정자) 수정내용 
 *                      
 ************************************************************************/ 
 
 
/************************************************************************
 ** 글로벌 변수, 상수변수
 ************************************************************************/ 


/************************************************************************
 ** 글로벌 함수
 ************************************************************************/ 
/**
* 화면 초기 로딩  혹은 메뉴 클릭시에 로딩하는 함수로 async 형태로 호출됨. 
* @param {any} oInitValue   
*/
exports.init = function(oInitValue){
	// 초기로딩시 호출하는 구문 작성
}


/************************************************************************
 ** 파일내 로컬변수 선언  
 ************************************************************************/ 
//var util = new ComUtil(app);


/************************************************************************
 ** 사용자 정의 자바스크립트 함수를 기술 
 ************************************************************************/ 
 

/************************************************************************
 ** 자동으로 생성되는 이벤트 자바스크립트 함수를 배치
 ** (이벤트 생성시 자동으로 스크립트 함수가 하위에 표시됩니다. ) 
 ************************************************************************/ 



/*
 * "조회" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 8. 14.
 * <r>E-NAME:
 * <r>E-DOC:조회한다.
 * <r>E-PARAM:
 * <r>E-RR-UI-NAME: 
 * <r>E-CALL-SRV-NAME:
 * <r>E-REP:
 * <r>E-REMARK:
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
//	util.Submit.send("sub_Inqury",  function(pbSuccess){
//		if(pbSuccess) {
//			util.Control.redraw("grpMain");
//		};
//	});
	app.lookup("sub_Inqury").send();
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 * 2020. 8. 14.
 */
function onGrid1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grid1     = e.control;
//	var dsIncvInurList = app.lookup("dsIncvInurList2");
	var dsIncvInurList = app.lookup("dsIncvInurList");
	
	var rowId = dsIncvInurList.getBindedParentRowId()
	var row   = dsIncvInurList.findParentRow(rowId);	// row를 찍었을 시 자식 데이터셋의 row가 나옴
	debugger;
	
	var poDataSet = grid1.dataSet;
	dsIncvInurList.bindParentRow(poDataSet.getRow(grid1.getSelectedRowIndex()));
}
