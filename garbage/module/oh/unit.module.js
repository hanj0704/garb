/************************************************
 * unit.module.js
 * Created at 2020. 6. 2. 오후 4:02:39.
 *
 * @author ryu
 ************************************************/

module.depends("module/invisible");


/**
 * 데이터 셋 유닛
 * @constructor
 * @param {invisble.invisibleKit} invisibleKit
 */
function DataSetKit(invisibleKit) {
	this._invisibleKit = invisibleKit; 
};


/**
 * 데이터 셋을 정보를 세팅합니다.
 * <pre><code><code>
 * dataset.parseData({
 * 	alterColumnLayout: "client",
 * 	sortCondition: "a",
 * 	filterCondition: "c == 'c1'",
 * 	info: "dataset_info",
 * 	stateRestore: true,
 * 	columns: [
 * 		{ dataType: "string", name: "a" },
 * 		{ dataType: "string", name: "b" },
 * 		{ dataType: "string", name: "c" },
 * 		{ dataType: "number", name: "d" },
 * 		{ dataType: "number", name: "e", displayOnly: true },
 * 		{ dataType: "expression", name: "sum", displayOnly: true, expression: "d+e" }
 * 	],
 * 	rows: [
 * 		{ a: "a1", b: "b1", c: "c1", d: 100, e: 10 },
 * 		{ a: "a2", b: "b2", c: "c2", d: 200, e: 20 },
 * 		{ a: "a3", b: "b3", c: "c3", d: 300, e: 30 },
 * 		{ a: "a4", b: "b4", c: "c4", d: 400, e: 40 }
 * 	]
 * });
 * </code></code></pre>
 * 
 * @param {cpr.core.AppInstance} app 앱 인스턴스
 * @param {String} psDsId 데이터 셋 아이디
 * @param {{
 * 	alterColumnLayout? : "client" | "server" | "merge" <!-- 컬럼 구조 변경 기준  -->,
 * 	sortCondition? : String <!-- 정렬 조건 -->,
 * 	filterCondition? : Stirng <!-- 필터 조건 -->,
 * 	info? : String <!-- 데이터 셋 정보 -->,
 * 	stateRestore?: Boolean <!-- 초기값 저장 여부 -->,
 * 	columns : {
 * 		name : String <!-- 컬럼 이름 -->,
 * 		dataType? : "string" | "number" | "decimal" | "expression" <!-- 컬럼 타입 -->,
 * 		displayOnly? : Boolean <!-- 원본 데이터 기억 불가 여부 -->,
 * 		expression? : #expression <!-- 표현식 -->,
 * 		info? : String <!-- 컬럼 정보값 -->
 * 	} <!-- 컬럼 정보 -->,
 * 	rows? : Object[] <!-- 데이터 -->
 * }} poDsInfo 데이터 셋 생성 정보
 */
DataSetKit.prototype.register = function(app, psDsId, poDsInfo) {
	if (ValueUtil.isNull(psDsId)){
		return;
	}
	
	var vcDs = new cpr.data.DataSet(psDsId);
	
	vcDs.parseData(poDsInfo);
	
	app.register(vcDs);
}


/**
 * 자동으로 필요한 데이터 셋을 추가합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDsId
 */
DataSetKit.prototype.autoRegister = function(app, psDsId) {
	/** @type cpr.data.DataSet */
	var vcGrdObj = app.lookup(psDsId);
	
	if (ValueUtil.isNull(vcGrdObj)){
		return;
	}
	
	for(var rowIdx = 0; rowIdx < vcGrdObj.getRowCount(); rowIdx++){
		var vsObjNm = vcGrdObj.getValue(rowIdx, "OBJ_NM"); // 오브젝트 명
		
		this.register(app, "ds" + (rowIdx + 1), {
			alterColumnLayout : "server",
			info : vsObjNm
		});
	}
}


/**
 * 공통 코드를 데이터 셋으로 등록합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDsId
 */
