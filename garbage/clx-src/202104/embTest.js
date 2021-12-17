/************************************************
 * embTest.js
 * Created at 2021. 4. 21. 오후 2:28:12.
 *
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
	var control = e.control;
	console.log(control);
});