/************************************************
 * PivotExam.js
 * Created at 2020. 3. 12. 오후 5:20:08.
 *
 * @author ryu
 ************************************************/

/* 버추얼 스크롤 사용 설정 */
var envConfig = cpr.core.AppConfig.INSTANCE.getEnvConfig();
envConfig.setValue("useCustomScrollbar", true);

/** @type cpr.utils.ObjectMap */
var moTargetData = new cpr.utils.ObjectMap();

/** @type cpr.utils.ObjectMap */
var moFieldData = new cpr.utils.ObjectMap();


/**
 * 
 * @param {Object} poData
 */
function setPivotFieldData(poData) {
	/* 피벗 타겟 데이터 초기화 */
	var vaTargetTypes = _.keys(poData.target);
	
	for(var idx = 0; idx < vaTargetTypes.length; idx++){
		var vsTargetName = vaTargetTypes[idx];
		var vaTargetData = poData["target"][vsTargetName];
		
		moTargetData.put(vsTargetName, vaTargetData);
	}
	
	/* 피벗 조건 데이터 초기화 */
	var vaFieldTypes = _.keys(poData.data);
		
	for(var idx = 0; idx < vaFieldTypes.length; idx++){
		var vsFieldName = vaFieldTypes[idx];
		var vaFieldData = poData["data"][vsFieldName];
		
		moFieldData.put(vsFieldName, vaFieldData);
	}
}


/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 */
function createGhostGrid(pcGrid) {
	if (app.lookup("pGrid") != null){
		return;
	}
	
	var vcGhostGrid = new cpr.controls.Grid("pGrid");
	
	var vcDsP = new cpr.data.DataSet("dsP");
	app.register(vcDsP);

	vcGhostGrid.init({
		"dataSet" : vcDsP,
		"autoFit" : "all",
		"columns" : [{"width" : "100px"}],
		"header" : {
			"rows": [{"height" : "35px"}]
		},
		"detail" : {
			"rows" : [{"height" : "35px"}]
		},
		"footer" : {
			"rows" : [{"height" : "35px"}]
		}
	});
	
	vcGhostGrid.readOnly = true;
	vcGhostGrid.style.css("background-color", "white");
	
	vcGhostGrid.addEventListenerOnce("dispose", function(e) {
		app.unregister(e.control.dataSet);
	});
	
	/** @type cpr.controls.Container */
	var vcGrpParent = pcGrid.getParent();
	
	vcGrpParent.addChild(vcGhostGrid, cpr.controls.layouts.XYLayout.createConstraintWithRect(pcGrid.getOffsetRect()));
	
	/* 피벗 그리드에 사용될 데이터 셋 구성 */
	buildPivotDataset();
	
	/* 피벗 그리드 구성 */
	buildPivotGrid(pcGrid);
}


/**
 * 
 */
function removePivot() {
	/** @type cpr.controls.Grid */
	var vcGhostGrid = app.lookup("pGrid");
	
	if (vcGhostGrid != null){
		vcGhostGrid.getParent().removeChild(vcGhostGrid, true);
	}
	
	moTargetData = new cpr.utils.ObjectMap();
	moFieldData = new cpr.utils.ObjectMap();
}


function buildPivotDataset() {
	/** @type cpr.data.DataSet */
	var vcTargetDs = moTargetData.get("dataset");
	
	/** @type cpr.data.DataSet */
	var vcDsP = app.lookup("dsP");
	
	// 행 관련 데이터만 가져오기
	/** @type {name:String,type:String}[] */
	var voRowData = moFieldData.get("row");

	var vaColumns = [];
	voRowData.forEach(function(each){
		vaColumns.push({
			"name" : each.name
		});
	});
	
	vcDsP.parseData({
		"columns" : vaColumns	
	});
	
	vcTargetDs.copyToDataSet(vcDsP);
/** @type cpr.data.DataSet */
	var ds = app.lookup("dsP");
	
	var vcDsList = app.lookup("dsP");
	var rowData = ds.getRowData(0);
	var keys = _.keys(rowData);
	var sortCondition  = "";
	var vnTemp = 0 ;
	var vnDsTempOld = [] ;  
	keys.forEach(function(each){
		if( vnTemp > 0  ) sortCondition = "," + sortCondition ;
		sortCondition += each;
		vnTemp++ ;
		vnDsTempOld.push("");
	}); 
	vcDsList.setSort(sortCondition);
	var vnRIndex = 0 ;

	var returns = [];
	vcDsList.getRowDataRanged().forEach(function(each){
			 
	    var vnDsTemp = [] ; 
		keys.forEach(function(keyCol){
		    vnDsTemp.push(each[keyCol]) ; 
		}); 
		var vsOld = JSON.stringify(vnDsTempOld);
		var vsNew = JSON.stringify(vnDsTemp);
			vnDsTempOld = vnDsTemp ;
		if(vsOld!= vsNew){ 
//		     ds.addRowData(each);
		     returns.push(each); 
		} 
	});
	ds.build(returns,false);
	/* 데이터 셋을 복사하는 경우 INSERTED 상태로 복사되므로 변경되지 않은 상태로 변경 */
	vcDsP.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
	
	
	console.log("dataset");
	console.log(vcDsP.getRowDataRanged());
}

