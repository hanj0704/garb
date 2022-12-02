/************************************************
 * cloneTest.js
 * Created at 2022. 11. 24. 오후 1:57:30.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	console.log("zz");
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var uuid = app.lookup("btn1").uuid;
	
	var ele = document.getElementById("uuid-"+uuid);
	
	console.log(ele);
	
	var eles = ele.cloneNode(true);
	
	var shells = new cpr.controls.UIControlShell();
	
	shells.addEventListener("load", function(e){
		var content = e.content;
		content.appendChild(eles);
	});
	app.getContainer().addChild(shells, {
		left: "200px",
		top : "200px",
		width : "100px",
		height:"30px"
	});
	
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	app.lookup("btn1").visible = false;
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	app.lookup("grd1").setWholeRenderingMode(true);
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	var nav = app.lookup("nav1");
	
	nav.selectItem(0);
	var item = nav.getItem(0);
	item.checked = true;
	nav.dispatchEvent(new cpr.events.CMouseEvent("click"));
}
