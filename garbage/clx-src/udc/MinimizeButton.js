/************************************************
 * MinimizeButton.js
 * Created at 2019. 12. 3. 오후 1:38:49.
 *
 * @author ryu
 ************************************************/


exports.abc = function(){
	alert("ㅠㅠㅠㅠㅠ!");
}

exports.def = function(){
	
	alert("lol~");
}


/*
 * "-" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 크기가 조절되는 타겟 컨트롤
	
	/** @type cpr.controls.Container */
	var vcTarget = app.getAppProperty("target");
	
	
	if (vcTarget == null){
		return;
	}
		
	// 타켓이 그룹일 때와 탭 폴더인 경우에 대한 처리 방식을 다르게 가진다.
	if (vcTarget.type == "container"){
		var voTargetLayout = vcTarget.getLayout();

		// 레이아웃의 종류가 폼 레이아웃일 경우에만 적용될 수 있도록 한다.
		if (voTargetLayout instanceof cpr.controls.layouts.FormLayout){
			// 최소화 여부에 따라 행을 표시 또는 미표시한다.
				var minimize = app.getAppProperty("minimize");
				var vaMinimizeIdx = app.getAppProperty("minimizeIndex").split(",");
				
				vaMinimizeIdx.forEach(function(each){
					voTargetLayout.setRowVisible(parseInt(each), minimize);
				});
				app.setAppProperty("minimize", !minimize);
		}
		
	} else if (vcTarget.type == "tabfolder") {
		/** @type cpr.controls.Container */
		var vcParent = vcTarget.getParent();
		
		if (!app.getAppProperty("minimize")){
			vcParent.updateConstraint(vcTarget, {
				height : "31px"
			});
			
			app.setAppProperty("minimize", true);
		} else {
			vcParent.updateConstraint(vcTarget, {
				height : "187px"
			});

			app.setAppProperty("minimize", false);
		}
		
	}
}
