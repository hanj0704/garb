/************************************************
 * expTester.js
 * Created at 2024. 10. 10. 오후 4:45:06.
 *
 * @author HAN
 ************************************************/

exports.highlight1 = function(){
	return "'label'"
}

exports.highlight2 = function(){
	
	return new cpr.expression.Expression("label");
}
/*
 * 콤보 박스에서 change 이벤트 발생 시 호출.
 * 값이 변경 되었을때 발생하는 DOM 이벤트.
 */
function onCmb3Change(e){
	var cmb3 = e.control;
//	var q = app.lookup("cmb1").displayExp;
//	debugger;
	if(cmb3.value == "value2") {
		cmb3.displayExp = "label";
	} else {
		cmb3.displayExp = "label+ 'qq'";
	}
}
