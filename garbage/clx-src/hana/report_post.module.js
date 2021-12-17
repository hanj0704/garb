/************************************************
 * report.module.js
 * Created at 2020. 5. 18. 오전 10:07:11.
 *
 * @author daye
 ************************************************/

/*
 * 본 모듈은 Clip Report 를 연동할 수 있는 기능을 제공합니다.
 * Clip Report 외에도 Post방식으로 레포트를 연동할 경우에,  
 * [옵션 추가], [파라미터 추가] 부분에서 각 레포트 파라미터 형식에 맞게 수정하여 사용 할 수 있습니다.
 *
 * 
 * <사용방법>
 * 조회 시 setReportPost API를 호출합니다.
 *  poParam에서 url, filePath는 필수입력항목입니다. 나머지 필요 옵션들은 options 내에 JSON 타입으로 작성해 주십시오.
 */


/**
 * @param {cpr.core.AppInstance} app
 * @param {#embeddedpage} psEmbpageId
 * @param {any} paDataMapId
 * @param {
 * 		url: String <!-- postMehod action URL -->, 
 * 		filePath : String <!-- 레포트 파일 경로 -->,
 * 		options? : JSON <!-- viewer 옵션 설정 -->
 * }  poParam
 */
globals.setReportPost = function (app, psEmbpageId, paDataMapId, poParam) {
	
	/** @type cpr.controls.EmbeddedPage */
	var vcEmbPage = app.lookup(psEmbpageId);
	
	/* HttpPostMehtod 객체 생성 */
	var vsReportUrl = poParam.url;
	var postMethod = vcEmbPage.getPostMethod(vsReportUrl);

	if(!(paDataMapId instanceof Array)){
		paDataMapId = [paDataMapId];
	}
	
	/* 옵션 추가 */
	Object.keys(poParam.options).forEach(function(each) {
		postMethod.addParameter(each, poParam[each]);
	});
		
	/* 파라미터 추가 */
	paDataMapId.forEach(function(each) {
		/** @type cpr.data.DataMap */
		var vcDataMap = app.lookup(each);
		var vaColNms = vcDataMap.getColumnNames();
		vaColNms.forEach(function(each, index){
		   postMethod.addParameter("viewerParameter", index+":="+vcDataMap.getValue(each)); 
		   // rd fileName send
		});
	})
	
	/* 파라미터 전송 */
	postMethod.submit();

	/* postMethod 초기화 */
	postMethod.dispose();    
}

