///************************************************
// * savepoint.module.js
// * Created at 2020. 6. 17. 오후 1:43:25.
// *
// * @author HANS
// ************************************************/
//
///************************************************
// * createGrid.module.js
// * Created at 2020. 6. 2. 오전 10:19:09.
// *
// * @author HANS
// ************************************************/
////서버에서 내려오는 빈값에 대한 양식이 null이거나 빈문자열일 수 있으므로, 지정된 양식에 맞추어서 해당 변수값을 변경하십시오.
//var msNull = "";
////헤더행 높이를 설정합니다.
//var mnRowHeight = 40;
////디테일행 높이를 설정합니다.
//var mnDetailHeight = 24;
//
//var moGridStandardConfig = {
//		"columns": [{
//			"width": "100px"
//		}, ],
//		"header": {
//			"rows": [{
//				"height": "24px"
//			}],
//			"cells": [{
//				"constraint": {
//					"rowIndex": 0,
//					"colIndex": 0
//				},
//				"configurator": function(cell) {}
//			}]
//		},
//		"detail": {
//			"rows": [{
//				"height": "24px"
//			}],
//			"cells": [{
//				"constraint": {
//					"rowIndex": 0,
//					"colIndex": 0
//				},
//				"configurator": function(cell) {}
//				
//			}]
//		}
//	};
//	
//
//
////그리드를 생성하는데 넘겨받은 데이터셋에서, 상위헤더로 사용되는게 아닌, 데이터를 표시하는 컬럼에 대한 정의를 가진 행들의 Row만 가지게 하는 변수입니다.
///** @type cpr.data.Row[]*/
//var vaUsedRows =[];
//
//globals.createGrid = createGrid;
//
///**
// * 그리드를 동적으로 생성하는 함수입니다. 
// * @param {cpr.data.DataSet} pcGridConfigDataSet 그리드의 컬럼 정보를 구성하는 데이터셋
// * @param {cpr.data.DataSet} pcGridBindDataSet 그리드의 디테일 데이터를 구성하는 데이터셋
// * @param {cpr.controls.Container} pcParent 그리드컨트롤을 포함시킬 그룹컨트롤
// * @param {{eventNm : String , func : Function}[]} paEvents? 그리드에 연결할 이벤트{eventNm : String , func : Function}의 배열
// */
//function createGrid(pcGridConfigDataSet,pcGridBindDataSet,pcParent, paEvents){
//
//		var vcDataSet = pcGridConfigDataSet;
//		var vcBindDataSet = pcGridBindDataSet;
//		vcDataSet.setSort("ORDER_SEQ asc");
//		var res =	headerDepth(vcDataSet);
//		console.log("RES:::::::::::::::::::"+ res);
//		/** @type cpr.controls.gridpart.GridConfig */
//		var voGridInitConfig = {
//			"dataSet" : {},
//			"columns":[],
//			"header" : {
//				"rows" : [],
//				"cells" : []
//			},
//			"detail" : {
//				"rows": [],
//				"cells" :[]
//			}
//		}
//		
//		var vcGrid = new cpr.controls.Grid("grdMst");
//		
//		if(vcDataSet.getRowCount() > 0) {
//		
//		vaUsedRows = classifyUsedColumn(vcDataSet);
//		var vaAutoFit = vaUsedRows.filter(function(each){
//			if(each.getValue("COLUMN_FIXYN")=="Y") {
//				return each;
//			}
//		}).map(function(each){
//			return each.getIndex();
//		});
//
//		voGridInitConfig.dataSet = pcGridBindDataSet;
////		voGridInitConfig.autoFit = vaAutoFit.toString();
//
//		for(var headerLeng = 0 ; headerLeng < res ; headerLeng++) {
//			
//			voGridInitConfig.header.rows.push({"height" : mnRowHeight+"px"});
//		}
//		
//			vcDataSet.getRowDataRanged().forEach(function(each,idx){
//			voGridInitConfig.header.cells.push({
//				"constraint" : getGridHeaderConfig(vcDataSet, vcDataSet.getRow(idx),res),
//				"configurator" :  function(cell) {
//				cell.text = each["HEADER_NM"];
//				cell.visible =each["HIDE_YN"] == "Y" ? false : true;
//				}
//			});
//		});
//		
////			vaUsedRows.forEach(function(/*cpr.data.DataRow*/each,idx){
////				voGridInitConfig.header.cells.push({
////					"constraint" : getGridHeaderConfig(vcDataSet, each),
////					"configurator" : function(cell){
////						cell.text = each.getValue("HEADER_NM")
////						cell.visible =each.getValue("HIDE_YN")== "Y" ? false : true;
////					}
////				});
////			});
//
//		vcBindDataSet.getColumnNames().forEach(function(each,idx){
//		/** @type cpr.data.Row */
//			var voConfigRow = vaUsedRows[idx];
////debugger;
//			voGridInitConfig.columns.push({"width" : voConfigRow.getValue("COLUMN_WID")+"px"});
//			voGridInitConfig.detail.cells.push({
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
//		});
//		
//		voGridInitConfig.detail.rows.push({"height" : mnDetailHeight+"px"});
//		vcGrid.init(voGridInitConfig);
//		} else {
//			
//			vcGrid.init(moGridStandardConfig);
//		}
//		if(paEvents && paEvents.length > 0) {
//			
//			paEvents.forEach(function(each){
//				
//				vcGrid.addEventListener(each.eventNm,each.func);
//			});
//		}	
////		pcParent.addChild(vcGrid, {
////			"rowIndex" : 0,
////			"colIndex" : 0
////		});
//		
//		return vcGrid;
//}
//
//
///**
// * 그리드를 설정하는 데이터셋의 행별로 배치 속성을 구하는 함수입니다.
// * @param {cpr.data.DataSet} pcDataSet
// * @param {cpr.data.DataRow} poRow
// * @param {Number} pnHeaderDepth
// */
//function getGridHeaderConfig(pcDataSet,poRow,pnHeaderDepth){
//	
//	var vcDataSet = pcDataSet;
//
//
//	var vsParentId = poRow.getValue("PARENT_HDRID");
//	var vsHeaderId = poRow.getValue("HEADER_ID");
//	
//	if(vsParentId) {
//		
//	}
//	var vaChildrenCol= vcDataSet.findAllRow("PARENT_HDRID == '"+vsHeaderId+"'");
//
//	var vnRowIndex = vsParentId == msNull ? 0 : 1;
//	var vnRowSpan = vsParentId == msNull ? 2 : 1;
//	var vnColSpan = 1;
//	
//	var vnColIndex ;
//
//	//자기인덱스이전의 행들중 headerid가 parentId에 들어가는 행들을 뺴고 length를 구합니다. 
//	if(vaChildrenCol.length > 0) {
//		vnRowSpan = 1;
//		vnColSpan = vaChildrenCol.length;
//		}
//		
//		vnColIndex = checkColumnIndex(vcDataSet, poRow);	
//	return {
//		"rowIndex" : vnRowIndex,
//		"colIndex" : vnColIndex,
//		"rowSpan" : vnRowSpan,
//		"colSpan" : vnColSpan
//	}
//}
//
///**
// * 그리드를 설정하는 데이터셋의 행별로 컬럼이 배치되는 인덱스를 리턴하는 함수입니다. 
// * @param {cpr.data.DataSet} pcDataSet
// * @param {cpr.data.DataRow} poRow
// */
//function checkColumnIndex(pcDataSet, poRow){
//		
//		var vcDataSet = pcDataSet;
//		var vnRowIndex = poRow.getIndex();
//		var vaAllChild = vcDataSet.getUnfilteredDistinctValues("PARENT_HDRID");
//		var vsExpress = "";
//		
//		var isHAN = vcDataSet.findAllRow("PARENT_HDRID == '"+poRow.getValue("HEADER_ID")+"'")
//		if(isHAN.length > 0){
//			return checkColumnIndex(vcDataSet, isHAN[0]);
//			
//		} else {
//			
//		vaAllChild.forEach(function(each){
//			if(each != msNull){
//				vsExpress += "HEADER_ID !='"+each+"' &&";
//			}
//		});
//		vsExpress += "getIndex() < " + vnRowIndex;
//		return vcDataSet.findAllRow(vsExpress).length;
//		}
//}
//
///**
// * 그리드에서 상위헤더가 아닌, 실제 데이터를 보여주는 컬럼들을 배열로 리턴하는 함수입니다.
// * 각 컬럼별 데이터 타입과 포맷 양식을 파악하기 위해 사용합니다.
// * @param {cpr.data.DataSet} pcDataSet
// * @returns {cpr.data.Row[]}
// */
//function classifyUsedColumn(pcDataSet) {
//
//    var vcDataSet = pcDataSet;
//	
//	if(vcDataSet.getRowCount() > 0){
//		
//    var vaAllChild = vcDataSet.getUnfilteredDistinctValues("PARENT_HDRID",function(/*cpr.data.DataRow*/dataRow){
//    	return dataRow.getValue("PARENT_HDRID") != "";
//    });
//    var vsExpress = "";
//    if(vaAllChild.length > 0) {
//    	
//    vaAllChild.forEach(function(each) {
//            vsExpress += "HEADER_ID!='" + each + "'&&";
//    });
//
//    vsExpress = vsExpress.slice(0, -2);
//    } else {
//    	vsExpress += true;
//    }
//    return vcDataSet.findAllRow(vsExpress);
//	} else {
//		return null;
//	}
//}
//globals.classifyUsedColumn = classifyUsedColumn;
///**
// * 입력된 타입과 포맷을 가진 아웃풋 컨트롤을 리턴하는 함수입니다.
// * @param {String} psType
// * @param {String} psFormat
// * @returns {cpr.controls.Output}
// */
//function createControlByType(psType,psFormat) {
//	
//	var vcOutput = new cpr.controls.Output();
//	
//	switch(psType){
//		case "D" :
//			vcOutput.dataType = "date";
//			vcOutput.format = psFormat.toUpperCase();
//			break;
//		case "N" :
//			
//			vcOutput.dataType = "number";
//			vcOutput.format = "s#,###.#";
//			vcOutput.style.addClass("text-right");
//			break;
//		default :
//		
//			vcOutput.dataType = "string"
//			break;
//	}
//	
//	return vcOutput;
//}
//
///**
// * 멀티헤더일 경우 멀티헤더 갯수를 구하는 함수입니다.
// * @param {cpr.data.DataSet} pcDataSet 데이터셋
// * @return {Number} 헤더 갯수
// */
//function headerDepth(pcDataSet){
//	
//	var vcDataSet = pcDataSet;
//	
//	var vnHeaderDepth =1;
//    var vaAllChild = vcDataSet.getUnfilteredDistinctValues("PARENT_HDRID",function(/*cpr.data.DataRow*/dataRow){
//    	return dataRow.getValue("PARENT_HDRID") != "";
//    });
//    
//    while(vaAllChild.length >0) {
//    	
//    	vnHeaderDepth += 1;
//    	vaAllChild = vaAllChild.map(function(each){
//    		var row = vcDataSet.findFirstRow("HEADER_ID == '"+each+"'").getValue("PARENT_HDRID");
//    			
//				return row;
//    	}).filter(function(each){
//    		return each != "";
//    	});;
//    	
//    }
//    return vnHeaderDepth;
//}
//
///**
// * 헤더의 상세 크기를 계산하는 함수입니다.
// * @param {cpr.data.DataSet} pcDataSet
// * @param {cpr.data.DataRow} poRow
// * @param {Number} res
// */
//function getHeaderDeteil(pcDataSet, poRow,res){
//		
//		var vcDataSet = pcDataSet;
//		var rowIndex = 0;
//		var rowSpan = 1;
//		var colSpan = 1;
//		var header = poRow.getValue("HEADER_ID");
//		var parent = poRow.getValue("PARENT_HDRID")
//		
//		var vaAllChild = vcDataSet.findAllRow("PARENT_HDRID == '"+header+"'");
//		var temp = [];
//		if(parent) {
//			rowIndex = res-1;
//			while(vaAllChild.length > 0 ){
//				temp = [];
//				rowIndex = rowIndex-1;
////				vaAllChild = vaAllChild.map(function(each){
////					return vcDataSet.findAllRow("HEADER_ID == '"+each+"'");
////				}).map(function(eq){
////					eq.
////				});
//				vaAllChild.map(function(each){
//					return each.getValue("HEADER_ID");
//				}).forEach(function(eachs){
//					vcDataSet.findAllRow("PARENT_HDRID == '"+eachs+"'").map(function(eachss){
//						return eachss.getValue("HEADER_ID");
//					});
//				});;
//			}
//			
//			rowSpan = temp.length;
//			
////			var father = vcDataSet.findFirstRow("HEADER_ID == '"++"'")
////			if(vaAllChild.length > 0) {
////				//출생신고
////				
////				
////				
////				
////			} else {
////				rowSpan = 1;
////				colSpan = 1;
////			}
//			
//		} else {
//			
//			//부모가 없는데 내가 누군가의 부모인가?
//			if(vaAllChild.length > 0) {
//				//출생신고
//			} else {
//				//최상위
//				rowIndex = 0;
//				colSpan = 1;
//				rowSpan = res-1;
//			}
//		}
//						
//}
//
//
//function birthReport(){
//	
//}