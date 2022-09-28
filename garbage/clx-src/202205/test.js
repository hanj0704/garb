/************************************************
 * test.js
 * Created at 2022. 6. 15. 오후 3:16:30.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	app.lookup("sms1").send();
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms1BeforeSubmit(e){
	var sms1 = e.control;
	
	sms1.setDataRowHandler(function(rowdata){
		console.log(rowdata.getDataSetInfo());
		console.log(rowdata.getAttr());
		console.log(rowdata.getInfo());
		console.log(rowdata);
		return {
			column5 : rowdata.getValue("column1")+rowdata.getValue("column2")+rowdata.getValue("column3")+rowdata.getValue("column4")+rowdata.getValue("column5")
		}
	});
}
