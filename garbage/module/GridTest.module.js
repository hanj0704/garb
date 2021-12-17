/************************************************
 * GridTest.module.js
 * Created at 2019. 9. 25. 오후 5:03:06.
 *
 * @author HANS
 ************************************************/
function GridTest(/** cpr.core.AppInstance*/ app){
	this._app = app;
	this._GridConfig = {
	gridOption1 : {
				"dataSet": "",
				"columnMovable": false,
				"columnResizable": false,
				"columns": [
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.targetColumnName = "column1";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column1";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.targetColumnName = "column2";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column2";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.targetColumnName = "column3";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column3";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "column4";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column4";
							}
						}
					]
				},
				"detail": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnName = "column1";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "column2";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column3";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "column4";
							}
						}
					]
				}
			},
	gridOption2 : {
				"dataSet": "",
				"columnMovable": true,
				"columnResizable": true,
				"columns": [
					{"width": "25px"},
					{"width": "50px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.columnType = "checkbox";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.targetColumnName = "a";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "a";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "b";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "b";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.targetColumnName = "c";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "c";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.targetColumnName = "d";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "d";
							}
						}
					]
				},
				"detail": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnType = "checkbox";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnType = "rowindex";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "a";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "b";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "c";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "d";
							}
						}
					]
				}
			}
}
}

/**
 * 그리드 생성 옵션을 지정합니다.
 * @param {String} gridId 그리드 객체의 ID
 * @param {String} gridOption 그리드를 구성해주고자 하는 옵션
 * @param {cpr.data.DataSet} dataSet 데이터셋
 */
GridTest.prototype.testFunc = function(gridId,gridOption,dataSet){
	
/** @type cpr.controls.Grid */
	var vcGrid = this._app.lookup(gridId);
	console.log(gridId);
	console.log(gridOption);
	console.log(dataSet);
	
	
	this._GridConfig.gridOption1.dataSet = dataSet;
	
	var a = this._GridConfig.gridOption1;
	vcGrid.init(a);
}


globals.createGridTest = function(app) {
	return new GridTest(app);
}


cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	var control = e.control;
	//TODO 앱인스턴스 로드될때 , 그리드객체 찾고, 사용자속성 있는 그리드객체만 거르고, 루트에 있는 데이터셋 가져와서 그리드 꾸미기 
	if(control instanceof cpr.core.AppInstance) {
		
		var uiCtrls = control.getContainer().getAllRecursiveChildren();
		
		uiCtrls.forEach(function(/* cpr.controls.UIControl*/each){
			
			if(each instanceof cpr.controls.Grid) {
				
				if(each.userAttr("gridOption") != "" && each.userAttr("dataSet") != "") {
					
					console.log(each.userAttr("gridOption"));
					console.log(each.userAttr("dataSet"));
				}
				
				
				
			}
		});
	}
});

