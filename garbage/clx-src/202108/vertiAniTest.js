/************************************************
 * vertiAniTest.js
 * Created at 2021. 7. 27. 오전 11:43:47.
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
		height : "500px"
	});
//	btn1.style.animateTo({
//		"height" : "500px"
//	},0.5,cpr.animation.TimingFunction.EASE_IN_OUT);
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx1 = e.control;
	
}
