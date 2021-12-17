/************************************************
 * scrollTo.js
 * Created at 2021. 10. 12. 오후 2:53:19.
 *
 * @author HANS
 ************************************************/

//const body = document.body;
//const main = document.getElementById('main');
//
//let sx = 0, // For scroll positions
//    sy = 0;
//let dx = sx, // For container positions
//    dy = sy;
//
//
//body.style.height = main.clientHeight + 'px';
//
//
//main.style.position = 'fixed';
//main.style.top = 0;
//main.style.left = 0;
//
//// Bind a scroll function
//window.addEventListener('scroll', easeScroll);
//
//
//function easeScroll() {
//  
//  sx = window.pageXOffset;
//  sy = window.pageYOffset;
//}
//
//
//window.requestAnimationFrame(render);
//
//function render(){
//  //We calculate our container position by linear interpolation method
//  dx = li(dx,sx,0.07);
//  dy = li(dy,sy,0.07);
//  
//  dx = Math.floor(dx * 100) / 100;
//  dy = Math.floor(dy * 100) / 100;
//  
//  
//  main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;
// 
//  
//  
//  window.requestAnimationFrame(render);
//}
//
function li(a, b, n) {
  return (1 - n) * a + n * b;
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	app.getContainer().addEventListener('scroll', function(ev){
		ev.preventDefault();
	},{passive:false});
}

var dy = 0;
var sy = 0;
/*
 * 루트 컨테이너에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onBodyScroll(/* cpr.events.CUIEvent */ e){
	
//	sy = app.getContainer().getContentPaneRect().top;
//	dy = li(dy,sy,0.07);
//	dy = Math.floor(dy * 100) / 100;
//	app.getContainer().style.transform = 'translage3d(0,'+dy+'px, 0px)'
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
	
//	app.lookup("grp1").style.transform = "translate3d(0px,100px,0px)";
}
