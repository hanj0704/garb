
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
	
	/**
	 * @type {HTMLDivElement}
	 */
	var shellElement = e.content;
	var shell = e.control;
	var input = document.createElement("input");

	input.type="date";
	input.value = app.getAppProperty("value");
	input.style.width ="100%";
	input.classList.add("cl-text");
	
	var disabled = app.getAppProperty("disabled");
	if (disabled) {
		input.disabled = true;
		shellElement.style.background = "#cccccc";
	} else {
		input.disabled = false;
	}

	input.addEventListener("change",function(evt){
		var oldValue = app.getAppProperty("value");
		//var splitNewValue = evt.target.value.split('-'); 	// 업무단에서 처리
		//var newValue = splitNewValue[0] + splitNewValue[1] + splitNewValue[2];  // 업무단에서 처리
		var newValue = evt.target.value;
		
		var prevent = app.dispatchEvent(new cpr.events.CValueChangeEvent("before-value-change",{"newValue":newValue,"oldValue":oldValue}));
		if(!prevent){
			evt.preventDefault();
			evt.target.value = oldValue;
			return;
		}
		app.setAppProperty("value", newValue, true);
		app.dispatchEvent(new cpr.events.CValueChangeEvent("value-change",{"newValue":newValue,"oldValue":oldValue}));
	});
	input.addEventListener("focus",function(evt){
		shell.style.addClass("cl-focus");
	});
	input.addEventListener("blur",function(evt){
		shell.style.removeClass("cl-focus");
	});
	shellElement.appendChild(input);
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	app.getContainer().redraw();
}

exports.getText = function(){
	var value = app.getAppProperty("value");
	if(!value){
		return
	}
	return value.toLocaleString();
};
