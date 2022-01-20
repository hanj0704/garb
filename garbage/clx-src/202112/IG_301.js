/************************************************
 * IG_301.js
 * Created at 2021. 10. 13. 오후 1:31:37.
 *
 * @author Hyundaisteel
 ************************************************/


/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGroupScroll(/* cpr.events.CUIEvent */ e){
    /**
     * @type cpr.controls.Container
     */
    var group = e.control;

    var vcGroCrdTab = app.lookup("grpCrdTab");

    var vcAppCont = app.getContainer();

    var vcCntHd = app.getContainer().getChildren()[0];

    if(vcGroCrdTab.getActualRect().top <= vcCntHd.getActualRect().bottom){
        if(vcGroCrdTab.isFloated()){
            return
        }

        vcGroCrdTab.getChildren()[0].style.addClass("inside");

        vcCntHd.style.addClass("border-bottom-0");

        vcGroCrdTab.getParent().floatControl(vcGroCrdTab, {
            top: "0px",
            left: 0,
            right: 0,
            bottom: "0px"
        });
    }
}


/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGroupScroll2(/* cpr.events.CUIEvent */ e){
    /**
     * @type cpr.controls.Container
     */
    var group = e.control;

    var scrollTop = e.target.scrollTop;

    var vcGroCrdTab = app.lookup("grpCrdTab");

    var vcAppCont = app.getContainer();

    var vcCntHd = app.getContainer().getChildren()[0];

    if(scrollTop <= 0){
        vcCntHd.style.removeClass("border-bottom-0");
        vcGroCrdTab.getChildren()[0].style.removeClass("inside");

        app.lookup("grpCnt").addChild(vcGroCrdTab, {
        	autoSize: "height",
        	width: "224px",
        	height: "9000px"
        });

        cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
            app.lookup("grpCnt").scrollTo(0, 395);
        });


    }


}




/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrpCrdWrpScroll(/* cpr.events.CUIEvent */ e){
    /**
     * @type cpr.controls.Container
     */
    var grpCrdWrp = e.control;

    var scrollTop = e.target.scrollTop;

    var vcGroCrdTab = app.lookup("grpCrdTab");

    var vcGrpCrdWrpPrtBt = grpCrdWrp.getParent().getChildren()[0].getActualRect().bottom;

    var dsGrpCrd = app.lookup("dsGrpCrd");

    var vcRdbTab = app.lookup("rdbTab")

    grpCrdWrp.getChildren().forEach(function(each){

    	if(each.getActualRect().top < (vcGrpCrdWrpPrtBt + 200)){
            var vcGrpCrdRow = dsGrpCrd.findFirstRow("card == '" + each.id + "'");
            var vsGrpCrdVal = vcGrpCrdRow.getValue("value");

            if(vcRdbTab.value  != vsGrpCrdVal){
                vcRdbTab.value = vsGrpCrdVal
            }
    	}
    });

    var vcGrpLastCrd = grpCrdWrp.getChildren()[grpCrdWrp.getChildrenCount()-1];

    if(vcGrpLastCrd.getActualRect().bottom <= (grpCrdWrp.getActualRect().bottom - 60)){
        vcRdbTab.value = dsGrpCrd.findFirstRow("card == '" + vcGrpLastCrd.id + "'").getValue("value");
    }

    var vcAppCont = app.getContainer();

    var vcCntHd = app.getContainer().getChildren()[0];

    if(scrollTop <= 0){
        vcCntHd.style.removeClass("border-bottom-0");
        vcGroCrdTab.getChildren()[0].style.removeClass("inside");

        app.lookup("grpCnt").addChild(vcGroCrdTab, {
            autoSize: "height",
            width: "224px",
            height: "9000px"
        });

        cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
            app.lookup("grpCnt").scrollTo(0, 395);
        });


    }


}


/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdbTabSelectionChange( /* cpr.events.CSelectionEvent */ e) {
    /**
     * @type cpr.controls.RadioButton
     */
    var rdbTab = e.control;

    var vcGrpCrdWrp = app.lookup("grpCrdWrp");

    var vcGrpCrdTab = app.lookup("grpCrdTab");

    var vcCntHd = app.getContainer().getChildren()[0];

    if (!vcGrpCrdTab.isFloated()) {
        vcGrpCrdTab.getChildren()[0].style.addClass("inside");

        vcCntHd.style.addClass("border-bottom-0");

        vcGrpCrdTab.getParent().floatControl(vcGrpCrdTab, {
            top: "0px",
            left: 0,
            right: 0,
            bottom: "0px"
        });
    }

     cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
         var dsGrpCrd = app.lookup("dsGrpCrd");

        var vsGrpCrdId = dsGrpCrd.findFirstRow("value =='" + rdbTab.value  + "'").getValue("card");

        /** @type cpr.controls.Container */
        var vcGrpCrd = app.lookup(vsGrpCrdId);

        vcGrpCrdWrp.scrollTo(0 , (vcGrpCrd.getOffsetRect(true).top - 28), 0.5);
    });
}


/*
 * "권한 변경" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
    /**
     * @type cpr.controls.Button
     */
    var button = e.control;

    var vcDmMd = app.lookup("dmMode");

    var vsDmMdVal = vcDmMd.getValue("authority");

    if(vsDmMdVal == "default"){
        vcDmMd.setValue("authority", "gnrlAffairs");
    }else {
        vcDmMd.setValue("authority", "default");
    }
}


/*
 * 데이터맵에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue
 */
function onDmModeUpdate( /* cpr.events.CDataEvent */ e) {
    /**
     * @type cpr.data.DataMap
     */
    var vcDmMd = e.control;

    var vsDmMdVal = vcDmMd.getValue("authority");

    if (vsDmMdVal == "gnrlAffairs") {

        /* 모드에 따라 변경 될 레이아웃을 구분할 사용자속성을 지정한 레이아웃을 찾는다. */
        var vcGrpPrsInfChd = app.lookup("grpPrsInf").getAllRecursiveChildren().filter(function(each) {
            return each instanceof cpr.controls.Container && each.userAttr("chageMode") == "true";
        });

        for (var j = 0; j < vcGrpPrsInfChd.length; j++) {
            changeModeLy(vcGrpPrsInfChd[j], true);
        }

    } else {

        var vcGrpPrsInfChd = app.lookup("grpPrsInf").getAllRecursiveChildren().filter(function(each) {
            return each instanceof cpr.controls.Container && each.userAttr("chageMode") == "true";
        });

        for (var j = 0; j < vcGrpPrsInfChd.length; j++) {
            changeModeLy(vcGrpPrsInfChd[j], false);
        }

    }
}

/**
 *권한 모드에 따라서 레이아웃을 변경합니다.
 * @param {cpr.controls.Container} container
 * @param {Boolean} visible
 */
function changeModeLy(container, visible){

    /** @type cpr.controls.layouts.FormLayout */
    var vcCntLy = container.getLayout();

    vcCntLy.setColumnVisible(0, visible);
}

