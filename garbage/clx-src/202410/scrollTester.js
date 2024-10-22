/************************************************
 * scrollTester.js
 * Created at 2024. 10. 15. 오후 5:37:18.
 *
 * @author HAN
 ************************************************/
var i = 0;
var animator = null;

var transitioned = false;
var scrollTarget = null;
var scrTargets = [];
var scrollEnd = false;
cpr.events.EventBus.INSTANCE.addFilter("mouseenter", function(e){
	/** @type cpr.controls.Container */
	var control = e.control;
	
	if(control.type != "container" && control.type !="grid") {
		return;
	}
	
	if(control instanceof cpr.controls.Container && !control.isAppContainer) {
		if(control.getActualRect().height < control.getContentPaneRect().height) {
			scrollTarget = control;
			control.addEventListenerOnce("mouseleave", function(ev){
				scrollTarget = null;
			})
		}
	}
	else if(control instanceof cpr.controls.Grid) {
		
		if(control.hasVScroll()) {
			scrollTarget = control;
			control.addEventListenerOnce("mouseleave", function(ev){
				scrollTarget = null;
			})
		}
		
	}
});
function wheel(e){
//	console.log(e);
//	console.log(e);
//	app.
//	e.preventDefault();
//	e.stopPropagation();
	
//	var target = 
//	if(scrTargets.length > 0) {
		
		var x = e.clientX;
		var y = e.clientY;
		
		var qw = scrTargets.find(function(/*cpr.controls.UIControl*/ele){
			return	ele.getActualRect().contains(x, y);
		});
		console.log(qw);
		if(qw && !scrollEnd) {
			return;
		}
//	}
	if(transitioned) {
		return;
	}
	if(scrollTarget) {
		return;
	}
	var children = app.getContainer().getChildren().filter(function(each){
		return each.userAttr("section")=="Y";
	});
	if(e.deltaY > 0) {
		
		i = Math.min(i+1,children.length-1);
		
		var top = children[i].getOffsetRect().top;
			app.getContainer().scrollTo(0, top,0.7,cpr.animation.TimingFunction.EASE_IN_OUT);
			app.getContainer().style.animateTo({"transform":""}, 0.7, cpr.animation.TimingFunction.EASE_IN_OUT);
	} else {
		
		i = Math.max(i-1,0);
		var top = children[i].getOffsetRect().top;
			app.getContainer().scrollTo(0, top,0.7,cpr.animation.TimingFunction.EASE_IN_OUT);
			app.getContainer().style.animateTo({"transform":""}, 0.7, cpr.animation.TimingFunction.EASE_IN_OUT);
	}
}
var deb = _.debounce(wheel, 500);
window.addEventListener("wheel", wheel,{
	passive:false
});

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
//	document.body.style.overflowY = "hidden";
//	var w = document.getElementById("uuid-"+q);
//	console.log(w);
	
//	app.getContainer().getAllRecursiveChildren().forEach(function(each){
//		
//		if(each instanceof cpr.controls.Container) {
//			
//			if(each.)
//		}
//		else if(each instanceof cpr.controls.Grid) {
//			
//			each.scr
//		}
//	});
//	app.getContainer().style.css("overflow-y","hidden !important")
	
}

/*
 * 루트 컨테이너에서 transitionend 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 종료 후 발생하는 이벤트.
 */
function onBodyTransitionend(e){
	var group = e.control;
	console.log("TRANSITIONEND");
	transitioned = false;
}


/*
 * 루트 컨테이너에서 transitionstart 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 시작 시 발생하는 이벤트.
 */
function onBodyTransitionstart(e){
	var group = e.control;
	transitioned = true;
}

/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGroupScroll2(e){
	var group = e.control;
//	console.log(scrollTarget);
	console.log(this);
	if(!this.hasOwnProperty("_old")) {
		this._old = 0;
	}
	var delta = e.scrollTop - this._old;
	if((e.maxScrollTop < e.scrollTop+5 && delta >0) || (e.scrollTop == 0) && delta < 0) {
		scrollTarget = null;
		scrollEnd = true;
		
	} else {
		scrollEnd = false;
	}
	this._old = e.scrollTop;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
//		app.getContainer().getChildren().filter(function(each){
//			return each.userAttr("section")=="Y";
//		}).forEach(function(each){
//		});
//	var filtered = app.getContainer().getChildren().filter(function(each) {
//		if (each.userAttr("section") == "Y") {
//			each.htmlAttr("temp-id", each.uuid);
//			return true;
//		}
//	})
//	
	var tempTarget = app.getContainer().getAllRecursiveChildren().filter(function(each) {
		if (each.userAttr("scrollTarget") == "Y") {
			each.htmlAttr("temp-id", each.uuid);
			return true;
		}
	});
	scrTargets = tempTarget;
//	cpr.core.DeferredUpdateManager.INSTANCE.update();
//	
//	filtered.forEach(function(each) {
//		var tems = document.querySelector("[data-usr-temp-id='" + each.uuid + "']");
////				tems.addEventListener("wheel",function(evt){
////					console.log("오와와와");
////					console.log(evt);
////					evt.preventDefault();
////					evt.stopPropagation();
////				});
//	});
	
//		scrollTarget.forEach(function(each){
//			var temps = document.querySelector("[data-usr-temp-id='"+each.uuid+"']");
//			console.log(temps);
//			temps.addEventListener("wheel", function(evt){
//				console.log(evt);
//				evt.stopPropagation();
//				each.addEventListenerOnce("scroll", function(evev){
//					console.log(evev);
//				})
//			});
//		});
//		var q= document.querySelectorAll(".cl-container")
//		console.log(q);
//		for(var div of q) {
//			console.log(div);
//			div.addEventListener("wheel",qwe.bind(div),false)
//		}
//		
//		app.lookup("g1").addEventListener("wheel", function(e){
//			console.log("와");
//		});
//		function qwe(ev){
//			ev.stopPropagation();
//			console.log(ev);
//			console.log(this);
//			/** @type cpr.controls.Container */
//			var q= app.lookupByUUID(this.getAttribute("data-usr-temp-id"));
//			if(!q){
//				return;
//			}
//			console.log(q);
//			
//			if(q.getActualRect().height < q.getContentPaneRect().height) {
//				ev.stopPropagation();	
//			}
//		}
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
//	document.querySelector(".tt").style.transform = "matrix(0.5, 0, 0, 0.5, -100, 0)";
//	app.getContainer().style.css("transform","matrix(0.5, 0, 0, 0.5, -100, 0)");
	app.getContainer().style.animateTo({'transform':"matrix(0.5, 0, 0, 0.5, -100, 0)"},0.5, cpr.animation.TimingFunction.EASE_IN_OUT)
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
//	document.querySelector(".tt").style.transform = "matrix(0.5, 0, 0, 0.5, -100, -100)";
}
