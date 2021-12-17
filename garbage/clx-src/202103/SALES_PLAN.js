/************************************************
 * SALES_PLAN.js
 * Created at 2021. 2. 18. 오후 3:26:33.
 *
 * @author ryu
 ************************************************/
cpr.core.AppConfig.INSTANCE.setControlValue("container", {
	"useCustomScrollbar" : true
});
/*
 * TODO
 * 오늘날짜 막대 칠하기 -> 반응형 막대로 칠하기
 * 막대 크기 지정하기(기간차로, 원래 로직대로)
 * 5주차 있는지없는지 체크하기
 * udc화 하기?
 */
var st;
//오늘날짜
var vsNowDate = moment("20210113","YYYYMMDD");

//간트 한줄별 height 
var vnRowHeight = 30;

/**
 * 지정한 개수만큼 앞에 자동으로 0을 채워넣습니다.
 * @param {Number} width
 * @param {String} str
 */
function fillZero(width, str){
    return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;//남는 길이만큼 0으로 채움
}

/**
 * 주차별 눈금을 긋는 함수입니다.
 */
function gridLineDraw() {
	var vcGrpDemoPlan = app.lookup("grpDemoPlan");
	var vcGrpzone2 = app.lookup("grpZone2");
	var vcOptWeek = app.lookup("optWeek1");
	
	var vcLineGrp = new cpr.controls.Container();
	var voLineLayout = new cpr.controls.layouts.FormLayout();
	voLineLayout.setRows(["1fr"]);
	voLineLayout.setColumns(vcGrpzone2.getLayout().getColumns());
	voLineLayout.horizontalSpacing = "0px";
	voLineLayout.verticalSpacing = "0px";
	
	voLineLayout.verticalSeparatorWidth = 1;
	vcLineGrp.setLayout(voLineLayout);
	vcGrpDemoPlan.floatControl(vcLineGrp,{
		"top" : vcOptWeek.getOffsetRect().bottom+1+"px",
		"left" : vcOptWeek.getActualRect().left - vcGrpDemoPlan.getActualRect().left +"px",
		"right" : "1px",
		"bottom" : "0px"
	});
}

/**
 * 당일을 표시하는 박스를 그리는 함수입니다.
 */
function todayDraw(){
	var vcOptYear = app.lookup("optYear");
	var vcMonth = app.lookup("optMonth");
	var vsNowYear = vsNowDate.format("YYYY");
	var vsNowMonth = vsNowDate.format("M");
	var vcGrpzone2 = app.lookup("grpZone2");
	if(vcMonth.value == vsNowMonth && vcOptYear.value == vsNowYear)  {
		
		vcMonth.style.addClass("calendar-current-date");
		var vsWeek = vsNowDate.week();
		/** @type cpr.controls.UIControl */
		var vcWeek = app.lookup("optWeek"+vsWeek);
		vcWeek.style.addClass("calendar-current-date");
		
		var voWeekRect = vcWeek.getActualRect();
		var vnOnedayWidth = voWeekRect.width/7;
		
		var vnDay = vsNowDate.day();
		var vcOptDayLiner = new cpr.controls.Output();
		vcOptDayLiner.style.addClass("current-date");
			app.lookup("grpDemoPlan").floatControl(vcOptDayLiner,{
		"left" : voWeekRect.bottomLeft.x-app.lookup("grpDemoPlan").getActualRect().left + vnOnedayWidth*vnDay +"px",
		"top" : voWeekRect.bottomLeft.y-app.lookup("grpDemoPlan").getActualRect().top +"px",
		"bottom" : "0px",
		"width" : vnOnedayWidth+"px"
	});
		
	} else {
		
		vcGrpzone2.getAllRecursiveChildren().forEach(function(each){
			each.style.removeClass("calendar-current-date");
		});
	}

	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		var end = moment().valueOf() - st;
		
		console.log(moment.duration(end));
	});
}

/**
 * 각 월별 주차당 일 수를 계산하여, 각 주차별 크기 비율을 다르게 그려주는 함수입니다.
 */
