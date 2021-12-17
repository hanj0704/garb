/************************************************
 * bindLanguage.module.js
 * Created at 2020. 8. 11. 오전 10:15:11.
 *
 * @author han
 ************************************************/
/*
 * 본 모듈은 다국어 바인딩이 되어 있지 않은 컨트롤의 텍스트를 다국어 바인딩 해주는 모듈입니다.
 * 앱이 최초 실행 되었을 때, 모든 컨트롤을 대상으로 텍스트(value, label, text)가 language.json에 key로 등록되어 있을 경우에 해당 value로 텍스트가 치환됩니다.
 * 
 * [텍스트 치환이 가능한 컨트롤]
 * 1. 아이템을 갖는 컨트롤(메뉴, 리스트박스, 링크드리스트박스, 콤보박스, 링크드콤보박스, 체크박스그룹, 트리, 네비게이션바, 라디오버튼)
 * 2. 섹션아이템을 갖는 컨트롤(아코디언)
 * 3. 탭아이템을 갖는 컨트롤(탭폴더, MDI폴더)
 * 4. 그리드
 * 		- 그리드에 셀에 컨트롤을 배치했을 경우엔 5번(그 외 기본컨트롤)에서 컨트롤에 접근하여 다국어 바인딩을 수행합니다. (별도 코드 필요없음)
 * 		- 컨트롤을 배치하지 않았을 경우엔 그리드 헤더, 그룹헤더, 그룹푸터, 푸터에 적힌 값을 바인딩합니다. 
 * 5. 그 외의 기본컨트롤
 * 
 * ※ 콤보박스를 통해 언어를 변경하고자 할 경우에는 콤보박스에 사용자 속성(language)을 추가해서 사용할 수 있습니다.
 */


var mbBind = false; // true 일 경우에만 아래 코드 실행

if(mbBind) cpr.events.EventBus.INSTANCE.addFilter("init", fn_init);

function fn_init(e) {
	var voApp = e.control;
	
	if(voApp instanceof cpr.core.AppInstance) {
		var voRecursivChildren = voApp.getContainer().getAllRecursiveChildren();
		setLanBind(voRecursivChildren);
		voApp.getContainer().redraw();
	}
}


///**
// * 
// * @param {cpr.controls.Control[]} voChildren
// */
//function setOriginalValue(voChildren) {
//	
//	voChildren.forEach(function(each){
//		var voItemCtrl = ["menu","listbox","linkedlistbox","combobox","linkedcombobox","checkboxgroup","tree","navigationbar","radiobutton"];
//		if(voItemCtrl.indexOf(each.type) != -1) {
//			
//			each.getItems().forEach(function(item){
//				
//				
//			})
//		}
//	});	
//}


/**
 * 다국어 바인딩이 안되어 있는 영역에 바인딩
 * @param {any} voChildren
 */
function setLanBind(voChildren) {
	var vsCrntLanguage = cpr.I18N.INSTANCE.currentLanguage;
	var voLan = cpr.I18N.INSTANCE.getLocaleData(vsCrntLanguage);
	
	voChildren.forEach(function(each) {
//		var voItemCtrl = ["menu", "listbox", "linkedlistbox", "combobox", "linkedcombobox", "checkboxgroup", "tree", "navigationbar", "radiobutton"];
//		if(voItemCtrl.indexOf(each.type) != -1) { // 아이템이 포함된 컨트롤
//			each.getItems().forEach(function(item) { 
//				var vsLan = voLan[item.label];
//				if(vsLan != null) {
//					item.label = vsLan;
//				}
//			})
//		}

		if(each.type == "accordion") { // 아코디언
			each.getSectionItems().forEach(function(section) {
				var vsLan = voLan[section.title];
				if(vsLan != null) {
					section.title = vsLan;
				}
			})
		}
		
		if(each.type == "tabfolder" || each.type == "mdifolder") { // 탭폴더, MDI 폴더
			each.getTabItems().forEach(function(tab) {
				var vsLan = voLan[tab.text];
				if(vsLan != null) {
					tab.text = vsLan;
				}
			})
		}
		
		/*
		 * 그리드
		 * - 각 셀에 컨트롤 배치를 하지 않았을 경우에만 아래 코드 실행(gheader, gfooter 제외)
		 */
		if(each.type == "grid") { // 그리드
			each.forEachOfGridCells(function(cell){ 
				cell.forEach(function(cellInfo){ 
					var region = cellInfo["region"];
					switch(region){
						case "header" :
							var voColumn = each.header.getColumn(cellInfo.cellIndex);
							if(voColumn.getText() != null) {
								var vsLan = voLan[voColumn.getText()];
								if(vsLan != null) {
									voColumn.setText(vsLan);
								}
							}
							break;
						case "footer" :
						/** @type cpr.controls.Grid */
						var grd = each;
						var voCol = grd.footer.getColumn(cellInfo.cellIndex);
						var footer = grd.footer.getColumn(cellInfo.cellIndex).getExpr();
						var vsFText = new cpr.expression.Expression(footer).evaluate();
						var vsLan = voLan[vsFText];
						if(vsLan != null) {
							grd.footer.getColumn(cellInfo.cellIndex).setExpr("'"+vsLan+"'");
						}
							break;
						default : 
							// gheader, gfooter, 없어도 될거같은데
							var vsLan = voLan[cellInfo.text];
							if(vsLan) {
								var voRowGrp = each.getRowGroup("column1", region);
								if(voRowGrp) voRowGrp.getColumn(cellInfo.cellIndex).setExpr("'" + vsLan + "'");
							}
							break;
					}
				});
			});

		}
							//each.id
		var vsLanText = voLan[each.id]; // 인풋계열, 체크박스
		if(vsLanText != null) {
			each.text = vsLanText;
		}
						//each.id
		var vsLan = voLan[each.id]; // 그 외 컨트롤
		if(vsLan != null) {
			each.value = vsLan;
		}
		
	})
}

/**
 * 콤보박스를 통해 언어변경(사용자속성 language:Y)
 * @param {Event} e
 */
cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(e){
	var control = e.control;
	if(mbBind) {
		if(control.type == "combobox") {
			if(control.userAttr("language") == "Y") {
				cpr.I18N.INSTANCE.currentLanguage = control.value;
				var voChildren = control.getAppInstance().getContainer().getAllRecursiveChildren();
				setLanBind(voChildren);
			}
		}
	}
});
	
