/************************************************
 * LoadPortStatusBox.js
 * Created at 2021. 6. 14. 오전 10:37:18.
 *
 * @author HANS
 ************************************************/

/**
 * 
 * @param {Number} pnNumber
 */
cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getTranslatedColor",function(pnNumber){
	var vsReturnColor = "";
	switch(pnNumber){
		case 0 :
			vsReturnColor = "blue";
			break;
		case 1 :
			vsReturnColor = "skyblue";
			break;
		case 2 :
			vsReturnColor = "green";
			break;
		case 3 :
			vsReturnColor = "yellow";
			break;
		case 4 :
			vsReturnColor = "red";
			break;
		case 5 :
			vsReturnColor = "orange";
			break;
		default :
			vsReturnColor = ""
			break;
	}
	return vsReturnColor;
});
/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};


exports.dataConnect = function(){
	/** @type cpr.data.DataMap */
	var vcLPDm = app.getAppProperty("lpDataMap");
	
	var vcDm = app.lookup("dmLP");
	
	var voBuildData = vcLPDm.getDatas();
	var vsReplaced = app.getAppProperty("targetId");
	
	
	var vaKeys = Object.keys(voBuildData);
	vaKeys.forEach(function(each){
		
		var repl = each.replace(vsReplaced, "LP");
		voBuildData[repl] = voBuildData[each];
		delete voBuildData[each];
	});
	vcDm.build(voBuildData);
	app.getContainer().redraw();
}


/*
 * 데이터맵에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDmLPLoad(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataMap
	 */
	var dmLP = e.control;
	
	var vnCnt = dmLP.getValue("CTC__LP_WfrCount");
	var vnFoupExist = dmLP.getValue("LP__FoupPlacedStatus");
	var vcFoup = app.lookup("grpFoup");
	var voFormLayout = app.getContainer().getLayout();
	
	if (vnFoupExist == 1) {
		
		voFormLayout.setRowVisible(2, true);
		var voFoupLayout = app.lookup("grpFoup").getLayout();
		var vnLength = voFoupLayout.getColumns().length;
		
		for (var i = vnCnt; i < vnLength; i++) {
			
			voFoupLayout.setColumnVisible(i, false);
		}
		
	} else if (vnFoupExist == 0) {
		
		voFormLayout.setRowVisible(2, false);
	}
}
