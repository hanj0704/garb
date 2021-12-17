///************************************************
// * GridSplitHelper.module.js
// * Created at 2020. 10. 7. 오전 11:14:26.
// *
// * @author HANS
// ************************************************/
//
//
//cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
//	var control = e.control;
//	
//	if(control instanceof cpr.core.AppInstance) {
//		
//		var _app = control;
//		
//		var vaAllChild = _app.getContainer().getAllRecursiveChildren();
//		
//		vaAllChild.forEach(function(each){
//			
//			if(each instanceof cpr.controls.Grid) {
//				if(each.leftSplit != 0) {
//					each.userAttr("leftSplit", each.leftSplit.toString());
//				}
//				if(each.leftSplitWidth != undefined) {
//					each.userAttr("leftSplitWidth",each.leftSplitWidth.toString());
//				}
//				if(each.rightSplit != 0) {
//					each.userAttr("rightSplit",each.rightSplit.toString());
//				}
//				if(each.rightSplitWidth != undefined) {
//					each.userAttr("rightSplitWidth", each.rightSplitWidth.toString());
//				}
//			}
//		});
//	}
//});
//
//cpr.events.EventBus.INSTANCE.addFilter("screen-change", function(/* cpr.events.CScreenChangeEvent */ e){
//	
//	var control = e.control;
//	
//	if(control instanceof cpr.core.AppInstance) {
//			
//		if(e.screen.name != "default") {
//			control.getContainer().getAllRecursiveChildren().forEach(function(each){
//				
//				if(each instanceof cpr.controls.Grid) {
//					
//					each.getUserAttrNames().forEach(function(eachProp){
//						if(each[eachProp] != undefined) {
//							each[eachProp] = parseInt(each.userAttr(eachProp));
//						}
//					});
//					
//					each.redraw();
//				}
//			});
//		} else {
//			control.getContainer().getAllRecursiveChildren().forEach(function(each){
//				if(each instanceof cpr.controls.Grid) {
//					each.leftSplit = 0;
//					each.leftSplitWidth = 0;
//					each.rightSplit = 0;
//					each.rightSplitWidth = 0;
//					
//					each.redraw();
//				}
//				
//			});
//			
//			
//		}
//	}
//});	