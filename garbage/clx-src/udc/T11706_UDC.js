/************************************************
 * NumberInput.js
 * Created at 2020. 04. 21. 오후 2:52:14.
 *
 * @author tomato
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return app.getAppProperty("value");
};


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	var ele = e.content;
	var value = app.getAppProperty("value");
	var input = document.createElement("input");
	input.type ="tel";
	input.value = value?value:"";
	input.style.width ="100%";
	input.style.height = "100%";

	input.addEventListener("change", onchange);

	ele.appendChild(input);
}

function onchange(e){
	var oldValue = app.getAppProperty("value");
	var newValue = e.target.value;
	var event = new cpr.events.CValueChangeEvent("value-change", {oldValue:oldValue,newValue:newValue});
	app.setAppProperty("value", newValue);
	app.dispatchEvent(event);
}

