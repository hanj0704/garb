
var utils = createCommonUtil();


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	var ipb = app.lookup("ipb2");
	
//	ipb.setSelection({start:0,end:ipb.length});
//	ipb.autoSelect = true;
//	ipb.focus();

//	document.execCommand("copy");

//	var dummy = document.createElement("textarea");
//	console.log(dummy);
	
	var ipbEle = document.getElementById("uuid-"+ipb.uuid);
	console.log(ipb.uuid);
	console.log(ipbEle);
//	b.select();
//	document.execCommand("copy");
//	ipbEle.select();
//	document.body.appendChild(dummy);
//	dummy.value = ipb.value;
//	
//	dummy.select();
//	document.execCommand("copy");
//	document.body.removeChild(dummy);
	var a = new ClipboardEvent("copy",{
		dataType : "text/plain",
		data : "zz"
	});
//	console.log(a.clipboardData.);
//	a.clipboardData.setData("text/plain", "aa");
//	a.clipboardData.setData("text/plain", ipb.value);
//	app.dispatchEvent(a);

//	ClipboardEvent.prototype.clipboardData.setData("text", ipb.value);
}


/*
 * 인풋 박스에서 select 이벤트 발생 시 호출.
 * 사용자가 텍스트를 선택할 때 발생하는 이벤트.
 */
function onIpb2Select(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb2 = e.control;
	console.log("select?");
}


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
//	document.addEventListener("copy", function(){
//		console.log("COPY!!!");
//	});

//app.lookup("ds1").changeRowIndex(sourceIndex, targetIndex);
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	console.log(btn1.uuid);
}
