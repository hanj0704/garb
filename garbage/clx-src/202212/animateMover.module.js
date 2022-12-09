/************************************************
 * moduleName.module.js
 * Created at 2022. 11. 29. 오후 2:02:45.
 *
 * @author HANS
 ************************************************/

var Anime = {
	/** @type cpr.core.AppInstance */
	ins : null,
	prop : {
		"propNm" : "test"
	},
	init : function(){
		var that = this;
		cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
			var control = e.control;
			
			if(control instanceof cpr.core.AppInstance) {
				
				if(control.isUDCInstance()) {
					return;
				}
				that.ins = control;
				var vcContainer = control.getContainer();
				var vaChildren = vcContainer.getAllRecursiveChildren().filter(function(each){
					if(each.userAttr("use-animate") == "true") {
//						each.visible = false;
						each.style.css("opacity", "0");
						return each;
					}
//					return each.userAttr("use-animate") == "true";
				});
				that.animate(vaChildren);
			}
		});
	},
	animate : function(/*cpr.controls.UIControl[]*/controls){
		
		this.ins.addEventListenerOnce("load", function(ev){
				
			var vaCtrls = controls;
			
			vaCtrls.forEach(function(each){
				var vsPosition = each.userAttr("position");
				var voConstraint = each.getActualRect();
				var vsTrans = null;
				if(vsPosition == "left") {
					vsTrans = voConstraint.width/2 + "px";
				}
				else if(vsPosition =="right") {
					vsTrans = "-" + voConstraint.width/2 + "px";
				}
				else if(vsPosition == "top") {
					vsTrans = voConstraint.height/2 + "px";
				} else {
					vsTrans = "-" + voConstraint.height/2 +"px"
				}
				
				each.style.removeStyle("opacity");
				var q = new cpr.animation.Animator();
			
				if(vsPosition == "left" || vsPosition == "right") {
					each.style.animateFrom({
						"opacity" : "0",
						"transform" : "translateX("+vsTrans+")"
					});
				} else {
					each.style.animateFrom({
						"opacity" : "0",
						"transform" : "translateY("+vsTrans+")"
					});
				}
			});
		})
	}
}

Anime.init();