/**
 * 피벗 그리드를 동적으로 그리는 데에 필요한 정보를 가져옵니다.
 */
function getPivotInfo() {
	/** @type cpr.controls.Grid */	
	var vcTargetGrid = moTargetData.get("grid");
	/** @type cpr.data.DataSet */
	var vcTargetDs = moTargetData.get("dataset");
	
	/** @type {name:String,type:String}[] */
	var vaColumnData = moFieldData.get("column");
	/** @type {name:String,type:String}[] */
	var vaRowData = moFieldData.get("row");
	/** @type {name:String,type:String}[] */
	var vaValueData = moFieldData.get("value");
	
	var vnColumnData =vaColumnData.length;
	var vnRowData = vaRowData.length;
	var vnValueData = vaValueData.length;
	
	/* 총 레이아웃 구하기 */
	var vnColumnLayoutCnt = vnRowData;
	var vaAllColumnKindsCnt = vaColumnData.map(function(each){
		var vsColumnName = each.name;
		
		return vcTargetDs.getUnfilteredDistinctValues(vsColumnName).length;
	});
	
	/* 총 컬럼 수 = 로우 필드 개수 + ((값 필드 수 * 마지막 컬럼 필드의 종류 개수) || 모든 컬럼 필드의 종류 개수) */
	vnColumnLayoutCnt += ((vnValueData * _.reduce(vaAllColumnKindsCnt, function(a, b) { return a* b;}, 1) || (_.reduce(vaAllColumnKindsCnt, function(a, b) { return a* b;}) || 0)));
	
	/* 총 헤더 구하기 (값 필드가 2개 이상일 때만 값 헤더를 그려줌) */
	/* 총 헤더 수 = 컬럼 필드 개수 + (0 || 값 필드 수) */
	
	var vnHeaderCnt = vnColumnData || 1;
	if (vnColumnData > 0 && vnValueData > 1){
		vnHeaderCnt += 1;
	}

	/* 총 푸터 수 구하기 */
	/* 행 필드 데이터가 있는 경우에만 푸터 생성 */
	var vnFooterCnt = vnRowData > 0 ? 1 : 0;	
	
	return {
		columnLayout : vnColumnLayoutCnt,
		header: vnHeaderCnt,
		detail : vnRowData,
		footer: vnFooterCnt
	}
}

/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 */
function buildPivotGrid(pcGrid) {
	/** @type cpr.controls.Grid */
	var vcGhostGrid = app.lookup("pGrid");
	
	/** @type cpr.data.DataSet */
	var vcDsTarget = pcGrid.dataSet;
	
	/** @type {{columnLayout:Number,header:Number,footer:Number}} */
	var voPivotInfo = getPivotInfo();
	
	var voGridInit = vcGhostGrid.getInitConfig();
	var vaHeaderLayout = [];
	for(var idx = 0; idx < voPivotInfo.header; idx++) {
		vaHeaderLayout.push({"height" : "35px"});
	}
	
	voGridInit["columns"] = createPivotColumnLayout(voPivotInfo);
	voGridInit["header"]["rows"] = vaHeaderLayout;
	voGridInit["header"]["cells"] = createPivotHeader(voPivotInfo);
	voGridInit["detail"]["rows"] = [{"height" : "35px"}];
	voGridInit["detail"]["cells"] = createPivotDetail(voPivotInfo);
	 voGridInit["footer"]["cells"] = createPivotFooter(voPivotInfo);
	vcGhostGrid.init(voGridInit);

	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
		var vnFooterCellCnt = vcGhostGrid.footer.cellCount;
		if (vnFooterCellCnt > 0){
			var vaFooterValues = setFooterValues();
			var voFirstFooter = vcGhostGrid.footer.getColumn(0);
			
			var vsFirstFooterValue = "";
			if (voFirstFooter != null){
				/** @type cpr.controls.Output */
				var vcFirstFooter = voFirstFooter.control;
				vsFirstFooterValue = "'" + vcFirstFooter.value + "'";
			}
			
			vaFooterValues.unshift(vsFirstFooterValue);
			
			vcGhostGrid.setFooterData(vaFooterValues);
		}
	});
}


