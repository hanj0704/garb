/************************************************
 * createGrid.module.js
 * Created at 2020. 6. 2. 오전 10:19:09.
 *
 * @author HANS
 ************************************************/
//서버에서 내려오는 빈값에 대한 양식이 null이거나 빈문자열일 수 있으므로, 지정된 양식에 맞추어서 해당 변수값을 변경하십시오.
var msNull = "";
//헤더행 높이를 설정합니다.
var mnRowHeight = 40;
//디테일행 높이를 설정합니다.
var mnDetailHeight = 35;


var vsHeaderLabelColumn = "HEADER_NM";
var vsHeaderColumn = "HEADER_ID";
var vsParentColumn = "PARENT_HDRID";


//그리드를 그리기위한 정보가 넘어오지 않을 경우, 기본 그리드를 그리기 위한 default grid initConfig입니다.
var moGridStandardConfig = {
		"columns": [{
			"width": "100px"
		}, ],
		"header": {
			"rows": [{
				"height": "24px"
			}],
			"cells": [{
				"constraint": {
					"rowIndex": 0,
					"colIndex": 0
				},
				"configurator": function(cell) {}
			}]
		},
		"detail": {
			"rows": [{
				"height": "24px"
			}],
			"cells": [{
				"constraint": {
					"rowIndex": 0,
					"colIndex": 0
				},
				"configurator": function(cell) {}
				
			}]
		}
	};
	


//그리드를 생성할 때 필요한 데이터셋에서, 실제 데이터를 표시하는데 사용하는 컬럼 정보를 가진 행들만 저장해놓는 변수입니다.
/** @type cpr.data.Row[]*/
var vaUsedRows =[];

globals.createGrid = createGrid;

/**
 * 그리드를 동적으로 생성하는 함수입니다. 
// * @param {String} psGridId 그리드의 ID
 * @param {cpr.data.DataSet} pcGridConfigDataSet 그리드의 컬럼 정보를 구성하는 데이터셋
 * @param {cpr.data.DataSet} pcGridBindDataSet 그리드의 디테일 데이터를 구성하는 데이터셋
 * @param {Boolean} isAnalys 분석상태에 따라 그리드가 변경될 수 있는지에 대한 유무를 제공합니다. 기본값은 false입니다.
 * @param {{eventNm : String , func : Function}[]} paEvents? 그리드에 연결할 이벤트{eventNm : String , func : Function}의 배열
 */
