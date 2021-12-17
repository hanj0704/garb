
var copyKit = createCopyKit();
/*
 * 루트 컨테이너에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(/* cpr.events.CKeyboardEvent */ e){
	
	if(e.altKey && e.keyCode == cpr.events.KeyCode.V) {
		
		var coffee = copyKit.copyPage(app);
	}
}


/*
 * "상세검색" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("tf1").getAllRecursiveChildren().forEach(function(each){
		
		if(each instanceof cpr.controls.Container) {
			app.getContainer().addChild(each, {
				"width" : "400px",
				"height" : "300px",
				"autoSize":"none"
			});
		}
	});
	app.lookup("tf1").dispose();
}
