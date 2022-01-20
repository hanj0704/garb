/************************************************
 * dataViewTest.js
 * Created at 2021. 12. 30. 오전 10:04:52.
 *
 * @author HANS
 ************************************************/

cpr.expression.ExpressionEngine.INSTANCE.registerFunction("isHan", function(self){
	
	
	return true;
});

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var ds = app.lookup("ds1");
	var dv = app.lookup("dv1");
	dv.refresh();
	console.log(dv.getFilter());
	console.log(dv.getRowDataRanged());
	
}
