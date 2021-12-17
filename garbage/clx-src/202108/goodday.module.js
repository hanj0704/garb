///************************************************
// * checkGrpResize.module.js
// * Created at 2021. 7. 26. 오후 4:41:15.
// *
// * @author HANS
// ************************************************/
//
//var attributeNm = "user-id";
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
//	/** @type cpr.controls.CheckBoxGroup[] */
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
//	
//	vaChild.forEach(function(each){
//		each.htmlAttr(attributeNm,each.uuid);
//		
//		
//		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
//			var findExpress = "*[data-usr-" + attributeNm + "='" + each.uuid + "']";
//			var dom = document.querySelector(findExpress);
////			each.userData("doom",dom);
//			var checkBoxs = dom.querySelectorAll(".cl-checkbox");
//			var itemLen = [];
//			var width = checkBoxs.item(0).querySelector(".cl-icon-wrapper").offsetWidth;
//			for(var i=0; i<checkBoxs.length; i++) {
//				var item = checkBoxs.item(i);
//				var font = getComputedStyle(item).font;
//				var label = each.getItem(i).label;
//				
//				var vnLength = Math.round(getTextWidth(label, font)/.01 *.01);
//				itemLen.push(vnLength+width+9);
//			};
//			
//			each.userData("doom", itemLen);
//			console.log(itemLen);
//		});
//	});
//	
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
//
//function CheckResizer(){
//	/** @type cpr.controls.CheckBoxGroup[] */
//	var vaCheckGrps = this.checkGrps;
//	
//	vaCheckGrps.forEach(function(each){
//		var dom = each.userData("doom");
//		
//		var a = _divider(dom, each.getActualRect().width);
//		console.log(a);
//		each.colCount = a.index + 1;
//	});
//}
//function getTextWidth(text, font) {
//    // re-use canvas object for better performance
//    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
//    var context = canvas.getContext("2d");
//    context.font = font;
//    var metrics = context.measureText(text);
//    return metrics.width;
//}
//
//function _vouch(array,width){
//	/** @type Number[] */
//	var vaArr = array;
//	/** @type Number */
//	var vnWidth = width;
//	var vaHan = [];
//	var len = vaArr.length;
//	var isUpper = 0;
//	
//	while(len > isUpper){
//		
//		var a = _divider(vaArr, vnWidth);
//		vaArr = a.remain;
//		isUpper += a.index;
//		vaHan.push(a.index);
//	}
//	
//}
//
//function _divider(array, width) {
//	/** @type Number[] */
//	var vaArr = array;
//	/** @type Number */
//	var vnWidth = width;
//	var sum = 0;
//	var index = 0;
//	for(var i=0; i < vaArr.length; i++){
//		index = i-1;
//			sum += vaArr[i];
//		if(vnWidth<= sum){
//			break;		
//		}
//	}
//	var vaRemain = vaArr.slice(index);
//	return {
//		remain : vaRemain,
//		index : index
//	}
//}