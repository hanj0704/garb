/************************************************
 * isHan.module.js
 * Created at 2020. 1. 31. 오전 11:02:38.
 *
 * @author HANS
 ************************************************/


/**
 * svg요소의 line요소를 사용해서 대각선을 HTMLSnippe에 집어넣고 리턴하는 메서드입니다.
 * @param {Number} x 전체 요소의 가로크기
 * @param {Number} y 전체 요소의 세로크기
 */
function _createSlash(x,y) {
	var snippet = new cpr.controls.HTMLSnippet();
	snippet.style.addClass("slash");
	snippet.value ='<svg height="'+y+'" width="'+x+'">'
	 + '<line x1="0" y1="0" x2="'+x+'" y2="'+y+'" style="stroke:rgb(255,0,0);stroke-width:1"/>'
	  + '</svg>';
	  
	  return snippet;
}
/**
 * HTMLSnippet 객체를 추가하여 아이템 간의 slash를 붙여주는 메서드입니다.
 * @param {cpr.core.AppInstance} _app
 * @param {cpr.controls.UIControl} pcCtrl1
 * @param {cpr.controls.UIControl} pcCtrl2
 */
function drawSlash (_app,pcCtrl1,pcCtrl2){
	var voCtrl1Rect = pcCtrl1.getActualRect();
	var voCtrl2Rect = pcCtrl2.getActualRect();

	var x = voCtrl2Rect.topCenter.x - voCtrl1Rect.bottomCenter.x;
	var y = voCtrl2Rect.topCenter.y - voCtrl1Rect.bottomCenter.y;
		
	var vcOpt = _createSlash(x,y);
	if(x > 0) {
		_app.getContainer().addChild(vcOpt, {
			"width" : x+"px",
			"height" :y+"px",
			"left" : voCtrl1Rect.bottomCenter.x+"px",
			"top" : voCtrl1Rect.bottomCenter.y +"px"
		});
		
	} else {
		_app.getContainer().addChild(vcOpt, {
			"width" : Math.abs(x)+"px",
			"height" :y+"px",
			"left" : voCtrl2Rect.topCenter.x+"px",
			"top" : voCtrl1Rect.bottomCenter.y +"px"
		});
	}
}

globals.toDegrees = function(paramDouble){
	return 180/Math.PI * paramDouble;
}
cpr.events.EventBus.INSTANCE.addFilter("mouseenter", function(e){
	
/** @type cpr.controls.UIControl */
	var control = e.control;
	
	if(control instanceof cpr.controls.Output || control instanceof cpr.controls.HTMLSnippet) {
		var voApp = control.getAppInstance();
			var vaAllChildren = voApp.getContainer().getAllRecursiveChildren();
			
			var vaFilteredCtrl = vaAllChildren.filter(function(each){
//				if(each instanceof cpr.controls.Output || cpr.controls.HTMLSnippet) {
					
					if(each.userAttr("isHan") != "" && each.userAttr("isHan") == control.userAttr("isHan")) {
						
						each.addEventListenerOnce("mouseleave", function(e){
							voApp.getContainer().getAllRecursiveChildren().forEach(function(each){
								if(each.style.hasClass("slash")) {
									voApp.getContainer().removeChild(each);
								}
							});
						});
						return each;
					}
//				}
			});
			
			if(vaFilteredCtrl.length > 0) {
				
				vaFilteredCtrl.sort(function(a,b) {
					return a.top < b.top ? -1 : a.top > b.seq ? 1 : 0 ;
				});
				
				for(var idx = 0 ; idx+1 < vaFilteredCtrl.length ; idx ++) {
					drawSlash(voApp, vaFilteredCtrl[idx], vaFilteredCtrl[idx+1]);
				}
			}
			
	}
});