DataSetKit.prototype.autoCodeRegister = function(app, psDsId) {
	/** @type cpr.data.DataSet */
	var vcCdList = app.lookup(psDsId);
	
	if (ValueUtil.isNull(vcCdList)){
		return;
	}
	
	var vaDistinctVals = vcCdList.getUnfilteredDistinctValues("GROUP_CD");
	
	for(var idx = 0; idx < vaDistinctVals.length; idx++){
		var vsDistinctVal = vaDistinctVals[idx];
		
		var vaCol = vcCdList.getHeaders();
		
		var vaColData = vaCol.map(function(each){
			return {
				name : each.getName(),
				dataType : each.getDataType(),
				info : each.getInfo()
			};
		});
		
		var vaRow = vcCdList.findAllRow("GROUP_CD == '" + vsDistinctVal + "'");
		
		var vaRowData = vaRow.map(function(each){
			return each.getRowData();
		});
		
		this.register(app, "ds" + vsDistinctVal, {
			columns : vaColData,
			rows : vaRowData
		});
	}
}


/**
 * 데이터 뷰 유닛
 * @constructor
 * @param {invisble.invisibleKit} invisibleKit
 */
function DataViewKit(invisibleKit) {
	this._invisibleKit = invisibleKit; 
};


/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} pcParentDs
 * @param {String} psDvId
 * @param {{
 * 	sortCondition? : String <!-- 정렬 조건 -->,
 * 	filterCondition? : Stirng <!-- 필터 조건 -->
 * }} poDvInfo
 */
DataViewKit.prototype.register = function(app, pcParentDs, psDvId, poDvInfo) {
	if (ValueUtil.isNull(pcParentDs) || ValueUtil.isNull(psDvId)){
		return;
	}
	
	var vcDv = new cpr.data.DataView(psDvId, pcParentDs);
	
	vcDv.parseData(poDvInfo);
	
	app.register(vcDv);
}


/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDsId
 */
DataViewKit.prototype.autoRegister = function(app, psDsId) {
	/** @type cpr.data.DataSet */
	var vcCdList = app.lookup(psDsId);
	
	if (ValueUtil.isNull(vcCdList)){
		return;
	}
	
	var vaDistinct = vcCdList.getUnfilteredDistinctValues("GROUP_CD");
	for(var idx = 0; idx < vaDistinct.length; idx++){
		var vsGrpCd = vaDistinct[idx];
		
		this.register(app, vcCdList, "dv" + vsGrpCd, {
			filterCondition : "GROUP_CD == '" + vsGrpCd + "'"
		});
	}
}


/**
 * 데이터 맵 유닛
 * @constructor
 * @param {invisble.invisibleKit} invisibleKit
 */
function DataMapKit(invisibleKit) {
	this._invisibleKit = invisibleKit; 
};


/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {String} psDmId
 * @param {{
 * 	alterColumnLayout? : "client" | "server" | "merge" <!-- 컬럼 구조 변경 기준 -->,
 * 	info? : String <!-- 데이터 셋 정보 -->,
 * 	columns : {
 * 		name : String <!-- 컬럼 이름 -->,
 * 		dataType? : "string" | "number" | "decimal" | "expression" <!-- 컬럼 타입 -->,
 * 		defaultValue? : String <!-- 기본값 -->,
 * 		displayOnly? : Boolean <!-- 원본 데이터 기억 불가 여부 -->,
 * 		expression? : #expression <!-- 표현식 -->,
 * 		info? : String <!-- 컬럼 정보값 -->
 * 	} <!-- 컬럼 정보 -->
 * }} poDmInfo 데이터 맵 생성 정보
 */
DataMapKit.prototype.register = function(app, psDmId, poDmInfo) {
	if (ValueUtil.isNull(psDmId)){
		return;
	}
	
	var vcDm = new cpr.data.DataMap(psDmId);
	
	vcDm.parseData(poDmInfo);
	
	app.register(vcDm);
}



/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDsId
 */
DataMapKit.prototype.autoRegister = function(app, psDsId) {
	/** @type cpr.data.DataSet */
	var vcDsSch = app.lookup(psDsId);
	
	if (ValueUtil.isNull(vcDsSch)){
		return;
	}
	
	/* 정적 컬럼 추가 */
	/** @type cpr.data.DataSet */
	var vcDsStaticColList = app.lookup("dsStaticColList");
	
	var vaColInfo = [];
	if (!ValueUtil.isNull(vcDsStaticColList)){
		for(var idx = 0; idx < vcDsStaticColList.getRowCount(); idx++){
			var vsStaticMetaVar = vcDsStaticColList.getValue(idx, "SRCH_METAVAR");
			vaColInfo.push({
				name : vsStaticMetaVar
			});
		}
	}
	
	for(var rowIdx = 0; rowIdx < vcDsSch.getRowCount(); rowIdx++){
		var vsSrchMetaVar = vcDsSch.getValue(rowIdx, "SRCH_METAVAR");
		
		if (ValueUtil.isNull(vsSrchMetaVar)){
			continue;
		}
		
		var vaSrchMetaVar = vsSrchMetaVar.split(",");
		
		for(var idx = 0; idx < vaSrchMetaVar.length; idx++){
			vaColInfo.push({
				name : vaSrchMetaVar[idx]
			});
		}
	}

	this.register(app, "dmSearch", {
		columns : vaColInfo
	});
}



