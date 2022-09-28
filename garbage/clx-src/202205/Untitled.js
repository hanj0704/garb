/************************************************
 * Untitled.js
 * Created at 2022. 5. 25. 오전 11:24:35.
 *
 * @author HANS
 ************************************************/

cpr.core.AppConfig.INSTANCE.setControlValue("grid", {
	"layout" : {
		topSpacing : 2,
		rightSpacing: 10,
		leftSpacing : 10,
		bottomSpacing : 2
	}
});
///*
// * 루트 컨테이너에서 load 이벤트 발생 시 호출.
// * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
// */
//function onBodyLoad(e){
//	
//	app.lookup("grd1").setWholeRenderingMode(true);
//	app.lookup("grd1").redraw();
//}
//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click(e){
//	var btn1 = e.control;
//	
//}

/*
 * 서치 인풋에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onSearchInputKeydown(e){
	var searchInput = e.control;
	
	e.preventDefault();
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var item = new cpr.controls.CalendarItem("아이템", moment().toDate(), moment().add(3, "day").toDate());
	app.lookup("cal").addItem(item);
	
}
