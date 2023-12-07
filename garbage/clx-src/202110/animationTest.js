/************************************************
 * animationTest.js
 * Created at 2021. 10. 19. 오전 9:55:50.
 *
 * @author HANS
 ************************************************/


var mnDelayTime = 2;
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
//	app.createWorkflow().exec(function(value){
	var timer = 0;
//	setTimeout(function() {
////		app.lookup("btn2").style.css("transform", "rotate(-90deg)");
//		app.lookup("btn2").style.animateTo("rotate(-90deg)", timer, cpr.animation.TimingFunction.LINEAR);
//		setTimeout(function() {
//			
////			app.lookup("btn2").style.css("transform", "rotate(-120deg)");
//			app.lookup("btn2").style.animateTo("rotate(-120deg)", timer, cpr.animation.TimingFunction.LINEAR);
//			setTimeout(function() {
//				
////				app.lookup("btn2").style.css("transform", "rotate(-150deg)");
//				app.lookup("btn2").style.animateTo("rotate(-150deg)", timer, cpr.animation.TimingFunction.LINEAR);
//				setTimeout(function() {
//					
////					app.lookup("btn2").style.css("transform", "rotate(-180deg)");
//					app.lookup("btn2").style.animateTo("rotate(-180deg)", timer, cpr.animation.TimingFunction.LINEAR);
//					setTimeout(function() {
//						
////						app.lookup("btn2").style.css("transform", "rotate(-210deg)");
//						app.lookup("btn2").style.animateTo("rotate(-210deg)", timer, cpr.animation.TimingFunction.LINEAR);
//						setTimeout(function() {
//							
////							app.lookup("btn2").style.css("transform", "rotate(-240deg)");
//							app.lookup("btn2").style.animateTo("rotate(-240deg)", timer, cpr.animation.TimingFunction.LINEAR);
//							setTimeout(function() {
//								
////								app.lookup("btn2").style.css("transform", "rotate(-270deg)");
//								app.lookup("btn2").style.animateTo("rotate(-270deg)", timer, cpr.animation.TimingFunction.LINEAR);
//								
//							}, 500)
//						}, 500)
//					}, 500)
//				}, 500)
//			}, 500)
//		}, 500)
//	}, 500)
//	}).exec(function(value){
		
//	})
//	setTimeout(function(){
//		
//	app.lookup("btn2").style.css("transform","rotate(0deg)");
//	app.lookup("btn2").style.css("transform","rotate(180deg)");
//	app.lookup("btn2").style.css("transform","rotate(0deg)");
//	app.lookup("btn2").style.css("transform","rotate(-60deg)");
//	}, 5000);
	setTimeout(function(){
		
	
	app.lookup("btn2").style.animateTo({
			"transform" : "rotate(-90deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	app.lookup("btn2").style.animateTo({
			"transform" : "rotate(90deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	app.lookup("btn2").style.animateTo({
			"transform" : "rotate(0deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	app.lookup("btn2").style.animateTo({
			"transform" : "rotate(180deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	app.lookup("btn2").style.animateTo({
			"transform" : "rotate(0deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	app.lookup("btn2").style.animateTo({
			"transform" : "rotate(-60deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	}, 1000);
}
