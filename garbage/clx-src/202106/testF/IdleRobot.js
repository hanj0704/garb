/************************************************
 * IdleRobot.js
 * Created at 2021. 2. 3. 오전 11:29:03.
 *
 * @author ryu
 ************************************************/
var vbIsTransed = false;
/**
 * 팔을 뻗을 때 계산될 크기 (px)
 * 최대로 뻗을 수 있는 크기
 */
var mnReachSize = 25;

/**
 * 뻗지 않았을 때에 대한 팔 기본 높이
 */
var mnDefaultArmHeight = 70;


/**
 * 로봇 실행 스케쥴 실행 시 지연 시간
 */
var mnDelayTime = 0;

/**
 * 로봇 실행 스케쥴 오브젝트
 * @type {
 *   {
 *     stack : {name:"reach" | "wafer" | "rotate",target:String[], value:any}[]
 *   }
 * }
 */
var moScheduleStack = {
	"stack": []
}

/**
 * 로봇 리셋 스케쥴 오브젝트
 * @type {
 *   {
 *     stack : {name:"reach" | "wafer" | "rotate",target:String[], value:any}[]
 *   }
 * }
 */
var moScheduleResetStack = {
	"stack": [{
		name: "reach",
		target: "left",
		value: 0
	}, {
		name: "reach",
		target: "right",
		value: 0
	}, {
		name: "reach",
		target: "center",
		value: 0
	}, {
		name: "wafer",
		target: "left",
		value: false
	}, {
		name: "wafer",
		target: "right",
		value: false
	}, {
		name: "wafer",
		target: "center",
		value: false
	}, {
		name: "rotate",
		target: null,
		value: 0
	}]
}

exports.setArmExtendTime = function(pn){
	
	app.lookup("arms").getLayout().animationDuration = pn;
}
exports.setRotateTime = function(pn) {
	
	mnDelayTime = pn;
}

/************************************************
 * 스케줄 함수
 ************************************************/

/**
 * (예약)
 * 로봇의 팔을 뻗습니다.
 * 로봇의 팔을 하나만 사용하는 경우는 center로 지정합니다.
 * @param {"left" | "right" | "center"[]} paArms 움직일 팔
 * @param {Number} pnFar 움직이는 정도 (0~100까지)
 */
function scheduleReachRobotArms(psArms, pnFar) {
	var voStack = {
		name: "reach",
		target: psArms,
		value: pnFar
	}
	
	moScheduleStack.stack.push(voStack);
}
exports.scheduleReachRobotArms = scheduleReachRobotArms;

function scheduleExtendRobotArms(pnFar,pnFar2){
	var voStack = {
		name : "extend",
		value : [pnFar,pnFar2]
	}
	moScheduleStack.stack.push(voStack);
}

exports.scheduleExtendRobotArms = scheduleExtendRobotArms;
/**
 * (예약)
 * 와이퍼를 화면상에 표시할지에 대한 여부를 설정합니다.
 * @param {"left" | "right" | "center"[]} paArms 움직일 팔
 * @param {Boolean} pbVisible
 */
function scheduleSetWaferVisible(psArms, pbVisible) {
	var voStack = {
		name: "wafer",
		target: psArms,
		value: pbVisible
	}
	
	moScheduleStack.stack.push(voStack);
}
exports.scheduleSetWaferVisible = scheduleSetWaferVisible;


/**
 * (예약)
 * 로봇의 몸체를 회전합니다.
 * @param {Number} pnDegree (-360 ~ 360까지)
 */
function scheduleRotateRobot(pnDegree) {
	var voStack = {
		name: "rotate",
		target: null,
		value: pnDegree
	}
	
	moScheduleStack.stack.push(voStack);
}
exports.scheduleRotateRobot = scheduleRotateRobot;


/**
 * 스케쥴된 로봇의 동작을 순차적으로 실행합니다.
 * 애니메이션 시간에 따라 동작 시간이 결정됩니다.
 */
