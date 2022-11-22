/************************************************
 * hsTest.js
 * Created at 2021. 7. 19. 오후 5:46:43.
 *
 * @author HANS
 ************************************************/
var isExpanded = false;


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vcGrpCont = app.getContainer();
	var vcGrpMenuWrap = app.lookup("grpMenuWrap");
	
	vcGrpCont.floatControl(vcGrpMenuWrap, {
		top:  "0px",
		left:"0px",
		width: "15px",
		height : "800px"
	});
}


/*
 * "▶" 버튼(btnOpen)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOpen = e.control;
	var vcGrpCont = app.getContainer();
	var vcGrpMenuWrap = app.lookup("grpMenuWrap");
	var vcGrpMenu = app.lookup("grpMenu");
	
	if (isExpanded) {
		console.log("ㅋㅎㅅㅋ");
//		var animator = new cpr.animation.Animator(0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//		animator.addTask(function(p) {
//			vcGrpCont.updateConstraint(vcGrpMenuWrap, {width: 401});
//			
			vcGrpMenuWrap.style.animateTo({
				"width" : "19px"
			},0.35,cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//		});
		
//		vcGrpMenuWrap.addEventListenerOnce("transitionend", function(){
//			console.log("ㅋㅅㅋㅋㅋㅋㅋ");
//			vcGrpMenu.visible = false;
//		})
//		animator.run().then(function() {
			isExpanded = !isExpanded;
			
			
			btnOpen.value = "▶";
//			animator.stop();
//			btnOpen.style.addClass("open");
//			if (btnOpen.style.hasClass("close")) {
//				btnOpen.style.removeClass("close");
//			}
//		});
	} else {
//		vcGrpMenu.visible = true;
//		animator.addTask(function() {
//			vcGrpCont.updateConstraint(vcGrpMenuWrap, {width: "401px"});
//			app.lookup("grpMenu").getParent().updateConstraint(app.lookup("grpMenu"), {
//				"width" : "380px"
//			});
			app.lookup("grpMenu").style.animateTo({
				"width" : "100px"
			}, 0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
			vcGrpMenuWrap.style.animateTo({
				"width" : "401px"
			}, 0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//		});
		
//		animator.run().then(function() {
			isExpanded = !isExpanded;
			
			
			
			btnOpen.value = "◀";
//		});
	}
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
	
	console.log(app.lookup("grpMenuWrap").getActualRect());
}
