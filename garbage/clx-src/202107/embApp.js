/************************************************
 * embApp.js
 * Created at 2021. 7. 19. 오후 2:46:20.
 *
 * @author HANS
 ************************************************/

var isExpanded = false;

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var a = !app.lookup("복지지도").getAppProperty("expanded");
	console.log(a);
	app.lookup("복지지도").setAppProperty("expanded", a);
	
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
//		var animator = new cpr.animation.Animator(0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//		animator.addTask(function() {
			vcGrpCont.updateConstraint(vcGrpMenuWrap, {width: "19px"});
			
//			vcGrpMenuWrap.style.animateTo({
//				"width" : "19px"
//			}, 0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//		});
		
//		animator.run().then(function() {
			isExpanded = !isExpanded;
			
//			vcGrpMenu.visible = false;
			
			btnOpen.value = "▶";
//			btnOpen.style.addClass("open");
//			if (btnOpen.style.hasClass("close")) {
//				btnOpen.style.removeClass("close");
//			}
//		});
	} else {
//		var animator = new cpr.animation.Animator(0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//	vcGrpMenu.visible = true;
//		animator.addTask(function() {
			vcGrpCont.updateConstraint(vcGrpMenuWrap, {width: "401px"});
			
//			vcGrpMenuWrap.style.animateTo({
//				"width" : "401px"
//			}, 0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//		});
//		
//		animator.run().then(function() {
			isExpanded = !isExpanded;
			
			
			
			btnOpen.value = "◀";
			vcGrpCont.addEventListenerOnce("transitionend", function(){
				console.log("ㅋㅅㅋ");
			})
//			btnOpen.style.addClass("close");
//			if (btnOpen.style.hasClass("open")) {
//				btnOpen.style.removeClass("open");
//			}
//		});
	}
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vcGrpCont = app.getContainer();
	var vcGrpMenuWrap = app.lookup("복지지도");
	
	
	vcGrpCont.floatControl(vcGrpMenuWrap, {
		top: "0px",
		bottom: "0px",
		left:  "0px",
		width: "19px"
	});
}
