/************************************************
 * verticalTest.js
 * Created at 2021. 9. 24. 오후 3:11:05.
 *
 * @author HANS
 ************************************************/


function onBtnClick(/*cpr.events.CMouseEvent*/e){
	/** @type cpr.controls.Button */
	var btn = e.control;
	
	btn.getParent().updateConstraint(btn, {
		height: "5px"
	});
//	btn.style.animateTo({
//		"opacity" : "0"
//	});
	
//	var a = new cpr.animation.Animator(0.35,cpr.animation.TimingFunction.EASE_IN);
	
		
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
	console.log("ANI")
}


/*
 * "Button" 버튼(btn1)에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onBtn1MeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log("MESU");
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
	console.log("TRAN");
}
