/*

* FormID(명) : CmmnComCodeReg ( 공통코드 관리 )

* 작성자     : BJ

* 작성일     : 2019/10/25

* 변경로그   : 전환

*/

// 01. 전처리 공통 함수 선언  --------------------------------------------------
var util = createCommonUtil();
util.showLoadMask(app);
// 02. 폼 변수 정의 ------------------------------------------------------------
var fboolSaveChk = true;		// 저장 체크 할지 유무 판단.

// 03. 폼 로드 -----------------------------------------------------------------
function CmmnComCodeReg_OnLoadCompleted(obj)
{
	CommCodeLcdScdLoad();    // 대분류,중분류 콤보로딩
}

// 대분류 콤보로딩
function CommCodeLcdScdLoad()
{
	util.Submit.send(app, "subLOAD", null, function(pbSuccess){
		if(pbSuccess){
			util.SelectCtl.selectItem(app, "cb3", 2);	//조회구분 디폴트값 : 중분류
			util.SelectCtl.selectItem(app, "cb2", 0);
		}
	});
}

// 대분류를 선택시 중분류를 얻어온다.
function cb2_OnChanged(/* cpr.events.CSelectionEvent */ e)
{
	//대분류'전체'선택시 중분류 초기화
	var vsLcd = e.control.value;
	if(ValueUtil.isNull(vsLcd)){
		app.lookup("DS_MIDDLE").clear();
		util.SelectCtl.selectItem(app, "cb1", 0);
		return false;
	}
	
	//대분류코드값
	app.lookup("dmLcdParam").setValue("lcd", vsLcd);
	
	//중분류 로딩
	util.Submit.send(app, "subLOAD2", null, function(pbSuccess){
		if(pbSuccess){
			util.SelectCtl.selectItem(app, "cb1", 0);
		}
	});
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 * 
 * selection-change
 */
function onCb3SelectionChange(/* cpr.events.CSelectionEvent */ e){
	var vsDiv = e.control.value;
	if(vsDiv != "2"){
		util.Control.setEnable(app, false, "cb1");
	}else{
		util.Control.setEnable(app, true, "cb1");
	}
	app.lookup("cb2").value = "";
	app.lookup("cb1").value = "";
	util.Control.redraw(app, "cb2");
	util.Control.redraw(app, "cb1");
}

// 04. 조회 함수 선언  ---------------------------------------------------------
// 조회 실행
function menuFind(psStatus)
{
	if(psStatus != "save"){
		//1. 데이터 변경사항 체크
		if (util.Grid.isModified(app, ["gdMain", "gdDtl"], "CRM")) {
			return false;
		}
	}
	
	app.lookup("DS_CMMN010DTL").clear();
	app.lookup("DS_CMMN010").clear();
	
	//2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;

	//3. 데이터 조회
	util.Submit.send(app, "subFIND", null, function(pbSuccess){
		if(pbSuccess) {
			var DS_CMMN010 = app.lookup("DS_CMMN010");
			if(DS_CMMN010.getRowCount() < 1){
				//조회된 내역이 없습니다.
				util.Msg.notify(app, "INF-M004");
			}else if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005", null, true);
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
			}
			
			util.Control.setEnable(app, true, "grp3");
		}
	});	
}

/*
 * 그리드에서 before-selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트.
 * 
 * before-selection-change
 */
function onGdMainBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	//데이터 변경사항 체크
	if (util.Grid.isModified(app, "gdDtl", "CRM")) {
		e.preventDefault();
	}
}

