/************************************************
 * tester.js
 * Created at 2024. 10. 4. 오전 10:38:04.
 *
 * @author HAN
 ************************************************/
//cpr.controls.ComboBox.prototype._getTexts = function(){
//	
//	return this._hangul+this._temp;
//};

var util = createCommonUtil();
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
//	app.lookup("grp1").floatControl(app.lookup("btn1"));
//	
//	app.floatControl(app.lookup("b3"),{
//		top: "700px",
//		left: "700px",
//		width:"100px",
//		height:"30px"
//	});
	
	app.floatControl(app.lookup("grp2"),{
		left : "0px",
		right : "0px",
		height: "auto",
		bottom: "0px"
	});
	
	app.lookup("grp2").style.css("max-height","50px");
}

/*
 * "Button" 버튼(b3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onB3Click(e){
	var b3 = e.control;
//	cpr.core.ResourceLoader.resolver
//	cpr.core.App.addHook({
//		
//	});

	var q = [];
	
	q.find(function(ele){
		console.log("ㅂㅂ");
		return true;
	});
}

/*
 * 인풋 박스에서 input 이벤트 발생 시 호출.
 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
 */
function onIpb1Input(e){
	var ipb1 = e.control;
	app.lookup("lbx1").visible = true;
}

/*
 * 인풋 박스에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onIpb1Blur(e){
	var ipb1 = e.control;
	setTimeout(function(){
		if(!app.lookup("lbx1").focused) {
			app.lookup("lbx1").visible = false;
		}
	}, 50)
}

/*
 * 리스트 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onLbx1Focus(e){
	var lbx1 = e.control;
	console.log("focus");
}

/*
 * 리스트 박스에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onLbx1ItemClick(e){
	var lbx1 = e.control;
	app.lookup("ipb1").value = lbx1.text;
	app.lookup("lbx1").visible = false;
	app.lookup("ipb1").focus();
}

/*
 * 콤보 박스에서 input 이벤트 발생 시 호출.
 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
 */
function onCmb1Input(e){
	var cmb1 = e.control;
//	console.log(e.target.value);
	console.log(cmb1._displaying);
	return;
//if()
//	debugger;
	if(!cmb1.hasOwnProperty("_hangul")){
		
		cmb1._hangul = "";
		cmb1._temp = "";
	}
//	if(e);
//	if(cmb1._temp == e.data) {
//		cmb1._hangul+= cmb1._temp;
//		cmb1._temp = "";
//		return;
//	}
	
//	if(!e.isComposing){
//		return;
//	}
//	console.log(e.data);
//	if(cmb1._temp== "") {
//		cmb1._temp = e.data;
//	}
//	console.log(cmb1._temp);
	var startA = e.data.charCodeAt(0) - 44032;
//	console.log(startA);
	if(startA < 0 || isNaN(startA)) {
		if(cmb1._temp != "") {
//			console.log(cmb1._temp,"어절씨구");
			cmb1._hangul+= cmb1._temp;
			cmb1._temp = "";
		} else {
			cmb1._temp = e.data;
		}
		return;
	}
	var startB = cmb1._temp.charCodeAt(0) - 44032;
	var from = Math.floor(startB / 28) * 28 + 44032
	if(from < 44032) {
		cmb1._temp = e.data;
		return;
	}
//	console.log(startA);
//	console.log(from);
console.log(cmb1._temp.charCodeAt(0)-e.data.charCodeAt(0));
var bools = Math.abs(cmb1._temp.charCodeAt(0)-e.data.charCodeAt(0)) <= 27;
	if(e.data.charCodeAt(0) >= from && e.data.charCodeAt(0) <= from + 587) {
//		if(cmb1._temp.charCodeAt(0)>e.data.charCodeAt(0)) {
//			cmb1._hangul += e.data;
//			cmb1.temp = "";
//			console.log("zz");
////			debugger;
//		} else{
			
		if(bools){
			console.log("뭥미",cmb1._temp,e.data);
			cmb1._temp = e.data;
//			cmb1._hangul += cmb1._temp;
		} else {
			console.log("시츄");
			cmb1._hangul += cmb1._temp;
			cmb1._temp = e.data;
		}
//			cmb1._temp = e.data;
//		}
//		if(from)
//		console.log(cmb1._temp,"캬");
	} else {
		console.log("오잉크", cmb1._temp);
		cmb1._hangul += cmb1._temp;
		cmb1._temp = e.data;
	}
//	console.log("RESULT:",cmb1._hangul);
//	if(cmb1._temp == "") {
//		cmb1._temp = e.data;
//	}
console.log("RESULT:",cmb1._getTexts());
//	console.log(cmb1._hangul);
//	if(startA % 28)
//	e.data;
//	console.log(e.charCode);
//	cmb1._temp = e.data;
//	if(e.isComposing) {
//		if()
//		if(cmb1._hangul.slice(-1) ){
//			
//		}
//		cmb1._hangul = e.data;
//		
//	}
//	console.log(e);
//	console.log(e.isComposing);
//	console.log(e.data);
//	cmb1.
//	console.log(cmb1.text);
//	console.log(e);
}

