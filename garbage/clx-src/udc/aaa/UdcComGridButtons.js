/************************************************
 * GridButtons.js
 * Created at 2020. 4. 20. 오후 6:16:36.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/**
 * UDC의 AppInstance를 반환합니다.
 */
exports.getUDCApp = function() {
	return app;
};


/*
 * "행추가" 버튼(btnNew)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewClick(/* cpr.events.CMouseEvent */ e){
	//해당 UDC를 사용하는 부모App
	//TODO  테스트를 위한 테스트 코딩 insert 시 팝업으로 띄울 시 소스 수정 필요
	
	var vsInsertRowYn = app.getAppProperty("insertRowYn");
	if (vsInsertRowYn) {
		var hostApp = app.getHostAppInstance();
		
		
		var vcGrid = app.getAppProperty("grid");
		var vsFocusColNm = app.getAppProperty("insertedFocusColNm");
		
		var event = new cpr.events.CUIEvent("insertRow");
		
		var voRow;
		if(vcGrid instanceof cpr.controls.Grid){
			voRow = util.Grid.insertRow(hostApp, vcGrid.id, vsFocusColNm);
		}
		
		event.row = voRow ? voRow : null;
		event.rowIndex = voRow ? voRow.getIndex() : -1;
		
		
		app.dispatchEvent(event);		
	} else {
		//업무단에서 직접 구현
		var event = new cpr.events.CUIEvent("insertRow");
		app.dispatchEvent(event);
	}
	
}


/*
 * "행삭제" 버튼(btnDel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	var event = new cpr.events.CUIEvent("deleteRow");
	
	var delEvent = app.dispatchEvent(event);
}


/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	var event = new cpr.events.CUIEvent("save");
	
	app.dispatchEvent(event);
}

var pgSize = 10000;
var currCnt = 0;
var curCount = 0;
var maxCount = 0;
/*
 * "다운로드" 버튼(btnExcel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExcelClick(/* cpr.events.CMouseEvent */ e){
	var event = new cpr.events.CUIEvent("excelDownload");
	var rslt = app.dispatchEvent(event);
	if(!rslt) return false;
	
	var hostApp = app.getHostAppInstance();
	
	var excelDataSub = app.getAppProperty("excelExportSubId");
	var fileName     = app.getAppProperty("excelExportTitle"); 
	var excelDsId    = app.getAppProperty("excelExportDsId");
	
	hostApp.lookup(excelDsId).clear();
	currCnt = 0;
	curCount= 0;
	
	hostApp.lookup(excelDataSub).addEventListener("submit-done", function(){
		currCnt = currCnt + curCount;
		
		if(maxCount == 0) maxCount = hostApp.lookup(excelDsId).getValue(0, "PAGING_TOTAL_CNT");
		
		if(currCnt < maxCount) {
			var loadMask = app.getRootAppInstance().lookup("__loadmask_pro__")
			if(loadMask) {
				loadMask.setAppProperty("max", maxCount);
				loadMask.setAppProperty("value", currCnt);
			}
			
			doExcelExportData(hostApp, excelDataSub);
		}else{
			var submission = app.lookup("subDirectExport");
			
			var fileType = "xlsx";			
			
			submission.action = "cleopatraFileExport/"+ fileName.replace("\/", "") + fileType +".do";
//			submission.addParameter("fileName", fileName.replace("\/", "") +".xlsx");
			var exportData = cpr.utils.ExportUtil.getExportData(hostApp.lookup(excelDsId));
			
			var colNms = hostApp.lookup(excelDsId).getColumnNames();
			
			var HeaderText = [];
			var comment = "";
			for(var i = 0; i < colNms.length; i++) {
				comment = ValueUtil.isNull(hostApp.lookup(excelDsId).getColumn(colNms[i]).getHeader().info) ? colNms[i] : hostApp.lookup(excelDsId).getColumn(colNms[i]).getHeader().info ;
				
				HeaderText.push(comment);
			};
			
			exportData["rowgroups"][0]["data"][0] = HeaderText;
			submission.setRequestObject(exportData);
			util.Submit.send(app, "subDirectExport", function(){
				hostApp.lookup(excelDataSub).removeEventListeners("submit-done");
			});


		}	
	});
	
	doExcelExportData(hostApp, excelDataSub)
};


function doExcelExportData(hostApp, submission) {
	curCount = maxCount - currCnt > pgSize ? pgSize : maxCount - currCnt
	
	if(curCount == 0) curCount = pgSize;
	util.Submit.send(hostApp, submission, function(){
		
	}, curCount, true, true, null,null,"pro");
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	
	var grp = app.lookup("grpContent");
	
	if(e.property == "btnSaveVisible") {
		grp.getLayout().setColumnVisible(4, app.getAppProperty("btnSaveVisible"));
	}else if(e.property == "btnAddRowVisible") {
		grp.getLayout().setColumnVisible(2, app.getAppProperty("btnAddRowVisible"));
	}else if(e.property == "btnDelRowVisible") {
		grp.getLayout().setColumnVisible(3, app.getAppProperty("btnDelRowVisible"));
	}else if(e.property == "btnExcelVisible") {
		grp.getLayout().setColumnVisible(1, app.getAppProperty("btnExcelVisible"));
	}
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var hostApp = app.getHostAppInstance();
	
	var hostDsId = app.getAppProperty("excelExportDsId");
	
	if(hostDsId) {
		var hostDs = hostApp.lookup(app.getAppProperty("excelExportDsId"));
		
		if(hostDs) {
			maxCount = hostDs.getValue(0, "PAGING_TOTAL_CNT");
			
			if(maxCount == null) maxCount = 0;
		}
	}
}
