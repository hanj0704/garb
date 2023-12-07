/************************************************
 * @파일명 : udcCmnGridMoveRow.js
 * @컴포넌트기능 :  
 * @작성자 : You Minsang
 * @작성일자: 2022. 10. 5. 오전 10:39:57
 * @수정로그 : 
 * [일자, 수정자] 내용 
 ************************************************/

var mcSourceGrid = null;
var mcTargetGrid = null;

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/**
 * From 그리드에 선택된(체크박스가 체크된) 로우 데이터를 To 그리드로 복사한다.
 * @param {cpr.controls.UIControl} pcFromGrid From 그리드
 * @param {cpr.controls.UIControl} pcToGrid To 그리드
 * @return void
 */
function moveRows(pcFromGrid, pcToGrid) {
	
	if (!pcFromGrid || !pcToGrid) return;
	
	/** @type cpr.controls.Grid*/
	var vcFromGrid = pcFromGrid;
	/** @type cpr.controls.Grid*/
	var vcToGrid = pcToGrid;
	var vaValidateRowIdx = [];
	var vaLeftGridColNm = [];
	var voAddRowData = {};
	var voDsFromGrid;
	var voDsToGrid;
	var vaChkRowIdx;
	var vnLeftGridColCnt;
	var i;
	var vsColTy;
	var vsColNm;
	var voAddRowData = {};
	var vnChkRowIdx;
	var voSelectRowData;
	var voDuplicateRow;
//	debugger;
	voDsFromGrid = vcFromGrid.dataSet;
	voDsToGrid = vcToGrid.dataSet;
	vaChkRowIdx = vcFromGrid.getCheckRowIndices();
	vnLeftGridColCnt = vcFromGrid.columnCount;
	
	var vbIsRemove = app.getAppProperty("isRemove");
	var vbAllowDuplicate = app.getAppProperty("allowDuplicate");
	var vsDuplicatekeys = app.getAppProperty("duplicateKeys");
	
	var vaDuplicateKeys = [];
	
	if (!ValueUtil.isNull(vsDuplicatekeys)) {
		vaDuplicateKeys = vsDuplicatekeys.split(",");
	}
	
	// 중복을 허용하지 않는데 중복 판단 키 값이 없을 경우 error 처리
	if (!vbAllowDuplicate && vaDuplicateKeys.length < 1) {
		console.error("duplicateKeys is not defined");
		return;
	}
	
	for (i = 0; i < vnLeftGridColCnt; i++) {
		
		if (!ValueUtil.isNull(vcFromGrid.detail.getColumn(i))) {
			vsColTy = vcFromGrid.detail.getColumn(i).columnType;
			vsColNm = vcFromGrid.detail.getColumn(i).columnName;
			
			if (vsColTy === "normal") vaLeftGridColNm.push(vsColNm);
		}
	}
	
	
	// from -> to 그리드 데이터 삽입
	for (i = 0; i < vaChkRowIdx.length; i++) {
		vnChkRowIdx = vaChkRowIdx[i];
		voAddRowData = voDsFromGrid.getRowData(vnChkRowIdx);
		var vsCondition = "";
		
		if (!vbAllowDuplicate) { // 중복값 체크
			vaDuplicateKeys.forEach(function(key, idx) {				
				var vsColNm = key.trim();
				var vsValue = voAddRowData[vsColNm];
				
				if (idx == (vaDuplicateKeys.length - 1)) {
					vsCondition += vsColNm + "=='" + vsValue + "'";
				} else {
					vsCondition += vsColNm + "=='" + vsValue + "'&&";
				}
			});
			voDuplicateRow = voDsToGrid.findFirstRow(vsCondition);
			if (voDuplicateRow === null) { // 중복되지 않았을 경우					
				vaValidateRowIdx.push(vnChkRowIdx);
			}
			
		} else {
			vaValidateRowIdx = vaChkRowIdx;
		}
		voDsToGrid.addRowData(voAddRowData);
	}
	
//	vcFromGrid.deleteRow(vaChkRowIdx);
	
	//  이동한 from 그리드 로우 데이터 삭제
//	if (vbIsRemove) {
//		vaValidateRowIdx.forEach(function(each, idx) {
//			each = each - idx;
//			voDsFromGrid.deleteRow(each);
//		});
//	}
//	setGrdRowCnt();
}




/**
 * From 그리드에 선택된(체크박스가 체크된) 로우 데이터를 To 그리드로 복사한다.
 * @param {cpr.controls.UIControl} pcTargetGrid 타겟 그리드
 * @return void
 */
function deletRow(pcTargetGrid) {
	
	/** @type cpr.controls.Grid*/
	var vcTargetGrid = pcTargetGrid;
	var voDsTargetGrid = vcTargetGrid.dataSet;
	var vaChkRowIdx = vcTargetGrid.getCheckRowIndices();
	
	vaChkRowIdx.forEach(function(each, idx) {
		each = each - idx;
		voDsTargetGrid.deleteRow(each);
	});
}

function setGrdRowCnt(){
	
	var hostAppIns = app.getHostAppInstance();
	var vcSourceGrdId = app.getAppProperty("sourceGrid");
	var vcTargetGrdId = app.getAppProperty("targetGrid");
		
	hostAppIns.getContainer().getAllRecursiveChildren().forEach(function(ctrl){
		
		if(ctrl.type == "udc.com.udcComGridTitle"){
			var vcCtrlProp = ctrl.getAppProperty("ctrl");
			
			if(vcCtrlProp.id == vcSourceGrdId.id || vcCtrlProp.id == vcTargetGrdId.id){						
				ctrl.setAppProperty("rowCount", vcCtrlProp.dataSet.getRowCount());
				ctrl.redraw();
			}
		}
	});	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	
	var vcSourceGrid = app.getAppProperty("sourceGrid");
	var vcTargerGrid = app.getAppProperty("targetGrid");
	
	if (vcSourceGrid) mcSourceGrid = vcSourceGrid;
	if (vcTargerGrid) mcTargetGrid = vcTargerGrid;
}

/*
 * "→" 버튼(btnMoveRight)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveRightClick(e) {
	var btnMoveRight = e.control;
	
	moveRows(mcSourceGrid, mcTargetGrid);
				
	var event = new cpr.events.CMouseEvent("right-bottom-arrow-click");
	app.dispatchEvent(event);
}



/*
 * "←" 버튼(btnMoveLeft)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveLeftClick(e) {
	var btnMoveLeft = e.control;
	
	if (app.getAppProperty("isTargetDeletRow")) {
		deletRow(mcTargetGrid);
	} else {
		moveRows(mcTargetGrid, mcSourceGrid);
	}
	
	var event = new cpr.events.CMouseEvent("left-top-arrow-click");
	app.dispatchEvent(event);
}

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(e) {
	
	if (e.property == "isVerticalArrow") {
		if (!e.newValue) {
			
			app.getContainer().updateConstraint(app.lookup("grpArrow"), {
				"height": "30px",
				"top": "calc(50% - 15px)"
			});
			
			app.lookup("btnMoveRight").value = "↓";
			app.lookup("btnMoveLeft").value = "↑";
		}
	}
}