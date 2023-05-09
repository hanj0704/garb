/************************************************
 * Untitled.js
 * Created at 2023. 4. 10. 오후 1:43:35.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
//	var q = app.lookup("grp1").getLayout();
//	var w = q.getColumnDivisions();
//	var newForm = new cpr.controls.layouts.FormDivision("1fr");
//	w.unshift(newForm);
//	q.setColumnDivisions(w);
	
	app.lookup("grp1").getLayout().insertColumns(["100px"],0);
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	cpr.core.ResourceLoader.loadScript("https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
}
