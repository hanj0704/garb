/************************************************
 * containerChanger.js
 * Created at 2021. 4. 21. 오전 9:31:48.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var grp = app.lookup("grp1");
	
	var flows = new cpr.controls.layouts.FlowLayout();
	flows.spacing =5;
	flows.bottomMargin = 0;
	flows.leftMargin = 0;
	flows.rightMargin = 0;
	flows.topMargin = 0;
	grp.setLayout(flows);
	
	grp.getChildren().forEach(function(each){
		console.log(each.getParent().getConstraint(each));
//		each.getParent().updateConstraint(each, {
//			width:"120px",
//			height:"100px",
//			autoSize:"none"
//		});
	});
}
