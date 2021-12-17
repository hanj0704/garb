/************************************************
 * gridExporter.js
 * Created at 2021. 3. 8. 오전 11:50:52.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	var stTime = new Date().getTime();
	var edTime = 0;
	console.log("파일내보내기 시작 : " + stTime);
	
	var grid = app.lookup("grd1");
	var ds = app.lookup("ds1");
	var colNames = ds.getColumnNames();
	var headerColNames = [];
	for (var i = 1; i < grid.header.cellCount; i++) {
		headerColNames.push(grid.header.getColumn(i).text);
	}
	
	var rowCount = ds.getRowCount();
//	var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
	var tab_text =  "";
	
	tab_text += '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
	tab_text += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	tab_text += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
	tab_text += '<x:Name>Test Sheet</x:Name>';
	tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
	tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml>';
	tab_text += '<style>.xls-txt{mso-number-format:"\@"}</style>';
	tab_text += '</head><body>';
	tab_text += '<table border="1px">';
	
	tab_text += '<tr>';
	for (var i = 0; i < headerColNames.length; i++) {
		tab_text += '<th>' + headerColNames[i] + '</th>';
	}
	tab_text += '</tr>';
	
	for (var ri = 0; ri < rowCount; ri++) {
		tab_text += '<tr>';
		for (var ci = 0; ci < colNames.length; ci++) {
			
			tab_text += '<td class="xls-txt">' + ds.getString(ri, colNames[ci]) + '</td>';
		}
		tab_text += '</tr>';
	}
	
	tab_text += '</table></body></html>';
	console.log(tab_text);
	
	
	var data_type = 'data:application/vnd.ms-excel';
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var fileName = 'exp.xls';
	//Explorer 환경에서 다운로드
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		if (window.navigator.msSaveBlob) {
			var blob = new Blob([tab_text], {
				type: "application/csv;charset=utf-8;"
			});
			navigator.msSaveBlob(blob, fileName);
		}
	} else {
		var blob2 = new Blob([tab_text], {
			type: "application/csv;charset=utf-8;"
		});
		var filename = fileName;
		var elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob2);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
	
	edTime = new Date().getTime();
	console.log("파일내보내기 완료 : " + edTime);
	console.log("소요시간(ms) : " + (edTime - stTime));
//	window.open("data:application/vnd.ms-excel,"+table.toString());
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var gridCtrl = app.lookup("grd1");
	
	var table = '<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Test Sheet</x:Name><x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><style>.xls-txt{mso-number-format:"@"}</style></head><body><table border="1px"><tr><th>우편번호</th><th>시도</th><th>시도영문</th><th>시군구</th><th>시군구영문</th><th>읍면</th><th>읍면영문</th><th>도로명코드</th><th>도로명</th><th>도로명영문</th><th>지하여부</th><th>건물번호본번</th><th>건물번호부번</th><th>건물관리번호</th><th>다량배달처명</th><th>시군구용건물명</th><th>법정동코드</th><th>법정동명</th><th>리명</th><th>행정동명</th><th>산여부</th><th>지번본번</th><th>읍면동일련번호</th><th>지번부번</th><th>구 우편번호</th><th>우편번호일련번호</th></tr><tr><td class="xls-txt">col11</td><td class="xls-txt">col21</td><td class="xls-txt">col31</td><td class="xls-txt">col41</td><td class="xls-txt">col51</td><td class="xls-txt">col61</td><td class="xls-txt">col71</td><td class="xls-txt">col81</td><td class="xls-txt">col91</td><td class="xls-txt">col101</td><td class="xls-txt">col111</td><td class="xls-txt">1</td><td class="xls-txt">1</td><td class="xls-txt">col141</td><td class="xls-txt">col151</td><td class="xls-txt">col161</td><td class="xls-txt">col171</td><td class="xls-txt">col181</td><td class="xls-txt">col191</td><td class="xls-txt">col201</td><td class="xls-txt">col211</td><td class="xls-txt">1</td><td class="xls-txt">col231</td><td class="xls-txt">1</td><td class="xls-txt">col251</td><td class="xls-txt">col261</td></tr></table></body></html>';
	
	var blob2 = new Blob([table], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		});
		console.log(blob2);
		var filename = "qq.xls";
		var elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob2);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
}




/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
//	var buffer = new ArrayBuffer(12);
//	var dv=  new DataView(buffer,2,2);
//	console.log(dv);
//	console.log(dv.byteOffset);
	var fun = punction("abcde");
	console.log(fun);
	var b = [];
	var a = "a";
	console.log(a.charCodeAt(0).toLocaleString());
	
	b.push(a.charCodeAt(0).toLocaleString());
	console.log(b);
}

function punction (str){
	var buf = new ArrayBuffer(str.length*2);
	var bufView = new Uint8Array(buf);
	for(var i=0, strLen=str.length ; i<strLen ; i++){
		bufView[i] = str.charCodeAt(i);
	}
	console.log(bufView);
	console.log(buf);
	return buf;
}