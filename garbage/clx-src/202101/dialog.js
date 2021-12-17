/************************************************
 * grid.js
 * Created at 2020. 4. 17. 오후 4:11:15.
 *
 * @author daye
 ************************************************/

/**
 * 조회로직
 */
function doList() {
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var initValue = app.getHostProperty("initValue");
		
	if(initValue) {
		// initValue는 JSON 형태이므로 key값을 통해 value를 받을 수 있습니다
		var vsIpbSrh = initValue["search"];
		app.lookup("dmParam").setValue("search", vsIpbSrh);
		app.lookup("ipb1").redraw();
		
		/** @type cpr.data.DataSet */
		var voData = initValue["data"];
		voData.copyToDataSet(app.lookup("ds2"));
		
		// TODO 자식 앱인스턴스에서 부모창의 앱인스턴스에 있는 컨트롤을 가져올 수 있습니다.
		var voHostAppIns = app.getHost().getAppInstance(); // 부모 앱인스턴스
		var voAllChildren = voHostAppIns.getContainer().getAllRecursiveChildren();
		var voDataCmp = voHostAppIns.getAllDataControls();
		
		doList();
	}
}


/*
 * "닫기" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	closeDialog();
}


/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrd1RowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	closeDialog();
}


/**
 * 다이얼로그를 닫고 returnValue를 전달합니다.
 * returnValue는 단일 또는 JSON 형태로 전달할 수 있습니다.
 */	
function closeDialog() {
	var vcGrid = app.lookup("grd1");
	var vnSelectedRowIndex = vcGrid.getSelectedRowIndex();
	var voSelection = app.lookup("ds1").getRowData(vnSelectedRowIndex);
	
	/*
	 * 1. Host에 returnValue 바인딩 
	 * 속성명은 바인딩가능한 속성명으로만 작성해야합니다. (바인딩이 안되는 속성일 경우 에러발생)
	 * 아래의 경우에는 returnValue외에도 여러속성을 바인딩 할 수 있습니다.
	 */
//	app.setHostProperty("returnValue", voSelection);
	app.setHostProperty("returnValue", {
		grid : voSelection,
		dm : app.lookup("dmParam").getDatas()
	});
	app.close();

	/*
	 * 2. 닫을 때 returnValue 설정
	 * 아래의 경우는 returnValue만 설정이 가능합니다.
	 */
//	app.close(voSelection);
//	app.close({
//		grid : voSelection,
//		dm : app.lookup("dmParam")
//	});
}

