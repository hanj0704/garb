/************************************************
 * tester.js
 * Created at 2023. 11. 16. 오후 2:32:12.
 *
 * @author HANS
 ************************************************/

	cpr.core.AppConfig.INSTANCE.setVarValue("ssoId", "test");
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	console.log(cpr.core.AppConfig.INSTANCE.getVarConfig("").getValue("ssoId"))	
	console.log(cpr.core.AppConfig.INSTANCE.getVarConfig("").getValue("ssoId"));
}
