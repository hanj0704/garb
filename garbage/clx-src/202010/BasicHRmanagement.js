/************************************************
 * BasicHRmanagement.js
 * Created at 2020. 9. 14. 오전 10:30:10.
 *
 * @author ryu
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", null, function(pbSuccess) {
		if (pbSuccess){
			
				app.lookup("dsList").forEachOfUnfilteredRows(function(dataRow){
				var voRowData = dataRow.getRowData();
				
				voRowData["ORG_NM"] = dataRow.getValue("EMPL_NM");
				voRowData["ORG_CD"] = dataRow.getValue("EMPL_CD");
				voRowData["ORG_UP_CD"] = dataRow.getValue("DEPT_CD");
				voRowData["ORG_EMPL_SE"] = "EMPL";
				
				app.lookup("dsOrg").pushRowData(voRowData);
			});
			var vcTreOrg = app.lookup("treOrg");
			
			vcTreOrg.expandAllItems();
			
			vcTreOrg.redraw();
		}	
	});
}


/*
 * "조직도" 버튼(btnOrg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOrgClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOrg = e.control;

	var btnTgl = app.lookup("btnTgl");	
	var vsTreExp = btnTgl.userAttr("tree-expanded","false");
	btnTgl.click();
	
	
}


/*
 * "개인신상" 버튼(btnIndvdInfo)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnIndvdInfoClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnIndvdInfo = e.control;

	cpr.core.App.load("app/cmn/IndvdlInfo", function(loadedApp){
		var voHostAppIns = app.getHostAppInstance();
		
		if (voHostAppIns){
			/** @type cpr.controls.EmbeddedApp */
			var vcHostEa = app.getHost();
			vcHostEa.app = loadedApp;
		} else {
			loadedApp.createNewInstance().run();
			app.dispose();
		}
	});	
}


/*
 * "근무이력" 버튼(btnWrkHist)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnWrkHistClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnWrkHist = e.control;
	
	cpr.core.App.load("app/cmn/WrkHist", function(loadedApp){
		var voHostAppIns = app.getHostAppInstance();
		
		if (voHostAppIns){
			/** @type cpr.controls.EmbeddedApp */
			var vcHostEa = app.getHost();
			vcHostEa.app = loadedApp;
		} else {
			loadedApp.createNewInstance().run();
			app.dispose();
		}
	});	
}


/*
 * 버튼(btnTgl)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnTglClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnTgl = e.control;
	
	/** @type {"true" | "false"} */
	var vsTreExp = btnTgl.userAttr("tree-expanded");
	
	if (vsTreExp == "true"){ // expand -> collapse
		util.Control.updateConstraint(app, "grpTreOrgWrap", null, {
			left : "-240px"
		});
		
		util.Control.updateConstraint(app, "btnTgl", null, {
			left : "0px"
		});
		
		util.Control.updateConstraint(app, "grpContent", null, {
			left : "20px"
		});
		
		util.Control.setVisible(app, false, "grpTreOrgWrap");
	
		btnTgl.icon = "theme/images/pivot/icon-chevron-right.svg";
		
		btnTgl.userAttr("tree-expanded", "false");
	} else if (vsTreExp == "false") { // collapse -> expand
		util.Control.updateConstraint(app, "grpTreOrgWrap", null, {
			left : "20px"
		});
		
		util.Control.updateConstraint(app, "btnTgl", null, {
			left : "270px"
		});
		
		util.Control.updateConstraint(app, "grpContent", null, {
			left : "300px"
		});
		
		util.Control.setVisible(app, true, "grpTreOrgWrap");
	
		btnTgl.icon = "theme/images/pivot/icon-chevron-left.svg";

		btnTgl.userAttr("tree-expanded", "true");
	}
}



/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTreOrgSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Tree
	 */
	var treOrg = e.control;
	
	var voSelectRow = e.newSelection[0].row;
	var vsEmplSe = voSelectRow.getValue("ORG_EMPL_SE")
	var vcDsList = app.lookup("dsList");
	var voContentLayout = app.lookup("grpContent").getLayout();	
	var vcGrid = app.lookup("grdEmplList");
	if (vsEmplSe == "EMPL") {
		voContentLayout.setColumnVisible(0, false);
		voContentLayout.setColumnVisible(1, true);
		var vsOrgCd = voSelectRow.getValue("ORG_CD");
		var vsEmplCd = voSelectRow.getValue("EMPL_IMG");
		app.lookup("img1").src = vsEmplCd;
	} else {
		
		voContentLayout.setColumnVisible(0, true);
		voContentLayout.setColumnVisible(1, false);
		
		
		var vsOrgCd = voSelectRow.getValue("ORG_CD");
		vcGrid.clearFilter();
		vcGrid.setFilter("DEPT_CD == '"+vsOrgCd+"'");
		app.lookup("img1").src = "./theme/images/img_photo.png";
	}
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcTree = app.lookup("treOrg");
	var vcIpbEmplNm = app.lookup("ipbEmplNm").value;
	
	
	vcTree.clearFilter();
	
	
	vcTree.setFilter("EMPL_NM *= '"+vcIpbEmplNm+"'");
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbEmplNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbEmplNm = e.control;
	
	if(e.keyCode == cpr.events.KeyCode.ENTER) {
		
		app.lookup("btnSearch").click();
	}
}


/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdEmplListRowDblclick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdEmplList = e.control;
	
	var vcTree = app.lookup("treOrg");
	
	var vsEmplCd = e.row.getValue("EMPL_CD");
	
	vcTree.selectItemByValue(vsEmplCd);
	
}
