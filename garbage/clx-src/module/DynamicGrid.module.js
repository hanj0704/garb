/************************************************
 * DynamicGrid.module.js
 * Created at 2021. 1. 12. 오후 2:15:23.
 *
 * @author ryu54
 ************************************************/

/************************************************
 * 그리드 동적 생성 설정 정보
 ************************************************/

/**
 * 그리드 표준 크기 (헤더, 디테일, 컬럼)
 * 필요 시 그룹 또는 푸터에 대한 표준 크기를 지정하십시오.
 * @type {
 *   column : {
 *     width: String
 *   },
 *   header : {
 *     height: String
 *   },
 *   detail : {
 *     height : String
 *   }
 * }
 */
var moGrdSizeConfig = {
	"column" : {
		"width" : "100px"
	},
	"header" : {
		"height" : "35px"
	},
	"detail" : {
		"height" : "32px"
	}
}


/**
 * 셀 생성 시 필요한 설정 정보
 * @type {
 *   HD_TXT : String <!-- 헤더 텍스트 컬럼명 -->,
 *   RW_IDX : String <!-- 셀의 로우 인덱스 -->,
 *   COL_IDX : String <!-- 셀의 컬럼 인덱스 -->,
 *   COL_NM : String <!-- 셀의 바인딩 컬럼명 -->
 * }
 */
var moBindConfig = {
	"HD_TXT" : "headerText",
	"RW_IDX" : "rowIndex",
	"COL_IDX" : "colIndex",
	"COL_NM" : "columnName"
}


/**
 * 
 * @param {cpr.controls.Grid} grid
 * @param {
 *   header : cpr.data.DataSet <!-- 그리드 헤더를 구성하는 데이터 셋 ID -->,
 *   detail : cpr.data.DataSet <!-- 그리드에 연결될 데이터 셋 ID -->
 * } config
 */
function DynamicGrid(grid, config) {
	if (grid instanceof cpr.controls.Grid == false){
		throw new cpr.exceptions.IllegalStateException("타겟이 그리드 컨트롤이 아닙니다. 다시 확인하여 주십시오.");
	}
	
	this._grid = grid;
	this._appInstance = grid.getAppInstance();
	this._headerDataset = config.header;
	this._detailDataset = config.detail;
	
	this.init();
}

/**
 * 
 * @type {{width:String}[]}
 */
DynamicGrid.prototype._columnSettings = [];

/**
* 
* @type 
* {
*   rows: {height:String}[],
*   cells: {
*     constraint: {rowIndex:Number,rowSpan:Number,colIndex:Number,colSpan:Number},
*     configurator: Function
*   }[]
* }
*/
DynamicGrid.prototype._headerSettings = {};

/**
* 
* @type 
* {
*   rows: {height:String}[],
*   cells: {
*     constraint: {rowIndex:Number,rowSpan:Number,colIndex:Number,colSpan:Number},
*     configurator: Function
*   }[]
* }
*/
DynamicGrid.prototype._detailSettings = {};


/**
 * 헤더 개수를 반환합니다.
 * @return {Number}
 */
DynamicGrid.prototype._getHeaderCount = function() {
	var dataset = this._headerDataset;
	var headerCount = dataset.getUnfilteredDistinctValues(moBindConfig.RW_IDX).length;
	return headerCount;
}

/**
 * 컬럼 개수를 반환합니다.
 * @return {Number}
 */
DynamicGrid.prototype._getColumnCount = function() {
	var dataset = this._headerDataset;
	var columnCount = dataset.getUnfilteredDistinctValues(moBindConfig.COL_IDX).length;
	return columnCount;
}

/**
 * 그리드 컬럼 레이아웃 정보를 동적으로 생성합니다.
 */
DynamicGrid.prototype._handleColumn = function() {
	var dataset = this._headerDataset;
	
	var originalLayout = moGrdSizeConfig.column.width;
	
	var colCount = this._getColumnCount();
	for(var idx = 0; idx < colCount; idx++){
		this._columnSettings.push({"width" : originalLayout});
	}
}


/**
 * 그리드 헤더 레이아웃 및 셀에 대한 정보를 동적으로 생성합니다.
 */
