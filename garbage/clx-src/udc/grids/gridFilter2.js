/************************************************
 * gridFIlter2.js
 * Created at 2020. 10. 12. 오전 9:45:25.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	
	/** @type cpr.controls.UIControl */
	var vcGrid = app.getAppProperty("gridControl");
	
	if (vcGrid instanceof cpr.controls.Grid) {
		
		var voColumnLayout = vcGrid.getColumnLayout();
		vcGrid.setColumnLayout(voColumnLayout);
		
		var voHeader = voColumnLayout.header;
		
		var vaColName = [];
		voHeader.forEach(function(each) {
			
			vaColName.push(vcGrid.header.getColumn(each.cellIndex).getText());
			
		});
		var vaGridData = [];
		var vsGridWidth = vcGrid.getActualRect().width;
		var abc = 0;
		voColumnLayout.columnLayout.forEach(function(each, idx) {
			if (each.visible) {
				
				abc += each.width;
			}
		});
		vaColName.forEach(function(each, idx) {
			
			var voTempData = {
				"COL_NM": each,
				"width": 0,
				"visible": "",
				"autoFit": "",
				"CELL_IDX": 0
			};
			
			var voColLayout = voColumnLayout.columnLayout[idx];
//			var resultWidth;
//			if (voColLayout.visible) {
//				if (voColLayout.autoFit) {
//					resultWidth = Math.round(vsGridWidth * voColLayout.width / abc);
//				} else {
//					resultWidth = voColLayout.width;
//				}
//			} else {
//				resultWidth = 0;
//			}
			voTempData.width = voColLayout.width;
			voTempData.visible = voColLayout.visible;
			voTempData.autoFit = voColLayout.autoFit;
			voTempData.CELL_IDX = voColumnLayout.header[idx].cellIndex;
			vaGridData.push(voTempData);
		});
		
		app.lookup("ds1").build(vaGridData);
		
		vcGrid.redraw();
	}
	
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.dispatchEvent(new cpr.events.CUIEvent("btnCl"));
	app.close();
}

/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	/** @type cpr.controls.Grid */
	var vcGrid = app.getAppProperty("gridControl");
	
	var vcDs = app.lookup("ds1");
	
	var voColLayout = vcGrid.getColumnLayout();
	
	var vnAllWidth = 0;
	
	voColLayout.columnLayout.forEach(function(each) {
		
		vnAllWidth += each.width;
	});
	
	var vnGridWidthRect = vcGrid.getActualRect().width;
	var a = voColLayout.columnLayout;
	voColLayout.columnLayout = [];
	var vaVisibles = [];
	var vsVisi = "";
	vcDs.getRowDataRanged().forEach(function(each, idx) {
		
//		var realWidth = each.autoFit == "true" ? Math.round(each.width * (vnAllWidth - a[idx].width) / (vnGridWidthRect - each.width)) : each.width;
//		a[idx].width = realWidth;
		var colLayout = {
			width: each.width,
			visible: each.visible == "true" ? true : false,
			autoFit: each.autoFit == "true" ? true : false
		}
		vaVisibles.push({
			"visi": each.visible,
			"idxs": each.CELL_IDX
		});
		if (each.autoFit == "true") {
			vsVisi += each.CELL_IDX + ",";
		}
		voColLayout.columnLayout.push(colLayout);
	});
	
	vcGrid.setColumnLayout(voColLayout);
	
	vaVisibles.forEach(function(each) {
		
		vcGrid.columnVisible(each.idxs, each.visi == "true" ? true : false);
	});
	
	vsVisi = vsVisi.substring(0, vsVisi.length - 1);
	vcGrid.autoFit = vsVisi;
	console.log()
	vcGrid.redraw();
	app.dispatchEvent(new cpr.events.CUIEvent("btnCl"));
	app.close();
}