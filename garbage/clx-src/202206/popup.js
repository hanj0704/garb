/************************************************
 * popup.js
 * Created at 2022. 7. 6. 오전 10:57:13.
 *
 * @author HANS
 ************************************************/

/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트.
 */
function onIpb1Keyup(e){
	var ipb1 = e.control;
	console.log("ENTER KEY UP");
	//app.close();
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(e){
	var ipb1 = e.control;
	
	console.log("KEY DOWN");
}
