/************************************************
 * Page1.js
 * Created at 2019. 12. 18. 오후 1:38:23.
 *
 * @author sylee
 ************************************************/

var util = createCommonUtil();
var voGridRowData; //잘라내기, 복사, 붙여넣기 저장용 변수

//그리드에서 사용할 수 있도록 함수 등록
cpr.expression.ExpressionEngine.INSTANCE.registerFunction("calBroadEndTime", calBroadEndTime);

/*드래그 표시 컨트롤 생성*/
/**
 * @param {Object} data
 * @return {cpr.controls.Container} group
 */
function createDragSourceFeedback(data) {

    //폼 레이아웃을 만들어놓는다.
    var feedback = new cpr.controls.layouts.FormLayout();
    feedback.horizontalSpacing = "5px";
    feedback.verticalSpacing = "0px";
    feedback.setColumns(["1fr", "1fr", "1fr", "1fr", "1fr"]);
    feedback.setRows(["40px", "40px"]);
    feedback.setColumnAutoSizing(1, true);
    var group = new cpr.controls.Container();
    group.setLayout(feedback);

    group.style.css({
        "opacity": "0.95",
        "background": "#fff",
        "border": "1px solid black"
    });

    //이미지
    var vcImage = new cpr.controls.Image();
    vcImage.src = data["Thumbnail"];

    group.addChild(vcImage, {
        "colIndex": 0,
        "rowIndex": 0,
        "colSpan": 1,
        "rowSpan": 2
    });

    //콘텐츠 명
    var vcContentsName = new cpr.controls.Output();
    vcContentsName.value = data["mtrlNm"];

    group.addChild(vcContentsName, {
        "colIndex": 1,
        "rowIndex": 0,
        "colSpan": 4,
        "rowSpan": 1
    });

    //콘텐츠ID
    var vcContentsID = new cpr.controls.Output();
    vcContentsID.ellipsis = true;
    vcContentsID.value = data["mtrlId"];
    group.addChild(vcContentsID, {
        "colIndex": 1,
        "rowIndex": 1
    });

    //플레이 시간
    var vcDuration = new cpr.controls.Output();
    vcDuration.dataType = "date";
    vcDuration.dateValueFormat = "HHmmssSSS";
    vcDuration.format = "HH:mm:ss:SS";
    vcDuration.value = data["playRun"];
    group.addChild(vcDuration, {
        "colIndex": 2,
        "rowIndex": 1
    });

    //제작일시
    var vcImageQuality = new cpr.controls.Output();
    vcImageQuality.dataType = "date";
    vcImageQuality.dateValueFormat = "YYYYMMDD";
    vcImageQuality.format = "YYYY-MM-DD";
    vcImageQuality.value = data["playYmd"];
    group.addChild(vcImageQuality, {
        "colIndex": 3,
        "rowIndex": 1
    });

    return group;
}

/**
 * ConfirmList를 불러온다
 */
function loadConfirmList() {
    var voDmDailySearch = app.lookup("dmDailySearch");
    var voDmConfirmParam = app.lookup("dmSearch");
    voDmConfirmParam.setValue("strCh", voDmDailySearch.getValue("chanId"));
    voDmConfirmParam.setValue("strDate", voDmDailySearch.getValue("playYmd"));
    voDmConfirmParam.setValue("strNo", voDmDailySearch.getValue("playNo"));
    voDmConfirmParam.setValue("systemClf", "PL");
    voDmConfirmParam.setValue("weekYn", "N");
    voDmConfirmParam.setValue("dayClf", "0");
    voDmConfirmParam.setValue("outDs", "dsConfirm");

    util.Submit.send(app, "smsSelectConfirmedList", function(pbSuccess) {
        if (pbSuccess) {
            if (app.lookup("dsConfirm").getRow(0) === null) {
                //dsConfirm이 null일 경우
                app.lookup("opbConfirm").value = "[Working]";
            } else {
                var vsCnfYn = app.lookup("dsConfirm").getRow(0).getValue("cnfYn");
                var vsCnfDt = app.lookup("dsConfirm").getRow(0).getValue("cnfDt");
                var vsCnfUserId = app.lookup("dsConfirm").getRow(0).getValue("cnfUserId");

                if (vsCnfYn === "Y") {
                    app.lookup("opbConfirm").value = "[Confirmed] "
                        + vsCnfDt.substring(0, 4) + "." + vsCnfDt.substring(4, 6) + "." + vsCnfDt.substring(6, 8) + " "
                        + vsCnfDt.substring(8, 10) + ":" + vsCnfDt.substring(10, 12) + ":" + vsCnfDt.substring(12, 14)
                        + " " + vsCnfUserId;
                } else {
                    app.lookup("otpCfn").value = "[Working]";
                }


            }
            // setBtnDecide();
        }
    });
}

/**
 * 해당 그리드에 컨텍스트 메뉴를 추가한다.
 * @param {String} psGridId 그리드 ID
 */
