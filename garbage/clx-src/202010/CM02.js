/************************************************
 * CH02.js
 * Created at 2020. 6. 17. 오전 11:10:55.
 *
 * @author HanaTI
 ************************************************/

var util = createCommonUtil();
var trscDvCd = "2";

/*********************************************************************
 *
 * 처리 Action에 따른 분기(화면 공통)
 * Execuet, Cleare, 등등 이벤트 처리
 *
 * *******************************************************************/  
function onActionExecute()
{
	util.DataMap.setValue(app, "input", "trscDvCd", trscDvCd);
	util.Submit.send(app, "subExec", null, function(pbSuccess){
		if(pbSuccess){
			if (trscDvCd =="3"){
				onActionClear();	
			}
		}
	});	

}    
exports.onActionExecute = onActionExecute;

function onActionClear()
{
	util.DataSet.clear(app, "grid01");
	util.DataSet.clear(app, "grid02");
	util.DataSet.clear(app, "grid04");
	trscDvCd = "2";
	util.Grid.reset(app, "grd1");
	util.Group.clearAllChildren(app, "grd2");
}

exports.onActionClear = onActionClear;


function onAfRsprApv()
{
	onActionClear();
}
exports.onAfRsprApv = onAfRsprApv;
/**********************************************************************/


/*
 * "Search" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
    /** 
    * @type cpr.controls.Button
    */
	var button = e.control;
	app.lookup("grid01").clear();
	app.lookup("grid02").clear();

	var valRslt = util.validate(app, "srch");
	if(valRslt==true){
		util.DataMap.setValue(app, "input", "trscDvCd", "2");   
		util.Submit.send(app, "subList", null, function(pbSuccess){
			if(pbSuccess){
				util.Control.setEnable(app, false, "grd2");
				app.lookup("grd1").sort("userId");
			}
		});	
		util.Control.setEnable(app, true, ["btnAdd","btnUpd","btnSave"]);
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrid2SelectionChange(/* cpr.events.CSelectionEvent */ e){
   /** 
    * @type cpr.controls.Grid
    */
	var grid2 = e.control;
	var selRow = grid2.getSelectedRow();
	var rowData = selRow.getRowData();
	
	app.lookup("dm1").build(rowData);
	util.Control.redraw(app, "grd2");
   
   	if(trscDvCd =="3"){
		util.Control.setEnable(app, true, ["grd2"]);		
	}else if(selRow.getState()=="2"&& trscDvCd =="1"){
		util.Control.setEnable(app, true, ["grd2","srchUserId"]);
	}
	else{
		util.Control.setEnable(app, false, ["grd2","srchUserId"]);
	}
	
    var cmbMngr1 = app.lookup("cmbMngr1");
    var cmbMngr2 = app.lookup("cmbMngr2");
    var cmbMngr3 = app.lookup("cmbMngr3");
    var cmbRefnUserId = app.lookup("cmbRefnUserId");

	cmbMngr1.clearSelection();
	cmbMngr2.clearSelection();
	cmbMngr3.clearSelection();
	cmbRefnUserId.clearSelection();
	
	if(rowData["refnUserId"]){
		cmbRefnUserId.selectItemByValue(rowData["refnUserId"]);
	}else{
		cmbMngr1.selectItemByValue(rowData["mngrId1"]);
		cmbMngr2.selectItemByValue(rowData["mngrId2"]);
		cmbMngr3.selectItemByValue(rowData["mngrId3"]);
		
		app.lookup("ipbIpAdr1").value = rowData["mngrIpAdr1"];
		app.lookup("ipbIpAdr2").value = rowData["mngrIpAdr2"];
		app.lookup("ipbIpAdr3").value = rowData["mngrIpAdr3"];	
	}
		
}

/*
 * "Add" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
    /** 
    * @type cpr.controls.Button
    */
	var button = e.control;		 

	var valRslt = util.validate(app, "srch");
	if(valRslt==true){
		var vcGrd1 = app.lookup("grd1");
		var totRow = vcGrd1.getRowCount();
		var selRow = vcGrd1.getSelectedRow();
	
		if(selRow){
			if( selRow.getState()=="2" && selRow.getString("userId")){
				addColumn(vcGrd1);
			}else if(selRow.getState()=="1" && util.Grid.getCellValue(app, "grd1", "userId", totRow-1)){
				addColumn(vcGrd1);
			}
		}else{
			addColumn(vcGrd1);
		}
	}	
}

