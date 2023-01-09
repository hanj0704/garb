/************************************************
 * tester.js
 * Created at 2023. 1. 2. 오전 11:16:57.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var ea = app.lookup("ea1");
	cpr.core.App.load("202212/tester4", function(loadedApp){
		ea.app = loadedApp;
		
	});
	
	app.lookup("btn2").getParent().reorderChild(app.lookup("btn2"), 300);
	
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
//	var btn1 = e.control;
//	var parent = app.lookup("btn1").getParent();
//	
//	var btn = new cpr.controls.Button();
//	
//	btn.value = "zz";
//	
//	parent.insertChild(parent.getChildren().length,btn, {
//		"width" : "100px",
//		"height": "25px"
//	});
//	app.lookup("btn2").getParent().reorderChild(app.lookup("btn2"), 300);
	console.log(app.lookup("grp1").getViewPortRect());
	console.log(app.lookup("btn3").getActualRect());
	console.log(app.lookup("btn3").getOffsetRect());
	console.log(app.lookup("btn3").getActualRect(true));
	console.log(app.lookup("btn3").getOffsetRect(true));
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	var ms = app.lookup("msm1");
	ms.addRequestData(path, data);
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(e){
	var fi1 = e.control;
	
	console.log("valuechange");
	console.log(fi1.file);
}
