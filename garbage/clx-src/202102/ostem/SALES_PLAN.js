/************************************************
 * SALES_PLAN.js
 * Created at 2021. 2. 18. 오후 3:26:33.
 *
 * @author ryu
 ************************************************/
/*
 * TODO
 * 주별 선긋기
 * 오늘날짜 막대 칠하기
 * 홀짝 구획 색칠하기
 * 막대 크기 지정하기(기간차로, 원래 로직대로)
 * 5주차 있는지없는지 체크하기
 * <,>버튼으로 월 이동하기
 */
function getWeek(pMoment,psMonth){
	
	var voMonthM = moment(psMonth,"YYYYMMDD");
	var ht = pMoment;
	var wom  = ht.isoWeek() - voMonthM.startOf("month").isoWeek();
	return wom;
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
	
	var vcDsDemo = app.lookup("ds2");
	var vaColNms = vcDsDemo.getColumnNames();
	var vcParen = app.lookup("grp1");
	var voParentContForm = vcParen.getLayout();
	var vaHeaderColumns = voParentContForm.getColumns()
	var year = app.lookup("dti1");
	var yearV = year.value;
	
	var vcMonth = app.lookup("optMonth");
	
	var vaDemoNm = vcDsDemo.getUnfilteredDistinctValues("DEMO_NAME");
	while(voParentContForm.getRows().length > 2) {
		
		voParentContForm.removeRows([voParentContForm.getRows().length-1]);
	}
	
//	var week5 = app.lookup("optWeek5");
//			
//			var hanMonth = yearV + vcMonth.value
//			
//			console.log(hanMonth);
//	var march = moment(hanMonth,"YYYYMMDD");
//	
//	var isCorrect = march.startOf("isoweek").day(4).format("YYYYMM");
//	console.log(isCorrect);
//	var weekStart = null;
//	var weekEnd = null;
//	
//	if(isCorrect != hanMonth) {
//		
//		march.add("1", "week");
////		weekStart = march.startOf("isoweek").week();
//	} 
//	weekStart = march.startOf("isoweek").week();
//	console.log(weekStart);
//	
//	if(moment(hanMonth,"YYYYMMDD").endOf("month").day(4).format("YYYYMM") != hanMonth) {
//		weekEnd = moment(hanMonth,"YYYYMMDD").endOf("month").day(4).subtract(1, "week");
//	} else {
//		
//		weekEnd = moment(hanMonth,"YYYYMMDD").endOf("month").day(4).week();
//	}
//
//	console.log(weekEnd);	
//	var monthWeekLength = weekEnd - weekStart +1;
//	
//	if(monthWeekLength != 5) {
//		voParentContForm.setColumnVisible(vaHeaderColumns.length-1, false);
//	} else {
//		voParentContForm.setColumnVisible(vaHeaderColumns.length-1, true);
//	}

	vaDemoNm.forEach(function(each){
		var allRow = vcDsDemo.findAllRow("DEMO_NAME =='"+each+"'");
		
		var length = allRow.length;
		var rows = [];
		
		for(var i = 0 ; i < length ; i++){
			rows.push("35px");
		}
		var container = new cpr.controls.Container();
		var formL = new cpr.controls.layouts.FormLayout();
		formL.setColumns(vaHeaderColumns);
		formL.setRows(rows);
		formL.horizontalSpacing = "0px";
		formL.verticalSpacing = "0px";
		container.setLayout(formL);
		if(length > 5) {
			length = 5;
		}
		voParentContForm.insertRows([35*length+"px"]);
//		voParentContForm.setRowAutoSizing(voParentContForm.getRows().length-1, true);
		vcParen.addChild(container, {
			rowIndex : voParentContForm.getRows().length-1,
			colIndex : 0,
			colSpan : voParentContForm.getColumns().length
		});
		
		
		allRow.forEach(function(eachRow,idx){
			
			if(idx == 0) {
				for(var colIdx = 0 ; colIdx <=2 ;colIdx++ ){
					
					var output = new cpr.controls.Output();
					output.value = eachRow.getValue(vaColNms[colIdx]);
					
					container.addChild(output, {
						colIndex : colIdx,
						rowIndex : 0,
						rowSpan : length
					});
				}

			}
			//순번은 행 인덱스로 자동 입력
			var optSN = new cpr.controls.Output();
			optSN.value = eachRow.getValue("SN");
			container.addChild(optSN, {
				colIndex : vaColNms.indexOf("SN"),
				rowIndex : idx
			});
//			var optTurn = new cpr.controls.Output();
//			optTurn.value = idx;
//			container.addChild(optTurn, {
//				colIndex : 3,
//				rowIndex : idx
//			});
			//출고
			var optDvily = new cpr.controls.Output();
			optDvily.value = eachRow.getValue("DEMO_DVILY");
			container.addChild(optDvily, {
				colIndex : vaColNms.indexOf("DEMO_DVILY"),
				rowIndex : idx
			});
//			var optIsu = new cpr.controls.Output();
//			optIsu.dataType = "date";
//			optIsu.format = "M/DD";
//			optIsu.value = eachRow.getValue("ISU_DAT");
//			container.addChild(optIsu, {
//				colIndex : 4,
//				rowIndex : idx
//			});
			
			//반납
			var optRturn = new cpr.controls.Output();
			optRturn.value = eachRow.getValue("DEMO_RTURN");
			container.addChild(optRturn, {
				colIndex : vaColNms.indexOf("DEMO_RTURN"),
				rowIndex : idx
			});
//			var optBan = new cpr.controls.Output();
//			optBan.dataType = "date";
//			optBan.format = "M/DD";
//			optBan.value = eachRow.getValue("BAN_DAT");
//			container.addChild(optBan, {
//				colIndex : 5,
//				rowIndex : idx
//			});
			
			var vcScheduleCont = new cpr.controls.Container();
			var xy = new cpr.controls.layouts.XYLayout();
			xy.scrollable = false;
			vcScheduleCont.setLayout(xy);
		
			container.addChild(vcScheduleCont, {
				colIndex : 6,
				rowIndex : idx,
				colSpan : vaHeaderColumns.length-6
			});
			//여기까지 기본그리기
			
			var vcDsUser = app.lookup("dsUser");
			
			var vaUserRow = vcDsUser.findAllRow("DEMO_NAME=='"+eachRow.getValue("DEMO_NAME")+"' && SN=='"+eachRow.getValue("SN")+"'");
			
			vaUserRow.forEach(function(usrRow) {
				
				
				var button = new cpr.controls.Button();
				var from = usrRow.getValue("FROM");
				var to = usrRow.getValue("TO");
				
				button.value = usrRow.getValue("NAME");
				var a = moment(from);
				var b = moment(to);
				
				var day = a.day() - 1;
				
				var hweek = getWeek(a, yearV + vcMonth.value);
				//TODO 폼에있는애로 바꾸기 뻐꾸기 떡꾸기
//				console.log(hweek);
				var weekWidth = app.lookup("optWeek1").getActualRect().width;
				var dayWidth = weekWidth / 6;
				
				var left = weekWidth * (hweek - 1) + dayWidth * day;
				//여기까지 좋은듯함.
				var eDay = b.day() - 1;
				var eWeek = getWeek(b, yearV + vcMonth.value);
				
				var bWidth = (6 * (eWeek - hweek) + eDay - day + 1) * dayWidth;
				
				vcScheduleCont.addChild(button, {
					"left": left + "px",
					"bottom": "0px",
					"height": "16px",
					"width": bWidth + "px"
				});
				
				if (left < 0) {
					button.style.css("text-align", "right");
					button.tooltip = usrRow.getValue("NAME");
				}
			});
		});
		
	});
}


