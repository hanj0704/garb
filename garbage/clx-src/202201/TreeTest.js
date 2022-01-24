/************************************************
 * TreeTest.js
 * Created at 2022. 1. 21. 오후 1:43:17.
 *
 * @author HANS
 ************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("subList").send().then(function(input){
		
		createTreecellTuner(app.lookup("ds1"), "label", "value", "parent", "LEVEL", 'LEVEL_SORT_COL');
	});
}
