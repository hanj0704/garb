/************************************************
 * instant.js
 * Created at 2020. 10. 13. 오후 1:32:53.
 *
 * @author HANS
 ************************************************/

//new cpr.data.header.Header("column5", datatype, columntype, defaultValue);




/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
//	var headers = new cpr.data.header.ExpressionHeader("column4", "#ds1.getValue(getIndex()-1 > 0 ?getIndex()-1 : 0 ,\"column2\")");
//	
//	app.lookup("ds1").deleteColumn("column4");
//	app.lookup("ds1").addColumn(headers);
//	
//	
//	var ds = app.lookup("ds1");
//	
//	console.log(ds.getColumnCount());
//app.lookup("grd1").redraw();
//	
console.log(!!document.documentMode);
console.log(document.documentMode);
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTre1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	console.log(e.relativeTargetName);
}
