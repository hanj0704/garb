/************************************************
 * excelTest.js
 * Created at 2020. 8. 6. 오전 10:56:26.
 *
 * @author han
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
//	
	var q =	app.lookup("grd1").getExportData({
		exceptStyle : false,
		applyFormat : false
	});
	
	console.log(q);
	app.lookup("sms1").setRequestObject(q);
//	
	app.lookup("sms1").send();
}