/**
 * 
 * @param {{columnLayout:Number,header:Number,detail:Number,footer:Number}} poPivotInfo
 */
function createPivotColumnLayout(poPivotInfo) {
	var vaColumnLayout = [];
	
	for(var idx = 0; idx < poPivotInfo.columnLayout; idx++){
		var voColumnLayout = {
			width : "100px"
		}
		
		vaColumnLayout.push(voColumnLayout);
	}
	
	console.log("columnLayout");
	console.log(vaColumnLayout);
	
	return vaColumnLayout;
}

/**
 * 
 * @param {{columnLayout:Number,header:Number,detail:Number,footer:Number}} poPivotInfo
 */
function createPivotHeader(poPivotInfo) {
	var vaHeaderColumn = [];

	/** @type Array */
	var vaRowData = moFieldData.get("row");
	
	var vnStndIdx = poPivotInfo.detail;
	var vnColIdx = poPivotInfo.detail;
	
	/* 행에 대한 헤더 추가 */
	vaRowData.forEach(function(each, index){
		var voRowField = setHeaderCellInfo({
			rowIndex : 0,
			colIndex : index,
			rowSpan : poPivotInfo.header
		}, each.label);
		vaHeaderColumn.push(voRowField);
	});
	
	/** @type cpr.data.DataSet */
	var vcTargetDs = moTargetData.get("dataset");
	
	/* 컬럼 필드 개수만큼 헤더 생성 */
	/** @type Array */
	var vaColumnData = moFieldData.get("column");
	/** @type Array */
	var vaValueData = moFieldData.get("value");
	

	/* 컬럼 필드의 모든 중복되지 않은 값 */
	var vaAllColumnKinds = vaColumnData.map(function(each){
		var vsColumnName = each.name;
		
		return vcTargetDs.getUnfilteredDistinctValues(vsColumnName);
	});
	
	/* 컬럼 필드의 모든 중복되지 않은 값의 개수 */
	var vaAllColumnKindsCnt = vaAllColumnKinds.map(function(each){
		return each.length;
	});
	
	var vnTotalCnt = poPivotInfo.columnLayout;
	var vnColumnAreaCnt = vnTotalCnt - vaRowData.length; // 로우 영역 제외 컬럼 수

    var varRoof =  1 ;
    var vnColspanTemp = 1 ; 
    
    var vaAllValueKinds = vaValueData.map(function(each){
    	return each.name;
    });
    
    if (vaValueData.length > 1){
	    vaAllColumnKinds.push(vaAllValueKinds);
	    vaAllColumnKindsCnt.push(vaAllValueKinds.length);
	    vnColumnAreaCnt = vnColumnAreaCnt * vaValueData.length;
    } else if (vaColumnData.length == 0 && vaValueData.length == 1){
    	var voHeaderColumn = setHeaderCellInfo({
    		rowIndex : poPivotInfo.header - 1,
    		colIndex : poPivotInfo.columnLayout - 1
    	}, vaValueData[0].label);
    	
    	vaHeaderColumn.push(voHeaderColumn);
    }
    
	for(var headerIdx = vaAllColumnKindsCnt.length - 1; headerIdx >= 0; headerIdx--){
		var vaColumnKind = vaAllColumnKinds[headerIdx];
		var idx = 0;
	         varRoof =  varRoof * vaColumnKind.length ; 
 
		for(var idx1 = 0; idx1 < vnColumnAreaCnt / varRoof; idx1++){ 
			
			for(var kindIdx = 0; kindIdx < vaColumnKind.length; kindIdx++){
			   	
				var voHeaderColumn = setHeaderCellInfo({
					rowIndex : headerIdx,
					colIndex : vnStndIdx + (  idx *  vnColspanTemp ), 
					colSpan :  vnColspanTemp
				}, vaColumnKind[kindIdx]);
				
				vaHeaderColumn.push(voHeaderColumn);
				
				idx++;
			} 
		}
		vnColspanTemp = vnColspanTemp * vaColumnKind.length ; 
	}
	
	console.log("header");
	console.log(vaHeaderColumn);
	
	return vaHeaderColumn;
}

