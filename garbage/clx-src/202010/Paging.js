/************************************************
 * Paging.js
 * Created at 2019. 8. 9. 오전 10:48:49.
 *
 * @author HANS
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	app.lookup("subList").send();
}


/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndex = e.control;
	
	var dmPage = app.lookup("dmPage");
	
	//페이지 인덱서에서 사용자가 page index를 변경할 경우 인덱스에 맞는 새 데이터를 내려받도록 데이터 맵에 페이지 인덱스를 넣어서 서브미션을 전송합니다.
	dmPage.setValue("pageIdx", e.newSelection);
	app.lookup("subList").send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	//서브미션으로 데이터 통신이 끝났을 경우, 내려온 totCnt, rowSize를 이용하여 페이지 인덱서를 그려야 하므로 페이지 인덱서를 다시그려줍니다.
	app.lookup("pageIndex").redraw();
	
}


/*
 * 데이터셋에서 sort 이벤트 발생 시 호출.
 * 데이터가 정렬되는 경우 발생하는 이벤트. 발생 메소드 : setSort, setSortExpr, clearSort
 */
function onDs1Sort(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	var vcGrid = app.lookup("grd1");
	var dmPage = app.lookup("dmPage");
	
	//그리드 헤더에서 sortCondition 을 지정해줄 때, 오름차순인지 내림차순인지에 대한 값을 가져옵니다.
	var vsSortCondition = vcGrid.getSort();
	vsSortCondition = vsSortCondition.split(" ")[1];
	
	console.log(vsSortCondition);
	if(vsSortCondition == "desc") {
		//내림차순일 경우 쿼리에서 desc를 사용하기 위해 데이터맵에 입력해줍니다. 
		dmPage.setValue("sortCondition", "desc");
		
	} else {
		//오름차순일 경우 쿼리에서 asc를 사용하기 위해 데이터맵에 입력해줍니다.
		dmPage.setValue("sortCondition", "asc");
	}
	
	//정렬 조건을 지정하고 서브미션을 전송합니다.
	app.lookup("subList").send();
}
