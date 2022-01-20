/************************************************
 * dateTester.js
 * Created at 2021. 12. 9. 오후 1:44:15.
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
	
	
	var cal = app.lookup("cal1");
	
	console.log(cal.selectItem(0));
	console.log(cal.getSelectedItems())
}

cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(/*cpr.events.CSelectionEvent*/e){
	
	var control = e.control;
	
	if(control instanceof cpr.controls.Grid) {
		
		if(control.selectionMulti == "multi" && control.selectionUnit == "cell") {
			/** @type Array */
			var vaNewSelection = e.newSelection;
			
			if(vaNewSelection.length > 0) {
				var vnResult = 0;
				vaNewSelection.forEach(function(/*{rowIndex :Number,cellIndex:Number}*/each){
					
					var vAnyValue = control.getCellValue(each.rowIndex, each.cellIndex);
					if(!isNaN(vAnyValue)) {
						vnResult += Number(vAnyValue);
					}
				});
				console.log(vnResult);
			}
		} else {
			return;
		}
	}
});




/*
 * 데이트 인풋에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDti1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dti1 = e.control;
	
}


/*
 * 데이트 인풋에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onDti1Mousedown(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dti1 = e.control;
	
	console.log(e.target.className.indexOf("cl-dateinput-button"));
	if(e.target.className.indexOf("cl-dateinput-button") != -1) {
		
		e.preventDefault();
		e.stopPropagation();
	}
}
