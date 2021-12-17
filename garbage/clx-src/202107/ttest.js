/************************************************
 * ttest.js
 * Created at 2021. 7. 13. 오후 3:46:28.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	btn1.getParent().updateConstraint(btn1, {
		width : "500px"
	});
	btn1.style.animateTo({
		width : "500px"
	}, 0.5, cpr.animation.TimingFunction.LINEAR)	
}


/*
 * "Button" 버튼(btn1)에서 transitionend 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 종료 후 발생하는 이벤트.
 */
function onBtn1Transitionend(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log("TRANSITIONEND");	
}


/*
 * "Button" 버튼(btn1)에서 transitionstart 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 시작 시 발생하는 이벤트.
 */
function onBtn1Transitionstart(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log("TRANSITIONSTART");
}


/*
 * "Button" 버튼(btn1)에서 animationend 이벤트 발생 시 호출.
 * 애니메이션 종료 후 발생하는 이벤트.
 */
function onBtn1Animationend(/* cpr.events.CAnimationEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log("ANINATIONEND")
}


/*
 * "Button" 버튼(btn1)에서 animationstart 이벤트 발생 시 호출.
 * 애니메이션 시작시 발생하는 이벤트.
 */
function onBtn1Animationstart(/* cpr.events.CAnimationEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log("ANIMATIONSTART");
}
