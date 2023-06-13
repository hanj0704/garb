/************************************************
 * tester.js
 * Created at 2023. 5. 9. 오후 2:09:15.
 *
 * @author HANS
 ************************************************/
cpr.core.Platform.INSTANCE.onerror = function(report){
	console.log(report);
};
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	app.lookup("btn3").enabled= false;
	var btn1 = e.control;
//	document.cookie = "lat=1234123412345; domain=0.0.1:52194";
//app.lookup("btn2").enabled  =true;
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	Object.defineProperty(btn2, "enabled", {
		value: false
	})
//	var xhr = new XMLHttpRequest();
//xhr.open('GET', 'http://127.0.0.1:52194/garbage/clx-src/202304/tester.clx.html', true);
//xhr.withCredentials = true;
//xhr.send(null);
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(e){
	var grd1 = e.control;
	var q = grd1.getSelectedRow().getValue("column1");
	app.lookup("ds2").setFilter("column1== '"+q+"'");
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(e){
	var cmb1 = e.control;
	
	console.log(app.lookup("grd2").getSelectedRowIndex());
}
