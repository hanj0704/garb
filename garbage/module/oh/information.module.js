/************************************************
 * information.module.js
 * Created at 2020. 7. 6. 오전 9:45:18.
 *
 * @author ryu
 ************************************************/

module.depends("module/initialize");

/************************************************
 * 전역 변수 선언
 ************************************************/

/* 웹 접근성 */
var mbWebAccessibility = true;

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

/* 다국어 */

//TODO 올바른 다국어 키값으로 값을 변경하십시오. 미변경 시 기본값은 한국어입니다.

/**
 * "총"에 해당하는 다국어.
 * 언어 코드에 따른 값 또는 일반 문자열을 아웃풋의 값으로 출력합니다.
 * @type {String}
 */
var msLangTotal = cpr.I18N.INSTANCE.message("total") || "총";

/**
 * "건"에 해당하는 다국어.
 * 언어 코드에 따른 값 또는 일반 문자열을 아웃풋의 값으로 출력합니다.
 * @type {String}
 */
var msLangCount = cpr.I18N.INSTANCE.message("count") || "건";

/**
 * "단위"에 해당하는 다국어.
 * 언어 코드에 따른 값 또는 일반 문자열을 아웃풋의 값으로 출력합니다.
 * @type {String}
 */
var msLangUnit = cpr.I18N.INSTANCE.message("unit") || "단위";

/**
 * "차트 유형"에 해당하는 다국어.
 * 언어 코드에 따른 값 또는 일반 문자열을 아웃풋의 값으로 출력합니다.
 * @type {String}
 */
var msLangChartTyp = cpr.I18N.INSTANCE.message("ChartTyp") || "차트 유형";

/**
 * "차트 범례"에 해당하는 다국어.
 * 언어 코드에 따른 값 또는 일반 문자열을 아웃풋의 값으로 출력합니다.
 * @type {String}
 */
var msLangChartLegend = cpr.I18N.INSTANCE.message("ChartLegend") || "차트 범례";

/* 레이아웃 */

/**
 * 기본 정보 레이아웃(폼 레이아웃) 가로 배치 간격
 * @type {Number}
 */
var mnLtHorizontalSpacing = 10;

/**
 * 기본 정보 레이아웃(폼 레이아웃) 행 높이 (px 또는 fr)
 * @type {String}
 */
var msLtRowSize = "28px";

/**
 * 기본 정보 레이아웃(폼 레이아웃) 컬럼 너비 (px 또는 fr)
 * px 단위의 경우 자동 크기 사용이 적용됩니다.
 * @type {String[]}
 */
var maLtColumnSize = ["30px", "1fr", "1fr", "50px", "60px"];

/**
 * 단위 정보 레이아웃(플로우 레이아웃) 컨트롤 간 사이 간격
 * @type {Number}
 */
var mnUnitLtSpacing = 3;

/* 정보 컨트롤 */

/**
 * 콤보박스 형태의 단위 정보를 나타내는 컨트롤 너비 값
 * @type {String}
 */
var msCmbUnitDspWidth = "80px";

/**
 * 차트 유형 정보를 나타내는 컨트롤 너비 값
 * @type {String}
 */
var msCmbChartTypOptWidth = "100px";

/**
 * 차트 범례 정보를 나타내는 컨트롤 너비 값
 * @type {String}
 */
var msCmbChartLegendWidth = "150px";

/* 컬럼 명칭 */

/**
 * 차트 정보 KEY 값(출력양식번호).
 * 해당 값으로 차트와 그리드 버튼 정보 생성 여부를 파악한다.
 * @type {String}
 */
var msColOutputFormNo = "OUTPUT_FORMNO";

/**
 * 기본 정보 특이사항 값.
 * @type {String}
 */
var msColSpclCont = "SPCL_CONT";

/**
 * 콤보박스 형태의 단위에 대한 단위 목록 및 기본값.
 * 목록을 공통 코드로 부터 제공받고, 해당 목록 중 기본값을 설정한다.
 * e.g. T2050^08
 * @type {String}
 */
