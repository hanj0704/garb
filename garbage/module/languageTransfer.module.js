/************************************************
 * languageTransfer.module.js
 * Created at 2020. 4. 27. 오전 9:40:22.
 *
 * @author HANS
 ************************************************/
/*
 * 다국어 사전에 들어가 있는 key를 통해서 데이터를 동적으로 변경시키는 모듈입니다.
 * 해당 모듈은 아코디언, 그리드의 행 데이터등은 변경하는 대상에서 제외시킨 상태입니다.
 * useTranslate,vsLangCode를 통해서 동적 변경 여부나 언어 코드들을 변경시켜줄 수 있습니다.
 * 
 * bindLanguage와 동일한 목적으로 작성되었으나, 사용하는 함수등에 있어서 차이점이 있어서 모듈을 두개 첨부드립니다.
 * default로는 bindLanguage를 사용하게 처리되어있으며,이 모듈을 사용하려면 bindLanguage의 mbBind를 끄고 useTranslate를 키셔야합니다.
 */

var useTranslate = false;
/**
 * 다국어 변환 기능 사용여부를 설정할 수 있습니다. 
 * @param {any} pBool
 */
globals.setUseTranslate = function(pBool){
	useTranslate = pBool;
};

/**
 * 다국어 변환 기능을 사용 여부를 반환 받습니다.
 */
globals.getUseTranslate = function(){
	return useTranslate;
}

var vsLangCode = "ko";

/**
 * 다국어 변환할 언어코드를 설정합니다.
 * @param {"ko"|"en"} psLangCode
 */
globals.setLanguageCode = function(psLangCode) {
	
	vsLangCode = psLangCode;
}

/**
 * 다국어 변환 언어코드를 반환 받습니다.
 */
globals.getLanguageCode = function(){
	
	return vsLangCode;
}

if(useTranslate)cpr.events.EventBus.INSTANCE.addFilter("init", function(e) {
	var control = e.control;


		if (control instanceof cpr.core.AppInstance) {

			var vcContainer = control.getContainer();

			var vaChildren = vcContainer.getAllRecursiveChildren().filter(function(each) {
				return each.getBindInfo("value") === undefined || each.value === undefined;
			});

			var localeData = cpr.I18N.INSTANCE.getLocaleData(vsLangCode);

			vaChildren.forEach(function(each, idx) {
				if (each instanceof cpr.controls.Grid) {

					var vcGrid = each;
					var vnColCount = vcGrid.columnCount;
					for (var i = 0; i < vnColCount; i++) {

						var voColumn = vcGrid.header.getColumn(i);
						voColumn.setText(localeData[voColumn.getText()]);
					}
					
					console.log(vcGrid.footer);
					console.log(vcGrid.footer == undefined);
					if(vcGrid.footer == undefined){
						
					var vnFCellCount = vcGrid.footer.cellCount;
					
					for (var i = 0; i < vnFCellCount; i++) {
						
						var vcFooter = vcGrid.footer.getColumn(i);
						var compiledExpr = new cpr.expression.Expression(vcFooter.expr).evaluate();
						
						if (!ValueUtil.isNull(compiledExpr)) {
							vcFooter.expr = "'" + localeData[compiledExpr] + "'";
						}
					}
					}
			
				} else if("getItems" in each){
					/** @type Array */
					var items = each.getItems();
					items.forEach(function(/** cpr.controls.Item*/item){
						
						if(!ValueUtil.isNull(localeData[item.label])) {
							
							item.label = localeData[item.label];
						}
					});				
					
				}else if("getTabItems" in each){
					/** @type Array */
					var items = each.getTabItems();
					
					items.forEach(function(/** cpr.controls.TabItem*/item){
						if(!ValueUtil.isNull(localeData[item.text])) {
							
							item.text = localeData[item.text];
						}
					});
				} else {

					if (!ValueUtil.isNull(localeData[each.value])) {

						each.value = localeData[each.value];
					}
				}

			});
		}
});