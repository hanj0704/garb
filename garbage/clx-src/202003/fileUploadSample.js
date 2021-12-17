/************************************************
 * fileUploadExample.js
 * Created at 2020. 3. 20. 오후 3:08:37.
 *
 * @author HANS
 ************************************************/



/*
 * 파일 업로드에서 sendbutton-click 이벤트 발생 시 호출.
 * 파일을 전송하는 button을 클릭 시 발생하는 이벤트. 서브미션을 통해 전송 버튼에 대한 구현이 필요합니다.
 */
function onFud1SendbuttonClick(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
	
	var vaFiles = fud1.getFiles();
	
	var vcSubUpload = app.lookup("subUpload");
	
	vaFiles.forEach(function(each,idx){
	
		vcSubUpload.addFileParameter("file_"+idx, each);
	});
	
	vcSubUpload.send();
	
}


/*
 * "전송" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var vcFileIp1 = app.lookup("fi1");
	
	var vaFiles = vcFileIp1.files;
	
	var vcSubUpload = app.lookup("subUpload");
	
	vaFiles.forEach(function(each, idx){
		
		vcSubUpload.addFileParameter("file_"+idx, each);
		
	});
	
	vcSubUpload.send();
}