/**
 * 동적으로 그리드 헤더의 셀을 구성합니다.
 * @param {Object} poConstraint
 * @param {String} psText
 */
function setHeaderCellInfo(poConstraint, psText) {
	return {
		constraint : poConstraint,
		configurator : function(cell) {
			cell.text = (function(){
				return psText;
			})();
		}
	}
}


cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getCoordinateValue", function(pnColIdx,rowIndex) {
	
	var vcDsList = app.lookup("dsList");
/** @type cpr.controls.Grid */
	var vcGrid = app.lookup("pGrid");
/** @type {label:String,name:String,type:String}[] */
	var vaRowData = moFieldData.get("row");
/** @type {label:String,name:String,type:String}[] */
	var vaColumnData = moFieldData.get("column");
/** @type {label:String,name:String,type:String}[] */
	var vaValueData = moFieldData.get("value");
	
	var vsReturnValue;
	var headerCells = vcGrid.getHeaderCellIndices(pnColIdx);
	var expressions = "";
	if(!rowIndex) { 
		rowIndex = 0;
	}
	var vaHeaders = "";
	if(vaValueData.length > 0) {
	
		if(vaColumnData.length >0) {
		vaHeaders =  vaColumnData;
		if(headerCells.length > 1) { headerCells.pop()}
		headerCells.forEach(function(each,idx){
		expressions += "'" + vcGrid.header.getColumn(each).text+"' == "+vaHeaders[idx].label +"&&";
	});
	} else {
	}
	vaRowData.forEach(function(each,idx){
		expressions += "#pGrid.getCellValue("+rowIndex+","+idx+")" + " == "+each.label + "&&";
		
	});
	
	expressions = expressions.substring(0, expressions.length-2);
		var voValue = vaValueData[(pnColIdx - vaRowData.length)%vaValueData.length]
		var vsValueType = voValue.type;
		switch(vsValueType){
			case "count" : {
				vsReturnValue = vcDsList.getConditionalRowCount(expressions);
				break;
			}
			case "sum" : {
				vsReturnValue = vcDsList.getConditionalSum(expressions, voValue.label);
				break;
			}
			
			default : {
				vsReturnValue = "";
				break;
			}
		}
	return vsReturnValue;
	}
	
});


/**
 * 
 * @param {{columnLayout:Number,header:Number,detail:Number,footer:Number}} poPivotInfo
 */
function createPivotDetail(poPivotInfo) {
	var vaDetailColumn = [];
	
	/** @type cpr.data.DataSet */
	var vcTargetDs = moTargetData.get("dataset");
	
	/** @type {label:String,name:String,type:String}[] */
	var vaRowData = moFieldData.get("row");
	/** @type {label:String,name:String,type:String}[] */
	var vaColumnData = moFieldData.get("column");
	/** @type {label:String,name:String,type:String}[] */
	var vaValueData = moFieldData.get("value");
	
	var vnRowData = vaRowData.length;
	var vnColumnData = vaColumnData.length;
	var vnValueData = vaValueData.length;
	
	
	/* 컬럼 필드의 모든 중복되지 않은 값 */
	var vaAllColumnKinds = vaColumnData.map(function(each){
		var vsColumnName = each.name;
		
		return vcTargetDs.getUnfilteredDistinctValues(vsColumnName);
	});
	
	/* 컬럼 필드의 모든 중복되지 않은 값의 개수 */
	var vaAllColumnKindsCnt = vaAllColumnKinds.map(function(each){
		return each.length;
	});
	
	for(var colIdx = 0; colIdx < poPivotInfo.columnLayout; colIdx++){
		var vsType = null;
		var vsValue = null;
		
		if (colIdx <= vnRowData - 1){ // 행 컬럼 일 때
			vsType = "columnName";
			vsValue = vaRowData[colIdx].name;
		} else {
			//TODO 해당 셀에 해당하는 value를 찾아야 하고 value 필드가 있으면 함수 값 표시
			vsType = "control";
			vsValue = "getCoordinateValue("+colIdx+", rowIndex)";
		}

		var voDetailColumn = setDetailCellInfo({
			rowIndex : 0,
			colIndex : colIdx
		}, vsType, vsValue);
		
		vaDetailColumn.push(voDetailColumn);
	}
	
	console.log("detail");
	console.log(vaDetailColumn);
	
	return vaDetailColumn;
}

