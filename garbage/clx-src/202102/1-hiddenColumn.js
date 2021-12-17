/************************************************
 * 1-hiddenColumn.js
 * Created at 2019. 6. 21. 오후 5:00:19.
 *
 * @author HANS
 ************************************************/
var util = createUtil(app);


exports.getAllData = function() {
	return util.getAllData("ds1");
}

exports.getAllStatus = function() {
	return util.getAllStatus("grd1", "ds1");

}

exports.getAllSort = function() {

	return util.getAllSort("grd1");
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {

	var hostApp = app.getHostAppInstance();

	if (!hostApp && sessionStorage.length > 0) {
		util.setDataStatus("grd1", "ds1");
	}
	
	console.log(cpr.core.Platform.INSTANCE.getParameter("param"));
	cpr.core.Platform.INSTANCE.initParameter({"param" : "secondValue"});


}

/*
 * 그리드에서 copy 이벤트 발생 시 호출.
 * Grid의 선택된 요소를 ctrl + c 로 복사했을 때 발생하는 이벤트.
 */
function onGrd1Copy( /* cpr.events.CGridEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	console.log("lol~");
	var vcDs = app.lookup("ds1");
	var vcGrid = app.lookup("grd1");
	var vsCheckVisi = true;

	var CellIndices = vcGrid.getSelectedCellIndices();
	var startCellIndex = CellIndices[0].cellIndex;
	var endCellIndex = CellIndices[CellIndices.length - 1].cellIndex;
	var startRowIndex = CellIndices[0].rowIndex;
	var endRowIndex = CellIndices[CellIndices.length - 1].rowIndex;

	var copyData = "";

	var checkIndex = startCellIndex;
	for (checkIndex; checkIndex <= endCellIndex; checkIndex++) {

		if (vcGrid.header.getColumn(checkIndex).visible == false) {

			vsCheckVisi = false;

			break;
		}
	}
	if (!vsCheckVisi) {
   		
   		    copyData = clipboardCopy(startRowIndex, endRowIndex, CellIndices, vcGrid, checkIndex);
	}
	
		e.data = copyData;	
}

function clipboardCopy(startRowIndex, endRowIndex, CellIndices, vcGrid, checkIndex) {
	for (var i = startRowIndex; i <= endRowIndex; i++) {

		CellIndices.push({
			rowIndex: i,
			cellIndex: checkIndex
		});
	}

	CellIndices.sort(function(a, b) {
		return a.rowIndex - b.rowIndex || a.cellIndex - b.cellIndex;
	});


	var copyData = "";

	for (var i = 0; i < CellIndices.length; i++) {

		copyData = copyData + vcGrid.getCellValue(CellIndices[i].rowIndex, CellIndices[i].cellIndex);

		if (i < CellIndices.length - 1) {

			if (CellIndices[i].rowIndex == CellIndices[i + 1].rowIndex) {

				copyData = copyData + "\t";
			} else {

				copyData = copyData + "\n";
			}
		}
	}
	return copyData;
}