/*
 * "주차확인" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	var march = moment("202201","YYYYMMDD");
	console.log(march.isoWeekday())
	console.log(march.startOf("isoWeek").format("YYYYMMDD"));

	console.log(march.startOf("isoweek").format("YYYYMMDD"));
	console.log(march.endOf("month").format("YYYYMMDD"));
	console.log(march.endOf("month").week());
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
	
	var vcMonth = app.lookup("optMonth");
	
	var vsMonth = vcMonth.value;
		
	var vnMonth = 0;
	if(parseInt(vsMonth) <= 11) {
		
		vnMonth = parseInt(vsMonth) + 1;
	} else {
		
		vnMonth = 1;
	}
	
	vcMonth.value = vnMonth < 10 ? "0"+vnMonth : vnMonth.toString();
	
	onBtn8Click(e);
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
	
	var vsMonth = vcMonth.value;
	
	var vnMonth = 0;
	if(parseInt(vsMonth) >= 2) {
		
		vnMonth = parseInt(vsMonth) - 1;
	} else {
		
		vnMonth = 12;
	}
	
	vcMonth.value = vnMonth < 10 ? "0"+vnMonth : vnMonth.toString();
	
	onBtn8Click(e);
}


/*
 * "주차확인2" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	
	console.log(moment("202007","YYYYMMDD").startOf("isoweek").day(4).isoWeek());
	console.log(moment("202007","YYYYMMDD").startOf("month").format("YYYYMMDD"));
}