/**
 * 서브미션 유닛
 * @constructor
 * @param {invisble.module} invisibleKit
 */
function SubmissionKit(invisibleKit) {
	this._invisibleKit = invisibleKit; 
};


/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {String} psSmId
 * @param {{
 * 	action : String <!-- 통신 경로 -->,
 * 	withCredentials? : Boolean <!-- 보안 헤더 사용 여부 -->,
 * 	async? : Boolean <!-- 비동기 통신 사용 여부 -->,
 * 	method : "post" | "get" | "delete" | "head" | "options" | "patch" | "put" <!-- 통신 방법 -->,
 * 	mediaType : "application/json" 
 * 					   | "application/x-www-form-urlencoded" 
 * 					   | "application/x-www-form-urlencoded;massdata" 
 * 					   | "application/x-www-form-urlencoded;simple"
 * 					   | "multipart/form-data;encoding=json"
 * 					   | "multipart/form-data"
 * 					   | "multipart/form-data;simple" <!-- 미디어 타입 -->,
 * 	responseType : "text" | "javascript" | "blob" | "filedownload" <!-- 응답 타입 -->,
 * 	requestHeader? : {name : String, value : String} <!-- 요청 헤더 값 -->,
 * 	requestParameter? : {name : String, value : String} <!-- 요청 파라미터 값 -->,
 * 	requestData : {
 * 		id : #datamap | #dataset,
 * 		alias? : String,
 * 		payload : "all" | "modified"
 * 	} <!-- 요청 데이터 -->,
 * 	responseData : {
 * 		id : #dataset | #datamap,
 * 		alias? : String,
 * 		isAdd : Boolean	
 * 	} <!-- 응답 데이터 -->,
 * 	userAttr? : {key:String, value:String} <!-- 사용자 속성 -->
 * }} poSmInfo 서브미션 생성 정보
 */
SubmissionKit.prototype.register = function(app, psSmId, poSmInfo) {
	if (ValueUtil.isNull(psSmId)){
		return;
	}
	
	var vcSm = new cpr.protocols.Submission(psSmId);
	
	/* 서브미션 속성 설정 */
	vcSm.action = poSmInfo.action;
	vcSm.method = poSmInfo.method;
	vcSm.withCredentials = ValueUtil.fixNull(poSmInfo.withCredentials) != null ? poSmInfo.withCredentials : false;
	vcSm.async = ValueUtil.fixNull(poSmInfo.async) != null ? poSmInfo.async : true;
	vcSm.mediaType = poSmInfo.mediaType;
	vcSm.responseType = poSmInfo.responseType;
	/*
	 * if (ValueUtil.isNull(poSmInfo.userAttr)){
	 * 	vcSm.userAttr(poSmInfo.userAttr);
	 * }
	 */
	
	/* 요청 헤더 및 요청 파라미터 설정 */
	/** @type Array */
	var vaRqstHd = poSmInfo.requestHeader;
	if (!ValueUtil.isNull(vaRqstHd)){
		if (!vaRqstHd instanceof Array){
			vaRqstHd = [vaRqstHd];
		}
		
		vaRqstHd.forEach(function(/* {name:String,value:String}*/ each){
			vcSm.setHeader(each.name, each.value);
		});
	}

	/** @type Array */
	var vaRqstPm = poSmInfo.requestParameter;
	if (!ValueUtil.isNull(vaRqstPm)){
		if (!vaRqstPm instanceof Array){
			vaRqstPm = [vaRqstPm];
		}
		
		vaRqstPm.forEach(function(/* {name:String,value:String}*/each){
			vcSm.setParameters(each.name, each.value);
		});
	}
	
	/* 요청 데이터 및 응답 데이터 설정 */
	/** @type Array */
	var vaRqstData = poSmInfo.requestData;
	if (!ValueUtil.isNull(vaRqstData)){
		if (!vaRqstData instanceof Array){
			vaRqstData = [vaRqstData];
		}
		
		vaRqstData.forEach(function(/* {id:String, alias:String, payload:String} */ each){
			/** @type cpr.data.DataMap | cpr.data.DataSet */
			var vcDataCompn = app.lookup(each.id);
			
			if (vcDataCompn != null){
				vcSm.addRequestData(vcDataCompn, each.alias, each.payload);
			}
		});
	}
	
	/** @type Array */
	var vaRspnsData = poSmInfo.responseData;
	if (!ValueUtil.isNull(vaRspnsData)){
		if (!vaRspnsData instanceof Array){
			vaRspnsData = [vaRspnsData];
		}
		
		vaRspnsData.forEach(function(/* {id:String, alias:String, isAdd:Boolean} */ each){
			/** @type cpr.data.DataMap | cpr.data.DataSet */
			var vcDataCompn = app.lookup(each.id);
			
			if (vcDataCompn != null){
				vcSm.addResponseData(vcDataCompn, each.isAdd, each.alias);
			}
		});
	}
	
	app.register(vcSm);
}