// 상세조회 실행
function onGdMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
	
	var DS_CMMN010 = app.lookup("DS_CMMN010");
	var rowIndex = app.lookup("gdMain").getSelectedRowIndex();
	//신규행일경우 상세조회X
	var vsState = DS_CMMN010.getRowState(rowIndex);
	if(vsState == cpr.data.tabledata.RowState.INSERTED){
		return false;
	}
	
	//데이터 변경사항 체크
	if (util.Grid.isModified(app, "gdMain", "CRM")) {
		app.lookup("gdMain").selectRows(e.oldSelection, false);
		return false;
	}

	app.lookup("DS_CMMN010").revert();
	
	app.lookup("DS_CMMN010DTL").clear();
	
	var strLcd = DS_CMMN010.getValue(rowIndex, "SCD"); 
	var strCommCd = DS_CMMN010.getValue(rowIndex, "COMM_CD"); 
	app.lookup("dmParamDtl").setValue("lcd", strLcd);
	app.lookup("dmParamDtl").setValue("commCd", strCommCd);
	
	util.Submit.send(app, "subFIND2", null, function(pbSuccess){
		if(pbSuccess) {
			util.Control.setEnable(app, true, "grp3");
		}
	});	
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGdMainUpdate(/* cpr.events.CGridEvent */ e){
	var DS_CMMN010 = app.lookup("DS_CMMN010");
	var rowIndex = app.lookup("gdMain").getSelectedRowIndex();
	var vsState = DS_CMMN010.getRowState(rowIndex);
	//데이터 변경시 하위그리드 막아준다.
	if(vsState != cpr.data.tabledata.RowState.UNCHANGED){
		util.Control.setEnable(app, false, "grp3");
	}
}

