/************************************************
 * PockingBotConsole.js
 * Created at 2021. 1. 22. 오후 3:38:22.
 *
 * @author jeeeyul
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	switch (e.property) {
		case "bot":
			/** @type udc.svg.PickingBot */
			var bot = e.newValue;
			app.lookup("armField").putValue(String(bot.distance));
			app.lookup("dirField").putValue(String(bot.direction));
			app.lookup("pickerField").putValue(String(bot.picking));
			break;
			
		default:
			break;
	}
}

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onDirFieldSelectionChange(/* cpr.events.CSelectionEvent */ e){
	var bot = app.getAppProperty("bot");
	if(bot instanceof udc.svg.PickingBot){
		bot.controlDirection(parseInt(e.control.value));
	}
}


/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onArmFieldSelectionChange(/* cpr.events.CSelectionEvent */ e){
	var bot = app.getAppProperty("bot");
	if(bot instanceof udc.svg.PickingBot){
		bot.controlArm(parseInt(e.control.value))
	}
}


/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onPickerFieldSelectionChange(/* cpr.events.CSelectionEvent */ e){
	var bot = app.getAppProperty("bot");
	if(bot instanceof udc.svg.PickingBot){
		bot.controlPicker(parseInt(e.control.value))
	}
}
