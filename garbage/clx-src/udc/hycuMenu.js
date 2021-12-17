/************************************************
 * hycuMenu.js
 * Created at 2019. 9. 30. 오후 2:53:41.
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


exports.configMenu = configMenu;


/**
 * 
 * @param {String} parentValue
 * @param {Array} childValues
 */
function configMenu(parentValue,childValues){
	
	var vcOptParent = app.lookup("optParent");
	
	vcOptParent.value = parentValue;
	
	var container = app.getContainer();
		
	
	childValues.forEach(function(each){
		
		var opts = new cpr.controls.Output();
		opts.value = each;
		
		app.getContainer().addChild(opts, {
			"width" : "100px",
			"height" : "20px",
			"autoSize" : "none"
			
		});
		
	});
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

}
