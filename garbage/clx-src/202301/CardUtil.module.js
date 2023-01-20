 /************************************************************************
  * CardUtil.module.js
  * @프로그램설명 : 
  *
  * @작성일시 :   2022. 11. 30.
  * @작성자 박선영
  *
  * @수정이력 : 
  *
  ************************************************************************/
 var CardUtil = {
 	
 	openedWindows: [],
 	/**
 	 * 빌더로 작성된 화면을 새 윈도우 팝업으로 호출하는 함수입니다.<br>
 	 * 화면을 그리는 데 필요한 리소스를 호출하고 파라미터의 앱아이디를 통해 특정 화면을 여는 html을 윈도우 팝업으로 호출합니다.
 	 * @param {#app} psAppId 앱아이디
 	 * @param {{width:Number,heigth:Number,left:Number,top:Number,title:String,resizable:"yes"|"no"}} poOption?
 	 * @param {JSON} poInitValue?
 	 */
 	openWindow: function(psAppId /* string */ , poOption /* Json */ , poInitValue /* Json */ ) {
 		var voPopup = null;
 		
 		//json데이터가 없을 경우
 		if (poOption == null) {
 			poOption = {};
 		}
 		
 		var vnWidth = ValueUtil.fixNull(poOption.width);
 		var vnHeight = ValueUtil.fixNull(poOption.height);
 		var vnLeft = ValueUtil.fixNull(poOption.left) == "" ? 0 : poOption.left;
 		var vnTop = ValueUtil.fixNull(poOption.top) == "" ? 0 : poOption.top;
 		var vsTitle = ValueUtil.fixNull(poOption.title) == "" ? "Sub Popup" : poOption.title;
 		var vsResizable = ValueUtil.fixNull(poOption.resizable) == "" ? "yes" : poOption.resizable;
 		var vnScreenNo = ValueUtil.fixNull(poOption.screenNo) == "" ? 0 : poOption.screenNo;
 		var vnScreenNo = ValueUtil.fixNull(poOption.screenNo) == "" ? 0 : poOption.screenNo;
 		var vbIsMinimumSize = ValueUtil.fixNull(poOption.isMinimumSize) == "" ? false : poOption.isMinimumSize;
 		
 		var vsName = "_blank";
 		
 		if (vnWidth == "" && vnHeight == "") {
 			vnWidth = 400;
 			vnHeight = 800;
 		} 
 		
 		
 		var vnOpenWidth = vnWidth == "auto" ? screen.width : vnWidth;
 		var vnOpenHeight = vnHeight == "auto" ? screen.height : vnHeight;
 		var vnOpenTop = vnTop == "center" ? (screen.height - vnOpenHeight) / 2 : vnTop;
 		var vnLeft = vnLeft == "" ? (screen.width - vnWidth)  : vnLeft;
 		var option = "width=" + vnOpenWidth + ", height=" + vnOpenHeight + ", left=" + vnLeft + ", top=" + vnOpenTop + ", resizable=" + vsResizable +
 			", titlebar=no, menubar=no, status=no";
 		
 		var vjInitValue = "";
 		if (poInitValue) {
 			vjInitValue = JSON.stringify(poInitValue);
 		}
 		
 		voPopup = window.open("app/common/main/CmnWindowPop.html?appId=" + psAppId + "&width=" + vnWidth + "&height=" + vnHeight + "&left=" + vnLeft + "&top=" + vnTop + "&appTitle=" + encodeURI(vsTitle) + "&resizable=" + vsResizable + "&popInitValue=" + encodeURI(vjInitValue) + "&isPopup=true", vsName, option);
 		this.openedWindows.push(voPopup);
 		
 		return voPopup;
 	},
 	
 	/**
 	 * GET방식으로 전달받은 윈도우 파라미터를 객체 형태로 반환한다.
 	 * @return {Object}
 	 */
 	getWindowParameter: function() {
 		var voWindowPopParam;
 		
 		var vsSearch = window.location.search; // URL 파라미터 "?" 이후 문자열 반환 (query string)
 		var vsHash = window.location.hash; // URL 파라미터 "#" 이후 문자열 반환
 		
 		if (vsSearch) {
 			voWindowPopParam = {};
 			
 			var vsURI = decodeURI(vsSearch);
 			vsURI = vsURI.slice(1, vsURI.length);
 			
 			var vaParam = vsURI.split("&");
 			
 			for (var i = 0; i < vaParam.length; i++) {
 				var vaData = vaParam[i].split("=");
 				var vsParamKey = vaData[0];
 				var vsParamValue = vaData[1];
 				
 				if (vsParamKey == "popInitValue") {
 					voWindowPopParam[vsParamKey] = vsParamValue ? JSON.parse(vsParamValue) : null;
 				} else {
 					if (vsParamValue.toLowerCase().trim() == "true" || vsParamValue.toLowerCase().trim() == "false") {
 						vsParamValue = ValueUtil.fixBoolean(vsParamValue);
 					}
 					
 					voWindowPopParam[vsParamKey] = vsParamValue;
 				}
 			}
 			
 			if (vsHash) {
 				vsHash = vsHash.substr(1);
 				
 				if (vsHash) {
 					voWindowPopParam["appId"] = voWindowPopParam["appId"] + "?" + vsHash;
 					voWindowPopParam["appTitle"] = voWindowPopParam["appTitle"] ? voWindowPopParam["appTitle"] : document.title;
 				}
 			}
 		}
 		return voWindowPopParam;
 	},
 	postMessage: function(pfName, poParam, psAppId) {
 		cpr.core.NotificationCenter.INSTANCE.post(pfName, poParam, psAppId);
 		
 		var voJson ; 
 		
 		for(var i = 0; i < this.openedWindows.length; i++){
// 			this.openedWindows[i].CardUtil.postMessage(pfName, poParam, psAppId); 	
			// cross-orign 처리를 위한 postmessage 처리 
			voJson = {
				"fnName" : pfName,
				"param"  : poParam,
				"appId"  : psAppId
			}
			this.openedWindows[i].postMessage(voJson , "*");

 		}
 	}
 	, subscribeMessage : function (pfName, app , pfCallback) {
		cpr.core.NotificationCenter.INSTANCE.subscribe(pfName, app, pfCallback);
 	},
 	/**
 	 * 앱아이디를 통해 페이지를 엽니다. 이미 해당 화면이 열려있는 경우, 해당 화면이 보일때까지 스크롤합니다.
 	 * @param {cpr.core.AppInstance} poApp 화면의 앱 인스턴스(app변수)
 	 * @param {#app} psAppId 열리는 앱아이디
 	 * @param {"next"|"prev"|"first"|"last"} psPosition? (Optional)열리는 페이지의 포지션, 기본값으로 가장 뒤에 배치됩니다.
 	 * @param {Object} poInitParam? (Optional)열리는 앱에 전달할 파라미터
 	 * @param {Object} poOptions? (Optional)열리는 카드에 대한 옵션 파라미터(옵션 미정)
 	 */
 	openApp : function(poApp,psAppId,psPosition,poInitParam,poOptions) {
 		/** @type cpr.core.AppInstance */
 		var voApp = this._mainApp;
 		var vsPosition = psPosition;
 		var vsAppId = null;
 		if(poApp instanceof cpr.core.AppInstance) {
 			vsAppId = poApp.app.id;
 		}
 		if(ValueUtil.fixNull(vsPosition) == "") {
 			vsPosition = "last";
 		}
 		if(voApp.hasAppMethod("openAppWithAppId")) {
 			voApp.callAppMethod("openAppWithAppId", vsAppId,psAppId,vsPosition,poInitParam,poOptions);
 		}
 	},
 	/**
 	 * 
 	 * @param {cpr.core.AppInstance} app
 	 * @param {#app} psAppId
 	 */
 	scrollToApp : function(app,psAppId) {
 		/** @type cpr.core.AppInstance */
 		var voMainApp = this._mainApp;
 		if(voMainApp.hasAppMethod("scrollWithAppId")) {
 			voMainApp.callAppMethod("scrollWithAppId", psAppId);
 		}
 	},
 	/**
 	 * 현재 열려있는 카드의 화면을 파라미터로 받은 앱아이디로 부른 화면으로 대체합니다.
 	 * [다음] 버튼을 눌러서 다른 페이지로 전환하는 동작을 해야할 떄 사용하며, 이 함수를 호출하여 다음 페이지로 넘어가면
 	 * 이전 페이지가 닫히므로 이전 페이지 상태로 되돌아가는 동작등은 수행할 수 없습니다.
 	 * @param {cpr.core.AppInstance} poApp 화면의 앱 인스턴스(app변수)
 	 * @param {#app} psAppId 열리는 앱아이디
 	 * @param {Object} poInitParam? (Optional)열리는 앱에 전달할 파라미터
 	 */
 	changePage : function(poApp,psAppId,poInitParam) {
 		var voApp = poApp;
 		if(voApp.getHost()) {
 			var voHostAppIns = voApp.getHostAppInstance();
 			if(voHostAppIns.app.id == AppProperties.CARD_APP_ID && voHostAppIns.hasAppMethod("changeApp")) {
 				voHostAppIns.callAppMethod("changeApp", psAppId,poInitParam);
 			}
 		}
 		
 	}
 }
 
 globals.CardUtil = CardUtil;