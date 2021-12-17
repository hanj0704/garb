///************************************************
// * tester.js
// * Created at 2020. 2. 3. 오후 4:56:00.
// *
// * @author HANS
// ************************************************/
//
//var util = createCommonUtil();
//
//cpr.events.EventBus.INSTANCE.addFilter("before-selection-change", function(/* cpr.events.CSelectionEvent */e){
//	var controls = e.control;
//	
//	if(controls.userAttr("check-before")) {
//		
//		if(e.oldSelection.text == "newTester") {
//			console.log(e.oldSelection.content.getAppInstance());
//			
//			var aa = e.oldSelection.content.getAppInstance()
//			console.log(aa);
//				console.log(aa.lookup("grd1"));
///** @type cpr.controls.Grid */
//			var grd = aa.lookup("grd1");
//			
//			if(grd.getEditRowIndex()) {
//				e.preventDefault();
//				alert("경고");
//			}
//		}
//	
//	}
//	
//});
//
//
//var summerNote ="";	
//var rects = null;
//function _createSlash(x,y) {
//	var snippet = new cpr.controls.HTMLSnippet();
//	snippet.style.addClass("slash");
//	snippet.value ='<svg width="200" height="200">'
//	 + '<line x1="200" y1="0" x2="0" y2="200" style="stroke:rgb(255,0,0);stroke-width:1"/>'
//	  + '</svg>';
//	  
//	  return snippet;
//}
//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
//	
////	var a = _createSlash(100, 100);
////	
////	app.getContainer().addChild(a, {
////		"left" : "0px",
////		"top" : "0px",
////		"width" : "200px",
////		"height": "200px"
////	});
//	var a = moment().toDate();
//	console.log(a);
//	app.lookup("btn1").value = a;
//}
//
//
///*
// * Body에서 load 이벤트 발생 시 호출.
// * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
// */
//function onBodyLoad(/* cpr.events.CEvent */ e){
////	var container = app.lookup("grp1");
////	rects = container.getActualRect();
////	console.log(rects);
////	var event = new cpr.events.CUIEvent("container-resize");
//	
////	window.addEventListener("resize", function(e){
////	
////		if(container.getActualRect().width != rects.width) {
////			
////			rects = container.getActualRect();
//////			app.dispatchEvent(event); 
////		}
////	});
//	
//
////	var res = new cpr.events.resize.ResizeObserver(function(e){
////		console.log("lol");
////	});
////	var cont = app.getContainer();
////	console.log(cont.uuid);
////	res.observe(document.getElementById("uuid-"+cont.uuid));
//
//}
///*
// * 쉘에서 load 이벤트 발생 시 호출.
// */
//function onShl1Load(/* cpr.events.CUIEvent */ e){
//	/** 
//	 * @type cpr.controls.UIControlShell
//	 */
//	var shl1 = e.control;
//	summerNote = document.createElement("div");
//	summerNote.setAttribute("id", "summer");
//	e.content.appendChild(summerNote);
//
//	$(document).ready(function() {
//		$("#summer").summernote({
//			height: 400,
//			lang: "ko-KR"
//		});
//	});
//}
//
//
//
///*
// * "초기화" 버튼(btn2)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn2Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn2 = e.control;
////	app.lookup("cmb1").value = "value2";
////	app.lookup("cmb1").selectItemByValue();
////	app.lookup("cbx1").checked = true;
////	app.lookup("cbx1").value = app.lookup("cbx1").trueValue;
////	console.log(app.lookup("cbx1").value);
//	
//}
//
//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
//	
//	console.log(app.lookup("ds2").getValue(0, "column1"));
//}
//
//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click3(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
//	app.lookup("cbx1").checked = true;
//}
//
//
//
//
///*
// * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn2 = e.control;
//}
//
//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click4(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
//	
//}
//
//
//
//var a = "5";
//
///*
// * 임베디드 페이지에서 load 이벤트 발생 시 호출.
// * 페이지의 Load가 완료되었을 때 호출되는 Event.
// */
//function onEp1Load(/* cpr.events.CEvent */ e){
//	/** 
//	 * @type cpr.controls.EmbeddedPage
//	 */
//	var ep1 = e.control;
//
//	ep1.setPageProperty("_pageNm", "../Untitled");
//	ep1.callPageMethod("callPageTransition");
//}
//
//
///*
// * Body에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBodyClick(/* cpr.events.CMouseEvent */ e){
//	
//	var item = app.lookup("mdi3").getSelectedTabItem();
//	
///** @type cpr.controls.Grid */
//	var grid = item.content.getAppInstance().lookup("grd1");
//	
//	//업데이트 된 행이 있는지, 편집중인 행이 있는지
//	//util.validate(item.content.app, "grd1");
//	
////	if(util.validate(grid1)) {
////		comfirm("저장하지않은행이있습니다 저장할까요? " , "확이;ㄴ","취소");
////	} 
//}
//
//
///*
// * MDI 폴더에서 before-selection-change 이벤트 발생 시 호출.
// * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
// */
//function onMdi1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
//	/** 
//	 * @type cpr.controls.MDIFolder
//	 */
//	var mdi1 = e.control;
//}