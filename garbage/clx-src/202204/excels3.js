/************************************************
 * excels.js
 * Created at 2020. 11. 25. 오후 1:09:18.
 *
 * @author HANS
 ************************************************/

/*
 * "list" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("sms1").send();
}


/*
 * "downlaod" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	ExporterUtil.exportExcelJS(app.lookup("grd2"));
}

var worker;
var util = createCommonUtil();
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//worker로 수정예정
	worker = new Worker("worker/worker2.js");
	abc().then(function(input){
		
		saveAs(input, 'EXCEL_EXPORT_SAMPLE.xlsx');
	});
}

function abc(){
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
		var vcGrid = app.lookup("grdMst");
		var voHandleObj = {
			exceptStyle : false,
			applyFormat : true
		};
		var voExportOption = vcGrid.getExportData(voHandleObj);
		var headerDepth = vcGrid.header.getRowHeights().length;
		voExportOption.userIndex = headerDepth;
		util.showLoadMask(app);
		worker.postMessage(voExportOption);
	});
}

exports.hideMask = function(){
	util.hideLoadMask(app);
}

/*
 * "ie" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var workbook = new ExcelJS.Workbook();
			var worksheet = workbook.addWorksheet('SheetName');

			workbook.xlsx.writeBuffer().then(function(buffer) {
			  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FileName.xlsx');
			});
}

function isIE(){
	return (navigator.appName ==="Netscape" && navigator.userAgent.search("Trident") !== -1 ||
	navigator.userAgent.toLowerCase().indexOf("msie") !== -1);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	cpr.core.ResourceLoader.loadScript("thirdparty/FileSaver.min.js");
	if(isIE()){
			
		cpr.core.ResourceLoader.loadScript("thirdparty/exceljs/ie/corejs.min.js");
		cpr.core.ResourceLoader.loadScript("thirdparty/exceljs/ie/exceljs_3.8.min.js");
	} else {
		cpr.core.ResourceLoader.loadScript("thirdparty/exceljs/chrome/exceljs_4.2.min.js");
	}
}


/*
 * "exportJS2" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	worker = new Worker("worker/worker.js");
	abcd().then(function(input){
		
		saveAs(input, 'EXCEL_EXPORT_SAMPLE.xlsx');
	});
}
function abcd(){
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
		var vcGrid = app.lookup("grdMst2");
		var voHandleObj = {
			exceptStyle : false,
			applyFormat : true
		};
//		util.showLoadMask(app);
		var voExportOption = vcGrid.getExportData(voHandleObj);
		console.log(voExportOption);
		worker.postMessage(voExportOption);
	});
}

/*
 * "exportJS2" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	ExporterUtil.exportExcelJS2(app.lookup("grdMst2"));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
	app.lookup("opt1").value = "총 건수 : "+app.lookup("grd2").getRowCount();
}