function weekDraw(){
	var vsYear = app.lookup("optYear").value;
	var vsMonth = fillZero(2, app.lookup("optMonth").value);
	
	var voMonthStart = moment(vsYear+vsMonth,"YYYYMM").startOf('month');
	var vnStartDay = voMonthStart.day();
	var voMonthEnd = moment(vsYear+vsMonth,"YYYYMM").endOf("month");
	var vnEndDay = voMonthEnd.day();
	var vnFirstweekdayLen = 7-vnStartDay;
	var vnEndweekdayLen = vnEndDay +1;
	
	var vnDayDistance = voMonthEnd.diff(voMonthStart,"days")+1;
	var vnMiddleDays = vnDayDistance - vnFirstweekdayLen - vnEndweekdayLen;
	var vnMiddleWeekLength = vnMiddleDays/7;
	
	
	var vcGrpZone2 = app.lookup("grpZone2");
	var voWeekLayout = vcGrpZone2.getLayout();
	
	voWeekLayout.setColumns([vnFirstweekdayLen+"fr"]);
	
	if(vnMiddleWeekLength >3) {
		vnMiddleWeekLength = 3;
		vnEndweekdayLen += 7;
	}
	for(var i = 0 ; i < vnMiddleWeekLength ; i++) {
		
		voWeekLayout.insertColumns(["7fr"]);
	}
	voWeekLayout.insertColumns([vnEndweekdayLen+"fr"]);
	
	vcGrpZone2.setLayout(voWeekLayout);
	
}

/**
 * 데모 계획 차트를 그립니다.
 */
