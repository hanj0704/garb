/************************************************
 * angleTest.js
 * Created at 2021. 7. 14. 오전 9:05:46.
 *
 * @author HANS
 ************************************************/

var angle = 0;
var animator = new cpr.animation.Animator(0.5,cpr.animation.TimingFunction.LINEAR);
/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	var vcGrpRbt = app.lookup("grp1");
	var nbe = app.lookup("nbe1").numberValue;
	
	var vnAzimuth = parseInt(nbe/90);
	var vnRemain = nbe%90;
//	if(vnAzimuth == 4) {
//		vnAzimuth = 0;
//	}
	console.log(angle);
	console.log(vnAzimuth);
	angle = angle%360;
	console.log(vnAzimuth-Math.abs(angle/90));
	switch(vnAzimuth-Math.abs(angle/90)){
		case 1 :
		if(angle ==90) {
			angle += 90;
		} else {
			
			angle -= 90;
		}
			break;
		case 2 :
		angle -= 180;
			break;
		case 3 : 
		angle += 90;
			break;
		case -1 :
		angle += 90;
			break;
		case -2 :
		angle += 180;
			break;
		case -3 :
		if(nbe ==360){
			
			angle += 90;
		} else{
			
			angle -= 90;
		}
			break;
		default :
			break;
	}
//	if(mbe < 0) {
//		console.log("아 띠용~");
//		nbe = (360-nbe) * -1;
//	} else {
//		
//	if(nbe > 270) {
//		console.log("ㅋㅅㅋ");
//		if(nbe > mbe) {
//			console.log("ㅋㅋ");
//			nbe = (360-nbe)*-1;
//		} else {
////			nbe = (360-nbe)*-1;
//			console.log("타긴하냐?");
//		}
//		
//	}
//	}
//	mbe =  nbe;
//	if(nbe == 360) {
//		mbe = -1;
//	}
console.log(angle);
		
	vcGrpRbt.style.animateTo({
			"transform" : "rotate(" + (angle) + "deg)"
		},0.5,cpr.animation.TimingFunction.LINEAR);
		
}


/*
 * 그룹에서 transitionstart 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 시작 시 발생하는 이벤트.
 */
function onGrp1Transitionstart(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	
}


/*
 * 그룹에서 transitionend 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 종료 후 발생하는 이벤트.
 */
function onGrp1Transitionend(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	
	console.log("TRANSITION END~~");
	if(angle%360 == 0) {
		console.log("ㅋㅋ");
		angle = 0;
		app.lookup("grp1").style.removeStyle("transform");
	}
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var vcGrp = app.lookup("grp1");
	
	vcGrp.style.removeStyle("transform");
}


/*
 * "case2" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	var nbe = app.lookup("nbe1").numberValue;
	var vcGrpRbt = app.lookup("grp1");
	
	var vnAzimuth = parseInt(nbe/90);
	var vnRemain = nbe%90 > 0 ? 1 : 0;
	var vnGoal = 0;
	if(nbe >= 270 && nbe <360 && angle == 0){
		angle = 90;
	} else if(nbe == 360 && angle == 0) {
		
	}
	else {
		if(angle <=0) {
	
			if(nbe > Math.abs(angle)) {
				vnGoal = (vnAzimuth+vnRemain- Math.abs(angle/90))*90;
				angle = angle - vnGoal;
			} else if(nbe < Math.abs(angle)) {
				vnGoal = (Math.abs(angle/90)-vnAzimuth) * 90;
				angle = angle + vnGoal;
			}
		} else {
			if(nbe > Math.abs(360-angle)) {
				vnGoal = (vnAzimuth + vnRemain - Math.abs((360-angle)/90)) *90;
				angle = angle - vnGoal;
			} else if(nbe < Math.abs(360-angle)) {
				vnGoal = (Math.abs((360-angle)/90)- vnAzimuth) * 90;
				angle = angle + vnGoal;
			}
		}
	}
	vcGrpRbt.style.animateTo({
			"transform" : "rotate(" + (angle) + "deg)"
		},0.5,cpr.animation.TimingFunction.LINEAR);
		
		/**
		 * 넘어오는 각과 현재 팔의 각도의 차를 구해서 차이 만큼 90도 기준의 각을 더하거나 뺴서 팔을 움직인다.
		 * 
		 * 넘어온 값이 0이거나 360인가?
		 * 		지금 앵글 값이 270에서 360 사이인가?
		 * 		지금 앵글 값이 270에서 360 사이인가? 
		 * 			바로 360으로;
		 * 그렇지 않으면
		 * 		현재 팔의 각도는0인가?
		 * 			360도에서 해당 각도로 도달하는게 빠른가, 아니면 0도에서 해당 각도로 도달하는게 빠른가? 하나 찾아서 이동~~
		 * 			넘어온값이 270~360 사이의 값인가?
		 * 
		 * 		그렇지 않은가?
		 * 			현재 각도와 넘어온 각도를 비교하여 현재 각도가 크면, vnGoal을 더해주고
		 * 			그렇지 않으면 vnGoal을 뺴라~
		 * 
		 */
}
/*
 * "case3" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
		var nbe = app.lookup("nbe1").numberValue;
	var vcGrpRbt = app.lookup("grp1");
	
	if(nbe == 0 || nbe == 360) {
		
		if(Math.abs(angle) <=360 && Math.abs(angle) >= 270) {
			
		}
	}
	var vnAzimuth = parseInt(nbe/90);
	var vnRemain = nbe%90 > 0 ? 1 : 0;
	var vnGoal = 0;
	if(nbe == 0 ){
		var vnNowAngle = Math.abs(angle);
//		if(vnNowAngle)
		
	} else if(nbe == 360){
		
	} else {
		
		if(nbe > Math.abs(angle)) {
			
			vnGoal = (vnAzimuth+vnRemain- Math.abs(angle/90))*90;
			angle = angle - vnGoal;
		} else if(nbe < Math.abs(angle)) {
			
			vnGoal = (Math.abs(angle/90)-vnAzimuth) * 90;
			console.log(vnGoal);
			angle = angle + vnGoal;
		}
	
	}
	vcGrpRbt.style.animateTo({
			"transform" : "rotate(" + (angle) + "deg)"
		},0.5,cpr.animation.TimingFunction.LINEAR);
		
}


/*
 * "case2" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	app.lookup("nbe1").value = 270;
	app.lookup("btn3").click();
}
