///************************************************
// * DynamicGrid.module.js
// * Created at 2021. 1. 12. 오후 2:15:23.
// *
// * @author ryu54
// ************************************************/
//
//
//var gridConfig = {
//	"column" : {
//		"width" : "100px"
//	},
//	"header" : {
//		"height" : "35px"
//	},
//	"detail" : {
//		"height" : "32px"
//	}
//}
//
//
///**
// * 
// * @param {cpr.controls.Grid} grid
// * @param {
// *   header : cpr.data.DataSet <!-- 그리드 헤더를 구성하는 데이터 셋 ID -->,
// *   detail : cpr.data.DataSet <!-- 그리드에 연결될 데이터 셋 ID -->
// * } config
// */
//function DynamicGrid(grid, config) {
//	if (grid instanceof cpr.controls.Grid == false){
//		throw new cpr.exceptions.IllegalStateException("타겟이 그리드 컨트롤이 아닙니다. 다시 확인하여 주십시오.");
//	}
//	
//	this._grid = grid;
//	this._appInstance = grid.getAppInstance();
//	this._headerDataset = config.header;
//	this._detailDataset = config.detail;
//	
//	/*
//	 * this._columnSettings = [];
//	 * this._headerSettings = {};
//	 * this._detailSettings = {};
//	 */
//	
//	this.init();
//}
//
///**
// * 
// * @type {{width:String}[]}
// */
//DynamicGrid.prototype._columnSettings = [];
//
///**
//* 
//* @type 
//* {
//*   rows: {height:String}[],
//*   cells: {
//*     constraint: {rowIndex:Number,rowSpan:Number,colIndex:Number,colSpan:Number},
//*     configurator: Function
//*   }[]
//* }
//*/
//DynamicGrid.prototype._headerSettings = {};
//
///**
//* 
//* @type 
//* {
//*   rows: {height:String}[],
//*   cells: {
//*     constraint: {rowIndex:Number,rowSpan:Number,colIndex:Number,colSpan:Number},
//*     configurator: Function
//*   }[]
//* }
//*/
//DynamicGrid.prototype._detailSettings = {};
//
//DynamicGrid.prototype._handleColumn = function() {
//	var dataset = this._headerDataset;
//	
//	var originalLayout = gridConfig.column.width;
//	
//	var colCount = dataset.getRowCount();
//	for(var idx = 0; idx < colCount; idx++){
//		this._columnSettings.push({"width" : originalLayout});
//	}
//}
//
//DynamicGrid.prototype._handleHeader = function() {
//	var dataset = this._headerDataset;
//	
//	var originalLayout = gridConfig.header.height;
//	
//	/* Rows */
//	this._headerSettings.rows = [];
//	var headerCount = dataset.getColumnCount();
//	for(var idx = 0; idx < headerCount; idx++){
//		this._headerSettings.rows.push({"height" : originalLayout});
//	}
//	
//	/* Cells */
//	this._headerSettings.cells = [];
//	var colCount = dataset.getRowCount();
//	var vaHeaderRow  = [];
//	for(var rowIdx = 0; rowIdx < headerCount; rowIdx++){
//		var colNm = dataset.getColumnNames()[rowIdx];
//		for(var colIdx = 0; colIdx < colCount; colIdx++){
//			var headerText = dataset.getValue(colIdx, colNm);
//			vaHeaderRow.push(headerText);
//		}
//	}
//	for(var rowIdx = 0; rowIdx < headerCount; rowIdx++){
//		var colNm = dataset.getColumnNames()[rowIdx];
//		for(var colIdx = 0; colIdx < colCount; colIdx++){
//			var headerText = dataset.getValue(colIdx, colNm);
//			var config = {
//				constraint : {
//					"rowIndex" : rowIdx,
//					"rowSpan" : 1,
//					"colIndex" : colIdx,
//					"colSpan" : 1
//				},
//				configurator: function(cell) {
//					//TODO 마지막 변수에 대한 텍스트가 들어가는 문제 있음
//					cell.text = vaHeaderRow.shift();
//				}
//			}
//			this._headerSettings.cells.push(config);
//		}
//	}
//}
//
//DynamicGrid.prototype._handleDetail = function() {
//	var dataset = this._detailDataset;
//	
//	var originalLayout = gridConfig.detail.height;
//	
//	this._detailSettings.rows = [];
//	this._detailSettings.rows.push({"height" : originalLayout});
//	
//	this._detailSettings.cells = [];
//	var headerCount = this._headerDataset.getRowCount();
//	for(var idx = 0; idx < headerCount; idx++){
//		var colNm = dataset.getColumnNames()[idx];
//		
//		var config = {
//				constraint : {
//					"rowIndex" : 0,
//					"rowSpan" : 1,
//					"colIndex" : idx,
//					"colSpan" : 1
//				},
//				configurator: function(cell) {
//					cell.columnName = "empId";
//					//TODO 마지막 변수에 대한 텍스트가 들어가는 문제 있음
//					/*
//					 * cell.columnName = (function() {
//					 * 	return colNm;
//					 * })();
//					 */
//				}
//			}
//		
//		this._detailSettings.cells.push(config);
//	}
//}
//
//DynamicGrid.prototype.init = function() {
//	var grid = this._grid;
//	
//	this._handleColumn();
//	this._handleHeader();
//	this._handleDetail();
//	
//	console.log(this._columnSettings);
//	console.log(this._headerSettings);
//	console.log(this._detailSettings);
//	
//	grid.init({
//		dataset : this._detailDataset,
//		resizableColumn: "all",
//		columns : this._columnSettings,
//		header : this._headerSettings,
//		detail : this._detailSettings
//	});
//}
//
///**
// * 
// * @param {cpr.controls.Grid} grid
// * @param {
// *   header : cpr.data.DataSet <!-- 그리드 헤더를 구성하는 데이터 셋 ID -->,
// *   detail : cpr.data.DataSet <!-- 그리드에 연결될 데이터 셋 ID -->
// * } config
// */
//globals.createGrid = function(grid, config) {
//	return new DynamicGrid(grid, config);
//}