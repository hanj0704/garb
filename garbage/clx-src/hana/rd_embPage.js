/************************************************
 * rd_sample.js
 * Created at 2020. 5. 18. 오전 9:59:50.
 *
 * @author daye
 ************************************************/


/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	setReportPost(app, "ep1", ["dmParam"], {
		"url" : "localhost:8080",
		"filePath" : "fileName.mrd",
		"options" : {
			"exportFileNm" : "exportSample.pdf",
			"toolbarVisible" : false,
			"saveFileTypes" : "All",
			"saveButtonDisable" : false,
			"printButtonDisable" : false
		}
	}, false);
}
