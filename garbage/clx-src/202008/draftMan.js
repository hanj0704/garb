/************************************************
 * draftMan.js
 * Created at 2020. 7. 30. 오후 5:45:52.
 *
 * @author han
 ************************************************/
var util = createCommonUtil();

var copyKit = createCopyKit();
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	
	/** @type {pageParam:String,copyData:Object} */
	var voHostProp = app.getHostProperty("initValue");
	var voPasteData = voHostProp["copyData"];
	
	var vcEmbApp = app.lookup("ea1");
	
	cpr.core.App.load(voHostProp["pageParam"], function(loadedApp) {//파라미터로 불러온 pageParam을 통해 해당 이름을 가진 앱을 로드합니다.
		
		vcEmbApp.app = loadedApp;//로드된 앱을 임베디드앱 컨트롤의 앱으로 지정하면 임베디드앱에서 해당 앱이 실행됩니다.
		
		vcEmbApp.addEventListener("app-ready", function(e) {//임베디드 앱의 이벤트중 app-ready이벤트에 리스너를 추가하여 앱의 load이벤트 이전의 작업을 수행합니다.
			
			var voNewAppIns = vcEmbApp.getEmbeddedAppInstance();//임베디드 앱에서 불러낸 loadedApp의 앱 인스턴스를 가져옵니다.
			voNewAppIns.removeAllEventListeners();//임베디드앱에서 보여지는 앱은 단순 데이터를 확인하는 용도이기 때문에 모든 이벤트리스너를 제거하여 동작하지 않게 만듭니다.

			voNewAppIns.getContainer().getAllRecursiveChildren().forEach(function(each) {
				each.removeAllEventListeners();//앱 내에 포함된 컨트롤들의 이벤트 리스너도 전부 제거합니다.
			});
			
			voNewAppIns.addEventListenerOnce("load", function(ev) {//앱의 모든 이벤트리스너를 제거하고, load되었을 때 복사한 데이터를 붙여넣기 하기 위해 새 이벤트리스너를 하나 추가합니다.
				
				voPasteData.dataComponent.forEach(function(each) {//데이터 컴포넌트들은 build하여 데이터셋, 맵과 연결된 컨트롤들에 행들을 추가시켜줍니다.
					
					var dataComponent = voNewAppIns.lookup(each.id);
					dataComponent.build(each.value);
				});
				
				voPasteData.control.forEach(function(each) {//복사된 화면에서 가져온 각 컨트롤들의 value를 putValue를 통해 값을 집어넣습니다.
					
					var iterCtrls = voNewAppIns.lookup(each.id);
					if(each.isBinded) {//값을 복사하는 모듈에서 컨트롤에 상대컬럼 바인딩이 되어있을 경우 isBinded attribute에 저장하게끔 작성되어있습니다.
						iterCtrls.unbind("value");//상대컬럼 바인딩이 되어있으면, 정상적으로 데이터가 보이지 않을 수 있으므로 바인딩을 지우고 값을 집어넣게끔 합니다. 이후 변경될 여지가 있습니다.
					}
					iterCtrls.putValue(each.value);
				});
				//로드된 앱 내에 udc나 임베디드 앱이 있을 경우 내부에 있는 값들도 표현하기 위한 embedded attribute
				voPasteData.embedded.forEach(function(embeds){
					
					var vbIsEmbLoaded = voNewAppIns.lookup(embeds.id).getEmbeddedAppInstance();
					if(vbIsEmbLoaded) {
						//임베디드앱의 경우 getEmbeddedAppInstance()를 호출할 경우 아직 로드되지 않아 null,undefined될 경우가 있어서 작성된 if문
					copyKit.copyCat3(vbIsEmbLoaded, embeds.value);//udc인 경우에는 바로 데이터를 삽입하는 함수를 호출합니다.
					} else {
						//embeds가 udc가 아닌 임베디드앱인 경우에는 앱이 준비되면 그때 데이터를 삽입하는 함수를 호출하도록 합니다.
						/** @type cpr.controls.EmbeddedApp */
						var vcEmbeddedApp = voNewAppIns.lookup(embeds.id);
						vcEmbeddedApp.addEventListener("app-ready", function(e){
						var voEmbAppIns = vcEmbeddedApp.getEmbeddedAppInstance();
						
						voEmbAppIns.addEventListener("load", function(eqe){
							copyKit.copyCat3(eqe.control, embeds.value);
						});
							
						});
					}
				});
				
				voNewAppIns.getContainer().readOnly = true; //readOnly를 true로 지정하여 갑을 변경할 수 없게 만들어줍니다.
				var voDialogManager = app.getRootAppInstance().dialogManager;//다이얼로그를 열 때 dialogManager로 열 경우 이렇게 자신을 호출한 부모에서 dialogManager에 접근할 수 있습니다.
				var voDialogRect = voDialogManager.getConstraintByName(app.app.id);
				var voContentRect = app.lookup("ea1").getEmbeddedAppInstance().getContainer().getContentPaneRect();
				//dialogRect에 calc가 적용되지 않아 임시적으로 작성된 변수입니다.
				var dia = voDialogManager.getDialogByName(app.app.id);
				
				dia.style.css({
					top : "calc(10%)",
					left: "calc(10%)",
					width:"calc(80%)",
					height : "calc(80%)",
					backgroundColor : "white"
				});
				
			});
			
			
		});
	});
	
}

/*
 * "취소" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	app.close();
}

/*
 * "결재" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.close();
}