var msColBasicUnit = "BASIC_UNIT";

/**
 * 단위 표시 값.
 * 특정 구분자가 표시된 단위는 콤보박스 형태로 나타나며,
 * 그 외의 단위는 일반 텍스트로 표시한다.
 * @type {String}
 */
var msColBasicUnitDsp = "BASIC_UNITDSP";

/**
 * 콤보박스 형태의 단위와 연결될 바인딩 컬럼명.
 * 조회 조건 데이터 맵의 컬럼과 일치하는 경우 바인딩한다.
 * @type {String}
 */
var msColBindUnit1 = "tmpV40";

/**
 * 콤보박스 형태의 단위와 연결될 바인딩 컬럼명.
 * 조회 조건 데이터 맵의 컬럼과 일치하는 경우 바인딩한다.
 * @type {String}
 */
var msColBindUnit2 = "tmpV41";

/**
 * 공통 코드명 (label)
 * @type {String}
 */
var msColCodeNm = "CODE_NM";

/**
 * 공통 코드 값 (value)
 * @type {String}
 */
var msColCommonCd = "COMMON_CD";

/**
 * 차트 유형 기본값
 * @type {String}
 */
var msColChartTyp = "CHART_TYP";

/**
 * 차트 유형 목록 값
 * @type {String}
 */
var msColChartOpt = "CHART_CHCOPT";

/**
 * 차트 범례 목록 값.
 * 차트 유형 기본값이 다축 또는 양축이 아닌 경우 해당 컬럼을 사용한다.
 * @type {String}
 */
var msColSrchCondIdx = "SRCH_CONDIDX";

/**
 * 차트 범례 목록 값.
 * 차트 유형 기본값이 다축 또는 양축인 경우 해당 컬럼을 사용한다.
 * 값은 라인 차트와 막대 차트로 구분된다.
 * @type {String}
 */
var msColSrchCondAxs = "SRCH_CONDAXSGB";

/**
 * 차트 범례 기본값.
 * 차트 범례 목록이 다축 또는 양축 기준으로 생성되었을 경우
 * 해당 컬럼을 이용하지 않는다.
 * @type {String}
 */
var msColYaxsDefaultIdxVlu = "YAXS_DEFAULTIDXVLU";

/**
 * 차트 범례 기본값.
 * 차트 범례 목록이 다축 또는 양축 기준으로 생성되었을 경우
 * 해당 컬럼을 이용한다.
 * @type {String}
 */
var msColDefaultAxs = "DEFAULT_AXSGB";

/**
 * 차트 범례 목록 구성 시 임시로 생성되는 트리와 바인딩되는 컬럼.
 * 트리 아이템의 명으로 사용된다. (label)
 * @type {String}
 */
var msColHeaderNm = "HEADER_NM";

/**
 * 차트 범례 목록 구성 시 임시로 생성되는 트리와 바인딩되는 컬럼.
 * 트리 아이템의 값으로 사용된다. (value)
 * @type {String}
 */
var msColHeaderId = "HEADER_ID";

/**
 * 차트 범례 목록 구성 시 임시로 생성되는 트리와 바인딩되는 컬럼.
 * 트리 아이템의 부모값으로 사용된다. (parentValue)
 * @type {String}
 */
var msColParentHdrId = "PARENT_HDRID";


/************************************************
 * 글로벌 출판 사용자 모듈
 ************************************************/