/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} pcDsId
 */
SubmissionKit.prototype.autoRegister = function(app, pcDsId) {
	/** @type cpr.data.DataSet */
	var vcGrdSvlt = app.lookup(pcDsId);
	
	if (ValueUtil.isNull(vcGrdSvlt)){
		return;
	}
	
	for(var rowIdx = 0; rowIdx < vcGrdSvlt.getRowCount(); rowIdx++){
		var vsObjNm = vcGrdSvlt.getValue(rowIdx, "OBJ_NM"); // 오브젝트 명
		
		var vaTrgtDs = app.getAllDataControls().filter(function(each){
			return each instanceof cpr.data.DataSet;
		}).filter(function(each){
			return each.info == vsObjNm;
		}).map(function(each){
			return {
				id : each.id,
				isAdd : false
			};
		});
		
		this.register(app, vsObjNm, {
			action : "data/list.json", // vsObjNm,
			async : true,
			method : "post",
			mediaType : "application/x-www-form-urlencoded",
			responseType : "text",
			responseData : vaTrgtDs,
			userAttr : {
				"auto-registered" : "true"
			}
		});
	}
}


/**
 * 그리드 정보 유닛
 * @constructor
 * @param {invisble.module} invisibleKit
 */
function InfoKit(invisibleKit) {
	this._invisibleKit = invisibleKit; 
};


