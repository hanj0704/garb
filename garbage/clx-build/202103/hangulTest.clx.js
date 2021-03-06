/*
 * App URI: 202103/hangulTest
 * Source Location: 202103/hangulTest.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202103/hangulTest", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * hangulTest.js
			 * Created at 2021. 3. 25. 오후 4:31:57.
			 *
			 * @author HANS
			 ************************************************/
			
			
			
			/*
			 * 인풋 박스에서 blur 이벤트 발생 시 호출.
			 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
			 */
			function onIpb1Blur(/* cpr.events.CFocusEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var ipb1 = e.control;
				
				console.log("blur");
				e.stopPropagation();
				e.preventDefault();	
			}
			
			
			
			/*
			 * 인풋 박스에서 change 이벤트 발생 시 호출.
			 * 값이 변경 되었을때 발생하는 DOM 이벤트.
			 */
			function onIpb1Change(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var ipb1 = e.control;
				console.log("change");	
			}
			
			
			/*
			 * 인풋 박스에서 input 이벤트 발생 시 호출.
			 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
			 */
			function onIpb1Input(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var ipb1 = e.control;
				
				console.log("INPUT");
			}
			
			
			function getConstantVowel(kor) {
			    var f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
			               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
			               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
			    var s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
			               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
			               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
			    var t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
			               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
			               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
			               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
			
			    var ga = 44032;
			    var uni = kor.charCodeAt(0);
			
			    uni = uni - ga;
			
			    var fn = parseInt(uni / 588);
			    var sn = parseInt((uni - (fn * 588)) / 28);
			    var tn = parseInt(uni % 28);
			
			    return {
			        f: f[fn],
			        s: s[sn],
			        t: t[tn]
			    };
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
				
				app.lookup("ipb1").value = "권";
			}
			
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				app.lookup("ipb1").putValue("관");
			}
			
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick3(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				var a = getConstantVowel(app.lookup("ipb1").value);
				console.log(a);
			}
			
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick4(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				var vcIpb = app.lookup("ipb1");
				var vcVirtualKeyboard = new udc.cmn.keyboard();
				vcVirtualKeyboard.targetCtrl = vcIpb;
				
				var vaFloatedKeyboard = app.getFloatingControls().filter(function(each){
					 return each instanceof udc.cmn.keyboard;
				});
				
				if(vaFloatedKeyboard.length > 0) {
					vaFloatedKeyboard.forEach(function(each){
						each.dispose();
					});
				}
				var container = new cpr.controls.Container();
				var xy = new cpr.controls.layouts.XYLayout();
				container.setLayout(xy);
				
				container.addEventListener("click", function(e){
					console.log("ㅋㅋ");
				});
				
				app.floatControl(container,{
					left : "0px",
					top : "0px",
					right:"0px",
					bottom:"0px"
				});
				app.floatControl(vcVirtualKeyboard,{
					bottom :"0px",
					left : "0px",
					right: "0px",
					height:"300px"
				});
			}
			
			
			/*
			 * "ㄱ" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick5(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				var keyEv = new cpr.events.CKeyboardEvent("keydown",{
					keyCode : "66"
				});
				keyEv.keyCode = '66';
				keyEv.key = "b";
				app.lookup("ipb1").dispatchEvent(keyEv)
			//	app.lookup("ipb1").value = app.lookup("ipb1").value +button.value;
			}
			
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick6(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				console.log(encodeURI("ㄱ"));
				console.log("ㅜ".charCodeAt(0));
				console.log("ㅓ".charCodeAt(0));
				console.log("ㅝ".charCodeAt(0))
			}
			
			
			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
				/** 
				 * @type cpr.controls.InputBox
				 */
				var ipb1 = e.control;
				
				console.log(e);
				console.log("KEYDOWN");
			};
			// End - User Script
			
			// Header
			
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
			var inputBox_1 = new cpr.controls.InputBox("ipb1");
			if(typeof onIpb1Blur == "function") {
				inputBox_1.addEventListener("blur", onIpb1Blur);
			}
			if(typeof onIpb1Change == "function") {
				inputBox_1.addEventListener("change", onIpb1Change);
			}
			if(typeof onIpb1Input == "function") {
				inputBox_1.addEventListener("input", onIpb1Input);
			}
			if(typeof onIpb1Keydown == "function") {
				inputBox_1.addEventListener("keydown", onIpb1Keydown);
			}
			container.addChild(inputBox_1, {
				"top": "20px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "Button";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "60px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button();
			button_2.value = "Button";
			if(typeof onButtonClick2 == "function") {
				button_2.addEventListener("click", onButtonClick2);
			}
			container.addChild(button_2, {
				"top": "79px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_3 = new cpr.controls.Button();
			button_3.value = "Button";
			if(typeof onButtonClick3 == "function") {
				button_3.addEventListener("click", onButtonClick3);
			}
			container.addChild(button_3, {
				"top": "98px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_4 = new cpr.controls.Button();
			button_4.value = "Button";
			if(typeof onButtonClick4 == "function") {
				button_4.addEventListener("click", onButtonClick4);
			}
			container.addChild(button_4, {
				"top": "117px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_5 = new cpr.controls.Button();
			button_5.value = "ㄱ";
			if(typeof onButtonClick5 == "function") {
				button_5.addEventListener("click", onButtonClick5);
			}
			container.addChild(button_5, {
				"top": "158px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_6 = new cpr.controls.Button();
			button_6.value = "ㅝ";
			if(typeof onButtonClick5 == "function") {
				button_6.addEventListener("click", onButtonClick5);
			}
			container.addChild(button_6, {
				"top": "158px",
				"left": "130px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_7 = new cpr.controls.Button();
			button_7.value = "ㄴ";
			if(typeof onButtonClick5 == "function") {
				button_7.addEventListener("click", onButtonClick5);
			}
			container.addChild(button_7, {
				"top": "158px",
				"left": "240px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_8 = new cpr.controls.Button();
			button_8.value = "Button";
			if(typeof onButtonClick6 == "function") {
				button_8.addEventListener("click", onButtonClick6);
			}
			container.addChild(button_8, {
				"top": "188px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "hangulTest";
	cpr.core.Platform.INSTANCE.register(app);
})();
