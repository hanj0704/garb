/************************************************
 * excelDownloadInClient.js
 * Created at 2020. 7. 21. 오후 3:22:14.
 *
 * @author han
 ************************************************/

/*
 * "excel download" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var vcGrid = app.lookup("grd1");
	var vcDataSet = app.lookup("ds3");
	
	var vaExportData = vcDataSet.getRowDataRanged();
	console.log(vaExportData);
	exportExcel("sample.xlsx","helloWorld",vaExportData);
	
}

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

/**
 * 
 * @param {String} fileName
 * @param {String} sheetName
 * @param {Object[]} excelData
 */
function exportExcel(fileName,sheetName,excelData){
	
	var wb = XLSX.utils.book_new();

    // step 2. 시트 만들기 
    var newWorksheet = XLSX.utils.json_to_sheet(excelData,{dateNF:"YYYY-MM-DD",cellDates : true});
    
    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, sheetName);

    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary', cellNF:true});

    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),fileName);
}

/*
 * "list" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("sms1").send();
}

