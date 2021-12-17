/************************************************
 * T7740.js
 * Created at 2020. 8. 31. 오후 5:22:49.
 *
 * @author LHS_0212
 ************************************************/


var timer = null;

/*
 * "Output" 아웃풋에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onOutputMousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var output = e.control;
	
	console.log("마우스 다운");
	alert("ㅁㄴㅇ");
	timer = setInterval(function(){
		console.log("2초간 마우스 클릭");
	}, 2000);
}


/*
 * "Output" 아웃풋에서 mouseup 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 뗄 때 발생하는 이벤트.
 */
function onOutputMouseup(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var output = e.control;
	
	clearInterval(timer);
	
	console.log("마우스 업");
}