function setContextMenu(psGridId) { // 그리드 ID를 받아옴
    /** @type cpr.controls.Grid */
    var vcGrid = app.lookup(psGridId); // 해당 그리드를 타겟으로 잡음

    vcGrid.addEventListener("contextmenu", function( /*cpr.events.CMouseEvent */ e) { // 그리드에 컨텍스트 메뉴 이벤트 추가
        if (e.targetObject == null) return; // 타겟이 해당 그리드의 Object가 아니라면 실행X
        /** @type cpr.controls.Grid */
        var targetGrid = e.control;

        var voTargetObject = e.targetObject; // 타겟 그리드의 Object를 변수에 담음

        var rootContainer = targetGrid.getAppInstance().getRootAppInstance().getContainer(); // 컨텍스트 메뉴가 공통으로 사용되고 있으므로 해당 컨텍스트 메뉴를 찾아가는 과정

        if (rootContainer.getAppInstance().lookup("menuCtxCmn")) { // 컨텍스트 메뉴를 찾고
            rootContainer.getAppInstance().lookup("menuCtxCmn").dispose(); // 커스텀해서 쓸 것이므로 제거
        }

        e.preventDefault(); // 다음 기본 동작 방지

        var ctxMenu = new cpr.controls.Menu("menuCtxCmn");
        ctxMenu.addItem(new cpr.controls.TreeItem("행추가", "1", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("행삽입", "2", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("삭제", "3", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("복사", "4", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("붙여넣기", "5", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("잘라내기", "6", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("Marking", "7", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("Sub Event", "8", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("블록재생성", "9", "root"));
        ctxMenu.addItem(new cpr.controls.TreeItem("프로그램밴드추가", "10", "root"));

        // 셀고정용 인덱스
        var splitCellIndex = -1;
        var targetColIndex = -1;
        var header = targetGrid.header;
        var cellCount = header.cellCount;

        ctxMenu.addEventListener("item-click", function( /**@type cpr.events.CItemEvent */ e) { // 컨텍스트메뉴에 아이템 클릭 이벤트 추가

            function setGridLayOut(targetGrid, pbReset) {
                var voGridLayout = targetGrid.getColumnLayout();
                var vsGridLayout = JSON.stringify(voGridLayout);
                if (pbReset) vsGridLayout = "reset";
                var voMenuInfo = util.Auth.getPageInfo(app);
                var vsPageId = voMenuInfo.get("PAGE_ID");

                var submission = new cpr.protocols.Submission("subGridMarge");
                submission.action = "/EXB/GRID_C01_C.do";
                submission.async = true;
                submission.mediaType = "application/x-www-form-urlencoded";
                submission.method = "post";
                submission.responseType = "text";
                app.register(submission);
                submission.removeAllParameters();
                submission.removeAllResponseData();
                submission.addParameter("gridId", targetGrid.id);
                submission.addParameter("pageId", vsPageId);
                submission.addParameter("change", vsGridLayout);
                submission.send();
                if (pbReset) {
                    targetGrid.resetGrid();
                    util.Grid.init(app, targetGrid);
                }
            }

            var itemValue = e.item.value;

            //행추가
            if (itemValue == "1") {
                onBtnAddClick(e);
                //행삽입
            } else if (itemValue == "2") {
                onBtnUpAddClick(e);
                //삭제
            } else if (itemValue == "3") {
                onBtnDelClick(e);
                //복사
            } else if (itemValue == "4") {
                var vnRowIndex = targetGrid.getSelectedRowIndex();
                voGridRowData = targetGrid.getRow(vnRowIndex).getRowData();
                //붙여넣기
            } else if (itemValue == "5") {
                if (voGridRowData !== undefined || voGridRowData !== null) {
                    var vnRowIndex = targetGrid.getSelectedRowIndex();
                    var vsStartTime = vcGrid.getSelectedRow().getValue("playTime24");
                    targetGrid.getRow(vnRowIndex).setRowData(voGridRowData);
                    targetGrid.setCellValue(vnRowIndex, 1, vsStartTime);
                    targetGrid.selectRows(vnRowIndex);
                    adjustBroadEndTime();
                }
                //잘라내기
            } else if (itemValue == "6") {
                var vnRowIndex = targetGrid.getSelectedRowIndex();
                var vsStartTime = "";

                if (vnRowIndex == 0) {
                    vsStartTime = "02000000";
                } else {
                    vsStartTime = targetGrid.getRow(vnRowIndex).getValue("playTime24");
                }

                voGridRowData = targetGrid.getRow(vnRowIndex).getRowData();
                targetGrid.deleteRow(vnRowIndex);
                targetGrid.selectRows(vnRowIndex);
                targetGrid.getRow(vnRowIndex).setValue("playTime24", vsStartTime);
                adjustBroadEndTime();
                //Marking
            } else if (itemValue == "7") {
                var vnRowIndex = targetGrid.getSelectedRowIndex();

                targetGrid.getRow(vnRowIndex).setValue("color", "YELLOW");
                util.Msg.alert((vnRowIndex + 1) + "번째 행 노란색으로 변경");
                // Sub Event
            } else if (itemValue == "8") {
                var vnRowIndex = targetGrid.getSelectedRowIndex();

                app.getRootAppInstance().openDialog("app/popup/SubEventFind", {
                    width: 600,
                    height: 300
                }, function(dialog) {
                    dialog.ready(function(dialogApp) {
                        dialogApp.initValue = app.lookup("dmDailySearch").getValue("chanId");
                    });
                }).then(function(returnValue) {
                    if (returnValue) {

                    }
                });
                // 블록재생성
            } else if (itemValue == "9") {
                var vnRowIndex = targetGrid.getSelectedRowIndex();

                // 프로그램밴드추가
            } else if (itemValue == "10") {
                var vnRowIndex = targetGrid.getSelectedRowIndex();
                var initValue = {};

                initValue["playYmd"] = app.lookup("dtiDaily").value;
                initValue["playNo"] = app.lookup("cmbPlayNo").value;
                initValue["chanId"] = app.lookup("cmbChan").value;

                app.getRootAppInstance().openDialog("app/popup/PgmBandAdd", {
                    width: 800,
                    height: 500
                }, function(dialog) {
                    dialog.ready(function(dialogApp) {
                        dialogApp.initValue = initValue;
                    });
                }).then(function(returnValue) {
                    if (returnValue) {

                    }
                });
            }
            ctxMenu.dispose();
        });
        ctxMenu.addEventListenerOnce("blur", function( /**@type cpr.events.CFocusEvent*/ e) {
            //rootContainer.removeChild(ctxMenu);
            ctxMenu.dispose();
        });

        /**@type cpr.controls.Container */

        var showConstraint = {
            "position": "absolute",
            "top": e.clientY + "px",
            "left": (e.clientX - 130) + "px",
            "width": "200px",
            "height": "60px"
        };
        rootContainer.addChild(ctxMenu, showConstraint);

        ctxMenu.focus();
    });

    //그리드 noData
    vcGrid.noDataMessage = "조회된 내역이 없습니다.";
}


/**
 * 서브이벤트의 시작시간, 메인이벤트의 운행길이로 서브이벤트의 운행길이를 측정
 * 
 */
function subtractRunTime(vsBroadStart, vsBroadRun){
	
	var vsBroadHour = vsBroadStart.substring(0, 2);
    var vsBroadMin = vsBroadStart.substring(2, 4);
    var vsBroadSec = vsBroadStart.substring(4, 6);
    var vsBroadFrm = vsBroadStart.substring(6, 8);

    // 운행길이 시, 분, 초, 프레임
    var vsBroadRunHour = vsBroadRun.substring(0, 2);
    var vsBroadRunMin = vsBroadRun.substring(2, 4);
    var vsBroadRunSec = vsBroadRun.substring(4, 6);
    var vsBroadRunFrm = vsBroadRun.substring(6, 8);
	var vnFrm = Number(vsBroadRunFrm) - Number(vsBroadFrm);
	var vnSec = Number(vsBroadSec) - Number(vsBroadRunSec);
	var vnMin = Number(vsBroadRunMin) - Number(vsBroadMin);
	var vnHour = Number(vsBroadRunHour) - Number(vsBroadHour);
	
	 if(vnFrm < 0) {
	 	vnFrm += 30;
	 	vnSec += -1;
	 }
	 if(vnSec < 0) {
	 	vnSec += 60;
	 	vnMin += -1;
	 }
	 if(vnMin < 0) {
	 	vnMin += 60;
	 	vnHour += -1;
	 }
	 var vsResult = "";
    if (vnHour < 10) {
        vsResult += "0" + vnHour;
    } else {
        vsResult += String(vnHour);
    }
    if (vnMin < 10) {
        vsResult += "0" + vnMin;
    } else {
        vsResult += String(vnMin);
    }
    if (vnSec < 10) {
        vsResult += "0" + vnSec;
    } else {
        vsResult += String(vnSec);
    }
    if (vnFrm < 10) {
        vsResult += "0" + vnFrm;
    } else {
        vsResult += String(vnFrm);
    }

    return vsResult;
}
function calcBroadEndTimeSimple(vsBroadStart,vsBroadRun){
	var vsBroadHour = vsBroadStart.substring(0, 2);
    var vsBroadMin = vsBroadStart.substring(2, 4);
    var vsBroadSec = vsBroadStart.substring(4, 6);
    var vsBroadFrm = vsBroadStart.substring(6, 8);

    // 운행길이 시, 분, 초, 프레임
    var vsBroadRunHour = vsBroadRun.substring(0, 2);
    var vsBroadRunMin = vsBroadRun.substring(2, 4);
    var vsBroadRunSec = vsBroadRun.substring(4, 6);
    var vsBroadRunFrm = vsBroadRun.substring(6, 8);
	var vnBroadHour = Number(vsBroadHour) + Number(vsBroadRunHour); // 12:30:40:20
    var vnBroadMin = Number(vsBroadMin) + Number(vsBroadRunMin); // 4:40:30:20
    var vnBroadSec = Number(vsBroadSec) + Number(vsBroadRunSec); // 17:11:11:10
    var vnBroadFrm = Number(vsBroadFrm) + Number(vsBroadRunFrm);
    vnBroadHour = vnBroadHour + Math.floor(vnBroadMin / 60);
    vnBroadMin = (vnBroadMin % 60) + Math.floor(vnBroadSec / 60);
    vnBroadSec = (vnBroadSec % 60) + Math.floor(vnBroadFrm / 30);
    vnBroadFrm = (vnBroadFrm % 30);

    var vsResult = "";
    if (vnBroadHour < 10) {
        vsResult += "0" + vnBroadHour;
    } else {
        vsResult += String(vnBroadHour);
    }
    if (vnBroadMin < 10) {
        vsResult += "0" + vnBroadMin;
    } else {
        vsResult += String(vnBroadMin);
    }
    if (vnBroadSec < 10) {
        vsResult += "0" + vnBroadSec;
    } else {
        vsResult += String(vnBroadSec);
    }
    if (vnBroadFrm < 10) {
        vsResult += "0" + vnBroadFrm;
    } else {
        vsResult += String(vnBroadFrm);
    }

    return vsResult;
}
/**
 * 시작시각, 운행길이로 종료시각을 가져온다
 * @param {string} psBroadHour 방송시
 * @param {string} psBroadMin 방송분
 * @param {string} psBroadSec 방송초
 * @param {string} psBroadFrm 방송프레임
 * @param {string} psBroadRunHour 운행시
 * @param {string} psBroadRunMin 운행분
 * @param {string} psBroadRunSec 운행초
 * @param {string} psBroadRunFrm 운행프레임
 * @return {string} 종료시각
 * @since 2020-04-26
 * @author sylee
 */
function calBroadEndTime(psBroadHour, psBroadMin, psBroadSec, psBroadFrm, psBroadRunHour, psBroadRunMin, psBroadRunSec, psBroadRunFrm) {
    var vnBroadHour = Number(psBroadHour) + Number(psBroadRunHour); // 12:30:40:20
    var vnBroadMin = Number(psBroadMin) + Number(psBroadRunMin); // 4:40:30:20
    var vnBroadSec = Number(psBroadSec) + Number(psBroadRunSec); // 17:11:11:10
    var vnBroadFrm = Number(psBroadFrm) + Number(psBroadRunFrm);
    vnBroadHour = vnBroadHour + Math.floor(vnBroadMin / 60);
    vnBroadMin = (vnBroadMin % 60) + Math.floor(vnBroadSec / 60);
    vnBroadSec = (vnBroadSec % 60) + Math.floor(vnBroadFrm / 30);
    vnBroadFrm = (vnBroadFrm % 30);

    var vsResult = "";
    if (vnBroadHour < 10) {
        vsResult += "0" + vnBroadHour;
    } else {
        vsResult += String(vnBroadHour);
    }
    if (vnBroadMin < 10) {
        vsResult += "0" + vnBroadMin;
    } else {
        vsResult += String(vnBroadMin);
    }
    if (vnBroadSec < 10) {
        vsResult += "0" + vnBroadSec;
    } else {
        vsResult += String(vnBroadSec);
    }
    if (vnBroadFrm < 10) {
        vsResult += "0" + vnBroadFrm;
    } else {
        vsResult += String(vnBroadFrm);
    }

    return vsResult;
}

/**
 * 입력된 편성길이에 따라 방송시각을 재조정한다
 * @since 2020-04-28
 * @author sylee
 */
function adjustBroadEndTime() {
    /** @type cpr.controls.Grid */
    var vcGrid = app.lookup("grdSch");
    var vnRowIndex = vcGrid.getSelectedRowIndex();
    var vsBroadStart = vcGrid.getRow(vnRowIndex).getValue("playTime24").toString(); // 시작시각
    var vsBroadHour = "";
    var vsBroadMin = "";
    var vsBroadSec = "";
    var vsBroadFrm = "";
    var vnBroadRun = vcGrid.getRow(vnRowIndex).getValue("playRun").toString(); // 운행시각
    var vsBroadRunHour = "";
    var vsBroadRunMin = "";
    var vsBroadRunSec = "";
    var vsBroadRunFrm = "";
    var voPreviousRow;
    var voRow;
    var vnNotSeIdx = 0;
    var vsPreSeEndTime = "";
    var playTime24 = ""; //
    var playRun = ""; //

    //방송시각 미입력
    if (vsBroadStart === "" || vsBroadStart.length < 8) {
        return;
    }
    //편성길이 미입력
    if (vnBroadRun === "" || vnBroadRun.length < 8) {
        return;
    }

    // 시작시각 시, 분, 초, 프레임
    vsBroadHour = vsBroadStart.substring(0, 2);
    vsBroadMin = vsBroadStart.substring(2, 4);
    vsBroadSec = vsBroadStart.substring(4, 6);
    vsBroadFrm = vsBroadStart.substring(6, 8);

    // 운행길이 시, 분, 초, 프레임
    vsBroadRunHour = vnBroadRun.substring(0, 2);
    vsBroadRunMin = vnBroadRun.substring(2, 4);
    vsBroadRunSec = vnBroadRun.substring(4, 6);
    vsBroadRunFrm = vnBroadRun.substring(6, 8);
	
	var vsMtrlClf = util.Grid.getCellValue(app, "grdSch", "mtrlClf", vnRowIndex);
	
	if(vsMtrlClf == "SE") {
		var voProgramRow = findNearestRow(vnRowIndex);
		var vofarthestRow = findFarthestRow(vnRowIndex);
		
		var vsPlayRun = voProgramRow.getValue("playRun");
		for(var vnIdx = voProgramRow.getIndex() ; vnIdx < vofarthestRow.getIndex();vnIdx++){
			
			vcGrid.getRow(vnIdx);
//TODO
//			subtractRunTime(vsBroadStart, vsBroadRun)
			
			
		}
		
	} else {
		var vaAllRows = vcGrid.findAllRow("mtrlClf != 'SE' && getIndex() >"+vnRowIndex);
		var voSelectRow = vcGrid.getRow(vnRowIndex);

		var tempRow = voSelectRow;
		vaAllRows.forEach(function(each,idx){
			playTime24 = tempRow.getValue("playTime24");
			playRun = tempRow.getValue("playRun");
			vsPreSeEndTime = calcBroadEndTimeSimple(playTime24, playRun);
        	each.setValue("playTime24", vsPreSeEndTime);
				tempRow = each;
		});
	}
//    for (var i = vnRowIndex + 1, length = vcGrid.rowCount; i < length; i++) {
//    	
//		    	
//    	var vnSelectedIndex = util.Grid.getCheckOrSelectedRowIndex(app, ["grdSch"]);
//    	
////   			findNearestRow(vnSelectedIndex);	
//        voPreviousRow = findRowExcludeSE(vcGrid, i); //vcGrid.getRow(i-1); // 전 로우
//        playTime24 = voPreviousRow.getValue("playTime24");//시작시간
//        playRun = voPreviousRow.getValue("playRun");//운행시간
//        voRow = vcGrid.getRow(i); // 다음 로우
//
//        vsBroadHour = playTime24.substring(0, 2);
//        vsBroadMin = playTime24.substring(2, 4);
//        vsBroadSec = playTime24.substring(4, 6);
//        vsBroadFrm = playTime24.substring(6, 8);
//        vsBroadRunHour = playRun.substring(0, 2);
//        vsBroadRunMin = playRun.substring(2, 4);
//        vsBroadRunSec = playRun.substring(4, 6);
//        vsBroadRunFrm = playRun.substring(6, 8);
//
//
//        vsPreSeEndTime = calBroadEndTime(vsBroadHour, vsBroadMin, vsBroadSec, vsBroadFrm, vsBroadRunHour, vsBroadRunMin, vsBroadRunSec, vsBroadRunFrm);
//        voRow.setValue("playTime24", vsPreSeEndTime);
//    }
}

/**
 * 선택된행에서 부터 가장 가까운 프로그램(SE가 아닌 행)을 찾는 함수
 * @param {Number} vnRowIdx
 */
function findNearestRow(vnRowIdx){
	
	var rows ;
	var index  = vnRowIdx;
	
	while(util.Grid.getCellValue(app, "grdSch", "mtrlClf", index) == "SE"){
		index--;
	}
	
	return app.lookup("grdSch").getRow(index);
}
/**
 * 선택된행에서 부터 가장 먼 서브이벤트(SE)를 찾는 함수
 * @param {Number} vnRowIdx
 */
function findFarthestRow(vnRowIdx) {

	var rows;
	var index = vnRowIdx;
	
	while(util.Grid.getCellValue(app, "grdSch", "mtrlClf", index) == "SE") {
		index++;
	}	
	
	return app.lookup("grdSch").getRow(index-1);
}

/**
 * 요일 구하는 함수
 */
function getDayNm(Ymd) {
    var weekName = new Array('일', '월', '화', '수', '목', '금', '토');
    var year = Ymd.substring(0, 4);
    var month = Ymd.substring(4, 6);
    var day = Ymd.substring(6, 8);
    var week = new Date(year, month - 1, day, 0, 0, 0, 0);

    week = weekName[week.getDay()];

    return week;
}

/**
 * 다음날 or 전날 이동
 */
function dateCalc(Ymd, n) {
    var year = Ymd.substring(0, 4);
    var month = Ymd.substring(4, 6);
    var day = Ymd.substring(6, 8);
    var tDate = new Date(year, month - 1, day);
    var convMonth = "";
    var convDay = "";
    var setDate = "";

    if (n == 1) {
        // 날짜(일) 더하기
        tDate.setDate(tDate.getDate() + 1);
    } else if (n == 2) {
        // 날짜(일) 빼기
        tDate.setDate(tDate.getDate() - 1);
    }

    if (tDate.getMonth() + 1 < 10) {
        convMonth = "0" + (tDate.getMonth() + 1);
    } else {
        convMonth = (tDate.getMonth() + 1).toString();
    }

    if (tDate.getDate() < 10) {
        convDay = "0" + tDate.getDate();
    } else {
        convDay = tDate.getDate().toString();
    }

    setDate = tDate.getFullYear().toString() + convMonth + convDay;

    return parseInt(setDate, 10);
}

///**
// * SE 일전체 생성 함수
// */
//function seTotalCreate() {
//	var sChkHm = "";
//	var nStartRow = 0;
//	var nSumCount = 0;
//	var nRowCount = app.lookup("grdSch").getRowCount();
//	var nMainRow = 0;
//	var sMtrlClf = "";
//	var sDuration = "";
//	var sBrdHm = "";
//	var nFRow1 = 0;
//	var nFRow2 = 0;
//	var sSetClf = "";
//	var nSubCount = 0;
//	
//	// 일일운행표 SE 생성 전 전체 ROW에 대해 조건 검색
//	for (var i = 0; i < nRowCount; i++) {
//		nMainRow = i; // ROW의 INDEX
//		sMtrlClf = app.lookup("grdSch").getRow(i).getValue("mtrlClf");
//		sDuration = app.lookup("grdSch").getRow(i).getValue("duration");
//		sBrdHm = app.lookup("grdSch").getRow(i).getValue("broadHm");
//		
//		// 이전행과 편성시각 동일여부 체크
//		if (sBrdHm != sChkHm) {
//			nStartRow = i;
//		}
//		
//		// SE, CT, CC는 SKIP
//		if (sMtrlClf == "SE" || sMtrlClf == "CT" || sMtrlClf == "CC") {
//			continue;
//		}
//		
//		// 길이가 0인 이벤트 SKIP
//		if (sDuration == "00000000") {
//			continue;
//		}
//		/******************** 순방향 검색 시작 ********************/
//		/******************** 기준편성시각 바뀌고 첫번째인 경우 ********************/
//		if (nStartRow == i) {
//			nFRow1 = 0;
//			for (var j = i + 1; j < nRowCount; j++) {
//				
//				if (app.lookup("grdSch").getRow(j).getValue("mtrlClf") == sMtrlClf && app.lookup("grdSch").getRow(j).getValue("broadHm") == sBrdHm) {
//					nFRow2 = j;
//					break;
//				}
//			}
//		} else if (nRowCount == i) {
//			nFRow2 = 0;
//			for (var j = nStartRow; j < i; j++) {
//				
//				if (app.lookup("grdSch").getRow(j).getValue("mtrlClf") == sMtrlClf && app.lookup("grdSch").getRow(j).getValue("broadHm") == sBrdHm) {
//					nFRow1 = j;
//					break;
//				}
//			}
//		} else {
//			for (var j = nStartRow; j < i; j++) {
//				
//				if (app.lookup("grdSch").getRow(j).getValue("mtrlClf") == sMtrlClf && app.lookup("grdSch").getRow(j).getValue("broadHm") == sBrdHm) {
//					nFRow1 = j;
//					break;
//				}
//			}
//			
//			for (var j = i + 1; j < nRowCount; j++) {
//				
//				if (app.lookup("grdSch").getRow(j).getValue("mtrlClf") == sMtrlClf && app.lookup("grdSch").getRow(j).getValue("broadHm") == sBrdHm) {
//					nFRow2 = j;
//					break;
//				}
//			}
//		}
//		/******************** 순방향 검색 종료 ********************/
//		
//		sSetClf = sMtrlClf.substring(0, 3); // 0, 1, 2
//		
//		/******************** 첫 번째 소재 ********************/
//		if (nFRow1 == 0) {
//			nSubCount = wfSecond(i, nMainRow, "1", sSetClf, sDuration, "");
//		}
//		
//		nRowCount += nSubCount;
//		i += nSubCount;
//		nSubCount = 0;
//		
//		/******************** 모든 소재 ********************/
//		nSubCount = wfSecond(i, nMainRow, "0", sSetClf, sDuration, "");
//		nRowCount += nSubCount;
//		i += nSubCount;
//		nSubCount = 0;
//		
//		/******************** 중간 소재 ********************/
//		if ((nFRow1 > 0 && nFRow2 > 0) || (nFRow1 == 0 && nFRow2 > 0)) {
//			nSubCount = wfSecond(i, nMainRow, "2", sSetClf, sDuration, "");
//		}
//		
//		nRowCount += nSubCount;
//		i += nSubCount;
//		nSubCount = 0;
//		
//		/******************** 마지막 소재 ********************/
//		if (nFRow2 == 0 || i == nRowCount) {
//			nSubCount = wfSecond(i, nMainRow, "9", sSetClf, sDuration, "");
//		}
//		
//		nRowCount += nSubCount;
//		i += nSubCount;
//		nSubCount = 0;
//		
//		sChkHm = sBrdHm;
//	}
//}
//
///**
// * SE 추가를 위한 ROW 추가 함수
// */
//function wfSecond(aNRow, aNStartRow, aSType, aSClf, aSRun, aSTmplId) {
//	// aNRow : 운행표의 행 번호(number)
//	// aNStartRow : 운행표의 메인이벤트 행 번호(number)
//	// aSType : 적용대상 0전체, 1처음, 2중간, 9마지막 (String)
//	// aSClf : 소재구분 (String)
//	// aSRun : 메인이벤트운행길이 (String)
//	// aSTmplId : 서브이벤트 템플릿아이디 (자동생성시에는 공백으로 받음)
//	
//	var sChanId = app.lookup("dsPlayList").getValue(0, "chanId");
//	var sMtrlClf = aSClf;
//	var sDuration = aSRun;
//	var nMainRow = aNStartRow;
//	
//	var sDelibGrd = app.lookup("grdSch").getRow(nMainRow).getValue("delibGrade");
//	var grdRowCount = app.lookup("grdSch").getRowCount();
//	var sNextClf = "";
//	var sPreClf = "";
//	var sMode = "";
//	var sTrffId = "";
//	var sRegClf = "";
//	var sTmplId = "";
//	var nRowCount = 0;
//	var nRowCount2 = 0;
//	var nRow = 0;
//	var sGradeYn = "";
//	var sGradeList = "";
//	var sSumRun = "";
//	var sCheckRun = "";
//	var sStartType = "";
//	var sDevice = "";
//	var sDevInfo = "";
//	var sEpsdYn = "";
//	var sEventNm = "";
//	var sEventInfo = "";
//	var sLogoId = "";
//	var sCgId = "";
//	var sRun = "";
//	
//	if (sDelibGrd == "null") {
//		sDelibGrd = "00";
//	}
//	
//	for (var i = nMainRow; i < grdRowCount; i++) {
//		
//		if (app.lookup("grdSch").getRow(i).getValue("mtrlClf") != "CC" && app.lookup("grdSch").getRow(i).getValue("mtrlClf") != "SE") {
//			sNextClf = app.lookup("grdSch").getRow(i).getValue("mtrlClf");
//			break;
//		}
//	}
//	
//	for (var i = nMainRow - 1; i >= 0; i--) {
//		
//		if (app.lookup("grdSch").getRow(i).getValue("mtrlClf") != "CC" && app.lookup("grdSch").getRow(i).getValue("mtrlClf") != "SE") {
//			sPreClf = app.lookup("grdSch").getRow(i).getValue("mtrlClf");
//			break;
//		}
//	}
//	
//	if (sMtrlClf == "99") {
//		sMode = "none";
//	} else {
//		sPreClf = sPreClf.substring(0,3);
//		sNextClf = sNextClf.substring(0,3);
//		
//		if (sMtrlClf == sPreClf || sMtrlClf == sNextClf) {
//			sMode = "none";
//		} else {
//			sMode = "stop";
//		}
//	}
//	
//	app.lookup("dmPlayIdForMax").setValue("chanId", sChanId);
//	app.lookup("dmPlayIdForMax").setValue("mtrlClf", sMtrlClf);
//	app.lookup("dmPlayIdForMax").setValue("objClf", aSType);
//	app.lookup("dmPlayIdForMax").setValue("useYn", "Y");
//	
//	util.Submit.send(app, "smsMaxPlayIdSet", function(pbSuccess){
//		if(pbSuccess){
//			app.lookup("dmTemplateAll").clear(false);
//			// 소재구분에 따른 운행 ID 가져오기
//			sTrffId = app.lookup("dsMaxPlayId").getValue(0, "maxPlayId");
//			
//			if (sTrffId == null || sTrffId == "") {
//				return 0;
//			}
//			
//			app.lookup("dmTemplateAll").setValue("chanId", sChanId);
//			app.lookup("dmTemplateAll").setValue("playId", sTrffId);
//			app.lookup("dmTemplateAll").setValue("useYn", "Y");
//			
//			if (sMtrlClf == "99") {
//				sRegClf = "M";
//				app.lookup("dmTemplateAll").setValue("templateId", aSTmplId);
//			} else {
//				sRegClf = "A";
//			}
//			
//			util.Submit.send(app, "smsTemplateMst", function(pbSuccess){
//				if(pbSuccess){
//					nRowCount = app.lookup("dsTemplateMst").getRowCount();
//					
//					nRow = 0;
//						
//					for (var i = 0; i < nRowCount; i++) {
//						sGradeYn = app.lookup("dsTemplateMst").getValue(i, "gradeYn");
//						sGradeList = app.lookup("dsTemplateMst").getValue(i, "gradeList");
//						
//						if (sGradeYn == "Y" && sGradeList != sDelibGrd) { 
//							continue;
//						}
//						
//						sTmplId = app.lookup("dsTemplateMst").getValue(i, "templateId");
//						
//						// 운행 템플릿에 등록된 상세 편성정보 가져오기
//						util.Submit.send(app, "smsTemplateDtl", function(pbSuccess){
//							if(pbSuccess){
//								nRowCount2 = app.lookup("dsTemplateDtl").getRowCount();
//								sSumRun = app.lookup("dsTemplateMst").getValue(i, "beginTime");
//								sCheckRun = fTimeMns("FF", sDuration, app.lookup("dsTemplateMst").getValue(i, "endTime"));
//								
//								if (app.lookup("dsTemplateMst").getValue(i, "repeatYn") == "Y") {
//									
//									do {
//										
//										for (var ii = 0; ii < nRowCount2; ii++) {
//											sStartType = app.lookup("dsTemplateDtl").getValue(ii, "startType");
//											sSumRun = fTimeAdd("FF", sSumRun, app.lookup("dsTemplateDtl").getValue(ii, "playTime"));
//											sDevice = app.lookup("dsTemplateDtl").getValue(ii, "deviceId");
//											
//											app.lookup("dmDeviceInfo").setValue("chanId", sChanId);
//											app.lookup("dmDeviceInfo").setValue("deviceId", sDevice);
//											
//											util.Submit.send(app, "smsDeviceInfoSet", function(pbSuccess){
//												if(pbSuccess){
//													sDevInfo = app.lookup("dsDeviceInfo").getValue(0, "deviceInfo2");
//													sEpsdYn = app.lookup("dsTemplateDtl").getValue(ii, "episodeYn");
//													
//													if (sEpsdYn == "" || sEpsdYn == null) {
//														sEpsdYn = "N";	
//													}
//													
//													sEventNm = wfData(ii, app.lookup("dsTemplateDtl").getValue(ii, "eventNm"), nMainRow, sEpsdYn);
//													sEventInfo = app.lookup("dsTemplateDtl").getValue(ii, "eventInfo");
//													sLogoId = wfData(ii, app.lookup("dsTemplateDtl").getValue(ii, "logoId"), nMainRow, sEpsdYn); // 수정 필요해보임
//													sCgId = wfData(ii, app.lookup("dsTemplateDtl").getValue(ii, "cgId"), nMainRow, sEpsdYn);
//													
//													if (sCheckRun > sSumRun) {
//														sRun = app.lookup("dsTemplateDtl").getValue(ii, "trffRun");
//														
//														if (fTimeMns("FF", sCheckRun, sSumRun) < sRun) {
//															sRun = fTimeMns("FF", sCheckRun, sSumRun);
//														}
//														
//														// 메인행을 복사하여  새로운 행을 만든다.
//														nRow += 1;
//														
//														app.lookup("grdSch").insertRowData(aNRow + nRow - 1, true, app.lookup("grdSch").getRow(aNRow).getRowData());
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlClf", "SE");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("startType", app.lookup("dsTemplateDtl").getValue(ii, "startType"));
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("playTime", sSumRun);
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("playRun", sRun);
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlId", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("tapeId", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("som", "00000000");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("duration", "00000000");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlNm", sEventNm);
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlInfo", sLogoId);
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("cgId", sCgId);
//														
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("deviceId", app.lookup("dsTemplateDtl").getValue(ii, "deviceId"));
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventCtrl", app.lookup("dsTemplateDtl").getValue(ii, "eventCtrl"));
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventTrns", app.lookup("dsTemplateDtl").getValue(ii, "eventTrns"));
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventRate", app.lookup("dsTemplateDtl").getValue(ii, "eventRate"));
//														
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventOut", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventTyp", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("audioClf", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("delibGrade", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("gpiId1", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("gpiId2", "");
//														app.lookup("grdSch").getRow(aNRow + nRow).setValue("subAutoYn", "Y");
//														
//														sSumRun = fTimeAdd("FF", sSumRun, sRun);
//													}
//												}
//											});
//										}
//									} while (sSumRun <= sCheckRun)
//								} else {
//									
//									for (var ii = 0; ii < nRowCount2; ii ++) {
//										
//										sStartType = app.lookup("dsTemplateDtl").getValue(ii, "startType");
//										sSumRun = fTimeAdd("FF", sSumRun, app.lookup("dsTemplateDtl").getValue(ii, "playTime"))
//										sDevice = app.lookup("dsTemplateDtl").getValue(ii, "deviceId");
//										
//										app.lookup("dmDeviceInfo").setValue("chanId", sChanId);
//										app.lookup("dmDeviceInfo").setValue("deviceId", sDevice);
//										
//										util.Submit.send(app, "smsDeviceInfoSet", function(pbSuccess){
//											
//											if(pbSuccess){
//												sDevInfo = app.lookup("dsDeviceInfo").getValue(0, "deviceInfo2");
//												sEpsdYn = app.lookup("dsTemplateDtl").getValue(ii, "episodeYn");
//												
//												if (sEpsdYn == "" || sEpsdYn == null) {
//													sEpsdYn = "N";
//												}
//												
//												sEventNm = wfData(ii, app.lookup("dsTemplateDtl").getValue(ii, "eventNm"), nMainRow, sEpsdYn);
//												sEventInfo = app.lookup("dsTemplateDtl").getValue(ii, "eventInfo");
//												sLogoId = wfData(ii, app.lookup("dsTemplateDtl").getValue(ii, "logoId"), nMainRow, sEpsdYn); // 수정 필요해보임
//												sCgId = wfData(ii, app.lookup("dsTemplateDtl").getValue(ii, "cgId"), nMainRow, sEpsdYn);
//												
//												if (sLogoId.toUpperCase() == "NONE") {
//													continue;
//												}
//												if (sCgId.toUpperCase() == "NONE") {
//													continue;
//												}
//												
//												// 메인행을 복사하여 새로운 행을 만든다
//												nRow += 1;
//												
//												app.lookup("grdSch").insertRowData(aNRow + nRow - 1, false, app.lookup("grdSch").getRow(aNRow).getRowData());
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlClf", "SE");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("startType", app.lookup("dsTemplateDtl").getValue(ii, "startType"));
//												
//												if (ii == 0) {
//													app.lookup("grdSch").getRow(aNRow + nRow).setValue("playTime", sSumRun);
//												} else {
//													app.lookup("grdSch").getRow(aNRow + nRow).setValue("playTime", app.lookup("dsTemplateDtl").getValue(ii, "playTime"));
//												}
//												
//												if (app.lookup("grdSch").getRow(ii).getValue("autoCalYn") == "Y") {
//													
//													if (ii == 1) {
//														sRun = fTimeMns("FF", app.lookup("dsTemplateDtl").getValue(ii, "playTime"), sCheckRun);
//														sRun = fTimeMns("FF", sRun, app.lookup("dsTemplateDtl").getValue(ii, "playRun"));
//													} else {
//														sRun = fTimeMns("FF", app.lookup("dsTemplateDtl").getValue(ii, "playTime"), app.lookup("dsTemplateMst").getValue(ii, "endTime"));
//													}
//												} else {
//													
//													if (ii == 1) {
//														sRun = fTimeMns("FF", app.lookup("dsTemplateDtl").getValue(ii, "playTime"), sDuration);
//														sRun = fTimeMns("FF", sRun, app.lookup("dsTemplateDtl").getValue(ii, "playRun"));
//													} else {
//														sRun = fTimeMns("FF", app.lookup("dsTemplateDtl").getValue(ii, "playTime"), app.lookup("dsTemplateMst").getValue(ii, "endTime"));
//													}
//												}
//												
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("playRun", sRun);
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlId", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("tapeId", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("som", "00000000");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("duration", "00000000");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlNm", sEventNm);
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("mtrlInfo", sLogoId);
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("cgId", sCgId);
//													
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("deviceId", app.lookup("dsTemplateDtl").getValue(ii, "deviceId"));
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventCtrl", app.lookup("dsTemplateDtl").getValue(ii, "eventCtrl"));
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventTrns", app.lookup("dsTemplateDtl").getValue(ii, "eventTrns"));
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventRate", app.lookup("dsTemplateDtl").getValue(ii, "eventRate"));
//													
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventOut", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventTyp", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("audioClf", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("delibGrade", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("gpiId1", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("gpiId2", "");
//												app.lookup("grdSch").getRow(aNRow + nRow).setValue("subAutoYn", "Y");
//												
//												if (app.lookup("dsTemplateDtl").getValue(ii, "eventCtrl") == "0" && sMode =="stop") {
//													app.lookup("grdSch").getRow(aNRow + nRow).setValue("eventCtrl", "1");
//													app.lookup("grdSch").getRow(aNRow + nRow).setValue("playRun", fTimeMns("FF", aSRun, app.lookup("grdSch").getRow(aNRow + nRow).getValue("playTime")));
//												}
//											}
//										});
//									}
//								}
//							}
//						});
//					}
//				}
//			});
//		}
//	});
//}

/**
 * SE 추가를 위한 데이터 삽입 함수
 */
function wfData(aNRow, aSColName, aNMainRow, aEpsdYn) {
    // aNRowE : 템플릿의 행번호
    // aSColName : 컬럼명
    // aNMainRow : 운행표행번호
    // aEpsdYn : 회차관리여부

    var sData = "";
    var nFRow = 0;
    var sDataUpper = "";
    var sReturn = "";
    var sMtrlClf = app.lookup("grdSch").getRow(aNMainRow).getValue("mtrlClf");

    if (aSColName.toUpperCase() == "LOGO_ID") {
        sData = app.lookup("dsTemplateDtl").getValue(aNRow, "logoId");
    } else if (aSColName.toUpperCase() == "CG_ID") {
        sData = app.lookup("dsTemplateDtl").getValue(aNRow, "cgId");
    } else if (aSColName.toUpperCase() == "EVENT_NM") {
        sData = app.lookup("dsTemplateDtl").getValue(aNRow, "eventNm");
    } else {
        sData = "";
    }

    if (sData == "" || sData == null) {
        return "";
    }

    app.lookup("dmSearchRow").setValue("broadYmd", app.lookup("grdSch").getRow(aNMainRow).getValue("playYmd"));
    app.lookup("dmSearchRow").setValue("pgmId", app.lookup("grdSch").getRow(aNMainRow).getValue("pgmId"));
    app.lookup("dmSearchRow").setValue("broadYmd", app.lookup("grdSch").getRow(aNMainRow).getValue("broadHm"));
    // 조건 추가해야 할 것으로 보임////////////////////////////////////////////////////////

    util.Submit.send(app, "smsSearchRow", function(pbSuccess) {

        var vnRowCount = app.lookup("dsSearchRow").getRowCount();

        if (pbSuccess) {

            for (var i = 0; i < vnRowCount; i++) {

                if (app.lookup("dsSearchRow").getValue(i, "broadYmd") == app.lookup("grdSch").getRow(aNMainRow).getValue("playYmd") && app.lookup("dsSearchRow").getValue(i, "pgmId") == app.lookup("grdSch").getRow(aNMainRow).getValue("pgmId") && app.lookup("dsSearchRow").getValue(i, "broadHm") == app.lookup("grdSch").getRow(aNMainRow).getValue("broadHm")) {
                    nFRow = i;
                    break;
                }
            }

            sDataUpper = sData.toUpperCase();

            if (sDataUpper.substring(0, 5) == "@AUTO" || sDataUpper.substring(0, 9) == "@CM_CG_ID") {

                if (right(sData, 2) == "/N") {
                    nFRow += 1;
                    sReturn = app.lookup("dsSearchRow").getValue(nFRow, "cgIdCm");

                    if (sReturn == null) {
                        sReturn = "익일미편성";
                        return;
                    }
                }

                if (nFRow == 0) {
                    sReturn = "미편성";
                    return;
                } else {

                    if (sMtrlClf.substring(0, 2) == "CM") {
                        sReturn = app.lookup("dsSearchRow").getValue(nFRow, "cgIdCm");
                    } else if (sMtrlClf.substring(0, 2) == "ZP") {
                        sReturn = app.lookup("dsSearchRow").getValue(nFRow, "cgIdProgram");
                    }
                }
            } else if (sDataUpper.substring(0, 8) == "TITLE_NM") {
                sReturn = app.lookup("dsSearchRow").getValue(nFRow, "pgmNm") + "" + sData;
            } else {
                sReturn = sData;
            }

            return sReturn;
        }
    });
}

// RIGHT substring 함수
function right(s, c) {
    return s.substr(-c);
} //right("abcd",2)

// MID substring 함수
function mid(s, c, l) {
    return s.substring(c, l);
} //mid("abcd",1,2)

// MOD 함수
function mod(n, m) {
    return ((n % m) + m) % m;
}

/**
 * SE 추가 시 시간 뺄셈을 위한 함수
 */
function fTimeMns(aSTyp, aSTime1, aSTime2) {
    var sTmp = "";
    var iHH = 0;
    var iMM = 0;
    var iSS = 0;
    var iFF = 0;
    var iHH1 = 0;
    var iMM1 = 0;
    var iSS1 = 0;
    var iFF1 = 0;
    var iHH2 = 0;
    var iMM2 = 0;
    var iSS2 = 0;
    var iFF2 = 0;
    var sRet = "";

    if (aSTime1 == null || aSTime1 == "") {
        aSTime1 = "00000000";
    } else if (aSTime2 == null || aSTime2 == "") {
        aSTime2 = "00000000";
    }

    if (aSTime1 < aSTime2) {
        sTmp = aSTime1;
        aSTime1 = aSTime2;
        aSTime2 = sTmp;
    }

    iHH1 = Number(mid(aSTime1, 0, 2)) + 24;
    iMM1 = Number(mid(aSTime1, 2, 2));
    iSS1 = Number(mid(aSTime1, 4, 2));
    iFF1 = Number(mid(aSTime1, 6, 2));

    if (iMM1 == 0) {
        iMM1 += 60;
        iHH1--;
    }

    if (iSS1 == 0) {
        iSS1 += 60;
        iMM1--;

        if (iMM1 == 0) {
            iMM1 += 60;
            iHH1--;
        }
    }

    if (iFF1 == 0) {
        iFF1 += 30;
        iSS1--;

        if (iSS1 == 0) {
            iSS1 += 60;
            iMM1--;

            if (iMM1 == 0) {
                iMM1 += 60;
                iHH1--;
            }
        }
    }

    iHH2 = Number(mid(aSTime2, 0, 2)) + 24;
    iMM2 = Number(mid(aSTime2, 2, 2));
    iSS2 = Number(mid(aSTime2, 4, 2));
    iFF2 = Number(mid(aSTime2, 6, 2));

    // frame 계산
    if (iFF1 < iFF2) {
        iFF1 += 30;
        iSS1--;
    }

    // 초 계산
    if (iSS1 < iSS2) {
        iSS1 += 60;
        iMM1--;
    }

    // 분 계산
    if (iMM1 < iMM2) {
        iMM1 += 60;
        iHH1--;
    }

    iFF = iFF1 - iFF2;
    iSS = iSS1 - iSS2;
    iMM = iMM1 - iMM2;
    iHH = iHH1 - iHH2;

    if (iFF >= 30) {
        iSS += Math.trunc(iFF / 30);
        iFF = mod(iFF, 30);
    }

    if (iSS >= 60) {
        iMM += Math.trunc(iSS / 60);
        iSS = mod(iSS, 60);
    }

    if (iMM >= 60) {
        iHH += Math.trunc(iMM / 60);
        iMM = mod(iMM, 60);
    }

    sRet = String(iHH, "00") + String(iMM, "00") + String(iSS, "00") + String(iFF, "00")

    return sRet;
}

/**
 * SE 추가 시 시간 덧셈을 위한 함수
 */
function fTimeAdd(aSTyp, aSTime1, aSTime2) {
    var sTmp = "";
    var iHH = 0;
    var iMM = 0;
    var iSS = 0;
    var iFF = 0;
    var iHH1 = 0;
    var iMM1 = 0;
    var iSS1 = 0;
    var iFF1 = 0;
    var iHH2 = 0;
    var iMM2 = 0;
    var iSS2 = 0;
    var iFF2 = 0;
    var sRet = "";
    var iCalFrame1 = 0;
    var iCalFrame2 = 0;
    var iCalFrame = 0;
    var iRevFrame = 0;

    if (aSTime1 == null || aSTime1 == "") {
        aSTime1 = "00000000";
    } else if (aSTime2 == null || aSTime2 == "") {
        aSTime2 = "00000000";
    }

    if (aSTyp == "DF") {
        iHH1 = Number(mid(aSTime1, 0, 2));
        iMM1 = Number(mid(aSTime1, 2, 2)) + (iHH1 * 60);
        iSS1 = Number(mid(aSTime1, 4, 2));
        iFF1 = Number(mid(aSTime1, 6, 2));

        iHH2 = Number(mid(aSTime2, 0, 2));
        iMM2 = Number(mid(aSTime2, 2, 2)) + (iHH2 * 60);
        iSS2 = Number(mid(aSTime2, 4, 2));
        iFF2 = Number(mid(aSTime2, 6, 2));

        // frame을 계산할 때에는 1분을 1798frame으로 계산
        iCalFrame1 = iMM1 * 1798 + (Math.trunc(iMM1 / 10) * 2) + (iSS1 * 30) + iFF1 + 1;
        iCalFrame2 = iMM2 * 1798 + (Math.trunc(iMM2 / 10) * 2) + (iSS2 * 30) + iFF2 + 1;

        iCalFrame = iCalFrame1 + iCalFrame2 - 1;

        iMM = Math.trunc(iCalFrame / 1798);

        iRevFrame = Math.trunc(iMM / 10) * 2;

        if ((mod(iCalFrame, 1798) - iRevFrame - 1) < 0) {
            iMM--;
            iRevFrame = Math.trunc(iMM / 10) * 2;
            iCalFrame = mod(iCalFrame, 1798) + 1798 - iRevFrame - 1;
        } else {
            iCalFrame = mod(iCalFrame, 1798) - iRevFrame - 1;
        }

        iHH = Math.trunc(iMM / 60);
        iMM = mod(iMM, 60);
        iSS = Math.trunc(iCalFrame / 30);
        iFF = mod(iCalFrame, 30);

        sRet = String(iHH, "00") + String(iMM, "00") + String(iSS, "00") + String(iFF, "00")
    } else {
        iHH1 = Number(mid(aSTime1, 0, 2));
        iMM1 = Number(mid(aSTime1, 2, 2));
        iSS1 = Number(mid(aSTime1, 4, 2));

        iHH2 = Number(mid(aSTime2, 0, 2));
        iMM2 = Number(mid(aSTime2, 2, 2));
        iSS2 = Number(mid(aSTime2, 4, 2));

        if (aSTyp == "FF" || aSTyp == "NF") {
            iFF1 = Number(mid(aSTime1, 6, 2));
            iFF2 = Number(mid(aSTime2, 6, 2));

            iSS = Math.trunc((iFF1 + iFF2) / 30);
            iFF = mod((iFF1 + iFF2), 30);
        }

        iMM = Math.trunc((iSS + iSS1 + iSS2) / 60);
        iSS = mod((iSS + iSS1 + iSS2), 60);

        iHH = Math.trunc((iMM + iMM1 + iMM2) / 60);
        iMM = mod((iMM + iMM1 + iMM2), 60);

        iHH = iHH + iHH1 + iHH2;

        if (iHH >= 24) {
            iHH -= 24;
        }

        sRet = String(iHH, "00") + String(iMM, "00") + String(iSS, "00");

        if (aSTyp == "FF" || aSTyp == "NF") {
            sRet += String(iFF, "00");
        }
    }
    return sRet;
}

/**
 * 공통 코드 및 초기 조회
 */
function doListCmmn() {

    //초기 파라미터 세팅
    var voParams = [
        ["dsPlayNo", "BSSC211", "", ""], //운행안번호
        ["dsEventTyp", "BSSC705", "", ""], //Type
        ["dsStartTyp", "BSSC703", "", ""], //시작
        ["dsGpiId1", "BSSC710", "", ""], //큐톤신호
        ["dsMtrlClf", "BSSC720", "", ""], //소재구분
        //		["dsDeviceId"	, "BSSC008"	, ""	, ""], //송출소스
        ["dsBrdType", "BSSC310", "", ""], //송출구분
        ["dsEventCtrl", "BSSC706", "", ""], //Control
        ["dsDelibGrade", "BSSC001", "", ""], //심의등급
        ["dsBroadClf", "BSSC210", "", ""], //방송구분
        ["dsFirstClf", "BSSC214", "", ""], //초방구분
        ["dsCmNotCd", "BSCM200", "", ""], //광고불가
        ["dsVideoClf", "BSSC014", "", ""], //화질
        ["dsAudioClf", "BSCO901", "", ""], //Audio
        ["dsEventOut", "BSSC704", "", ""], //Output
        ["dsEventTrns", "BSSC707", "", ""], //Transition
        ["dsEventRate", "BSSC708", "", ""], //Rate
        ["dsCmClf", "BSCM003", "", ""], //광고구분
        ["dsPibClf", "BSCM044", "", ""], //광고위치
        ["dsMtrlClf1", "BSLB801", "", ""] //소재구분1
    ];

    util.Submit.send(app, "subExbBisCodeList", function(pbSuccess) {
        if (pbSuccess) {
            app.lookup("cmbPlayNo").selectItem(0);
            app.lookup("cmbPlayNo").redraw();
        }
    }, voParams);
}

/** 
 * 드래그 대상 컨트롤 설정
 * @param {cpr.controls.Grid} setControl 
 */
function setDragSource(setControl) {
    var feedback = null;

    //드래그 대상 컨트롤(그리드)
    var control = setControl;

    var actualRect = null;

    new cpr.controls.DragSource(control, {
        options: {
            threadhold: 10
        },


        onDragStart: function(context) {
            context.cursor = "grabbing";

            var gridData = context.source.detail;

            var data = gridData.row.getRowData();
            context.data = {
                sourceRowIndex: gridData.rowIndex,
                rowData: data
            };
            feedback = createDragSourceFeedback(data);

            control.style.css("opacity", "0.5");
            var nowXY = context.dragStartLocation;
            actualRect = new cpr.geometry.Rectangle(nowXY.x, nowXY.y, 450, 80);
            app.getRootAppInstance().floatControl(feedback, actualRect);

        },

        onDragMove: function(context) {
            context.cursor = "grabbing"
            var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
            app.getRootAppInstance().floatControl(feedback, newRect);

        },

        onDragEnd: function(context) {
            context.cursor = "";
            feedback.dispose();
            feedback = null;
            control.style.removeStyle("opacity");
        }
    });
}

/** 
 * 드래그 받는대상 컨트롤 설정
 * @param {cpr.controls.Grid} setUpGrid 
 */
function setDropTarget(setUpGrid) {

    var setTarget = setUpGrid;

    var actualRect = null;

    new cpr.controls.DropTarget(setTarget, {

        onDrop: function(context) {
            var sourcedata = context.source;

            var targetdata = context.target;

            var sourceRowData = context.data;

            var grid = setTarget;

            var targetDetail = targetdata.detail;

            var vsTargetTime = grid.getRow(targetDetail.rowIndex).getValue("playRun");
            var vsSoucreTime = sourceRowData["duration"];

            grid.updateRow(targetDetail.rowIndex, sourceRowData);

            grid.getRow(targetDetail.rowIndex).setValue("playRun", vsSoucreTime);

            grid.selectRows(targetDetail.rowIndex);

            adjustBroadEndTime();

            //			if (checkPlayRunTime( vsTargetTime , vsSoucreTime) ){
            //				grid.updateRow(targetDetail.rowIndex , sourceRowData);
            //			}else{
            //				alert("드래그할 프로그램의 운행길이가 큽니다.");
            //			}


        },

        onDragEnter: function(context) {

            var targetdata = context.target;
            var targetDetail = null;
            if (targetdata.control) {
                targetDetail = targetdata.detail;
            }
        },

        onDragMove: function(context) {

            /** @type cpr.controls.Grid */
            var targetGrid = null;

            if (context.target.control instanceof cpr.controls.Grid) {
                targetGrid = context.target.control;
            }

        }
    });

}

/** @param {String} targetTime
 *  @param {String} sourceTime
 *  @return {Boolean} {true : 드래그했을때 드래그 소스가 타겟보다 운행길이가 짧았을 때 }
 */
function checkPlayRunTime(targetTime, sourceTime) {

    var vsTarget = parseInt(targetTime);
    var vsSource = parseInt(sourceTime);

    if (vsTarget >= vsSource) {
        return true;
    } else {
        return false;
    }

}

/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;

    //var vsCh = app.lookup("cmbChan").value;
    var vsDate = app.lookup("dtiDaily").value;

    if (vsDate == "") {
        alert("운행일자를 제대로 입력해주세요.")
    } else {
        app.lookup("smsPlayListSet").send();
        loadConfirmList();
    }
}


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
    setDragSource(app.lookup("grdPlMtrl"));
    setDragSource(app.lookup("grdPgmMtrl"));
    setDragSource(app.lookup("grdCmMtrl"));
    setDropTarget(app.lookup("grdSch"));
}


/*
 * 트리 셀에서 node-open 이벤트 발생 시 호출.
 * TreeCell 노드가 확장 될 때 발생하는 이벤트.
 */
function onTreeCellNodeOpen( /* cpr.events.CTreeCellEvent */ e) {
    /** 
     * @type cpr.controls.gridpart.renderer.TreeCell
     */
    var treeCell = e.control;
    app.lookup("grdSch").redraw();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms2SubmitDone( /* cpr.events.CSubmissionEvent */ e) {
    /** 
     * @type cpr.protocols.Submission
     */
    var sms2 = e.control;
    for (var i = 0; i < app.lookup("dsMtrllist").getRowCount(); i++) {
        var image = "theme/images/Thumbnail_" + (i % 8 + 1) + ".jpg";
        app.lookup("dsMtrllist").setValue(i, "Thumbnail", image);
    }
    app.lookup("grdMtrl").redraw();
}


/*
 * "검색" 버튼(btnSubSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSubSearchClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnSubSearch = e.control;

    var vsDate1 = app.lookup("dti2").value;
    var vsDate2 = app.lookup("dti3").value;

    if (vsDate1 == "" || vsDate2 == "") {
        alert("등록일를 정확하게 입력해주세요.");
    } else {
        app.lookup("sms2").send();
    }
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {

    var dailyDate = app.lookup("dtiDaily");
    var m = moment();

    dailyDate.value = m.format("YYYYMMDD");

    //	doListCmmn();

    //	app.lookup("smsChannelSet").send();

    //	app.lookup("grpCt").getLayout().setColumnVisible(1, false);
	
    onButtonClick(e);
	app.lookup("smsPlayListSet").send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSmsChannelSetSubmitSuccess( /* cpr.events.CSubmissionEvent */ e) {
    /** 
     * @type cpr.protocols.Submission
     */
    var smsChannelSet = e.control;

    app.lookup("grpSchFrist").redraw();
}

/*
 * 버튼(btnPlMtrlSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPlMtrlSearchClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnPlMtrlSearch = e.control;

    var dmDailySearch = app.lookup("dmDailySearch");
    var dmPlMtrlInfo = app.lookup("dmPlMtrlInfo");
    var selChanId = dmDailySearch.getValue("chanId");

    dmPlMtrlInfo.setValue("chanId", selChanId);

    if (!dmPlMtrlInfo.getValue("mtrlClf1") && !dmPlMtrlInfo.getValue("mtrlNm") && !dmPlMtrlInfo.getValue("mtrlInfo") && !dmPlMtrlInfo.getValue("mtrlId") && !dmPlMtrlInfo.getValue("useBeginYmd") && !dmPlMtrlInfo.getValue("useEndYmd") && !dmPlMtrlInfo.getValue("regBeginYmd") && !dmPlMtrlInfo.getValue("regEndYmd")) {
        alert("조회 조건이 하나 이상 포함되어야 합니다.");
        return;
    }

    util.Submit.send(app, "smsPlMtrlSet", function(pbSuccess) {
        if (pbSuccess) {
            app.lookup("grdPlMtrl").redraw();
        }
    });

}


/*
 * 버튼(btnPgmMtrlSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPgmMtrlSearchClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnPgmMtrlSearch = e.control;

    var dmDailySearch = app.lookup("dmDailySearch");
    var dmPgmMtrlInfo = app.lookup("dmPgmMtrlInfo");
    var selChanId = dmDailySearch.getValue("chanId");

    dmPgmMtrlInfo.setValue("chanId", selChanId);

    util.Submit.send(app, "smsPgmMtrlSet", function(pbSuccess) {
        if (pbSuccess) {
            app.lookup("grdPgmMtrl").redraw();
        }
    });
}


/*
 * "운행표 작성" 버튼(btnScheduleCreate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnScheduleCreateClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnScheduleCreate = e.control;
    var dmDailyCreate = app.lookup("dmDailyCreate");
    var initValue = {};

    app.openDialog("app/operation/popup/ScheduleCreate", {
        width: 400,
        height: 200
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            //dialogApp.initValue = voData;
            dialog.headerTitle = "운행표작성";
        });
    }).then(function(returnData) {

        if (returnData) {

            /** @type {{ipbCorpCd : String, ipbCorpNm : String}} */
            var returnData = returnData;

            if (returnData == "new") {

                dmDailyCreate.setValue("chanId", app.lookup("cmbChan").value);
                dmDailyCreate.setValue("playYmd", app.lookup("dtiDaily").value);
                dmDailyCreate.setValue("playNo", app.lookup("cmbPlayNo").value);

                util.Submit.send(app, "smsDailyCreate", function(pbSuccess) {
                    if (pbSuccess) {
                        app.lookup("btnMainSearch").click();
                        app.lookup("grdSch").redraw();
                    }
                }, null, null, "mask");

            } else if (returnData == "copy") {

                initValue["targetPlayYmd"] = app.lookup("dtiDaily").value;
                initValue["targetPlayNo"] = app.lookup("cmbPlayNo").value;
                initValue["targetChanId"] = app.lookup("cmbChan").value;

                app.getRootAppInstance().openDialog("app/popup/DailyScheduleCalendar", {
                    width: 800,
                    height: 550
                }, function(dialog) {
                    dialog.ready(function(dialogApp) {
                        dialogApp.initValue = initValue;
                    });
                }).then(function(returnValue) {
                    if (returnValue) {
                        app.lookup("dmDailyCopy").setValue("sourceChanId", returnValue.sourceChanId);
                        app.lookup("dmDailyCopy").setValue("sourceBroadYmd", returnValue.sourceBroadYmd);
                        app.lookup("dmDailyCopy").setValue("sourcePlanNo", returnValue.sourcePlanNo);
                        app.lookup("dmDailyCopy").setValue("targetChanId", returnValue.targetChanId);
                        app.lookup("dmDailyCopy").setValue("targetBroadYmd", returnValue.targetBroadYmd);
                        app.lookup("dmDailyCopy").setValue("targetPlanNo", returnValue.targetPlanNo);

                        util.Submit.send(app, "smsDailyCopy", function(pbSuccess) {
                            if (pbSuccess) {
                                app.lookup("grdSch").redraw();
                            }
                        });
                    }
                });
            }
        }
    });
}


/*
 * "<" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;

    var vnNowDate = app.lookup("dtiDaily").value;
    var setDate = dateCalc(vnNowDate, 2);

    app.lookup("dtiDaily").value = setDate;
    app.lookup("dtiDaily").redraw();

    util.Submit.send(app, "smsPlayListSet", function(pbSuccess) {
        if (pbSuccess) {
            loadConfirmList();
        }
    }, null, null, "mask");
}


/*
 * ">" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;

    var vnNowDate = app.lookup("dtiDaily").value;
    var setDate = dateCalc(vnNowDate, 1);

    app.lookup("dtiDaily").value = setDate;
    app.lookup("dtiDaily").redraw();

    util.Submit.send(app, "smsPlayListSet", function(pbSuccess) {
        if (pbSuccess) {
            loadConfirmList();
        }
    }, null, null, "mask");
}


/*
 * "행추가" 버튼(btnAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnAdd = e.control;
    var vcGrid = app.lookup("grdSch");
    var dsPlayList = app.lookup("dsPlayList");
    var voSelRow = null;
    var vsPlayTime24 = "";
    var vsPlayRun = "";

    if (vcGrid.getSelectedRow()) {
        voSelRow = vcGrid.getSelectedRow();
        vsPlayTime24 = vcGrid.getSelectedRow().getValue("playTime24");
        vsPlayRun = vcGrid.getSelectedRow().getValue("playRun");

        // 선택한 행 밑에 신규 행을 추가, 선택한 행의 종료시각이 추가된 행의 시작시각으로 세팅 calBroadEndTime 함수 사용
        vcGrid.insertRowData(vcGrid.getSelectedRow().getIndex(), true, {
            "chanId": dsPlayList.getValue(0, "chanId"),
            "playYmd": dsPlayList.getValue(0, "playYmd"),
            "playClf": 0,
            "playNo": dsPlayList.getValue(0, "playNo"),
            "playTime24": calBroadEndTime(vsPlayTime24.substring(0, 2), vsPlayTime24.substring(2, 4), vsPlayTime24.substring(4, 6), vsPlayTime24.substring(6, 8), vsPlayRun.substring(0, 2), vsPlayRun.substring(2, 4), vsPlayRun.substring(4, 6), vsPlayRun.substring(6, 8)),
            "playRun": "00000000",
            "pgmCd": voSelRow.getValue("pgmCd"),
            "pgmNm": voSelRow.getValue("pgmNm"),
            "episodeNo": voSelRow.getValue("episodeNo"),
            "episodeNm": voSelRow.getValue("episodeNm"),
            "delibGrade": voSelRow.getValue("delibGrade"),
            "delibTopicYn": voSelRow.getValue("delibTopicYn"),
            "delibLanguageYn": voSelRow.getValue("delibLanguageYn"),
            "delibCopyYn": voSelRow.getValue("delibCopyYn"),
            "delibViolenceYn": voSelRow.getValue("delibViolenceYn"),
            "delibSexualYn": voSelRow.getValue("delibSexualYn"),
            "broadClf": voSelRow.getValue("broadClf"),
            "firstClf": voSelRow.getValue("firstClf"),
            "captionYn": voSelRow.getValue("captionYn"),
            "signLangYn": voSelRow.getValue("signLangYn"),
            "dvsYn": voSelRow.getValue("dvsYn"),
            "childYn": voSelRow.getValue("childYn")
            //			"playSeq" : dsPlayList.getValue(0, "playSeq"),
            //			"sortSeq" : dsPlayList.getValue(0, "sortSeq"),
        });
    } else {
        vcGrid.insertRowData(0, false);
    }

    vcGrid.selectRows(voSelRow.getIndex() + 1);
}

/*
 * "행삽입" 버튼(btnUpAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpAddClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnUpAdd = e.control;
    var vcGrid = app.lookup("grdSch");
    var dsPlayList = app.lookup("dsPlayList");
    var voSelRow = null;

    // 선택한 행 위에 신규 행을 추가 (선택한 행 자리에 신규 행이 추가), 선택한 행의 시작시각을 추가된 행의 시작시각으로 세팅
    if (vcGrid.getSelectedRow()) {
        voSelRow = vcGrid.getSelectedRow();

        vcGrid.insertRowData(vcGrid.getSelectedRow().getIndex(), false, {
            "chanId": dsPlayList.getValue(0, "chanId"),
            "playYmd": dsPlayList.getValue(0, "playYmd"),
            "playClf": 0,
            "playNo": dsPlayList.getValue(0, "playNo"),
            "playTime24": vcGrid.getSelectedRow().getValue("playTime24"),
            "playRun": "00000000",
            "pgmCd": voSelRow.getValue("pgmCd"),
            "pgmNm": voSelRow.getValue("pgmNm"),
            "episodeNo": voSelRow.getValue("episodeNo"),
            "episodeNm": voSelRow.getValue("episodeNm"),
            "delibGrade": voSelRow.getValue("delibGrade"),
            "delibTopicYn": voSelRow.getValue("delibTopicYn"),
            "delibLanguageYn": voSelRow.getValue("delibLanguageYn"),
            "delibCopyYn": voSelRow.getValue("delibCopyYn"),
            "delibViolenceYn": voSelRow.getValue("delibViolenceYn"),
            "delibSexualYn": voSelRow.getValue("delibSexualYn"),
            "broadClf": voSelRow.getValue("broadClf"),
            "firstClf": voSelRow.getValue("firstClf"),
            "captionYn": voSelRow.getValue("captionYn"),
            "signLangYn": voSelRow.getValue("signLangYn"),
            "dvsYn": voSelRow.getValue("dvsYn"),
            "childYn": voSelRow.getValue("childYn")
            //			"playSeq" : dsPlayList.getValue(0, "playSeq"),
            //			"sortSeq" : dsPlayList.getValue(0, "sortSeq"),
        });
    } else {
        vcGrid.insertRowData(0, false, {
            "chanId": dsPlayList.getValue(0, "chanId"),
            "playYmd": dsPlayList.getValue(0, "playYmd"),
            "playClf": 0,
            "playNo": dsPlayList.getValue(0, "playNo")
        });
    }

    vcGrid.selectRows(voSelRow.getIndex());
}

/*
 * "행삭제" 버튼(btnDel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnDel = e.control;
    var vcGrid = app.lookup("grdSch");

    if (vcGrid.length < 1) {
        alert("삭제할 데이터를 선택해주세요");
    } else {
        vcGrid.deleteRow(vcGrid.getSelectedRowIndex());
    }
}


/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnSave = e.control;

    if (util.validate(app, "grdSch")) {
        util.Submit.send(app, "smsPlayListSave", function(pbSuccess) {
            if (pbSuccess) {
                alert("저장되었습니다");
                util.Submit.send(app, "smsPlayListSet");
                util.Msg.notify(app, "저장되었습니다.");
            } else {
                alert("저장이 안되었습니다.")
            }
        });
    }
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDtiDailyValueChange( /* cpr.events.CValueChangeEvent */ e) {
    /** 
     * @type cpr.controls.DateInput
     */
    var dtiDaily = e.control;
    var dateNm = getDayNm(dtiDaily.value);

    app.lookup("opbDayOfTheWeek").value = "[" + dateNm + "]";
    app.lookup("opbDayOfTheWeek").redraw();
}


/*
 * 버튼(btnCmMtrlSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCmMtrlSearchClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnCmMtrlSearch = e.control;
    var dmDailySearch = app.lookup("dmDailySearch");
    var dmCmMtrlInfo = app.lookup("dmCmMtrlInfo");
    var selChanId = dmDailySearch.getValue("chanId");
    var vnTotalCmSec = 0;
    var vnBcmSec = 0;
    var vnAcmSec = 0;
    var vnMcmSec = 0;

    dmCmMtrlInfo.setValue("chanId", selChanId);

    util.Submit.send(app, "smsCmMtrlSet", function(pbSuccess) {
        if (pbSuccess) {
            app.lookup("grdCmMtrl").redraw();

            for (var i = 0; i < app.lookup("grdCmMtrl").getRowCount(); i++) {
                vnTotalCmSec += Number(app.lookup("grdCmMtrl").getRow(i).getValue("cmmSec"));

                if (app.lookup("grdCmMtrl").getRow(i).getValue("cmClf") == "100") {
                    vnBcmSec += Number(app.lookup("grdCmMtrl").getRow(i).getValue("cmmSec"));
                } else if (app.lookup("grdCmMtrl").getRow(i).getValue("cmClf") == "300") {
                    vnAcmSec += Number(app.lookup("grdCmMtrl").getRow(i).getValue("cmmSec"));
                } else {
                    vnMcmSec += Number(app.lookup("grdCmMtrl").getRow(i).getValue("cmmSec"));
                }
            }

            app.lookup("opbTotalCmSec").value = vnTotalCmSec;
            app.lookup("opbBcmSec").value = vnBcmSec;
            app.lookup("opbMcmSec").value = vnMcmSec;
            app.lookup("opbBandCnt").value = "0";
            app.lookup("opbAcmSec").value = vnAcmSec;
            app.lookup("opbTotalCmCnt").value = app.lookup("grdCmMtrl").getRowCount();
        }
    });

    app.lookup("grpCmInfo").redraw();

}


/*
 * "광고생성" 버튼(btnCmCreate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCmCreateClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnCmCreate = e.control;
    var initValue = {};

    app.lookup("dmCmCreate").setValue("chanId", app.lookup("dmDailySearch").getValue("chanId"));
    app.lookup("dmCmCreate").setValue("playYmd", app.lookup("dmDailySearch").getValue("playYmd"));
    app.lookup("dmCmCreate").setValue("playNo", app.lookup("dmDailySearch").getValue("playNo"));

    app.openDialog("app/operation/popup/CmCreate", {
        width: 400,
        height: 200
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            //dialogApp.initValue = voData;
            dialog.headerTitle = "광고생성";
        });
    }).then(function(returnData) {

        if (returnData) {

            if (returnData == "dayNew") {

                util.Submit.send(app, "smsDailyCmCreate", function(pbSuccess) {
                    if (pbSuccess) {
                        app.lookup("grdSch").redraw();
                    }
                });
            } else if (returnData == "timeBandNew") {

                if (!app.lookup("grdSch").getSelectedRow()) {
                    alert("TimeBand를 생성할 시간대를 선택해주세요");
                } else {
                    app.lookup("dmCmCreate").setValue("broadHm", app.lookup("grdSch").getSelectedRow().getValue("broadHm"));

                    util.Submit.send(app, "smsDailyCmCreate", function(pbSuccess) {
                        if (pbSuccess) {
                            app.lookup("grdSch").redraw();
                        }
                    });
                }
            } else if (returnData == "dayDel") {
                alert("일전체 삭제");
            } else if (returnData == "timeBandDel") {
                alert("타임밴드 삭제");
            }

            app.lookup("dmCmCreate").clear(false);
        }
    });

}


/*
 * "S/E 생성" 버튼(btnSeCreate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSeCreateClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnSeCreate = e.control;
    var initValue = {};

    app.lookup("dmSeCreate").setValue("chanId", app.lookup("dmDailySearch").getValue("chanId"));
    app.lookup("dmSeCreate").setValue("playYmd", app.lookup("dmDailySearch").getValue("playYmd"));
    app.lookup("dmSeCreate").setValue("playNo", app.lookup("dmDailySearch").getValue("playNo"));

    app.openDialog("app/operation/popup/SeCreate", {
        width: 600,
        height: 300
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            //dialogApp.initValue = voData;
            dialog.headerTitle = "S/E생성";
        });
    }).then(function(returnData) {

        if (returnData) {

            if (returnData == "seTotalNew") {
                util.Submit.send(app, "smsDailySeCreate", function(pbSuccess) {

                    if (pbSuccess) {
                        app.lookup("grdSch").redraw();
                    }
                });
            }

        }
    });

}


/*
 * "검증" 버튼(btnVerify)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVerifyClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnVerify = e.control;
    var initValue = {};

    app.openDialog("app/operation/popup/VerifySort", {
        width: 400,
        height: 200
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            //dialogApp.initValue = voData;
            dialog.headerTitle = "검증";
        });
    }).then(function(returnData) {

        if (returnData) {

        }
    });

}

/*
 * "소재 변경" 버튼(btnMtrlChange)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMtrlChangeClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnMtrlChange = e.control;
    //	var initValue = {};
    //	var vsSelPlayRun = app.lookup("grdSch").getSelectedRow().getValue("playRun");
    //	var vsSelMtrlId = app.lookup("grdSch").getSelectedRow().getValue("mtrlId");
    //	var vsSelMtrlNm = app.lookup("grdSch").getSelectedRow().getValue("mtrlNm");
	
	var vcGrid = app.lookup("grdSch");
	
	util.Dialog.open(app, "app/operation/popup/MtrlChange", 1000, 600, function(e){
			var dialog = e.control;
			var returnData = dialog.returnValue;
		if (returnData || returnData.length > 0) {
			returnData.forEach(function(each){
				var vaAllRows = vcGrid.findAllRow("mtrlId == '"+each.mtrlIdBefore+"'");
				vaAllRows.forEach(function(eachRow, idx){
					
					eachRow.setValue("mtrlId", each.mtrlIdAfter);
					eachRow.setValue("mtrlNm", each.mtrlNmAfter);
					eachRow.setValue("mtrlClf", each.mtrlClfAfter);
					eachRow.setValue("mtrlInfo", each.mtrlInfoAfter);
					eachRow.setValue("playRun", each.durationAfter);
					
				});
						
			});
			var firstRow = vcGrid.findFirstRow("mtrlClf != 'SE' && getStateString()=='U'");
			
			var vaProgramRows = vcGrid.findAllRow("mtrlClf != 'SE' && getIndex() >="+firstRow.getIndex());

			var tempRow = vaProgramRows.shift();
			var vsPlayTime24 = "";
			var vsPlayRun = "";
			var vsResultTime = "";
			vaProgramRows.forEach(function(each){
				vsPlayTime24 = tempRow.getValue("playTime24");
				vsPlayRun = tempRow.getValue("playRun");
				vsResultTime = calcBroadEndTimeSimple(vsPlayTime24, vsPlayRun);
				each.setValue("playTime24", vsResultTime);
				tempRow = each;	
			});
			
        }
	});
}

/*
 * "광고시간 확인" 버튼(btnCmTimeCheck)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCmTimeCheckClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnCmTimeCheck = e.control;

    for (var i = 0; i < app.lookup("grdSch").getRowCount(); i++) {

        if (app.lookup("grdSch").getRow(i).getValue("playSeq") != app.lookup("dsPlayList").getValue(i, "playSeq")) {
            console.log("그리드 순번과 데이터셋의 순번이 일치하지 않는 로우는 " + i);
        }
    }

}


/*
 * "방송소재 확인" 버튼(btnBroadMtrl)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnBroadMtrlClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnBroadMtrl = e.control;
    var initValue = {};

    initValue["chanId"] = app.lookup("cmbChan").value;
    initValue["playNo"] = app.lookup("cmbPlayNo").value;

    if (!app.lookup("grdSch").getSelectedRow()) {
        alert("행을 선택해주세요");
        return;
    } else {
        initValue["mtrlId"] = app.lookup("grdSch").getSelectedRow().getValue("mtrlId");
        initValue["mtrlNm"] = app.lookup("grdSch").getSelectedRow().getValue("mtrlNm");
    }

    app.openDialog("app/operation/popup/MtrlBroadHistory", {
        width: 800,
        height: 600
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            dialogApp.initValue = initValue;
            dialog.headerTitle = "소재별 방송내역";
        });
    }).then(function(returnData) {

        if (returnData) {

        }
    });
}


/*
 * "소스지정" 버튼(btnSource)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSourceClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnSource = e.control;

    if (app.lookup("btnSource").value == "소스지정") {
        app.lookup("btnSource").value = "소스지정 취소";
        app.lookup("btnSource").redraw();
    } else {
        app.lookup("btnSource").value = "소스지정";
        app.lookup("btnSource").redraw();
    }

}


/*
 * "확정" 버튼(btnConfirm)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnConfirmClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnConfirm = e.control;

    if (app.lookup("btnConfirm").value == "확정") {
        app.lookup("btnConfirm").value = "확정 취소";
        app.lookup("btnConfirm").redraw();
    } else {
        app.lookup("btnConfirm").value = "확정";
        app.lookup("btnConfirm").redraw();
    }
}


/*
 * "S/E" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;
    var initValue = {};

    app.openDialog("app/popup/SubEventFind", {
        width: 600,
        height: 300
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            dialogApp.initValue = app.lookup("cmbChan").value;
            dialog.headerTitle = "서브이벤트조회";
        });
    }).then(function(returnData) {

        if (returnData) {

        }
    });
}


/*
 * "밴드추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;
    var initValue = {};
    initValue["broadYmd"] = app.lookup("dtiDaily").value;
    initValue["playNo"] = app.lookup("cmbPlayNo").value;
    initValue["chanId"] = app.lookup("cmbChan").value;

    app.openDialog("app/popup/PgmBandAdd", {
        width: 850,
        height: 550
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            dialogApp.initValue = initValue;
            dialog.headerTitle = "프로그램 밴드 추가";
        });
    }).then(function(returnData) {

        if (returnData) {

        }
    });
}


/*
 * 마스크 에디터에서 value-change 이벤트 발생 시 호출.
 * MaskEditor의 value의 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onMseStartValueChange( /* cpr.events.CValueChangeEvent */ e) {
    /** 
     * @type cpr.controls.MaskEditor
     */
    var mseStart = e.control;

    adjustBroadEndTime();
}


/*
 * 마스크 에디터에서 value-change 이벤트 발생 시 호출.
 * MaskEditor의 value의 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onMseRunValueChange( /* cpr.events.CValueChangeEvent */ e) {
    /** 
     * @type cpr.controls.MaskEditor
     */
    var mseRun = e.control;

    adjustBroadEndTime();

}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxMtrlSchValueChange( /* cpr.events.CValueChangeEvent */ e) {
    /** 
     * @type cpr.controls.CheckBox
     */
    var cbxMtrlSch = e.control;

    if (cbxMtrlSch.value == "Y") {
        app.lookup("grpCt").getLayout().setColumnVisible(1, true);
    } else {
        app.lookup("grpCt").getLayout().setColumnVisible(1, false);
    }

}


/*
 * 그리드에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onGrdSchContextmenu( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Grid
     */
    var grdSch = e.control;

    e.preventDefault();
    setContextMenu(grdSch.id);
}


/*
 * 그리드에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGrdPlMtrlDblclick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Grid
     */
    var grdPlMtrl = e.control;
    var vcMainGrid = app.lookup("grdSch");
    var vcPlGrid = app.lookup("grdPlMtrl");
    var selRowIdx = 0;

    if (!vcMainGrid.getSelectedRow()) {
        alert("소재를 넣을 Row를 선택하세요");
    } else {
        vcMainGrid.updateRow(vcMainGrid.getSelectedRow().getIndex(), vcPlGrid.getSelectedRow().getRowData());
        vcMainGrid.getSelectedRow().setValue("playRun", vcPlGrid.getSelectedRow().getValue("duration"));
        selRowIdx = vcMainGrid.getSelectedRow().getIndex();
        vcMainGrid.selectRows(selRowIdx);
        adjustBroadEndTime();
    }

}


/*
 * 그리드에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGrdPgmMtrlDblclick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Grid
     */
    var grdPgmMtrl = e.control;
    var vcMainGrid = app.lookup("grdSch");
    var vcPlGrid = app.lookup("grdPgmMtrl");
    var selRowIdx = 0;

    if (!vcMainGrid.getSelectedRow()) {
        alert("소재를 넣을 Row를 선택하세요");
    } else {
        vcMainGrid.updateRow(vcMainGrid.getSelectedRow().getIndex(), vcPlGrid.getSelectedRow().getRowData());
        vcMainGrid.getSelectedRow().setValue("playRun", vcPlGrid.getSelectedRow().getValue("duration"));
        selRowIdx = vcMainGrid.getSelectedRow().getIndex();
        vcMainGrid.selectRows(selRowIdx);
        adjustBroadEndTime();
    }

}


