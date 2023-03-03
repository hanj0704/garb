/************************************************
 * pdf.js
 * Created at 2022. 12. 9. 오후 3:40:18.
 *
 * @author HANS
 ************************************************/

/*
 * "read" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	app.lookup("sms1").removeAllFileParameters();
	app.lookup("sms1").addFileParameter("file1", app.lookup("fi1").files[0]);
//	app.lookup("sms1").addFileParameter("file2", app.lookup("fi1").files[1]);
	app.lookup("sms1").send();
//	var file = app.lookup("fi1").file;
//	
//	var reader = new FileReader();
//	
//	
//	reader.onload=function(e){
//		var res = e.target.result;
//		console.log(res);
//	};
//	reader.readAsText(file,"utf8");
}

/*
 * "down" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	var sms = app.lookup("sms2");
//	sms.removeAllFileParameters();
	sms.addFileParameter("file1", app.lookup("fi1").files[0]);
	sms.send();	
}
