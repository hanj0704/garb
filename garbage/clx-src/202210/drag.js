/************************************************
 * drag.js
 * Created at 2022. 10. 7. 오후 6:35:04.
 *
 * @author HANS
 ************************************************/

var slid = cpr.core.Module.require("202210/Slidify").slidify;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	var sl = slid(app.lookup("grp1"));
	sl.showCount = 3;
	sl.itemSize = 0;
	sl.showPaginition = true;
	sl.navigationButtonStyle = "none";
	sl.start();
	
	var sl2 = slid(app.lookup("grp2"));
	sl2.showCount = 3;
	sl2.itemSize = 0;
	sl2.showPaginition = true;
	sl2.navigationButtonStyle = "none";
	sl2.start();
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	alert(app.getContainer().overscrollBehavior);
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	alert(navigator.userAgent);
}
