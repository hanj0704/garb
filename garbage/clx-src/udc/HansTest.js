/************************************************
 * HansTest.js
 * Created at 2020. 6. 5. 오후 1:24:14.
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

exports.values = getValues();

function getValues() {
	
	return app.getAppProperty("valuezz");
}