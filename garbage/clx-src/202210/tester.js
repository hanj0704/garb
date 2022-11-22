/************************************************
 * tester.js
 * Created at 2022. 10. 6. 오후 5:08:21.
 *
 * @author HANS
 ************************************************/

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrd1RowDblclick(e){
	var grd1 = e.control;
	
	console.log(e);
}


/*
 * 그리드에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrd1Click(e){
	var grd1 = e.control;
//	console.log();
	var dbl = new cpr.events.CGridMouseEvent("row-dblclick",{
		rowIndex : e.targetObject.contentRowIndex
	});
	grd1.dispatchEvent(dbl);
}
