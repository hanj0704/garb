/************************************************
 * EmbTest.js
 * Created at 2021. 12. 1. 오후 1:13:33.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	console.log(app.getContainer().getAllRecursiveChildren());
	console.log(app.isEmbeddedAppInstance());
	var vcEmb = app.isEmbeddedAppInstance();
	
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	console.log("홀리~");
}
