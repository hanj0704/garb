/************************************************
 * udcTest.js
 * Created at 2020. 8. 19. 오전 9:41:44.
 *
 * @author han
 ************************************************/



/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	app.lookup("udcTest").valueChanger();
}