function addColumn(/* cpr.controls.Grid */ vcGrd1){
		util.Control.setEnable(app, false , ["btnUpd"]);
		util.Control.setEnable(app, true  , ["cmbMngr1"  , "cmbMngr2" , "cmbMngr3"
								 	 ,  "ipbIpAdr1", "ipbIpAdr2", "ipbIpAdr3", "grd2","srchUserId"]);  
		trscDvCd = "1";
		var newRow = vcGrd1.insertRow(vcGrd1.getRowCount());
		var newRowIndex = newRow.getIndex();		
		vcGrd1.focusCell(newRowIndex, 0);
		util.Control.setEnable(app, true, "grd2");
		util.Control.setEnable(app, false, ["btnUpd","btnTmnt"]);
}

/*
 * "Update" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	if(app.lookup("grd1").getSelectedRow()){
		trscDvCd = "3";
		util.Control.setEnable(app, false , ["btnAdd","srchUserId"]);
	    util.Control.setEnable(app, true  , ["grd2"]);	
	}
}


/*
 * "Apply" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var cmbMngr1 		= app.lookup("cmbMngr1");
	var cmbMngr2 		= app.lookup("cmbMngr2");
	var cmbMngr3 		= app.lookup("cmbMngr3");
	var cmbRefnUserId   = app.lookup("cmbRefnUserId");
   
	var grd1 = app.lookup("grd1");
	var grid02 = app.lookup("grid02");
	var dm1 = app.lookup("dm1");
	
	dm1.setValue("mngrUsrNm1", cmbMngr1.text);
	dm1.setValue("mngrUsrNm2", cmbMngr2.text);
	dm1.setValue("mngrUsrNm3", cmbMngr3.text);
	dm1.setValue("refnUserId", cmbRefnUserId.text);
	
	var selRowIdx = grd1.getSelectedRowIndex();
	
	grid02.updateRow(selRowIdx, dm1.getDatas());
}


/*
 * 서치 인풋에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onInpUserIdClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.SearchInput
	 */
	var ipbUserId = e.control;

	util.Dialog.open(app, "biz/cm/CM11", 1000, 850, function(e){
		/** @type cpr.controls.Dialog */
		var dialog = e.control;
		
		var returnValue = dialog.returnValue;
		if(returnValue){
			var userId = returnValue["userId"];
			ipbUserId.value = userId;
			app.lookup("cmbTrscBrNo").selectItemByValue(returnValue["blngBrNo"]);
		}                           
	}, {"blngBrNo":util.Control.getValue(app, "cmbTrscBrNo")}, true);
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Control.setEnable(app, false, ["btnUpd","btnSave","btnAdd","grd2"]);
}



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbRefnUserIdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbRefnUserId = e.control;
	var nm = cmbRefnUserId.value;
   	
   	if(nm){
   		util.Control.setEnable(app, false, ["grdMngrs"]);
   		util.Group.clearAllChildren(app, "grdMngrs");
   	}else{
   		util.Control.setEnable(app, true, ["grdMngrs"]);
   	}
   	
   		var grid04 = app.lookup("grid04");
	var grdIdx = cmbRefnUserId.getDataSetIndexByValue(cmbRefnUserId.value);
		
	app.lookup("cmbMngr1").selectItemByValue(util.DataSet.getCellValue(app, "grid04", grdIdx, "mngrId1"));
	app.lookup("cmbMngr2").selectItemByValue(util.DataSet.getCellValue(app, "grid04", grdIdx, "mngrId2"));
	app.lookup("cmbMngr3").selectItemByValue(util.DataSet.getCellValue(app, "grid04", grdIdx, "mngrId3"));
	
	app.lookup("ipbIpAdr1").value = util.DataSet.getCellValue(app, "grid04", grdIdx, "mngrIpAdr1");
	app.lookup("ipbIpAdr2").value = util.DataSet.getCellValue(app, "grid04", grdIdx, "mngrIpAdr2");
	app.lookup("ipbIpAdr3").value = util.DataSet.getCellValue(app, "grid04", grdIdx, "mngrIpAdr3");
}


/*
 * 콤보 박스에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onCmbRefnUserIdItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbRefnUserId = e.control;

	
}



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbMngr1SelectionChange2(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbMngr1 = e.control;
	var nm = cmbMngr1.value;
	app.lookup("ipbMngr1").text = nm;
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbMngr2SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbMngr2 = e.control;
	var nm = cmbMngr2.value;
	app.lookup("ipbMngr2").text = nm;	
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbMngr3SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbMngr3 = e.control;
	var nm = cmbMngr3.value;
	app.lookup("ipbMngr3").text = nm;
}


/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSrchUserIdSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.SearchInput
	 */
	var srchUserId = e.control;
	util.Dialog.open(app, "biz/cm/CM11", 1000, 850, function(e){
	/** @type cpr.controls.Dialog */
	var dialog = e.control;
	
	var returnValue = dialog.returnValue;
	if(returnValue){
		var userId = returnValue["userId"];
		srchUserId.value = userId;
	}                           
}, {"blngBrNo":util.Control.getValue(app, "cmbTrscBrNo")}, true);	
}
