/************************************************
 * gongTest.js
 * Created at 2020. 8. 28. 오후 3:06:20.
 *
 * @author han
 ************************************************/


cpr.events.EventBus.INSTANCE.addFilter("keydown", function(e){
	var control = e.control;
	
	console.log("keyDown");
	
	console.log(e.control);
});


cpr.events.EventBus.INSTANCE.addFilter("keyup", function(e){
	var control = e.control;
	
	console.log("keyup");
});