/*
 * 그리드에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGrdCmMtrlDblclick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Grid
     */
    var grdCmMtrl = e.control;
    var vcMainGrid = app.lookup("grdSch");
    var vcPlGrid = app.lookup("grdCmMtrl");
    var selRowIdx = 0;

    if (!vcMainGrid.getSelectedRow()) {
        alert("소재를 넣을 Row를 선택하세요");
    } else {
        vcMainGrid.updateRow(vcMainGrid.getSelectedRow().getIndex(), vcPlGrid.getSelectedRow().getRowData());
        vcMainGrid.getSelectedRow().setValue("playRun", vcPlGrid.getSelectedRow().getValue("duration"));
        selRowIdx = vcMainGrid.getSelectedRow().getIndex();
        vcMainGrid.selectRows(selRowIdx);
        adjustBroadEndTime();
    }
}


/*
 * 그리드에서 paste 이벤트 발생 시 호출.
 * Grid에서 ctrl + v 로 붙여넣기시 발생하는 이벤트.
 */
function onGrdSchPaste( /* cpr.events.CGridEvent */ e) {
    /** 
     * @type cpr.controls.Grid
     */
    var grdSch = e.control;
    var targetGrid = app.lookup("grdSch");
    var vnRowIndex = targetGrid.getSelectedRowIndex();
    var vsStartTime = targetGrid.getSelectedRow().getValue("playTime24");

    targetGrid.getRow(vnRowIndex).setRowData(voGridRowData);
    targetGrid.setCellValue(vnRowIndex, 1, vsStartTime);
    targetGrid.selectRows(vnRowIndex);
    adjustBroadEndTime();
}


