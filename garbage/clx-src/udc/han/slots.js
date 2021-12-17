/************************************************
 * slots.js
 * Created at 2021. 7. 15. 오후 5:06:06.
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



exports.creater = function(pcDm){
	
	/** @type cpr.data.DataMap */
	var vcDm = pcDm;
	app.setAppProperty("hanhab", vcDm);
	
	vcDm.getColumnNames().forEach(function(each){
		
		(function(colNm){
			
		var output = new cpr.controls.Output();
//		output.bind("value").toDataMap(vcDm, each);
			console.log(colNm);
		output.bind("value").toExpression("@hanhab.getValue('"+colNm+"')");
		app.getContainer().addChild(output, {
			width : "100px",
			height: "20px",
			autoSize:"none"
		});
		})(each)
	});
}