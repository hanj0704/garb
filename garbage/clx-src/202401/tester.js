/************************************************
 * tester.js
 * Created at 2024. 1. 5. 오후 5:11:29.
 *
 * @author HANS
 ************************************************/

function thisMan() {
	this.q = function(){
		console.log("hello");
	};
	this.w = 2;
}

function protoMan() {
	
}
protoMan.prototype.q=  function(){
		console.log("hello");
	};
protoMan.prototype.w = 2;



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	let this1 = new thisMan();
	let this2 = new thisMan();
	
	console.log(this1.q == this2.q);
	let proto1 = new protoMan();
	let proto2 = new protoMan();
	console.log(proto1.q == proto2.q);
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	console.log(Object.getOwnPropertyDescriptors(btn2));
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	console.log(app.lookup("grp1").getLayout().getColumnDivisions());
	console.log(app.lookup("grp1").getLayout().getColumns());
	console.log(app.lookup("grp1").getLayout().constructor);
}

/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrp1Click(e){
	var grp1 = e.control;
//	console.log(e);
}

/*
 * 그룹에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onGrp1Contextmenu(e){
	var grp1 = e.control;
//	console.log(e);
}

/*
 * 그룹에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onGrp1MeasureSize(e){
	var grp1 = e.control;
//	console.log("힝힝");
	
//	cpr.controls.layouts.FormLayout.prototype.res
}
let isJustClick = false;
let start = null;
let ob = new MutationObserver(function(ev){
	console.log(ev);
	/** @type HTMLElement[] */
	let target = ev[0].addedNodes;
	
	if(target.length > 0 && target[0].classList.contains("resize-overlay")) {
		console.log("와하하");
		console.time("qq");
		start = moment().valueOf();
		isJustClick = true;
	} else {
		console.timeEnd("qq");
		console.log(moment().valueOf()-start);
		if(moment().valueOf() - start < 100) {
			var div = document.createElement("div");
			div.style = "bottom:0px;cursor:ew-resize;left:-2.5px;position:absolute;top:0px;width:6px;z-index:2;"; 
			div.addEventListener("mousedown", function(ev){
				console.log(ev);
				/** @type HTMLElement */
				var target = ev.currentTarget;
				target.parentNode.removeChild(target);
		//		target.style.zIndex = 1;
		//		console.log(ev.currentTarget);
			}
			,{useCapture : true}
			);
		}
		
	}
})

ob.observe(document.body,{
	childList : true
})
/*
 * 그룹에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onGrp1Dblclick(e){
	var grp1 = e.control;
	console.log(e);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	var vcAco = app.lookup("ac1");
	
//	var sec = vcAco.getSection(0);
	var sec = vcAco.getSectionItems()[0];
	console.log(sec);
	
	Object.defineProperty(sec, "selected", {
		value: true,
		writable: false,
		configurable: false
	});
	console.log(sec);
//	var div = document.createElement("div");
//	div.style = "bottom:0px;cursor:ew-resize;left:-2.5px;position:absolute;top:0px;width:6px;z-index:2;"; 
//	div.addEventListener("mousedown", function(ev){
//		console.log(ev);
//		/** @type HTMLElement */
//		var target = ev.currentTarget;
//		target.parentNode.removeChild(target);
////		target.style.zIndex = 1;
////		console.log(ev.currentTarget);
//	}
//	,{useCapture : true}
//	);
//	document.getElementsByClassName("cl-formlayout-vertical-separator").item(0).appendChild(div);
//	app.lookup(id)
//	ob.observe(document.getElementsByClassName("cl-formlayout-vertical-separator").item(0),{
//    attributes: true,
//    attributeOldValue: true,
////    attributeFilter : ["cl-activated"]
//})
}

/*
 * 아코디언에서 before-selection-change 이벤트 발생 시 호출.
 * SectionItem이 변경되기 전 이벤트.
 */
function onAc1BeforeSelectionChange(e){
	var ac1 = e.control;
	var vaSections = ac1.getSectionItems();
	var vaDefaults = vaSections.filter(function(each){
		return each.userAttr("cl-readonly") == "Y";
	}).map(function(each){
		return each.content.uuid;
	});;
	if(vaDefaults.length > 0) {
		/** @type cpr.controls.SectionItem[] */
		var vaNewSelection = e.newSelection;
		if(vaNewSelection.length > 0){
			var results = vaNewSelection.map(function(each){
				return each.content.uuid;
			});
			vaDefaults.every(function(each){
				if(results.indexOf(each) != -1) {
					return true;
				} else {
					e.preventDefault();
				}
				
			});
		} else {
			
			e.preventDefault();
		}
	} 
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	console.log("ㅋ");
}
