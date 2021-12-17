/************************************************
 * ExcelExport.js
 * Created at 2020. 7. 17. 오후 5:02:07.
 *
 * @author csj
 ************************************************/


/////////////////////////////////////////////////////////////////////

var mnStartNm = 1;
var mnAddScrollCount = 30;
var mnScrollCount = 0;
var _data ;
var sendData;
var responseData;

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	importExcel(fi1);

}


/**
 * 
 * @param {cpr.controls.FileInput} file
 */
function importExcel(file){
	sendData = moment().valueOf();	
	
	var reader = new FileReader();	
	
	reader.onload = function(e){
		var data = e.target.result;
		
		var workbook = XLSX.read(data , {type : 'binary'});
		
		workbook.SheetNames.forEach(function(item, index){
			ws = workbook.Sheets[item];
			var range = XLSX.utils.decode_range(workbook.Sheets[item]['!ref']); 
			
			//스크롤을 사용하기 위한 범위 설정 s.r = start row , e.r = end row
			//range.s.r = mnStartNm + mnAddScrollCount * mnScrollCount;
			//range.e.r = mnAddScrollCount + parseInt(range.s.r) - 1;
			
			range.s.r = 1;
			
			//1. 엑셀시트에서 첫번째 헤더값 가져오는거
//			var header = []
//			var columnCount = XLSX.utils.decode_range(ws['!ref']).e.c + 1
//			for (var i = 0; i < columnCount; ++i) {
//				header[i] = ws[`${XLSX.utils.encode_col(i)}1`].v
//			}
			//2. 데이터셋에서 컬럼이름 가져오는거
			var _header = app.lookup("dsList").getColumnNames();
			var EXCEL_JSON ; 
			if(mnScrollCount == 0){
				EXCEL_JSON = XLSX.utils.sheet_to_json(ws, {range : range, header: _header });
			}else{
				EXCEL_JSON = XLSX.utils.sheet_to_json(ws, {range : range, header: _header , skipHeader: 1 });
			}
			
			_data = EXCEL_JSON;
			
			
			
		});
	};
	
	reader.onloadend = function(e){		
		app.lookup("grd1").dataSet.build(_data,true);
		app.lookup("grd1").redraw();
		responseData = moment().valueOf() - sendData;
		console.log("걸린시간 :" + (moment.duration(responseData) / 1000));
	};
		
	reader.readAsBinaryString(file.file);		
}




/*
 * 그리드에서 scroll 이벤트 발생 시 호출.
 * 그리드 디테일 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrd1Scroll(/* cpr.events.CScrollEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;

//	if(e.scrollTop == e.maxScrollTop){
//		mnScrollCount+= 1;
//		importExcel(app.lookup("fi1"));
//	}
	
	
	

	
	
}
