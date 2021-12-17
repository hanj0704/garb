/************************************************
 * gridTest.js
 * Created at 2021. 8. 19. 오후 5:35:01.
 *
 * @author HANS
 ************************************************/



/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var vnCellIdx = e.cellIndex;
	
	var vaHeaders = grd1.getHeaderCellIndices(vnCellIdx);
	var vaResult = [];
	vaHeaders.forEach(function(each){
		
		var vsText = grd1.header.getColumn(each).text;
		vaResult.push(vsText);
	});
	
	console.log(vaResult);
	console.log(vaResult.join(" > "))
}
