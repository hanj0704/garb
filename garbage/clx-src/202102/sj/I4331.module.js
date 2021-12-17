/************************************************
 * I4331.module.js
 * Created at 2020. 3. 13. 오전 11:24:03.
 *
 * @author jeeeyul
 ************************************************/

//cpr.core.App.addHook({
//	// App.load 트리거.
//	onLoad: function(appId, loader) {
//		console.log(appId);
//		// I4311-emb 앱이 로드 될 때 I4331-dep.js가 함께 로드 되도록 함.
//		if (appId == "202008/tester") {
//			loader.addScript("data/FXFIG2.json");
//		}
//	},
//	
//	// 앱 델리게이트 onPrepare 트리거.
//	onPrepare: function(app, loader) {
//		if (app.app.id == "_MILESTONE_ISSUES_/2020/R-13/I4331-content/I4331-emb") {
//			
//		}
//	},
//	
//	// 앱 델리게이트 onCreate 트리거.
//	onCreate: function(app, exports) {
//		// 4311이 앱 아이디에 포함된 경우, 앱 컨테이너의 보더 색상을 변경 함.
//		if (app.app.id.indexOf("pop") !== -1) {
//			console.log("ㅋㅋ 걸렸죠?");
//			
//			app.
//		}
//	}
//});