/************************************************
 * yeah.js
 * Created at 2023. 5. 15. 오후 2:30:48.
 *
 * @author HANS
 ************************************************/

/*
 * "클릭" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var han = new cpr.animation.Animator(0.7,cpr.animation.TimingFunction.EASE_IN);
	han.addTask(function(time){
		var remains = 500 - (400*time);
		app.getContainer().getLayout().setColumns([remains+"px","15px","1fr"]);
	});
	
	han.run();
}