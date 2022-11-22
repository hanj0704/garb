/************************************************
 * touchTester.js
 * Created at 2022. 11. 22. 오전 11:31:47.
 *
 * @author HANS
 ************************************************/

var startX = 0;
/*
 * 그룹에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onGrp1Mousedown(e){
	var grp1 = e.control;
	grp1.addEventListener("mousemove", mousemove);
	grp1.addEventListenerOnce("mouseup", mouseup);
	startX = e.clientX;
	
}

function mousemove(/*cpr.events.CMouseEvent*/ev){
	/** @type cpr.controls.Container */
	var control = ev.control;
	var clientX = ev.clientX;
	console.log(startX-clientX);
}

function mouseup(ev){
	/** @type cpr.controls.Container */
	var control = ev.control;
	control.removeEventListener("mousemove", mousemove);
}

function inertiaMove(){
		if(Math.abs(this.accel) < 1) {
		return;
	} else {

	var vbIsMinus = this.accel < 0? true : false;
	var vnAbsAccel = Math.abs(this.accel);
	vnAbsAccel = vnAbsAccel > 3 ? 3 : vnAbsAccel;
	var vnMoveAmount = 0;
	var sangsu = 8.24;
	var vnFriction = Math.floor(vnAbsAccel/sangsu*100)/100;
	while(vnAbsAccel > 0.7) {
		vnAbsAccel  = vnAbsAccel * vnFriction;
		vnMoveAmount +=vnAbsAccel;
	}
		vnMoveAmount = Math.floor(vnMoveAmount * 1000);
	vnMoveAmount = vbIsMinus ? -vnMoveAmount : vnMoveAmount ;
	var that = this;
		that.finder.adjustScroll(0, vnMoveAmount,0.5,cpr.animation.TimingFunction.EASE_OUT_CUBIC);
	}
}