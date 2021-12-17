/************************************************
 * tabTest.js
 * Created at 2020. 8. 12. 오전 10:07:21.
 *
 * @author han
 ************************************************/

/**
 * 외부에서 mdi폴더에 앱아이템을 추가하기 위해 만들어진 함수입니다.
 * @param {#app} appId
 * @param {(item: cpr.controls.TabItem, app: cpr.core.App)=>Void} appLoadCompleteCallback
 */
exports.addTabItemFromOutside = function(appId,appLoadCompleteCallback){
	var vcMdiFolder = app.lookup("mdi1");
	
	vcMdiFolder.addItemWithApp(appId,true,appLoadCompleteCallback);
}