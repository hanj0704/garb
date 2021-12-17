/************************************************
 * tester.js
 * Created at 2020. 7. 30. 오전 10:21:10.
 *
 * @author han
 ************************************************/

//var copyKit = createCopyKit();

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
//		var a = copyKit.copyPage(app);
		
		
		var b = new cpr.protocols.HttpPostMethod("202008/capture3.jsp", "_blank");
		
		b.addParameter("body", "가나다라마바사");
//		b.setParameters("data", a);
//		b.setParameters("initValue", a);
		b.submit();
		b.dispose();
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
	
	var a = {
		"AQ": {
			
		"q" : {"Z":1,"x":2,"c":3},
		"w" : [{"Z":1,"x":2,"c":3},{"Z":4,"x":5,"c":6},{"Z":7,"x":8,"c":9}]
		}
	}
	
	var b = Object.keys(a);
	b = b.map(function(each){
		return a[each];
	});
	b.forEach(function(each){
		console.log(each.hasOwnProperty("q"));
	});
	
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
	
//	app.lookup("sms1").ti
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
//	var dataSet = new cpr.data.DataSet();
//	
//	dataSet.parseData({
//				"columns": [
//					{
//						"label": "label",
//						"dataType": "string"
//					},
//					{
//						"label": "value",
//						"dataType": "number"
//					}
//				],
//				"rows": [
//					{"label": "label1", "value": "1"},
//					{"label": "label2", "value": "2"},
//					{"label": "label3", "value": "3"},
//					{"label": "label4", "value": "4"},
//					{"label": "label5", "value": "5"},
//					{"label": "label6", "value": "6"}
//				]
//			});
//	
//	var allRow = dataSet.findAllRow("value >= 4");
//	
//	allRow.forEach(function(/*cpr.data.Row*/each){
//		app.lookup("cmb1").addItem(new cpr.controls.Item(each.getValue("label"), each.getValue("value")));
//	});
//	var allRow2 = dataSet.findAllRow("value < 4");
//	
//	allRow2.forEach(function(/*cpr.data.Row*/each){
//		app.lookup("cmb2").addItem(new cpr.controls.Item(each.getValue("label"), each.getValue("value")));
//	});
//	dataSet.dispose();	
//	
//	
//	var dataView = new cpr.data.DataView("ASD", app.lookup("ds1"));
//	dataView.setFilter("filter=='1'");
//	app.lookup("sms2").send();
//	app.lookup("sms1").send();
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
	var dataView = new cpr.data.DataView(app.lookup("cmb2").uuid, app.lookup("cmbOutGrid"));
	dataView.setFilter("filter=='"+app.lookup("cmb2").userAttr("filt")+"'");
	
	app.lookup("cmb2").setItemSet(dataView, {
		"label": "label",
		"value": "value"
	});
	
	var dataView2 = new cpr.data.DataView("asd", app.lookup("dsMan"));
	dataView2.setFilter("filter == '"+app.lookup("cmb2").userAttr("filt")+"'");
	app.lookup("cmb1").setItemSet(dataView2, {
		"label": "label",
		"value": "value"
	});
	
	
//	var dataView3 = new cpr.data.DataView("aa",app.lookup("ds1"));
//	dataView3.setFilter("filter == '1'");
//	app.lookup("cmb3").setItemSet(dataView3, {
//		"label": "label",
//		"value": "value"
//	});
	
}

var util = createCommonUtil();
/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
//	var copyMan = copyKit.copyPage(app);
//	app.openDialog("202008/draftMan", {width : 400, height : 300}, function(dialog){
//		dialog.ready(function(dialogApp){
//		dialog.initValue = {
//			"pageParam" : "202008/tester",
//			"copyData" : copyMan
//		}	
//		});
//	}).then(function(returnValue){
//		;
//	});
//	util.Dialog.open(app, "202008/draftMan", , height, handler);
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
	
	console.log("ㅁㅁㅁ");
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	app.lookup("btn5").removeEventListeners("click");
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	app.lookup("cmb4").displayExp = "label +', '+ value";
}	


/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	
	var cmb = app.lookup("cmb4");
	
	cmb.selectItemByLabel("label1");
}


/*
 * "서브미션동적생성" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
	var submission = new cpr.protocols.Submission("abc");
	
	submission.action = "data/FXFIG2.json";
	submission.send();

}


/*
 * "서브미션경찰" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
	
	var allDataControls = app.getAllDataControls();
	console.log(allDataControls);
}


/*
 * "데이터뷰 생성" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn12 = e.control;
	
var dataView1 = new cpr.data.DataView("asdf",app.lookup("ds3"));
	dataView1.userData("parentDs", app.lookup("ds3"));
	dataView1.setFilter("column1 >  3");
		
	app.lookup("cmb5").setItemSet(dataView1, {
		"label" : "label",
		"value" : "value"
		});
	app.lookup("cmb5").dataSet.dispose();
	var a = app.lookup("cmb5").dataSet;
	a.dispose();
	app.lookup("ds3").dispose();
//	console.log(app.lookup("cmb5").dataSet);	
}


/*
 * "데이터뷰 경찰" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
//	app.getAllDataControls().forEach(function(each){
//		console.log(each);
//	});
	
	var cmb = app.lookup("cmb6");
	cmb.dataSet.dispose();
	app.lookup("ds3").dispose();
	
	cmb.redraw();
	
}


/*
 * "경찰2" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
//	app.lookup("dti1").	
	var a= moment();
	console.log(a);
}	


/*
 * "upp" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn15 = e.control;
	
	var a = app.lookup("ipb9").value
	
	console.log(a.toUpperCase());
}
