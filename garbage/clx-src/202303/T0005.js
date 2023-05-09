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
