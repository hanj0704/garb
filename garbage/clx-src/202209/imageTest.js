/************************************************
 * imageTest.js
 * Created at 2022. 10. 5. 오전 10:03:31.
 *
 * @author HANS
 ************************************************/
//document.addEventListener("error", function(evt){
//	console.log(evt);
//	
//},true);
/*
 * 이미지에서 error 이벤트 발생 시 호출.
 * value(src)에서 이미지를 가져오지 못하면 발생하는 이벤트.
 */
function onImageError(e){
	var image = e.control;
	console.log("에러");
}


cpr.events.EventBus.INSTANCE.addFilter("error", function(e){
	var control = e.control;
	
	console.log("에러이벤트필터되지않음");
});

