/************************************************
 * techTest.js
 * Created at 2024. 11. 25. 오전 9:20:22.
 *
 * @author HAN
 ************************************************/

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	
	var vcGrid = app.lookup("grd1");
	
	var initInfo = vcGrid.getInitConfig();
	
	vcGrid.init(initInfo);
	console.log(app.getContainer().getAllRecursiveChildren());
}

