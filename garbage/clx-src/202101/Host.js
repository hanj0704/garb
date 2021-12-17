/************************************************
 * dialog.js
 * Created at 2020. 4. 17. 오후 4:09:51.
 *
 * @author daye
 ************************************************/

/*
 * "eXbuilder6 API" 버튼(btnDefault)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDefaultClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDefault = e.control;btnDefault
	app.lookup("txa1").text = "";
	
	/*
	 * 다이얼로그는 현재 앱 또는 최상위 앱에서 띄울 수 있습니다.
	 * dialogManager는 다이얼로그를 관리하는 클래스로, 다이얼로그 관련 속성을 설정 할 수 있습니다.
	 * openDialog(appId, dialogName, dialogConstraint, handler)
	 */
	var voRootAppIns = app.getRootAppInstance();
	//project Explorer에서 다이얼로그로 열고자 하는 화면 clx 파일에서 우클릭을 하면 AppID를 복사할 수 있습니다. 이를 openDialog팝업의 첫번쨰 파라미터로 넣는것도 좋은 방법이 될 수 있습니다.
	voRootAppIns.dialogManager.openDialog("201909/dynamicGrid", "dialogSample", {width:1000, height:700}, function(dialog){
		// 다이얼로그가 로드 되었을때 처리
		
		/*
		 * 1. initValue 설정
		 * initValue는 String 또는 JSON(key:value)형식으로 작성하십시오.
		 */
		dialog.initValue = {
			search : "Default API searchValue",
			data : app.lookup("dsHost")
		}
		
		// 2. dialog 속성 설정
		dialog.headerClose = true; // 닫기버튼 활성화 여부
		dialog.headerMax = true; // 최대화버튼 활성화 여부
		dialog.headerMin = true; // 최소화버튼 활성화 여부
		dialog.headerMovable = true; // 다이얼로그 이동여부
		dialog.headerVisible = true; // 헤더표시 여부
		dialog.headerTitle = "headerTitle"; // 헤더타이틀 미지정 시, 앱타이틀로 설정됩니다.
		dialog.modal = true; // 모달여부
		
		// 3. dialog 이벤트 설정
//		dialog.addEventListener("", function(e){});
//		dialog.addEventListener("close", function(e){
//			var dialog = e.control;
//
//			// returnValue를 close이벤트에서도 처리 할 수 있습니다.
//			var returnValue = dialog.returnValue;
//			
//			// 자식 앱인스턴스에 접근
//			var voEmbIns = dialog.getEmbeddedAppInstance();
//			var voAllChildren = voEmbIns.getContainer().getAllRecursiveChildren();
//			var voDataCmp = voEmbIns.getAllDataControls();
//			
//			// TODO 부모창에서 팝업창의 앱인스턴스에 포함된 컨트롤을 가지고 운용 할 수 있습니다.
//		});
	}).then(function(returnValue){
		/*
		 * 닫기 했을때 반환되는 값에 대한 처리
		 * returnValue속성에 바인딩된 값이 있을 경우에만 실행합니다.
		 * returnValue가 단일값일 경우 그대로 사용할 수 있으며, JSON데이터일 경우 key값을 통해 value를 받을 수 있습니다.
		 */
		app.lookup("txa1").text = JSON.stringify(returnValue);
		
		/** @type cpr.data.DataMap */		
		var voDm = returnValue["dm"];
		var voGrdSelection = returnValue["grid"];
	});
}