DynamicGrid.prototype._handleHeader = function() {
	var dataset = this._headerDataset;
	
	var originalLayout = moGrdSizeConfig.header.height;
	
	/* Rows */
	this._headerSettings.rows = [];
	var headerCount = this._getHeaderCount();
	for(var idx = 0; idx < headerCount; idx++){
		this._headerSettings.rows.push({"height" : originalLayout});
	}
	
	/** 세로 병합에 의해 스킵되는 셀에 해당하는 행 인덱스 */
	var skipCellIdcs = [];
	
	/* Cells */
	this._headerSettings.cells = [];
	var colCount = this._getColumnCount();
	var rowCount = dataset.getRowCount();
	for(var idx = 0; idx < rowCount; idx++){
		var headerText = dataset.getValue(idx, moBindConfig.HD_TXT);
		var rowIdx = dataset.getValue(idx, moBindConfig.RW_IDX);
		var colIdx = dataset.getValue(idx, moBindConfig.COL_IDX);
		var colNm = dataset.getValue(idx, moBindConfig.COL_NM);
		
		/* 세로 병합된 셀 제외 */
		if (skipCellIdcs.indexOf(idx) != -1){
			continue;
		}

		var rowSpan = 1;
		var colSpan = 1;
		
		/* 상위 헤더 셀이 병합되었는지 확인 */
		var alreadySpanned = false; // 상위 병합 여부
		var upperHeaderCell = dataset.findFirstRow(moBindConfig.RW_IDX + "==" + (rowIdx - 1) + "&&" + moBindConfig.COL_IDX + "==" + colIdx);
		if (upperHeaderCell != null){
			var upperHeaderCellIdx = upperHeaderCell.getIndex();
			alreadySpanned = skipCellIdcs.indexOf(upperHeaderCellIdx) != -1;
		}
		
		/* 상위 헤더 셀이 병합되지 않았을 때만 가로 병합 실행 */
		if (alreadySpanned == false){
			/* 가로 병합되는 셀 개수 구함 */
			var sameHeaders = dataset.findAllRow(moBindConfig.RW_IDX + "==" + rowIdx + "&&" + moBindConfig.COL_IDX + ">" + colIdx);
			for(var spIdx = 0; spIdx < sameHeaders.length; spIdx++){
				var nextHeader = sameHeaders[spIdx];
				var nextHeaderText = nextHeader.getValue(moBindConfig.HD_TXT);
				if (nextHeaderText == headerText){
					colSpan++;
					skipCellIdcs.push(nextHeader.getIndex());
				} else {
					break;
				}
			}
		}
		
		/* 가로 병합을 우선 시 하므로 이미 가로로 병합되었을 경우 세로 병합 하지 않음 */
		if (colSpan == 1){
			/* 현재 셀 기준으로 세로 병합될 셀 개수 구함 */
			for(var spIdx = rowIdx + 1; spIdx < headerCount; spIdx++){
				var nextRowHeader = dataset.findFirstRow(moBindConfig.RW_IDX + "==" + spIdx + "&&" + moBindConfig.COL_IDX + "==" + colIdx);
				var nextRowHeaderText = nextRowHeader.getValue(moBindConfig.HD_TXT);
				if (nextRowHeaderText == headerText) {
					rowSpan++;
					skipCellIdcs.push(nextRowHeader.getIndex());
				} else {
					break;
				}
			}
		}
		
		var config = (function(rowIndex, colIndex, rowSpan, colSpan, text, columnName) {
			return {
				constraint: {
					"rowIndex": rowIndex,
					"rowSpan": rowSpan,
					"colIndex": colIndex,
					"colSpan": colSpan
				},
				configurator: function(cell) {
					cell.targetColumnName = columnName;
					cell.text = text;
					//TODO 헤더 셀에 컨트롤을 동적으로 배치하는 경우 다음의 소스를 참고하십시오.
					/*
					 * cell.control = (function() {
					 * 	var output = new cpr.controls.Output();
					 * 	output.value = "";
					 * 	return output;
					 * })();
					 */
				}
			}
		})(rowIdx, colIdx, rowSpan, colSpan, headerText, colNm);
			
		this._headerSettings.cells.push(config);
	}
}


/**
 * 그리드 디테일 레이아웃 및 셀에 대한 정보를 동적으로 생성합니다.
 */
DynamicGrid.prototype._handleDetail = function() {
	var dataset = this._headerDataset;
	
	var originalLayout = moGrdSizeConfig.detail.height;
	
	this._detailSettings.rows = [];
	this._detailSettings.rows.push({"height" : originalLayout});
	
	this._detailSettings.cells = [];
	var headerRowCnt = this._getHeaderCount();
	var lastHds = dataset.findAllRow(moBindConfig.RW_IDX + " == " + (headerRowCnt - 1));
	for(var idx = 0; idx < lastHds.length; idx++){
		var header = lastHds[idx];
		
		var rowIdx = header.getValue(moBindConfig.RW_IDX);
		var colIdx = header.getValue(moBindConfig.COL_IDX);
		var colNm = header.getValue(moBindConfig.COL_NM);
		
		var config = (function(colIndex, columnName) {
			return {
				constraint: {
					"rowIndex": 0,
					"rowSpan": 1,
					"colIndex": colIndex,
					"colSpan": 1
				},
				configurator: function(cell) {
					cell.columnName = columnName;
					//TODO 디테일 셀에 컨트롤을 동적으로 배치하는 경우 다음의 소스를 참고하십시오.
					/*
					 * cell.control = (function() {
					 * 	var output = new cpr.controls.Output();
					 * 	output.value = "";
					 * 	return output;
					 * })();
					 */
				}
			}
		})(colIdx, colNm);
		
		this._detailSettings.cells.push(config);
	}
}

DynamicGrid.prototype.init = function() {
	var grid = this._grid;
	
	/* 변수 초기화 */
	this._columnSettings = [];
	this._headerSettings = {};
	this._detailSettings = {};

	this._handleColumn();
	this._handleHeader();
	this._handleDetail();
	
	grid.init({
		dataSet : this._detailDataset,
		resizableColumns: "all",
		columns : this._columnSettings,
		header : this._headerSettings,
		detail : this._detailSettings
	});
}

/**
 * 
 * @param {cpr.controls.Grid} grid
 * @param {
 *   header : cpr.data.DataSet <!-- 그리드 헤더를 구성하는 데이터 셋 ID -->,
 *   detail : cpr.data.DataSet <!-- 그리드에 연결될 데이터 셋 ID -->
 * } config
 */
globals.createGrid = function(grid, config) {
	return new DynamicGrid(grid, config);
}