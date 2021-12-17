/************************************************
 * tester.js
 * Created at 2021. 7. 13. 오후 5:44:54.
 *
 * @author HANS
 ************************************************/
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("sms1").send();
	
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
	app.lookup("opt2").redraw();
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
	
	var a = null;
	console.log(a[1]);
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	var opts = app.lookup("opt5");
	var cont = app.getContainer();
	
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var cont = app.getContainer();
	
	var opts = app.lookup("opt5");
	
	
	
}


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	var vbOpended = app.getAppProperty("expanded");
	var voRtAppIns = app.getRootAppInstance();

	var cont = app.getContainer();
	
	var opts = voRtAppIns.lookup("복지지도");
	
	if(vbOpended) {
		console.log("니냐?");
	
//	var animator = new cpr.animation.Animator();
	
	
//	animator.addTask(function name(args){
		
//		voRtAppIns.getContainer().updateConstraint(opts, {width : "19px"});
		
		opts.style.animateTo({
			"width" : "19px"
		},0.35,cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//	});
	opts.addEventListenerOnce("animationend", function(){
		console.log("둥");
	})
	opts.getParent().addEventListenerOnce("animationend",function(){
		console.log("힣");
	})
//	animator.run().then(function(input){
		app.lookup("btn1").visible =  false;
		app.setAppProperty("expanded", true, false);
//	});
	
	} else {
//		var animator = new cpr.animation.Animator(0.35,cpr.animation.TimingFunction.EASE_OUT_CUBIC);
	
//	animator.addTask(function name(args){
		app.lookup("btn1").visible =  true;
//		voRtAppIns.getContainer().updateConstraint(opts, {width : "401px"});
		
		opts.style.animateTo({
			"width" : "401px"
		},0.35, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
//	});
//	animator.run().then(function(input){
		
		app.setAppProperty("expanded", false, false);
//	});
	
	}
}

/*
 * 루트 컨테이너에서 animationend 이벤트 발생 시 호출.
 * 애니메이션 종료 후 발생하는 이벤트.
 */
function onBodyAnimationend(/* cpr.events.CAnimationEvent */ e){
	
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("sms1").send();
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	console.log(isNaN("00"));
	console.log(isNaN(25));
	console.log(isNaN("F12"));
	
}
var a = 0;

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	setInterval(function(){
		app.getContainer().scrollTo(0, a,0.1,cpr.animation.TimingFunction.LINEAR);
		a += 10;
	}, 100)
}


/*
 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
	app.lookup("ipb1").redraw();
	app.lookup("cmb1").redraw();
}


/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	app.lookup("opt1").value = "Zzzzzzzzzzzzzzzzzzz";
}
