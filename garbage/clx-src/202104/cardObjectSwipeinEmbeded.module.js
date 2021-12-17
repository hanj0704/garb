/************************************************
 * cardObjectSwipe.module.js
 * Created at 2021. 4. 21. 오전 9:15:00.
 *
 * @author HANS
 ************************************************/

// 의존 모듈 선언.
module.depends("module/swiper_mobile");
var mob = cpr.core.Module.require("module/swiper_mobile");

var arrs = [];
var target ;
var ghostCont;
/**
 * 문제점 :
 * 모듈밖에서 슬라이더를 핸들링 하는 방법이 조잡함.
 * grpFamily를 지워버려서 추가 버튼을 누를때 조잡하게 찾아서 사용해야함.
 * 이 기능을 객체화 할 수 있는지 아니면 그룹 컨트롤을 삭제하지 않고 레이아웃만 변경할 수 있을지
 */

/**
 * @param {cpr.core.AppInstance} poAppInstance
 * @param {cardSwiper[]} paSwiper
 */
function cardGrp(poAppInstance,paSwiper){
	this.grps=  paSwiper;
	this.appIns = poAppInstance;
	this.swiper = null;
}

cardGrp.prototype._onScreenChange = function(/*cpr.events.CScreenChangeEvent*/e) {
	
	var vaGrps = this.grps;
	var vsScreenNm = e.screen.name;
	
	
	if(vsScreenNm == "default") {
		
		if(ghostCont.visible){
			
			target.visible = true;
			var vaGrps = this.grps;
			
			vaGrps.forEach(function(each){
				
				each.parent.insertChild(each.index, each.container,each.constraint);
			});
			if(this.swiper)
			this.swiper.clear();
			ghostCont.removeAllChildren();
			ghostCont.visible = false;
		}
	} else {
		console.log("나에요~~");
		ghostCont.visible = true;
//		vaGrps.forEach(function(each){
//			
//		});
		var vaSwipeDepth=  vaGrps.map(function(each){
			return each.swipeIdx
		});
		vaSwipeDepth = _.uniq(vaSwipeDepth, true);
		console.log(vaSwipeDepth);
		
		vaSwipeDepth.forEach(function(each){
			
			var bro = vaGrps.filter(function(eachGrp){
				if(eachGrp.swipeIdx == each){
					return eachGrp;
				}
			});
			
			if(bro.length > 1) {
				var verticalCont = new cpr.controls.Container();
				var verticalLay = new cpr.controls.layouts.VerticalLayout();
				verticalLay.spacing = 20;
				verticalLay.scrollable = false;
				verticalCont.setLayout(verticalLay);
				
				bro.forEach(function(eachB){
					verticalCont.addChild(eachB.container, eachB.constraint);
				});
				ghostCont.addChild(verticalCont, {
					width:"100%",
					height:"100%",
					autoSize:"height"
				});
			} else {
				var child = bro[0];
				ghostCont.addChild(child.container, {
					width : "100%",
					height: "300%",
					autoSize:"height"
				});
			}
		});
		
		var slidi = mob.slidify(ghostCont)
		slidi.showCount = 1;
		slidi.itemSize = 0;
		slidi.navigationButtonClassName = "slide-btn-none";
		slidi.start(); //slidify추가
		this.swiper = slidi;
		target.visible = false;
		
	}
}
cardGrp.prototype.start = function(){
	this.appIns.addEventListener("screen-change",this._onScreenChange.bind(this));
}
/**
 * 
 * @param {cpr.controls.Container} pcContainer
 */
function cardSwiper(pcContainer){
	this.swiper = null;
	this.container = pcContainer;
	this.parent = pcContainer.getParent();
	this.constraint = pcContainer.getParent().getConstraint(pcContainer);
	this.index = pcContainer.getParent().getChildren().indexOf(pcContainer);
	this.appIns = pcContainer.getAppInstance();
	this.swipeIdx = pcContainer.userAttr("swipe-depth")

	
	this._onchange = this._onScreenChange.bind(this);
//	this.container.swipe = this.swiper;
}

