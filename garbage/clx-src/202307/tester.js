/************************************************
 * tester.js
 * Created at 2023. 7. 10. 오후 1:19:34.
 *
 * @author HANS
 ************************************************/

exports.itemTest = function(a){
	console.log(a);
	return "";
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpb1Keydown(e){
	var ipb1 = e.control;
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
//	app.lookup("msm1").addFileParameter("file", app.lookup("fi1").file);
//	app.lookup("msm1").send();

	var uuid = vcCMb.uuid;
	var element = document.getElementById("uuid-"+uuid);
	var div = element.querySelector(".cl-text");
	div.setAttribute("aria-label","전체");
	var text = element.querySelector("[aria-hidden=true]");
	text.innerText = '전체';
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
//	app.lookup("ds1").getUnfilteredRowDatas(filterFnc, columnType)
	var output = new cpr.controls.Output();
	output.value = "123123123123";
	output.dataType = "number";
	output.format = "s#,##0.00";
	console.log("보여지는 값3 : " + output.text);
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
//	var q = '  <cl:output std:sid="output-7d8abe90" id="opt1" value="하하하">';
//	var ev = /(.+)(value=")(.+)(".+)/;
//	var w = q.replace(ev,'$3');
//	var r = q.match(ev);
//	console.log(w);
//	console.log(r);

	var str = '<cl:output std:sid="output-6da3df03" id="opt3" class="label required" value="조회구분">';
	var ex = /(.+)(cl:output)(.+)(class=")(label)(.+)(value=")(.+)(".+)/g;
	console.log(str.replace(ex, '$8'));
	
//	globals.test = function(){}
	
}


function test(){
	
	globals.alerts = function(){
		console.log("gkgkgk");
	}
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	console.log(app.lookup("ipb3").value);
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	app.lookup("grd1").setMaxRowHeight(40);
}
