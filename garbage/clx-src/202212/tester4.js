/************************************************
 * tester4.js
 * Created at 2022. 12. 29. 오후 4:50:19.
 *
 * @author HANS
 ************************************************/
var vnItemSize = 30;


/**
 * 마우스 포인터가 위치한 곳 밑에 있는 모든 요소를 가져오는 함수입니다.
 * @param {Number} x
 * @param {Number} y
 * @return {HTMLElement}
 */
function elementsFromPoint(x, y) {
	if (document["msElementsFromPoint"]) {
		var nodeList = document["msElementsFromPoint"](x, y);
		if (!nodeList) {
			return [];
		} else {
			return Array.prototype.slice.call(nodeList);
		}
	} else {
		return (document["elementsFromPoint"](x, y) || []);
	}
}

/*
 * 내비게이션 바에서 item-mouseover 이벤트 발생 시 호출.
 * 아이템에 마우스오버 했을때 발생하는 이벤트.
 */
function onNavigationBarItemMouseover(e){
	var navigationBar = e.control;
//	if(e.item.depth == 1) {
////		debugger;
//	/** @type HTMLElement[] */
//		var elements = elementsFromPoint(e.clientX, e.clientY);
//		
//		var folderItem = elements.find(function(ele){
//			return ele.classList.contains("cl-navigationbar-listitem")
//		});
//		var parent = folderItem.parentNode.childNodes;
//		var children = [];
//		for(var i = 0 ; i <parent.length ; i++) {
//			if(parent.item(i).classList.contains("cl-navigationbar-listitem")) {
//				children.push(parent.item(i));
//			}
//		}
//		
//		if(folderItem.classList.contains("cl-folder")) {
//				var vnIndex = children.indexOf(folderItem);
//			console.log("헤이");
//			folderItem.classList.add("cl-sub-test"+vnIndex);
//				console.log(folderItem);
//				cpr.core.DeferredUpdateManager.INSTANCE.update();
////			debugger;
////			setTimeout(function(){
////				
////				console.log(vnIndex);
////				var subItems = folderItem.querySelector(".cl-sub");
////				console.log(subItems);
////			subItems.style.top = "-"+vnIndex*vnItemSize+"px";
////			}, 10);
//		}
//		
//	}
}




/*
 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNavigationBarItemClick(e){
	var navigationBar = e.control;
//	debugger;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
//	var evt=  new cpr.events.CAppEvent("evt1");
//	app.dispatchEvent(evt);
}
