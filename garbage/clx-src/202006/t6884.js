/************************************************
 * t6884.js
 * Created at 2020. 6. 18. 오후 1:41:25.
 *
 * @author Youminsang
 ************************************************/


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var vcDti1 = app.lookup("dti1");
	vcDti1.defaultDate = new Date().setHours(00, 00, 00, 00);
}

/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDti1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dti1 = e.control;
	

	var newDate = e.newValue.substring(0, 8);
	
	var newValue = newDate + "000000"
	
	dti1.value = newValue;	
}





/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	console.log(moment(app.lookup("dti1").value,"YYYYMMDD").format("YYYYMMDDhhmmss"));
	console.log(app.lookup("ds1").getRowDataRanged());
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDti2ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dti2 = e.control;
}