function createGrid(pcGridConfigDataSet,pcGridBindDataSet, isAnalys,paEvents){

		var vcDataSet = pcGridConfigDataSet;
		var vcBindDataSet;
		
		var vbAnalys = isAnalys == "" ? false : isAnalys;
		
		if(vbAnalys) {
			
		var nintendoDs = fakeDataSet(pcGridConfigDataSet, pcGridBindDataSet);
		console.log(pcGridBindDataSet);
		vcBindDataSet = nintendoDs;
		} else {
			
		vcBindDataSet = new cpr.data.DataSet("grdDs");
		
		var vaColData = [];
		pcGridBindDataSet.getColumnNames().forEach(function(each){
			
			var vsName = {};
			vsName.name = each;
			vsName.dataType = pcGridBindDataSet.getHeader(each).getDataType();
			vaColData.push(vsName);
		});
		
		vcBindDataSet.parseData({
			columns : vaColData,
			rows : pcGridBindDataSet.getRowDataRanged()
		});
		}
		
//		console.log(vcDataSet.getRowDataRanged());
//		console.log(vcBindDataSet.getColumnNames());
	
//		vcDataSet.setSort("ORDER_SEQ asc");
				var vaAllHeaderID = vcDataSet.getUnfilteredDistinctValues(vsHeaderColumn,function(/*cpr.data.DataRow*/dataRow){
    	return dataRow.getValue(vsHeaderColumn) != "";
    });
		vcDataSet.forEachOfUnfilteredRows(function(/*cpr.data.DataRow*/dataRow){
			
			var vsParentHdrid = dataRow.getValue(vsParentColumn);
			if(vsParentHdrid != "") {
				var isExistInHeader = vaAllHeaderID.indexOf(vsParentHdrid);
				if(isExistInHeader < 0){
					dataRow.setValue(vsParentColumn, "");
				}
			}
		});
		var vnHeaderDepth =	getHeaderDepth(vcDataSet);
//		console.log("전체크기 : " + res);
		/** @type cpr.controls.gridpart.GridConfig */
		var voGridInitConfig = {
			"dataSet" : {},
			"columns":[],
			"header" : {
				"rows" : [],
				"cells" : []
			},
			"detail" : {
				"rows": [],
				"cells" :[]
			}
		}
		
		var vcGrid = new cpr.controls.Grid("grd");
		
		if(vcDataSet.getRowCount() > 0) {
		
		vaUsedRows = classifyUsedColumn(vcDataSet);
		var vaAutoFit = vaUsedRows.filter(function(each){
			if(each.getValue("COLUMN_FIXYN")=="Y") {
				return each;
			}
		}).map(function(each){
			return each.getIndex();
		});

		voGridInitConfig.dataSet = vcBindDataSet;
//		voGridInitConfig.autoFit = vaAutoFit.toString();

		for(var headerLeng = 0 ; headerLeng < vnHeaderDepth ; headerLeng++) {
			
			voGridInitConfig.header.rows.push({"height" : mnRowHeight+"px"});
		}
		
			vcDataSet.getRowDataRanged().forEach(function(each,idx){
			voGridInitConfig.header.cells.push({
				"constraint" : getGridHeaderConfig(vcDataSet, vcDataSet.getRow(idx),vnHeaderDepth),
				"configurator" :  function(cell) {
				cell.text = each["HEADER_NM"];
				cell.visible =each["HIDE_YN"] == "Y" ? false : true;
				}
			});
		});
		console.log(vcBindDataSet.getColumnNames());
		vcBindDataSet.getColumnNames().forEach(function(each,idx){
		/** @type cpr.data.Row */
			var voConfigRow = vaUsedRows[idx];
			var vnColumnWidth = voConfigRow.getValue("COLUMN_WID") != "" ? voConfigRow.getValue("COLUMN_WID") : "70";
			voGridInitConfig.columns.push({"width" : vnColumnWidth+"px"});
//			if(each.indexOf("TMPV") >=0){
			voGridInitConfig.detail.cells.push({
				"constraint" :{"rowIndex" : 0, "colIndex" : idx},
				"configurator" : function(cell) {
					cell.columnName = each;
					cell.suppressible = voConfigRow.getValue("GROUP_MERGEYN") == 'Y' ? true : false;
					cell.control = (function(){
									var opts = createControlByType(voConfigRow.getValue("HEADER_TYP"), voConfigRow.getValue("COLUMN_FORMAT"));
									opts.bind("value").toDataColumn(each);
									return opts;
								})();
				}
			});
//			} else {
//				voGridInitConfig.detail.cells.push({
//				"constraint" :{"rowIndex" : 0, "colIndex" : idx},
//				"configurator" : function(cell) {
//					cell.columnName = each;
//					cell.suppressible = voConfigRow.getValue("GROUP_MERGEYN") == 'Y' ? true : false;
//					cell.control = (function(){
//									var opts = createControlByType(voConfigRow.getValue("HEADER_TYP"), voConfigRow.getValue("COLUMN_FORMAT"));
//									opts.bind("value").toDataColumn(each);
//									return opts;
//								})();
//				}
//			});
//			}
		});
		
		voGridInitConfig.detail.rows.push({"height" : mnDetailHeight+"px"});
		vcGrid.init(voGridInitConfig);
		} else {
			
			vcGrid.init(moGridStandardConfig);
		}
		if(paEvents && paEvents.length > 0) {
			
			paEvents.forEach(function(each){
				
				vcGrid.addEventListener(each.eventNm,each.func);
			});
		}
		
		vcGrid.noDataMessage = "데이터가 존재하지 않습니다.";
		
		
//		reBuildGrid(vcDataSet, vcGrid);
		return vcGrid;
}


/**
 * 그리드를 설정하는 데이터셋의 행별로 배치 속성을 구하는 함수입니다.
 * @param {cpr.data.DataSet} pcDataSet
 * @param {cpr.data.DataRow} poRow
 * @param {Number} pnHeaderDepth
 */
