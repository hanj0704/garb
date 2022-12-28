/************************************************
 * tester2.js
 * Created at 2022. 12. 9. 오후 2:17:15.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var q = [1,2,3,4,5];
	console.log(typeof q);//object
	console.log(q instanceof Array);//true
	console.log(q instanceof Object);//true
	var ev = {"A":1,"B":2};
	console.log(typeof ev);//object
	console.log(ev instanceof Array);//false
	console.log(ev instanceof Object);//true
	var w = "가나다";
	console.log(typeof w);//string
	console.log(w instanceof String);//false
	console.log(w instanceof Array);//false
	console.log(w instanceof Object);//false
	
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	var a = {};
	
	var b = {"q" : 1};
	
	a = b;
	
//	a.data = b;
}

