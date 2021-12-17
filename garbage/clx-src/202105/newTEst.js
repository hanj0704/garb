/************************************************
 * newTEst.js
 * Created at 2021. 5. 24. 오전 9:48:17.
 *
 * @author HANS
 ************************************************/
String.prototype.replaceAll = function(org,dest) {
	return this.split(org).join(dest);
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
	
	
	var a = 5
	
	var b = [a];
	
	console.log(b);
	b.push("4");
	
	console.log(b);
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
	
	
	var a = app.lookup("opt1").value;
	
	var q = a.replaceAll("\\n","&#xD;&#xA;");
	console.log(q);
	app.lookup("opt1").value = q;
	
	app.lookup("opt1").redraw();
}
