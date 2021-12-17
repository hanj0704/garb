/************************************************
 * testIn14.js
 * Created at 2020. 7. 14. 오후 2:14:14.
 *
 * @author han
 ************************************************/

cpr.core.Platform.INSTANCE.onerror = function(error){
	console.log(error);	
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
	
	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var mdi = app.lookup("mdi1");
	mdi.addItemWithApp("202007/mdiTest", true,function(item, _app){
		item.content.initValue = {
			"name": "HANJIN",
			"age" : "26"
		};
//		var apis = _app.createNewInstance();
//		apis.run().lookup("btn1").value = "zzzz";
//		apis.setAppProperty("initParameter", {
//		"name": "HANJIN",
//			"age" : "26"
//		});
//		apis.lookup("btn1").value = "ㅋㅋㅋ";
		
		
	});
	
//	app.lookup("msm1").removeAllEventListeners();

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
	
	console.log(app.lookup("sch1").type);
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
	var cust = createKit(app);
	
	app.lookup("grd1").clearSelection();
	cust.clearAllChildren(app, app.lookup("grp1"), false);

	app.lookup("grp1").redraw();
//	app.lookup("cmb1").redraw();
//	app.lookup("cmb2").redraw();
	
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
	
	setA(app.lookup("dm1"));
	
	
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
	var dm = getA();
	
	dm.setValue("column2","쿄쿄쿄쿄쿄");
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	cpr.core.App.load("202007/testIn15", function(loadedApp){
		loadedApp.createNewInstance().run();
		app.close();
	});
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;

	app.lookup("sms1").send();	
}
