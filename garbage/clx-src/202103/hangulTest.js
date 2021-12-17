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
}
