/************************************************
 * tester.js
 * Created at 2024. 10. 4. 오전 10:38:04.
 *
 * @author HAN
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("grp1").floatControl(app.lookup("btn1"));
	
	app.floatControl(app.lookup("b3"),{
		top: "700px",
		left: "700px",
		width:"100px",
		height:"30px"
	});
	
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
	console.log(e);
	cmb1.
//	console.log(cmb1.text);
//	console.log(e);
}

/*
 * 콤보 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onCmb1Keydown(e){
	var cmb1 = e.control;
}
