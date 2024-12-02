/************************************************
 * excelTest.js
 * Created at 2024. 11. 27. 오전 9:31:49.
 *
 * @author HAN
 ************************************************/

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	ExcelUtilW.exportExcelJsToJSON(app.lookup("grd1"));
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	var grd = app.lookup("grd1");
	
//	var q = grd.detail.getControlAttr(1, 1, "_h_class");
//	console.log(q);
	for(var i=0; i<grd.getRowCount(); i++){
		
		console.log(grd.detail.getControlAttr(i,1,"_h_class"));
	}
	debugger;
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	
	var button = e.control;
	
	var btns = app.lookup("btns");
	btns.htmlAttr("temp-key", "stamped");
	cpr.core.DeferredUpdateManager.INSTANCE.update();
	var ele = document.body.querySelector("div[data-usr-temp-key='stamped'");
//	var ele = document.querySelector("div[data-usr-temp-key='stamped'")W
	console.log(ele.classList);
	btns.removeHtmlAttr("temp-key");
	
	console.log(app.lookup("btns").style.getBaseClassName());
	console.log(app.lookup("btns").style.getClasses());
//	debugger;
//	Object.defineProperty(cpr.controls.UIControl, "_h_class", {
//		get: function(){
//			return this.style.getClasses();
//		}
//	});
//	Object.defineProperty(app.lookup("opt1"), "_h_class", {
//		get: function(){
//			console.log(this.style.getClassBindInfo());
//			return this.style.getClasses();
//		}
//	});
//	app.lookup("opt1")._h_class = app.lookup("opt1").style.getClasses();
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var button = e.control;
	var q = [1,2,3,4,5,1,3,2];
//	console.log([...new Set(q)]);
}
