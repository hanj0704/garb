/************************************************
 * mdiTest.js
 * Created at 2020. 7. 15. 오후 4:34:58.
 *
 * @author han
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
/** @type Array */
var va = document.head.getElementsByTagName("script");

console.log(va);
	
	var q = Object.keys(va).map(function(each){
		return va[each];
	});
	console.log(q);
	q = q.filter(function(each){
		if(each.src.indexOf("json")>=0){
			console.log(each.src);
			return each;
		}
	});
	
	q.forEach(function(each){
		console.log(each.src);
	});
}


