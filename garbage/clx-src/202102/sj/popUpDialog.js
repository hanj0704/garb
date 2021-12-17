/************************************************
 * popUpDialog.js
 * Created at 2021. 2. 8. 오후 2:44:40.
 *
 * @author csj
 ************************************************/

var emb ;

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	//console.log("popUpDialog.onBodyPropertyChange");
	var appId = app.getAppProperty("appId");
	//console.log(appId);
	var ea123 = app.lookup("ea123");
	/** @type cpr.core.AppInstance */
	var _ea ;
	
	if(e.property == "_app"){
		_ea = app.getAppProperty("_app");
		
		cpr.core.Platform.INSTANCE.register(_ea.app);
		//cpr.core.Platform.INSTANCE.register(_ea);
		emb = _ea;
		console.log(cpr.core.App.peek("test04/emb1"));
		//ea123.app = _ea.app;
		//ea123.app = _ea.app;
		//_ea.app = ea123.app;
		console.log("--*--");
		console.log(_ea.app);
		console.log("--*--");
		
	
	}
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ea1 = app.lookup("ea123");
	console.log(emb.app);
	
	console.log(cpr.core.Platform.INSTANCE.getAllLoadedApps());
	
	//ea1.app = emb.app;
	debugger;
	
//	console.log(cpr.core.App.peek("test04/emb1"));
//		console.log(cpr.core.App.peek("tset06/emb1"));
//		console.log(cpr.core.Platform.INSTANCE.lookup("test04/emb1"));
//		console.log(cpr.core.Platform.INSTANCE.lookup("tset06/emb1"));
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
	/** @type cpr.controls.EmbeddedApp */
	var ea = app.lookup("ea1");
	console.log(ea);
	console.log(ea.getEmbeddedAppInstance());
	console.log(app.app.id);
	cpr.core.App.load("sj/popUpDialog", function(loadedApp){
		console.log(loadedApp);
		ea.app = loadedApp;
	});
	ea.redraw();
	
}
