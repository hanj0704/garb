/************************************************
 * test01.js
 * Created at 2022. 11. 30. 오후 10:09:43.
 *
 * @author JSYOU
 ************************************************/

/*
 * "TEST" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var output = app.lookup("test01");
	
	output.visible = !output.visible
//	app.lookup("grp1").redraw();
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var output = app.lookup("test01");
//	output.visible = false;
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var output = app.lookup("test01");
	output.visible = false;
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	app.lookup("grp1").getLayout().spacing = 40;
	app.lookup("grp1").redraw();
}
