/************************************************
 * Zoom.js
 * Created at 2021. 5. 17. 오후 1:45:41.
 *
 * @author ryu54
 ************************************************/

/**
 * 글자 크기 조정 최대/최소 값
 */
var maZmSize = [90, 120];

/**
 * 글자 크기 조정 간격
 */
var mnZmUnit = 5;

/**
 * 현재 글자 크기
 */
var mnCurrentZmSize = 100;

/**
 * 글자 크기 확대하거나 축소합니다.
 * @param {"in" | "out"} psZoom
 */
function zoomFontSize(psZoom) {
	var vnZmSize = psZoom == "in" ? mnCurrentZmSize + mnZmUnit : mnCurrentZmSize - mnZmUnit;
	if (vnZmSize < maZmSize[0]){
		alert("최소 축소입니다.");
		return;
	} else if (vnZmSize > maZmSize[1]) {
		alert("최대 확대입니다.");
		return;
	}
	
	/* 브라우저마다 zoom을 해석하는 방식이 달라 다음과 같이 처리 */
	//app.lookup("eaCn").style.css("zoom", vnZmSize + "%");
	
	var vcEaCn = app.lookup("ea1");
	var voEaAppIns = vcEaCn.getEmbeddedAppInstance();
	if (!voEaAppIns){
		return;
	}
	
	var vcEaCont = voEaAppIns.getContainer();
	vcEaCont.style.removeClass("zoom-" + mnCurrentZmSize);
	vcEaCont.style.addClass("zoom-" + vnZmSize);
	
	mnCurrentZmSize = vnZmSize;
}

/*
 * "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	zoomFontSize("in");
}


/*
 * "-" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	zoomFontSize("out");
}


/*
 * 임베디드 앱에서 load 이벤트 발생 시 호출.
 * 임베디드 앱이 준비되고 그려진 후에 디스패치 되는 이벤트.
 */
function onEa1Load(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.EmbeddedApp
	 */
	var ea = e.control;
	
	var voEaAppIns = ea.getEmbeddedAppInstance();
	if (voEaAppIns){
		var container = voEaAppIns.getContainer();
		container.childCombinatorClass = "cl-out";
	}
}
