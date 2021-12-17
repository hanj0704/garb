/************************************************
 * ColumnTypeChg.js
 * Created at 2020. 6. 8. 오전 11:30:46.
 *
 * @author Youminsang
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return app.getAppProperty("value");
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	var vcTab		 = app.lookup("fld1");		
	var vsSelectCtrl = app.getAppProperty("selectControl");
	var vnTabItemId	 = "";
		
	switch(vsSelectCtrl){
		case "InputBox" : vnTabItemId = "1";
		break;
		case "HtmlSnip" : vnTabItemId = "2";
		break;
		case "TextArea" : vnTabItemId = "3";
		break;
		case "ComboBox" : vnTabItemId = "4";
		break;		
	}
	
	var vcTabItem	 = vcTab.getTabItemByID(vnTabItemId);
	vcTab.setSelectedTabItem(vcTabItem);	
	vcTab.redraw();
	
}
