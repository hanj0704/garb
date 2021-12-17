/************************************************
 * SALES_PLAN.js
 * Created at 2021. 2. 18. 오후 3:26:33.
 *
 * @author ryu
 ************************************************/



/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var vcGrid = app.lookup("grd1");
	
	var grpG = app.lookup("grpG");
	
	var btnL = app.lookup("btnLeft");
	var btnR = app.lookup("btnRIght");
	
	var a = btnL.getActualRect();
	var b = btnR.getActualRect();
	var startX = a.bottomLeft.x;
	var startY = a.bottomLeft.y + 30;
	var endY = btnR.getActualRect().right
	var container = new cpr.controls.Container("zz");
	container.style.css("background-color","rgba(66, 135, 245,0.2)");
	
	var rowCnt = vcGrid.getRowCount();
	
	var fo = new cpr.controls.layouts.FormLayout();
	var rowH = [];
	for(var i = 0 ; i < rowCnt ; i++){
		rowH.push("35px");
	}
	fo.setRows(rowH);
	fo.setColumns(["1fr"]);
	fo.horizontalSpacing = "0px";
	fo.verticalSpacing = "0px";
	
	container.setLayout(fo);
	vcGrid.floatControl(container,{
				"top" : 20+"px",
		"left" : 20+"px",
		"right" : "20px",
		"bottom" : "20px"
	});
	grpG.floatControl(container,{
		"top" : 60+"px",
		"left" : 430+"px",
		"right" : "0px",
		"bottom" : "0px"
	});
	
	fo.getRows().forEach(function(each,idx){
		var xyC = new cpr.controls.Container();
		var xy = new cpr.controls.layouts.XYLayout();
		xy.scrollable = false;
		
		xyC.setLayout(xy);
		
		container.addChild(xyC, {
			"rowIndex": idx,
			"colIndex" : 0
		});
	});
}
function getWeek(pMoment,psMonth){
	
	var voMonthM = moment(psMonth,"YYYYMMDD");
	var ht = pMoment;
	var wom  = ht.week() - voMonthM.startOf("month").week();
	return wom;
}

/*
 * "막대" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	var vcDs = app.lookup("dsUser");
	var ds2 = app.lookup("ds2");
	
	var ht = moment("20200803");
	var wom  = ht.week() - ht.startOf("month").week();
//	console.log(wom);
	
	
	for(var i = 0 ; i < vcDs.getRowCount() ; i++) {
		
		var row = vcDs.getRow(i);
		var target = row.getValue("DEMO_NAME");
		var sn = row.getValue("SN");
		var from = row.getValue("FROM");
		var to = row.getValue("TO");
		
		
		var idx = ds2.findFirstRow("DEMO_NAME =='"+target +"' && SN =='"+sn+"'").getIndex()	
		
		/** @type cpr.controls.Container */
		var cont  =app.lookup("zz");
//		/** @type cpr.controls.layouts.FormLayout */
//		var layo = cont.getLayout();
		
		/** @type cpr.controls.Container */
		var xyl = cont.getChildren()[idx];
		
		var button = new cpr.controls.Button();
		
		button.value = row.getValue("NAME");
		var a  = moment(from);
		var b = moment(to);
		
			var day = a.day()-1;
			console.log(from);
			console.log(day);
			var hweek = getWeek(a,"2020"+app.lookup("month").value);
			
			console.log(hweek);
			var weekWidth = app.lookup("week1").getActualRect().width;
			var dayWidth = weekWidth/6;
			
			var left = weekWidth*(hweek-1) + dayWidth*day;
			
			var eDay = b.day()-1;
			var eWeek = getWeek(b,"2020"+app.lookup("month").value);
			console.log(eDay);
			console.log(eWeek);
			
			var bWidth = (6*(eWeek-hweek)+eDay-day+1)*dayWidth;
			
			xyl.addChild(button, {
				"left" : left+"px",
				"bottom":"0px",
				"height":"16px",
				"width":bWidth+"px"
			});
			
			if(left < 0) {
				button.style.css("text-align","right");
				button.tooltip = row.getValue("NAME");
			}
			
 //		} else {
			
			