cardSwiper.prototype.change = function(/*cpr.events.CScreenChangeEvent*/e){
	
	var vcContainer = this.container;
	
	var vsScreenName = e.screen.name;
	
	if(vsScreenName == "default") {
		
	}
	else {
		
//		vaContainer.forEach(function(each){
//			
//			each.getAllRecursiveChildren().filter(function(each){
//				
//				if(each.userAttr("swipe-depth") != "");
//				return each;
//			});
//		});
	}
}

cardSwiper.prototype._onScreenChange = function(e) {
	
	console.log("타시면 안되는데요");
}
cardSwiper.prototype.start = function(){
	this.appIns.addEventListener("screen-change", this._onchange);
}

//cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
//	var control = e.control;
//	
//	if(control instanceof cpr.core.AppInstance && control.id.indexOf("udc") != 0) {
//		console.log(control);
//		var vaAllChild = control.getContainer().getAllRecursiveChildren();
//			
//			var vaEa = vaAllChild.filter(function(each){
//				if(each instanceof cpr.controls.EmbeddedApp)
//				return each;
//			});
//			vaEa.forEach(function(each){
//				each.addEventListenerOnce("app", function(e){
//					
//					console.log(e.control);
//				});
//			});
//		var targetCtrl = vaAllChild.filter(function(each){
//			
//			if(each.userAttr("swipe-depth") != "") {
////				return each;
//			var cs = new cardSwiper(each);
////			cs.start();
//			arrs.push(cs);
//			}
//			
//		});
////		console.log(targetCtrl);
////		var cs = new cardSwiper(targetCtrl);
////		arrs.push(cs);
//		console.log(arrs);
////		var carSw = new cardGrp(arrs);
////		carSw.start();
//	
////		 target = vaAllChild.find(function(ele){
////			if(ele.userAttr("ghost-target") == "true"){
////				return ele;
////			}
////		});
////		
////		 ghostCont = new cpr.controls.Container();
////		 var voGhostFlow = new cpr.controls.layouts.FlowLayout();
////		 voGhostFlow.scrollable = false;
////		 voGhostFlow.lineWrap = false;
////		 voGhostFlow.spacing = 0;
////		 voGhostFlow.bottomMargin = 50;
////		 
////		 ghostCont.setLayout(voGhostFlow);
////		 
////		 target.getParent().insertChild(0, ghostCont,{
////		 	width : "100px",
////		 	height: "300px",
////		 	autoSize:"height"
////		 });
////		 ghostCont.visible = false;
//		 
//	}
//});

/**
 * 
 * @param {cpr.core.AppInstance} poAppInstance
 */
globals.initer = function(poAppInstance){
	var aps = poAppInstance;
	
	var vaAllChild = aps.getContainer().getAllRecursiveChildren();
	var allReady = [];
	/** @type cpr.controls.EmbeddedApp[] */
	var vaEa = vaAllChild.filter(function(each){
				if(each instanceof cpr.controls.EmbeddedApp && each.app == undefined){
					return each;
				}
			});
			
			vaEa.forEach(function(each){
				var readyPromise = each.ready(function(eApp){
					var a = eApp.getEmbeddedAppInstance().getContainer().getAllRecursiveChildren();
					a.forEach(function(eachA){
						if(eachA.userAttr("swipe-depth")!=""){
							var cs = new cardSwiper(eachA);
							arrs.push(cs);
						}
					});
				});
				 allReady.push(readyPromise);
			});
			
//			var carSwq = new cardGrp();
//				carSwq.start();
			Promise.all(allReady).then(function(input) {
				console.log(arrs);
				var carSw = new cardGrp(aps,arrs);
				carSw.start();
				target = vaAllChild.find(function(ele) {
					if (ele.userAttr("ghost-target") == "true") {
						return ele;
					}
				});
				
				ghostCont = new cpr.controls.Container();
				var voGhostFlow = new cpr.controls.layouts.FlowLayout();
				voGhostFlow.scrollable = false;
				voGhostFlow.lineWrap = false;
				voGhostFlow.spacing = 0;
				voGhostFlow.bottomMargin = 50;
				
				ghostCont.setLayout(voGhostFlow);
				
				target.getParent().insertChild(0, ghostCont, {
					width: "100px",
					height: "300px",
					autoSize: "height"
				});
				ghostCont.visible = false;
			});
			
}

globals.createCardSwiper = function(pcContainer){
	
	return new cardSwiper(pcContainer);
}