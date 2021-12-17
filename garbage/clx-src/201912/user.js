///************************************************
// * user.js
// * Created at 2019. 11. 11. 오전 11:01:37.
// *
// * @author Jay
// ************************************************/
//
//// 공통 모듈 선언
//var util = createCommonUtil();
//
////날짜 체크에서 실패 시 이전값으로 돌리기위해 바꾸기 전 저장해 놓는 변수
//var msStDt = "";
//var msDueDt = "";
//
///**
// * 시작일자, 종료일자 입력 시 비교체크로직을 수행한다.
// * @param {String} psEventDivNm
// */
//function validateDate(psEventDivNm) {
//	var vsStDt = app.lookup("dtStDt").value;
//	var vsEndDt = app.lookup("dtEndDt").value;
//
//	if (psEventDivNm == "ST_DT") { //시작일자인 경우
//		if (ValueUtil.fixNull(vsEndDt) != "" && !(vsStDt <= vsEndDt)) {
//			alert("시작일자를 종료일자 이전으로 선택하여 주십시오.");
//			app.lookup("dtStDt").value = msStDt;
//		} else {
//			msStDt = vsStDt;
//		}
//	} else if (psEventDivNm == "END_DT") { // 종료일자인 경우
//		if (ValueUtil.fixNull(vsStDt) != "" && !(vsEndDt >= vsStDt)) {
//			alert("종료일자가 시작일자보다 작을 수 없습니다.");
//			app.lookup("dtEndDt").value = msDueDt;
//		} else {
//			msDueDt = vsEndDt;
//		}
//	}
//}
//
///*
// * Body에서 load 이벤트 발생 시 호출.
// * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
// */
//function onBodyLoad( /* cpr.events.CEvent */ e) {
//	app.lookup("pgIdx").currentPageIndex = 1;
//	doList();
//}
//
//
///**
// * 리스트 조회
// * @param {String} psStatus
// */
//function doList(psStatus) {
//	/* 페이징 처리 */
//	var pgIdx = app.lookup("pgIdx");
//	pgIdx.currentPageIndex = parseInt(util.DataMap.getValue(app, "dmParam", "pageNo"));
//	
//	util.Submit.send(app, "subList", function(psSuccess){
//		if(psSuccess) {
//			
//			var vsSuccess = util.DataMap.getValue(app, "dmResult", "success");
//			var vsMessage = util.DataMap.getValue(app, "dmResult", "message");
//			
//			if (vsSuccess === "Y") {
//				app.lookup("grpContent").redraw();
//				
//				// 메세지 분기처리
//				if (psStatus === "save") {
//					//갱신된 데이터가 조회되었습니다.
//					util.Msg.notify(app, "INF-M005");
//				} else {
//					//조회되었습니다.
//					util.Msg.notify(app, "INF-M001");
//				}
//				
//				// 페이징 처리
//				var vnTotal = util.DataSet.getValue(app, "dsUserList", 0, "totRowCnt");
//				var vnPageRow = util.DataMap.getValue(app, "dmParam", "pageRow");
//				
//			    pgIdx.totalRowCount = parseInt(vnTotal);
//				pgIdx.pageRowCount = parseInt(vnPageRow);
//				
//			}
//			
//		};
//	});
//}
//
///*
// * "조회" 버튼에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onButtonClick( /* cpr.events.CMouseEvent */ e) {
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var button = e.control;
//	
//	// 검색버튼으로 조회시 페이지 1로 세팅
//	util.DataMap.setValue(app, "dmParam", "pageNo", 1);
//	
//	doList();
//}
//
//
//
///*
// * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
// * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
// */
//function onPgIdxSelectionChange( /* cpr.events.CSelectionEvent */ e) {
//	/** 
//	 * @type cpr.controls.PageIndexer
//	 */
//	var pgIdx = e.control;
//	var vnNewSelection = e.newSelection;
//	
//	util.DataMap.setValue(app, "dmParam", "pageNo", vnNewSelection);
//	
//	doList(); // 조회
//};
//
//
///*
// * "생성" 버튼(btnInsert)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtnInsertClick(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btnInsert = e.control;
//	var initValue = {"openDiv": "I"};
//	
//	var vsPopId, vsWidth, vsHeight;
//	vsPopId = "app/admin/user_pop";
//	vsWidth = 800;
//	vsHeight = 350;
//	
//	util.Dialog.open(app, vsPopId, vsWidth, vsHeight, function(e){
//		var dialog = e.control;
//		var returnValue = dialog.returnValue;
//		if(returnValue != null && returnValue.closeDiv == "ok") {
//			doList("save");
//		}
//	}, initValue);
//}
//
//
///*
// * 그리드에서 dblclick 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
// */
//function onGrdUserMgmtDblclick(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Grid
//	 */
//	var grdUserMgmt = e.control;
//	var vnSelIndex = grdUserMgmt.getSelectedRowIndex();
//	var vsUserId = util.DataSet.getValue(app, "dsUserList", vnSelIndex, "userId");
//	
//	var vsPopId, vsWidth, vsHeight;
//	vsPopId = "app/admin/user_pop";
//	vsWidth = 800;
//	vsHeight = 350;
//	
//	var initValue = {"openDiv": "A", "userId" : vsUserId};
//	
//	util.Dialog.open(app, vsPopId, vsWidth, vsHeight, function(e){
//		var dialog = e.control;
//		var returnValue = dialog.returnValue;
//		if(returnValue != null && returnValue.closeDiv == "ok") {
//			doList("save");
//		}
//	}, initValue);
//}
//
//
//
///*
// * "삭제" 버튼(btnDelete)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btnDelete = e.control;
//	
//	var vaSelIdxs  = util.Grid.getCheckOrSelectedRowIndex(app, "grdUserMgmt");
//	
//	if (vaSelIdxs.length == 0) {
//		util.Msg.alert("삭제할 행을 선택해주십시오");
//		return false;
//	}
//	
//	//삭제 하시겠습니까?
//	if(util.Msg.confirm("CRM-M002")){
//		vaSelIdxs.forEach(function(each){
//			util.Grid.setRowState(app, "grdUserMgmt", cpr.data.tabledata.RowState.DELETED, each);
//		});
//		
//		doDelete();
//	};
//}
//
///**
// * 선택된 행 삭제
// */
//function doDelete() {
//	util.Submit.send(app, "subDelete", function(psSuccess){
//		if(psSuccess) {
//			
//			var vsSuccess = util.DataMap.getValue(app, "dmResult", "success");
//			var vsMessage = util.DataMap.getValue(app, "dmResult", "message");
//			
//			util.Msg.alert(vsMessage);
//			
//			if (vsSuccess === "Y") {
//				doList("save");
//			}
//			
//		};
//	});
//}