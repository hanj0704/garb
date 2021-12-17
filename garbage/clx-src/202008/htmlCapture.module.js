/************************************************
 * htmlCapture.module.js
 * Created at 2020. 7. 24. 오후 4:30:45.
 *
 * @author daye
 ************************************************/

/*
 * 본 모듈은 MDI에 띄워진 임베디드앱을 캡쳐하는 모듈입니다.
 * MDI에 선택된 탭이 없을 경우에는 모듈에서 제공하는 기능을 확인 할 수 없습니다.
 * 
 * ※ 사용방법 ※
 * 아래의 작성된 단축키(ALT + A)를 누르면 새로운 창을 통해서 캡쳐된 화면을 확인 할 수 있으며, 본 모듈에서 단축키를 변경 하여 사용이 가능합니다.
 * 캡쳐 시 띄워지는 화면은 연결되어있는 web프로젝트의 WebContent 하위에 배치되어 있는 jsp 파일을 호출합니다.
 * jsp파일의 경로를 변경하고자 할 경우엔 작성된 actionUrl을 수정하십시오.
 * 
 * ※ 주의사항 ※
 * - 현재 선택된 임베디드앱을 캡쳐할 경우, 다이얼로그가 메인(root)에 띄워져있을 경우 캡쳐가 되지 않습니다.
 * - 캡쳐 영역은 전역변수 mbEmbCt가 true면 선택 된 임베디드 앱, false이면 메인(root)를 캡처합니다.
 */

var mbEmbCt = true;
window.addEventListener("keydown", function(e) {
	
	// TODO 단축키변경을 하기위해서 아래의 코드를 수정하십시오. (기본 : ALT+A)
	if(e.altKey && e.keyCode == cpr.events.KeyCode.A) {
		
		/* head innerHTML */
		var vsHead = "";
		var head = document.head.cloneNode(true);
		
		// base tag
		var baseTags = head.getElementsByTagName("base");
		var voBase = Object.keys(baseTags).map(function(idx) {
			return baseTags[idx];
		});
		voBase.forEach(function(each) {
			vsHead += each.outerHTML;
		})
		
		// meta tag
		var metaTags = head.getElementsByTagName("meta");
		var voMeta = Object.keys(metaTags).map(function(idx) {
			return metaTags[idx];
		});
		voMeta.forEach(function(each) {
			vsHead += each.outerHTML;
		})
		
		// link tag
		var linkTags = head.getElementsByTagName("link");
		var voLink = Object.keys(linkTags).map(function(idx) {
			return linkTags[idx];
		});
		voLink.forEach(function(each) {
			vsHead += each.outerHTML;
		})
		
//		var scriptTags = head.getElementsByTagName("script");
//		var voScr = Object.keys(scriptTags).map(function(idx){
//			return scriptTags[idx];
//		});
//		voScr.forEach(function(each){
//			vsHead += each.outerHTML;
//		})
//		console.log(scriptTags);
		
		/* body innerHTML */
		var vsBody; 
		if(mbEmbCt) {
			
			// 현재 MDI폴더에 열린 화면만 캡쳐 할 경우
			var vnSelectedIndex = document.querySelectorAll(".cl-selected.cl-tabfolder-item.cl-unselectable")[0].getAttribute("data-itemidx");
			var EmbClasses = document.querySelectorAll(".cl-control.cl-embeddedapp");
			var voEmb = Object.keys(EmbClasses).map(function(idx) {
				return EmbClasses[idx];
			});
			voEmb.forEach(function(each) {
				if(each.parentNode.id.indexOf("tb"+vnSelectedIndex) != -1) {
					vsBody = each.cloneNode(true);
				}
			});
		} else {
			
			// 메인의 전체 화면을 캡쳐 할 경우
			vsBody = document.body.cloneNode(true);
			vsBody.firstChild.style.position = "absolute";
		}
		
		/* input tag value setting */
		var inputTags = vsBody.getElementsByTagName("input");
		var voInput = Object.keys(inputTags).map(function(idx) {
			return inputTags[idx];
		});
		voInput.forEach(function (each) {
			each.setAttribute("value", each.value);
		});
		
		/* textarea tag value setting */
		var textAreaTags =vsBody.getElementsByTagName("textarea");
		var voTextarea = Object.keys(textAreaTags).map(function(idx) {
			return textAreaTags[idx];
		});
		voTextarea.forEach(function (each) {
			each.innerText = each.value;
		});
		
		/* create cover */
//		var cover = document.createElement("div");
//		cover.style.position = "absolute";
//		cover.style.top = "0";
//		cover.style.left = "0";
//		cover.style.width = "100%";
//		cover.style.height = "100%";
//		cover.style.zIndex = "100";
//		vsBody.firstChild.appendChild(cover);
		
		// 미리 생성한 JSP를 호출하여 head, body에 내용을 전달합니다.
		// TODO 호출 jsp파일의 경로가 변경되었을 경우 아래의 url을 수정하십시오.
		var post = new cpr.protocols.HttpPostMethod("202008/capture.jsp", "_blank");
		post.addParameter("head", vsHead);
		post.addParameter("body", vsBody.innerHTML);
		post.submit();
		post.dispose();
	}
});

