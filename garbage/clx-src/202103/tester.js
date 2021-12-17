/************************************************
 * tester.js
 * Created at 2021. 3. 3. 오후 3:57:58.
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
	var dti = app.lookup("dti1");
	
	var a = moment(dti.value,"YYYYMMDD");
	
	var week = a.week() -a.startOf("month").week()+1;
	console.log(week);
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
	
	console.log(String.fromCharCode(97,98,99));
}





/*
 * 캘린더에서 before-navigate 이벤트 발생 시 호출.
 * navigate 전에 발생하는 이벤트.
 */
function onCalendarBeforeNavigate(/* cpr.events.CDateEvent */ e){
	/** 
	 * @type cpr.controls.Calendar
	 */
	var calendar = e.control;
	console.log(moment(e.date).format("YYYYMMDD"));
	console.log(moment(calendar.current).format("YYYYMMDD"));
	if(moment(e.date).format("YYYYMMDD") == moment(calendar.current).format("YYYYMMDD")) {
		e.preventDefault();
	}
}
var aq=  0;

function mouseMover(/* cpr.events.CMouseEvent */e){
	
	var mover = e.clientX;
	var delta = aq - mover;
	aq = mover;
	app.getContainer().updateConstraint(app.lookup("btn2"), {
		left : app.lookup("btn2").getActualRect().left - delta+"px"
	});
	
	if(app.lookup("btn2").getActualRect().left < 300) {
		console.log("ㅋㅋ 저에요");
		app.lookup("btn2").removeEventListener("mousemove", mouseMover);
		
		app.lookup("btn2").style.animateFrom({
		"transform" : "translate3d(300px,0px,0px)"
		});
		app.getContainer().updateConstraint(app.lookup("btn2"), {
			left : "0px"
		});
//		e.stopPropagation();
//		e.preventDefault();
	}
	 
}

/*
 * "Button" 버튼(btn2)에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onBtn2Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	console.log(e.clientX);
	aq = e.clientX;
	btn2.addEventListener("mousemove", mouseMover);
		
	btn2.addEventListener("mouseup", function(e){
		
		btn2.removeEventListener("mousemove", mouseMover);
	});
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var mdi = app.lookup("mdi1");
	
	var item = mdi.getTabItems()[2];
	/** @type cpr.controls.EmbeddedApp */
	var cont = item.content;
	app.getContainer().floatControl(cont,{
		"left" : "0px",
		"top" : "300px",
		"width" : "500px",
		"height" : "500px"
	});
	
//	cpr.core.App.load("202102/gridTest", function(loadedApp){
//		cont.app = loadedApp;
//	});
}


/*
 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
	
	app.lookup("mdi1").visible = false;
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
	var btn = new cpr.controls.Button("zz");
	btn.value = "zz";
	app.lookup("grp1").addChild(btn, {
		"width" : "98%",
		"height":"99%",
		"autoSize":"none"
	});
	var index = 0;
	app.lookup("grp1").reorderChild(btn, index);
	
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
//		btn.style.animateTo({
//			"transform": "translateX(-400px)",
//			"box-shadow": "none"
//		}, 0.35);
//		app.lookup("btn2").style.animateTo({
//			"transform" : "translateX(0)"
//		});
//		var children = app.lookup("grp1").getChildren();
//		children.splice(index,1)
//		
//		children.forEach(function(each){
//			each.dispose();
//		});
	});
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var bt = app.lookup("btn6");
	var cont = app.getContainer();
	
	bt.style.animateFrom({
		"transform" : "translate3d(-230px,0px,0px)"
	},0.5,cpr.animation.TimingFunction.EASE_IN);
	
	cont.floatControl(bt,{
		"left" : "-330px",
		"top" : "62px",
		"width" : "330px",
		"height" : "91px"
	});
	app.getContainer().updateConstraint(bt, {
		"left" : "150px"
	});
}


/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	var grp = app.lookup("grp1");
	
	var ctrl = grp.getChildren()[0];
	console.log(ctrl.value);
	
	grp.updateConstraint(ctrl, {
		"width":"95%"
	});
}

var han = 0;
function mm (e){
	
	var mov = e.clientX;
	var delta = han - mov;
//	han = mov;
	console.log(delta);
//	app.lookup("grp1").adjustScroll(delta, 0);
	var left = app.lookup("zz");
	var right = app.lookup("btn2");
	left.style.css("transform", "translateX("+(-1*delta)+ "px)");
	right.style.css("transform", "translateX(" + (-1*delta) + "px)");
}
/*
 * "Button" 버튼(btn1)에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onBtn1Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	han = e.clientX;
	btn1.addEventListener("mousemove", mm);
	btn1.addEventListenerOnce("mouseup", function(ev){
		
		btn1.removeEventListener('mousemove', mm);
	})
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
//	var a = app.lookup("tre1").getItem(0).children;
//	console.log(a);
	var ipb = app.lookup("ipb1");
	
	ipb.setSelection({start:4,end:4});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ipb = app.lookup("ipb2");
	
	console.log(encodeURI(ipb.value));
	
}
function abcc(){
	this.aq = 5;
}

abcc.prototype.hey = function(a){
	if(a < 5) {
		console.log("zz");
		console.log(this);
		this.aq = 4;
		this.hey.call(this, 4);
	}
}
	var a = new abcc();
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
//	function example() {
//  console.log(Array.prototype.join.call(arguments));
//}
//example(1, 'string', true); 
	
	
	a.hey(3);
}
