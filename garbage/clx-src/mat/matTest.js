/************************************************
 * matTest.js
 * Created at 2023. 7. 5. 오후 3:47:07.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("msm1").send().then(function(input){
		app.lookup("opt1").redraw();
		console.log(app.lookup("dm1").getOriginalValue("column1"));
	});
}

/*
 * "sub" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	app.lookup("sms1").send().then(function(input){
		app.lookup("opt1").redraw();
		console.log(app.lookup("dm1").getOriginalValue("column1"));
	});
}
