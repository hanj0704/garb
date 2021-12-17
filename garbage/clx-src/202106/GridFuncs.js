/************************************************
 * GridFuncs.js
 * Created at 2021. 6. 22. 오전 9:05:27.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 그리드 -> 오피스 복사/붙여넣기
 ************************************************/

/**
 * 
 * @param {cpr.controls.Grid} grd
 * @param {"cell" | "row" | "column"} selUnit
 * @parem {String} data
 */
function copyHtml(grd, selUnit, data) {
	var tagArr = null;
	switch(selUnit) {
		case "cell" : {
			tagArr = copyCellHtml(grd, data);
			break;
		}
		case "row" : {
			tagArr = copyRowHtml(grd, data);
		}
		case "column" : {
			tagArr = copyColumnHtml(grd, data);
		}
	}
	
	var clipTag = getClipboardNode();
	var tblTag = clipTag.firstElementChild;
	tblTag.innerHTML = tagArr.join("");
	tagArr = null;
	
	var selection = window.getSelection();
	selection.removeAllRanges();
	
	var isIE = (cpr.core.Platform.INSTANCE.browserInfo.name == "ie");
	if(isIE) {
		var range = document.createRange();
    	range.selectNode(tblTag);
    	selection.addRange(range);
	} else {
		selection.selectAllChildren(tblTag);
	}
	
	document.execCommand("copy");
	
	selection.removeAllRanges();
	
	/* 클립보드 태그 삭제 (스크롤 방지) */
	var clipTag = document.getElementById("gridClipboard");
	document.body.removeChild(clipTag);
}

function getClipboardNode() {
	var clipTag = document.getElementById("gridClipboard");
	if(!clipTag) {
		clipTag = document.createElement("div");
		clipTag.id = "gridClipboard";
		clipTag.style.width = "1px";
		clipTag.style.height = "1px";
		clipTag.style.overflow = "hidden";
		clipTag.style.position = "absolute";
		clipTag.style.left = "-1px";
		clipTag.style.top = "-1px";
		
		var tblTag = document.createElement("table");
		tblTag.style.border = "1px solid black";
		tblTag.style.borderCollapse = "collapse";
		clipTag.appendChild(tblTag);
		
		clipTag = document.body.appendChild(clipTag);
	}
	
	return clipTag;
}

function copyCellHtml(/* cpr.controls.Grid */ grd, data) {
	var htmlText = [];
	
	var rows = data.split("\n");
	for(var i = 0; i < rows.length - 1; i++){
		
		var datas = rows[i].split("\t");
		if(datas.length > 0) {
			htmlText[htmlText.length] = "<tr>";
			for(var j = 0; j < datas.length; j++){
				htmlText[htmlText.length] = "<td style='border-left: 1px solid #000000; "
				 + "border-right: 1px solid #000000; "
				 + "border-bottom: 1px solid #000000; "
				 + "border-top: 1px solid #000000;'>";
				htmlText[htmlText.length] = datas[j];
				htmlText[htmlText.length] = "</td>";
			}
			htmlText[htmlText.length] = "</tr>";
		}
	}
	
	return htmlText;
}

/**
 * 행을 복사합니다.
 * @param {cpr.controls.Grid} grd
 * @param {String} data
 */
function copyRowHtml(grd, data) {
	var htmlText = [];
	var selectDataRowCount = grd.getSelectedRowIndices().length;
	var designRowCount = grd.detail.getRowHeights().length;
	var selectedRowCount = selectDataRowCount * designRowCount;
	
	var rows = data.split("\n");
	for(var i = 0; i < rows.length; i++){
		if(i >= selectedRowCount){
			break;
		}
		
		var datas = rows[i].split("\t");
		if(datas.length > 0) {
			htmlText[htmlText.length] = "<tr>";
			for(var j = 0; j < datas.length; j++){
				htmlText[htmlText.length] = "<td style='border-left: 1px solid #000000; "
				 + "border-right: 1px solid #000000; "
				 + "border-bottom: 1px solid #000000; "
				 + "border-top: 1px solid #000000;'>";
				htmlText[htmlText.length] = datas[j];
				htmlText[htmlText.length] = "</td>";
			}
			htmlText[htmlText.length] = "</tr>";
		}
	}
	
	return htmlText;
}

/**
 * 열을 복사합니다.
 * @param {cpr.controls.Grid} grd
 * @param {String} data
 */
