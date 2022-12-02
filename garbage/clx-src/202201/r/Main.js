/************************************************
 * Main.js
 * Created at 2022. 11. 22. 오후 4:38:47.
 *
 * @author HANS
 ************************************************/
var util = createCommonUtil();
var maResultRow = [];
var mnSampleLength;
/**
 * Result 영역에 추가되는 아이템을 동적으로 생성하는 함수입니다.
 * @param {cpr.data.Row} poRow
 * @param {Array} paUpCode
 * @param {String} psSearchValue
 * @param {Boolean} pbIsModule
 */
function createResultItem(poRow, paUpCode, psSearchValue,pbIsModule) {
	var vsMenuNmColNm = "MENU_NM";
	var vsDescColNm = "DESC";
	var vsTagsColNm = "TAG";
	if(!pbIsModule) {
		vsMenuNmColNm = "label";
		vsDescColNm = "desc";
		vsTagsColNm = "tag";
	}
	var group_10 = new cpr.controls.Container();
	group_10.style.setClasses(["border-top"]);
	var formLayout_4 = new cpr.controls.layouts.FormLayout();
	formLayout_4.scrollable = false;
	formLayout_4.topMargin = "10px";
	formLayout_4.rightMargin = "20px";
	formLayout_4.bottomMargin = "10px";
	formLayout_4.leftMargin = "20px";
	formLayout_4.horizontalSpacing = "6px";
	formLayout_4.verticalSpacing = "6px";
	formLayout_4.setColumns(["1fr"]);
	formLayout_4.setRows(["19px", "24px", "24px","0px"]);
	formLayout_4.setRowAutoSizing(3, true);
	group_10.setLayout(formLayout_4);
	(function(container) {
		var group_11 = new cpr.controls.Container();
		var flowLayout_3 = new cpr.controls.layouts.FlowLayout();
		flowLayout_3.scrollable = false;
//		flowLayout_3.horizontalSpacing = 8;
//		flowLayout_3.verticalSpacing = 0;
		group_11.style.setClasses(["breadcrumbs"]);
		group_11.setLayout(flowLayout_3);
		paUpCode.forEach(function(/*{label:String,value:String}*/each) {
			(function(container) {
				var output_2 = new cpr.controls.Output();
				output_2.value = each.label;
				output_2.userAttr("eachValue",each.value);
				output_2.style.setClasses(["breadcrumb-item"]);
				output_2.addEventListener("click", function(e){
					console.log("clicked");
					var control = e.control;
					var vsAttr = control.userAttr("eachValue");
					//TODO
//					var vcTargetDs = null;
//					if(pbIsModule) {
//					} else {
//						
//					}
					console.log(pbIsModule);
					//TODO 메뉴명이기 때문에 해당 메뉴를 클릭했을 때, 다른 탭에서 메뉴별보기를 따로 볼 수 있게 처리하기
				});
				container.addChild(output_2, {
					"autoSize": "width",
					"width": "100px",
					"height": "19px"
				});
			})(group_11);
		});
		container.addChild(group_11, {
			"colIndex": 0,
			"rowIndex": 0
		});
		var vcMenuNm = new cpr.controls.Output();
		vcMenuNm.value = poRow.getValue(vsMenuNmColNm);
		vcMenuNm.ellipsis = true;
		vcMenuNm.style.setClasses(["text-link","fs-lg","fw-medium"]);
		container.addChild(vcMenuNm, {
			"colIndex": 0,
			"rowIndex": 1
		});
		
		var vcOptDesc = new cpr.controls.Output();
		vcOptDesc.value = poRow.getValue(vsDescColNm);
		vcOptDesc.tooltip = poRow.getValue(vsDescColNm);
		vcOptDesc.ellipsis = true;
		vcOptDesc.style.setClasses(["text-gray-600"]);
		container.addChild(vcOptDesc,{
			"colIndex" : 0,
			"rowIndex" : 2
		})
		var vaTags = poRow.getString(vsTagsColNm).split(",");
		if(ValueUtil.fixNull(poRow.getString(vsTagsColNm)) != "" && vaTags.length > 0){
			
			var vcTagCont = new cpr.controls.Container();
			var voTagFlowLayout = new cpr.controls.layouts.FlowLayout();
			voTagFlowLayout.scrollable = false;
			voTagFlowLayout.horizontalSpacing = 8;
			vcTagCont.setLayout(voTagFlowLayout);
			vaTags.forEach(function(each) {
				var vcOptTags = new cpr.controls.Output();
				vcOptTags.value = each;
				vcOptTags.style.setClasses(["badge", "badge-secondary-dim","fs-sm","cursor-pointer"]);
				vcOptTags.addEventListener("click", function(ev){
					/** @type cpr.controls.Output */
					var control = ev.control;
					var vsFilterValue = control.value;
					createTagFilter(vsFilterValue);
				});
				vcOptTags.ellipsis = true;
				vcTagCont.addChild(vcOptTags, {
					width: "100px",
					height: "20px",
					autoSize: "width"
				});
			});
			container.addChild(vcTagCont, {
				"colIndex": 0,
				"rowIndex": 3
			});
//		} else {
			formLayout_4.setColumnVisible(3, false);
		}
	})(group_10);
	app.lookup("grpSearchResult").addChild(group_10, {
		"width": "1240px",
		"height": "136px",
		"autoSize":"height"
	});
	
}
/**
 * 검색값을 컬럼 내에 포함하고 있는 행을 찾아 검색 결과 행을 전역변수에 저장하는 함수입니다.
 */
