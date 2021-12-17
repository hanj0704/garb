var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//보고서 초기화 
    var vcEmbPage = app.lookup("embReport");
    //보고서를 위한 jsp 셋팅 
    vcEmbPage.src = "jsp/blankReport.jsp"; 
		
}


/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//보고서 호출 파라메터
	var voParam = {
		 TITLE : "테스트"
		,STORY_ID : "NS2019050200669"
	};
	
	
    var vcEmbPage = app.lookup("embReport");
 

	var voParamObj = {
		filePath :          "cmn/reportfile",      /* FILE NAME */
		exportFileNm :      "report nm",           /* EXPORT_NM */
		toolbarVisible :    "true",                /* TOOLBAR_VISIBLE */
		saveFileTypes :     "ALL",                 /* SAVEFILE_TYPES */
		saveButtonDisable : "true",                /* SAVE_BTN */
		printButtonDisable : "true",               /* PRINT_BTN */
		scaleRatio :        "PageWidth",           /* SCALE_RATIO */
		dbName : "com/cmnDBC",                     /* DBMS CONN NAME JNDI 등록 명*/
		params : voParam                           /* JSON PARAM */
	};
	window.returnValue = voParamObj;
	
    vcEmbPage.src="jsp/reportViewer.jsp?p="+(new Date().getMilliseconds()); 
	
}


 
