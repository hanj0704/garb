/************************************************
 * tester2.js
 * Created at 2022. 1. 4. 오후 4:31:00.
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
//	var a = new aqbq();
//	var b = [1,5,2,3,7];
//	b.sort(function(a,b){
//		return a - b;
//	});
//	console.log(b);

	var con = app.getContainer();
	console.log(con.getActualRect());
	console.log(con.getViewPortRect());
	console.log(con.getContentPaneRect());
}

function aqbq(){
	
	this.col();
	
}

aqbq.prototype.col = function(){
	
	alert("hi world");
}

/*
 * 루트 컨테이너에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	
}