function getGridHeaderConfig(pcDataSet,poRow,pnHeaderDepth){
	
	var vcDataSet = pcDataSet;


	var vsParentId = poRow.getValue(vsParentColumn);
	var vsHeaderId = poRow.getValue(vsHeaderColumn);
	
	var vnColIndex = checkColumnIndex2(vcDataSet, poRow);
//	var vnColIndex = checkColumnIndex(vcDataSet, poRow);	
	var att = getHeaderDeteil(vcDataSet, poRow, pnHeaderDepth);
	att.colIndex = vnColIndex;
	
	return att;
}

/**
 * 그리드를 설정하는 데이터셋의 행별로 컬럼이 배치되는 인덱스를 리턴하는 함수입니다. 
 * @param {cpr.data.DataSet} pcDataSet
 * @param {cpr.data.DataRow} poRow
 * @return {Number}
 */
function checkColumnIndex(pcDataSet, poRow){
		var vcDataSet = pcDataSet;
		var vnRowIndex = poRow.getIndex();
		var vaAllChild = vcDataSet.getUnfilteredDistinctValues(vsParentColumn);
		var vsExpress = "";
		var vaColumnIndex = vcDataSet.findAllRow(vsParentColumn+" == '"+poRow.getValue(vsHeaderColumn)+"'");//자신의 자식들을 찾습니다.
		if(vaColumnIndex.length > 0){//자신의 자식이 있으면, 자식들중에 다시 자식들이 있는지 확인하며, 자식들중 컬럼인덱스가 가장 작은 자식의 인덱스를 반환합니다.
			vaColumnIndex = vaColumnIndex.map(function(each){
				return checkColumnIndex(vcDataSet, each);
			}).sort(function(a,b){
						return a-b;
					});
			return vaColumnIndex[0];
		} else {
			
		vaAllChild.forEach(function(each){
			if(each != msNull){
				vsExpress += vsHeaderColumn+" !='"+each+"' &&";
			}
		});
		vsExpress += "getIndex() < " + vnRowIndex;
		return vcDataSet.findAllRow(vsExpress).length;
		}
}

/**
 * 
 * @param {cpr.data.DataSet} pcDataSet
 * @param {cpr.data.Row} poRow
 */
function checkColumnIndex2(pcDataSet, poRow) {
	
	var vcDataSet = pcDataSet;
	
	var vcTree = new cpr.controls.Tree("testTree");
	
	vcTree.setItemSet(vcDataSet, {
		label : "HEADER_NM",
		value : vsHeaderColumn,
		parentValue : vsParentColumn
	});
	var res = 0;
	var item = vcTree.getItemByValue(poRow.getValue(vsHeaderColumn));
	
	var vcMatchedItem = vcTree.getItems().filter(function(each){
		return!(vcTree.hasChild(each));
	});
	var vaMatchedItemValues = vcMatchedItem.map(function(each){
		return each.value;
	});
	
	if(vcTree.hasChild(item)){
		var a = vcMatchedItem.filter(function(each){
			if(each.hasAncestor(item.value)) {
				return each;
			}
		});
		res = vcMatchedItem[vaMatchedItemValues.indexOf(a[0].value)];
	}else {
		res = vcMatchedItem[vaMatchedItemValues.indexOf(item.value)];
	}
	return res;
}
/**
 * 그리드에서 상위헤더가 아닌, 실제 데이터를 보여주는 컬럼들을 배열로 리턴하는 함수입니다.
 * 각 컬럼별 데이터 타입과 포맷 양식을 파악하기 위해 사용합니다.
 * @param {cpr.data.DataSet} pcDataSet
 * @returns {cpr.data.Row[]}
 */
function classifyUsedColumn(pcDataSet) {

    var vcDataSet = pcDataSet;
	
	if(vcDataSet.getRowCount() > 0){
		
    var vaAllChild = vcDataSet.getUnfilteredDistinctValues(vsParentColumn,function(/*cpr.data.DataRow*/dataRow){
    	return dataRow.getValue(vsParentColumn) != "";
    });
    var vsExpress = "";
    if(vaAllChild.length > 0) {
    	
    vaAllChild.forEach(function(each) {
            vsExpress += vsHeaderColumn+"!='" + each + "'&&";
    });

    vsExpress = vsExpress.slice(0, -2);
    } else {
    	vsExpress += true;
    }
    return vcDataSet.findAllRow(vsExpress);
	} else {
		return null;
	}
}
globals.classifyUsedColumn = classifyUsedColumn;
/**
 * 입력된 타입과 포맷을 가진 아웃풋 컨트롤을 리턴하는 함수입니다.
 * @param {String} psType
 * @param {String} psFormat
 * @returns {cpr.controls.Output}
 */
