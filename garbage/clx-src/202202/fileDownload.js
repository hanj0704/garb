/************************************************
 * fileDownload.js
 * Created at 2022. 2. 15. 오전 9:19:14.
 *
 * @author HANS
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
	
	
	var a = app.lookup("grd1").getExportData({
		exceptStyle : true,
		applyFormat : true
	});
	
	var sms = app.lookup("sms1");
	
	sms.setRequestObject(a);
	
	sms.send();
}
