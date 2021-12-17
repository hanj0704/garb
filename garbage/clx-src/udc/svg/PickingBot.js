/************************************************
 * Sample.js
 * Created at 2021. 1. 22. 오전 10:34:42.
 *
 * @author jeeeyul
 ************************************************/

/** @type cpr.controls.HTMLObject */
var image;

/** @type Element */
var directionAncor;

/** @type Element */
var mainArmAnchor;

/** @type Element */
var subAnchor;

/** @type Element */
var pickersAnchor;

/** @type Element */
var leftPicker;

/** @type Element */
var rightPicker;

/** @type Element */
var debugCircle;
/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	image = app.lookup("img");
	image.htmlAttr("id", image.uuid);
}

function update() {
	if (!mainArmAnchor) {
		return;
	}
	
	var angle = (app.getAppProperty("distance") / 100 * 80 + 10).toFixed(2);
	var pickAngle = (app.getAppProperty("picking") / 100 * 40 + 30).toFixed(2);
	
	directionAncor.setAttribute(
		"transform",
		cpr.utils.Util.template("rotate(${angle}, 100, 100)", {
			angle: app.getAppProperty("direction")
		})
	);
	
	mainArmAnchor.setAttribute(
		"transform",
		cpr.utils.Util.template("rotate(${angle}, 100, 100)", {
			angle: (90 - angle)
		})
	);
	
	subAnchor.setAttribute(
		"transform",
		cpr.utils.Util.template("rotate(${angle}, 100, 70)", {
			angle: (90 - angle) * -2
		})
	);
	
	pickersAnchor.setAttribute(
		"transform",
		cpr.utils.Util.template("rotate(${angle}, 100, 38)", {
			angle: 90 - angle
		})
	);
	
	leftPicker.setAttribute(
		"transform",
		cpr.utils.Util.template("rotate(-${angle}, 100, 38)", {
			angle: pickAngle
		})
	);
	
	rightPicker.setAttribute(
		"transform",
		cpr.utils.Util.template("rotate(${angle}, 100, 38)", {
			angle: pickAngle
		})
	);
}

/*
 * HTML 오브젝트에서 load 이벤트 발생 시 호출.
 * data속성의 값을 통해 가져오는 자료가 로드되었을때 발생되는 이벤트.
 */
function onImgLoad( /* cpr.events.CUIEvent */ e) {
	var node = document.querySelector(cpr.utils.Util.template("[data-usr-id=\"${id}\"]", {
		id: image.uuid
	}));
	var svgNode = node.querySelector("object").contentDocument.rootElement;
	
	directionAncor = svgNode.querySelector("#direction-anchor");
	mainArmAnchor = svgNode.querySelector("#main-arm-anchor");
	subAnchor = svgNode.querySelector("#sub-anchor");
	pickersAnchor = svgNode.querySelector("#pickers-anchor");
	leftPicker = svgNode.querySelector("#left-picker");
	rightPicker = svgNode.querySelector("#right-picker");
	debugCircle = svgNode.querySelector("#debug");
	console.log(debugCircle);
	update();
	
}

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	update();
}
/**
 * 
 * @param {Number} distance
 */
exports.controlArm = function(distance) {
	var animator = new cpr.animation.Animator(1, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
	var base = app.getAppProperty("distance");
	var delta = distance - base;
	animator.addTask(function(time) {
		app.setAppProperty("distance", base + delta * time);
	});
	return animator.run();
};

exports.controlPicker = function(amount) {
	var animator = new cpr.animation.Animator(1, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
	var base = app.getAppProperty("picking");
	var delta = amount - base;
	animator.addTask(function(time) {
		app.setAppProperty("picking", base + delta * time);
		console.log(base + delta * time)
	});
	return animator.run();
};

exports.controlDirection = function(direction) {
	var animator = new cpr.animation.Animator(1, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
	var base = app.getAppProperty("direction");
	var delta = direction - base;
	animator.addTask(function(time) {
		app.setAppProperty("direction", base + delta * time);
		console.log(base + delta * time)
	});
	return animator.run();
};

exports.moveDebug = function(distance){
	
	debugCircle.setAttribute(
		"transform",
		cpr.utils.Util.template("translate(0px,0px)")
	);
}