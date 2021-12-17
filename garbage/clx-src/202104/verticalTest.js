/************************************************
 * verticalTest.js
 * Created at 2021. 4. 29. 오전 9:43:16.
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
	
	var btn = new cpr.controls.Button(); 
	
	btn.value = "4";
	
	grp.insertChild(99, btn);
	
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
	
	var grp = app.lookup("grp1");
	
	var btn = new cpr.controls.Button(); 
	
	btn.value = "5";
	
	grp.addChild(btn, {
		width : "100px",
		height: "30px",
		autoSize:"none"
	});
	console.log(grp.getActualRect());
	console.log(grp.getOffsetRect());
	console.log(grp.getViewPortRect());
	console.log(grp.getContentPaneRect());
	
}
