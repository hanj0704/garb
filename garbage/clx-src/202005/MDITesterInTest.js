/************************************************
 * MDITesterAfter.js
 * Created at 2020. 5. 7. 오후 3:06:45.
 *
 * @author HANS
 ************************************************/


/**
 * 테스트 버젼을 사용하실 경우
 * MDI폴더와 탭 폴더에 키보드 이벤트가 추가되었습니다.
 * 더이상 bodyKeyDown이벤트에서 커맨드를 누른데 mdi내부에서 누른건지 에 대한 확인을 할 필요 없으며,
 * 탭 아이템에 focus() api도 추가되었습니다.
 * 해당 기능은 5/22(금)에 릴리즈 될 예정에 있습니다. 
 */

/*
 * MDI 폴더에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onMdi1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var vcMdi1 = e.control;
	
	// (ctrl + <) 키를 눌렀을 때
	if (e.ctrlKey && e.keyCode == "188") {
		
			var voSelectedTabItem = vcMdi1.getSelectedTabItem();
			var vnTabItemIdx = voSelectedTabItem.itemIndex - 1 >= 0 ? voSelectedTabItem.itemIndex - 1 : vcMdi1.getTabItems().length - 1;
			var vaTabItems = vcMdi1.getTabItems();
			vcMdi1.setSelectedTabItem(vaTabItems[vnTabItemIdx]);
			vaTabItems[vnTabItemIdx].focus();

	}
	// (ctrl + >) 키를 눌렀을 때
	if (e.ctrlKey && e.keyCode == "190") {

			var voSelectedTabItem = vcMdi1.getSelectedTabItem();
			var vnTabItemIdx = voSelectedTabItem.itemIndex + 1 < vcMdi1.getTabItems().length ? voSelectedTabItem.itemIndex + 1 : 0;
			var vaTabItems = vcMdi1.getTabItems();
			vcMdi1.setSelectedTabItem(vaTabItems[vnTabItemIdx]);
			vaTabItems[vnTabItemIdx].focus();
	}
}
