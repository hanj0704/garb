/************************************************
 * moduleName.module.js
 * Created at 2022. 11. 29. 오후 2:02:45.
 *
 * @author HANS
 ************************************************/
var Anime = {
	objs : new cpr.utils.ObjectMap(),
	/** @type cpr.core.AppInstance */
	ins : null,
	children : [],
	mus : [],
	prop : {
		"propNm" : "test"
	},
	init : function(){
		console.log("히히힝");
		var that = this;
		cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
			var control = e.control;
			
			if(control instanceof cpr.core.AppInstance) {
				
				if(control.isUDCInstance()) {
					return;
				}
				that.ins = control;
				var vcContainer = control.getContainer();
//				var mus = new MutationObserver(function(mutationList,observer){
//					console.log(mutationList);
//					console.log(observer);
//				});
				
				var vaChildren = vcContainer.getAllRecursiveChildren().filter(function(each){
					if(each.userAttr("use-animate") != "") {
//						each.visible = false;
						each.style.css("opacity", "0");
						return each;
					}
//					return each.userAttr("use-animate") == "true";
				});
				
				that.children = vaChildren;
				var thro = _.debounce(that._scroll.bind(that), 400);
				control.getContainer().addEventListener("scroll", thro);
//				new M
//				cpr.utils.ObjectMap.
				
//				that.animate(vaChildren);
			}
		});
//		var scroller = _.debounce(this.scroll.bind(this),100);
//		window.addEventListener("scroll", scroller,{
//			capture : true
//		});
	},
	_scroll : function(ev){
		var vaTargets=  this.children;
	var that = this;
	vaTargets.forEach(function(each){
		var q=  window.innerHeight > each.getOffsetRect().top;
		if(q) {
			console.log("지금이니");
			that.animate(each);
		}
	});
	
	},
	animate : function(/*cpr.controls.UIControl*/controls){
		
//		this.ins.addEventListenerOnce("load", function(ev){
				
			var each = controls;
			
//			vaCtrls.forEach(function(each){
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
					},0.5,cpr.animation.TimingFunction.EASE_IN_OUT_BACK);
				} else {
					each.style.animateFrom({
						"opacity" : "0",
						"transform" : "translateY("+vsTrans+")"
					});
				}
//			});
//		})
	}
}
/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {cpr.controls.UIControl[]} target
 */
function ScrollObserver(app,target){
	this._app = app;
	this.target = target;

}
ScrollObserver.prototype._scroll = function(ev){
	var vaTargets=  this.target;
	
	vaTargets.forEach(function(each){
		var q=  window.innerHeight < each.getOffsetRect().top;
		if(q) {
			
		}
	});
}

ScrollObserver.prototype.start = function(){
	var voApp = this._app;
	
	voApp.getContainer().addEventListener("scroll", function(e){
		
	});
};
Anime.init();