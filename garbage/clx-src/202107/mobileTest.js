/************************************************
 * mobileTest.js
 * Created at 2021. 7. 23. 오후 3:27:20.
 *
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("open", function(e){
	var control = e.control;
	
	alert("zz");
});

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	app.lookup("cmb1").open();
}


/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	e.preventDefault();
}