/*
 * "저장" 버튼(btnMainSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMainSaveClick( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var btnFileSave = e.control;
    var dsChanId = app.lookup("dsPlayList").getValue(0, "chanId");
    var dsPlayYmd = app.lookup("dsPlayList").getValue(0, "playYmd");
    var dsPlayNo = app.lookup("dsPlayList").getValue(0, "playNo");

    app.openDialog("app/popup/SaveConfirm", {
        width: 400,
        height: 200
    }, function(dialog) {
        dialog.ready(function(dialogApp) {
            dialog.headerTitle = "운행표저장";
        });
    }).then(function(returnData) {
        if (returnData) {
            /** @type {{boolVal : boolean}} */
            var returnData = returnData;

            if (returnData == "true") {

                app.lookup("dsInsertList").clear(false);
                app.lookup("dmSaveAssist").setValue("chanId", dsChanId);
                app.lookup("dmSaveAssist").setValue("playYmd", dsPlayYmd);
                app.lookup("dmSaveAssist").setValue("playNo", dsPlayNo);

                for (var i = 0; i < app.lookup("grdSch").getRowCount(); i++) {
                    app.lookup("dsInsertList").addRowData(app.lookup("grdSch").getRow(i).getRowData());
                }

                util.Submit.send(app, "smsPlayListSave", function(pbSuccess) {
                    if (pbSuccess) {
                        app.lookup("grdSch").redraw();
                    }
                });
            }
        }
    });

    //	for (var i = 0; i < app.lookup("dsPlayList").getRowCount(); i++) {
    //		console.log(app.lookup("dsPlayList").getValue(i, "mtrlClf"));
    //	}

}


