/************************************************
 * tester.js
 * Created at 2023. 9. 1. 오후 4:29:02.
 *
 * @author HANS
 ************************************************/

exports.test = function(id){
	console.log(id);
	cpr.core.App.load(id, function(loadedApp){
		app.lookup("ea1").app = loadedApp;
	});
}
