/************************************************
 * emb1.js
 * Created at 2021. 2. 8. 오전 10:24:46.
 *
 * @author csj
 ************************************************/





/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var initValue = app.getHost().initValue;
	if (initValue) {
		console.log(initValue);
		app.getAllDataControls().forEach(function(each, idx) {
			console.log(each.type);
			if(each.type == "datamap"){
				/** @type cpr.data.DataMap */
				var dataMap = initValue[idx];
				dataMap.copyToDataMap(each);
			}else if(each.type == "dataset"){
				
			}
		});
	}
	
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
}
