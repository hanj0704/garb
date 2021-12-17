/************************************************
 * ipbs.js
 * Created at 2020. 1. 6. 오후 4:32:21.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};


/**
 * 검색창의 값을 지정하는 함수입니다.
 * @param {String} psIpbValue
 */
exports.setIpbValue = function(psIpbValue) {
	
	app.lookup("ipb1").value = psIpbValue;
//	app.lookup("ipbSearch").redraw();
}