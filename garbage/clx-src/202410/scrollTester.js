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
//cpr.events.EventBus.INSTANCE.addFilter("mouseenter", function(e){
//	/** @type cpr.controls.Container */
//	var control = e.control;
//	
//	if(control.type != "container" && control.type !="grid") {
//		return;
//	}
//	
//	if(control instanceof cpr.controls.Container && !control.isAppContainer) {
//		if(control.getActualRect().height < control.getContentPaneRect().height) {
//			console.log("아와와");
//			scrollTarget = control;
//			control.addEventListenerOnce("mouseleave", function(ev){
//				console.log("효효효");
//				scrollTarget = null;
//			})
//		}
//	}
//	else if(control instanceof cpr.controls.Grid) {
//		
//		if(control.hasVScroll()) {
//			scrollTarget = control;
//			control.addEventListenerOnce("mouseleave", function(ev){
//				scrollTarget = null;
//			})
//		}
//		
//	}
//});
/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGroupScroll(e){
	var group = e.control;
	
	console.log("ㅋㅋ");
}
function wheel(e){
//	console.log(e);
	
//	app.
//	e.preventDefault();
//	e.stopPropagation();
	
//	var target = 
	
	if(transitioned) {
		return;
	}
	if(scrollTarget) {
		return;
	}
	if(e.deltaY > 0) {
		
		i = Math.min(i+1,app.getContainer().getChildren().length-1);
		
		var top = app.getContainer().getChildren()[i].getOffsetRect().top;
			app.getContainer().scrollTo(0, top,0.7,cpr.animation.TimingFunction.EASE_IN_OUT);
			app.getContainer().style.animateTo({}, 0.7, cpr.animation.TimingFunction.EASE_IN_OUT)
	} else {
		
		i = Math.max(i-1,0);
		var top = app.getContainer().getChildren()[i].getOffsetRect().top;
			app.getContainer().scrollTo(0, top,0.7,cpr.animation.TimingFunction.EASE_IN_OUT);
			app.getContainer().style.animateTo({}, 0.7, cpr.animation.TimingFunction.EASE_IN_OUT)
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
	document.body.style.overflowY = "hidden";
	
	var q = app.getContainer().uuid;
	console.log(q);
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
//	console.log(this);
//	if(e.maxScrollTop < e.scrollTop+5 || e.scrollTop == 0) {
//		console.log("허거거걱");
//		console.log(e);
//		scrollTarget = null;
//	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	app.getContainer().getAllRecursiveChildren().forEach(function(each){
		
		each.htmlAttr("temp-id",each.uuid);
		
	});
	var q= document.querySelectorAll(".cl-container")
	console.log(q);
	for(var div of q) {
		console.log(div);
		div.addEventListener("wheel",qwe.bind(div),false)
	}
//	
//	app.lookup("g1").addEventListener("wheel", function(e){
//		console.log("와");
//	});
	function qwe(ev){
//		ev.stopPropagation();
//		console.log(ev);
//		console.log(this);
		/** @type cpr.controls.Container */
		var q= app.lookupByUUID(this.getAttribute("data-usr-temp-id"));
		if(!q){
			return;
		}
//		console.log(q);
		
		if(q.getActualRect().height < q.getContentPaneRect().height) {
			ev.stopPropagation();	
		}
	}
}

/*
 * 그룹에서 scroll 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGroupScroll3(e){
	var group = e.control;
	console.log("스크럴");
}