function copyColumnHtml(grd, data) {
	
	var htmlText = [];
	var totalDataRowCount = grd.getRowCount();
	var designRowCount = grd.detail.getRowHeights().length;
	var selectedRowCount = totalDataRowCount * designRowCount;
	
	var rows = data.split("\n");
	for(var i = 0; i < rows.length; i++){
		if(i >= selectedRowCount){
			break;
		}
		
		var datas = rows[i].split("\t");
		if(datas.length > 0) {
			htmlText[htmlText.length] = "<tr>";
			for(var j = 0; j < datas.length; j++){
				htmlText[htmlText.length] = "<td style='border-left: 1px solid #000000; "
				 + "border-right: 1px solid #000000; "
				 + "border-bottom: 1px solid #000000; "
				 + "border-top: 1px solid #000000;'>";
				htmlText[htmlText.length] = datas[j];
				htmlText[htmlText.length] = "</td>";
			}
			htmlText[htmlText.length] = "</tr>";
		}
	}

	return htmlText;
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	/* 데이터 조회 */
	app.lookup("subGroupingList").send().then(function(input){
		app.lookup("grdGrp").redraw();
	});
	
	app.lookup("subTreeList").send().then(function(input){
		app.lookup("grdTrc").redraw();
	});
	
	app.lookup("subStockList").send().then(function(input){
		app.lookup("grdExl").redraw();
	});
	
	app.lookup("subList").send().then(function(input){
		app.lookup("grdSplt").redraw();
	});
	
	/* 콤보박스 기본값 설정 */
	app.lookup("cmbSplt").selectItem(0);
	app.lookup("cmbCpPst").selectItem(0);
	
	/* 그리드 엑셀 관련 정보 */
	setColumnInfos();
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbSpltSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbSplt = e.control;
	
	var vcGrdSplt = app.lookup("grdSplt");
	
	var vcSlctItem = e.newSelection[0];
	var vsItemVal = vcSlctItem.value;
	
	/* 틀고정 초기화 */
	vcGrdSplt.leftSplit = 0;
	vcGrdSplt.rightSplit = 0;
	vcGrdSplt.topSplit = 0;
	vcGrdSplt.bottomSplit = 0;
	
	if (vsItemVal == "left"){
		vcGrdSplt.leftSplit = 2;
		vcGrdSplt.leftSplitWidth = 240;
	} else if (vsItemVal == "right") {
		vcGrdSplt.rightSplit = 1;
		vcGrdSplt.leftSplitWidth = 100;
	} else if (vsItemVal == "top") {
		vcGrdSplt.topSplit = 3;
		vcGrdSplt.topSplitHeight = parseInt(vcGrdSplt.getInitConfig().detail.rows[0].height) * 3 + 3;
	} else if (vsItemVal == "bottom") {
		vcGrdSplt.bottomSplit = 3;
		vcGrdSplt.bottomSplitHeight = parseInt(vcGrdSplt.getInitConfig().detail.rows[0].height) * 3 + 3;
	}
	
	vcGrdSplt.redraw();
}


/*
 * 그리드에서 before-paste 이벤트 발생 시 호출.
 * Grid에서 ctrl + v 로 붙여넣기시 붙여넣기 전에 발생하는 이벤트.
 */
function onGrdCpPstBeforePaste(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCpPst = e.control;
	
	var rowIndex = grdCpPst.getRowCount();
	var selectedCellIndices = grdCpPst.getSelectedCellIndices();

	if(selectedCellIndices != null && selectedCellIndices.length == 0) {
		var data = e.data.split("\n");
		var vnCount = data.length - 1;
		
		for(var idx = 0; idx < vnCount; idx++){
			grdCpPst.insertRow(0);
		}
		grdCpPst.redraw();
	}
}


/**
 * 컬럼 정보를 담는다.
 */
function setColumnInfos() {
	var vcDsReq = app.lookup("dsReq");
	var vcGrdMst = app.lookup("grdExl");
	
	var vnCellCnt = vcGrdMst.detail.cellCount;
	
	for(var idx = 0; idx < vnCellCnt; idx++){
		var voHdCol = vcGrdMst.header.getColumn(idx);
		var voDtlCol = vcGrdMst.detail.getColumn(idx);
		
		if (voDtlCol == null){
			continue;
		}
		
		var vsColTxt = voHdCol.text;
		var vsColNm = voDtlCol.columnName;
		
		vcDsReq.addRowData({
			TXT : vsColTxt,
			COL_NM : vsColNm
		});
	}
}