/*
 * 콤보 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onCmb1Keydown(e){
	var cmb1 = e.control;
//	console.log(e);
//	setTimeout(function(){
//		debugger;
//	},3000)
}


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $&은 일치한 문자열 전체를 의미
}

function ch2pattern(ch) {
  var vnConstValue = 44032; /* '가'의 코드 */
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    var vnChCode = ch.charCodeAt(0) - vnConstValue;//44032 뺴기
    // 종성이 있으면 문자 그대로를 찾는다.
    if (vnChCode % 28 > 0) {
      return ch;
    }
    var vnBegin = Math.floor(vnChCode / 28) * 28 + vnConstValue;//가~갛 까지 각 첫번째 자음 모음을 가져옴 
    var vnEnd = vnBegin + 27; //가~갛 까지 찾음
    return `[\\u${vnBegin.toString(16)}-\\u${vnEnd.toString(16)}]`;//16비트화
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {//자음만 넘어왔다면?
    var con2syl = {
      'ㄱ': '가'.charCodeAt(0),
      'ㄲ': '까'.charCodeAt(0),
      'ㄴ': '나'.charCodeAt(0),
      'ㄷ': '다'.charCodeAt(0),
      'ㄸ': '따'.charCodeAt(0),
      'ㄹ': '라'.charCodeAt(0),
      'ㅁ': '마'.charCodeAt(0),
      'ㅂ': '바'.charCodeAt(0),
      'ㅃ': '빠'.charCodeAt(0),
      'ㅅ': '사'.charCodeAt(0),//자음으로 올 수 있는 요소에 대한 정보,ㅅ 이전의 대상들은 ㅂ과 ㅅ 사이에 초성으로 올 수 있는 ㅃ 외에 ㅄ등이 존재하기 때문에 밑에서
      						//식을 돌릴 때 순서대로 나오기 힘듦
    };
    							//ch에는 ㅆ부터 ㅎ 까지 순서대로 들어가 있음. ㅆ - ㅅ = 1이 되어서 사.charCodeAt(0)에 588 * 1을 더하면 싸가 되기 때문에
								//초성으로 들어갈 수 있는 20개의 문자 중에 ㅅ 이후로부터는 유니코드에서의 순서가 일치하는데, ㅅ 이전의 것들은 유니코드 문자 순서와
								//초성으로 들어갈 수 있는 자음의 순서가 일치하지 않음.그래서 ㅅ 전의 것들은 con2syl을 통해 해당 자음으로 시작하는 첫번쨰 글자를 
								//리턴받게 했고, ||가 들어가있어서 왼쪽 오른쪽 중에 큰 값이 들어가게됨
    var vnBegin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */ ) * 588 + con2syl['ㅅ'] );//가 부터
    var vnEnd = vnBegin + 587;//깋 까지 588이 자음이 바뀌는 크기의 기준인데 587이면 자음이 바뀌기 이전, 동일한 자음을 사용하는 가장 마지막 글자임
    return `[${ch}\\u${vnBegin.toString(16)}-\\u${vnEnd.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  return escapeRegExp(ch);
}
/**
 * 퍼지문자열검색 방식을 사용하여 검색하는 함수, 사용자가 입력한 문자에 대해 유사한 비슷한 문자에 대해 추측하여
 * 비슷한 문자열을 사용하는 검색결과도 리턴받게 합니다. ex) ㄱㄹㄷ  검색시 그리드, 그래도,그렇다 등의 결과를 서치할 수 있습니다.
 * 한글의 유니코드 범위를 통해 구현되었습니다.
 * @param {String} input 검색문자열
 * @param {String} text 검색 대상
 */
function createFuzzyMatcher(input,text) {
  var pattern = input.split('').map(ch2pattern).join('.*?');
  return new RegExp(pattern).test(text);
}

exports.createFuzzyMatcher = createFuzzyMatcher;

var max = 50;
/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
//	max = max==50 ? 200 : 50;
//	app.lookup("grp2").style.animateTo({
//							"max-height" : max+"px",
//						}, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
////	app.lookup("sms1").send();	
//	util.Submit.send(app, "sms1");
	
//	debugger;
	
//	var w = new btn2.constructor("btnqq");
//	
//	console.log(w.id);
//	
//	app.getContainer().addChild( w, {
//		left: "900px",
//		top:"100px",
//		width: "200px",
//		height: "100px"
//	});
//	for(var i in btn2) {
//		if(i.indexOf("_") == -1){
//			
//			w[i] = btn2[i];
//		}
//		console.log(i);
//	}
//	debugger;
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	onCmb1Input({data:"ㄱ",
	control: app.lookup("cmb1")});
	
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	onCmb1Input({data:"게",
	control: app.lookup("cmb1")});
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	onCmb1Input({data:"겐",
	control: app.lookup("cmb1")});
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var button = e.control;
	onCmb1Input({data:"게",
	control: app.lookup("cmb1")});
	onCmb1Input({data:"네",
	control: app.lookup("cmb1")});
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb2ValueChange(e){
	var ipb2 = e.control;
	
}

/*
 * 인풋 박스에서 input 이벤트 발생 시 호출.
 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
 */
function onIpb2Input(e){
	var ipb2 = e.control;
	
	ipb2.setSelectionRange(0, 100);
	
	console.log(ipb2.getSelectedRange());
//	window.exec
//	setTimeout
//	(function(){
//		var q = ipb2;
//		debugger
//	},3000)
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var q = document.getElementsByName("viewport").item(0);
	console.log(q);
	q.setAttribute("content", "width=2560,user-scalable=yes");
}
