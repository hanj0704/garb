/*
 * App URI: 202005/EncodeTest
 * Source Location: 202005/EncodeTest.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202005/EncodeTest", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * EncodeTest.js
			 * Created at 2020. 5. 12. 오전 11:00:52.
			 *
			 * @author HANS
			 ************************************************/
			//cpr.core.AppConfig.INSTANCE.setProtocolValue("submission", {"contextPath" : "garbage-webs/"});
			
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
			 * 서브미션에서 before-submit 이벤트 발생 시 호출.
			 * 통신을 시작하기전에 발생합니다.
			 */
			function onSms1BeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms1 = e.control;
				
			//	app.lookup("sms1").setRequestEncoder(_requestEncode);
			//	app.lookup("sms1").setResponseDecoder(_responseDecoder);
			
			}
			
			/**
			 * 
			 * @param {cpr.protocols.Submission} submission
			 */
			function getResponseComp(submission){
				
				var sub = submission;
				
				var dataColl = [];
				var cnt = sub.getResponseDataCount();
				if(cnt > 0) {
					
			//		for(var i = 0 ; i < cnt ; i++) {
			//			
			//			dataColl.push({"alias":sub.getResponseData(i).alias,"type":typeof sub.getResponseData(i).data});
			//		}
				}
				
				return dataColl;
			}
			
			/**
			 * 
			 * @param {cpr.protocols.Submission} submission
			 * @param {Object} resData
			 */
			function _responseDecoder(submission,resData){
				
				
				var jsonOb = JSON.parse(resData);
				for(var key in jsonOb) {
					var ctrls = app.lookup(key);
					if(ctrls){
						ctrls.dataSet.build(jsonOb[key]);
						ctrls.redraw();
					}
				}
			
			//	var resJson = {};
			//	resJson["ds1"] = jsonOb;
				
				return {contentType : "application/json", content : resData};
			}
			
			function _requestEncode(submission,reqData){
				
				var sub = submission;
			//	var realReqData = {"data" : {
			//		"dm1": {
			//			"objs":{}
			//		}
			//	}};
				var voJsonType = reqData["data"];
				
				var q =[];
				for(var keys  in voJsonType){
					q.push(voJsonType[keys]);
				}
				
				return {"content" : q};
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
			//	var responseText = sms1.xhr.responseText;
				
				app.getContainer().redraw();
				
				console.log(sms1.xhr.status);
				console.log(sms1.xhr.statusText);
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
				
			//	var a = {
			//		"ab" : 1,
			//		"bc" : 2,
			//		"cd" : 3
			//	}
			//	
			//	for(var voca in a) {
			//		console.log(voca);
			//	}
			//	
			//	var kkk = Object.keys(a);
			//	
			//	console.log(kkk);
			//	
			//	for(var ca in kkk) {
			//		console.log(ca);
			//	}
				app.lookup("sms2").send();
			//	console.log(app.lookup("sms1").getResponseData(0).data.type);
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
				
				app.lookup("sms3").send();
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
				
				app.lookup("sms4").send();
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
				
				app.lookup("sms5").send();
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
					console.log(sms2.xhr.status);
				console.log(sms2.xhr.statusText);
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "idGb"},
					{"name": "cjum"},
					{"name": "ajum"},
					{"name": "sjum"},
					{"name": "grpId"},
					{"name": "userId"},
					{"name": "grpNo"},
					{"name": "fnm"},
					{"name": "sts"},
					{"name": "opGb"}
				],
				"rows": [{"idGb": "1", "cjum": "0888", "ajum": "0888", "sjum": "0888", "grpId": "903", "userId": "SHF0003", "grpNo": "SUPER01", "fnm": "HELLO", "sts": "1", "opGb": "3"}]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns" : [
					{"name": "schId"},
					{"name": "totCnt"},
					{"name": "rowNum"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("ds3");
			dataSet_3.parseData({
				"columns" : [
					{"name": "schId"},
					{"name": "totCnt"},
					{"name": "rowNum"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("ds4");
			dataSet_4.parseData({
				"columns" : [
					{"name": "schId"},
					{"name": "totCnt"},
					{"name": "rowNum"}
				]
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [
					{"name": "opNo"},
					{"name": "sts"},
					{"name": "opGb"},
					{"name": "fnm"},
					{"name": "openIl"},
					{"name": "openUser"},
					{"name": "cjum"},
					{"name": "ajum"},
					{"name": "sjum"},
					{"name": "dealerNo"},
					{"name": "dealerYn"},
					{"name": "tgb"},
					{"name": "type"},
					{"name": "tseq"},
					{"name": "tellNo"},
					{"name": "grpId"},
					{"name": "ipAddr"},
					{"name": "passwdIl"},
					{"name": "seniorOpNo"},
					{"name": "lstIbIl"},
					{"name": "grpNo"},
					{"name": "linePrt1"},
					{"name": "linePrt2"},
					{"name": "passwdLock"},
					{"name": "remark"},
					{"name": "expiDt"},
					{"name": "mobileNo"},
					{"name": "startMenu"},
					{"name": "themeKind"},
					{"name": "labelLang"},
					{"name": "titleLang"},
					{"name": "mobUsr"},
					{"name": "chgBrnoYn"}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("sms1");
			submission_1.action = "/cisweb/encode.do";
			submission_1.mediaType = "application/json";
			submission_1.addRequestData(dataMap_1);
			submission_1.addRequestData(dataSet_1, cpr.protocols.PayloadType.all);
			if(typeof onSms1BeforeSubmit == "function") {
				submission_1.addEventListener("before-submit", onSms1BeforeSubmit);
			}
			if(typeof onSms1SubmitDone == "function") {
				submission_1.addEventListener("submit-done", onSms1SubmitDone);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("sms2");
			submission_2.action = "./cisweb/getList.do";
			submission_2.mediaType = "application/json";
			if(typeof onSms2SubmitDone == "function") {
				submission_2.addEventListener("submit-done", onSms2SubmitDone);
			}
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("sms3");
			submission_3.action = "cisweb/encode.do";
			submission_3.mediaType = "application/json";
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("sms4");
			submission_4.action = "http://localhost:8080/garbage-webs/cisweb/encode.do";
			submission_4.mediaType = "application/json";
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("sms5");
			submission_5.action = "datas/MOCK_DATA.json";
			app.register(submission_5);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("ds2"),
				"columns": [
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.targetColumnName = "schId";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "schId";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.targetColumnName = "totCnt";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "totCnt";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.targetColumnName = "rowNum";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "rowNum";
							}
						}
					]
				},
				"detail": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnName = "schId";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "totCnt";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "rowNum";
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "80px",
				"left": "20px",
				"width": "400px",
				"height": "200px"
			});
			
			var comboBox_1 = new cpr.controls.ComboBox("cmb1");
			(function(comboBox_1){
				comboBox_1.setItemSet(app.lookup("ds4"), {
					"label": "rowNum",
					"value": "totCnt"
				});
			})(comboBox_1);
			container.addChild(comboBox_1, {
				"top": "50px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var tree_1 = new cpr.controls.Tree("tre1");
			(function(tree_1){
				tree_1.setItemSet(app.lookup("ds3"), {
					"label": "totCnt",
					"value": "totCnt",
					"parentValue": "rowNum"
				});
			})(tree_1);
			container.addChild(tree_1, {
				"top": "290px",
				"left": "20px",
				"width": "200px",
				"height": "150px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "20px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button("btn2");
			button_2.value = "Button";
			if(typeof onBtn2Click == "function") {
				button_2.addEventListener("click", onBtn2Click);
			}
			container.addChild(button_2, {
				"top": "20px",
				"left": "130px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_3 = new cpr.controls.Button("btn3");
			button_3.value = "Button";
			if(typeof onBtn3Click == "function") {
				button_3.addEventListener("click", onBtn3Click);
			}
			container.addChild(button_3, {
				"top": "20px",
				"left": "240px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_4 = new cpr.controls.Button("btn4");
			button_4.value = "Button";
			if(typeof onBtn4Click == "function") {
				button_4.addEventListener("click", onBtn4Click);
			}
			container.addChild(button_4, {
				"top": "20px",
				"left": "350px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_5 = new cpr.controls.Button("btn5");
			button_5.value = "Button";
			if(typeof onBtn5Click == "function") {
				button_5.addEventListener("click", onBtn5Click);
			}
			container.addChild(button_5, {
				"top": "20px",
				"left": "460px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "EncodeTest";
	cpr.core.Platform.INSTANCE.register(app);
})();
