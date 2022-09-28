/************************************************
 * tester.js
 * Created at 2022. 9. 23. 오전 10:18:58.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
//	FastClick.attach(document.body);
	var meta = document.getElementsByName("viewport");
	var item = meta.item(0);
	item.setAttribute("CONTENT", "width=1440,user-scalable=no");
	
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	FastClick.attach(document.body);
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var uuid = app.getContainer().uuid;
	var div = document.getElementById("uuid-"+uuid);
	console.log(div);
	
	FastClick.attach(div);
}
