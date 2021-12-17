/************************************************
 * gridFitButton.js
 * Created at 2020. 9. 29. 오전 10:10:04.
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



/*
 * "B" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var voHostAppIns = app.getHostAppInstance();
	
	
	
	var voLocation = app.getHost().getActualRect();
	
	var voConstraint = {
		right : document.body.offsetWidth- voLocation.width - voLocation.left+"px",
		top : voLocation.bottom+"px",
		width : "430px",
		height : "490px"
	}	
	
	
	
	var vbBool = voHostAppIns.getContainer().getAllRecursiveChildren().every(function(each){
		return each.type != "udc.grids.gridFilter2";
	});
	if(vbBool){
		
		var vcUdc = new udc.grids.gridFilter2();
		vcUdc.gridControl = app.getAppProperty("gridControl");
		voHostAppIns.getContainer().floatControl(vcUdc, voConstraint);
		
		vcUdc.addEventListener("btnCl", function(e){
			
			vcUdc.dispose();
		});
	}
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	/** @type cpr.controls.Grid */
	var vcGrid = app.getAppProperty("gridControl");
	
	if(vcGrid && vcGrid instanceof cpr.controls.Grid) {
//		vcGrid.autoFit = "none";
	}
}
