/************************************************
 * T_FocusInEmbeddedPage.js
 * Created at 2021. 11. 11. 오후 4:34:47.
 *
 * @author ryu
 ************************************************/



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var a = document.getElementsByName(app.lookup("ep1").frameName).item(0).contentWindow;
	var b = document.getElementsByName(app.lookup("ep2").frameName).item(0).contentWindow;
	a.document.body.childNodes.item(3).focus();
//	console.log(a.document.body.childNodes.item(3));
	var q = a.document.querySelectorAll('button, [href], input, [tabindex="0"], select, textarea, [contentEditable=true]');
//	console.log(q);
	
//	console.log(a.body);
//	b.addEventListener("message",function(ev){
//		
//	})
//	a.postMessage({name : "GEEEE"},"*");
	b.postMessage({name :"HITHERE"},"*");
	console.log(a);
	console.log(b);
//	console.log(document.querySelector("nam"))
//	console.log(document.querySelectorAll("iframe")[0]);
//	console.log(document.querySelectorAll("iframe")[0].contentWindow);
//	document.querySelectorAll("iframe")[0].contentWindow.focus();
}

function recieveMessage(event){
	
	console.log(event);
}

/*
 * 텍스트 에리어에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onTxa1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.TextArea
	 */
	var txa1 = e.control;
	
//	if (e.keyCode == cpr.events.KeyCode.TAB){
//		e.preventDefault();
//		document.querySelectorAll("iframe")[0].contentWindow.focus();
//	}
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	console.log(app.lookup("ep1").focusable);
	console.log(app.lookup("opt1").focusable);
}
