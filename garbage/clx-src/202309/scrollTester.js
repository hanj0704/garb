/************************************************
 * scrollTester.js
 * Created at 2023. 9. 19. 오전 9:10:01.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn16Click(e){
	var btn16 = e.control;
	
	app.lookup("grp1").adjustScroll(300, 0,0.3);
	app.lookup("grp1").adjustScroll(-200, 0,0.3);
}

/*
 * "Button" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(e){
	var btn17 = e.control;
	
	app.lookup("grp1").adjustScroll(300, 0,0.3);
	app.lookup("grp1").adjustScroll(-400, 0,0.3);
}

/*
 * "Button" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(e){
	var btn18 = e.control;
	a(10);
	a(30);
}

var glo = 0;
function a(q){
	glo += q;
	b();
}

var b = _.debounce(function(){
	console.log(glo);
	glo = 0;
}, 50);