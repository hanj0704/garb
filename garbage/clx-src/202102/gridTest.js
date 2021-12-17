/************************************************
 * gridTest.js
 * Created at 2021. 2. 5. 오후 2:28:27.
 *
 * @author csj
 ************************************************/

var sendData;
var _data ;
var responseData;
var parseTime;
/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	var reader = new FileReader();
	
	sendData = moment().valueOf();	
	
	var reader = new FileReader();	
	
	reader.onload = function(e){
		var data = e.target.result;
		
		var workbook = XLSX.read(data , {type : 'binary'});
		
		workbook.SheetNames.forEach(function(item, index){
			ws = workbook.Sheets[item];
			var range = XLSX.utils.decode_range(workbook.Sheets[item]['!ref']); 
			range.s.r = 1;
			var _header = app.lookup("ds1").getColumnNames();
			var EXCEL_JSON ; 			
			EXCEL_JSON = XLSX.utils.sheet_to_json(ws, {range : range, header: _header  });		
			parseTime = moment().valueOf() - sendData;
			app.lookup("grdExcel").value = (moment.duration(parseTime) / 1000) + "초";
			_data = EXCEL_JSON;
		});
	};
	
	reader.onloadend = function(e){		
		sendData = moment().valueOf();	
		app.lookup("grd1").dataSet.build(_data, false);
		app.lookup("grd1").redraw();
		responseData = moment().valueOf() - sendData;
		var dd = (moment.duration(responseData) / 1000);
		app.lookup("grdDrawTime").value = dd + "초";
	};
	console.log(fi1.file);
	reader.readAsBinaryString(fi1.file);		
	
	
}
