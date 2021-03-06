/*
 * App URI: 202102/ostem/SALES_PLAN
 * Source Location: 202102/ostem/SALES_PLAN.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202102/ostem/SALES_PLAN", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "DEMO_NAME"},
					{"name": "DEMO_TERM"},
					{
						"name": "POSBL_CO",
						"dataType": "string"
					},
					{"name": "SN"},
					{"name": "DEMO_DLIVY"},
					{"name": "ID"},
					{"name": "DEMO_RTURN"}
				],
				"rows": [
					{"DEMO_NAME": "122 Taper KIT", "DEMO_TERM": "4일", "POSBL_CO": "0회", "SN": "SN1", "DEMO_DLIVY": "DEMO_DLIVY1", "DEMO_RTURN": "DEMO_RTURN1", "ID": "1"},
					{"DEMO_NAME": "ESR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "0회", "SN": "SN2", "DEMO_DLIVY": "DEMO_DLIVY2", "DEMO_RTURN": "DEMO_RTURN2", "ID": "2"},
					{"DEMO_NAME": "EFR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "SN3", "DEMO_DLIVY": "DEMO_DLIVY3", "DEMO_RTURN": "DEMO_RTURN3", "ID": "3"},
					{"DEMO_NAME": "CAS KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "SN4", "DEMO_DLIVY": "DEMO_DLIVY4", "DEMO_RTURN": "DEMO_RTURN4", "ID": "4"},
					{"DEMO_NAME": "엔진 (카보)", "DEMO_TERM": "10일", "POSBL_CO": "1회", "SN": "SN5", "DEMO_DLIVY": "DEMO_DLIVY5", "DEMO_RTURN": "DEMO_RTURN5", "ID": "5"},
					{"DEMO_NAME": "파워프랩", "DEMO_TERM": "7일", "POSBL_CO": "1회", "SN": "SN6", "DEMO_DLIVY": "DEMO_DLIVY6", "DEMO_RTURN": "DEMO_RTURN6", "ID": "6"},
					{"DEMO_NAME": "구강카메라", "DEMO_TERM": "12일", "POSBL_CO": "0회", "SN": "SN7", "DEMO_DLIVY": "DEMO_DLIVY7", "DEMO_RTURN": "DEMO_RTURN7", "ID": "7"},
					{"DEMO_NAME": "OneGuide KIT", "DEMO_TERM": "14일", "POSBL_CO": "0회", "SN": "SN8", "DEMO_DLIVY": "DEMO_DLIVY8", "DEMO_RTURN": "DEMO_RTURN8", "ID": "8"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns": [
					{"name": "DEMO_NAME"},
					{"name": "DEMO_TERM"},
					{
						"name": "POSBL_CO",
						"dataType": "string"
					},
					{"name": "SN"},
					{"name": "DEMO_DVILY"},
					{"name": "DEMO_RTURN"},
					{"name": "ID"}
				],
				"rows": [
					{"DEMO_NAME": "122 Taper KIT", "DEMO_TERM": "4일", "POSBL_CO": "0회", "SN": "001", "DEMO_DVILY": "8/15", "DEMO_RTURN": "8/21", "ID": "1"},
					{"DEMO_NAME": "122 Taper KIT", "DEMO_TERM": "4일", "POSBL_CO": "0회", "SN": "002", "DEMO_DVILY": "8/9", "DEMO_RTURN": "8/18", "ID": "1"},
					{"DEMO_NAME": "122 Taper KIT", "DEMO_TERM": "4일", "POSBL_CO": "0회", "SN": "003", "DEMO_DLIVY": "DEMO_DLIVY1", "DEMO_RTURN": "", "ID": "1", "DEMO_DVILY": ""},
					{"DEMO_NAME": "ESR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "0회", "SN": "001", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "2"},
					{"DEMO_NAME": "ESR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "0회", "SN": "002", "DEMO_DLIVY": "DEMO_DLIVY2", "DEMO_RTURN": "", "ID": "2", "DEMO_DVILY": ""},
					{"DEMO_NAME": "EFR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "001", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "3"},
					{"DEMO_NAME": "EFR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "002", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "3"},
					{"DEMO_NAME": "EFR FULL KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "003", "DEMO_DLIVY": "DEMO_DLIVY3", "DEMO_RTURN": "", "ID": "3", "DEMO_DVILY": ""},
					{"DEMO_NAME": "CAS KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "001", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "4"},
					{"DEMO_NAME": "CAS KIT", "DEMO_TERM": "7일", "POSBL_CO": "2회", "SN": "002", "DEMO_DLIVY": "DEMO_DLIVY4", "DEMO_RTURN": "", "ID": "4", "DEMO_DVILY": ""},
					{"DEMO_NAME": "엔진 (카보)", "DEMO_TERM": "10일", "POSBL_CO": "1회", "SN": "001", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "5"},
					{"DEMO_NAME": "엔진 (카보)", "DEMO_TERM": "10일", "POSBL_CO": "1회", "SN": "002", "DEMO_DVILY": "8/15", "DEMO_RTURN": "8/25", "ID": "5"},
					{"DEMO_NAME": "엔진 (카보)", "DEMO_TERM": "10일", "POSBL_CO": "1회", "SN": "003", "DEMO_DLIVY": "DEMO_DLIVY5", "DEMO_RTURN": "", "ID": "5", "DEMO_DVILY": ""},
					{"DEMO_NAME": "파워프랩", "DEMO_TERM": "7일", "POSBL_CO": "1회", "SN": "001", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "6"},
					{"DEMO_NAME": "파워프랩", "DEMO_TERM": "7일", "POSBL_CO": "1회", "SN": "002", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "6"},
					{"DEMO_NAME": "파워프랩", "DEMO_TERM": "7일", "POSBL_CO": "1회", "SN": "003", "DEMO_DLIVY": "DEMO_DLIVY6", "DEMO_RTURN": "", "ID": "6"},
					{"DEMO_NAME": "구강카메라", "DEMO_TERM": "12일", "POSBL_CO": "0회", "SN": "001", "DEMO_DVILY": "8/14", "DEMO_RTURN": "8/27", "ID": "7"},
					{"DEMO_NAME": "구강카메라", "DEMO_TERM": "12일", "POSBL_CO": "0회", "SN": "002", "DEMO_DLIVY": "DEMO_DLIVY7", "DEMO_RTURN": "", "ID": "7"},
					{"DEMO_NAME": "OneGuide KIT", "DEMO_TERM": "14일", "POSBL_CO": "0회", "SN": "001", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "8"},
					{"DEMO_NAME": "OneGuide KIT", "DEMO_TERM": "14일", "POSBL_CO": "0회", "SN": "002", "DEMO_DVILY": "", "DEMO_RTURN": "", "ID": "8"},
					{"DEMO_NAME": "OneGuide KIT", "DEMO_TERM": "14일", "POSBL_CO": "0회", "SN": "003", "DEMO_DLIVY": "DEMO_DLIVY8", "DEMO_RTURN": "", "ID": "8"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsUser");
			dataSet_3.parseData({
				"columns": [
					{"name": "DEMO_NAME"},
					{"name": "SN"},
					{"name": "NAME"},
					{"name": "FROM"},
					{"name": "TO"},
					{"name": "ID"}
				],
				"rows": [
					{"DEMO_NAME": "122 Taper KIT", "SN": "001", "NAME": "8굿윌", "FROM": "20200726", "TO": "20200803", "ID": "1"},
					{"DEMO_NAME": "122 Taper KIT", "SN": "001", "NAME": "8조재민", "FROM": "20200814", "TO": "20200820", "ID": "1"},
					{"DEMO_NAME": "122 Taper KIT", "SN": "002", "NAME": "8신일", "FROM": "20200730", "TO": "20200803", "ID": "1"},
					{"DEMO_NAME": "122 Taper KIT", "SN": "002", "NAME": "8하하하", "FROM": "20200810", "TO": "20200818", "ID": "1"},
					{"DEMO_NAME": "122 Taper KIT", "SN": "003", "NAME": "8반석", "FROM": "20200730", "TO": "20200807", "ID": "1"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsDemo");
			dataSet_4.parseData({
				"columns": [
					{
						"name": "SEQ_NO",
						"dataType": "number"
					},
					{
						"name": "CUST_NO",
						"dataType": "number"
					},
					{
						"name": "LS_CD_NM",
						"info": ""
					},
					{
						"name": "GIGAN",
						"dataType": "number"
					},
					{
						"name": "CNT",
						"dataType": "number"
					},
					{"name": "DEMO_ST"},
					{"name": "DM_FDAT"},
					{"name": "DM_TDAT"},
					{
						"name": "FDAT_MM",
						"dataType": "number"
					},
					{
						"name": "FDAT_CNT",
						"dataType": "number"
					},
					{
						"name": "TDAT_MM",
						"dataType": "number"
					},
					{
						"name": "TDAT_CNT",
						"dataType": "number"
					},
					{"name": "ISU_DAT"},
					{"name": "BAN_DAT"},
					{
						"name": "BUY_ST",
						"dataType": "string"
					},
					{
						"name": "RESH_AMT",
						"dataType": "number"
					}
				],
				"rows": [
					{"SEQ_NO": "1", "CUST_NO": "1000021", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "3", "DM_FDAT": "20210104", "DM_TDAT": "20210108", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "2", "ISU_DAT": "20210202", "BAN_DAT": "20210208", "BUY_ST": "1", "RESH_AMT": "90", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "2", "CUST_NO": "1000022", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "1", "DM_FDAT": "20210112", "DM_TDAT": "20210116", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "3", "ISU_DAT": "", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "95", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "3", "CUST_NO": "1000023", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "3", "DM_FDAT": "20210119", "DM_TDAT": "20210123", "FDAT_MM": "1", "FDAT_CNT": "4", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210119", "BAN_DAT": "20210123", "BUY_ST": "3", "RESH_AMT": "80", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "4", "CUST_NO": "1000024", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "1", "DM_FDAT": "20210129", "DM_TDAT": "20210202", "FDAT_MM": "1", "FDAT_CNT": "5", "TDAT_MM": "2", "TDAT_CNT": "1", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "5", "CUST_NO": "1000025", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "2", "DM_FDAT": "20210116", "DM_TDAT": "20210120", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210116", "BAN_DAT": "", "BUY_ST": "2", "RESH_AMT": "70", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "6", "CUST_NO": "1000026", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "2", "DM_FDAT": "20210113", "DM_TDAT": "20210117", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210113", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "85", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "7", "CUST_NO": "1000027", "MDL_L_CD": "D001", "MDL_S_CD": "D01", "DEMO_ST": "3", "DM_FDAT": "20210106", "DM_TDAT": "20210110", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "3", "ISU_DAT": "20210106", "BAN_DAT": "20210106", "BUY_ST": "1", "RESH_AMT": "88", "LS_CD_NM": "122 TaperKIT", "GIGAN": "4", "CNT": "0"},
					{"SEQ_NO": "8", "CUST_NO": "1000028", "MDL_L_CD": "D001", "MDL_S_CD": "D02", "DEMO_ST": "1", "DM_FDAT": "20210104", "DM_TDAT": "20210106", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "2", "ISU_DAT": "20210104", "LS_CD_NM": "ESR FULL KIT", "GIGAN": "7", "CNT": "0"},
					{"SEQ_NO": "9", "CUST_NO": "1000029", "MDL_L_CD": "D001", "MDL_S_CD": "D02", "DEMO_ST": "3", "DM_FDAT": "20210112", "DM_TDAT": "20210114", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "3", "ISU_DAT": "20210112", "BAN_DAT": "20210114", "BUY_ST": "1", "RESH_AMT": "90", "LS_CD_NM": "ESR FULL KIT", "GIGAN": "7", "CNT": "0"},
					{"SEQ_NO": "10", "CUST_NO": "1000030", "MDL_L_CD": "D001", "MDL_S_CD": "D03", "DEMO_ST": "1", "DM_FDAT": "20210120", "DM_TDAT": "20210122", "FDAT_MM": "1", "FDAT_CNT": "4", "TDAT_MM": "1", "TDAT_CNT": "4", "LS_CD_NM": "EFR FULL KIT", "GIGAN": "7", "CNT": "2"},
					{"SEQ_NO": "11", "CUST_NO": "1000031", "MDL_L_CD": "D001", "MDL_S_CD": "D03", "DEMO_ST": "2", "DM_FDAT": "20210126", "DM_TDAT": "20210128", "FDAT_MM": "1", "FDAT_CNT": "5", "TDAT_MM": "1", "TDAT_CNT": "5", "ISU_DAT": "20210126", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "90", "LS_CD_NM": "EFR FULL KIT", "GIGAN": "7", "CNT": "2"},
					{"SEQ_NO": "12", "CUST_NO": "1000032", "MDL_L_CD": "D001", "MDL_S_CD": "D03", "DEMO_ST": "3", "DM_FDAT": "20210118", "DM_TDAT": "20210120", "FDAT_MM": "1", "FDAT_CNT": "4", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210118", "BAN_DAT": "20210120", "BUY_ST": "1", "RESH_AMT": "95", "LS_CD_NM": "EFR FULL KIT", "GIGAN": "7", "CNT": "2"},
					{"SEQ_NO": "13", "CUST_NO": "1000033", "MDL_L_CD": "D001", "MDL_S_CD": "D04", "DEMO_ST": "1", "DM_FDAT": "20210111", "DM_TDAT": "20210113", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "3", "ISU_DAT": "20210111", "LS_CD_NM": "CAS KIT", "GIGAN": "7", "CNT": "2"},
					{"SEQ_NO": "14", "CUST_NO": "1000034", "MDL_L_CD": "D001", "MDL_S_CD": "D04", "DEMO_ST": "2", "DM_FDAT": "20210106", "DM_TDAT": "20210108", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "2", "ISU_DAT": "20210106", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "85", "LS_CD_NM": "CAS KIT", "GIGAN": "7", "CNT": "2"},
					{"SEQ_NO": "15", "CUST_NO": "1000035", "MDL_L_CD": "D001", "MDL_S_CD": "D05", "DEMO_ST": "1", "DM_FDAT": "20210102", "DM_TDAT": "20210106", "FDAT_MM": "1", "FDAT_CNT": "1", "TDAT_MM": "1", "TDAT_CNT": "2", "LS_CD_NM": "엔진 (카보)", "GIGAN": "10", "CNT": "1"},
					{"SEQ_NO": "16", "CUST_NO": "1000036", "MDL_L_CD": "D001", "MDL_S_CD": "D05", "DEMO_ST": "2", "DM_FDAT": "20210115", "DM_TDAT": "20210119", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210115", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "90", "LS_CD_NM": "엔진 (카보)", "GIGAN": "10", "CNT": "1"},
					{"SEQ_NO": "17", "CUST_NO": "1000037", "MDL_L_CD": "D001", "MDL_S_CD": "D05", "DEMO_ST": "3", "DM_FDAT": "20210120", "DM_TDAT": "20210124", "FDAT_MM": "1", "FDAT_CNT": "4", "TDAT_MM": "1", "TDAT_CNT": "5", "ISU_DAT": "20210120", "BAN_DAT": "20210124", "BUY_ST": "2", "RESH_AMT": "80", "LS_CD_NM": "엔진 (카보)", "GIGAN": "10", "CNT": "1"},
					{"SEQ_NO": "18", "CUST_NO": "1000038", "MDL_L_CD": "D001", "MDL_S_CD": "D06", "DEMO_ST": "1", "DM_FDAT": "20210129", "DM_TDAT": "20210131", "FDAT_MM": "1", "FDAT_CNT": "5", "TDAT_MM": "2", "TDAT_CNT": "1", "ISU_DAT": "20210129", "LS_CD_NM": "파워프랩", "GIGAN": "7", "CNT": "1"},
					{"SEQ_NO": "19", "CUST_NO": "1000039", "MDL_L_CD": "D001", "MDL_S_CD": "D06", "DEMO_ST": "2", "DM_FDAT": "20210113", "DM_TDAT": "20210115", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "3", "ISU_DAT": "20210113", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "90", "LS_CD_NM": "파워프랩", "GIGAN": "7", "CNT": "1"},
					{"SEQ_NO": "20", "CUST_NO": "1000040", "MDL_L_CD": "D001", "MDL_S_CD": "D06", "DEMO_ST": "3", "DM_FDAT": "20210104", "DM_TDAT": "20210106", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "2", "ISU_DAT": "20210104", "BAN_DAT": "20210106", "BUY_ST": "2", "RESH_AMT": "70", "LS_CD_NM": "파워프랩", "GIGAN": "7", "CNT": "1"},
					{"SEQ_NO": "21", "CUST_NO": "1000041", "MDL_L_CD": "D001", "MDL_S_CD": "D07", "DEMO_ST": "1", "DM_FDAT": "20210108", "DM_TDAT": "20210111", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "3", "ISU_DAT": "20210108", "LS_CD_NM": "구강카메라", "GIGAN": "12", "CNT": "0"},
					{"SEQ_NO": "22", "CUST_NO": "1000042", "MDL_L_CD": "D001", "MDL_S_CD": "D07", "DEMO_ST": "3", "DM_FDAT": "20210119", "DM_TDAT": "20210122", "FDAT_MM": "1", "FDAT_CNT": "4", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210119", "BAN_DAT": "20210122", "BUY_ST": "1", "RESH_AMT": "95", "LS_CD_NM": "구강카메라", "GIGAN": "12", "CNT": "0"},
					{"SEQ_NO": "23", "CUST_NO": "1000043", "MDL_L_CD": "D001", "MDL_S_CD": "D08", "DEMO_ST": "1", "DM_FDAT": "20210114", "DM_TDAT": "20210117", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210114", "LS_CD_NM": "OneGuide KIT", "GIGAN": "14", "CNT": "0"},
					{"SEQ_NO": "24", "CUST_NO": "1000044", "MDL_L_CD": "D001", "MDL_S_CD": "D08", "DEMO_ST": "2", "DM_FDAT": "20210106", "DM_TDAT": "20210109", "FDAT_MM": "1", "FDAT_CNT": "2", "TDAT_MM": "1", "TDAT_CNT": "2", "ISU_DAT": "20210106", "BAN_DAT": "", "BUY_ST": "1", "RESH_AMT": "95", "LS_CD_NM": "OneGuide KIT", "GIGAN": "14", "CNT": "0"},
					{"SEQ_NO": "25", "CUST_NO": "1000045", "MDL_L_CD": "D001", "MDL_S_CD": "D08", "DEMO_ST": "3", "DM_FDAT": "20210115", "DM_TDAT": "20210118", "FDAT_MM": "1", "FDAT_CNT": "3", "TDAT_MM": "1", "TDAT_CNT": "4", "ISU_DAT": "20210115", "BAN_DAT": "20210118", "BUY_ST": "1", "RESH_AMT": "100", "LS_CD_NM": "OneGuide KIT", "GIGAN": "14", "CNT": "0"}
				]
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("DEMO_TBL");
			dataSet_5.parseData({
				"columns" : [
					{
						"name": "SEQ_NO",
						"dataType": "number"
					},
					{
						"name": "CUST_NO",
						"dataType": "number"
					},
					{"name": "MDL_L_CD"},
					{"name": "MDL_S_CD"},
					{"name": "DEMO_ST"},
					{"name": "DM_FDAT"},
					{"name": "DM_TDAT"},
					{
						"name": "FDAT_MM",
						"dataType": "number"
					},
					{
						"name": "FDAT_CNT",
						"dataType": "number"
					},
					{
						"name": "TDAT_MM",
						"dataType": "number"
					},
					{
						"name": "TDAT_CNT",
						"dataType": "number"
					},
					{"name": "ISU_DAT"},
					{"name": "BAN_DAT"},
					{"name": "BUY_ST"},
					{
						"name": "RESH_AMT",
						"dataType": "number"
					}
				]
			});
			app.register(dataSet_5);
			
			app.supportMedia("all", "default");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grp3");
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.userResizingMode = "standard";
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "5px";
			formLayout_1.verticalSpacing = "5px";
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setColumnMinWidth(0, 1000);
			formLayout_1.setRows(["30px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container("grp1");
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "0px";
				formLayout_2.rightMargin = "0px";
				formLayout_2.bottomMargin = "0px";
				formLayout_2.leftMargin = "0px";
				formLayout_2.horizontalSpacing = "0px";
				formLayout_2.verticalSpacing = "0px";
				formLayout_2.horizontalSeparatorWidth = 1;
				formLayout_2.setColumns(["100px", "60px", "60px", "60px", "60px", "60px", "6fr", "6fr", "6fr", "6fr", "1fr"]);
				formLayout_2.setRows(["30px", "30px", "105px"]);
				formLayout_2.setUseRowShade(0, true);
				formLayout_2.setUseRowShade(1, true);
				formLayout_2.setRowAutoSizing(2, true);
				formLayout_2.setRowVisible(2, false);
				group_2.setLayout(formLayout_2);
				(function(container){
					var output_1 = new cpr.controls.Output("opt1");
					output_1.value = "데모명";
					output_1.style.css({
						"text-align" : "center"
					});
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 2
					});
					var output_2 = new cpr.controls.Output("opt2");
					output_2.value = "데모\r\n기간";
					output_2.style.css({
						"text-align" : "center"
					});
					container.addChild(output_2, {
						"colIndex": 1,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 2
					});
					var output_3 = new cpr.controls.Output("opt3");
					output_3.value = "가능\r\n횟수";
					output_3.style.css({
						"text-align" : "center"
					});
					container.addChild(output_3, {
						"colIndex": 2,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 2
					});
					var output_4 = new cpr.controls.Output("opt4");
					output_4.value = "순번";
					output_4.style.css({
						"text-align" : "center"
					});
					container.addChild(output_4, {
						"colIndex": 3,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 2
					});
					var output_5 = new cpr.controls.Output("opt5");
					output_5.value = "데모";
					output_5.style.css({
						"text-align" : "center"
					});
					container.addChild(output_5, {
						"colIndex": 4,
						"rowIndex": 0,
						"colSpan": 2,
						"rowSpan": 1
					});
					var output_6 = new cpr.controls.Output("opt6");
					output_6.value = "출고";
					output_6.style.css({
						"text-align" : "center"
					});
					container.addChild(output_6, {
						"colIndex": 4,
						"rowIndex": 1
					});
					var output_7 = new cpr.controls.Output("opt7");
					output_7.value = "출납";
					output_7.style.css({
						"text-align" : "center"
					});
					container.addChild(output_7, {
						"colIndex": 5,
						"rowIndex": 1
					});
					var output_8 = new cpr.controls.Output("optWeek1");
					output_8.value = "1주";
					output_8.style.css({
						"border-right-style" : "solid",
						"border-right-width" : "1px",
						"border-right-color" : "black",
						"text-align" : "center"
					});
					container.addChild(output_8, {
						"colIndex": 6,
						"rowIndex": 1
					});
					var output_9 = new cpr.controls.Output("optWeek2");
					output_9.value = "2주";
					output_9.style.css({
						"border-right-style" : "solid",
						"border-right-width" : "1px",
						"border-right-color" : "black",
						"text-align" : "center"
					});
					container.addChild(output_9, {
						"colIndex": 7,
						"rowIndex": 1
					});
					var output_10 = new cpr.controls.Output("optWeek3");
					output_10.value = "3주";
					output_10.style.css({
						"border-right-style" : "solid",
						"border-right-width" : "1px",
						"border-right-color" : "black",
						"text-align" : "center"
					});
					container.addChild(output_10, {
						"colIndex": 8,
						"rowIndex": 1
					});
					var output_11 = new cpr.controls.Output("optWeek4");
					output_11.value = "4주";
					output_11.style.css({
						"border-right-style" : "solid",
						"border-right-width" : "1px",
						"border-right-color" : "black",
						"text-align" : "center"
					});
					container.addChild(output_11, {
						"colIndex": 9,
						"rowIndex": 1
					});
					var output_12 = new cpr.controls.Output("optWeek5");
					output_12.value = "5주";
					output_12.style.css({
						"border-right-style" : "solid",
						"border-right-width" : "1px",
						"border-right-color" : "black",
						"text-align" : "center"
					});
					container.addChild(output_12, {
						"colIndex": 10,
						"rowIndex": 1
					});
					var group_3 = new cpr.controls.Container("grp2");
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.topMargin = "0px";
					formLayout_3.rightMargin = "0px";
					formLayout_3.bottomMargin = "0px";
					formLayout_3.leftMargin = "0px";
					formLayout_3.horizontalSpacing = "0px";
					formLayout_3.verticalSpacing = "0px";
					formLayout_3.setColumns(["20px", "1fr", "20px"]);
					formLayout_3.setRows(["1fr"]);
					group_3.setLayout(formLayout_3);
					(function(container){
						var button_1 = new cpr.controls.Button("btn1");
						button_1.value = "<";
						if(typeof onBtn1Click == "function") {
							button_1.addEventListener("click", onBtn1Click);
						}
						container.addChild(button_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var button_2 = new cpr.controls.Button("btn2");
						button_2.value = ">";
						if(typeof onBtn2Click == "function") {
							button_2.addEventListener("click", onBtn2Click);
						}
						container.addChild(button_2, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var output_13 = new cpr.controls.Output("optMonth");
						output_13.value = "08";
						output_13.dataType = "date";
						output_13.dateValueFormat = "MM";
						output_13.format = "MM";
						output_13.displayExp = "value + \"월\"";
						output_13.style.css({
							"text-align" : "center"
						});
						container.addChild(output_13, {
							"colIndex": 1,
							"rowIndex": 0
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 6,
						"rowIndex": 0,
						"colSpan": 5,
						"rowSpan": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 1,
					"colSpan": 1,
					"rowSpan": 1
				});
				var group_4 = new cpr.controls.Container("grp4");
				// Layout
				var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
				group_4.setLayout(flowLayout_1);
				(function(container){
					var dateInput_1 = new cpr.controls.DateInput("dti1");
					dateInput_1.value = "2020";
					dateInput_1.calendarType = "year";
					dateInput_1.mask = "YYYY";
					dateInput_1.format = "YYYY";
					container.addChild(dateInput_1, {
						"width": "100px",
						"height": "25px"
					});
				})(group_4);
				container.addChild(group_4, {
					"colIndex": 0,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "19px",
				"right": "20px",
				"bottom": "21px",
				"left": "20px"
			});
			
			var button_3 = new cpr.controls.Button("btn8");
			button_3.value = "Button";
			if(typeof onBtn8Click == "function") {
				button_3.addEventListener("click", onBtn8Click);
			}
			container.addChild(button_3, {
				"top": "0px",
				"left": "0px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_4 = new cpr.controls.Button("btn3");
			button_4.value = "주차확인";
			if(typeof onBtn3Click == "function") {
				button_4.addEventListener("click", onBtn3Click);
			}
			container.addChild(button_4, {
				"top": "0px",
				"left": "99px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_5 = new cpr.controls.Button("btn4");
			button_5.value = "주차확인2";
			if(typeof onBtn4Click == "function") {
				button_5.addEventListener("click", onBtn4Click);
			}
			container.addChild(button_5, {
				"top": "0px",
				"left": "198px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "영업사원 개인 데모계획";
	cpr.core.Platform.INSTANCE.register(app);
})();