/**
 * 전날과 비교한 주식가격 차이에 대한 등락가의 퍼센트
 * @param {Number} pnStock 주가
 * @param {Number} pnFluctuation 등락가격
 */
function getFluctuations(pnStock, pnFluctuation) {
	// ((현재 주가 - 전일 주가) / 전일 주가) * 100 => 등락율
	var today = pnStock;
	var yesterday = today - pnFluctuation; // 12000 - 2000 = 10000
	var fluctuation = ((today - yesterday) / yesterday) * 100;
	
	return fluctuation;
}
exports.getFluctuations = getFluctuations;

/*
 * "가져오기" 버튼(btnImp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnImpClick(/* cpr.events.CMouseEvent */ e){
	var vcFiExl = app.lookup("fiExl");
	vcFiExl.openFileChooser();
}


/*
 * "내보내기" 버튼(btnExp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpClick(/* cpr.events.CMouseEvent */ e){
	var vcSubExp = app.lookup("subExp");
	
	var vcGrdExl = app.lookup("grdExl");
	var voExpData = vcGrdExl.getExportData({
		exceptStyle: false,
		applyFormat: true,
		useFormat: true,
		rowDataHandler: function(/* {value:String,style:#css-color}[] */datas, /* Number */ rowIndex){
			datas.forEach(function(each){
				each.style["border-top-width"] = "1px";
				each.style["border-right-width"] = "1px";
				each.style["border-bottom-width"] = "1px";
				each.style["border-left-width"] = "1px";
				each.style["border-top-style"] = "solid";
				each.style["border-right-style"] = "solid";
				each.style["border-bottom-style"] = "solid";
				each.style["border-left-style"] = "solid";
				each.style["border-top-color"] = "#babfc7";
				each.style["border-right-color"] = "#babfc7";
				each.style["border-bottom-color"] = "#babfc7";
				each.style["border-left-color"] = "#babfc7";
				
				if (each.style["color"] == null){ // text color exception
					each.style["color"] = "#4e5154";
				}
				
				if (rowIndex == 0){ // Header
					each.style["background-color"] = "#edf1f4";
					each.style["color"] = "#4e5154";
					each.style["font-weight"] = "500";
					each.style["text-align"] = "center";
				}
				
				if (rowIndex > vcGrdExl.getRowCount()){ // footer
					each.style["background-color"] = "#F6F8FA";
					each.style["font-weight"] = "500";
					each.style["text-align"] = "right";
				}
			});
		}
	});
	
	/* 시트 이름 설정 */
	voExpData["name"] = "stock";
	
	/*
	 * if (metadata != null) {
	 * 	exportData["metadata"] = {};
	 * 	if (metadata["password"] != null) {
	 * 		exportData["metadata"]["password"] = metadata["password"];
	 * 	}
	 * 	if (metadata["printPageOrientation"] != null) {
	 * 		exportData["metadata"]["printPageOrientation"] = metadata["printPageOrientation"];
	 * 	}
	 * }
	 */
	
	vcSubExp.setRequestObject(voExpData);
	vcSubExp.send();
}


/*
 * "초기화" 버튼(btnRst)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRstClick(/* cpr.events.CMouseEvent */ e){
	app.lookup("grdExl").dataSet.clearData();
}


/*
 * "초기화" 버튼(btnCpRst)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCpRstClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCpRst = e.control;
	
	app.lookup("grdCpPst").dataSet.clearData();
}


/*
 * "재조회" 버튼(btnRSch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRSchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRSch = e.control;
	
	app.lookup("subStockList").send().then(function(input){
		app.lookup("grdCpPst").redraw();
	});
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbCpPstSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbCpPst = e.control;
	
}


/*
 * 그리드에서 copy 이벤트 발생 시 호출.
 * Grid의 선택된 요소를 ctrl + c 로 복사했을 때 발생하는 이벤트.
 */
function onGrdCpPstCopy(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCpPst = e.control;
	
	var vsCpPstVal = app.lookup("cmbCpPst").value;

	if (vsCpPstVal == "office"){
		var selUnit = grdCpPst.selectionUnit;
		
		e.preventDefault();
		
		copyHtml(grdCpPst, selUnit, e.data);
	}
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFiExlValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fiExl = e.control;
	
	var voFile = fiExl.file;
	
	var vcSubImp = app.lookup("subImp");
	vcSubImp.setFileParameters("dsStockExl", voFile);
	vcSubImp.addEventListenerOnce("submit-done", function(e){
		app.lookup("grdExl").redraw();
	});
	vcSubImp.send();
}
