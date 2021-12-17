/************************************************
 * gridDia.js
 * Created at 2020. 8. 5. 오후 2:29:45.
 * 결재가 필요한 화면에 대해서 결재자를 지정하는 화면입니다.비즈니스 로직을 통해서 현재 연결된 결재가 가능한 유저 정보를 가져오는 서브미션을 수행해야합니다.
 * @author han
 ************************************************/



/*
 * "결재요청" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var vcDs = app.lookup("dsList");
	var vcGrd = app.lookup("grd1");
	
	if(vcGrd.getSelectedRowIndex() > -1) {
		
		var result =  vcGrd.getSelectedRow().getValue("userId");
		
		app.close(result);
	} else{
		alert("필수항목이 선택되지 않았습니다.");
	}	
}



/*
 * "취소" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.close();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	//책임자 승인 요청을 보낼 인원에 대한 정보를 JSON으로 가지고 있습니다. 컬럼은 userId, brNo, userNm, ipAdr이 됩니다.
	var voHostProperty = app.getHostProperty("initValue");
	
	console.log(voHostProperty);
	
	app.lookup("dsList").build(voHostProperty);
}
