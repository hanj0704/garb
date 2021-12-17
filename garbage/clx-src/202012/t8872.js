/************************************************
 * t8872.js
 * Created at 2020. 12. 18. 오후 1:47:54.
 *
 * @author Youminsang
 ************************************************/

cpr.expression.ExpressionEngine.INSTANCE.registerConstant("calcBgcol", function(psValue, psColNm, pcCtrl){
	
	/** @type cpr.controls.Grid*/	
	var vcGrid = pcCtrl;
	
	/** @type cpr.data.DataSet*/
	var vcDs = vcGrid.dataSet;
	
	var a = vcDs.getUnfilteredDistinctValues(psColNm);
	
	var b = a.indexOf(psValue);
	
	if(b%2 == 0){
		return "blue";
	} else {
		return "yellow";
	}
});

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	resetGroupSeq(app.lookup("ds1"), "column1", "group_seq");
}

function resetGroupSeq(/* cpr.data.DataSet */ds, /*string*/colNm, /*string*/gsColNm) {
	var rowCnt = ds.getRowCount();
	var oldVal = null;
	var groupSeq = 0;
	for(var idx = 0; idx < rowCnt; idx++) {
		var row = ds.getRow(idx);
		var newVal = row.getValue(colNm);
		if(oldVal != newVal) {
			groupSeq++;
		}
		row.setValue(gsColNm, groupSeq);
		
		oldVal = newVal;
	}
}



