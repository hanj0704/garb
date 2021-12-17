
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	 
	
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
	
	/**
	 * 임베디드 페이지 lookup 
	 */
    var vcEmbPage = app.lookup("embReport"); 
	 
      var vsReportTargetUrl =  "http://localhost:8080/ClipReport4" ;  
	  var postMethod = vcEmbPage.getPostMethod(vsReportTargetUrl); 
	  
	  postMethod.addParameter("crfFilePath", "cmn/reportfile" ); /* FILE NAME */   
	  postMethod.addParameter("exportFileNm", "report nm" ); /* Export 파일명 */   
	  postMethod.addParameter("toolbarVisible", "true" ); /* /툴바 Visible 여부 */   
	 /* 기타사항 */ 
	 // postMethod.addParameter("viewScale", "true" ); /* 뷰어 Scale */   
	 // postMethod.addParameter("saveFileTypes", "ALL" ); /* 파일저장 type */   
	 // postMethod.addParameter("saveButtonDisable", "true" ); /* 파일저장 버튼 Visible */   
	 // postMethod.addParameter("dbName", "comJNDI" ); /* DBMS CONN NAME JNDI 등록 명 */   
	 // postMethod.addParameter("jsonValue", "{}}" ); /* jsonValue */    
	   
	 /**
	  * parameter Setting 
	  */ 
		//보고서 호출 파라메터  
	    //json type
		var voParam = {
			 TITLE : "테스트"
			,STORY_ID : "NS2019050200669"
		};
		
	    //보고서 파라메터(구분자- :=)
	    for(var param in voParam ){ 
	        postMethod.addParameter("viewerParameter", param+":="+voParam[param] ); 
	    } 
		
		//보고서 호출 파라메터  
	    //dataMap type
		var voParam2 = app.lookup("dmParam");
		var vsaColNms = voParam2.getColumnNames();
		
		for( var pram in vsaColNms){ 
	        postMethod.addParameter("viewerParameter", param+":="+voParam2.getString(param) ); 
		} 
	  /**
	   * 파라미터 전송 ( form submit )
	   */	
	  postMethod.submit();
	  
	  /**
	   * form fild reset( delete  all setting parameters )
	   * 초기화 
	   */
	  postMethod.dispose();    
	
}


 
