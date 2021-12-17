/************************************************
 * files.js
 * Created at 2020. 2. 13. 오후 7:48:58.
 *
 * @author HANS
 ************************************************/



/*
 * "업로드" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var fi1 = app.lookup("fi1");
	
	var submission = app.lookup("sms1");
	
	submission.addFileParameter(fi1.value, fi1.file);
	
	submission.send();
}