/**
 * 동적으로 그리드 헤더의 셀을 구성합니다.
 * @param {Object} poConstraint
 * @param {"columnName" | "text" | "control"} psType
 * @param {String} psValue
 */
function setDetailCellInfo(poConstraint, psType, psValue) {
	return {
		constraint : poConstraint,
		configurator : function(cell) {
			if (psType == "columnName"){
				cell.columnName = psValue;
			} else if (psType == "text") {
				cell.text = (function(){
					return psValue;
				})();
			} else if (psType == "control") {
				cell.control = (function() {
					var output = new cpr.controls.Output();
					
					output.bind("value").toExpression(psValue);
					
					return output;
				})();
			}
		}
	}
}

/**
 * 
 * @param {{columnLayout:Number,header:Number,detail:Number,footer:Number}} poPivotInfo
 */
function createPivotFooter(poPivotInfo) {
	var vaFooterColumn = [];
	
	/** @type Array */
	var vaRowData = moFieldData.get("row");
	
	/* 행 데이터가 없는 경우 푸터 생성하지 않음 */
	if (poPivotInfo.footer <= 0){
		return vaFooterColumn;
	}
	
	/* 무조건 첫 번째 열은 총합계로 표시 */
	vaFooterColumn.push(setFooterCellInfo({
		rowIndex : poPivotInfo.footer - 1,
		colIndex : 0,
		colSpan : vaRowData.length
	}, "control", "총 합계"));
	
	/* 데이터 합계 구하기 */
	for(var cellIdx = vaRowData.length; cellIdx < poPivotInfo.columnLayout; cellIdx++){
		var vsCondition = "";
			
		/** @type cpr.controls.Grid */
		var vcTargetGrid = moTargetData.get("grid");
		
		/** @type cpr.data.DataSet */
		var vcTargetDs = moTargetData.get("dataset");
		
		var voFooterColumn = setFooterCellInfo({
			rowIndex : poPivotInfo.footer - 1,
			colIndex : cellIdx,
			colSpan : 1
		}, "control", vsCondition);
		
		vaFooterColumn.push(voFooterColumn);
	}
	
	console.log("footer");
	console.log(vaFooterColumn);
	
	return vaFooterColumn;
}


/**
 * 동적으로 그리드 헤더의 셀을 구성합니다.
 * @param {Object} poConstraint
 * @param {"text" | "expression"} psType
 * @param {String} psText
 */
function setFooterCellInfo(poConstraint, psType, psText) {
	return {
		constraint : poConstraint,
		configurator : function(cell) {
			if (psType == "control"){
				cell.control = (function() {
					var output = new cpr.controls.Output();
					
					if (psText == ""){
						output.dataType = "number";
						output.format = "s#,##0";
					}
										
					output.value = psText;
					output.style.css("text-align", "right");
					
					return output;
				})();
			} else if ("expression") {
				cell.expr = psText;
			}
		}
	}
}

/**
 * @return Array
 */
function setFooterValues() {
	/** @type cpr.controls.Grid */
	var vcGhostGrid = app.lookup("pGrid");
	
	/** @type cpr.data.DataSet */
	var vcGhostDs = app.lookup("dsP");
	
	var voPivotInfo = getPivotInfo();
	
	/** @type Array */
	var vaRowData = moFieldData.get("row");
	/** @type Array */
	var vaValueData = moFieldData.get("value");
	
	var vnRowData = vaRowData.length;
	var vnValueData = vaValueData.length;
	
	if (voPivotInfo.footer <= 0 || vnValueData <= 0){
		return [];
	}
	
	var vaFooterValues = [];
	for(var colIdx = vnRowData; colIdx < voPivotInfo.columnLayout; colIdx++){
		var vaColumnValues = [];
		for(var rowIdx = 0; rowIdx < vcGhostDs.getRowCount(); rowIdx++){
			var vsValue = vcGhostGrid.detail.getControlAttr(rowIdx, colIdx, "value");
			if (!isNaN(parseInt(vsValue))){
				vaColumnValues.push(parseInt(vsValue));
			}
		}
		
		vaFooterValues.push(vaColumnValues);
	}
	
	var vaFooterResult = [];
	for(var idx = 0; idx < vaFooterValues.length; idx++){
		var vaColumnValues = vaFooterValues[idx];
		/** @type {{name:String,type:String}} */
		var voValueData = vaValueData[vaColumnValues.length % vnValueData];
		var vsFooterValue = "";
		if (voValueData != null){
			var vsType = voValueData.type;
			
			if (vsType == "sum"){
				vsFooterValue = _.reduce(vaColumnValues, function(a, b) {
					return a + b;
				}, 0);
			} else if (vsType == "count") {
				vsFooterValue = _.without(vaColumnValues, 0).length;
			}
			
			vaFooterResult.push(vsFooterValue.toString());
		}	
	}
	
	return vaFooterResult;
}

