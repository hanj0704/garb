/************************************************
 * T0002.js
 * Created at 2023. 6. 23. 오전 9:22:29.
 *
 * @author ryu
 ************************************************/

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var voApp = new cpr.core.App("__T0002", {
		onCreate: function(app, exports){
			var button = new cpr.controls.Button();
			button.value = "닫기";
			button.addEventListener("click", function(e){
				app.getHost()._cancel = "button";
				app.close();
			});
			
			app.getContainer().addChild(button, {
				top: "20px",
				left: "20px",
				width: "100px",
				height: "30px"
			});
		}
	});
	
	app.getRootAppInstance().openDialog(voApp, {width: 600, height: 400}, function(dialog){
		dialog.addEventListener("close", function(e){
			if (e.targetControl._cancel == "button"){
				alert("버튼이 눌렸다.");
			}
		});
	});	
}
