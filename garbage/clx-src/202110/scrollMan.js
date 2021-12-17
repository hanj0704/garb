/************************************************
 * scrollMan.js
 * Created at 2021. 10. 8. 오후 5:48:56.
 *
 * @author HANS
 ************************************************/

var mostart = null;
var mnHan = 0;
var vnHan = 0 ;


var mnStartTime = 0;
var mnEndTime = 0;
var machal = 1;

function fma(pnDura,pnTime) {
	
	var vnDu = pnDura;
	var vnTm = pnTime;
	console.log(vnTm);
	console.log(vnDu/vnTm);
	
//	if()
	if(vnDu/vnTm >500) {
//		
		app.lookup("grd1").scrollTo(0, mostart+24);
		mostart = mostart+24;
		fma(pnDura,pnTime+0.5);
	}
	
}

/*
 * 그리드에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onGrd1Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
//	mostart = e.clientY
	vnHan = e.clientY;
	grd1.addEventListener("mousemove", mousemove);
	app.lookup("opt1").value = "MOUSEDOWN~~";
	mnStartTime = moment().valueOf();
	app.getContainer().addEventListenerOnce("mouseup", function(ev){
		
		
		var hanjin = Math.abs(mostart - mnHan);
		
		mostart = mnHan;
		console.log("START :" +mostart);
		mnEndTime = moment().valueOf();
		
		var hanTime = moment.duration(mnEndTime - mnStartTime).asSeconds();
		
		fma(hanjin,hanTime);
		grd1.removeEventListener("mousemove", mousemove);
	})
}



function mousemove(/*cpr.events.CMouseEvent*/e){
	
	var vnNow = e.clientY;
	var vnDuration = vnHan - vnNow;
	/** @type cpr.controls.Grid */
	var grd = e.control;
	
	grd.scrollTo(0, mostart+vnDuration);
	mnHan = mostart+vnDuration;
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
	
	var vcGrd = app.lookup("grd1");
	
	
}


/*
 * 그리드에서 scroll 이벤트 발생 시 호출.
 * 그리드 디테일 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrd1Scroll(/* cpr.events.CScrollEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	app.lookup("opt3").value = "SCROLLING~~~";
}


/*
 * 그리드에서 touchstart 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
 */
function onGrd1Touchstart(/* cpr.events.CTouchEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	app.lookup("opt2").value = "TOUCHDOWN!~~~";
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	console.log(window.navigator.userAgent);
	app.lookup("opt4").value = window.navigator.userAgent;
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
	
	app.lookup("grp1").scrollTo(0, 950,0.35,cpr.animation.TimingFunction.EASE_IN);
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
	
	app.lookup("grd1").scrollTo(0, 400,0.35,cpr.animation.TimingFunction.EASE_IN);
}
