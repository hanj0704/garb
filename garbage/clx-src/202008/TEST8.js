/************************************************
 * TEST8.js
 * Created at 2020. 8. 14. 오전 11:12:39.
 *
 * @author ryu
 ************************************************/


/**
 * 
 * @param {Number} index
 * @return {cpr.controls.Container}
 */
function createControls(index) {
	var container = new cpr.controls.Container();
	var layout = new cpr.controls.layouts.FormLayout();
	
	layout.setRows(["1fr"]);
	layout.setColumns(["1fr"]);
	
	container.setLayout(layout);
	
	var output = new cpr.controls.Output();
	
	output.value = index;
	
	container.addChild(output, {
		rowIndex : 0,
		colIndex : 0
	});
	
	return container;
}


/*
 * "동적 생성" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	for(var idx = 1; idx <= 4; idx++){
		createControls(idx);
	}
}
