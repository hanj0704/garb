///************************************************
// * checkGrpResize.module.js
// * Created at 2021. 7. 26. 오후 4:41:15.
// *
// * @author HANS
// ************************************************/
//
//
//
//
//
///**
// * 
// * @param {cpr.core.AppInstance} poAppIns
// */
//globals.CheckResponsiveModule = function(poAppIns){
//	
//	return new resizeMod(poAppIns);
//}
//
///**
// * 
// * @param {cpr.core.AppInstance} poAppIns
// */
//var resizeMod = function(poAppIns){
//		var vcContainer = poAppIns.getContainer();
//	
//	/** @type cpr.controls.CheckBoxGroup */
//	var vaChild = vcContainer.getAllRecursiveChildren().filter(function(each){
//		return each instanceof cpr.controls.CheckBoxGroup;
//	}).filter(function(each){
//		
//		
//		if(each.userAttr("ignoreResize") == ""){
//			
//			
//			var voConstraint = each.getParent().getConstraint(each);
//			var vaConstKey = Object.keys(voConstraint);
//			if(vaConstKey.indexOf("autoSize") != -1 || vaConstKey.indexOf("rowIndex") != -1) {
//				
//				return each;
//			}
//		}
//	});
//	this.checkGrps = vaChild;
//	var that = this;
//	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
//		CheckResizer.call(that);
//	});
//	this.starting = function() {
//
//		var eventListener = CheckResizer.bind(this);
//		window.addEventListener("resize", eventListener);
//		
//		poAppIns.addEventListener("before-unload", function(){
//			window.removeEventListener("resize", eventListener);
//		});
//		
//	}
//}
//
//function CheckResizer(){
//	var vaCheckGrps = this.checkGrps;
//	
//	vaCheckGrps.forEach(function(each){
//		
//		var cbgMinWidth = Number(each.userAttr("min-item-width"));
//			var rec = each.getActualRect().width;
//			var colCnt = Math.floor(rec/cbgMinWidth);
//			if(colCnt < 1) colCnt =1;
//			
//			if(each.colCount != colCnt) {
//				each.colCount = colCnt;
//			}
//	});
//}
