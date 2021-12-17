/************************************************
 * Untitled.js
 * Created at 2020. 12. 28. 오전 9:39:54.
 *
 * @author HANS
 ************************************************/

exports.hey = function(){
	return "HHELLLO";
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	/** @type cpr.core.App */
		var vcPopupApp = createPopUpApp();
		
		if (vcPopupApp) {
			app.dialogManager.openDialog(vcPopupApp.id, "", {width:480 ,height:255}, function(dialog){
				//2020-12-23 추가 언어코드별 유의사항 헤더타이틀 수정
				try{
					var vsLangGb = "KOR";
					
					if(vsLangGb) {
						if(vsLangGb == "ENG"){
							dialog.headerTitle = "Page Description";
						} else {
							dialog.headerTitle = "화면상세설명";
						}
					} else {
						throw new Error("파라미터 language_gb를 찾을 수 없습니다");
					}
				} catch(err){console.log(err)}
				
			});
			
		}
}
/**
 * 팝업을 만들어줍니다.
 * @return {cpr.core.App} vcPopup
 */
function createPopUpApp() {
	
	var vcPopup = new cpr.core.App("appID", {
		
		onPrepare: function(loader) {},
		
		onCreate: function( /* cpr.core.AppInstance */ app, exports) {
			var container = app.getContainer();
					
			container.style.css({
				"width": "100%",
				"top": "0px",
				"height": "100%",
				"left": "0px"
			});
			
//			var xYLayout = new cpr.controls.layouts.XYLayout();
//			container.setLayout(xYLayout);
			var verticalL = new cpr.controls.layouts.VerticalLayout();;
			verticalL.leftMargin = 15;
			verticalL.rightMargin = 15;
			container.setLayout(verticalL);
			
			
			var hTMLSnippet = new cpr.controls.HTMLSnippet("hspt1");
			
//			hTMLSnippet.style.addClass(msNoticePopup);
			hTMLSnippet.style.css("font-size", "11px");
			container.addChild(hTMLSnippet, {
				"width":"300px",
				"height":"300px",
				"autoSize":"both"
			});
			
			
			app.addEventListener("load", function() {
//				var vsNoticeValue = app.getHost().initValue["NoticeValue"];
//				var vsReplaceBefore = vsNoticeValue.toString();
//				var vsReplacedStr = "";
//					vsReplacedStr = vsReplaceBefore.replace(/(\r\n|\n\r|\r|\n)/g,"<br>")
//					vsReplacedStr = vsReplacedStr.replaceAll(" ", "&nbsp;");
				var vcHspt = app.lookup("hspt1");
				
				vcHspt.value = "* 증시자금은 1998.6.18부터 조회 가능합니다.<br>* 장내파생상품거래예수금은 선물회사분이 제외된 증권회사의 수치입니다.<br>* 실제반대매매금액은 전일자 미수금에 대한 증권회사 실제 반대매매금액<br>&nbsp;&nbsp;(2006.4.14 이후)입니다.<br>* 본 정보는 투자 참고자료이며 오류와 지연이 발생할 수 있습니다.<br>* 제공된 정보에 의한 투자판단의 최종책임은 정보 이용자에게 있으며 본회에서는 <br>&nbsp;&nbsp;법적인 책임을 지지 않습니다.<br>* 관련부서 및 연락처 : 증권지원부 (Tel. 2003-9104, 9106, 9113)";
				//vcHspt.value = "<div class= \"NoticePop\" >" + vsNoticeValue + " </div>";
			});
		}
	});
	cpr.core.Platform.INSTANCE.register(vcPopup);
	vcPopup.createNewInstance();
	
	return vcPopup;
}