/************************************************
 * Arrow.js
 * Created at 2019. 4. 4. 오전 11:38:15.
 *
 * @author daye
 ************************************************/

exports.getLine1Rect = getLine1Rect;
exports.getLine2Rect = getLine2Rect;
exports.setArrowMargin = setArrowStyleArrow;

/**
 * @return line1 컨트롤 위치
 */
function getLine1Rect() {
	var voActualRect = app.lookup("line1").getActualRect();
	return voActualRect	
}


/**
 *  @return line2 컨트롤 위치
 */
function getLine2Rect() {
	var voActualRect = app.lookup("line2").getActualRect();
	return voActualRect	
}


/**
 * Arrow margin setting
 * @param {any} vsArrowPosition
 * @param {any} vsMarginPosition
 * @param {any} margin
 */
function setArrowStyleArrow(vsArrowPosition, vsMarginPosition, margin) {
	vsMarginPosition = "margin-"+vsMarginPosition;
	app.lookup("arr_" + vsArrowPosition).style.css(vsMarginPosition,  margin + "px");
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	var container = app.getContainer();
	var line1 = app.lookup("line1");
	var line2 = app.lookup("line2");

	if(e.property == "shape"){
		var shape = app.getAppProperty("shape");

		// 1. 기존 적용된 클래스 삭제
		if(container.style.hasClass("horizontal-up")){
			container.style.removeClass("horizontal-up");
		}else if(container.style.hasClass("horizontal-bottom")){
			container.style.removeClass("horizontal-bottom");
		}else{
			container.style.removeClass("vertical");
		}
		
		// 2. type에 해당하는 클래스 추가
		container.style.addClass(shape);

		switch(shape){
			case "horizontal-bottom" : {
				// 화살표 visible 설정
				app.lookup("arr_top").visible = false;
				app.lookup("arr_bottom").visible = false;
				app.lookup("arr_left").visible = true;
				app.lookup("arr_right").visible = true;
				
				// 폼레이아웃 설정
				container.updateConstraint(line1, {
					rowIndex : 1, 
					colIndex : 1, 
					colSpan : 1,
					rowSpan : 2
				});
				container.updateConstraint(line2, {
					rowIndex : 1, 
					colIndex : 2, 
					colSpan : 1,
					rowSpan : 2
				});
				break;
			}
			case "horizontal-up" : {
				// 화살표 visible 설정
				app.lookup("arr_top").visible = false;
				app.lookup("arr_bottom").visible = false;
				app.lookup("arr_left").visible = true;
				app.lookup("arr_right").visible = true;
				
				// 폼레이아웃 설정
				container.updateConstraint(line1, {
					rowIndex : 1, 
					colIndex : 1, 
					colSpan : 1,
					rowSpan : 2
				});
				container.updateConstraint(line2, {
					rowIndex : 1, 
					colIndex : 2, 
					colSpan : 1,
					rowSpan : 2
				});
				break;
			}
			
			case "vertical" : {
				// 화살표 visible 설정
				app.lookup("arr_top").visible = true;
				app.lookup("arr_bottom").visible = true;
				app.lookup("arr_left").visible = false;
				app.lookup("arr_right").visible = false;
				
				// 폼레이아웃 설정
				container.updateConstraint(line1, {
					rowIndex : 1, 
					colIndex : 1, 
					colSpan : 2,
					rowSpan : 1
				});
				container.updateConstraint(line2, {
					rowIndex : 2, 
					colIndex : 1, 
					colSpan : 2,
					rowSpan : 1
				});
				break;
			}
		}
	}
}


/*
 * Body에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onBodyContextmenu(/* cpr.events.CMouseEvent */ e){
	var dsMenu = app.lookup("dsMenu");
	
	// 시스템 기본동작 방지
	e.preventDefault();
	
	/** @type cpr.controls.Menu */
	var menu = new cpr.controls.Menu();
	menu.setItemSet(dsMenu, {
		label: "label",
		value: "value",
		icon: "icon",
		parentValue: "parent"
	});
	
	app.getRootAppInstance().floatControl(menu, {
		position: "absolute",
		top: e.clientY + "px",
		left: e.clientX + "px",
		width: "150px"
	});
	menu.focus();
	
	// 메뉴 삭제
	menu.addEventListener("blur", function(e){
		app.getRootAppInstance().removeFloatingControl(menu);
	});
	
	// 메뉴 선택
	menu.addEventListener("selection-change", function(e){
		switch(menu.value){
			case "del" : {
				app.getRootAppInstance().removeAllFloatingControls();

				var event = new cpr.events.CUIEvent("deleteLine");
				app.dispatchEvent(event);
				
				break;
			}
		}
	});
}
