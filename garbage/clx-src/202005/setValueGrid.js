/************************************************
 * com.js
 * Created at 2020. 5. 25. 오후 2:34:51.
 *
 * @author csj
 ************************************************/

var util = createCommonUtil();


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var grdSr= grd1.getSelectedRow();
	
	console.log(grdSr);
	
	var dd = grdSr;
	
	console.log(dd.setValue("column1", "asdagb"));
	
	console.log(dd);
	
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	util.Dialog.open(app, "202005/setValuePopUp", 500, 500, function(e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		
		if(returnValue){
			
			returnValue.setValue("column2","하하하");
			console.log(returnValue.getRowData());
			//debugger;
		}
		
	});
	
}
