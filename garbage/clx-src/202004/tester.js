/************************************************
 * tester.js
 * Created at 2020. 4. 2. 오전 9:12:01.
 *
 * @author HANS
 ************************************************/

var util = createCommonUtil();

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;

	app.lookup("grd2").filter("pk =='"+grd1.getSelectedRow().getValue("master")+"'");
}


/*
 * "디테일추가" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("grd2").insertRowData(app.lookup("grd2").getRowCount(), false,
	{
		"pk" : app.lookup("grd1").getSelectedRow().getValue("fromDetail")
	});
}


/*
 * "저장" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var grid = app.lookup("grd1");
	var grid2 = app.lookup("grd2");
	var aa = grid2.findAllRow("getStateString()=='I'");
	
	aa.forEach(function(each){
		var bb = each.getValue("detail");
		var rowDt = grid.getSelectedRow().getRowData();
		rowDt.fromDetail = bb;	
	
		grid.insertRowData(grid.getSelectedRow(), false, rowDt);
	});
	
	
	grid.clearSelection();
	grid2.setFilter("pk==''");
	app.lookup("grp1").redraw();
	
}


/*
 * 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	cpr.core.App.load("202003/treechartSample", function(loadedApp){
		
		app.lookup("ea1").app = loadedApp;
		
		loadedApp.createNewInstance();
	});
}