/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {cpr.data.DataSet} pcDsInfo
 * @param {cpr.controls.Grid} pcGrd
 * @param {cpr.data.DataSet} pcDsHdr
 * @param {cpr.data.DataMap} pcDmChart
 * @param {#userdefinedcontrol} pcChart
 * @return {cpr.controls.Container}
 */
InfoKit.prototype.draw = function(app, pcDsInfo, pcGrd, pcDsHdr, pcDmChart, pcChart) {
	/** @type cpr.data.DataSet */
	var vcDsGrdInfo = pcDsInfo;
	/** @type cpr.controls.Grid */
	var vcGrdMst = pcGrd;
	/** @type cpr.data.DataSet */
	var vcDsHdr = pcDsHdr;
	/** @type cpr.data.DataMap */
	var vcDmChart = pcDmChart;
	/** @type cpr.controls.UDCBase */
	var vcChart = pcChart;
	
	if (ValueUtil.isNull(vcDsGrdInfo)){
		return;
	}
	
	/* 그리드 인포 영역 컨테이너 생성 */
	var vcGrpInfo = new cpr.controls.Container("grpGrdInfo");
	var voGrpInfoLt = new cpr.controls.layouts.FormLayout();
	
	voGrpInfoLt.horizontalSpacing = 10;
	
	voGrpInfoLt.setRows(["28px"]);
	voGrpInfoLt.setColumns(["30px", "1fr", "1fr", "50px", "60px"]);
	
	voGrpInfoLt.getColumns().map(function(each, index){
		return each.indexOf("px") != -1 ? index : null;
	}).filter(function(each){
		return each != null;
	}).forEach(function(each){
		voGrpInfoLt.setColumnAutoSizing(each, true);
	});
	
	voGrpInfoLt.setColumnVisible(2, false);
	vcGrpInfo.setLayout(voGrpInfoLt);
	
	/* 그리드 로우 수 표시 아웃풋 생성 */
	var vcOptRowIdct = new cpr.controls.Output("optRowIdct");
	
	vcOptRowIdct.dataType = "number";
	vcOptRowIdct.displayExp = "'[총 ' + text + '건]'";
	vcOptRowIdct.bind("value").toExpression("#" + vcGrdMst.id + ".getRowCount()");
	
	vcGrpInfo.addChild(vcOptRowIdct, {
		rowIndex : 0,
		colIndex : 0
	});	
	
	/* 특이사항 라벨 생성 */
	var vsSpclCont = vcDsGrdInfo.getValue(0, "SPCL_CONT");
	if (!ValueUtil.isNull(vsSpclCont)){
		var vcLblSpclCont = new cpr.controls.Output("lblSpclCont");
		
		vcLblSpclCont.bind("value").toDataSet(vcDsGrdInfo, "SPCL_CONT", 0);
		
		vcGrpInfo.addChild(vcLblSpclCont, {
			rowIndex : 0,
			colIndex : 1
		});
	}
	
	/* 차트 라벨 생성 */
	if (vcDsHdr.getRowCount() > 0
		&& !ValueUtil.isNull(vcDmChart.getValue("OUTPUT_FORMNO"))) {
		/** 
		* @type {{
		* 	    CHART_TYP:String <!-- 차트 유형 -->,
		* 		CHART_CHCOPT:String <!-- 차트 유형 목록 -->,
		* 		XAXS_IDXVLU:String <!-- X축에 나타나는 범주 -->, 
		* 		YAXS_DEFAULTIDXVLU:String <!-- 디폴트 차트 범례 -->, 
		* 		DEFAULT_AXSGB:String <!-- 디폴트 차트 범례(다축) -->,
		* 		SRCH_CONDIDX:String <!-- 차트 범례 목록 -->,
		* 		SRCH_CONDAXSGB:String <!-- 차트 범례 목록(다축) -->
		* 	}}
		*/
		var voChartData = vcDmChart.getDatas();
		
		/* 차트 라벨이 붙는 그룹 컨테이너 생성 */
		var vcGrpChartInfo = new cpr.controls.Container("grpChartInfo");
		var voGrpChartInfoLt = new cpr.controls.layouts.FlowLayout();
		
		voGrpChartInfoLt.scrollable = false;
		voGrpChartInfoLt.lineWrap = false;
		
		vcGrpChartInfo.setLayout(voGrpChartInfoLt);
		
		vcGrpInfo.addChild(vcGrpChartInfo, {
			rowIndex : 0,
			colIndex : 2
		});
		
		var vcLblChart = new cpr.controls.Output("lblChart");
		vcLblChart.value = "차트 유형";
		
		vcGrpChartInfo.addChild(vcLblChart, {
			autoSize : "width",
			height : "100%"
		});
		
		/* 차트 유형 생성 */
		var vcCmbChartTyp = new cpr.controls.ComboBox("cmbChartTyp");
		
		/** @type cpr.data.DataSet */
		var vcDsC4092 = app.lookup("dsC4092");
		
		// 현재 표시 가능한 차트 유형으로만 필터
		var vaChartTypCond = voChartData["CHART_CHCOPT"].split("^");
		vaChartTypCond = vaChartTypCond.map(function(each){
			return "COMMON_CD == '" + each + "'";
		});
		
		vcDsC4092.setFilter(vaChartTypCond.join("||"));
		
		vcCmbChartTyp.setItemSet(vcDsC4092, {
			label : "CODE_NM",
			value : "COMMON_CD"
		});
		
		vcCmbChartTyp.value = voChartData["CHART_TYP"];
		
		vcCmbChartTyp.addEventListener("selection-change", function(e) {
			//vcChart.updateChartType(e.control.value);
		});
		
		vcGrpChartInfo.addChild(vcCmbChartTyp, {
			width : "100px",
			height : "100%"
		});
		
		var vsCondIdx = voChartData["SRCH_CONDIDX"] || voChartData["SRCH_CONDAXSGB"];
		var vsYaxsDfVal = voChartData["YAXS_DEFAULTIDXVLU"] || voChartData["DEFAULT_AXSGB"];
		var vbPolyAxs = ValueUtil.isNull(voChartData["SRCH_CONDIDX"]); // 다축 또는 양축인지의 여부
		
		if (!ValueUtil.isNull(vsCondIdx)){
			/* 차트 범례 목록 생성 */
			var vcLblChartYaxs = new cpr.controls.Output();
			vcLblChartYaxs.value = "차트 범례";
			
			vcGrpChartInfo.addChild(vcLblChartYaxs, {
				autoSize : "width",
				height : "100%"
			});
	
			// 다축이나 양축이 아닌 경우 구분자 추가(^)
			if (!vbPolyAxs){
				var vsCondCd = vsCondIdx.substring(0, 1);
	
				vsCondIdx = _parser(vsCondIdx, vsCondCd, "^");
				vsYaxsDfVal = _parser(vsYaxsDfVal, vsCondCd, "^");
			}
			
			var vaCondIdx = vsCondIdx.split("^");
			var vaYaxsDfVal = vsYaxsDfVal.split("^");
			
			if (vbPolyAxs){ // 다축 또는 양축일 때
				vaCondIdx = _chunk(vaCondIdx, parseInt(vaCondIdx.length / 2));
				
				for(var idx = 0; idx < vaCondIdx.length; idx++){
					var vaSrcCondIdx = vaCondIdx[idx];
					var vsDfVal = vaYaxsDfVal[idx];
					
					var vcCmbSrcCondIdx = new cpr.controls.ComboBox("cmbSrcCondIdx" + (idx + 1));
					
					for(var itemIdx = 0; itemIdx < vaSrcCondIdx.length; itemIdx++){
						var vsSrcCondIdxVal = vaSrcCondIdx[itemIdx];
						
						var vsSrcCondIdxTxt = "";
						if (vsSrcCondIdxVal.indexOf("R") != -1){
							vsSrcCondIdxTxt = _getRowText(vcGrdMst, vsSrcCondIdxVal);
						} else if (vsSrcCondIdxVal.indexOf("C") != -1) {
							vsSrcCondIdxTxt = _getColumnText(pcDsHdr, vsSrcCondIdxVal);
						}
						
						if (!(ValueUtil.isNull(vsSrcCondIdxTxt))){
							vcCmbSrcCondIdx.addItem(new cpr.controls.Item(vsSrcCondIdxTxt, vsSrcCondIdxVal));
						}
					}
					
					var vsCsYaxsDfVal = vsDfVal.replace(/[\^]/g, ","); // ^를 ,로 변환
					
					/* 일치하는 아이템이 있는 경우 해당 아이템 선택, 없는 경우 첫번재 아이템 선택 */
					var vcDfItem = vcCmbSrcCondIdx.getItemByValue(vsCsYaxsDfVal);
					if (!ValueUtil.isNull(vcDfItem)){
						vcCmbSrcCondIdx.value = vsCsYaxsDfVal;
					} else {
						vcCmbSrcCondIdx.selectItem(0);
					}
					
					vcCmbSrcCondIdx.userAttr("chart-legend", "true");
					
					vcCmbSrcCondIdx.addEventListener("selection-change", function(e){
						/** @type cpr.controls.Container */
						var vcGrpChartInfo = e.control.getParent();
						/** @type String[]*/
						var vaSrcCondIdxVals = vcGrpChartInfo.getAllRecursiveChildren(false).filter(function(each){
							return each.userAttr("chart-legend") == "true";
						}).map(function(/* cpr.controls.ComboBox */ each){
							return each.value;
						});
						
						var vsSrcCondIdxVal = vaSrcCondIdxVals.length > 0 ? vaSrcCondIdxVals.join(",") : null;
						
						// vcChart.updateOption(vsSrcCondIdxVal);
					});
					
					vcGrpChartInfo.addChild(vcCmbSrcCondIdx, {
						width : "180px",
						height : "100%"
					});
				}
			} else { // 다축 또는 양축 이외의 차트일 때
				var vcCmbSrcCondIdx = new cpr.controls.ComboBox("cmbSrcCondIdx1");
				
				for(var idx = 0; idx < vaCondIdx.length; idx++){
					var vsSrcCondIdx = vaCondIdx[idx];
	
					var vsSrcCondIdxTxt = "";
					if (vsSrcCondIdx.indexOf("R") != -1){
						vsSrcCondIdxTxt = _getRowText(vcGrdMst, vsSrcCondIdx);
					} else if (vsSrcCondIdx.indexOf("C") != -1) {
						vsSrcCondIdxTxt = _getColumnText(pcDsHdr, vsSrcCondIdx);
					}
					
					if (!(ValueUtil.isNull(vsSrcCondIdxTxt))){
						vcCmbSrcCondIdx.addItem(new cpr.controls.Item(vsSrcCondIdxTxt, vsSrcCondIdx));
					}
				}
				
				if (vsCondCd != "R"){
					vcCmbSrcCondIdx.multiple = true;
				}
				
				var vsCsYaxsDfVal = vsYaxsDfVal.replace(/[\^]/g, ","); // ^를 ,로 변환
				
				/* 일치하는 아이템이 있는 경우 해당 아이템 선택, 없는 경우 첫번재 아이템 선택 */
					var vcDfItem = vcCmbSrcCondIdx.getItemByValue(vsCsYaxsDfVal);
					if (!ValueUtil.isNull(vcDfItem)){
						vcCmbSrcCondIdx.value = vsCsYaxsDfVal;
					} else {
						vcCmbSrcCondIdx.selectItem(0);
					}
				
				vcCmbSrcCondIdx.addEventListener("selection-change", function(e) {
					//vcChart.updateOption(e.control.value);
				});
				
				vcGrpChartInfo.addChild(vcCmbSrcCondIdx, {
					width : "180px",
					height : "100%"
				});
			}
		}
	} // 차트 정보 생성 END
	
	/* 단위 생성 */
	var vcGrpUnit = new cpr.controls.Container("grpUnit");
	var voGrpUnitLt = new cpr.controls.layouts.FlowLayout();
	
	voGrpUnitLt.spacing = 3;
	voGrpUnitLt.scrollable = false;
	
	vcGrpUnit.setLayout(voGrpUnitLt);
	
	var vsBassUnit = vcDsGrdInfo.getValue(0, "BASIC_UNIT");
	var vsBassUnitDsp = vcDsGrdInfo.getValue(0, "BASIC_UNITDSP");
	
	vsBassUnitDsp = _parser(vsBassUnitDsp, "^", ";");
	
	if (!ValueUtil.isNull(vsBassUnitDsp)){
		/** @type cpr.data.DataMap */
		var vcDmSearch = app.lookup("dmSearch");
		
		/* 단위 텍스트 생성 */
		var vcLblUnit = new cpr.controls.Output("lblUnit");
		vcLblUnit.value = "단위 :";
		
		vcGrpUnit.addChild(vcLblUnit, {
			"height" : "100%",
			"autoSize" : "width"
		});
		
		var vaSplitedBassUnitDsp = _splits(vsBassUnitDsp, [";", "^"]); // 명,건,^원
		var vaSplitedBassUnit = _splits(vsBassUnit, [";"]); // T0000^08;T0000^00
		
		for(var idx = 0, cdIdx = 0; idx < vaSplitedBassUnitDsp.length; idx++){
			var vsBassUnitDspVal = vaSplitedBassUnitDsp[idx];
			
			if (ValueUtil.isNull(vsBassUnitDspVal)){
				
				if (vaSplitedBassUnit.length > 0 && !ValueUtil.isNull(vaSplitedBassUnit[cdIdx])){
					var vaBassUnitVal = vaSplitedBassUnit[cdIdx].split("^");
					var vsBassUnitCd = vaBassUnitVal[0];
					var vsBassUnitDfVal = vaBassUnitVal[1];
					
					var vcUnit = new cpr.controls.ComboBox();
					
					//TODO 현재 단위에 대한 코드값을 가져오는 부분이 어떻게 해결되어야 할지 보아야 함
					vcUnit.setItemSet(app.lookup("ds" + vsBassUnitCd), {
						label : "CODE_NM",
						value : "COMMON_CD"
					});
					
					vcUnit.bind("value").toDataMap(app.lookup("dmSearch"), "tmpV4" + cdIdx);
					vcUnit.value = vsBassUnitDfVal;
					
					//TODO 코드값 변경에 대한 이벤트 작성
					vcUnit.addEventListener("selection-change", function(e) {
						var control = e.control;
						
						alert(e.newSelection[0].label);
					});
					
					vcGrpUnit.addChild(vcUnit, {
						"height" : "100%",
						"width" : "80px"
					});
					
					cdIdx++;
				}
				
			} else {
				var vcUnitDsp = new cpr.controls.Output();
				vcUnitDsp.value = vsBassUnitDspVal;
				
				vcGrpUnit.addChild(vcUnitDsp, {
					"height" : "100%",
					"autoSize" : "width"
				});
			}
		}
	}
		
	vcGrpInfo.addChild(vcGrpUnit, {
		rowIndex : 0,
		colIndex : 3
	});
	
	/* 그리드 버튼 생성 */
	var vcGrdInfoBtns = new udc.cmn.GridInfoButtons();
	
	vcGrdInfoBtns.grid = vcGrdMst;
	
	if (vcDsHdr.getRowCount() == 0 
		|| ValueUtil.isNull(vcDmChart.getValue("OUTPUT_FORMNO"))){
		vcGrdInfoBtns.setLayoutButtonVisible(false);
	}
	
	vcGrpInfo.addChild(vcGrdInfoBtns, {
		rowIndex : 0,
		colIndex : 4
	});

	return vcGrpInfo;
}


/**
 * 
 * @private
 * @param {String} value
 * @param {String} token
 * @param {String} seperator
 * @return {String}
 */
function _parser(value, token, seperator) {
	if (value == null || value == ""){
		return null;
	}
	
	var buffer = [];
	var chars = value.split("");
	for(var idx = 0; idx < chars.length; idx++){
		var char = chars[idx];
		
		if (idx > 0 && (char == token && buffer[buffer.length - 1] != seperator)) { // 추가
			buffer.push(seperator);
			
			if (chars[idx + 1] == token) { // 교체
				continue;
			}
		}
		
		buffer.push(char);
	}
	
	return buffer.join("");
}


/**
 * 배열을 특정 사이즈로 나눕니다.
 * @private
 * @param {Array} array
 * @param {Number} size
 */
function _chunk(array, size) {
	var chunk = [];
	
	for(var idx = 0; idx < array.length; idx+= size){
		chunk.push(array.slice(idx, idx + size));
	}
	
	return chunk;
}


/**
 * @private
 * @param {String} value
 * @param {String[]} tokens
 * @return {String}
 */
function _splits(value, tokens) {
	var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        value = value.split(tokens[i]).join(tempChar);
    }
    value = value.split(tempChar);
    return value;
}


