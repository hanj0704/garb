/************************************************
 * GridFilter.js
 * Created at 2019. 9. 17. 오후 4:38:12.
 *
 * @author HANS
 ************************************************/



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	app.lookup("subList").send();
}
