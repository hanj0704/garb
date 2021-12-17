/************************************************
 * SearchA.js
 * Created at 2019. 10. 16. 오후 4:03:34.
 *
 * @author ryu
 ************************************************/

/**
 * 자동으로 grpSearch 컨테이너, 검색조건창의 크기를 늘려주는 함수 에시
 * @param {cpr.controls.Container} vcContainer
 */
function checkRect(vcContainer) {

	var vr = vcContainer.getViewPortRect();
	var cpre = vcContainer.getContentPaneRect();
	if (vr.height != cpre.height) {
		if (vcContainer.isFloated()) {
	
			app.floatControl(vcContainer, {
				"width" : "100%",
				"height" : cpre.height+5+"px",
				"top" : "0px"
			});
		}
	}
}
/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcGrpTag = app.lookup("grpTag");
	
	var vcIpb = app.lookup("ipb2");
	
	var vcNewButton  = new cpr.controls.Button();
	
	vcNewButton.value = vcIpb.value;
	
	vcGrpTag.addChild(vcNewButton, {
		"width" : "100px",
		"height" : "25px",
		"autoSize" : "none"
	});
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {

	var vcContainer = app.lookup("grpSearch");
	var voViewPR = vcContainer.getViewPortRect();
	var voContentPR = vcContainer.getContentPaneRect();
	if (voViewPR.height != voContentPR.height) {
		if (vcContainer.isFloated()) {
	
			app.floatControl(vcContainer, {
				"width" : "100%",
				"height" : voContentPR.height+"px",
				"top" : "0px"
			});
		}
	}
});	
	
}