/*
 * "잘라내기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6( /* cpr.events.CMouseEvent */ e) {
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;

}

/**
 * 2020.05.15 소재구분을 입력하면 프로그램 , 광고, 서브 이벤트로 구분하여 반환
 * @param {String} mtrlClf(소재구분)
 * @return {"ZP" | "CM" | "SE"} [ZP] : 프로그램, [CM] : 광고, [SE] 서브 이벤트
 */
function classifyMtr(mtrlClf) {


    var paramValue = ""; //소재구분의 앞 두 글자
    var returnValue = ""; //ZP, CM, SE 중의 값을 반환

    paramValue = mtrlClf.substring(0, 2);

    switch (paramValue) {
        case "ZP":
            returnValue = "ZP"; // 프로그램
            break;
        case "CM":
            returnValue = "CM"; // 광고
            break;
        case "AG":
            returnValue = "AG"; // 등급고지
            break;
        case "ID":
            returnValue = "ID"; // ID
            break;
        case "ZZ":
            returnValue = "ZZ"; // 기타
            break;
        case "SP":
            returnValue = "SP"; // SPOT
            break;
        case "PM":
            returnValue = "PM"; // 프로모션
            break;
        case "PT":
            returnValue = "PT"; // 전타
            break;
        case "ZT":
            returnValue = "ZT"; // 후타
            break;
        case "QT":
            returnValue = "QT"; // 큐톤
            break;
        case "NX":
            returnValue = "NX"; // 
            break;
        case "IN":
            returnValue = "IN"; // 
            break;
        case "FL":
            returnValue = "FL"; // 
            break;
        case "CA":
            returnValue = "CA"; // 
            break;
        default:
            returnValue = "SE" // 세컨더리 이벤트
            break;
    }

    return returnValue;
}

