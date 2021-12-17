/************************************************
 * gridRow.js
 * Created at 2021. 9. 23. 오후 6:25:26.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("grd1").getViewingStartRowIndex();
}


/*
 * 그리드에서 scroll 이벤트 발생 시 호출.
 * 그리드 디테일 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrd1Scroll(/* cpr.events.CScrollEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	app.lookup("nbe1").redraw();
}


/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onNbe1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.NumberEditor
	 */
	var nbe1 = e.control;
	console.log(e.newValue);
}


/*
 * 넘버 에디터에서 before-value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 value-change가 발생합니다.
 */
function onNbe1BeforeValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.NumberEditor
	 */
	var nbe1 = e.control;
	
	var ain = e.newValue-1;
	console.log(ain);
	var vcGrid = app.lookup("grd1");
	
	var heigh = vcGrid.detail.getRowHeight(0);
	console.log(heigh);
	vcGrid.scrollTo(0, ain*heigh);
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
}


/*
 * "unfiltered" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	var ds = app.lookup("ds2");
	ds.setSort("column1 asc, column2 asc");
	var ar = app.lookup("ds2").getUnfilteredDistinctValues("column1", function(dataRow){return true},function(){
		return "column1 asc"
	});
	console.log(ar);
	
}


/*
 * "row" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	var ds = app.lookup("ds2");
	
	var rows = ds.getUnfilteredDistinctValues("column1", function(dataRow){return true;},"column1");

	console.log(rows);
}


/*
 * "findROw" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var ds = app.lookup("ds2");
	
//	var grd = app.lookup("grd1");
//	/** @type cpr.data.DataRow[]*/
//	var rows = grd.getUnfilteredRows("column1", "asc");
//	console.log(rows);
//	rows.forEach(function(each){
//		console.log(each);
//	});
}
