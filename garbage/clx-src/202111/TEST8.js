/************************************************
 * TEST8.js
 * Created at 2021. 11. 26. 오전 9:38:36.
 *
 * @author ryu
 ************************************************/



/*
 * "플로팅" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var inputBox = app.lookup("ipb1");
	
	app.getContainer().floatControl(inputBox, {
		top: "50px",
		left: "0px",
		right: "0px",
		height: "44px"
	});
}


/*
 * "해제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var inputBox = app.lookup("ipb1");
	
//	app.lookup("wrap").insertChild(0, inputBox, {
//		colIndex : 0,
//		rowIndex : 0
//	});
//	app.lookup("wrap").addChild(inputBox, {
//		colIndex : 0,
//		rowIndex : 0,
//		rowSpan : 1,
//		colSpan : 1
//	});
	app.lookup("wrap").addChild(inputBox, {
		colIndex:0,
		rowIndex:0
	});
	app.getContainer().redraw();
}


/*
 * "플로팅" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var inputBox = app.lookup("ipb2");
	
	app.getContainer().floatControl(inputBox, {
		top: "50px",
		left: "0px",
		right: "0px",
		height: "44px"
	});	
}


/*
 * "해제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var inputBox = app.lookup("ipb2");
	
	app.lookup("wrap2").insertChild(0, inputBox, {
		height: "44px"
	});
}


/*
 * "플로팅" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var inputBox = app.lookup("ipb3");
	
	app.getContainer().floatControl(inputBox, {
		top: "50px",
		left: "0px",
		right: "0px",
		height: "44px"
	});	
}


/*
 * "해제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var inputBox = app.lookup("ipb3");
	
	app.lookup("wrap3").insertChild(0, inputBox, {
		bottom: "0px",
		right: "0px",
		left: "0px",
		height: "44px"
	});
}


/*
 * "해제" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var inputBox = app.lookup("ipb1");

	app.lookup("wrap").replaceConstraint(inputBox, {
		colIndex: 0,
		rowIndex: 0,
		rowSpan : 1,
		colSpan : 1,
		top : "0px"
	});
}
