///************************************************
// * languageTransfer.module.js
// * Created at 2020. 4. 27. 오전 9:40:22.
// *
// * @author HANS
// ************************************************/
//
//
//var useTranslate = false;
//
///**
// * 다국어 변환 기능 사용여부를 설정할 수 있습니다. 
// * @param {any} pBool
// */
//globals.setUseTranslate = function(pBool){
//	useTranslate = pBool;
//};
//
///**
// * 다국어 변환 기능을 사용 여부를 반환 받습니다.
// */
//globals.getUseTranslate = function(){
//	return useTranslate;
//}
//
//var vsLangCode = "ko";
//
///**
// * 다국어 변환할 언어코드를 설정합니다.
// * @param {cpr.core.AppInstance} _app
// * @param {"ko"|"en"} psLangCode
// */
//globals.setLanguageCode = function(_app,psLangCode) {
//	
//	vsLangCode = psLangCode;
//	
//	//2020.07/27 조한진. 임시 스크립트 추가
////	var vcContainer = _app.getContainer();
////	
////	var vaChildren = vcContainer.getAllRecursiveChildren().filter(function(each){
////		return  each.getBindInfo("value") === undefined;
////	});
////	
////	var voLocaleData = cpr.I18N.INSTANCE.getLocaleData(vsLangCode);
////	
////	vaChildren.forEach(function(each,idx){
////		
////		if(!ValueUtil.isNull(voLocaleData[each.value])) {
////			each.value = voLocaleData[each.value];
////		}
////	});
////	vcContainer.redraw();
//}
//
///**
// * 다국어 변환 언어코드를 반환 받습니다.
// */
//globals.getLanguageCode = function(){
//	
//	return vsLangCode;
//}
//
//cpr.events.EventBus.INSTANCE.addFilter("init", function(e) {
//	var control = e.control;
//
//	if (useTranslate) {
//
//		if (control instanceof cpr.core.AppInstance) {
//
//			var vcContainer = control.getContainer();
//
//			var vaChildren = vcContainer.getAllRecursiveChildren().filter(function(each) {
//				return each.getBindInfo("value") === undefined;
//			});
//
//			var localeData = cpr.I18N.INSTANCE.getLocaleData(vsLangCode);
//
//			vaChildren.forEach(function(each, idx) {
//				
//				if(!ValueUtil.isNull(localeData[each.value])){
//					
//					each.value = localeData[each.value];
//				}
//
//			});
//		}
//	}
//});