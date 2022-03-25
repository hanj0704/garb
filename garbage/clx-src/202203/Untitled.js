/************************************************
 * Untitled.js
 * Created at 2022. 3. 15. 오후 1:00:26.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("fud1").addUploadedFile({
		"name" : "name.xlsx",
		"size" : 1024,
		"type" : "xlsx",
		"properties" : {
			"prop1" : "a",
			"prop2" : "b"
		}
	});
}


/*
 * 파일 업로드에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onFud1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
	
	/** @type cpr.controls.UploadedFile */
	var file = e.item;
	
	console.log(file);
	var a = file.getProperty("prop1");
	console.log(a);
}
