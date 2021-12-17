/************************************************
 * Floating.js
 * Created at 2021. 1. 5. 오후 3:41:32.
 *
 * @author ryu54
 ************************************************/



/*
 * "플로팅" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	/* 오버레이(레이어) 동적 생성 */
	var vcGrpCvr = new cpr.controls.Container();
	vcGrpCvr.style.css({
		"opacity" : "1",
		"background-color" : "rgba(0,0,0,.25)"
	});
	
	/* 오버레이 내에 어사이드 영역을 붙임 */	
	var vcGrpAsd = app.lookup("grpAside");
	vcGrpCvr.addChild(vcGrpAsd, {
		top : "0px",
		bottom : "0px",
		left : "0px",
		width: "260px"
	});
	
	/* 애니메이션 추가 */
	vcGrpAsd.style.css("opacity", "1");
	vcGrpAsd.style.animateFrom({
		"opacity" : "0",
		"transform" : "translate3d(-10%, 0px, 0px)"
	}, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT);
	
	/* 오버레이 클릭 시 플로팅이 해제되도록 함 */
	vcGrpCvr.addEventListenerOnce("click", function(e){
		var control = e.control;
		
		app.getContainer().insertChild(0, vcGrpAsd, {
			top : "0px",
			bottom : "0px",
			left : "-260px",
			width : "260px"
		});
		
		/* 오버레이 파기 */
		control.dispose();
	});
	
	/* 어사이드 영역을 플로팅 */
	app.floatControl(vcGrpCvr, {
		top : "0px",
		right : "0px",
		bottom : "0px",
		left : "0px"
	});
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpAsideClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpAside = e.control;
	
	e.stopPropagation();
}
