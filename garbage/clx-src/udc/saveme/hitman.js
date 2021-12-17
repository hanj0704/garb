/************************************************
 * hitman.js
 * Created at 2020. 12. 14. 오전 9:26:39.
 *
 * @author HANS
 ************************************************/

/**
 * 
 * @param {Number} height
 */
exports.arrowBuild = function(height) {
	
	var vnHeight = height;
	
	var vcArrow = app.lookup("arrow");
	var vcCont1 = app.lookup("grp1");
	var vcCont2 = app.lookup("grp2");
	if (vnHeight > 0) {
		vcCont1.style.setClasses("");
		vcCont2.style.setClasses("");
		vcCont1.style.addClass("top-border");
		vcCont2.style.addClass("bottom-border");
		app.lookup("arrow").style.css("top", vnHeight - 25 + "px");
	} 
	else {
		vcCont1.style.setClasses("");
		vcCont2.style.setClasses("");
		vcCont1.style.addClass("bottom-border");
		vcCont2.style.addClass("top-border");
		app.lookup("arrow").style.css("top", vnHeight - 25 + "px");
	}
	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	
	app.lookup("arrow").redraw();
}