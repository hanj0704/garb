/************************************************
 * hyundaiTest.js
 * Created at 2020. 1. 31. 오전 10:57:52.
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

var t1 = moment('202001311500','YYYYMMDDHHmm'); //YYYYMMDDHHmm
	
	var t2 = moment('202001311530','YYYYMMDDHHmm');
	
	console.log(moment.duration(t2.diff(t1)).asMinutes());
}
