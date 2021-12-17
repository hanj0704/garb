/************************************************
 * notificationcenter.js
 * Created at 2019. 4. 3. 오전 10:41:20.
 *
 * @author tomato
 ************************************************/

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var msg = "레퍼런스";
	/*글로벌 객체이기 때문에 브라우저 갱신 하지 않으면 정보가 사라지지 않습니다. 
	중복으로 추가하지 않도록 유의 하세요.*/
//	cpr.core.NotificationCenter.INSTANCE.unsubcribeAllTopic(app);
	
	cpr.core.NotificationCenter.INSTANCE.subscribe("button-click", app, function(data){
		console.log(this); //target을 app을 지정함으로 함수가 app으로 바인드 됩니다.
		console.log(data.msg);
		console.log("버튼을 눌렀습니다.",data); //data는 post에서 전달되는 payload가 됩니다.
	});
	cpr.core.NotificationCenter.INSTANCE.subscribe("load", app, function(data){
		console.log(this); //target을 app을 지정함으로 함수가 app으로 바인드 됩니다.
		console.log(data.msg);
		console.log("로드가 되었습니다.",data); //data는 post에서 전달되는 payload가 됩니다.
	});
	cpr.core.NotificationCenter.INSTANCE.subscribe("selection-change", app, function(data) {
		console.log(this);//target을 app으로 지정함으로 함수가 app으로 바인드 됩니다.
		console.log("selection : " + data.selection);
		console.log("선택행이 변경되었습니다.",data);
	});
}


/*
 * "메세지 발송" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//구독자에게 알립니다.
	cpr.core.NotificationCenter.INSTANCE.post("button-click", {
		text:"test1",
		msg :"Button > Event > Click"
	});
																
}


/*
 * "메시지 삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUnsubscribeClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//구독을 하지 않습니다.
	cpr.core.NotificationCenter.INSTANCE.unsubscribe(app, "button-click");
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("load", {
		text:"load-test1",
		msg : "AppInstance > Event > Load"
	});
}




/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("selection-change",{
		text :"selection-test",
		selection : grd1.getSelectedRowIndex()
	});
}


/*
 * "메세지 전체 삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUnsubscribeAllTopicClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.unsubcribeAllTopic(app);
}