function createControlByType(psType,psFormat) {
	
	var vcOutput = new cpr.controls.Output();
	
	switch(psType){
		case "D" :
			vcOutput.dataType = "date";
			vcOutput.format = psFormat.toUpperCase();
			break;
		case "N" :
			vcOutput.dataType = "number";
			vcOutput.format = "s#,###.##";
			vcOutput.style.addClass("text-right");
			break;
		default :
			vcOutput.dataType = "string"
			break;
	}
	
	return vcOutput;
}

/**
 * 멀티헤더일 경우 멀티헤더 갯수를 구하는 함수입니다.
 * @param {cpr.data.DataSet} pcDataSet 데이터셋
 * @return {Number} 헤더 갯수
 */
function getHeaderDepth(pcDataSet){
	
	var vcDataSet = pcDataSet;
	
	var vnHeaderDepth =1;
    var vaAllChild = vcDataSet.getUnfilteredDistinctValues(vsParentColumn,function(/*cpr.data.DataRow*/dataRow){
    	return dataRow.getValue(vsParentColumn) != "";
    });
    
    while(vaAllChild.length >0) {
    	
    	vnHeaderDepth += 1;
    	vaAllChild = vaAllChild.map(function(each){
    		var row = vcDataSet.findFirstRow(vsHeaderColumn+" == '"+each+"'").getValue(vsParentColumn);
    			
				return row;
    	}).filter(function(each){
    		return each != "";
    	});;
    	
    }
    return vnHeaderDepth;
}

/**
 * 헤더의 상세 크기를 계산하는 함수입니다.
 * @param {cpr.data.DataSet} pcDataSet
 * @param {cpr.data.DataRow} poRow
 * @param {Number} res
 * @return {{rowIndex :Number, colIndex : Number, rowSpan : Number, colSpan : Number}}
 */
function getHeaderDeteil(pcDataSet, poRow,res){
		
		var vcDataSet = pcDataSet;
		var rowIndex =0;
		var vnRowSpan = res;
		var vnColSpan = 1;
		var vsHeaderId = poRow.getValue(vsHeaderColumn);
		var vsParentID = poRow.getValue(vsParentColumn)
		
		var vaAllChild = vcDataSet.findAllRow(vsParentColumn+ "== '"+vsHeaderId+"'").map(function(each){
			return each.getValue(vsHeaderColumn);
		}).filter(function(eachs){
			return eachs != "";
		});
		var vnColSpanAll = 0;
		if(vsParentID) {
			if(vaAllChild.length > 0) {
				
			rowIndex = res-1;
			vnRowSpan = res-1;
			while(vaAllChild.length > 0) {//이부분에서 colSpan이 중요
				var vaTempArray =[];
				rowIndex = rowIndex-1;
				vnRowSpan = vnRowSpan-1;
				vaAllChild.forEach(function(each){
					var vaSmallChild = vcDataSet.findAllRow(vsParentColumn+"== '"+each+"'");
					if(vaSmallChild.length <1) {
						vnColSpanAll += 1;
					} 
					vaTempArray = vaTempArray.concat(vaSmallChild);
					
				});
				vaAllChild = vaTempArray;
					
			}
			vnColSpan = vnColSpanAll;
		
			} else {
				rowIndex += 1;
				vnRowSpan = vnRowSpan -1;
				var voFirstParent = vcDataSet.findFirstRow(vsHeaderColumn+" == '"+vsParentID+"'");
				while(voFirstParent.getValue(vsParentColumn) !=""){
				vnRowSpan = vnRowSpan -1;
				rowIndex += 1;
					voFirstParent = vcDataSet.findFirstRow(vsHeaderColumn+" =='"+voFirstParent.getValue(vsParentColumn)+"'");
				}
				
			}
		} else {
			if(vaAllChild.length > 0) {
				vnRowSpan = 1;
			while(vaAllChild.length > 0) {
				var vaTempArray =[];
				vaAllChild.forEach(function(each){
					var vaSmallChild = vcDataSet.findAllRow(vsParentColumn+"== '"+each+"'");
					if(vaSmallChild.length <1) {
						vnColSpanAll += 1;
					} 
					vaTempArray = vaTempArray.concat(vaSmallChild);
					
				});
				vaAllChild = vaTempArray;
					
			}
			vnColSpan = vnColSpanAll;
		
			} else {
				//최상위
				rowIndex = 0;
				vnColSpan = 1;
				vnRowSpan = res;
			}
		}
		
	return {
		"rowIndex" : rowIndex,
		"colIndex" : 0,
		"rowSpan" : vnRowSpan,
		"colSpan" : vnColSpan
	}
}


