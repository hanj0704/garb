/************************************************
 * Untitled.js
 * Created at 2020. 10. 27. 오전 9:19:34.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return app.getAppProperty("newProperty1") +" - " + app.getAppProperty("newProperty2");
};