function demoPlanDraw(){
	
	var vsYear = app.lookup("optYear").value;
	var vsMonth = fillZero(2, app.lookup("optMonth").value);
					
	var vcDsDemo = app.lookup("dsDemo");
	var vaColNms = vcDsDemo.getColumnNames();
	var vcContFirst = app.lookup("grpDemoPlan");
	var voParentContForm = vcContFirst.getLayout();
	var vcMonth = app.lookup("optMonth");
	var vcContSecond = app.lookup("grpSecond");
	var vaDemoSt = vcDsDemo.getColumnData("DEMO_ST");
	
	var vaFloated = vcContFirst.getChildren().filter(function(each){
		return each.isFloated();
	}).forEach(function(each){
		each.dispose();
	});
	
	
	var vnPlan  = vaDemoSt.filter(function(each){
		return each == "1";
	}).length;
	var vnComplete =  vaDemoSt.filter(function(each){
		return each == "2";
	}).length;
	var vnDemo =  vaDemoSt.filter(function(each){
		return each == "3";
	}).length;
	
	app.lookup("optTotal").value ="계획 "+vnPlan+"건 | 완료 "+vnComplete+"건 | 데모 중 "+vnDemo+"건"
	var vaDemoNm = _.uniq(vcDsDemo.getColumnData("LS_CD_NM"));
	while(voParentContForm.getRows().length > 1) {
		
		voParentContForm.removeRows([voParentContForm.getRows().length-1]);
	}
	vcContSecond.removeAllChildren();

	vaDemoNm.forEach(function(each,demoIdx){
		var vaAllRow = vcDsDemo.findAllRow("LS_CD_NM =='"+each+"'");
		
		var vnAllRowLength = vaAllRow.length;
		var rows = [];
		
		for(var i = 0 ; i < vnAllRowLength ; i++){
			rows.push(vnRowHeight+"px");
		}
		if(vnAllRowLength > 5) {
			vnAllRowLength = 5;
		}
		voParentContForm.insertRows([vnRowHeight*vnAllRowLength+1+"px"]);
		
		
		var vcGrpZone1 = app.lookup("grpZone1");
		//1구역 2구역 분리기
		var vcGrpZoneDivider = new cpr.controls.Container();
		var voDivideForm = new cpr.controls.layouts.FormLayout();
		var vnFIrstColWidth = vcGrpZone1.getActualRect().width+1
		voDivideForm.setColumns([vnFIrstColWidth+"px","1fr"]);
		voDivideForm.setRows(["1fr"]);
		voDivideForm.horizontalSpacing = "0px";
		voDivideForm.verticalSpacing = "0px";
		vcGrpZoneDivider.setLayout(voDivideForm);
		vcContFirst.addChild(vcGrpZoneDivider, {
			rowIndex : voParentContForm.getRows().length-1,
			colIndex : 0
		});
		
		
		//1구역 레이아웃 만들기
		var vcFirstZone = new cpr.controls.Container();
		var voFirstForm = new cpr.controls.layouts.FormLayout();
		voFirstForm.setColumns(vcGrpZone1.getLayout().getColumns());
		voFirstForm.setRows(rows);
		voFirstForm.horizontalSpacing = "0px";
		voFirstForm.verticalSpacing = "0px";
		vcFirstZone.setLayout(voFirstForm);
//		vcFirstZone.style.css("border", "solid 1px lightgray");
		vcFirstZone.style.setClasses("border-bottom border-right border-left");
		vcGrpZoneDivider.addChild(vcFirstZone, {
			rowIndex : 0,
			colIndex : 0
		});
		
		//2구역 레이아웃 추가
		var vcSecondZone = new cpr.controls.Container();
			var voSecondForm = new cpr.controls.layouts.FormLayout();
			voSecondForm.setRows(rows);
			voSecondForm.setColumns(["1fr"]);
			voSecondForm.horizontalSpacing = "0px";
			voSecondForm.verticalSpacing = "0px";
			voSecondForm.scrollable = false;
			vcSecondZone.setLayout(voSecondForm);
			vcGrpZoneDivider.addChild(vcSecondZone, {
				rowIndex : 0,
				colIndex : 1
			});
		
		vcFirstZone.addEventListener("scroll", function(e){
			var ctrl = e.control;
			
			var voRect = ctrl.getViewPortRect();
			
			ctrl.getParent().getLastChild().scrollTo(voRect.left,voRect.top);
		});
			
		//1구역 아이템 추가
		vaAllRow.forEach(function(eachRow,idx){
			
			if(idx == 0) {
				var vcOptDemoNm = new cpr.controls.Output();
				vcOptDemoNm.value = eachRow.getValue("LS_CD_NM");
				vcOptDemoNm.style.css("text-align","center");
				vcFirstZone.addChild(vcOptDemoNm, {
					colIndex : 0,
					rowIndex : 0,
					rowSpan : vaAllRow.length
				});
				
				var vcOptDemoGigan = new cpr.controls.Output();
				vcOptDemoGigan.value = eachRow.getValue("GIGAN")+"일";
				vcOptDemoGigan.style.css("text-align","center");
				vcFirstZone.addChild(vcOptDemoGigan, {
					colIndex : 1,
					rowIndex : 0,
					rowSpan : vaAllRow.length
				});
				
				var vcOptDemoCnt = new cpr.controls.Output();
				vcOptDemoCnt.value = eachRow.getValue("CNT")+"회";
				vcOptDemoCnt.style.css("text-align","center");
				vcFirstZone.addChild(vcOptDemoCnt, {
					colIndex : 2,
					rowIndex : 0,
					rowSpan : vaAllRow.length
				});
				
				if(demoIdx%2 == 1) {
						vcFirstZone.getLayout().setUseColumnShade(0,true);
						vcFirstZone.getLayout().setUseColumnShade(1,true);
						vcFirstZone.getLayout().setUseColumnShade(2,true);
					}
			}
			//순번
			var optTurn = new cpr.controls.Output();
			optTurn.value = fillZero(3,(idx+1).toString());
			optTurn.style.css("text-align","center");
			vcFirstZone.addChild(optTurn, {
				colIndex : 3,
				rowIndex : idx
			});
			//출고
			var optIsu = new cpr.controls.Output();
			optIsu.dataType = "date";
			optIsu.format = "M/D";
			optIsu.value = eachRow.getValue("ISU_DAT");
			optIsu.style.css("text-align","center");
			vcFirstZone.addChild(optIsu, {
				colIndex : 4,
				rowIndex : idx
			});
			
			//반납
			var optBan = new cpr.controls.Output();
			optBan.dataType = "date";
			optBan.format = "M/D";
			optBan.value = eachRow.getValue("BAN_DAT");
			optBan.style.css("text-align","center");
			vcFirstZone.addChild(optBan, {
				colIndex : 5,
				rowIndex : idx
			});
			
			if(idx%2 == 1) {
				vcFirstZone.getLayout().setUseRowShade(idx, true);
				vcSecondZone.getLayout().setUseRowShade(idx, true);
			}
			//여기까지~
			
			//2구역  아이템 만들기
			var vcScheduleCont = new cpr.controls.Container();
			var xy = new cpr.controls.layouts.XYLayout();
			xy.scrollable = false;
			vcScheduleCont.setLayout(xy);
//		
			vcSecondZone.addChild(vcScheduleCont, {
				colIndex : 0,
				rowIndex : idx,
				colSpan :1
			});
//			//여기까지 기본그리기

			var vcDsUser = app.lookup("dsDemo");

				var oneWeekLength = app.lookup("optWeek3").getActualRect().width;
				var oneDayLength = oneWeekLength/7;
				
				var vsStartMonth = eachRow.getValue("FDAT_MM");
				var vsStartWeek = eachRow.getValue("FDAT_CNT");
				var vsDmFdat = eachRow.getValue("DM_FDAT");
				
				var vsEndMonth = eachRow.getValue("TDAT_MM");
				var vsEndWeek = eachRow.getValue("TDAT_CNT");
				var vsDmTdat = eachRow.getValue("DM_TDAT");
				
				var vcOptBar = new cpr.controls.Output();
				
				vcOptBar.value = eachRow.getValue("CUST_NM");
				vcOptBar.ellipsis = true;
				vcOptBar.tooltip = eachRow.getValue("CUST_NM")+" "+eachRow.getValue("DM_FDAT")+" ~ "+eachRow.getValue("DM_TDAT");
				vcOptBar.style.css("font-size","5px");
				var vsColor = eachRow.getValue("DEMO_ST");
				vcOptBar.style.setClasses("badge badge-pill");
				switch(vsColor){
					case "1" :
						vcOptBar.style.addClass("badge-success");
						break;
					case "2" :
						vcOptBar.style.addClass("bg-orange");
						break;
					case "3" :
						vcOptBar.style.addClass("bg-dark-dim");
						break;
					default :
						break;
				}
				vcOptBar.style.css("z-index","10");
				
				var vnLeft = 0;
				var vnWidth = 0;
				if(vsStartMonth != Number(vcMonth.value)) {
				vnLeft = 0;
				} else {
					var start = moment(vsYear + vsMonth, "YYYYMM").startOf('month');
					vnLeft = moment(vsDmFdat).diff(start,"days")*oneDayLength;
					
					}
				
				vnWidth = (moment(vsDmTdat).diff(moment(vsDmFdat),"days")+1)* oneDayLength;
					vcScheduleCont.addChild(vcOptBar, {
						"left" : vnLeft + "px",
						"bottom" : "0px",
						"height" : "16px",
						"width" : vnWidth+"px"
					});
		});
		
		//차트추가
		var newChart = new udc.cmn.DemoChart();
		newChart.chartData = vaAllRow.map(function(eachDataRow){
			return eachDataRow.getRowData();
		});
		newChart.demoNm = each;
		vcContSecond.addChild(newChart, {
			"width" : "48%",
			"height" : "23%",
			"autoSize" : "none"
		});
	});
	//오늘 날짜 줄그어주기랑, 줄긋기 추가하기;
	gridLineDraw();
	todayDraw();
}

