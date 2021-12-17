///************************************************
// * isHan.module.js
// * Created at 2020. 1. 31. 오전 11:02:38.
// *
// * @author HANS
// ************************************************/
//
//
///**
// * svg요소의 line요소를 사용해서 대각선을 HTMLSnippe에 집어넣고 리턴하는 메서드입니다.
// * @param {Number} x 전체 요소의 가로크기
// * @param {Number} y 전체 요소의 세로크기
// */
//function _createSlash(x,y) {
//	var snippet = new cpr.controls.HTMLSnippet();
//	snippet.style.addClass("slash");
//	snippet.value ='<svg height="'+y+'" width="'+x+'">'
//	 + '<line x1="0" y1="0" x2="'+x+'" y2="'+y+'" style="stroke:rgb(255,0,0);stroke-width:1"/>'
//	  + '</svg>';
//	  
//	  return snippet;
//}
//
//
//function _createReverseSlash(x,y) {
//	
//	var snippet = new cpr.controls.HTMLSnippet();
//	snippet.style.addClass("slash");
//	snippet.value ='<svg height="'+y+'" width="'+x+'">'
//	 + '<line x1="'+x+'" y1="0" x2="0" y2="'+y+'" style="stroke:rgb(255,0,0);stroke-width:1"/>'
//	  + '</svg>';
//	  
//	  return snippet;
//}
///**
// * HTMLSnippet 객체를 추가하여 아이템 간의 slash를 붙여주는 메서드입니다.
// * @param {cpr.core.AppInstance} _app
// * @param {cpr.controls.UIControl} pcCtrl1
// * @param {cpr.controls.UIControl} pcCtrl2
// */
//function drawSlash (_app, pcCtrl1,pcCtrl2){
//	/** @type cpr.controls.Container */
//	var vcGrpCn = _app.getAppProperty("atten"); // 컨텐츠 내부 컨테이너 객체
//	
//	var voGrpCnRect = vcGrpCn.getActualRect(); // 컨텐츠 내부 컨테이너 크기
//	var voCtrl1Rect = pcCtrl1.getActualRect(); // 컨트롤1의 크기
//	var voCtrl2Rect = pcCtrl2.getActualRect(); // 컨트롤2의 크기
//	
//	var vnWidth = voCtrl2Rect.topCenter.x - voCtrl1Rect.bottomCenter.x; // 너비
//	var vnHeight = voCtrl2Rect.topCenter.y - voCtrl1Rect.bottomCenter.y; // 높이
//	
//	var x = 0; // x 좌표
//	var y = 0; // y 좌표
//	
//	var vcOpt;
//	/* 차트의 위치에 의해 과거일 때는 선을 긋지 않도록 방지 */
//	if (vnWidth < 0 || vnHeight < 0){
//		vnWidth = Math.abs(vnWidth);
//		vcOpt = _createReverseSlash(vnWidth, vnHeight);
//		x = voCtrl2Rect.topCenter.x; // x 좌표 계산
//	}
//	else {
//		x = voCtrl1Rect.bottomCenter.x - voGrpCnRect.left; // x 좌표 계산
//		vcOpt = _createSlash(vnWidth, vnHeight);
//	}
//	
//	/* 선 동적 생성 */
////	var vcOpt = _createSlash(vnWidth,vnHeight);
//	
//	
//	y = voCtrl1Rect.bottomCenter.y - voGrpCnRect.top; // y 좌표 계산
//	
//	/* 컨텐츠 내부 영역에 선을 띄움 */
//	vcGrpCn.floatControl(vcOpt, {
//		"width" : vnWidth+"px",
//		"height" : vnHeight+"px",
//		"left" : x +"px",
//		"top" : y +"px"
//	});
//}
//
////globals.toDegrees = function(paramDouble){
////	return 180/Math.PI * paramDouble;
////}
//
//
/////**
//// * 모든 스크롤 감지 후 경우에 따라 특정 스크립트 동작 정의 
//// * @param {Event} e
//// */
////cpr.events.EventBus.INSTANCE.addFilter("scroll", function(e){
////	/** @type cpr.controls.UIControl */
////	var control = e.control;
////	
////	var voApp = control.getAppInstance();
////	
////	voApp.removeAllFloatingControls(true);
////	
////	var vaAllChildren = voApp.getContainer().getAllRecursiveChildren();
////	vaAllChildren.filter(function(each){
////		return each.style.hasClass("slash");
////	}).forEach(function(each){
////		voApp.lookup("grpCutCn").removeChild(each);
////	});
////});
//
//
///* 마우스 오버 시 선 긋기 */
//cpr.events.EventBus.INSTANCE.addFilter("mouseenter", function(e){
//	
///** @type cpr.controls.UIControl */
//	var control = e.control;
//	
//	/* 전로, 정련, 연주 또는 차트에만 선이 그어져야 하므로 해당 컨트롤 필터 */
//	if(control instanceof cpr.controls.Output || control instanceof cpr.controls.HTMLSnippet || control instanceof cpr.controls.Button) {
//		var voApp = control.getAppInstance();
//		var vaAllChildren = voApp.getContainer().getAllRecursiveChildren();
//		
//		/* 같은 작업 순서 아이템을 필터 */
//		var vaFilteredCtrl = vaAllChildren.filter(function(each){
//				if(each.userAttr("cast-no") != "" && each.userAttr("cast-no") == control.userAttr("cast-no")) {
//					/* 마우스가 아이템을 벗어날 때 선 삭제 */
//					each.addEventListenerOnce("mouseleave", function(e){
//						voApp.getContainer().getAllRecursiveChildren().forEach(function(each){
//							if(each.style.hasClass("slash")) {
//								voApp.getAppProperty("atten").removeChild(each);
//							}
//						});
//					});
//					return each;
//				}
//		});
//		
//		/* 일부 데이터에 한하여 선이 그어질 수 없으므로 자식요소가 1개 이상일 때만 선 긋기 */
//		if(vaFilteredCtrl.length > 0) {
//			/* 위치에 따라 컨트롤 정렬 */
//			vaFilteredCtrl.sort(function(a,b) {
//				
//				return a.getActualRect().top - b.getActualRect().top ;
//			});
//			
//			/* 컨트롤과 다음 컨트롤을 인자로  */
//			for(var idx = 0 ; idx+1 < vaFilteredCtrl.length ; idx ++) {
//				drawSlash(voApp, vaFilteredCtrl[idx], vaFilteredCtrl[idx+1]);
//			}
//		}
//	}
//});