/**
 * 2020.05.15 소재구분을 입력하면 프로그램 , 광고, 서브 이벤트로 구분하여 반환
 * @param {cpr.controls.Grid} grid
 * @param {Number} (현재 선택행 rowIndex) 
 * @return {cpr.controls.provider.GridRow} 입력받은 rowindex 이전 행중 서브이벤트행을 제외한 그리드 Row
 */
function findRowExcludeSE( /* cpr.controls.Grid */ grid, /* Number */ rowIndex) {


    var gridRow = null; //입력받은 rowIndex이전의 행들을 전달받은 변수
    var returnRow = null; //서브이벤트 행을 제외한 가장 가까운 이전행
    var rowMtrlClf = null; //row의 mtrlClf 저장할 변수

    //이전 row중 subEvent행을 제외하고 가장 가까운 row를 찾는다.
    for (var i = 1, length = rowIndex; i < length; i++) {
        gridRow = grid.getRow(rowIndex - i);
        rowMtrlClf = gridRow.getString("mtrlClf");

        if (classifyMtr(rowMtrlClf) !== "SE") {
            returnRow = gridRow;
            break;
        }
    }
	debugger;
    return returnRow;
}

/*
 * 그리드에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrdSchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdSch = e.control;
	
	if(e.ctrlKey && e.keyCode == "X") {
		
//		app.lookup("grdCmMtrl").
	}
}
