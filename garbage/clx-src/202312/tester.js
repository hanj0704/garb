/************************************************
 * tester.js
 * Created at 2023. 12. 7. 오후 1:52:17.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("cbg1").setFilter("value != 'value2'");
}

/*
 * "remove하기" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	app.lookup("cbg1").removeSelectionByValue("value2");
}

/*
 * "value찍기" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	console.log(app.lookup("cbg1").values);
}

/*
 * 임베디드 페이지에서 load 이벤트 발생 시 호출.
 * 페이지의 Load가 완료되었을 때 호출되는 Event.
 */
function onEp1Load(e){
	var ep1 = e.control;
	console.log(e);
//	console.log(e.content);
//	console.log(e.target);
	console.log("호엥");
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	app.lookup("grp1").addChild(app.lookup("ep1"), {
		rowIndex: 0,
		colIndex: 0
	});
}

var aaa = 123;
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick123(e){
				var button = e.control;
				console.log(window.aaa);
			}
			
			
			