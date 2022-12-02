///************************************************
// * touchTester.js
// * Created at 2022. 11. 22. 오전 11:31:47.
// *
// * @author HANS
// ************************************************/
//var startX = 0;
//var left1 = -1;
//var accel = 0;
//var suff = null;
//var moveX = 0;
///*
// * 그룹에서 mousedown 이벤트 발생 시 호출.
// * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
// */
//function onGrp1Mousedown(e){
//	var grp1 = e.control;
//	window.addEventListener("mousemove", mousemove);
//	window.addEventListener("mouseup", mouseup);
//	startX = e.clientX;
//	left1 = grp1.getViewPortRect().left;
//	suff = moment();
//	moveX = left1;
//}
//
//function mousemove(/*cpr.events.CMouseEvent*/ev){
//	var clientX = ev.clientX;
//	
//	var move = left1 + startX - clientX;
//	var diff = move - moveX;
//	console.log(diff);
//	app.lookup("grp1").scrollTo(move, 0);
//	moveX = move;
//}
//
//function mouseup(ev){
//	window.removeEventListener("mousemove", mousemove);
//	window.removeEventListener("mouseup", mouseup);
//}
//
//function inertiaMove(){
//		if(Math.abs(this.accel) < 1) {
//		return;
//	} else {
//
//	var vbIsMinus = this.accel < 0? true : false;
//	var vnAbsAccel = Math.abs(this.accel);
//	vnAbsAccel = vnAbsAccel > 3 ? 3 : vnAbsAccel;
//	var vnMoveAmount = 0;
//	var sangsu = 8.24;
//	var vnFriction = Math.floor(vnAbsAccel/sangsu*100)/100;
//	while(vnAbsAccel > 0.7) {
//		vnAbsAccel  = vnAbsAccel * vnFriction;
//		vnMoveAmount +=vnAbsAccel;
//	}
//		vnMoveAmount = Math.floor(vnMoveAmount * 1000);
//	vnMoveAmount = vbIsMinus ? -vnMoveAmount : vnMoveAmount ;
//	var that = this;
//		that.finder.adjustScroll(0, vnMoveAmount,0.5,cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//	}
//}

/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrp1Scroll(e){
	var grp1 = e.control;
	console.log("SCROLLEND");
	
}