// 05. 추가 함수 선언  ---------------------------------------------------------
// 추가 버튼 실행
function menuAdd(/* cpr.events.CGridEvent */ e)
{
	app.lookup("DS_CMMN010DTL").clear();
	util.Control.redraw(app, "grp3");
	var DS_CMMN010 = app.lookup("DS_CMMN010");
	
	//선택된 조회구분값
	var fCheckCode = util.SelectCtl.getItemValue(app, "cb3", util.SelectCtl.getSelectedIndex(app, "cb3"));
	//대표코드 SYS, 세부코드 (MAx+1) 로 세팅
	if (fCheckCode == "1") {
		var Max = DS_CMMN010.getMax("SCD");
		DS_CMMN010.setValue(e.rowIndex, "SCD", parseInt(Max)+1);
		DS_CMMN010.setValue(e.rowIndex, "LCD", "SYS");
		
		DS_CMMN010.setValue(e.rowIndex, "COMM_CD", "SYS"+(parseInt(Max)+1));

	}
	//대표코드 이전행의 코드로 세팅
	else if (fCheckCode == "2") {
		var vsLcdValue="";
		if(e.rowIndex > -1){
			vsLcdValue = DS_CMMN010.getValue((e.rowIndex-1), "LCD");
		}
		DS_CMMN010.setValue(e.rowIndex, "LCD", vsLcdValue);
		DS_CMMN010.setValue(e.rowIndex, "COMM_CD", vsLcdValue);
	}
	
	DS_CMMN010.setValue(e.rowIndex, "USE_FG", "Y");
	DS_CMMN010.setValue(e.rowIndex, "CAMP_FG", "0");
	
	util.Control.setEnable(app, false, "grp3");
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 * 신규 클릭 이벤트
 * 
 */
function onUdcComButtonInsert(/* cpr.events.CGridEvent */ e){
	var DS_CMMN010 = app.lookup("DS_CMMN010");
	var rowIndex = util.Grid.getIndex(app, "gdMain");
	
	var DS_CMMN010DTL = app.lookup("DS_CMMN010DTL");
	
	var fCheckCode = util.SelectCtl.getItemValue(app, "cb3", util.SelectCtl.getSelectedIndex(app, "cb3"));
	//대표코드 이전행의 코드로 세팅
	if(fCheckCode == 1){
		var vsLcdValue = DS_CMMN010.getValue(rowIndex, "SCD");
		DS_CMMN010DTL.setValue(e.rowIndex, "LCD", vsLcdValue);
		
		DS_CMMN010DTL.setValue(e.rowIndex, "COMM_CD", vsLcdValue);
	}
	//대표코드 이전행의 코드, 세부코드 (MAX+1) 로 세팅
	else if(fCheckCode == 2){
		var Max = DS_CMMN010DTL.getMax("SCD");
		var vsScdValue = "";
		if(!ValueUtil.isNull(Max) && isFinite(Max)){
			vsScdValue = parseInt(Max)+1;
		}
		DS_CMMN010DTL.setValue(e.rowIndex, "SCD", vsScdValue);
		
		var vsLcdValue = DS_CMMN010.getValue(rowIndex, "SCD");
		DS_CMMN010DTL.setValue(e.rowIndex, "LCD", vsLcdValue);
		
		DS_CMMN010DTL.setValue(e.rowIndex, "COMM_CD", vsLcdValue+""+vsScdValue);
		
		DS_CMMN010DTL.setValue(e.rowIndex, "USE_FG", "Y");
		DS_CMMN010DTL.setValue(e.rowIndex, "CAMP_FG", "0");
	}
	
	//상위코드 세팅
	var vsUpCd = DS_CMMN010.getValue(rowIndex, "COMM_CD");
	DS_CMMN010DTL.setValue(e.rowIndex, "UP_CD", vsUpCd);
}

// 06. 삭제 함수 선언  ---------------------------------------------------------
// 삭제 버튼 실행
function menuDelete(/* cpr.event.CUIEvent */ e)
{
	//삭제 하시겠습니까?
	if(!util.Msg.confirm("CRM-M002")){
		return false;
	}
}

/*
 * 사용자 정의 컨트롤에서 beforeDelete 이벤트 발생 시 호출.
 * 삭제버튼 클릭전 호출 이벤트(행 삭제전에 체크할 비지니스 로직이 있는 경우 사용)
 */
function onUdcComButtonBeforeDelete(/* cpr.events.CUIEvent */ e){
	//삭제 하시겠습니까?
	if(!util.Msg.confirm("CRM-M002")){
		return false;
	}
}

// 07. 저장 함수 선언  ---------------------------------------------------------
function menuSave()
{
	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, ["gdMain", "gdDtl"], "MSG")) {
		util.Msg.notify(app, "INF-M006");
		return false;
	}
	
	//저장 하시겠습니까?
	if(!util.Msg.confirm("CRM-M001")){
		return false;
	}
	
	// 그리드 유효성 검증
	if(!util.validate(app, ["gdMain", "gdDtl"])) return false;

	// 저장 서브미션 호출
	util.Submit.send(app, "subSAVE", null, function(pbSuccess){
		if(pbSuccess) {
			
			var vsFindRowKey1 = app.lookup("dmfind").getValue("strFindRowKey1");
			if(!ValueUtil.isNull(vsFindRowKey1)){ 
				util.Grid.setFindRowCondition(app, "gdMain",vsFindRowKey1);
				app.lookup("dmfind").setValue("strFindRowKey1", "");
			}
			
			var vsFindRowKey2 = app.lookup("dmfind").getValue("strFindRowKey2");
			if(!ValueUtil.isNull(vsFindRowKey2)){ 
				util.Grid.setFindRowCondition(app, "gdDtl",vsFindRowKey2);
				app.lookup("dmfind").setValue("strFindRowKey2", "");
			}
			
			menuFind("save");
		}
	});	
}

//대표코드, 세부코드 변경시  코드세팅
function setCommCd(psGrid,psDs){

	var rowIndex = util.Grid.getIndex(app, psGrid);
	var DS_CMMN010 = app.lookup(psDs);
	
	var vsLcd = DS_CMMN010.getValue(rowIndex, "LCD");
	var vsScd = DS_CMMN010.getValue(rowIndex, "SCD");

	var rowState = util.Grid.getRowState(app, psGrid, rowIndex);
	if(rowState == cpr.data.tabledata.RowState.INSERTED){
		DS_CMMN010.setValue(rowIndex, "COMM_CD", vsLcd+""+vsScd);
	}
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onEd2ValueChange(/* cpr.events.CValueChangeEvent */ e){
	setCommCd("gdMain","DS_CMMN010");
}
/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onEd3ValueChange(/* cpr.events.CValueChangeEvent */ e){
	setCommCd("gdMain","DS_CMMN010");
}
/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onEd15ValueChange(/* cpr.events.CValueChangeEvent */ e){
	setCommCd("gdDtl","DS_CMMN010DTL");
}
/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onEd16ValueChange(/* cpr.events.CValueChangeEvent */ e){
	setCommCd("gdDtl","DS_CMMN010DTL");
}
