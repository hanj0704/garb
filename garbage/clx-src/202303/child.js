/************************************************
 * child.js
 * Created at 2023. 3. 16. 오후 5:27:46.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var inits = app.getHostProperty("initValue");
	console.log(inits);
	console.log(JSON.stringify(inits));
}