function createSearchResult(){
	
	/** @type String */
	var vsSearchValue = util.Control.getValue(app, "srch1").toLowerCase();
	vsSearchValue = vsSearchValue.replace(/([\'\"\\])/g, "");
	var vcGrpSrchRes = app.lookup("grpSearchResult");
	var vcDsAllMenu = app.lookup("dsSampleMenu");
	var vcDsModMenu = app.lookup("dsMn");
	var vaAllRow = vcDsAllMenu.findAllRow("(MENU_DESC).toLowerCase() *= '"+vsSearchValue+"'");
	vaAllRow = vaAllRow.filter(function(each){
		return ValueUtil.fixNull(each.getValue("CALL_PAGE")) != "";
	});
	var vaModAllRow = vcDsModMenu.findAllRow("(MENU_DESC).toLowerCase()*= '"+vsSearchValue+"'");
	vaModAllRow = vaModAllRow.filter(function(each){
		return ValueUtil.fixNull(each.getValue("appId")) != "";
	});
	var vnSampleLength = vaAllRow.length;
	mnSampleLength = vaAllRow.length;
	vcGrpSrchRes.removeAllChildren();
	maResultRow = [];
	var vaConcatedArr = [...vaAllRow,...vaModAllRow];
	util.Control.setValue(app, "optSearchCnt", vaConcatedArr.length);
	if(vaConcatedArr.length < 1) {
		util.Control.setVisible(app, false, "pgi1");
		return;
	}
	maResultRow = vaConcatedArr;
	
	app.lookup("grpTagFilter").removeAllChildren();
	var vcPgi = app.lookup("pgi1");
//	vcPgi.visible = true;
	vcPgi.currentPageIndex = 1;
	setFilterAndDraw();
}

/**
 * 검색된 행 정보에 추가적인 필터 옵션을 추가하고 정제된 행 정보를 가지고
 * 검색 결과 아이템을 생성하는 함수를 호출합니다.
 */
function setFilterAndDraw(){
	var vcPgi = app.lookup("pgi1");
	var vnCount = vcPgi.currentPageIndex-1;
	var vnPageRowCnt = vcPgi.pageRowCount;
	var vcGrpTags = app.lookup("grpTagFilter");
	var vaChildrenVals = vcGrpTags.getChildren().map(function(each){
		return each.value;
	});
	var vaFilteredRow = maResultRow;
	if(vaChildrenVals.length > 0) {
		vaFilteredRow = maResultRow.filter(function(each){
			return vaChildrenVals.every(function(eachs){
				return each.getString("TAG").indexOf(eachs) != -1;
			});
			
		});
	}
	vcPgi.totalRowCount = vaFilteredRow.length;
	app.lookup("grpSearchResult").removeAllChildren();
	util.Control.setVisible(app, vaFilteredRow.length > 0, "pgi1");
	util.Control.setValue(app, "optSearchCnt", vaFilteredRow.length);
	var slices = vaFilteredRow.slice(vnCount*vnPageRowCnt,(vnCount+1)*vnPageRowCnt);
	slices.forEach(function(each,idx){
		/** @type cpr.controls.SideNavigation */
		var vcThisSideNav = app.lookup("navSample");
		var vsValueColNm = "MENU_ID";
		var vbIsSample = true;
		if(vnCount*vnPageRowCnt+idx >= mnSampleLength) {
			vcThisSideNav = app.lookup("navModule");
			vsValueColNm = "value";
			vbIsSample = false;
		}
		var vaItems = [];
		/** @type cpr.controls.TreeItem */
		var voItem = vcThisSideNav.getItemByValue(each.getValue(vsValueColNm));
		var voParent = voItem.parentItem;
		while(voParent) {
			vaItems.unshift({"label" : voParent.label,"value" : voParent.value});
			voParent = voParent.parentItem;
		}
		createResultItem(each,vaItems,"",vbIsSample);
		
	});
}
/**
 * 
 * @param {String} psTagId
 */
function createTagFilter(psTagId){
	
	var vcGrpTagFilt = app.lookup("grpTagFilter");
	var vaChildren = vcGrpTagFilt.getChildren();
	var vcFindedValue = vaChildren.find(function(ele){
		if(ele.value == psTagId) {
			return ele;
		}
	});

	if(vcFindedValue) {
		return;
	}
	var vcTagButton = new cpr.controls.Button();
	vcTagButton.value = psTagId;
	vcTagButton.style.setClasses(["btn-i-close","bg-primary-dim"]);
	vcTagButton.icon = "theme/base/images/controls/button/ic_btn.png";
	vcTagButton.iconAlign = "right";
	vcTagButton.addEventListener("click", function(ev){
		var control = ev.control;
		control.dispose();
		app.lookup("pgi1").currentPageIndex = 1;
		setFilterAndDraw();
	});
	
	vcGrpTagFilt.addChild(vcTagButton, {
		width: "80px",
		height: "30px",
		autoSize: "width"
	});
	app.lookup("pgi1").currentPageIndex = 1;
	setFilterAndDraw();
}

/**
 * 화면에 팝업을 플로팅하는 함수입니다. 팝업외의 영역을 클릭하면 팝업이 닫힙니다.
 * @param {cpr.controls.UIControl} pcControl
 * @param {{top:String, right:String, bottom:String, left:String, width:String, height:String}} poConstraint
 * @param {closeCallback : Function, modal : Boolean} poOption? 추가옵션
 */
function floating(pcControl, poConstraint,poOption) {
	var vcFloatingTarget = pcControl;
	
	var vcGrpCont = app.getContainer();
	
	var vcGrpOverlay = new cpr.controls.Container();
	vcGrpOverlay.setLayout(new cpr.controls.layouts.XYLayout());
	
	vcGrpOverlay.userAttr("floated-configuration", "true");
	
	vcGrpOverlay.addEventListenerOnce("click", function(e) {
		unfloating(vcFloatingTarget);
		
		if (hasOption("closeCallback") && _.isFunction(poOption["closeCallback"])) poOption["closeCallback"]();
	});
	
	if(pcControl.getParent()) {
		
		pcControl._originParent = pcControl.getParent();
		pcControl._originIndex = pcControl.getParent().getChildren().indexOf(pcControl);
		pcControl._originConstraint = pcControl.getParent().getConstraint(pcControl);
		pcControl._originVisible = pcControl.visible;
	}
	
	vcGrpCont.addChild(vcGrpOverlay, {
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px"
	});
	if(hasOption("modal")) {
		vcGrpOverlay.style.addClass("cl-overlay");
	} 
	
	util.Control.setVisible(app, true, vcFloatingTarget.id);
	
	vcGrpCont.floatControl(vcFloatingTarget, poConstraint);
	
	vcFloatingTarget.focus();
	
	/**
	 * poOption 옵션 파라미터가 존재하는지 체크하는 함수입니다. 
	 * @param {String} psParamName
	 */
	function hasOption(psParamName) {
		if(ValueUtil.fixNull(poOption) != "" && poOption[psParamName]) {
			return true;
		} else {
			return false;
		}
	}
}


/**
 * 열렸던 팝업을 닫는 함수입니다. 별도의 호출없이, floating된 팝업이 있을 때 팝업 외의 영역을 클릭하면 수행됩니다.
 * @param {cpr.controls.UIControl} pcControl
 */
function unfloating(pcControl) {
	var vcGrpCont = app.getContainer();
	
	vcGrpCont.getChildren().filter(function(each){
		return each.userAttr("floated-configuration") == "true";
	}).forEach(function(each){
		vcGrpCont.removeChild(each, true);
	});
		
/** @type cpr.controls.Container */
	var vcOriginParent = pcControl._originParent;
	if(vcOriginParent) {
		
		vcOriginParent.insertChild(pcControl._originIndex, pcControl,pcControl._originConstraint);
		util.Control.setVisible(app, pcControl._originVisible, pcControl.id);
	} else {
		
		var voActualRect = pcControl.getActualRect();
		vcGrpCont.addChild(pcControl, {
			top : "10px",
			bottom : "10px",
			left : -250 + "px",
			width : voActualRect.width + "px"
		});
	}
	if (pcControl.userAttr("prevent-hide") == "true"){
		util.Control.setVisible(app, true, pcControl.id);
	}
	
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var vcGrpHeader = app.lookup("grpHeader");
	var vcTab = app.lookup("tab1");
	vcGrpHeader.getParent().updateConstraint(vcGrpHeader, {
		height: "calc(100% - 37px)",
	});
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	util.Submit.send(app, "subSampleMenuList", function(){
		var vcTempSide = new cpr.controls.SideNavigation("navSample");
		vcTempSide.setItemSet(app.lookup("dsSampleMenu"), {
			label: "MENU_NM",
			value: "MENU_ID",
			parentValue: "UP_MENU_ID"
		});
		app.register(vcTempSide);
	});
	util.Submit.send(app, "subModuleMenuList", function(){
		var vcTempSide2 = new cpr.controls.SideNavigation("navModule");
		vcTempSide2.setItemSet(app.lookup("dsMn"), {
			label: "label",
			value: "value",
			parentValue: "parent"
		});
		app.register(vcTempSide2);
	});
	
	util.Submit.send(app, "subSampleResultList", function(pbSuccess,pcSub){
		/** @type cpr.protocols.Submission */
		var vcSubmission = pcSub;
		var vsResText = vcSubmission.xhr.responseText;
		/** @type {{key:String,value:Array}[]} */
		var vaResData = JSON.parse(vsResText)["data"];
		var vcAc = app.lookup("ac1");
		vcAc.getSectionItems().forEach(function(each){
			vcAc.deleteSection(0);
		});
		vaResData.forEach(function(each){
			var vcTempSectionItem = new cpr.controls.SectionItem();
			vcTempSectionItem.title = each.key;
			(function(item){
				var vcTempGrp = new cpr.controls.Container();
				var vcFlowLayout = new cpr.controls.layouts.FlowLayout();
				vcFlowLayout.topMargin = 5;
				vcFlowLayout.bottomMargin = 5;
				vcFlowLayout.leftMargin = 10;
				vcFlowLayout.rightMargin = 10;
				vcFlowLayout.scrollable = true;
				vcFlowLayout.horizontalSpacing = 10;
				vcFlowLayout.verticalAlign = 5;
				vcTempGrp.setLayout(vcFlowLayout);
				item.content = vcTempGrp;
				
				var vaValues = each.value;
				vaValues.forEach(function(eachVal){
					var vcTempButton = new cpr.controls.Button();
					vcTempButton.value = eachVal;
					vcTempButton.style.setClasses(["btn-txt","fs-sm"]);
					vcTempGrp.addChild(vcTempButton, {
						width : "50px",
						height : "30px",
						autoSize : "both"
					});
					vcTempButton.addEventListener("click", function(evt){
						var vsValue = evt.control.value;
						util.Control.setValue(app, "srch1", vsValue);
						app.lookup("srch1").search();
					});
				});
			
			})(vcTempSectionItem);
			
			vcAc.addSection(vcTempSectionItem);
			
			
		});
	});
}

/*
 * 루트 컨테이너에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(e){
	var vsScreenName = e.screen.name;
	var vcGrpCont = app.lookup("grpContent");
	if(vcGrpCont.visible) {
	var vcGrpSearch = app.lookup("grpSearch");
	//	20px 80px 80px 160px
		var vsTopM = "20px";
		var vsRightM = "80px";
		var vsBottomM = "80px";
		var vnLeftM = 160;
		var vsSearchLeft = "280px";
		var vbLogoVisible = true;
		switch(vsScreenName){
			case "mobile" :
				vnLeftM = 40;
				vsBottomM = "40px",
				vsRightM = "40px";
				vsSearchLeft = "40px";
				vbLogoVisible = false;
				vcGrpSearch.getParent().replaceConstraint(vcGrpSearch, {
				left: "40px",
				height : "50px",
				top : "25px",
				right : "60px"
			});
				break;
			case "tablet" :
				vnLeftM = 40;
				vsBottomM = "40px",
				vsRightM = "40px";
				vsSearchLeft = "40px";
			default :
				vcGrpSearch.getParent().replaceConstraint(vcGrpSearch, {
				left: "280px",
				height : "50px",
				top : "25px",
				width : "500px"
//				,right : "60px"
			});
				break;
		}
	
			app.lookup("imgLogo").visible = vbLogoVisible;
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
			vcGrpCont.getLayout().topMargin = vsTopM;
			vcGrpCont.getLayout().rightMargin = vsRightM;
			vcGrpCont.getLayout().bottomMargin = vsBottomM;
			vcGrpCont.getLayout().leftMargin = vnLeftM+"px";
			app.lookup("grpTabLeft").getParent().addHeaderControl(app.lookup("grpTabLeft"),{"position": "left", "width": vnLeftM});
	//			app.lookup(grp)
			
		});
		
	} else {
		
		var vcEmbDashboard = app.lookup("grpDashboard");
		if(vsScreenName == "mobile") {
			vcEmbDashboard.getParent().updateConstraint(vcEmbDashboard, {
				left: "40px",
				right: "40px"
			});
		} else {
			
			vcEmbDashboard.getParent().updateConstraint(vcEmbDashboard, {
				left: "140px",
				right: "140px"
			});
		}
	}
}

/*
 * 서치 인풋에서 value-change 이벤트 발생 시 호출.
 * SearchInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onSrch1ValueChange(e){
//	var searchInput = e.control;
//	var vcGrpContent = app.lookup("grpContent");
//		
//	if(!vcGrpContent.visible){
//		
//		var vcGrpHeader = app.lookup("grpHeader");
//		var vcGrpSearch = app.lookup("grpSearch");
//		var vcTab = app.lookup("tab1");
//			vcGrpSearch.getLayout().setRowVisible(0, false);
//			vcGrpSearch.getLayout().setRowVisible(2, false);
//			util.Control.setVisible(app, true, "imgLogo");
//			vcGrpSearch.getParent().replaceConstraint(vcGrpSearch, {
//				left: "280px",
//				height : "50px",
//				top : "25px",
//				width : "500px"
//			});
//			vcGrpHeader.getParent().updateConstraint(vcGrpHeader, {
//				height : "80px"
//			});
//			var vsScreenName = app.targetScreen.name;
//			if(vsScreenName == "mobile") {
//				util.Control.setVisible(app, false, "imgLogo");
//			}
//			util.Control.setVisible(app, true, ["btnMnuToggle","tab1","grpContent","btnLink"]);
//			util.Control.setVisible(app, false, "grpFooter");
//	}
//	createSearchResult();
}
/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSrch1Search(e){
	var searchInput = e.control;
	var vcGrpContent = app.lookup("grpContent");
		
	if(!vcGrpContent.visible){
		
		var vcGrpHeader = app.lookup("grpHeader");
		var vcGrpSearch = app.lookup("grpSearch");
		var vcTab = app.lookup("tab1");
			vcGrpSearch.getLayout().setRowVisible(0, false);
			vcGrpSearch.getLayout().setRowVisible(2, false);
			util.Control.setVisible(app, true, "imgLogo");
			vcGrpSearch.getParent().replaceConstraint(vcGrpSearch, {
				left: "280px",
				height : "50px",
				top : "25px",
				width : "500px"
			});
			vcGrpHeader.getParent().updateConstraint(vcGrpHeader, {
				height : "80px"
			});
			var vsScreenName = app.targetScreen.name;
			if(vsScreenName == "mobile") {
				util.Control.setVisible(app, false, "imgLogo");
			}
//			util.Control.setVisible(app, true, ["btnMnuToggle","tab1","grpContent","btnLink"]);
			util.Control.setVisible(app, true, ["tab1","grpContent"]);
			util.Control.setVisible(app, false, ["grpFooter","grpDashboard"]);
			util.Control.setValue(app, "btnMnuToggle", "");
			util.Control.setValue(app, "btnLink", "");
			app.getContainer().redraw();
	}
	createSearchResult();
	
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPgi1SelectionChange(e){
	var pgi1 = e.control;
	
//	createSearchResult();
	setFilterAndDraw();
}

/*
 * 버튼(btnLink)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLinkClick(e){
	var btnLink = e.control;
	var vnRight = btnLink.getActualRect().right;
	var vnInnerWidth = window.innerWidth;
	vnRight = vnInnerWidth - vnRight;
	console.log(vnRight);
	floating(app.lookup("grpLink"), {
		right: vnRight+"px",
		top : "54px"
	});
}

/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpLinkClick(e){
	var grpLink = e.control;
	var vcEvTargetCtrl = e.targetControl;
	if(vcEvTargetCtrl instanceof cpr.controls.Button) {
		var vsRedirectURL = "";
		var vsValue = vcEvTargetCtrl.value;
		switch(vsValue){
			case "테크돔" :
				vsRedirectURL = "https://techdom.tomatosystem.co.kr"
				break;
			case "체험판" :
				break;
			case "EDU" :
				vsRedirectURL = "https://edu.tomatosystem.co.kr";
				break;
			case "디자인가이드" :
				vsRedirectURL = "./pb/com/EXBSP.clx.html";
			default :
				break;
		}
		
		window.open(vsRedirectURL);
	}
}

/*
 * 버튼(btnMnuToggle)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMnuToggleClick(e){
	var btnMnuToggle = e.control;
	util.Dialog.openFullPagePop(app, "exb/com/main/Sitemap", function(){
		
	});
}