var information = (function(){
	/* 비공개 멤버 변수 선언 */
	//TODO 해당 함수 내에서만 사용할 비공개 멤버 변수를 선언하십시오.
	
	
	/* Display Kit */
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {
	 *   {
	 *     info : cpr.data.DataSet <!-- 기본 정보 데이터 셋 -->,
	 *     grid : {
	 *       control : cpr.controls.Grid <!-- 그리드 컨트롤 객체 -->,
	 *       data : cpr.data.DataSet <!-- 그리드 생성 관련 데이터 셋 (컬럼 정보 데이터 셋) -->
	 *     },
	 *     chart : {
	 *       control : cpr.controls.UDCBase <!-- 차트 컨트롤 객체 -->,
	 *       data : cpr.data.DataMap <!-- 차트 생성 관련 데이터 맵 -->
	 *     }
	 *   }
	 * } poConfig 정보 생성 환경
	 */
	function displayInfo(app, poConfig) {
		/* 필수 정보가 없을 시 표시하지 않음 */
		if (ValueUtil.isNull(poConfig)){
			return;
		}
		
		/* 정보 박스 생성 */
		var vcGrpInfoBox = makeBasicInfoBox();
		
		/* 그리드 정보 생성 - 건수 표시 */
		var vcGridInfo = makeGridInfo(app, poConfig["grid"]);
		
		/* 기본 정보 생성 - 특이사항 표시 */
		var vcBasicInfo = makeBasicInfo(app, poConfig["info"]);
		
		/* 차트 정보 생성 - 차트 유형 및 차트 범례 */
		var vcChartInfo = makeChartInfo(app, poConfig);
		
		/* 단위 정보 생성 - 단위 표시 */
		var vcUnitInfo = makeUnitInfo(app, poConfig["info"]);
		
		/* 버튼 정보 생성 - 파일 다운로드 및 레이아웃 변경 버튼 표시 */
		var vcBtnInfo = makeButtonInfo(app, poConfig);
		
		/* 배열 순서대로 정보 박스에 컨트롤을 추가 */
		var vaInfoChildren = [vcGridInfo, vcBasicInfo, vcChartInfo, vcUnitInfo, vcBtnInfo];
		vaInfoChildren.forEach(function(/* cpr.controls.UIControl */ each, /* Number */ index){
			if (!ValueUtil.isNull(each)){
				vcGrpInfoBox.addChild(each, {
					rowIndex : 0,
					colIndex : index
				});
			}
		});
		
		return vcGrpInfoBox;
	}
	
	/**
	 * 현재 표시된 정보 박스의 높이값을 가져옵니다.
	 * @return {String}
	 */
	function getDisplayRowSize() {
		return msLtRowSize;
	}
	
	/* Basic Kit */
	
	/**
	 * 정보 컨테이너와 기본 레이아웃을 동적으로 생성합니다.
	 * @return {cpr.controls.Container}
	 */
	function makeBasicInfoBox() {
		var vcGrpInfoBox= new cpr.controls.Container();
		var voGrpInfoBoxLt = new cpr.controls.layouts.FormLayout();
		
		/* 기본 레이아웃 속성 설정 */
		voGrpInfoBoxLt.setRows([msLtRowSize]);
		voGrpInfoBoxLt.setColumns(maLtColumnSize);
		
		voGrpInfoBoxLt.horizontalSpacing = mnLtHorizontalSpacing;
		
		/* px 구획 자동 크기 사용 적용 */
		voGrpInfoBoxLt.getColumns().forEach(function(/* String */ each, /* Number */ index){
			if (each.indexOf("px") !== -1){
				voGrpInfoBoxLt.setColumnAutoSizing(index, true);
			}
		});
		
		vcGrpInfoBox.setLayout(voGrpInfoBoxLt);
		
		return vcGrpInfoBox;
	}

	/**
	 * 
	 * @param {cpr.core.AppInstance} app
	 * @param {cpr.data.DataSet} pcDataSet
	 */
	function makeBasicInfo(app, pcDataSet) {
		if (ValueUtil.isNull(pcDataSet)){
			return;
		}
		
		/** @type cpr.data.DataSet */
		var vcDsGrdInfo = pcDataSet;
		
		if (vcDsGrdInfo.getRowCount() === 0){
			return;
		}
		
		var vsSpclCont = vcDsGrdInfo.getValue(0, msColSpclCont);
		
		/*
		 * if (ValueUtil.isNull(vsSpclCont)){
		 * 	return;
		 * }
		 */
		
		var vcLblSpclCont = new cpr.controls.Output();
		
		vcLblSpclCont.ellipsis = true;
		vcLblSpclCont.value = vsSpclCont;
		
		if (mbWebAccessibility){
			vcLblSpclCont.tooltip = vcLblSpclCont.value;
		}
		
		return vcLblSpclCont;
	}
		
	/* Grid Kit */
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {
	 *   control : cpr.controls.Grid <!-- 그리드 컨트롤 객체 -->,
	 *   data? : cpr.data.DataSet <!-- 그리드 생성 관련 데이터 셋 (컬럼 정보 데이터 셋) -->
	 * } poConfig
	 */
	function makeGridInfo(app, poConfig) {
		if (ValueUtil.isNull(poConfig)){
			return;
		}
		
		/** @type cpr.controls.Grid */
		var vcGrdMst = poConfig["control"];
		
		var vcLblRowCnt = new cpr.controls.Output();
		
		vcLblRowCnt.dataType = "number";
		vcLblRowCnt.displayExp = "\"["+ msLangTotal +" \"+text+\""+ msLangCount +"]\"";
		vcLblRowCnt.bind("value").toExpression("#" + vcGrdMst.id + ".getRowCount()");
		
		return vcLblRowCnt;
	}
	
	/* Chart Kit */
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app
	 * @param {
	 *   {
	 *     info? : cpr.data.DataSet <!-- 기본 정보 데이터 셋 -->,
	 *     grid : {
	 *       control? : cpr.controls.Grid <!-- 그리드 컨트롤 객체 -->,
	 *       data : cpr.data.DataSet <!-- 그리드 생성 관련 데이터 셋 (컬럼 정보 데이터 셋) -->
	 *     },
	 *     chart : {
	 *       control : cpr.controls.UDCBase <!-- 차트 컨트롤 객체 -->,
	 *       data : cpr.data.DataMap <!-- 차트 생성 관련 데이터 맵 -->
	 *     }
	 *   }
	 * } poConfig 정보 생성 환경
	 */
	function makeChartInfo(app, poConfig) {
		if (ValueUtil.isNull(poConfig)){
			return;
		}
		
		/** @type cpr.data.DataMap */
		var vcDmChart = poConfig["chart"]["data"];
		/** @type cpr.data.DataSet */
		var vcDsGrd = poConfig["grid"]["data"];
		/** @type cpr.controls.Grid */
		var vcGrdMst = poConfig["grid"]["control"];
		/** @type udc.cmn.ApexChartUDC */
		var vcUdcChart = poConfig["chart"]["control"];
		
		/* 그리드 생성 관련 데이터가 존재하고 차트 데이터가 있는 경우에만 차트 정보 표시 */
		if (vcDsGrd.getRowCount() == 0 
			|| ValueUtil.isNull(vcDmChart.getValue(msColOutputFormNo))){
			return;
		}
		
		console.log(vcDmChart.getDatas());
		
		/* 차트 정보를 감싸는 컨테이너(그룹) 생성 */
		var vcGrpChartInfo = new cpr.controls.Container();
		var voGrpChartInfoLt = new cpr.controls.layouts.FlowLayout();
		
		voGrpChartInfoLt.scrollable = false;
		voGrpChartInfoLt.lineWrap = false;
		
		vcGrpChartInfo.setLayout(voGrpChartInfoLt);
		
		/* 차트 정보 중 차트 유형 정보 생성 */
		var vcLblChartTyp = new cpr.controls.Output();
		vcLblChartTyp.value = msLangChartTyp;
		
		vcGrpChartInfo.addChild(vcLblChartTyp, {
			height : "100%",
			autoSize : "width"
		});
		
		var vcCmbChartTyp = new cpr.controls.ComboBox();
		
		//FIXME 차트 유형 목록 코드 값 공통 처리 필요
		var vcDsCmnCd = init.DataSet.getCodeDataSet(app, "C4092");
		
		/** @type String */
		var vsChartTypOpt = vcDmChart.getValue(msColChartOpt);
		
		var vaChartTypOpts = vsChartTypOpt.split(msCaretSeparated);
		var vsChartTypOptCond = vaChartTypOpts.map(function(each){
			return msColCommonCd + "== '" + each + "'";
		}).join("||");
		
		vcCmbChartTyp.setItemSet(vcDsCmnCd, {
			label : msColCodeNm,
			value : msColCommonCd
		});
		
		vcCmbChartTyp.setFilter(vsChartTypOptCond);
		
		vcCmbChartTyp.value = vcDmChart.getValue(msColChartTyp);
		
		if (mbWebAccessibility){
			vcCmbChartTyp.tooltip = msLangChartTyp;
		}
		
		vcCmbChartTyp.addEventListener("selection-change", function(e){
			//TODO 차트 유형 변경 시 발생할 로직을 작성하십시오.
		});
		
		vcGrpChartInfo.addChild(vcCmbChartTyp, {
			width : msCmbChartTypOptWidth,
			height : "100%"
		});
		
		/* 차트 정보 중 차트 범례 정보 생성 */
		/** @type String */
		var vsSrchCond = vcDmChart.getValue(msColSrchCondIdx) || vcDmChart.getValue(msColSrchCondAxs); // 차트
		/** @type String */ 
		var vsYaxsDfVlu = vcDmChart.getValue(msColYaxsDefaultIdxVlu) || vcDmChart.getValue(msColDefaultAxs);
		var vbMultiChart = ValueUtil.isNull(vcDmChart.getValue(msColSrchCondIdx)); // 멀티 축 여부
		
		if (!ValueUtil.isNull(vsSrchCond)){
			var vcLblChartLegend = new cpr.controls.Output();
			vcLblChartLegend.value = msLangChartLegend;
			
			vcGrpChartInfo.addChild(vcLblChartLegend, {
				height : "100%",
				autoSize: "width"
			});
			
			/** @type String[] */
			var vaSrchCond = _refineChartData(vbMultiChart, vsSrchCond, msCaretSeparated, true);
			/** @type String */
			var vsYaxsDfVlu = _refineChartData(vbMultiChart, vsYaxsDfVlu, msCaretSeparated);
			
			/** @type Array */
			var arr = _chunk(vaSrchCond);
			for(var idx = 0; idx < arr.length; idx++){
				var vcCmbLegend = _createLegendList(vbMultiChart, {
					items : arr[idx],
					value : vsYaxsDfVlu,
					row : vcGrdMst,
					column : vcDsGrd
				});
				
				vcGrpChartInfo.addChild(vcCmbLegend, {
					width : "180px",
					height : "100%"
				});
			}
		}
		
		return vcGrpChartInfo;
	}
	
	/**
	 * 
	 * @param {Boolean} multi
	 * @param {String} value
	 * @param {String} delimiter
	 * @param {Boolean} split
	 */
	function _refineChartData(multi, value, delimiter, split) {
		var vsRefineVal = value;
		
		if (!multi){
			var vsSplitCd = vsRefineVal.substring(0, 1); // 첫 코드값 (C 또는 R)
			
			// e.g. C1C2C3 to C1^C2^C3 for split
			vsRefineVal = _parser(vsRefineVal, vsSplitCd, delimiter);
		}
		
		if (split === true){
			var vaRefineVal = vsRefineVal.split(delimiter);
		}
		
		return vaRefineVal || vsRefineVal;
	}
	
	/**
	 * 
	 * @param {any} multi
	 * @param {
	 *   {
	 *     items : String[] <!-- 아이템 구성 정보 -->,
	 *     value : String <!-- 기본값 -->,
	 *     row : cpr.controls.Grid <!-- R기준, 아이템의 라벨값 추출 그리드 -->,
	 *     column : cpr.data.DataSet <!-- C기준, 아이템의 라벨값 추출 데이터셋 -->
	 *   }
	 * } config
	 */
	function _createLegendList(multi, config) {
		var vcCmbSrchCond = new cpr.controls.ComboBox();
		
		var vaSrchCond = config.items;
		var vsYaxsDfVlu = config.value;
		var vsStrCd = _extract("character", config.items[0]);

		/* 콤보박스 아이템 설정 */
		for(var itemIdx = 0; itemIdx < vaSrchCond.length; itemIdx++){
			var vsSrchCondVal = vaSrchCond[itemIdx];
			
			var vsSrchCondTxt = null;
			if (vsSrchCondVal.indexOf("R") != -1) {
				vsSrchCondTxt = _getRowText(config.row, vsSrchCondVal);
			} else if (vsSrchCondVal.indexOf("C") != -1) {
				vsSrchCondTxt = _getColumnText(config.column, vsSrchCondVal);
			}
			
			if (!(ValueUtil.isNull(vsSrchCondTxt))){
				vcCmbSrchCond.addItem(new cpr.controls.Item(vsSrchCondTxt, vsSrchCondVal));
			}
		}
		
		/* 콤보박스 속성 및 이벤트 설정 */
		if (!multi && vsStrCd.indexOf("R") == -1){
			vcCmbSrchCond.multiple = true;
		}
		
		vcCmbSrchCond.userAttr("chart-legend", "true");
		
		/* 콤보박스 기본값 설정(일치하는 아이템이 없는 경우 첫번째 아이템 선택) */
		var vsDelimiter = vcCmbSrchCond.delimiter;
		var vsCvYaxsDfVluVal = vsYaxsDfVlu.replace(/[\^]/g, vsDelimiter);
		
		var vaCvYaxsDfVluVal = vsCvYaxsDfVluVal.split(vsDelimiter);
		vaCvYaxsDfVluVal.forEach(function(each){
			vcCmbSrchCond.selectItemByValue(each);
		});
		
		if (vcCmbSrchCond.getSelection().length == 0){
			vcCmbSrchCond.selectItem(0);
		}
		
		vcCmbSrchCond.addEventListener("selection-change", function(e) {
			var vcGrpChartInfo = e.control.getParent();
			/** @type String[] */
			var vaSrchCondVals = vcGrpChartInfo.getAllRecursiveChildren(false).filter(function(each){
				return each.type == "combobox" && each.userAttr("chart-legend") == "true";
			}).map(function(/* cpr.controls.ComboBox */ each){
				return each.value;
			});
			
			var vsSrchCondVals = vaSrchCondVals.length > 0 ? vaSrchCondVals.join(vsDelimiter) : null;
			
			// vcChart.updateOption(vsSrchCondVals)
		});
		
		return vcCmbSrchCond;
	}
	
	/* Unit Kit */
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app 앱 인스턴스
	 * @param {cpr.data.DataSet} pcDataSet 정보 데이터 셋
	 */
	function makeUnitInfo(app, pcDataSet) {
		if (ValueUtil.isNull(pcDataSet)){
			return;
		}
		
		/** @type cpr.data.DataSet */
		var vcDsGrdInfo = pcDataSet;
		
		var vsBasicUnitDsp = vcDsGrdInfo.getValue(0, msColBasicUnitDsp); // 기본단위표시
		var vsBasicUnit = vcDsGrdInfo.getValue(0, msColBasicUnit); // 기본단위
		
		/* 
		 * 기본단위표시값이 없는 경우
		 * 단위 생성에 대한 조건을 알 수 없으므로 단위를 생성하지 않는다.
		 */
		if (ValueUtil.isNull(vsBasicUnitDsp)){
			return;
		}
		
		/* 단위 정보를 감싸는 컨테이너(그룹) 생성 - 해당 그룹에 단위 정보가 추가된다. */
		var vcGrpUnitInfoWrap = new cpr.controls.Container();
		var voGrpUnitInfoWrapLt = new cpr.controls.layouts.FlowLayout();
		
		voGrpUnitInfoWrapLt.scrollable = false;
		voGrpUnitInfoWrapLt.spacing = mnUnitLtSpacing;
		
		vcGrpUnitInfoWrap.setLayout(voGrpUnitInfoWrapLt);
		
		/* 단위 텍스트 생성 */
		var vcLblUnitTxt = new cpr.controls.Output();
		vcLblUnitTxt.value = msLangUnit + " :";
		
		vcGrpUnitInfoWrap.addChild(vcLblUnitTxt, {
			height : "100%",
			autoSize : "width"
		});
		
		/* 콤보박스 형태 단위 또는 텍스트 형태 단위 생성 */
		
		/* 
		 * 데이터 불일치 문제에 대한 해결로써 데이터 재정제.
		 * 특수한 문자(^) 앞에 구분자(;)를 넣는다.
		 * i.e. 명,건,^원 -> 명,건,;^원
		 */
		vsBasicUnitDsp = _parser(vsBasicUnitDsp, msCaretSeparated, msSemicolonSeparated);
		
		/* 멀티 스플릿하여 문자열을 배열로 전환 */
		var vaSplittingBasicUnitDsp = _splits(vsBasicUnitDsp, [msSemicolonSeparated, msCaretSeparated]); // e.g. 명,건,^원
		var vaSplittingBasicUnit = _splits(vsBasicUnit, [msSemicolonSeparated]); // e.g. T2050^08;T2059^06
		
		/* 
		 * 기본단위표시 배열 개수만큼 단위를 생성.
		 * 콤보박스 형태 단위는 별개로 카운팅하여 콤보박스인지 텍스트인지에 대한 형태를 구분(vnCmbIdx)
		 */
		for(var vnDspIdx = 0, vnCmbIdx = 0; vnDspIdx < vaSplittingBasicUnitDsp.length; vnDspIdx++){
			var vsBasicUnitDspVal = vaSplittingBasicUnitDsp[vnDspIdx]; // 기본단위표시 단일 값
			
			if (ValueUtil.isNull(vsBasicUnitDspVal)){ // 공백("") 값인 경우 콤보박스 단위 생성
				var vsBasicUnitVal = vaSplittingBasicUnit[vnCmbIdx]; //콤보박스 단위 목록 값 및 기본값
				
				var vcCmbUnitDsp = new cpr.controls.ComboBox();
				
				if (!ValueUtil.isNull(vsBasicUnitVal)){ // 콤보박스 관련 값이 있는 경우에만 로직 연결
					var vaSplittingUnitVal = vsBasicUnitVal.split(msCaretSeparated);
					var vsBasicUnitCd = vaSplittingUnitVal[0]; // 콤보박스 목록 코드값 (공통 코드)
					var vsBasicUnitDfVal = vaSplittingUnitVal[1]; // 콤보박스 기본값
					
					/* 일치하는 공통 코드가 있는 경우에만 목록 및 기본값 설정 */
					var vcDsCmnCd = init.DataSet.getCodeDataSet(app, vsBasicUnitCd);
					if (!ValueUtil.isNull(vcDsCmnCd)){
						vcCmbUnitDsp.setItemSet(vcDsCmnCd, {
							label : msColCodeNm,
							value : msColCommonCd
						});
						
						var vcDmReqData = init.DataMap.getRequestDataMap(app);
						
						var vsBindUnitColNm = vnCmbIdx == 0 ? msColBindUnit1 : msColBindUnit2;
						
						vcCmbUnitDsp.bind("value").toDataMap(vcDmReqData, vsBindUnitColNm);
						vcCmbUnitDsp.value = vsBasicUnitDfVal;
						
						vcCmbUnitDsp.addEventListener("selection-change", function(e){
							var control = e.control;
							
							//TODO 데이터 조회에 대한 동작을 (서브미션 전송) 작성하십시오.							
						});
					} // end of if
					
					//XXX 웹접근성 관련 코드 위치 수정
					if (mbWebAccessibility){
						vcCmbUnitDsp.tooltip = msLangUnit + "(" + ValueUtil.fixNull(vaSplittingBasicUnitDsp[vnDspIdx + 1]) + ")";
					}
					
					vnCmbIdx++;	
				} // end of if
				
				/* 콤보박스 관련 값 유무에 상관없이 콤보박스 추가 */
				vcGrpUnitInfoWrap.addChild(vcCmbUnitDsp, {
					height : "100%",
					width : msCmbUnitDspWidth
				});
			} else { // 공백("") 값이 아닌 경우 일반 텍스트 단위 생성
				var vcLblUnitDsp = new cpr.controls.Output();
				vcLblUnitDsp.value = vsBasicUnitDspVal;
				
				vcGrpUnitInfoWrap.addChild(vcLblUnitDsp, {
					height : "100%",
					autoSize : "width"
				});
			} // end of if
		} // end of for
		
		return vcGrpUnitInfoWrap;
	}
	
	/* Button Kit */
	
	/**
	 * 
	 * @param {cpr.core.AppInstance} app
	 * @param {
	 *   {
	 *     info : cpr.data.DataSet <!-- 기본 정보 데이터 셋 -->,
	 *     grid : {
	 *       control : cpr.controls.Grid <!-- 그리드 컨트롤 객체 -->,
	 *       data : cpr.data.DataSet <!-- 그리드 생성 관련 데이터 셋 (컬럼 정보 데이터 셋) -->
	 *     },
	 *     chart : {
	 *       control? : cpr.controls.UDCBase <!-- 차트 컨트롤 객체 -->,
	 *       data : cpr.data.DataMap <!-- 차트 생성 관련 데이터 맵 -->
	 *     }
	 *   }
	 * } poConfig 
	 */
	function makeButtonInfo(app, poConfig) {
		if (ValueUtil.isNull(poConfig)){
			return;
		}
		
		/** @type cpr.controls.Grid */		
		var vcGrdMst = poConfig["grid"]["control"];
		/** @type cpr.data.DataSet */
		var vcDsGrd = poConfig["grid"]["data"];

		/** @type cpr.data.DataMap */
		var vcDmChart = poConfig["chart"]["data"];
		
		var vcGrdInfoBtns = new udc.cmn.GridInfoButtons();
		
		vcGrdInfoBtns.grid = vcGrdMst;
		
		/* 그리드가 그려지지 않았거나 차트 정보가 없는 경우 레이아웃 변경 버튼 숨김 */
		var vsOutputFormNo = vcDmChart.getValue(msColOutputFormNo);
		if (vcDsGrd.getRowCount() === 0 || ValueUtil.isNull(vsOutputFormNo)){
			vcGrdInfoBtns.setLayoutButtonVisible(false);
		}
		
		return vcGrdInfoBtns;
	}
	
	return {
		Display : {
			getInfoBox : displayInfo,
			getRowSize : getDisplayRowSize
		},
		Basic : {
			makeInfoBox : makeBasicInfoBox,
			makeInfo : makeBasicInfo
		},
		Grid : {
			makeInfo : makeGridInfo
		},
		Chart : {
			makeInfo : makeChartInfo
		},
		Unit : {
			makeInfo : makeUnitInfo
		}
	}
})();
globals.info = information;

/************************************************
 * 유틸성 비공개 함수
 ************************************************/

/**
 * 배열을 특정 사이즈로 나눕니다.
 * @private
 * @param {Array} array
 * @param {Number} size
 */
function _chunk(array, size) {
	/*
	 * var chunk = [];
	 * for(var idx = 0; idx < array.length; idx+= size){
	 * 	chunk.push(array.slice(idx, idx + size));
	 * }
	 * 
	 * return chunk;
	 */
	
	var extract = array.map(function(each){
		return _extract("character", each);
	});
	
	var uniq = _.uniq(extract);
	
	var chunk = [];
	
	var tmp = array.join("");
	
	for(var idx = 0; idx < uniq.length; idx++){
		var first = extract.indexOf(uniq[idx]);
		var last = extract.lastIndexOf(uniq[idx]);
		
		chunk.push(array.slice(first, last + 1));
	}
	
	return chunk;
}

/**
 * 
 * @private
 * @param {String} value
 * @param {String[]} tokens
 * @return {String[]}
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
 * @private
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
 * @private
 * @param {cpr.controls.Grid} pcGrid
 * @param {String} psValue
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