/**
 * 동적으로 그리드 헤더의 셀을 구성합니다.
 * @param {Object} poConstraint
 * @param {String} psText
 */
function setFooterCellInfo(poConstraint, psText) {
	return {
		constraint : poConstraint,
		configurator : function(cell) {
			cell.text = (function(){
				return psText;
			})();
			cell.expr = "";
		}
	}
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("subList").send();
}


/*
 * 사용자 정의 컨트롤에서 update 이벤트 발생 시 호출.
 * 피벗 설정이 완료된 후 설정 값이 저장되면 발생하는 이벤트
 */
function onPivothelper1Update(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.PivotHelper
	 */
	var pivothelper1 = e.control;
	
	console.log("update");
	
	/** @type {{target:{grid:cpr.controls.Grid,dataset:cpr.data.DataSet},data:{filter:Array,column:Array,row:Array,value:Array}}} */
	var voContent = e.content;
	
	console.log(voContent);

	removePivot();

	var isEmpty = _.every(voContent.data, function(each) { 
		return each == 0; 
	});
	
	if (isEmpty == true){
		return;
	}
	
	/* 넘어 온 데이터 입력 */
	setPivotFieldData(voContent);
	
	/* 데이터가 없는 경우 실행하지 않거나 이미 만들어진 피벗 그리드가 있으면 파기 */
	createGhostGrid(voContent.target.grid);
}

//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
///** @type cpr.controls.Grid */
//	var grd = app.lookup("pGrid");
///** @type cpr.data.DataSet */
//	var ds = app.lookup("dsP");
//	
//	var vcDsList = app.lookup("dsP");
//	var rowData = ds.getRowData(0);
//	var keys = _.keys(rowData);
//	var sortCondition  = "";
//	var vnTemp = 0 ;
//	var vnDsTempOld = [] ;  
//	keys.forEach(function(each){
//		if( vnTemp > 0  ) sortCondition = "," + sortCondition ;
//		sortCondition += each;
//		vnTemp++ ;
//		vnDsTempOld.push("");
//	}); 
//	vcDsList.setSort(sortCondition);
//	var vnRIndex = 0 ;
//
//	returns = [];
//	vcDsList.getRowDataRanged().forEach(function(each){
//			 
//	    var vnDsTemp = [] ; 
//		keys.forEach(function(keyCol){
//		    vnDsTemp.push(each[keyCol]) ; 
//		}); 
//		var vsOld = JSON.stringify(vnDsTempOld);
//		var vsNew = JSON.stringify(vnDsTemp);
//			vnDsTempOld = vnDsTemp ;
//		if(vsOld!= vsNew){ 
//		     ds.addRowData(each);
//		     returns.push(each); 
//		} 
//	});
//	console.log(returns);
//	ds.build(returns,false);
//	grd.redraw();
//}
//
//
///*
// * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn2Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn2 = e.control;
//	
//	/** @type {label:String,name:String,type:String}[] */
//	var vaRowData = moFieldData.get("row");
///** @type {label:String,name:String,type:String}[] */
//	var vaColumnData = moFieldData.get("column");
///** @type {label:String,name:String,type:String}[] */
//	var vaValueData = moFieldData.get("value");
//	
////	console.log(vaColumnData.concat(vaValueData));
////	vaColumnData.push(vaValueData);
////	console.log(vaColumnData[vaColumnData.length-1]);
////	var a = vaColumnData[vaColumnData.length-1];
//	
////	console.log(a[0]);
////	console.log(vaColumnData[vaColumnData.length-1].length);
////	console.log(vaColumnData[0].length);
//console.log(vaColumnData);
//console.log(vaValueData);
//}
//
//
///*
// * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn3Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn3 = e.control;
//	
//	
//}
