/************************************************
 * Untitled.js
 * Created at 2021. 6. 22. 오후 2:43:31.
 *
 * @author HANS
 ************************************************/
exports.clear = function(){
	clearInterval(inte);
}
exports.startInte = function(){
	onBodyLoad();
}

/*
 * 루트 컨테이너에서 host-change 이벤트 발생 시 호출.
 * 앱이 다른 부모 앱에 포함되거나 부모 앱으로 부터 이탈할 때 발생하는 이벤트 입니다.
 */
function onBodyHostChange(/* cpr.events.CEvent */ e){
	console.log("HOST_CHANGE발생~~");
}


/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
	console.log("BEFORE_UNLOAD~");
}

var inte;	
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	inte = setInterval(function(){
		console.log("UNTITLE");
	}, 1000)

}
