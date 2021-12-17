///************************************************
// * mobileGenerator.module.js
// * Created at 2021. 1. 5. 오전 10:14:17.
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
//		
//		var a = control.getContainer();
//		
//		var b = a.getAllRecursiveChildren();
//		
//		var comboArr = b.filter(function(each){
//			
//			return each instanceof cpr.controls.ComboBox
//		});
//		var dt = b.filter(function(each){
//			return each instanceof cpr.controls.DateInput;
//		});
//		dt.forEach(function(each){
//			/** @type cpr.controls.DateInput */
//			var combo = each;
//			
//			var parent = combo.getParent();
//			
//			var rect = parent.getConstraint(combo);
//			
//			var sheCmb = new udc.han.DateInput();
//			
//			if(parent.getLayout() instanceof cpr.controls.layouts.VerticalLayout) {
//				
//				var children = parent.getChildren();
//				var idx = children.indexOf(combo);
//				console.log(idx);
//				parent.addChild(sheCmb, rect);
//				parent.reorderChild(sheCmb, idx);
//				
//			} else {
//				
//				parent.addChild(sheCmb, rect);
//			}
//			
//			combo.dispose();
//		});
//		comboArr.forEach(function(each){
//			/** @type cpr.controls.ComboBox */
//			var combo = each;
//			
//			var parent = combo.getParent();
//			
//			var rect = parent.getConstraint(combo);
//			var ds = combo.dataSet;
//			var itemSet = combo.itemSetConfig;
//			
//			var sheCmb = new udc.han.cmb();
//			sheCmb.targetDs = ds;
//			sheCmb.labelC = itemSet.label;
//			sheCmb.valueC = itemSet.value;
//			
//			if(parent.getLayout() instanceof cpr.controls.layouts.VerticalLayout) {
//				
//				var children = parent.getChildren();
//				var idx = children.indexOf(combo);
//				console.log(idx);
//				parent.addChild(sheCmb, rect);
//				parent.reorderChild(sheCmb, idx);
//				
//			} else {
//				
//				parent.addChild(sheCmb, rect);
//			}
//			
//			combo.dispose();
//		});
//	}
//});