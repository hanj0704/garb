/************************************************
 * tester.js
 * Created at 2022. 11. 30. 오후 5:41:10.
 *
 * @author HANS
 ************************************************/

var mod = cpr.core.Module.require("202212/moduleName");
cpr.core.App.load
exports.heyFunc = function(){
	
	alert("HELLo");
}
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
//	var btn1 = e.control;
//	var ea1 = app.lookup("ea1");
//	//임베디드 앱에 불러와진 앱의 인스턴스 객체가 담겨있음. 이 케이스에서는 son 화면의 앱인스턴스가 담김
//	var ins = ea1.getEmbeddedAppInstance();
//	
//	ins.callAppMethod("childFunc");
//	ins.callAppMethod("testFunc2");
	app.lookup("mdi1").addItemWithApp("202212/son");
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var voExp = new cpr.expression.Expression("'tooltip'").evaluate();
	console.log(voExp);
	console.log(typeof voExp);
	
	app.lookup("opt1").displayExp = voExp;
	//'tooltip'
	
}
exports.test = function(self){
	var q = new cpr.expression.Expression("this.tooltip").evaluate(self);
	console.log(q);//'가가가'
	console.log(typeof q);//string
	return q;//'가가가'
}
function test2(){
	return "value";
}
/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
//									test(app.lookup("opt1"))
	app.lookup("opt1").displayExp = "@test(this)";
//	app.lookup("opt1").displayExp = "'tooltip'";
//	console.log(app.lookup("opt1").displayExp);
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
//	app.lookup("opt1").displayExp = test2();
	app.lookup("opt1").displayExp = "this.tooltip";
}

/*
 * "찾기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	
}