//		}
	}
	
	
//	var grd = app.lookup("grd1");
	
	
}


/*
 * 그리드에서 before-selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트.
 */
function onGrd1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	e.preventDefault();
}


/*
 * "Button" 버튼(btnRIght)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRIghtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRIght = e.control;
	var month = app.lookup("month");
	
	if(Number(month.value) < 12)
	app.lookup("month").value = Number(app.lookup("month").value)+1;
	
	onBtn3Click(e);
}


/*
 * "Button" 버튼(btnLeft)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLeftClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLeft = e.control;
	var month = app.lookup("month");
	if(Number(month.value) > 1)
	app.lookup("month").value = Number(app.lookup("month").value)-1;
	
	onBtn3Click(e);
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
	
	
	var ds2 = app.lookup("ds2");
	var vaColNms = ds2.getColumnNames();
	var vcParen = app.lookup("grp1");
	var voparenForm = vcParen.getLayout();
	var vaDemoNm = ds2.getUnfilteredDistinctValues("DEMO_NAME");
	while(voparenForm.getRows().length > 2) {
		
		voparenForm.removeRows([voparenForm.getRows().length-1]);
	}
	vaDemoNm.forEach(function(each){
		var allRow = ds2.findAllRow("DEMO_NAME =='"+each+"'");	
		
		var length = allRow.length;
		var rows = [];
		
		for(var i = 0 ; i < length ; i++){
			rows.push("35px");
		}
		var container = new cpr.controls.Container();
		var formL = new cpr.controls.layouts.FormLayout();
		formL.setColumns(voparenForm.getColumns());
		formL.setRows(rows);
		formL.horizontalSpacing = "0px";
		formL.verticalSpacing = "0px";
		container.setLayout(formL);
		
		voparenForm.insertRows([35*length+"px"]);
		voparenForm.setRowAutoSizing(voparenForm.getRows().length-1, true);
		vcParen.addChild(container, {
			rowIndex : voparenForm.getRows().length-1,
			colIndex : 0,
			colSpan : voparenForm.getColumns().length
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
			
			var optSN = new cpr.controls.Output();
			optSN.value = eachRow.getValue("SN");
			container.addChild(optSN, {
				colIndex : vaColNms.indexOf("SN"),
				rowIndex : idx
			});
			
			var optDvily = new cpr.controls.Output();
			optDvily.value = eachRow.getValue("DEMO_DVILY");
			container.addChild(optDvily, {
				colIndex : vaColNms.indexOf("DEMO_DVILY"),
				rowIndex : idx
			});
			var optRturn = new cpr.controls.Output();
			optRturn.value = eachRow.getValue("DEMO_RTURN");
			container.addChild(optRturn, {
				colIndex : vaColNms.indexOf("DEMO_RTURN"),
				rowIndex : idx
			});
			
			var vcScheduleCont = new cpr.controls.Container();
			var xy = new cpr.controls.layouts.XYLayout();
			xy.scrollable = false;
			vcScheduleCont.setLayout(xy);
			
			container.addChild(vcScheduleCont, {
				colIndex : 6,
				rowIndex : idx,
				colSpan : 5
			});
			
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
				var hweek = getWeek(a, "2020" + app.lookup("month").value);
				//TODO 폼에있는애로 바꾸기 뻐꾸기 떡꾸기
				var weekWidth = app.lookup("week1").getActualRect().width;
				var dayWidth = weekWidth / 6;
				
				var left = weekWidth * (hweek - 1) + dayWidth * day;
				
				var eDay = b.day() - 1;
				var eWeek = getWeek(b, "2020" + app.lookup("month").value);
				
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
