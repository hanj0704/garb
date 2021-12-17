

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
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
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var a = {};
	
	a["하하하"] = {
		"A" : "B",
		"C" : "D"
	}
	
	console.log(a);
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
	
	var a = ["a","b","c","e"];
	var b = ["a","b","c","d"];
	var d = [];
	
	b.forEach(function(each){
		
		if(a.indexOf(each) != -1) {
			a.splice(a.indexOf(each),1);
		} else {
			d.push(each);
		}
	});
	
	if(a.length > 0) {
		console.log(a);
	}
	if(d.length > 0) {
		console.log(d);
	}
	
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
	
	var btn = app.lookup("btn4");
	
	var a = app.getContainer().updateConstraint(btn, {
		"left" : "700px"
	});
	
	
	var ani = new cpr.animation.Animator(0.2,cpr.animation.TimingFunction.LINEAR);
	
	ani.addTask(function(p){
		
		app.getContainer().updateConstraint(btn, {
		"left" : "700px"
		});
	});
	
	ani.run().then(function(input){
		
	});
}



