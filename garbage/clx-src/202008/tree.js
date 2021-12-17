/************************************************
 * tree.js
 * Created at 2020. 8. 5. 오후 2:15:10.
 *
 * @author daye
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
	var vcTree = app.lookup("tre1");

	var voLan = cpr.I18N.INSTANCE.getLocaleData(app.lookup("cmb1").value);
	
	vcTree.getItems().forEach(function(each){
		
		var vsLan = voLan[each.row.getValue("label2")];
		
		if(vsLan != null) {
			each.label = vsLan;
		}
	
	});
	
	app.lookup("tre1").redraw();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("sms1").send();
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	app.lookup("tre1").redraw();
}



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	app.app.createNewInstance().run();
	
	app.close();
}



/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTre1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	var pa = e.item.row.getValue("parent");

	app.lookup("mdi1").addItemWithApp(pa,true,function(tabItem,app) {
		tabItem.text = e.item.label;
		
	});
	
}
