/************************************************
 * Untitled.js
 * Created at 2020. 9. 8. 오후 5:38:49.
 *
 * @author han
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var a = [{
		"column1" : "a",
		"column2" : "1101",
		"column3" : "b",
		"column4" :"D"
	},{
		"column1" : "a",
		"column2" : "2101",
		"column3" : "b",
		"column4" :"D"
	}];
	app.lookup("ds1").build(a);
		
	
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
}
