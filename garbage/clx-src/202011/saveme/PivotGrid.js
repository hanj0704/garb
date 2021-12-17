/************************************************
 * Pivot.js
 * Created at 2020. 9. 9. 오후 2:56:15.
 *
 * @author ryu54
 ************************************************/

var util = createCommonUtil();

var _data ;
var sendData;
var responseData;

/**
 * 
 * @param {cpr.controls.FileInput} file
 */
function importExcel(file){
	sendData = moment().valueOf();	
			util.showLoadMask(app);
	var reader = new FileReader();	
	
	reader.onload = function(e){
//		util.showLoadMask(app);
		var data = e.target.result;
		
		var workbook = XLSX.read(data , {type : 'binary'});
		
		workbook.SheetNames.forEach(function(item, index){
			ws = workbook.Sheets[item];
			var range = XLSX.utils.decode_range(workbook.Sheets[item]['!ref']); 
			
			range.s.r = 1;
			//2. 데이터셋에서 컬럼이름 가져오는거
			var _header = app.lookup("dsList").getColumnNames();
			var EXCEL_JSON ; 
				EXCEL_JSON = XLSX.utils.sheet_to_json(ws, {range : range, header: _header });
			
			_data = EXCEL_JSON;
			
		});
	};
	
	reader.onloadend = function(e){		
		app.lookup("dsList").build(_data,false);
		responseData = moment().valueOf() - sendData;
		console.log("걸린시간 :" + (moment.duration(responseData) / 1000));
		util.hideLoadMask(app);
	};
		
	reader.readAsBinaryString(file.file);		
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subList2", null, function(pbSuccess) {
		if (pbSuccess){
			
//			app.lookup("pivotGrid").setup(app.lookup("dsList"));
				
			var vaConfig = {
				"cols" : [],
				"rows" : [],
				"values":[]
			};
			
			var vcDataSet = app.lookup("dsList");
			
			vcDataSet.getHeaders().forEach(function(each){
				
				var _eachs = {
					"column" : each.getName(),
					"label" : each.getInfo()
				}
				
				vaConfig.rows.push(_eachs);
			});
			
			app.lookup("pivotGrid").setup(app.lookup("dsList"), vaConfig);
			app.lookup("optColCount").value = "총 컬럼 갯수 : " + app.lookup("pivotGrid").getColCnt() + " 개";
			app.lookup("optRowCnt").value = "총 행 갯수 : " + app.lookup("pivotGrid").getRowCnt() + " 개";
			util.Control.redraw(app, "pivotGrid");
			
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 execute 이벤트 발생 시 호출.
 * 피벗을 실행했을 때 발생하는 이벤트
 */
function onPivotHelperHExecute(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type udc.scr.PivotHelperH
	 */
	var pivotHelperH = e.control;
	
	/** @type {{dataset : cpr.data.DataSet, cellType : "split" | "merged", config : Object}} */
	var voPvSt = e.content;
	
	var vcPvGrd = app.lookup("pivotGrid");
	
	vcPvGrd.suppressedCellType = voPvSt.cellType;
	vcPvGrd.setup(voPvSt.dataset, voPvSt.config);
	app.lookup("optColCount").value = "총 컬럼 갯수 : " + vcPvGrd.getColCnt() + " 개";
	app.lookup("optRowCnt").value = "총 행 갯수 : " + app.lookup("pivotGrid").getRowCnt() + " 개";
}


/*
 * 사용자 정의 컨트롤에서 toggle 이벤트 발생 시 호출.
 * 피벗 컨텐츠가 숨겨지거나 표시되었을 때 발생하는 이벤트
 */
function onPivotHelperHToggle(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type udc.scr.PivotHelperH
	 */
	var pivotHelperH = e.control;
	
	var vcPvGrid = app.lookup("pivotGrid");
	
	var vbVisible = e.content.visible;
	
	var vsTopRect = "";
	if(vbVisible) {
		
		vsTopRect = "325px";
	} else {
		vsTopRect = "120px";
	}
	
		vcPvGrid.getParent().updateConstraint(vcPvGrid, {
			"top" : vsTopRect
		});	
}


/*
 * "임포트" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("fi1").openFileChooser();
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
	
	importExcel(fi1);
}


/*
 * "엑셀 임포트" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var conf = {
				"cols" : ["DIV_NM","CODE_NAME"],
				"rows" : ["CODE_YEAR"],
				"values" : ["CNT"]
			};
	app.lookup("pivotGrid").easyDraw(app.lookup("ds1"), conf);
}

//function autoDraw(configs){
//	var vcGrid = app.lookup("grd1");
//	var vcDs = app.lookup("ds1");
//	
//
//			var vaConfig = {
//				"cols" : [],
//				"rows" : [],
//				"values":[]
//			};
//		var instantConfig = configs;
//		
//		
//		if(instantConfig.cols.length > 0) {
//			instantConfig.cols.forEach(function(each){
//				
//				var temp = {
//					"column" : each,
//					"label" : vcDs.getHeader(each).getInfo()
//				}
//				vaConfig.cols.push(temp);
//			});
//		}
//		if(instantConfig.rows.length > 0) {
//			
//			instantConfig.rows.forEach(function(each,idx){
//				var rowTemp = {
//					"column" : each,
//					"label" : vcDs.getHeader(each).getInfo(),
//					"suppressRef" : (idx-1),
//					"sippressible" : true
//				}
//				vaConfig.rows.push(rowTemp);
//			});
//		}
//		if(instantConfig.values.length > 0) {
//			
//			instantConfig.values.forEach(function(each){
//				
//				var valueTemp = {
//					"column" : each,
//					"label" : vcDs.getHeader(each).getInfo(),
//					"aggregator" : vcDs.getHeader(each).getDataType() == "number" ? "sum" : "count"
//				}
//				
//				vaConfig.values.push(valueTemp);
//			});
//		}
//		app.lookup("pivotGrid").setup(app.lookup("piHelper").dataset, vaConfig);
//}


/*
 * "피벗그리기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("pivotGrid").setRowGroup();
}
