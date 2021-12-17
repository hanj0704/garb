/************************************************
 * HanYangTest.js
 * Created at 2019. 10. 1. 오후 1:02:19.
 *
 * @author ryu
 ************************************************/

/* 레이아웃 정보  */
var mnSubMenuWrapMargin = 15;

/* 현재 보여지고 있는 메뉴 인덱스 */
var mnShowingSubMenuIdx = 0;

var a = 6;
cpr.expression.ExpressionEngine.INSTANCE.registerFunction("abcc", function(){
	if(mnShowingSubMenuIdx == 0) {
		return false;
	} else {
		return true;
	}
});

function moveRight (){
	var vcGrpSubMenuWrap = app.lookup("grpSubMenuWrap");

	var vaSubMenus = vcGrpSubMenuWrap.getChildren();
	
	var voTargetOffsetRect = vaSubMenus[mnShowingSubMenuIdx].getOffsetRect();
	
	vcGrpSubMenuWrap.scrollTo(voTargetOffsetRect.left, 0, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT);
}


/**
 * 선택된 라디오 버튼 아이템을 통해 하위 메뉴를 그립니다.
 */
 function createSubMenuContent() {
 	var vcDsMenu = app.lookup("dsMenu");
 	
 	var vnSubMenuItemCount = vcDsMenu.getRowCount();
 	
 	if (vnSubMenuItemCount == 0){
 		alert("하위 메뉴가 없습니다.");
 		return;
 	}

	var vnStartGroup = 1;
	var vnMaxGroup = _.max(vcDsMenu.getColumnData("group"));
	
	while(vnStartGroup <= vnMaxGroup){
		/* Create SubMenu Wrap Container */
		var vcGrpSubMenuListWrap = createSubMenuListWrap(vnStartGroup);
		
		/* Create SubMenu Title */
		createSubMenuListTitle(vcGrpSubMenuListWrap, vnStartGroup);
		
		/* Create SubMenu */
		createSubMenuList(vcGrpSubMenuListWrap, vnStartGroup);
		
		vnStartGroup++;
	}
	
	/* Create PageIndex for SubMenu */
	createPageIndex();
 }
 
 
 /**
  * 서브 메뉴 타이틀과 서브 메뉴를 배치할 그룹을 동적으로 생성합니다.
  *  @param {Number} pnGroup 현재 그려질 서브 메뉴 그룹 인덱스
  */
 function createSubMenuListWrap(pnGroup) {
 	var vcGrpSubMenuListWrap = new cpr.controls.Container("grpSubMenu" + pnGroup);
 	var voGrpSubMenuListWrapLayout = new cpr.controls.layouts.VerticalLayout();
 	
 	/* Set Container Infos */
 	vcGrpSubMenuListWrap.style.addClass("sub-menu-wrap");
 	
 	/* Set Container's Layout Infos' */
 	voGrpSubMenuListWrapLayout.leftMargin = mnSubMenuWrapMargin;
 	voGrpSubMenuListWrapLayout.rightMargin = mnSubMenuWrapMargin;
 	voGrpSubMenuListWrapLayout.scrollable = false;
 	
 	/* Set Layout */
 	vcGrpSubMenuListWrap.setLayout(voGrpSubMenuListWrapLayout);
 	
 	/* add Container into SubMenuMenuWrap Container */
 	app.lookup("grpSubMenuWrap").addChild(vcGrpSubMenuListWrap, {
		height : "300px",
 		width : "175px"
 	});
 	
 	return vcGrpSubMenuListWrap;
 }
 

/**
 * 서브 메뉴 타이틀을 동적으로 생성합니다.
 * @param {cpr.controls.Container} pcParentContainer 부모 컨트롤 (컨테이너/그룹)
 * @param {Number} pnGroup 현재 그려질 서브 메뉴 그룹 인덱스
 */
function createSubMenuListTitle(pcParentContainer, pnGroup) {
	var vcDsMenu = app.lookup("dsMenu");
	
	/* Find Title Label */
	var voRootSubMenu = vcDsMenu.findFirstRow("group == " + pnGroup);
	var vsRootSubMenuLabel = voRootSubMenu.getValue("cd_nm");
	
	/* Create Output Dynamically */
	var vcSubMenuItemTitle = new cpr.controls.Output("optSubMenuTitle" + pnGroup);
	
	/* set Output Title Infos */
	vcSubMenuItemTitle.value = vsRootSubMenuLabel;
	vcSubMenuItemTitle.style.addClass("menu-title");
	
	/* add Title Output into SubMenuListWrap Container */
	pcParentContainer.addChild(vcSubMenuItemTitle, {
		autoSize : "height",
		width : "100%",
		height : "30px"
	});
	
	return vcSubMenuItemTitle;
}


/**
 * 서브 메뉴를 동적으로 생성합니다.
 * @param {cpr.controls.Container} pcParentContainer 부모 컨트롤 (컨테이너/그룹)
 * @param {Number} pnGroup 현재 그려질 서브 메뉴 그룹 인덱스
 */
