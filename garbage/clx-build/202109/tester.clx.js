/*
 * App URI: 202109/tester
 * Source Location: 202109/tester.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202109/tester", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * tester.js
			 * Created at 2021. 8. 27. 오전 10:28:29.
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
				var a = "abc";
				var b = a.split("").join("/");
				console.log(b);
			}
			
			
			/**
			 * 
			 * @param {String} pString
			 * @param {String} ps2
			 */
			exports.hanExps = function(pString,ps2){
				if(ps2=="PM"){
					
				var regEx = /[A-Z]\d*/g;
				
				var res = pString.match(regEx);
					
				console.log(res);
				console.log(res.join("/"));
				return '"'+res.join("/")+'"';
			
				}else{
					return '"'+pString+'"';
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
				app.lookup("opt2").redraw();
			//	console.log(app.lookup("opt1").value);
			}
			
			
			/*
			 * "regExp" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn3 = e.control;
				
				var opt2 = app.lookup("opt2").value;
				console.log(opt2);
				var regExp = /[A-Z]\d*/g;
				
				console.log(regExp.test(opt2));
				console.log(opt2.match(regExp));
				
			}
			
			
			
			/*
			 * "consol ipb" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn5 = e.control;
				console.log(ValueUtil.fixNull(app.lookup("ipb1").value));
			}
			
			
			/*
			 * "insert" 버튼(btn2)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn2 = e.control;
				
				app.lookup("grd1").insertRowData(5, false, {
				"value" : "Align",
				"column3" : "Column33"
				})
			}
			
			
			/*
			 * "console row" 버튼(btn4)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn4Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn4 = e.control;
				console.log(ValueUtil.fixNumber("zz"));
			}
			
			
			/*
			 * "getRow -1" 버튼(btn6)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn6Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn6 = e.control;
				
				console.log(app.lookup("grd1").getRow(-1));
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
				
				app.openDialog("202109/popup", {width : 400, height : 300}, function(dialog){
					dialog.ready(function(dialogApp){
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
					});
				}).then(function(returnValue){
					
					console.log(returnValue)
				});
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
			//	var a = new cpr.events.CKeyboardEvent("keydown",{
			//		content : {
			//			"key" : "q"
			//		},
			//		userData :{
			//			"key" : "q"
			//		},
			//		"key" : "q"
			//	});
			//	console.log(a);
				
				var keyd = new KeyboardEvent("keydown",{"key" : "k"});
				var ipb = app.lookup("ipb1");
				
				var qr = document.querySelector("*[data-usr-" + "han" + "='" + "jin" + "']");
				
				/** @type HTMLElement */
				var chqr = qr.childNodes[0];
				var ip = chqr.childNodes[0];
				ip.dispatchEvent(keyd);
				
			//	console.log(keyd);
			//	app.lookup("ipb1").dispatchEvent(a);
				
			}
			
			
			/**
			 * 
			 * @param {String} str
			 * @param {Number} index
			 * @return {String[]}
			 */
			function divi(str, index){
				
				var len = str.length;
				
				var resu = [];
				
				resu.push(str.slice(0, index));
				resu.push(str.slice(index,len));
				
				return resu;
				
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
				
				var ipb = app.lookup("ipb1");
				
				var a= ipb.getSelection().start;
				var val = ipb.value;
				
				var di = divi(val,a);
				var hakk = "aabbcc";
				
				var b = di[0];
				var fo = b.length + hakk.length;
				
				
				ipb.value = di.join(hakk);
				ipb.setSelection({start:fo,end:fo});
			}
			
			
			/*
			 * "run" 버튼(btn10)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn10Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn10 = e.control;
				console.log(app.getHost());
				app.close();
				app.run(app.getHost(),function(aps){
					console.log("ㅋㅅㅋ");
				});
			}
			
				var a = "2021-09-08 16:03:18";
			/*
			 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn11Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn11 = e.control;
				
				
				console.log(a);
				var b = moment(a).add(1, "second").format("YYYY-MM-DD HH:mm:ss");
				a = b;
			}
			
			
			/*
			 * "Button" 버튼(btn12)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn12Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn12 = e.control;
				
				b(abab,"bbb");
			}
			
			
			function abab(aa){
				
				console.log(aa);
			}
			
			/**
			 * 
			 * @param {Function} poCallBack
			 */
			function b(poCallBack,bb) {
				
				if(poCallBack) {
					poCallBack(bb);
			//		poCallBack.call(null, bb);
				}
			}
			
			/*
			 * "exec" 버튼(btn13)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn13Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn13 = e.control;
				
				var vsEx = /[0-9]+/;
				var vsText = "LP123";
				console.log(vsText.match(vsEx));
				console.log(vsText.search(vsEx));
				console.log(vsEx.exec(vsText));
			}
			
			
			/*
			 * "Button" 버튼(btn14)에서 mouseenter 이벤트 발생 시 호출.
			 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
			 */
			function onBtn14Mouseenter(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn14 = e.control;
				
				e.preventDefault();
				e.stopPropagation();
			}
			
			
			/*
			 * "Button" 버튼(btn14)에서 mousemove 이벤트 발생 시 호출.
			 * 사용자가 컨트롤 위에 포인터를 이동할 때 발생하는 이벤트.
			 */
			function onBtn14Mousemove(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn14 = e.control;
				e.preventDefault();
				e.stopPropagation();
			}
			// 최대공약수
			function gcd(minNum, maxNum){
			  return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
			}
			
			/*
			 * "gcd" 버튼(btn15)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn15Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn15 = e.control;
				
				console.log(gcd(1000000,3000000));
			}
			
			
			/*
			 * "filter1" 버튼(btn4)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn4Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn4 = e.control;
				
				cpr.core.App.load("202109/filter1", function(loadedApp){
					
					app.lookup("ea1").app =loadedApp;
				});
			}
			
			
			/*
			 * "filter2" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn5 = e.control;
				
				cpr.core.App.load("202109/filter2", function(loadedApp){
					
					app.lookup("ea1").app =loadedApp;
				});
				
			}
			
			
			/*
			 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn4Click3(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn4 = e.control;
				console.log("ㅋㅋ");
			//	var expUd = new udc.aaa.expUd();
				
			//	expUd.newProperty3 = "aq";
			}
			/*
			 * 캘린더에서 item-click 이벤트 발생 시 호출.
			 * Calendar의 아이템을 클릭 할 때 발생하는 이벤트. relativeTargetName, item을 통해 정보를 얻을 수 있습니다.
			 */
			function onCalendarItemClick(/* cpr.events.CItemEvent */ e){
				/** 
				 * @type cpr.controls.Calendar
				 */
				var calendar = e.control;
				
				console.log(e.item.value);
			}
			
			
			/*
			 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click3(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn5 = e.control;
				
				
				app.lookup("grd1").getViewingStartRowIndex()
			}
			
			
			/*
			 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn6Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn6 = e.control;
				app.lookup("grp7").getParent().updateConstraint(app.lookup("grp7"), {
					width : "800px"
				});
			}
			
			
			/*
			 * "sl" 버튼(btn7)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn7Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn7 = e.control;
				
				var a = "abcdef";
				console.log(a.split("cd"));
				console.log(a.slice(0, 4));
			}
			
			
			/*
			 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn8Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn8 = e.control;
				
				console.log(app.lookup("ds1").getHeaders());
				console.log(app.lookup("dm1").getHeaders());
				console.log(app.lookup("dm1").getColumnNames());
				console.log(app.lookup("ds1").getColumnNames());
			
			}
			
			/*
			 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn9Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn9 = e.control;
				console.log(window.navigator.userAgent);
			}
			
			
			/*
			 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn10Click2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn10 = e.control;
				
				
				app.openDialog("202109/verticalTest", {left : 400, top : 300}, function(dialog){
					dialog.ready(function(dialogApp){
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
					});
				}).then(function(returnValue){
					;
				});
			};
			// End - User Script
			
			// Header
			app.declareAppProperty("newProperty1", " ");
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{
						"name": "column4",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "@hanExps(column2,column1)"
					}
				],
				"rows": [
					{"column1": "AR", "column2": "Align", "column3": "column31"},
					{"column1": "LLA", "column2": "Slot#3#4", "column3": "column32"},
					{"column1": "PM", "column2": "A1B2", "column3": "column33"},
					{"column1": "LLB", "column2": "Slot#1#2", "column3": "column34"},
					{"column1": "AR", "column2": "Align", "column3": "column35"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsLi");
			dataSet_2.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "AR", "value": "AR"},
					{"label": "CL", "value": "CL"},
					{"label": "LLA", "value": "LLA"},
					{"label": "LLB", "value": "LLB"},
					{"label": "PM", "value": "PM"}
				]
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [{
					"name": "column1",
					"defaultValue": "zzz"
				}]
			});
			app.register(dataMap_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			xYLayout_1.animationDuration = 0.5;
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var comboBox_1 = new cpr.controls.ComboBox("cmb1");
			comboBox_1.multiple = true;
			(function(comboBox_1){
				comboBox_1.addItem(new cpr.controls.Item("label1", "value1"));
				comboBox_1.addItem(new cpr.controls.Item("label2", "value2"));
				comboBox_1.addItem(new cpr.controls.Item("label3", "value3"));
				comboBox_1.addItem(new cpr.controls.Item("label4", "value4"));
			})(comboBox_1);
			container.addChild(comboBox_1, {
				"top": "20px",
				"left": "20px",
				"width": "355px",
				"height": "30px"
			});
			
			var output_1 = new cpr.controls.Output("opt1");
			output_1.value = "a";
			output_1.displayExp = "value.split(\"\").join(\"/\")";
			container.addChild(output_1, {
				"top": "60px",
				"left": "20px",
				"width": "355px",
				"height": "30px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "한글자자르기";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "100px",
				"left": "39px",
				"width": "93px",
				"height": "54px"
			});
			
			var output_2 = new cpr.controls.Output("opt2");
			output_2.value = "\ttransform-origin : left top;\r\n\t\t-webkit-transform : rotate(90deg);\r\n\t\t-webkit-transform-origin: left top;";
			output_2.bind("displayExp").toExpression("@hanExps(value)");
			container.addChild(output_2, {
				"top": "145px",
				"left": "627px",
				"width": "272px",
				"height": "98px"
			});
			
			var button_2 = new cpr.controls.Button("btn3");
			button_2.value = "regExp";
			if(typeof onBtn3Click == "function") {
				button_2.addEventListener("click", onBtn3Click);
			}
			container.addChild(button_2, {
				"top": "60px",
				"left": "614px",
				"width": "76px",
				"height": "30px"
			});
			
			var button_3 = new cpr.controls.Button("btn11");
			button_3.value = "Button";
			if(typeof onBtn11Click == "function") {
				button_3.addEventListener("click", onBtn11Click);
			}
			container.addChild(button_3, {
				"top": "20px",
				"left": "775px",
				"width": "100px",
				"height": "20px"
			});
			
			var group_1 = new cpr.controls.Container("grp1");
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["100px", "1fr"]);
			formLayout_1.setRows(["1fr", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var button_4 = new cpr.controls.Button("btn2");
				button_4.value = "Button";
				container.addChild(button_4, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var progress_1 = new cpr.controls.Progress("pgr1");
				progress_1.value = "400";
				progress_1.max = 500.0;
				container.addChild(progress_1, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 2,
					"rowSpan": 1
				});
				var progress_2 = new cpr.controls.Progress("pgr2");
				progress_2.value = "300";
				progress_2.max = 400.0;
				container.addChild(progress_2, {
					"colIndex": 1,
					"rowIndex": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "100px",
				"left": "142px",
				"width": "500px",
				"height": "54px"
			});
			
			var userDefinedControl_1 = new udc.aaa.expUd();
			userDefinedControl_1.newProperty1 = "#dm1.getValue(\"column1\")";
			container.addChild(userDefinedControl_1, {
				"top": "222px",
				"left": "62px",
				"width": "300px",
				"height": "300px"
			});
			
			var button_5 = new cpr.controls.Button("btn4");
			button_5.value = "Button";
			if(typeof onBtn4Click3 == "function") {
				button_5.addEventListener("click", onBtn4Click3);
			}
			container.addChild(button_5, {
				"top": "185px",
				"left": "349px",
				"width": "100px",
				"height": "27px"
			});
			
			var group_2 = new cpr.controls.Container("grp2");
			group_2.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-left-style" : "solid",
				"border-right-width" : "1px",
				"border-bottom-width" : "1px",
				"border-bottom-style" : "solid",
				"border-left-width" : "1px",
				"border-top-style" : "solid"
			});
			// Layout
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.topMargin = "0px";
			formLayout_2.rightMargin = "0px";
			formLayout_2.bottomMargin = "0px";
			formLayout_2.leftMargin = "0px";
			formLayout_2.horizontalSpacing = "0px";
			formLayout_2.verticalSpacing = "0px";
			formLayout_2.setColumns(["200px", "1fr"]);
			formLayout_2.setRows(["1fr"]);
			group_2.setLayout(formLayout_2);
			(function(container){
				var output_3 = new cpr.controls.Output("opt4");
				output_3.value = "Output";
				container.addChild(output_3, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var output_4 = new cpr.controls.Output("opt3");
				output_4.value = "가나다라마바사";
				output_4.style.setClasses(["rott"]);
				container.addChild(output_4, {
					"colIndex": 0,
					"rowIndex": 0,
					"horizontalAlign": "left",
					"verticalAlign": "top",
					"width": 125
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "274px",
				"left": "458px",
				"width": "387px",
				"height": "155px"
			});
			
			var hTMLSnippet_1 = new cpr.controls.HTMLSnippet();
			hTMLSnippet_1.value = "<style>\r\n\r\n\t.rott {\r\n\t\ttransform : rotate(90deg);\r\n\t\ttransform-origin : left bottom;\r\n\r\n\t}\r\n<\/style>";
			container.addChild(hTMLSnippet_1, {
				"top": "450px",
				"left": "414px",
				"width": "268px",
				"height": "83px"
			});
			
			var group_3 = new cpr.controls.Container("grp3");
			// Layout
			var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
			flowLayout_1.scrollable = false;
			group_3.setLayout(flowLayout_1);
			(function(container){
				var output_5 = new cpr.controls.Output("opt5");
				output_5.value = "OutputOutputOutputOutput";
				output_5.ellipsis = true;
				container.addChild(output_5, {
					"autoSize": "width",
					"width": "100px",
					"height": "30px"
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "566px",
				"left": "152px",
				"width": "169px",
				"height": "40px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"columns": [
					{"width": "100px"},
					{"width": "100px"},
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
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
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
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "242px",
				"left": "885px",
				"width": "104px",
				"height": "143px"
			});
			
			var button_6 = new cpr.controls.Button("btn5");
			button_6.value = "Button";
			if(typeof onBtn5Click3 == "function") {
				button_6.addEventListener("click", onBtn5Click3);
			}
			container.addChild(button_6, {
				"top": "428px",
				"left": "885px",
				"width": "100px",
				"height": "20px"
			});
			
			var output_6 = new cpr.controls.Output("opt6");
			output_6.bind("value").toExpression("[1,2,3,45].indexOf(1)");
			container.addChild(output_6, {
				"top": "532px",
				"left": "398px",
				"width": "300px",
				"height": "57px"
			});
			
			var group_4 = new cpr.controls.Container("grp4");
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			group_4.setLayout(verticalLayout_1);
			(function(container){
				var group_5 = new cpr.controls.Container("grp5");
				group_5.style.css({
					"border-right-style" : "none",
					"border-left-style" : "none",
					"border-bottom-style" : "none",
					"border-top-style" : "none"
				});
				// Layout
				var formLayout_3 = new cpr.controls.layouts.FormLayout();
				formLayout_3.topMargin = "0px";
				formLayout_3.rightMargin = "0px";
				formLayout_3.bottomMargin = "0px";
				formLayout_3.leftMargin = "0px";
				formLayout_3.horizontalSpacing = "0px";
				formLayout_3.verticalSpacing = "0px";
				formLayout_3.setColumns(["16px", "1fr", "1fr"]);
				formLayout_3.setRows(["1fr"]);
				group_5.setLayout(formLayout_3);
				(function(container){
					var image_1 = new cpr.controls.Image();
					(function(image_1){
					})(image_1);
					container.addChild(image_1, {
						"colIndex": 0,
						"rowIndex": 0,
						"verticalAlign": "center",
						"height": 73
					});
				})(group_5);
				container.addChild(group_5, {
					"autoSize": "height",
					"width": "348px",
					"height": "74px"
				});
			})(group_4);
			container.addChild(group_4, {
				"top": "634px",
				"left": "551px",
				"width": "348px",
				"height": "114px"
			});
			
			var group_6 = new cpr.controls.Container("grp6");
			group_6.style.setClasses(["cl-form-group"]);
			// Layout
			var formLayout_4 = new cpr.controls.layouts.FormLayout();
			formLayout_4.topMargin = "5px";
			formLayout_4.rightMargin = "5px";
			formLayout_4.bottomMargin = "5px";
			formLayout_4.leftMargin = "5px";
			formLayout_4.horizontalSpacing = "10px";
			formLayout_4.verticalSpacing = "10px";
			formLayout_4.horizontalSeparatorWidth = 1;
			formLayout_4.verticalSeparatorWidth = 1;
			formLayout_4.setColumns(["100px", "1fr", "100px", "1fr"]);
			formLayout_4.setCustomColumnShade(0, "#fb5b5b");
			formLayout_4.setUseColumnShade(2, true);
			formLayout_4.setRows(["25px", "25px", "25px", "1fr"]);
			group_6.setLayout(formLayout_4);
			(function(container){
			})(group_6);
			container.addChild(group_6, {
				"top": "616px",
				"left": "81px",
				"width": "367px",
				"height": "143px"
			});
			
			var group_7 = new cpr.controls.Container("grp7");
			group_7.style.css({
				"background-color" : "red"
			});
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_7.setLayout(xYLayout_2);
			(function(container){
			})(group_7);
			container.addChild(group_7, {
				"top": "9px",
				"left": "423px",
				"width": "86px",
				"height": "81px"
			});
			
			var button_7 = new cpr.controls.Button("btn6");
			button_7.value = "Button";
			if(typeof onBtn6Click2 == "function") {
				button_7.addEventListener("click", onBtn6Click2);
			}
			container.addChild(button_7, {
				"top": "9px",
				"left": "331px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_8 = new cpr.controls.Button("btn7");
			button_8.value = "sl";
			if(typeof onBtn7Click2 == "function") {
				button_8.addEventListener("click", onBtn7Click2);
			}
			container.addChild(button_8, {
				"top": "185px",
				"left": "491px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_9 = new cpr.controls.Button("btn8");
			button_9.value = "Button";
			if(typeof onBtn8Click2 == "function") {
				button_9.addEventListener("click", onBtn8Click2);
			}
			container.addChild(button_9, {
				"top": "80px",
				"left": "874px",
				"width": "81px",
				"height": "21px"
			});
			
			var button_10 = new cpr.controls.Button("btn9");
			button_10.value = "Button";
			if(typeof onBtn9Click2 == "function") {
				button_10.addEventListener("click", onBtn9Click2);
			}
			container.addChild(button_10, {
				"top": "521px",
				"left": "43px",
				"width": "100px",
				"height": "27px"
			});
			
			var radioButton_1 = new cpr.controls.RadioButton("rdb1");
			radioButton_1.style.item.bind("color").toExpression("getIndexByValue(value) == 1 ? \"red\" : \"blue\"");
			(function(radioButton_1){
				radioButton_1.addItem(new cpr.controls.Item("label1", "value1"));
				radioButton_1.addItem(new cpr.controls.Item("label2", "value2"));
			})(radioButton_1);
			container.addChild(radioButton_1, {
				"top": "505px",
				"left": "726px",
				"width": "259px",
				"height": "62px"
			});
			
			var button_11 = new cpr.controls.Button("btn10");
			button_11.value = "Button";
			if(typeof onBtn10Click2 == "function") {
				button_11.addEventListener("click", onBtn10Click2);
			}
			container.addChild(button_11, {
				"top": "153px",
				"left": "32px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "tester";
	cpr.core.Platform.INSTANCE.register(app);
})();
