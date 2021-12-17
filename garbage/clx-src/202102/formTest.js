/************************************************
 * formTest.js
 * Created at 2021. 2. 19. 오후 5:55:26.
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
	
	var grp = app.lookup("grp1");
	
	grp.getLayout().removeRows([grp.getLayout().getRows().length-1]);
	
	grp.redraw();
}


/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrp2Scroll(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp2 = e.control;
	var a = grp2.getViewPortRect();
	
	app.lookup("grp3").scrollTo(a.left, a.top);
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
	
	
	var a = moment("202102","YYYYMM");
	
	var b = moment();
	
	console.log(b.diff(a,"days"));
	
	
	console.log(app.lookup("grp3").getViewPortRect());
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
	
	var a= moment("20210221","YYYYMMDD");
	
	console.log(a.isoWeekday());
	console.log(a.day());
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	app.lookup("ho").aaaa = app.lookup("ds1").getRowDataRanged();
}


/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var btns = new cpr.controls.Button();
	
	btns.value = "5";
	app.lookup("grp5").floatControl(btns,{
		"width" : "100px",
		"height" : "25px",
		"top" : "20px",
		"left" : "20px"
	});
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	app.lookup("grp6").getLayout().setUseRowShade(1, true);
//	app.lookup("grp6").getLayout().rowShade
	app.lookup("grp6").redraw();
}
