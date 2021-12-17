/************************************************
 * Untitled.js
 * Created at 2021. 7. 26. 오후 3:27:34.
 *
 * @author HANS
 ************************************************/

var aq = CheckResponsiveModule(app);


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	aq.start();
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	console.log(app.lookup("c1").value);
	app.lookup("c1").bbb = "zz"
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
	console.log(app.lookup("cbx10").falseValue == "");
}



/*
 * 사용자 정의 컨트롤에서 before-value-change 이벤트 발생 시 호출.
 */
function onC1BeforeValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type udc.aaa.customCbxGrp
	 */
	var c1 = e.control;
	
	console.log(e.newValue);
	
	
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	
	console.log(app.lookup("cbg1").values);
	console.log(app.lookup("cbx1").value);
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
//	app.lookup("cbg1").enable;
}


/*
 * 사용자 정의 컨트롤에서 before-selection-change 이벤트 발생 시 호출.
 */
function onC1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.aaa.customCbxGrp
	 */
	var c1 = e.control;
	
	console.log(c1.value);
}


/*
 * 사용자 정의 컨트롤에서 selection-change 이벤트 발생 시 호출.
 */
function onC1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.aaa.customCbxGrp
	 */
	var c1 = e.control;
	
	console.log(c1.value);
}
