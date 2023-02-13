/************************************************
 * hook.js
 * Created at 2023. 2. 2. 오전 10:57:46.
 *
 * @author HANS
 ************************************************/

//cpr.core.App.addHook({
//	onCreate: function(_app, exports){
//		console.log(_app);
//		console.log(_app.lookup("btn1"));
//		_app.lookup("btn1").value = "ㅋㅅㅋ";
//		var q = moment().valueOf();
//		for(var i = 0 ; i < 2000; i++) {
//			_app.lookup("btn1").value = "ㅋㅅㅋ"+i;
//			
//		}
//		var w = moment().valueOf();
//		console.log(q);
//		console.log(w);
//	}
//});

var q= 1423;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	console.log(q);
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	hellYeah(app,q);
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	var manage = app.getRootAppInstance().dialogManager;
	console.log(manage.getDialogNames());
	console.log(manage.getActiveDialogName())
}
