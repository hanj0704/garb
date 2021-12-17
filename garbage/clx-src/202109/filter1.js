/************************************************
 * filter1.js
 * Created at 2021. 9. 10. 오후 3:39:03.
 *
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("before-value-change", function(e){
	var control = e.control;
	
	e.preventDefault();
});