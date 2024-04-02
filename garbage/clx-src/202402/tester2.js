/************************************************
 * tester2.js
 * Created at 2024. 2. 26. 오후 3:04:39.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
		var han = new cpr.animation.Animator(0.3,cpr.animation.TimingFunction.EASE_IN);
	han.addTask(function(time){
//		console.log(time);
		app.lookup("grp1").scrollTo(0, 300,0.3,cpr.animation.TimingFunction.EASE_IN);
	});
	
	han.run().then(function(input){
		console.log("하하");
	});
}

/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrp1Scroll(e){
	var grp1 = e.control;
	console.log("scroll");
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click2(e){
	var btn3 = e.control;
	cpr.core.App.load("202402/tester", function(loadedApp){
		app.lookup("ea1").app = loadedApp;
	});
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	app.lookup("ea1").app = null;
}
