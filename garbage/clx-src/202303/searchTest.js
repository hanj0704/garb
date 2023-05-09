/************************************************
 * searchTest.js
 * Created at 2023. 3. 16. 오전 9:27:32.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var grd = app.lookup("grd1");
//	grd.setEditRowIndex(0);
//	grd.focusCell(0, 0);
//	setTimeout(function(){
	app.lookup("sch1").search();
		
//	}, 500)
}

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSch1Search(e){
	var sch1 = e.control;
	console.log("SEARCH");
	
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	app.lookup("sch2").search();
}

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSch2Search(e){
	var sch2 = e.control;
	console.log("히히");
}