function createSubMenuList(pcParentContainer, pnGroup) {
	var vcDsMenu = app.lookup("dsMenu");
	
	/* Create ListBox Dynamically */
	var vcSubMenuList = new cpr.controls.ListBox("lbxSubMenu" + pnGroup);
	
	/* set ListBox infos */
	vcSubMenuList.style.addClass("sub-menu");
	
	/* Link Dataset */
	vcSubMenuList.setItemSet(app.lookup("dsMenu"), {
		label : "label",
		value : "value",
		tooltip : "label"
	});

	/* Data Filter */
	var vsFilterCondition = "group == '" + pnGroup + "'";
	vcSubMenuList.setFilter(vsFilterCondition);
	
	
	/* add ListBox into SubMenuListWrap Container */
	pcParentContainer.addChild(vcSubMenuList, {
		autoSize : "height",
		width : "175px"
	});
	
	pcParentContainer.redraw();
	
	return vcSubMenuList;
}


/**
 * 그려진 서브 메뉴에 따라 페이지 인덱서를 동적으로 생성합니다.
 */
function createPageIndex() {
	var vcGrpPageIndexWrap = app.lookup("grpPageIndexWrap");
	
	var vcGrpSubMenuWrap = app.lookup("grpSubMenuWrap");
	
	var vnSubMenuChildrenCount = vcGrpSubMenuWrap.getChildrenCount();
	
	for(var idx = 0; idx < vnSubMenuChildrenCount - 4; idx++){
		/* Create Output Dynamically */
		var vcPageIndex = new cpr.controls.Output("optPageIdx" + (idx + 1));
			vcPageIndex.userAttr("idx", idx.toString());
		
		/* set PageIndex Infos */
		vcPageIndex.style.addClass("sm-pageidx");
		
		if (idx == 0){
			vcPageIndex.style.addClass("on");
		}
		
		/* Add Click Event */
		vcPageIndex.addEventListener("click", function(e) {
			var vcControl = e.control;
			var vsControlId = vcControl.id;
			console.log(vcControl.userAttr("idx"));
			
			if(mnShowingSubMenuIdx > Number(vcControl.userAttr("idx"))) {
				mnShowingSubMenuIdx = Number(vcControl.userAttr("idx")+1);
				var vcGrpSubMenuWrap = app.lookup("grpSubMenuWrap");

				app.lookup("btnPrev").click();
			} else {
				mnShowingSubMenuIdx = Number(vcControl.userAttr("idx")-1);
			
				app.lookup("btnNext").click();
			}
			
			/* Set Style When It Clicked */
			vcGrpPageIndexWrap.getChildren().forEach(function(each){
				each.style.removeClass("on");
			});
			
			vcControl.style.addClass("on");
		});
		
		/* Add PageIndex into PageIndexWrap Container */
		vcGrpPageIndexWrap.addChild(vcPageIndex, {
			width : "10px",
			height : "5px"
		});	
	}
}


/**
 * 이전으로 슬라이드 버튼의 활성화 상태를 변경합니다.
 * @param {Boolean} pbEnable
 */
function setSlidifyPrevButtonStatus(pbEnable) {
	app.lookup("btnPrev").enabled = pbEnable;
}


/**
 * 다음으로 슬라이드 버튼의 활성화 상태를 변경합니다.
 * @param {Boolean} pbEnable
 */
function setSlidifyNextButtonStatus(pbEnable) {
	app.lookup("btnNext").enabled = pbEnable;
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("rdbMenu").selectItem(0);
}


/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdbMenuSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdbMenu = e.control;
	
	//TODO 서브미션을 통해 선택된 라디오 버튼의 value 값으로 서브 메뉴 데이터를 불러와야 합니다.
	
	createSubMenuContent();
}


/*
 * "<" 버튼(btnPrev)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPrevClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPrev = e.control;
	
	if (mnShowingSubMenuIdx <= 0){
		return;
	}

	mnShowingSubMenuIdx--;
	
	var vcGrpSubMenuWrap = app.lookup("grpSubMenuWrap");

	var vaSubMenus = vcGrpSubMenuWrap.getChildren();
	console.log(mnShowingSubMenuIdx);
	var vcTargetSubMenu = vaSubMenus[mnShowingSubMenuIdx];
	
	var voTargetOffsetRect = vcTargetSubMenu.getOffsetRect();
	
	vcGrpSubMenuWrap.scrollTo(voTargetOffsetRect.left, 0, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT);
}


/*
 * ">" 버튼(btnNext)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNextClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNext = e.control;

	mnShowingSubMenuIdx++;
	app.lookup("btnPrev").redraw();
	var vcGrpSubMenuWrap = app.lookup("grpSubMenuWrap");

	var vaSubMenus = vcGrpSubMenuWrap.getChildren();
	console.log(mnShowingSubMenuIdx);	
	var voTargetOffsetRect = vaSubMenus[mnShowingSubMenuIdx].getOffsetRect();
	
	vcGrpSubMenuWrap.scrollTo(voTargetOffsetRect.left, 0, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT);
}
