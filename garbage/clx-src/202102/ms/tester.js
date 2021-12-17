/************************************************
 * tester.js
 * Created at 2021. 2. 19. 오후 2:00:37.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	var grp = app.lookup("grp1");
	var mdi = app.lookup("mdi1");
	
	var cont = new cpr.controls.Container();
	
	var lay = new cpr.controls.layouts.FormLayout();
	
	lay.setRows(["1fr","1fr"]);
	lay.setColumns(["1fr","1fr"]);
	cont.setLayout(lay);
	
	
	cont.addChild(mdi.getTabItems()[1].content, {
		rowIndex :0,
		colIndex:0
	});
	
	
	app.getContainer().addChild(cont, {
		"top": "246px",
		"right":"20px",
		"bottom":"20px",
		"left":"20px"
	});
}
