/************************************************
 * tester2.js
 * Created at 2023. 5. 22. 오후 4:01:12.
 *
 * @author HANS
 ************************************************/

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(e){
	var shl1 = e.control;
	var div = document.createElement("div");
	div.style.width = "100%";
	div.style.height= "100vh";``
	div.style.position = "absolute";
	div.style.backgroundColor = '#FF0000';
	div.style.minHeight = "15px";
	e.content.appendChild(div);
}
