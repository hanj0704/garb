/************************************************
 * tester.js
 * Created at 2020. 5. 7. 오전 9:00:52.
 *
 * @author HANS
 ************************************************/
/**
 * MDI폴더 내에서 커맨드를 통해서 탭아이템을 이동하는 예제입니다.
 * MDI폴더 자체 혹은 MDI폴더의 탭 아이템 내에 포커스가 이동해 있는 상태에서 ctrl + < , > 키를 누르면 좌 우로 탭아이템 포커스가 이동하게 됩니다.
 * 마우스 없이 타이핑이 많은 케이스에 대해서 만든 스크립트로, 사용자 임의로 단축키를 변경할 수 있습니다.
 * 다만 브라우저나, 윈도우에 대해서 이미 존재하는 커맨드와 중복되지 않게 조심하십시오.
 * 해당 기능은 MDI폴더 내에 포커스가 있을 때를 기준으로 작성된 스크립트 이며, 외부에서도 mdi에게 바로 접근해야 하는 일이 있을 경우 스크립트를 커스터마이징 해야 합니다.
 */

/**
 * key down 이벤트가 발생한 타겟 컨트롤이 MDI폴더 내에 자식으로 귀속되어 있는지를 판별하는 함수입니다.
 * 자신의 조상 중에 MDI폴더가 존재할 경우 true를 반환하며, 그렇지 않을 경우 false를 반환합니다.
 * ※이 함수는 MDI폴더 밖에서 키를 눌렀을 때에는 이벤트를 발생시키지 않으려고 작성된 함수입니다.
 * @param {cpr.controls.UIControl} pcCtrl keyDown이벤트가 발생한 targetControl
 * @returns {Boolean}
 */
function checkParentBelongMDI(pcCtrl) {

	var ctrls = pcCtrl;
	do {
		var vbParentIsTab = false;
		if (ctrls instanceof cpr.controls.MDIFolder) {

			vbParentIsTab = true;
		} else {

			ctrls = ctrls.getParent();
		}
	}
	while (vbParentIsTab == false && ctrls != null)

	return vbParentIsTab;
}
/*
 * Body에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown( /* cpr.events.CKeyboardEvent */ e) {
	/** @type cpr.controls.UIControl */
	var vcTargetCtrl = e.targetControl;

	// (ctrl + <) 키를 눌렀을 때
	if (e.ctrlKey && e.keyCode == "188") {


		if (checkParentBelongMDI(vcTargetCtrl)) {

			var vcMdi1 = app.lookup("mdi1");
			var voSelectedTabItem = vcMdi1.getSelectedTabItem();
			var vnTabItemIdx = voSelectedTabItem.itemIndex - 1 >= 0 ? voSelectedTabItem.itemIndex - 1 : vcMdi1.getTabItems().length - 1;
			var vaTabItems = vcMdi1.getTabItems();

			vcMdi1.setSelectedTabItem(vaTabItems[vnTabItemIdx]);
			vcMdi1.focus();

		}
	}
	// (ctrl + >) 키를 눌렀을 때
	if (e.ctrlKey && e.keyCode == "190") {

		if (checkParentBelongMDI(vcTargetCtrl)) {

			var vcMdi1 = app.lookup("mdi1");
			var voSelectedTabItem = vcMdi1.getSelectedTabItem();
			var vnTabItemIdx = voSelectedTabItem.itemIndex + 1 < vcMdi1.getTabItems().length ? voSelectedTabItem.itemIndex + 1 : 0;
			var vaTabItems = vcMdi1.getTabItems();

			vcMdi1.setSelectedTabItem(vaTabItems[vnTabItemIdx]);
			vcMdi1.focus();
		}
	}
}