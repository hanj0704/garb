/************************************************
 * GridWidthConfigurer.js
 * Created at 2020. 10. 5. 오전 8:52:38.
 *
 * @author HANS
 ************************************************/
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcGrid = app.lookup("grd1");
	
//	var a = 100;
//	vcGrid.header.getColumn(0).context.columnLayout.forEach(function(each){
//		
//		each.width = a;
//		a += 10;
//	});
//	
	//TODO
	/*
	 * 그리드에서 
	 */
	
	var a = vcGrid.getColumnLayout();
	var width = 100;
//	a.columnLayout.forEach(function(each){
//		each.width = width;
//		width+= 15;
//	});
	vcGrid.setColumnLayout(a);
	vcGrid.redraw();
}

/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 */
function checkGridHeadMove(pcGrid){
	
	
}

/*
 * 그리드에서 mouseup 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 뗄 때 발생하는 이벤트.
 */
function onGrd1Mouseup(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	checkGridHeadMove(grd1);
}


/*
 * 그리드에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onGrd1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	
//	if(e.targetObject.relativeTargetName == "header")
	var vnColLen = grd1.columnCount;
	
//	for ( var i = 0 ; i <vnColLen ; i++) {
//		
//		console.log(grd1.header.getColumn(i).targetColumnName);
//	}
	
//	console.log(grd1.getRow(1).getRowData());
	var a = grd1.getExportData({
		exceptStyle : true,
		applyFormat : true
	});
	
	var headerArray = [];
	setTimeout(function(){
		grd1.forEachOfGridCells(function(GridCellInfo){
			GridCellInfo.filter(function(each){
				return each.region =="header";
			}).forEach(function(eachs){
				headerArray.push(eachs.columnName);
			});
		});
//			console.log(headerArray);
	}, 200);
	

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
	
	var vcGrid = app.lookup("grd1");
		var voColumnLayout = vcGrid.getColumnLayout();
		
		vcGrid.setColumnLayout(voColumnLayout);
		
		console.log(voColumnLayout);
//		var voHeader = voColumnLayout.header;
//		
//		var vaColName = [];
//		voHeader.forEach(function(each){
//			
//			vaColName.push(vcGrid.header.getColumn(each.cellIndex).getText());
//		});
//		
//		console.log(vaColName);
}
