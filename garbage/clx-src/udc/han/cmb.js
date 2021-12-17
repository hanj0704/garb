/************************************************
 * cmb.js
 * Created at 2021. 1. 5. 오전 10:09:25.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/**
 * Select DOM의 value change 이벤트를 처리합니다.
 */
function selectListener(/* Event */ e){
	// 앱의 value 속성 변경
	app.setAppProperty("value", e.target.value, true);
			
	// value-change 이벤트 디스패치.
	var changeEvent = new cpr.events.CValueChangeEvent("value-change", {
		newValue:e.target.value
	});
	
	app.dispatchEvent(changeEvent);
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shell = e.control;
	var rootDiv = e.content;
	
	var select = document.createElement("select");
	select.style.position = "absolute";
	select.style.width = "100%";
	select.style.height = "100%";
	select.style.borderRadius = "0px";
	select.setAttribute("class", "cl-control cl-combobox cl-text");
	select.style["-webkit-appearance"] = "none";
	
		var currentValue = app.getAppProperty("value");
		
		/** @type {cpr.data.DataSet} */
		var dataSet = app.getAppProperty("targetDs")
		var labelColumnName = app.getAppProperty("labelC");
		var valueColumnName = app.getAppProperty("valueC");
		
			select.disabled = false;
			select.style.background = "#fff";
		
		var rowCount = dataSet.getRowCount();
		var row;
		var option = document.createElement("option");
		option.setAttribute("value","");
		select.appendChild(option);
		for(var idx = 0;idx < rowCount;idx++){
			(function(){
				var row = dataSet.getRow(idx);
				var option = document.createElement("option");
				var value = row.getValue(valueColumnName);
				option.setAttribute("value", value);
				option.textContent = row.getValue(labelColumnName);
				if(value == currentValue){
					option.setAttribute("selected", true);
				}
				select.appendChild(option);
			})();
		}
		select.addEventListener("change", selectListener);
	
	e.content.appendChild(select);
}
