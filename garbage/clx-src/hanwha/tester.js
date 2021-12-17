/************************************************
 * tester.js
 * Created at 2020. 3. 2. 오후 4:31:38.
 *
 * @author HANS
 ************************************************/

var objs = {};
var filtered;

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	app.lookup("sms4").send();
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms4SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms4 = e.control;
	var dsList = app.lookup("dsList");
		for(var i  = 0 ; i < dsList.getRowCount() ; i++) {
		var button = new cpr.controls.Button();
		var random = Math.random();
		if(random < 0.5) {
			
		button.value = dsList.getValue(i, "value");
		}else {
		button.bind("value").toExpression("' '");
		button.style.css({"background" :"tomato"})
		}
		
		app.getContainer().addChild(button, {
			"with" : "100px",
			"height" : "20px",
			"autoSize" : "none"
		});
	}
	
 filtered = app.getContainer().getAllRecursiveChildren().filter(function(each){
		if(each.getBindInfo("value") ===undefined) {
			return each;
		}
	});

	filtered.forEach(function(each,idx){
		objs[idx] = each.value;
	});
}


/*
 * 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var size = Object.keys(objs).length-1;
	filtered.forEach(function(each,idx){
		each.value = objs[size-idx];
	});	
	
	app.getContainer().redraw();
}


