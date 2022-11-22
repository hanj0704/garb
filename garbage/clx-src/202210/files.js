/************************************************
 * files.js
 * Created at 2022. 10. 20. 오후 3:57:02.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	app.lookup("sms1").send();
}
