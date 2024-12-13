/************************************************
 * comboInit.module.js
 * Created at 2024. 10. 14. 오전 11:47:54.
 *
 * @author HAN
 ************************************************/

var logs = [];

console._error = console.error;

console.error = function(){
	
	this._error.apply(null, arguments);
	logs.push({"type":"_error","msg":Array.from(arguments)});
	
}
cpr.core.Platform.INSTANCE.onerror = function(report){
	console.log(report);
};


console._all = function(){
	
	logs.forEach(function(each){
		var callee = console[each.type];
		callee(each.msg.join("\n"));
	});
}

//console._error = console.error;
//
//console.error = function(){
//	
//	if(!window.hasOwnProperty("_logs")) {
//		window["_logs"] = [];
//	}
//	this._error.apply(null, arguments);
//	debugger;
//	
//}
//cpr.core.Platform.INSTANCE.onerror = function(report){
//	console.log(report);
//};

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

//XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
//
//XMLHttpRequest.prototype.send = function(body){
//	
//	this._onreadystatechange = this.onreadystatechange;
//	
//	var that = this;
//	this.onreadystatechange = function(e){
//		that._onreadystatechange();
//		if(that.state != 200 && that.readyState ==4) {
//			console.log(that._app);
//			console.log(that._uuid);
//		}
//	}
//	if(that.hasOwnProperty("_app")) {
//		that._sub._data = body;
//		that._sub.abort();
//	}
////	this._send(body);
//	console.log(body);
////	debugger;
//}

//cpr.core.ResourceLoader.setQueryProvider(function(originURL, allowsCache){
//	
//});


cpr.core.ResourceLoader.setAppURLResolver(function(appId,allowsCache){
	var qryParam = {};
	if(!allowsCache){
		qryParam = {
			"v" : "24-09-19"
		}
	}
	return qryParam;
//	if(appId.indexOf("expTester")) {
//		return "http://localhost:8080/"
//	}
}); 