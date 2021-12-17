/************************************************
 * arrayTest.js
 * Created at 2021. 10. 26. 오후 5:21:05.
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
	
	var a = [1,2,3,4,5];
	
	
	console.log(a.shift());
	console.log(a);
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
	
	var ds = app.lookup("ds1");
	
	console.log(ds.valueOf());
	console.log(ds);
	console.log(ds.isPrototypeOf("column"));
}
