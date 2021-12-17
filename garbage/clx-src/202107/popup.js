/************************************************
 * popup.js
 * Created at 2021. 7. 27. 오전 10:24:36.
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
	if(app.getHost() instanceof cpr.controls.Dialog) {
		console.log("성공성공!");
	}
	console.log(app.getHost());
	console.log(app.getContainer().isFloated());
	console.log(app.isUDCInstance());
}
