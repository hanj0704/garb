/************************************************
 * ExpTest.js
 * Created at 2022. 12. 21. 오전 10:48:07.
 *
 * @author HANS
 ************************************************/
cpr.expression.ExpressionEngine.INSTANCE.registerFunction("testFunc", function(ctrl,a){
	console.log(ctrl);
	if(ctrl) {
		return true;
	}
	return false;
		
});
exports.filtMan = function(value){
	console.log(value);
		if(value != "label2") {
			return true;
		} else {
			return false;
		}
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad2(e){
	app.lookup("si1").addItem(new cpr.controls.TreeItem("label7", "value7", ""));
	app.lookup("si1").addItem(new cpr.controls.TreeItem("label8", "value8", ""));
	app.lookup("si2").addItem(new cpr.controls.TreeItem("label7", "value7", ""));
	app.lookup("si2").addItem(new cpr.controls.TreeItem("label8", "value8", ""));
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	app.lookup("si1").filterExp = "@filtMan(label)";
	app.lookup("si2").filterExp = "@filtMan(label)";
	app.getContainer().redraw();
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	app.lookup("si2").filterExp = "testFunc(#btn1, label)";
	app.getContainer().redraw();
}

/*
 * "clearFilter" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	app.lookup("si1").clearFilter();
	app.lookup("si2").clearFilter();
}
