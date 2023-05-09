/************************************************
 * T0005.js
 * Created at 2023. 3. 23. 오전 9:32:59.
 *
 * @author ryu
 ************************************************/

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbMaskValueChange(e){
	var ipbMask = e.control;
	
	// IE에서는 버그로 인해 처리되지 않는 정규식 사용
	var vsPhoneNum = e.newValue;
	var vsFormattedPhoneNum = vsPhoneNum.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
	
	ipbMask.putValue(vsFormattedPhoneNum);
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbMaskForIeValueChange(e){
	var ipbMaskForIe = e.control;
	
	var vsPhoneNum = e.newValue;

	var vnCutNum = vsPhoneNum.length > 9 ? 3 : 2;
	var vsFormattedPhoneNum = vsPhoneNum.slice(0, vnCutNum) + "-" 
		+ vsPhoneNum.slice(vnCutNum, vsPhoneNum.length - 4) 
		+ "-" + vsPhoneNum.slice(vsPhoneNum.length - 4);
		
	ipbMaskForIe.putValue(vsFormattedPhoneNum);
}

/*
 * "커스텀 마스크 문자 등록" 버튼(btnAddMaskChar)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddMaskCharClick(e){
	var btnAddMaskChar = e.control;
	
	var vcMsePhone = app.lookup("msePhone");
//	vcMsePhone.addCustomPattern("p", /[0-9^-]/);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("btnAddMaskChar").click();
}

/*
 * 마스크 에디터에서 input-filter 이벤트 발생 시 호출.
 * 입력상자의 텍스트가 입력될 때 발생하는 이벤트.
 */
function onMsePhoneInputFilter(e){
	var msePhone = e.control;
	
	msePhone.mask = "000-0000-0000";
}

/*
 * 마스크 에디터에서 value-change 이벤트 발생 시 호출.
 * MaskEditor의 value의 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onMsePhoneValueChange(e){
	var msePhone = e.control;
	
	var vsPhoneNum = e.newValue;
	
	var vnCutNum = vsPhoneNum.length > 9 ? 3 : 2;
	var vsFormattedPhoneNum = vsPhoneNum.slice(0, vnCutNum) + "-" 
		+ vsPhoneNum.slice(vnCutNum, vsPhoneNum.length - 4) 
		+ "-" + vsPhoneNum.slice(vsPhoneNum.length - 4);
	
	var vsChangeToMask = vsFormattedPhoneNum.replace(/[0-9]/g, "0");
	
	msePhone.mask = vsChangeToMask;
}
