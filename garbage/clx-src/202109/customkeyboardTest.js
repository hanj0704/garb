/************************************************
 * customkeyboardTest.js
 * Created at 2021. 9. 3. 오후 1:10:15.
 *
 * @author HANS
 ************************************************/



/*
 * 인풋 박스에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onIpb1Blur(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	ipb1.focus();
}
