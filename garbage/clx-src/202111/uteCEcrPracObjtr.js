/*************************************************
 * 화면명    : uteCEcrPracObjtr 응급심폐소생 실습대상자
 * 개발자    : ntk
 * 최초작성 : 2020.07 .13
 * 변경이력 :
 *************************************************/
var util = createCommonUtil();

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.s
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 서브미션 호출
	util.Submit.send(app, "subOnLoad", null, function(pbSuccess){
		if(pbSuccess){
			app.lookup("nbeSchYear").value = app.lookup("dmResponse").getValue("strSchYear");
			
			// 해당 학년도에 등록된 공고만큼 그리드 헤더 동적추가
			doSelectGrdHeader();
		}		
	}, true);
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회 클릭 이벤트
 */
function onAppheader1Search(/* cpr.events.CAppEvent */ e){
	
	// 데이터 변경상태 체크
	if(util.Grid.isModified(app, "grdMain", "CRM")) return;
	
	// 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return;
	
	//조회 서브미션 수행
	doList();
}

/**
 * 데이터 조회를 수행한다.
 * @param {Function} poCallBackFunc 조회 후의 수행할 콜백함수
 */
function doList(psStatus) {
	util.Submit.send(app, "subList", null, function(pbSuccess){
		if(pbSuccess){
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
			}	
		}
	});
}

function doSelectGrdHeader(){
	app.lookup("dmParamGridHeader").setValue("strSchYear", app.lookup("nbeSchYear").value);
	
	//조회 서브미션 호출
    util.Submit.send(app, "subListGrdHeader", null, function(pbSuccess){
        if(pbSuccess) {
        	var vnRowCnt = app.lookup("dsGrdHeader").getRowCount();
        	var vnColIdx = 8;
        	
        	for(var i = 0; i < vnRowCnt; i++){
        		// columnName 셋팅
        		var vsColumnName = doColumnNameSet(app.lookup("dsGrdHeader").getValue(i, "SCH_YEAR"));
        		
        		if(i == 0){
        			app.lookup("grdMain").addColumn({
	        			columnLayout: [{
	        				width: "100px"
	        			}],
	        			header : [{
	        				constraint: {
	        					rowIndex : 0,
	        					colIndex : vnColIdx,
	        				},
	        				configurator: function(cell){
	        					cell.text = "실습결과";
	        				}
	        			}, {
	        				constraint: {
	        					rowIndex : 1,
	        					colIndex : vnColIdx,
	        				},
	        				configurator: function(cell){
	        					cell.text =  app.lookup("dsGrdHeader").getValue(i, "SMT_NM")
	        					          + "-" + app.lookup("dsGrdHeader").getValue(i, "SEQ_NM");
	        				}
	        			}],
	        			detail: [{
	        				constraint: {
	        					rowIndex : 0,
	        					colIndex : vnColIdx        					
	        				},
	        				configurator: function(cell){
	        					cell.columnName = "";
	        					cell.style.css({"text-align" : "center"});
	        				}
	        			}]
	        		});
        		}else{
        			app.lookup("grdMain").addColumn({
	        			columnLayout: [{
	        				width: "100px"
	        			}],
	        			header : [{
	        				constraint: {
	        					rowIndex : 0,
	        					colIndex : vnColIdx,
	        				},
	        				configurator: function(cell){
	        					cell.text = "";
	        				}
	        			}, {
	        				constraint: {
	        					rowIndex : 1,
	        					colIndex : vnColIdx
	        				},
	        				configurator: function(cell){
	        					cell.text =  app.lookup("dsGrdHeader").getValue(i, "SMT_NM")
	        					          + "-" + app.lookup("dsGrdHeader").getValue(i, "SEQ_NM");
	        				}
	        			}],
	        			detail: [{
	        				constraint: {
	        					rowIndex : 0,
	        					colIndex : vnColIdx        					
	        				},
	        				configurator: function(cell){
	        					cell.columnName = "";
	        					cell.style.css({"text-align" : "center"});
	        				}
	        			}]
	        		});
        		}
        		
        		vnColIdx = ValueUtil.fixNumber(vnColIdx) + 1;
        	}
        	
        	// 동적으로 추가한 헤더의 실습결과 합치기
        	app.lookup("grdMain").header.getColumn(8).cellProp.constraint.colSpan = vnRowCnt;
        	app.lookup("grdMain").redraw();
        }
    });
}

function doColumnNameSet(vsQuestAraRcd){
	var vsColumnName = "";
	
	if(vsQuestAraRcd == "UTE013.0001"){
		vsColumnName = "ARA_RCD_01_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0002"){
		vsColumnName = "ARA_RCD_02_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0003"){
		vsColumnName = "ARA_RCD_03_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0004"){
		vsColumnName = "ARA_RCD_04_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0005"){
		vsColumnName = "ARA_RCD_05_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0006"){
		vsColumnName = "ARA_RCD_06_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0007"){
		vsColumnName = "ARA_RCD_07_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0008"){
		vsColumnName = "ARA_RCD_08_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0009"){
		vsColumnName = "ARA_RCD_09_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0010"){
		vsColumnName = "ARA_RCD_10_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0011"){
		vsColumnName = "ARA_RCD_11_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0012"){
		vsColumnName = "ARA_RCD_12_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0013"){
		vsColumnName = "ARA_RCD_13_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.0014"){
		vsColumnName = "ARA_RCD_14_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.1001"){
		vsColumnName = "ARA_RCD_15_TOT_SCORE";
	}else if(vsQuestAraRcd == "UTE013.1002"){
		vsColumnName = "ARA_RCD_16_TOT_SCORE";
	}
	
	return vsColumnName;
}
