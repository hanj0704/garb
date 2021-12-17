/************************************************
 * gridFilter.js
 * Created at 2020. 9. 24. 오후 4:18:41.
 *
 * @author csj
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

	var ds1 = app.lookup("ds1");
	
	/** @type cpr.controls.Grid */
	var grid = app.getAppProperty("grid");
	
	//컬럼 실제 width값
	var columnWidth = grid.header.getColumn(0).context.columnLayout 
	
	for(var i = 0; i < grid.header.cellCount; i++){
		app.lookup("ds1").addRowData({
			headerNm : grid.header.getColumn(i).text,
			columnWidth : columnWidth[i].width
		})
		
		//보이는 헤더컬럼 체크를 한다.
		if(grid.header.getColumn(i).visible == true){
			app.lookup("grd1").setCheckRowIndex(i, true);
		}
	}
}


/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	app.dispatchEvent(new cpr.events.CUIEvent("cnclClick"));
	app.close();
}


/*
 * "확인" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** @type cpr.controls.Grid */
	var grid = app.getAppProperty("grid");
	
	var vaSelectIndex = app.lookup("grd1").getCheckRowIndices();
	var cnt = app.lookup("ds1").getRowCount();
	for(var i=0;i<cnt;i++){
		//모든 컬럼숨김
		grid.header.getColumn(i).visible = false;
		for(var j=0;j<vaSelectIndex.length;j++){
			//체크된 컬럼만 보임
			if(i == vaSelectIndex[j]){
				grid.header.getColumn(i).visible = true;
				grid.header.getColumn(0).context.columnLayout[i].width = parseInt(app.lookup("ds1").getValue(i, "columnWidth"));
			}
		}
	}
	grid.redraw();
	
	app.dispatchEvent(new cpr.events.CUIEvent("okClick"));
	app.close();
}