/*
 * ">" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var vcDsDemo = app.lookup("dsDemo");
	var vcMonth = app.lookup("optMonth");
	var vcYear = app.lookup("optYear");
	var vsMonth = vcMonth.value;
		
	var vnMonth = 0;
	if(parseInt(vsMonth) <= 11) {
		
		vnMonth = parseInt(vsMonth) + 1;
	} else {
		vcYear.value = Number(vcYear.value) +1;
		vnMonth = 1;
	}
	
//	vcMonth.value = vnMonth < 10 ? "0"+vnMonth : vnMonth.toString();
	vcMonth.value = vnMonth.toString();
	
	app.lookup("subList").send();
}


/*
 * "<" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var vcMonth = app.lookup("optMonth");
	var vcDsDemo = app.lookup("dsDemo");
	var vcYear = app.lookup("optYear");
	var vsMonth = vcMonth.value;
	var vnMonth = 0;
	if(parseInt(vsMonth) >= 2) {
		
		vnMonth = parseInt(vsMonth) - 1;
	} else {
		vcYear.value = Number(vcYear.value) -1;
		vnMonth = 12;
	}
	
//	vcMonth.value = vnMonth < 10 ? "0"+vnMonth : vnMonth.toString();
	vcMonth.value = vnMonth.toString();
	
	app.lookup("subList").send();
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("subList").send();
		st = moment().valueOf();
}


/*
 * "전체일정 조회" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	app.lookup("subList").send();
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSubListBeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	
	var vcOptYear = app.lookup("optYear").value;
	var vcOptMonth = app.lookup("optMonth").value;
	
	var vsStartDate = moment(vcOptYear+vcOptMonth,"YYYYMM").startOf("month").format("YYYYMMDD");
	var vsEndDate = moment(vcOptYear+vcOptMonth,"YYYYMM").endOf("month").format("YYYYMMDD");
	
	var vcDmParam = app.lookup("dmParam");
	
	vcDmParam.setValue("FROM_DATE", vsStartDate);
	vcDmParam.setValue("END_DATE", vsEndDate);
	
	weekDraw();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubListSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;

	demoPlanDraw();
}

/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
	cpr.core.AppConfig.INSTANCE.setControlValue("container", {
		"useCustomScrollbar" : false
	});
}
