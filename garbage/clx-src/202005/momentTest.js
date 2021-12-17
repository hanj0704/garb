/************************************************
 * momentTest.js
 * Created at 2020. 5. 7. 오전 10:50:43.
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
	
	
	var datas = moment();
	
	var start = datas.startOf("week");
	var ends = datas.endOf("week");
	
	console.log(start.format("YYYYMMDD"));
	console.log(ends.format("YYYYMMDD"));
}
