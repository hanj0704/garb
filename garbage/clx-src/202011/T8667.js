/************************************************
 * T8667.js
 * Created at 2020. 11. 27. 오전 11:28:05.
 *
 * @author GEB
 ************************************************/



/*
 * "행 추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){

	app.lookup("dsGrid").addRow();
//	app.lookup("grd1").insertRow(0, false); //그리드1의 0번째 행에 새 행을 추가합니다. (데이터셋에도 추가되게 됩니다.)
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1		= e.control;
	var vcOptSelCh	= app.lookup("optSelCh");
	var vnCellIdx 	= grd1.getCellIndex("code"); // 콤보박스가 위치한 컬럼의 cellIndex
	var vnRowIdx	= e.newSelection[0];//selectionUnit이 row일 때 이벤트 객체로 선택한 rowIndex 반환

	vcOptSelCh.value = grd1.getCellText(vnRowIdx, vnCellIdx);
	vcOptSelCh.redraw();
}


/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 			= e.control;
	var vcOptCellClick	= app.lookup("optCellClick");
	var vnRowIdx		= e.rowIndex; // 클릭한 셀의 rowIndex
	var vnCellIdx		= e.cellIndex; //클릭한 셀의 cellIndex
	
	if(grd1.detail.getControl(vnCellIdx).type == "combobox"){
		//클릭한 셀에 콤보박스가 올려져 있을 때만 콤보박스 text 값이 보여집니다.
		vcOptCellClick.value = grd1.getCellText(vnRowIdx, vnCellIdx);
	} else {
		vcOptCellClick.value = "콤보박스가 아닙니다.";
	}
	vcOptCellClick.redraw();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("sms1").send();
}
