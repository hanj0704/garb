/************************************************
 * Search.js
 * Created at 2024. 10. 14. 오후 5:27:04.
 *
 * @author HAN
 ************************************************/

var util = createCommonUtil();


function skeleton(){
	
	app.lookup("grpBody").getAllRecursiveChildren().forEach(function(each){
		
		if(each instanceof cpr.controls.Container) {
			
			each.style.addClass("skeleton");
		}
	});
}

function hideSkeleton() {
	
	app.lookup("grpBody").getAllRecursiveChildren().forEach(function(each){
		
		if(each instanceof cpr.controls.Container) {
			
			each.style.removeClass("skeleton");
		}
	});
}
/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSi1Search(e){
	var si1 = e.control;
	
	skeleton();
	util.Submit.send(app, "sms1", null, function(){
		
	});
}
