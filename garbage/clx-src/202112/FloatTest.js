/************************************************
 * FloatTest.js
 * Created at 2021. 12. 1. 오후 2:30:02.
 *
 * @author HANS
 ************************************************/



/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	var one = app.lookup("ep1");
	var two = app.lookup("ea1");
	var thr = app.lookup("grp1");
	
	app.floatControl(one,{
		top: "0px",
		right: "0px",
		left: "0px",
		height: "110px"
	});
	
	app.floatControl(two,{
		top: "110px",
		right: "0px",
		left: "0px",
		height: "100px"
	});
	
	app.floatControl(thr,{
		top: "210px",
		right: "0px",
		left: "0px",
		height: "100px"
	});
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var a = app.getFirstFocusTraversableControl();
	console.log(a);
}


/*
 * 루트 컨테이너에서 focusin 이벤트 발생 시 호출.
 * 컨트롤 및 컨트롤의 하위 요소가 포커스를 획득하기 직전 발생하는 이벤트.
 */
function onBodyFocusin(/* cpr.events.CFocusEvent */ e){
	console.log();
}