/**
 * 
 * @param {"number" | "character"} type
 * @param {String} value
 */
function _extract(type, value) {
	if (ValueUtil.isNull(type) || ValueUtil.isNull(value)){
		return;
	}
	
	var vaExtracted = [];
	if (type == "number"){
		vaExtracted = value.match(/\d+/g);
	} else if (type == "character") {
		vaExtracted = value.match(/[a-zA-Z]+/g);
	}
	
	var vsExtractedText = vaExtracted.join("");
	if (ValueUtil.isNumber(vsExtractedText)){
		vsExtractedText = ValueUtil.fixNumber(vsExtractedText);
	}
	
	return vsExtractedText;
}


/**
 * 
 * @param {cpr.data.DataSet} pcDsHdr
 * @param {String} psValue
 */
function _getColumnText(pcDsHdr, psValue) {
	if (ValueUtil.isNull(pcDsHdr)){
		return;
	}
	
	/** @type cpr.data.DataSet */
	var vcDsHdr = pcDsHdr;

	var vnColIdx = _extract("number", psValue);
	
	var vcTreGrdHd = new cpr.controls.Tree();
	vcTreGrdHd.setItemSet(vcDsHdr, {
		label : "HEADER_NM",
		value : "HEADER_ID",
		parentValue : "PARENT_HDRID"
	});
	
	var vcMatchedItem = vcTreGrdHd.getItems().filter(function(each){
		return !(vcTreGrdHd.hasChild(each));
	})[vnColIdx];
	
	var vaHdTxt = [];
	var vcTgItem = vcMatchedItem;
	while(vcTgItem){
		vaHdTxt.push(vcTgItem.label);
		vcTgItem = vcTgItem.parentItem;
	}
	
	/* 데이터 역순 정렬 */
	vaHdTxt.reverse();
	
	return vaHdTxt.join("-");
}


/**
 * 
 * @param {any} pcGrid
 * @param {any} psValue
 */
function _getRowText(pcGrid, psValue) {
	if (ValueUtil.isNull(pcGrid)){
		return;
	}
	
	/** @type cpr.controls.Grid */
	var vcGrdMst = pcGrid;
	/** @type cpr.data.DataSet */
	var vcDsGrd = vcGrdMst.dataSet;
	
	var vnRowIndex = _extract("number", psValue);
	
	var vsRowText = vcGrdMst.getCellValue(vnRowIndex, 0);
	
	return vsRowText;
}

exports.DataSetKit = DataSetKit;
exports.DataViewKit = DataViewKit;
exports.DataMapKit = DataMapKit;
exports.SubmissionKit = SubmissionKit;
exports.InfoKit = InfoKit;