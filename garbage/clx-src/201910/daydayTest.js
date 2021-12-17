
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

//	document.documentElement.style.overflow = "hidden";

	var vcGrid = app.lookup("grd1");
	
	console.log(app.lookup("ds1").getRowDataRanged());


//	console.dir(message);
	
	app.lookup("grd1").detail.getColumn(0);
			
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
}


/*
 * 콤보 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onCmb1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
//	e.preventDefault();
//	if(cmb1.isOpened()) {
//		cmb1.close();
//	} else {
//		cmb1.open();
//	}
}