function runRobot() {
	var vaStacks = moScheduleStack.stack;
	var vnExecuteStacks = vaStacks.length;
	var runTime = mnDelayTime ; 
	if (vnExecuteStacks > 0){
		var voStack = vaStacks[0];
		
		var vsActnNm = voStack["name"];
		var vsActnTarget = voStack["target"];
		var vActnVal = voStack["value"];
		
		if (vsActnNm == "reach"){
			reachRobotArms(vsActnTarget, vActnVal);
			runTime = mnDelayTime ; 
		} else if (vsActnNm == "wafer") {
			setWaferVisible(vsActnTarget, vActnVal);
			runTime = mnDelayTime /2; 
		} else if (vsActnNm == "rotate") {
		   runTime = 	rotateRobot(vActnVal);
		} else if (vsActnNm == "extend") {
			extendRobotArm(vActnVal[0],vActnVal[1]);
			runTime = mnDelayTime;
		}
		
		/* 실행한 스택 제거 */
		vaStacks.splice(0, 1);
		
		/* 재귀호출 */
		setTimeout(function(){
			runRobot();
		}, runTime);
	}
}
exports.runRobot = runRobot;


exports.scheduleJobDone = function() {
	
	return moScheduleStack.stack.length;
}
/************************************************
 * 사용자 함수
 ************************************************/

/**
 * 로봇 팔을 하나 또는 둘을 사용할지에 대한 값에 따라
 * 팔의 표시를 조정합니다.
 * @param {Boolean} center
 */
function repairRobotArm(center) {
	var vcRobotLeftArm = app.lookup("left");
	var vcRobotRightArm = app.lookup("right");
	var vcRobotCenterArm = app.lookup("center");
	
	vcRobotLeftArm.visible = !center;
	vcRobotRightArm.visible = !center;
	vcRobotCenterArm.visible = center;
	
	app.setAppProperty("singleArm", center);
}
exports.repairRobotArm = repairRobotArm;

/**
 * 와이퍼를 화면상에 표시할지에 대한 여부를 설정합니다.
 * @param {"left" | "right" | "center"[]} paArms 움직일 팔
 * @param {Boolean} pbVisible
 */
function setWaferVisible(paArms, pbVisible) {
	if (paArms instanceof Array == false){
		paArms = [paArms];
	}
	
	var voWafterAppProp = {
		"left" : "hasLeftWafer",
		"right" : "hasRightWafer",
		"center" : "hasCenterWafer"
	}
	
	for(var idx = 0; idx < paArms.length; idx++){
		var vsWhichArm = paArms[idx];
		
		/** @type cpr.controls.Container */
		var vcRobotArm = app.lookup(vsWhichArm);
		
		app.setAppProperty(voWafterAppProp[vsWhichArm], pbVisible);

		var event = new cpr.events.CUIEvent("waferPick",{
			content : {
				"pick" : pbVisible
			}
		});
		app.dispatchEvent(event);
	}
}
exports.setWaferVisible = setWaferVisible;
function extendRobotArm(pnFar,pnFar2) {
	if(pnFar < 0) {
		pnFar = 0;
	} else if (pnFar > 100) {
		pnFar = 100;
	}
	
	var vnAbleToReach = (mnReachSize / 100) * pnFar;
	var vnAbleToReach2 =(mnReachSize / 100) * pnFar2;
	/* 팔의 크기 변경 */
		/** @type cpr.controls.Container */
		var vcRobotArmLeft = app.lookup("left");
		var vcGrpRobotArms = vcRobotArmLeft.getParent();
		var vcRobotArmRight =app.lookup("right");
		var vcGrpRobotArms2 = vcRobotArmRight.getParent();
		console.log(vcGrpRobotArms.getLayout().animationDuration);
		vcGrpRobotArms.updateConstraint(vcRobotArmLeft, {
			height : mnDefaultArmHeight + vnAbleToReach + "px"
		});
		
		vcGrpRobotArms2.updateConstraint(vcRobotArmRight, {
			height : mnDefaultArmHeight + vnAbleToReach2 + "px"
		});
}

