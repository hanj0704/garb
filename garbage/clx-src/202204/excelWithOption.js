/************************************************
 * excels.js
 * Created at 2020. 11. 25. 오후 1:09:18.
 *
 * @author HANS
 ************************************************/

var worker;
var util = createCommonUtil();
/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 * @param {cpr.utils.ExportOption} poOption
 */
function exportGridToExcel(pcGrid,poOption){
	return new Promise(function(resolve, reject) {
		worker.onmessage = function(e) {
			/** @type Blob */
			var blob = e.data; // blob
			console.log(e.data);
			console.log("메세지 worker.onmessage2");
			delete worker.onmessage;
			resolve(blob);
			util.hideLoadMask(app);
		}
		console.log("메세지 worker.onmessage3");
		var vcGrid = pcGrid;
		var voExportOption = vcGrid.getExportData(poOption);
		var headerDepth = vcGrid.header.getRowHeights().length;
		voExportOption.userIndex = headerDepth;
		voExportOption.applySupp = poOption.applySuppress != true ? false : true;
		console.log(voExportOption);
		
		util.showLoadMask(app);
		worker.postMessage(voExportOption);
	});
}

exports.hideMask = function(){
	util.hideLoadMask(app);
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	cpr.core.ResourceLoader.loadScript("thirdparty/FileSaver.min.js");
}



/*
 * "applySupp" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	worker = new Worker("worker/excelWithOption.js");
	exportGridToExcel(app.lookup("grd1"),{
			exceptStyle : false,
			applyFormat : true,
			applySuppress : true
		}).then(function(input){
//		console.log(input.text());
		saveAs(input, 'EXCEL_EXPORT_SAMPLE.xlsx');
	});
}
