/************************************************
 * excels.js
 * Created at 2020. 11. 25. 오후 1:09:18.
 *
 * @author HANS
 ************************************************/
//function parseExcelFile2(inputElement) {
////  var files = inputElement.files || [];
////  if (!files.length) return;
//  var file = inputElement;
//
//  console.time();
//  var reader = new FileReader();
//  reader.onloadend = function(event) {
//    var arrayBuffer = reader.result;
//    // var buffer = Buffer.from(arrayBuffer)
//    // debugger
//
//    var workbook = new ExcelJS.Workbook();
//    // workbook.xlsx.read(buffer)
//    workbook.xlsx.load(arrayBuffer).then(function(workbook) {
//      console.timeEnd();
//      var result = ''
//      workbook.worksheets.forEach(function (sheet) {
//        sheet.eachRow(function (row, rowNumber) {
//          result += row.values + ' | \n'
//        })
//      })
//      console.log(result);
//      result2.innerHTML = result
//    });
//  };
//  reader.readAsArrayBuffer(file);
//}

//async function saveAsExcel() {
//    var wb = new ExcelJS.Workbook()
//
//    var ws = wb.addWorksheet()
//
////    var row = ws.addRow(['a', 'b', 'c'])
////    row.font = { bold: true }
//	
//	var vcGrid = app.lookup("grdMst");
//	
//	var exp = vcGrid.getExportData({
//		exceptStyle : true,
//		applyFormat : true
//	});
//	
//	var head = exp.rowgroups[0].data[0];
//	/** @type Array */
//	var detail = exp.rowgroups[1].data;
//	
//	console.log(head);
//	console.log(detail);
//	ws.addRow(head);
//	
//	detail.forEach(function(each){
//		
//		ws.addRow(each);
//	});
//    var buf = await wb.xlsx.writeBuffer()
//
//    saveAs(new Blob([buf]), 'abc.xlsx')
//}
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	ExcelUtil.exportExcelToJSON("excels.xlsx", "sheet1", app.lookup("grd1"));
}



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	saveAsExcel();
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	parseExcelFile2(fi1.file);
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
	
	
	ExporterUtil.exportExcelJS(app.lookup("grd1"));
}



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


/*
 * "downlaod" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	ExcelUtil.exportExcelToJSON("hello.xlsx", "sheet1", app.lookup("grd2"));
}

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
	util.showLoadMask(app);
	
	setTimeout(function(){
		
		ExporterUtil.exportExcelJSWithInlineStyle(app.lookup("grdMst"));
	}, 150)
}

exports.hideMask = function(){
	util.hideLoadMask(app);
}
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var util  = createCommonUtil();
	util.showLoadMask(app);
	
//	setInterval(function(){
//		util.hideLoadMask(app);
//	}, 3000);
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
	cpr.core.ResourceLoader.loadScript("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js");
	if(isIE()){
			
		cpr.core.ResourceLoader.loadScript("thirdparty/exceljs/ie/corejs.min.js");
		cpr.core.ResourceLoader.loadScript("thirdparty/exceljs/ie/exceljs_3.8.min.js");
	} else {
		cpr.core.ResourceLoader.loadScript("thirdparty/exceljs/chrome/exceljs_4.2.min.js");
	}
}
