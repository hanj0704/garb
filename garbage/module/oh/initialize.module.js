/************************************************
 * initialize.module.js
 * Created at 2020. 7. 2. 오전 11:18:19.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 전역 변수 선언
 ************************************************/

/* 구분자 */

/**
 * 콤마 구분자
 */
var msCommaSeparated = ",";

/**
 * 세미콜론 구분자
 */
var msSemicolonSeparated  = ";";

/**
 * 캐럿 구분자
 */
var msCaretSeparated = "^";

/* 데이터 셋 */

/**
 * 그리드와 연결되는 데이터 셋 아이디 접두사
 */
var msResponseDataDataSetPrefix = "ds";

/**
 * 공통 코드 데이터 셋 아이디 접두사
 */
var msCodeDataSetPrefix = "ds";

/* 데이터 맵 */

/**
 * 조회 조건과 연결되는 파라미터 데이터 맵 명칭
 */
var msRequestDataDataMapId = "dmSearch";

/* 데이터 뷰 */

/**
 * 공통 코드 데이터 뷰 아이디 접두사
 */
var msCodeDataViewPrefix = "dv"; 


/************************************************
 * 글로벌 출판 사용자 모듈
 ************************************************/

var initialize = (function(unit){
	/* 비공개 멤버 변수 선언 */
	//TODO 해당 함수 내에서만 사용할 비공개 멤버 변수를 선언하십시오.
	
	/* DataSet Kit */
	
	/**
	 * 데이터셋 초기 속성, Column 정보, Row Data 정보를 세팅합니다.
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {String} psDataSetId 데이터 셋 아이디
	 * @param {
	 *   {
	 *     alterColumnLayout : "client" | "server" | "merge" <!-- 컬럼 구조 변경 기준 -->,
	 *     sortCondition? : String <!-- 정렬 조건 -->,
	 *     filterCondition? : String <!-- 필터링 조건 -->,
	 *     info? : String <!-- 데이터 셋 정보 -->,
	 *     stateRestore? : Boolean <!-- 초기값 저장 여부 -->,
	 *     columns : {
	 *       name : String <!-- 컬럼명 -->,
	 *       dataType? : "string" | "number" | "decimal" | "expression" <!-- 컬럼 타입 -->,
	 *       displayOnly? : Boolean <!-- 원본 데이터 기억 불가 여부 -->,
	 *       expression? : #expression <!-- 표현식 -->,
	 *       info? : String <!-- 컬럼 정보값 -->
	 *     }[] <!-- 컬럼 설정 정보 -->,
	 *     rows? : Object[] <!-- 행 데이터 -->
	 *   }
	 * } poConfig 데이터 셋 생성 정보
	 * @param {Boolean} pbRegister? 식별 가능한 개체 등록 여부 (default:true)
	 * @return {cpr.data.DataSet}
	 */
	function registerDataSet(app, psDataSetId, poConfig, pbRegister) {
		if (ValueUtil.isNull(psDataSetId)){
			return;
		}
		
		var vcDataSet = new cpr.data.DataSet(psDataSetId);
		vcDataSet.userAttr("auto-registered", "true");
		
		vcDataSet.parseData(poConfig);
		
		var vbRegister = ValueUtil.isNull(pbRegister) ? true : pbRegister;
		if (vbRegister){
			app.register(vcDataSet);
		}
		
		return vcDataSet;
	}
	
	
	/**
	 * 그리드와 연결되는 데이터 셋을 동적으로 생성합니다.
	 * 그리드와 연결되는 데이터 셋의 아이디는 prefix(default:ds) +KEY값 + 숫자(1부터) 입니다.
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {#dataset} psDataSetId 데이터 셋 아이디
	 * @param {#column} psColumnName KEY에 해당하는 데이터 셋 컬럼명
	 */
	function registerResponseDataDataSet(app, psDataSetId, psColumnName) {
		/** @type cpr.data.DataSet */
		var vcDsGrdObj = app.lookup(psDataSetId);
		
		if (ValueUtil.isNull(vcDsGrdObj)){
			return;
		}
		
		/* 데이터 셋에 해당 컬럼명을 가진 컬럼이 있는지 판별 */
		var voObjColumn = vcDsGrdObj.getColumn(psColumnName);
		if (ValueUtil.isNull(voObjColumn)){
			return;
		}

		for(var idx = 0; idx < vcDsGrdObj.getRowCount(); idx++){
			var vsObjNm = vcDsGrdObj.getValue(idx, psColumnName);
			
			registerDataSet(app, msResponseDataDataSetPrefix + vsObjNm + (idx + 1), {
				alterColumnLayout : "server",
				info : vsObjNm
			});
		}
	}
	
	
	/**
	 * 공통 코드 데이터 셋을 동적으로 생성합니다.
	 * 공통 코드 데이터 셋의 아이디는 prefix(default:ds) + 공통 코드값 입니다.
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {#dataset} psDataSetId 데이터 셋 아이디
	 * @param {#column} psColumnName 코드 유형(group)에 해당하는 데이터 셋 컬럼명
	 */
	function registerCodeDataSet(app, psDataSetId, psColumnName) {
		/** @type cpr.data.DataSet */
		var vcDsCmnCd = app.lookup(psDataSetId);
		
		if (ValueUtil.isNull(vcDsCmnCd)){
			return;
		}
		
		/* 데이터 셋에 해당 컬럼명을 가진 컬럼이 있는지 판별 */
		var voCdColumn = vcDsCmnCd.getColumn(psColumnName);
		if (ValueUtil.isNull(voCdColumn)){
			return;
		}
		
		var vaDstnctVals = vcDsCmnCd.getUnfilteredDistinctValues(psColumnName);
		
		for(var idx = 0; idx < vaDstnctVals.length; idx++){
			var vsDstnctVal = vaDstnctVals[idx];
			
			var vaAllHds = vcDsCmnCd.getHeaders();
			
			var vaNewDsColumn = vaAllHds.map(function(each){
				return {
					name : each.getName(),
					dataType : each.getDataType(),
					info : each.getInfo()
				};
			});
			
			var vaFindAllRows = vcDsCmnCd.findAllRow(psColumnName + "== '" + vsDstnctVal + "'");
			
			var vaNewDsRow = vaFindAllRows.map(function(each){
				return each.getRowData();
			});
			
			registerDataSet(app, msCodeDataSetPrefix + vsDstnctVal, {
				info : vsDstnctVal,
				columns : vaNewDsColumn,
				rows : vaNewDsRow
			});
		}
	}
	
	
	/**
	 * 동적으로 등록된 데이터 셋을 배열로 가져옵니다.
	 * 동적으로 등록된 데이터 셋이 없는 경우 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @return {cpr.data.DataSet[]}
	 */
	function getRegisteredDataSet(app, psFilter) {
		var vaRegistDataSet = [];
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			
			if (vcDataCtrl instanceof cpr.data.DataSet 
				&& vcDataCtrl.userAttr("auto-registered") == "true"){
				vaRegistDataSet.push(vcDataCtrl);
			}
		}
		
		return vaRegistDataSet;
	}
	
	
	/**
	 * 등록된 데이터 셋을 배열로 가져옵니다.
	 * 등록된 데이터 셋이 없는 경우 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app
	 */
	function getAllRegisteredDataSet(app) {
		var vaRegistDataSet = [];
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			
			if (vcDataCtrl instanceof cpr.data.DataSet){
				vaRegistDataSet.push(vcDataCtrl);
			}
		}
		
		return vaRegistDataSet;
	}
	
	
	/**
	 * 동적으로 등록된 공통 코드 데이터셋을 가져옵니다.
	 * @param {cpr.core.AppInstance} app
	 * @param {String} psValue
	 */
	function getRegisteredCodeDataSet(app, psValue) {
		var vaRegisteredDataSet = getRegisteredDataSet(app);
		
		for(var idx = 0; idx < vaRegisteredDataSet.length; idx++){
			var vcDataCtrl = vaRegisteredDataSet[idx];
			
			if (vcDataCtrl.info === psValue){
				return vcDataCtrl;
			}
		}
		
		return null;
	}
	
	/**
	 * 그리드와 연결된 데이터 셋을 배열로 가져옵니다.
	 * 일치하는 데이터 셋이 없는 경우 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app
	 * @param {String} psServletNm
	 * @return {cpr.data.DataSet[]}
	 */
	function getResponseDataSet(app, psServletNm) {
		var vaResDataSets = [];
		if (ValueUtil.isNull(psServletNm)){
			return vaResDataSets;
		}
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			if (vcDataCtrl instanceof cpr.data.DataSet){
				if (vcDataCtrl.info == psServletNm){
					vaResDataSets.push(vcDataCtrl);
				}
			}
		}
		
		return vaResDataSets;
	}
	
	/* DataMap Kit */
	
	/**
	 * 데이터 맵 초기 속성, Column 정보, 기본값 정보를 세팅합니다.
	 * @param {cpr.core.AppInstance} app
	 * @param {String} psDataMapId
	 * @param {
	 *   {
	 *     alterColumnLayout? : "client" | "server" | "merge" <!-- 컬럼 구조 변경 기준 -->,
	 *     info? : String <!-- 데이터 맵 정보 -->,
	 *     columns : {
	 *       name : String <!-- 컬럼명 -->,
	 *       dataType? : "string" | "number" | "decimal" | "expression" <!-- 컬럼 타입 -->,
	 *       defaultValue? : String <!-- 기본값 -->,
	 *       expression? : #expression <!-- 표현식 -->,
	 *       info? : String <!-- 컬럼 정보값 -->
	 *     }[] <!-- 컬럼 정보 -->
	 *   }
	 * } poConfig 데이터 맵 생성 정보
	 * @param {Boolean} pbRegister
	 * @return {cpr.data.DataMap}
	 */
	function registerDataMap(app, psDataMapId, poConfig, pbRegister) {
		if (ValueUtil.isNull(psDataMapId)){
			return;
		}
		
		var vcDataMap = new cpr.data.DataMap(psDataMapId);
		vcDataMap.userAttr("auto-registered", "true");
		
		vcDataMap.parseData(poConfig);
		
		var vbRegister = ValueUtil.isNull(pbRegister) ? true : pbRegister;
		if (vbRegister){
			app.register(vcDataMap);
		}
		
		return vcDataMap;
	}
	
	
	/**
	 * 조회조건에 해당하는 데이터 맵을 동적으로 생성합니다.
	 * 정적 데이터 셋 아이디를 파라미터로 넘기면 고정적으로 추가 컬럼을 등록할 수 있습니다.
	 * 정적 데이터 셋에서 KEY에 해당하는 컬럼명이 없으면 일반 데이터 셋명으로 검색하여 등록합니다.
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {#dataset} psDataSetId 데이터 셋 아이디
	 * @param {#column} psColumnName KEY에 해당하는 컬럼명
	 * @param {#dataset} psStaticDataSetId? 정적 데이터 셋 아이디
	 * @param {#column} psStaticColumnName? 정적 데이터 셋에서 KEY에 해당하는 컬럼명
	 */
	function registerRequestDataDataMap(app, psDataSetId, psColumnName, psStaticDataSetId, psStaticColumnName) {
		/** @type cpr.data.DataSet */
		var vcDsSearch = app.lookup(psDataSetId);
		
		if (ValueUtil.isNull(vcDsSearch)){
			return;
		}
		
		var vaNewDmColumn = []; // 새로 생성되는 데이터 맵 컬럼
		
		/* 정적 컬럼 추가 */
		if (!ValueUtil.isNull(psStaticDataSetId)){
			/** @type cpr.data.DataSet */
			var vcDsStatic = app.lookup(psStaticDataSetId);
			
			var vsStaticColumnName = psStaticColumnName || psColumnName;
			var voStaticColumn = vcDsStatic.getColumn(vsStaticColumnName);
			
			if (!ValueUtil.isNull(voStaticColumn)){
				for(var idx = 0; idx < vcDsStatic.getRowCount(); idx++){
					var vsStaticSearchVal = vcDsStatic.getValue(idx, vsStaticColumnName);
					
					if (ValueUtil.isNull(vsStaticSearchVal)){
						continue;
					}
					
					vaNewDmColumn.push({
						name : vsStaticSearchVal
					});
				}
			}
		}
		
		/* 검색 조건 컬럼 추가 */
		var voSearchColumn = vcDsSearch.getColumn(psColumnName);
		if (!ValueUtil.isNull(voSearchColumn)){
			for(var idx = 0; idx < vcDsSearch.getRowCount(); idx++){
				var vsSearchVal = vcDsSearch.getValue(idx, psColumnName);
				
				if (ValueUtil.isNull(vsSearchVal)){
					continue;
				}
				
				var vaSearchVals = vsSearchVal.split(msCommaSeparated);
				vaSearchVals.forEach(function(each){
					vaNewDmColumn.push({
						name : each
					});
				});
			}
		}
		
		registerDataMap(app, msRequestDataDataMapId, {
			columns : vaNewDmColumn
		});
	}
	
	
	/**
	 * 동적으로 등록된 데이터 맵을 배열로 가져옵니다.
	 * 동적으로 등록된 데이터 맵이 없는 경우 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app
	 */
	function getRegisteredDataMap(app) {
		var vaRegistDataMap = [];
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			
			if (vcDataCtrl instanceof cpr.data.DataMap 
				&& vcDataCtrl.userAttr("auto-registered") == "true"){
				
				vaRegistDataMap.push(vcDataCtrl);
			}
		}
		
		return vaRegistDataMap;
	}
	
	
	/**
	 * 등록된 데이터 맵을 배열로 가져옵니다.
	 * 등록된 데이터 맵이 없는 경우 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app
	 */
	function getAllRegisteredDataMap(app) {
		var vaRegistDataMap = [];
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			
			if (vcDataCtrl instanceof cpr.data.DataMap){
				vaRegistDataMap.push(vcDataCtrl);
			}
		}
		
		return vaRegistDataMap;
	}
	
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app
	 */
	function getRequestDataDataMap(app) {
		/** @type cpr.data.DataMap */
		var vcDmReqData = app.lookup(msRequestDataDataMapId);
		
		if (!ValueUtil.isNull(vcDmReqData)){
			return vcDmReqData;
		}
		
		return null;
	}
	
	/* DataView Kit */
	
	/**
	 * 데이터 뷰 초기 속성, Column 정보, Row Data 정보를 세팅합니다.
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {cpr.data.DataSet} pcParentDataSet 타켓 데이터 셋 객체
	 * @param {String} psDateViewId 데이터 뷰 아이디
	 * @param {
	 *   {
	 *     sortCondition? : #expression <!-- 정렬 조건 -->,
	 *     filterCondition? : #expression <!-- 필터 조건 -->
	 *   }
	 * } poConfig? 데이터 뷰 생성 정보
	 * @param {Boolean} pbRegister
	 * @return {cpr.data.DataView}
	 */
	function registerDataView(app, pcParentDataSet, psDateViewId, poConfig, pbRegister) {
		if (ValueUtil.isNull(pcParentDataSet) || ValueUtil.isNull(psDateViewId)){
			return;
		}
		
		var vcDataView = new cpr.data.DataView(psDateViewId, pcParentDataSet);
		
		vcDataView.parseData(poConfig);
		
		var vbRegister = ValueUtil.isNull(pbRegister) ? true : pbRegister;
		if (vbRegister){
			app.register(vcDataView);
		}
		
		return vcDataView;
	}
	
	
	/**
	 * 공통 코드 데이터 뷰를 동적으로 생성합니다.
	 * 공통 코드 데이터 셋의 아이디는 prefix(default:ds) + 공통 코드값 입니다.
	 * @param {cpr.core.AppInstance} app
	 * @param {#dataset} psDataSetId
	 * @param {#column} psColumnName
	 */
	function registerCodeDataView(app, psDataSetId, psColumnName) {
		/** @type cpr.data.DataSet */
		var vcDsCmnCd = app.lookup(psDataSetId);
		
		if (ValueUtil.isNull(vcDsCmnCd)){
			return;
		}
		
		/* 데이터 셋에 해당 컬럼명을 가진 컬럼이 있는지 판별 */
		var voCdColumn = vcDsCmnCd.getColumn(psColumnName);
		if (ValueUtil.isNull(voCdColumn)){
			return;
		}
		
		var vaDstnctVals = vcDsCmnCd.getUnfilteredDistinctValues(psColumnName);
		
		for(var idx = 0; idx < vaDstnctVals.length; idx++){
			var vsDstnctVal = vaDstnctVals[idx];
			
			var vaAllHds = vcDsCmnCd.getHeaders();
			
			var vaNewDsColumn = vaAllHds.map(function(each){
				return {
					name : each.getName(),
					dataType : each.getDataType(),
					info : each.getInfo()
				};
			});
			
			var vaFindAllRows = vcDsCmnCd.findAllRow(psColumnName + "== '" + vsDstnctVal + "'");
			
			var vaNewDsRow = vaFindAllRows.map(function(each){
				return each.getRowData();
			});
			
			registerDataView(app, vcDsCmnCd, msCodeDataViewPrefix + vsDstnctVal, {
				filterCondition: psColumnName + "== '" + vsDstnctVal + "'"
			});
		}
	}
	
	/* Submit Kit */
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {String} psSubmissionId 서브미션 아이디
	 * @param {
	 *   {
	 *     action : String <!-- 통신 경로 -->,
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
	 * 	}[] <!-- 요청 데이터 -->,
	 * 	responseData : {
	 * 		id : #dataset | #datamap,
	 * 		alias? : String,
	 * 		isAdd : Boolean	
	 * 	}[] <!-- 응답 데이터 -->,
	 * 	userAttr? : {key:String, value:String} <!-- 사용자 속성 -->
	 *   }
	 * } poConfig 서브미션 생성 정보
	 * @param {Boolean} pbRegister 앱 인스턴스 등록 여부
	 * @return {cpr.protocols.Submission}
	 */
	function registerSubmission(app, psSubmissionId, poConfig, pbRegister) {
		if (ValueUtil.isNull(psSubmissionId)){
			return;
		}
		
		var vcSubmission = new cpr.protocols.Submission(psSubmissionId);
		
		/* 서브미션 속성 설정 */
		vcSubmission.action = poConfig.action;
		vcSubmission.method = poConfig.method || "post";
		vcSubmission.withCredentials = poConfig.withCredentials || false;
		vcSubmission.async = poConfig.async || true;
		vcSubmission.mediaType || "application/x-www-form-urlencoded";
		vcSubmission.responseType || "text";
		
		if (!ValueUtil.isNull(poConfig.userAttr)){
			vcSubmission.userAttr(poConfig.userAttr);
		}
		
		/* 요청 헤더 및 요청 파라미터 설정 */
		/** @type Array */
		var vaReqHd = poConfig.requestHeader;
		if (!ValueUtil.isNull(vaReqHd)){
			if (!(vaReqHd instanceof Array)){
				vaReqHd = [vaReqHd];
			}
			
			vaReqHd.forEach(function(/* {name:String,value:String}*/ each){
				vcSubmission.setHeader(each.name, each.value);
			});
		}
		
		/** @type Array */
		var vaReqPm = poConfig.requestParameter;
		if (!ValueUtil.isNull(vaReqPm)){
			if (!(vaReqPm instanceof Array)){
				vaReqPm = [vaReqPm];
			}
			
			vaReqPm.forEach(function(/* {name:String,value:String}*/each){
				vcSubmission.setParameters(each.name, each.value);
			});
		}
		
		/* 요청 데이터 및 응답 데이터 설정 */
		/** @type Array */
		var vaReqData = poConfig.requestData;
		if (!ValueUtil.isNull(vaReqData)){
			if (!(vaReqData instanceof Array)){
				vaReqData = [vaReqData];
			}
			
			vaReqData.forEach(function(/* {id:String, alias:String, payload:String} */ each){
				/** @type cpr.data.DataMap | cpr.data.DataSet */
				var vcDataCompn = app.lookup(each.id);
				
				if (!ValueUtil.isNull(vcDataCompn)){
					vcSubmission.addRequestData(vcDataCompn, each.alias, each.payload);
				}
			});
		}
		
		/** @type Array */
		var vaResData = poConfig.responseData;
		if (!ValueUtil.isNull(vaResData)){
			if (!(vaResData instanceof Array)){
				vaResData = [vaResData];
			}
			
			vaResData.forEach(function(/* {id:String, alias:String, isAdd:Boolean} */ each){
				/** @type cpr.data.DataMap | cpr.data.DataSet */
				var vcDataCompn = app.lookup(each.id);
				
				if (!ValueUtil.isNull(vcDataCompn)){
					vcSubmission.addResponseData(vcDataCompn, each.isAdd, each.alias);
				}
			});
		}
		
		var vbRegister = ValueUtil.isNull(pbRegister) ? true : pbRegister;
		if (vbRegister){
			app.register(vcSubmission);
		}
		
		return vcSubmission;
	}
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {#dataset} psDataSetId
	 * @param {#column} psColumnName
	 */
	function registerDataSubmission(app, psDataSetId, psColumnName) {
		/** @type cpr.data.DataSet */
		var vcDsGrdSvlt = app.lookup(psDataSetId);
		
		if (ValueUtil.isNull(vcDsGrdSvlt)){
			return;
		}
		
		var voSvltColumn = vcDsGrdSvlt.getColumn(psColumnName);
		if (ValueUtil.isNull(voSvltColumn)){
			return;
		}
		
		for(var idx = 0; idx < vcDsGrdSvlt.getRowCount(); idx++){
			var vsSvltNm = vcDsGrdSvlt.getValue(idx, psColumnName);
			
			var vaTargetDs = getResponseDataSet(app, vsSvltNm);
			var vaResDatas = vaTargetDs.map(function(each){
				return {
					id : each.id,
					isAdd : false
				};
			});
			
			registerSubmission(app, vsSvltNm, {
				action : "data/list.json",
				requestData : {
					id : msRequestDataDataMapId
				},
				responseData : vaResDatas,
				userAttr : {
					"auto-registered" : "true"
				}
			});
		}
	}
	
	
	/**
	 * 동적으로 등록된 서브미션 객체를 배열로 가져옵니다.
	 * 동적으로 등록된 서브미션이 없으면 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app
	 * @return {cpr.protocols.Submission[]}
	 */
	function getRegisteredSubmission(app) {
		var vaRegistSubmissions = [];
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			
			if (vcDataCtrl instanceof cpr.protocols.Submission 
				&& vcDataCtrl.userAttr("auto-registered") == "true"){
				
				vaRegistSubmissions.push(vcDataCtrl);
			}
		}
		
		return vaRegistSubmissions;
	}
	
	
	/**
	 * 현재 앱에 등록된 모든 서브미션 객체를 배열로 가져옵니다.
	 * 등록된 서브미션이 없으면 빈 배열을 리턴합니다.
	 * @param {cpr.core.AppInstance} app
	 * @return {cpr.protocols.Submission[]}
	 */
	function getAllRegisteredSubmission(app) {
		var vaRegistSubmissions = [];
		
		var vaAllDataCtrls = app.getAllDataControls();
		for(var idx = 0; idx < vaAllDataCtrls.length; idx++){
			var vcDataCtrl = vaAllDataCtrls[idx];
			
			if (vcDataCtrl instanceof cpr.protocols.Submission){
				vaRegistSubmissions.push(vcDataCtrl);
			}
		}
		
		return vaRegistSubmissions;
	}
	
	return {
		DataSet : {
			register : registerDataSet,
			registerData : registerResponseDataDataSet,
			registerCode : registerCodeDataSet,
			getResponseDataSet : getResponseDataSet,
			getRegisteredDataSet : getRegisteredDataSet,
			getAllRegisteredDataSet : getAllRegisteredDataSet,
			getCodeDataSet : getRegisteredCodeDataSet
		},
		DataMap : {
			register : registerDataMap,
			registerData : registerRequestDataDataMap,
			getRegisteredDataMap : getRegisteredDataMap,
			getAllRegisteredDataMap : getAllRegisteredDataMap,
			getRequestDataMap : getRequestDataDataMap
		},
		DataView : {
			register : registerDataView,
			registerCode : registerCodeDataView
		},
		Submit : {
			register : registerSubmission,
			registerData : registerDataSubmission,
			getRegisteredSubmission : getRegisteredSubmission,
			getAllRegisteredSubmission : getAllRegisteredSubmission
		}
	}
})();
globals.init = initialize;

