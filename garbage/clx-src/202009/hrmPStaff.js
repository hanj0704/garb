/************************************************
 * cmnPParty.js
 * Created at 2019. 1. 17.
 *
 * @author ksh
 ************************************************/
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	/*************** 공통코드 조회 START ***************/
	// 초기 파라메터 셋팅
	var param = [["dsGenderRcd", "CMN012", "", ""],["dsLnrSlrDivRcd", "CMN013", "", ""],["dsNatRcd", "CMN019", "", ""],["dsOnffiStatRcd", "APS001", "", ""]];
	// 공통코드 조회
	util.Submit.send(app, "subOnloadCode_tran", param, function(pbSuccess){
		if(pbSuccess){
			
			/*************** 사용자 구분 코드 조회 START ***************/
			// 조회 서브미션 호출
			var voParams = [{"mapper": "cmn-user01"
							 ,"qry": ["selectCmnUserDivCdList:dsPartyDiv"]
			                 ,"outds": "dsPartyDiv"}];
			                 
			util.Submit.send(app, "subListDiv_tran", voParams, function(pbSuccess){
				if(pbSuccess) {
		
					//초기 파라메터 셋팅
					var initValue = app.getHostProperty("initValue");
					var host = initValue.strHostDiv;
					if(host) {
						if("GUEST" == host) {
							app.lookup("cmbPartyDiv").insertItemAfter(new cpr.controls.Item("구성원-미지정", "NONE"), app.lookup("cmbPartyDiv").getItemByValue("GUEST"));
							app.lookup("cmbPartyDiv").setFilter("value == '' || value == 'GUEST' || value == 'NONE'");
							app.lookup("grdStaff").columnVisible(7, false);
							app.lookup("grdStaff").columnVisible(8, false);
						} else {
							app.lookup("grdStaff").columnVisible(5, false);
							app.lookup("grdStaff").columnVisible(6, false);
						}
					}

					// 필수값 : 구성원 아이디 검색 조건 input에 값 넣어줌.
					if(initValue.strPartyId) {
						if(/^[0-9]*$/.test(initValue.strPartyId)){
							app.lookup("ipbPartyId").value = initValue.strPartyId;
						}else{
							app.lookup("ipbNm").value = initValue.strPartyId;
						}
					} else {
						app.lookup("cmbPartyDiv").focus();
					}
				
					// 사용자 구분 값 입력했을 경우
					if(initValue.strPartyDiv) {
						util.SelectCtl.selectItem(app, "cmbPartyDiv", initValue.strPartyDiv);
					} else {
						util.SelectCtl.selectItem(app, "cmbPartyDiv", 0);
					}
					
					// 사용자명 입력했을 경우
					if(initValue.strNm) {
						app.lookup("ipbNm").value = initValue.strNm;
					}
		
					if(!ValueUtil.isNull(app.lookup("ipbPartyId").value)) {
						//app.lookup("btnSearch").click();
						util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
					}
				}
			});
			/*************** 사용자 구분 코드 조회 END ***************/
		}
	});
	/*************** 공통코드 조회 END ***************/
}


function doList(psStatus){
	var voParams = [{"mapper": "hrm-01"
					 ,"qry": ["selHrmMstList:dsStaff"]
	                 ,"outds": "dsStaff"
	                 ,"param": "dmParam"}];
	                 
	// 미지정 선택 시
	if(app.lookup("cmbPartyDiv").isSelectedByValue("NONE") || app.lookup("cmbPartyDiv").isSelectedByValue("")) {
		voParams = [{"mapper": "hrm-01"
					 ,"qry": ["selHrmMstList:dsStaff"]
	                 ,"outds": "dsStaff"
	                 ,"param": "dmParam"}];
	}
	        
	//조회 서브미션 호출      
	util.Submit.send(app, "subListStaff_tran", voParams, function(pbSuccess){
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005", null, true);
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
			}
		}
	});
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdCodeRowDblclick(/* cpr.events.CGridEvent */ e){
	doCloseOk();
}

/**
 * 데이터를 부모창에 내려준다.(선택닫기 이벤트시 호출)
 */
function doCloseOk(){
	//선택 데이터 유무 체크
	var vaSelectedRowIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdStaff");
	if(vaSelectedRowIdxs.length < 1){
		//선택된 데이터가 없습니다.
		util.Msg.alert("INF-M008");
		return false;
	}
	
	//선택데이터 returnValue로 반환
	var voResult = app.lookup("grdStaff").getRow(vaSelectedRowIdxs[0]).getRowData();
	app.close(voResult);
}

/*
 * "선택닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectClick(/* cpr.events.CMouseEvent */ e){
	doCloseOk();
}

/*
 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	//Enter키 입력시. 데이터 조회
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		//util.Header.dispatchEvent(app, "btnSearch", "click");
		onCombtnsearch1Search();
	}
}





/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch1Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var combtnsearch1 = e.control;
	if(!util.validate(app, "grpSearch")) return false;
	doList();
}
