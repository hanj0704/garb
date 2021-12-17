/************************************************
 * testIn0519.js
 * Created at 2020. 5. 19. 오후 7:27:34.
 *
 * @author HANS
 ************************************************/

var rowDatas = [];

//var util = createCommonUtil();
/*
 * 그리드에서 copy 이벤트 발생 시 호출.
 * Grid의 선택된 요소를 ctrl + c 로 복사했을 때 발생하는 이벤트.
 */
function onGrd1Copy(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var voResultData = [];
	
	grd1.getSelectedRows().forEach(function(each){
		voResultData.push(each.getRowData());
	});
	rowDatas = voResultData;
}

/*
 * 그리드에서 before-paste 이벤트 발생 시 호출.
 * Grid에서 ctrl + v 로 붙여넣기시 붙여넣기 전에 발생하는 이벤트.
 */
function onGrd1BeforePaste(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	e.preventDefault();
		var targetGrid = app.lookup("grd1");
	var vnRowIndex = targetGrid.getSelectedRowIndex();
					var voRowData = targetGrid.getRow(vnRowIndex).getRowData()["playTime24"];
					rowDatas.forEach(function(each,idx){
//						util.Grid.insertRow(app, "grdSch", 0, vnRowIndex+idx, each);
						app.lookup("grd1").insertRowData(vnRowIndex+idx,true,each);
					});
					
					targetGrid.selectRows(vnRowIndex);
}