/**
 * 로봇의 팔을 뻗습니다.
 * 로봇의 팔을 하나만 사용하는 경우는 center로 지정합니다.
 * @param {"left" | "right" | "center"[]} paArms 움직일 팔
 * @param {Number} pnFar 움직이는 정도 (0~100까지)
 */
function reachRobotArms(paArms, pnFar) {
	if (paArms instanceof Array == false){
		paArms = [paArms];
	}
	
	/* 0~100을 벗어난 크기가 들어왔을 경우값 조정 */
	if (pnFar < 0){
		pnFar = 0;
	} else if (pnFar > 100) {
		pnFar = 100;
	}
	
	var vnAbleToReach = (mnReachSize / 100) * pnFar;
	/* 팔의 크기 변경 */
	for(var idx = 0; idx < paArms.length; idx++){
		/** @type cpr.controls.Container */
		var vcRobotArm = app.lookup(paArms[idx]);
		var vcGrpRobotArms = vcRobotArm.getParent();
		
		vcGrpRobotArms.updateConstraint(vcRobotArm, {
			height : mnDefaultArmHeight + vnAbleToReach + "px"
		});
		
		app.setAppProperty(paArms[idx], pnFar, false);
	}
}
exports.reachRobotArms = reachRobotArms;


/**
 * 로봇의 몸체를 회전합니다.
 * @param {Number} pnDegree (-360 ~ 360까지)
 */
function rotateRobot(pnDegree) {
	var vcGrpRobotWrap = app.lookup("grpRobotWrap");
	console.log("파파파");
	if(!vbIsTransed){
	vcGrpRobotWrap.style.animateTo({
			"transform" : "rotate(" + (pnDegree * -1) + "deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	
	app.lookup("leftWafer").style.animateTo({
		"transform" : "rotate(" + pnDegree + "deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
	
	app.lookup("rightWafer").style.animateTo({
		"transform" : "rotate(" + pnDegree + "deg)"
	}, mnDelayTime, cpr.animation.TimingFunction.LINEAR);
//	vcGrpRobotWrap.style.css({
//			"transform" : "rotate(" + (pnDegree * -1) + "deg)"});
//	
//	app.lookup("leftWafer").style.css({
//		"transform" : "rotate(" + pnDegree + "deg)"
//	});
//	
//	app.lookup("rightWafer").style.css({
//		"transform" : "rotate(" + pnDegree + "deg)"
//	});
	} else {
		
	}
	app.setAppProperty("rotate", pnDegree, false);
	return app.lookup("arms").getLayout().animationDuration;
	
}
exports.rotateRobot = rotateRobot;


function resetRobot() {
	app.unsetAllAppProperties();
}
exports.resetRobot = resetRobot;


/************************************************
 * 기본 컨트롤 이벤트
 ************************************************/

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	switch(e.property){
		case "armAExtend" :
			reachRobotArms("left", e.newValue);
			break;
		case "armBExtend" :
			reachRobotArms("right", e.newValue);
			break;
//		case "center" :
//			reachRobotArms("center", e.newValue);
//			break;
//		case "singleArm" :
//			repairRobotArm(e.newValue);
//			break;
		case "rotate" :
			rotateRobot(e.newValue);
			break;
		case "hasLeftWafer": case "hasRightWafer":
			app.lookup("arms").redraw();
			break;
		case "armLength" :
			mnReachSize = e.newValue;
			break;
	}
}




/*
 * 그룹에서 transitionstart 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 시작 시 발생하는 이벤트.
 */
function onGrpRobotWrapTransitionstart(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpRobotWrap = e.control;
	vbIsTransed = true;
}


/*
 * 그룹에서 transitionend 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 종료 후 발생하는 이벤트.
 */
function onGrpRobotWrapTransitionend(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpRobotWrap = e.control;
	vbIsTransed = false;
}