/**
 * 차트를 리턴하는 함수입니다.
 * @param {String} psCtrlId
 * @param {cpr.controls.Grid} pcGrid
 * @param {cpr.data.DataMap} pcDataMap
 * @param {cpr.data.Row[]} paRows
 */
function createChartCtrl(psCtrlId,pcGrid,pcDataMap,paRows){
		
		var vcChartUDC = new udc.cmn.ApexChartUDC("chart"+psCtrlId);
		vcChartUDC.GridControl = pcGrid;
		vcChartUDC.datamapControl = pcDataMap;
		vcChartUDC.headerRows = paRows;
		
		return vcChartUDC;
}

globals.createChartCtrl = createChartCtrl;


/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 */
function revertGrids(pcGrid){
	
	var vcGrid = pcGrid;
	var vcDsDetail = pcGrid.dataSet;
	
	var vaColNms = vcDsDetail.getColumnNames();
	console.log(vaColNms);
	var initConfig = vcGrid.getInitConfig();
	console.log(initConfig);
	
	vaColNms.forEach(function(each){
		
		var idx =	vcGrid.getCellIndex(each);
		if(each.indexOf("TEST") >=0) {
			vcDsDetail.deleteColumn(each);
			vcGrid.deleteColumn(idx);
			initConfig.header.cells.splice(each,1);
			initConfig.detail.cells.splice(each,1);
		}
	});
	
	vcGrid.init(initConfig);
	vcGrid.redraw();
	
	
	
}

globals.revertGrids = revertGrids;
/**
 * 
 * @param {cpr.data.DataSet} vcGridConfigDataSet
 * @param {cpr.controls.Grid} pcGrid
 */
function reBuildGrid (vcGridConfigDataSet,pcGrid) {
	
	var cases = ["전일대비증감","전일대비증감율","최고,최저,평균"];
	
	var vcGrid = pcGrid;
	
	var vcDsConfig = vcGridConfigDataSet;
	var vcDsDetail = pcGrid.dataSet;
	
	var vaDeColNames = vcDsDetail.getColumnNames();
		
//		revertGrids(vcGrid);
		
	var rowList = classifyUsedColumn(vcDsConfig);	
	
	var vaNumRowList = rowList.filter(function(each){
		
			if(each.getValue("HEADER_TYP")=="N") {
				
				return each;
			}
	});
		
	var someArray =[];
	vaNumRowList.reverse();
	vaNumRowList.forEach(function(each,idx){
		
		var detailData = vcDsDetail.getColumnData(vaDeColNames[rowList.indexOf(each)]);
		
		var replaceDetail =  detailData.map(function(each,idx){
			
			if(detailData[idx+1]) {
				return each - detailData[idx+1]
			} else {
				return 0;
			}
		});
		vcDsDetail.addColumn(new cpr.data.header.Header("TEST"+idx,"number",cpr.data.header.HeaderType.DISPLAY_COLUMN,""));
		
		var column = vcDsDetail.getColumn("TEST"+idx);
		
		replaceDetail.forEach(function(eachs,idx){
			column.putValue(idx,eachs)
		});
		
		addColumnInGrid(pcGrid, rowList.indexOf(each), "TEST"+idx);
	});

}
globals.reBuildGrid = reBuildGrid;


/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 * @param {Number} pnIndex
 * @param {String} colName
 */
