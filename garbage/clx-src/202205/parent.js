/************************************************
 * tester.js
 * Created at 2022. 5. 6. 오전 11:36:22.
 *
 * @author HANS
 ************************************************/

cpr.core.AppConfig.INSTANCE.setEnvValue("useCustomScrollbar", true);

/*
 * "add" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("mdi1").addItemWithApp("202205/child");
}
