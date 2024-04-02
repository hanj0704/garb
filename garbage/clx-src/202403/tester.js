/************************************************
 * tester.js
 * Created at 2024. 4. 1. 오전 9:31:44.
 *
 * @author HANS
 ************************************************/

exports.test = function(rowIndex){
	
	console.log(rowIndex);
	
	return true;
}

//XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
//
//XMLHttpRequest.prototype.send = function(body){
//	
//	this._onreadystatechange = this.onreadystatechange;
//	
//	var that = this;
//	
//	this.onreadystatechange = function(e){
//		that._onreadystatechange();
//		if(that.state != 200 && that.readyState ==4) {
//			console.log(that._app);
//			console.log(that._uuid);
//		}
//	}
//	this.send(body);
//	console.log(body);
//}