function addColumnInGrid(pcGrid,pnIndex,colName) {
	
	var vcGrid = pcGrid;
	
	var initConfig = vcGrid.getInitConfig();
	
	initConfig.header.cells.forEach(function(each){
//		debugger;
		var coli = each.constraint.colIndex;
		
		if(coli == pnIndex) {
//			coli +=1;
			each.constraint.colIndex = pnIndex;
			initConfig.header.cells.push({
				"constraint" : {
					rowIndex : 0,
					colSpan : 1,
					rowSpan : 1,
					colIndex : pnIndex+1
				},
				"configurator" :  function(cell) {
				cell.text = "전일대비증감";
				cell.visible = true;
				}
			});
		} else if(coli > pnIndex){
			coli +=1;
			
			each.constraint.colIndex = coli;
		}
	});
	
	
	initConfig.detail.cells.forEach(function(each){
		
		var colin = each.constraint.colIndex;
		
		if(colin == pnIndex) {
			each.constraint.colIndex = colin;
			initConfig.detail.cells.push({
				"constraint" :{"rowIndex" : 0, "colIndex" : pnIndex+1},
				"configurator" : function(cell) {
					cell.columnName = colName;
					cell.control = (function(){
									var opts = createControlByType("N","");
									opts.bind("value").toDataColumn(colName);
									return opts;
								})();
				}
			});
			
		} else if(colin > pnIndex){
			colin +=1;
			
			each.constraint.colIndex = colin;
		}
		
	});
	initConfig.columns.push({width:"100px"});
	vcGrid.init(initConfig);
	vcGrid.redraw();
}

/**
 * 
 * @param {cpr.data.DataSet} pcConfigDataSet
 * @param {cpr.data.DataSet} pcDetailDataSet
 */
function fakeDataSet(pcConfigDataSet,pcDetailDataSet){
	
	
	var vcDsConfig = pcConfigDataSet;
	var vcDsDetail = pcDetailDataSet;
	var vaColNames = vcDsConfig.getColumnNames();
	
	var vaColumnDefine = [];
	
	var vaAllRow = 	vcDsConfig.findAllRow("true");
	var classifyColumn = classifyUsedColumn(vcDsConfig);

	classifyColumn.forEach(function(each,idx){
		
		if(each.getValue("HEADER_TYP") == "N") {
			var rowData = each.getRowData();
			rowData[vsHeaderColumn] = rowData[vsHeaderColumn]+"TEST";
			rowData["ORDER_SEQ"] = rowData["ORDER_SEQ"]+0.1;
			rowData["HEADER_NM"] = "전일대비증감";
			
			vaColumnDefine.push(rowData);
			
//			var cols = new cpr.data.Column(dataSet, name);
//			vcDsDetail.addColumn(new cpr.data.header.ExpressionHeader("TEST"+classifyColumn.indexOf(each), 'self.getValue(getIndex(),"TMPV'+classifyColumn.indexOf(each)+'") - self.getValue(getIndex()+1,"TMPV'+classifyColumn.indexOf(each)+'")'))
		}
	});

	var newDs = new cpr.data.DataSet('TEST');
//	vcDsDetail.getHeader("col1")	
	var vaColData = [];
	vcDsDetail.getColumnNames().forEach(function(each,idx){
		
		var vsName = {};
		vsName.name = each;
		vsName.dataType = vcDsDetail.getHeader(each).getDataType();
		vaColData.push(vsName);
		if(vcDsDetail.getHeader(each).getDataType() == "number") {
			
			var tempName = {};
			tempName.name = "TEST"+idx;
			tempName.dataType = "expression";
			tempName.displayOnly = true;
			tempName.expression = "self.getRowCount() > getIndex() + 1 ? self.getValue(getIndex(),'"+each+"') - self.getValue(getIndex()+1,'"+each+"') : '-'";
			tempName.info="전일대비증감";
			vaColData.push(tempName);
		}
		
	});
	
	var ds =  new cpr.data.DataSet();
	
	var vaDatas = vcDsDetail.getRowDataRanged();
//	vcDsDetail.parseData({
//		columns : vaColData,
//		rows : vaDatas
//	});
	ds.parseData({
		columns : vaColData,
		rows : vaDatas
	})
	vcDsConfig.build(vaColumnDefine,true);

	return ds;
}


















