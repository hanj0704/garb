/************************************************
 * comboInit.module.js
 * Created at 2024. 10. 14. 오전 11:47:54.
 *
 * @author HAN
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("input", function(e){
	var control = e.control;
	
	if(control.type == "combobox") {
		control._displaying = e.target.value;
	}
});

//Object.defineProperty(cpr.controls.Combobox, "_text", {
//	get: function(){
//		return this._hangul+this._temp;
//	}
//})