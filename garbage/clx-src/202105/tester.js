/************************************************
 * tester.js
 * Created at 2021. 5. 3. 오전 10:07:50.
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
	
//	app.lookup("btn2")

//	app.lookup("grp1").scrollTo(1600,0,0.8,cpr.animation.TimingFunction.EASE_OUT);
	var ani = new cpr.animation.Animator(0.8, cpr.animation.TimingFunction.EASE_OUT);
	
	ani.addTask(function(p){
		
		app.lookup("grp1").scrollTo(p*1600, 0);
	});
	
	ani.run().then(function(input){
		
		console.log("JOB DONE");
	});
}



/*
 * 트리에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onTre1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	var data = JSON.parse(e.dataTransfer.getData("text"));
	
	var item = tre1.getItemByValue(data.content[0].value);
	item.parentValue = e.targetObject.item.value; 
	tre1.redraw();
	e.preventDefault();
	
}




/*
 * "->" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	console.log(btn2.getActualRect());
}


/*
 * "Button" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn17 = e.control;
	
//	console.log(window.top);
//	console.log(window.screenTop);
//	console.log(window.innerHeight);
//	console.log(window.outerHeight);
	app.lookup("sms1").send().then(function(input){
		console.log("ㅋㅋ");
		console.log(input);
		var a = input.control;
		console.log(a);
		console.log(app.lookup("sms1").xhr);
	});
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
		console.log("쿄쿄");
		console.log(e);
		var a = e.control;
		console.log(a);
		console.log(app.lookup("sms1").xhr);
}


/*
 * "Button" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn19Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn19 = e.control;
	
//	var ds = app.lookup("ds2")
//	var cn = ds.getHeaders();
//	var a = app.lookup("ds2").getRowDataRanged();
//	console.log(a);
//	console.log(typeof a);
//	a.forEach(function(eachRow){
//		
//		cn.forEach(function(each){
//			
//			eachRow[each.getInfo()] = eachRow[each.getName()];
//			delete eachRow[each.getName()];
//		});
//	
//	});
//	
	var sms = app.lookup("sms2");
	sms.setResponseDecoder(_response);
	sms.send();
	
}

function _response(sub,resData) {
	
	var res = resData;
	
	var jso = JSON.parse(res);
	
/** @type Array */
	var ds2 = jso["ds2"];
	var ds = app.lookup("ds2");
	var va = ds.getHeaders();
	
	ds2.forEach(function(each){
		
		va.forEach(function(eachH){
			
			each[eachH.getName()] = each[eachH.getInfo()];
			delete each[eachH.getInfo()]
		});
	});
	console.log(JSON.stringify(jso));
	return {
		contentType : "application/json",
		content : jso
	}

}










/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms2SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms2 = e.control;
	
	app.lookup("grd1").redraw();
}


/*
 * "Button" 버튼(btn20)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn20Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn20 = e.control;
	
	var a = Object.create(btn20);
	
	console.log(a);
	
	a.id = "aa";
	
	app.getContainer().addChild(a, {
		"left" : "700px",
		"top" :"700px",
		"width" : "100px",
		"height" : "30px"
	});
}
