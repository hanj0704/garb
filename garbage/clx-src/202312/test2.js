/************************************************
 * test2.js
 * Created at 2023. 12. 11. 오전 10:14:34.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.getContainer().addChild(app.lookup("ea1"), {
		rowIndex: 1,
		colIndex: 1
	});
	var a = [];
	a.push(new cpr.controls.layouts.FormDivision("2fr"));
	
	a.push(new cpr.controls.layouts.FormDivision("1fr"));
	
	app.getContainer().getLayout().setColumnDivisions(a);
}
