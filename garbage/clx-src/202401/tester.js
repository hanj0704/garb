/************************************************
 * tester.js
 * Created at 2024. 1. 5. 오후 5:11:29.
 *
 * @author HANS
 ************************************************/

function thisMan() {
	this.q = function(){
		console.log("hello");
	};
	this.w = 2;
}

function protoMan() {
	
}
protoMan.prototype.q=  function(){
		console.log("hello");
	};
protoMan.prototype.w = 2;



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	let this1 = new thisMan();
	let this2 = new thisMan();
	
	console.log(this1.q == this2.q);
	let proto1 = new protoMan();
	let proto2 = new protoMan();
	console.log(proto1.q == proto2.q);
}
