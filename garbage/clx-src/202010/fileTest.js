/************************************************
 * fileTest.js
 * Created at 2020. 10. 22. 오후 1:44:46.
 *
 * @author HANS
 ************************************************/

function downloadURL(uri,name) {
	
	var link = document.createElement("a");
	
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}

function saveToFile_Chrome(fileName, content) {
    var blob = new Blob([content], { type: 'text/plain' });
    objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    a.click();
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	saveToFile_Chrome("aaa.txt", "asdasdasdasda");
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var ab = app.lookup("ds1").getRowDataRanged();
	
	var result = {
		"ds1" : ab
	}
	
	console.log(JSON.stringify(result));
	saveToFile_Chrome("asdf.json", JSON.stringify(result));
//	var xmlDoc = document.implementation.createDocument(null, "books");
//	
//	var xhttp = new XMLHttpRequest();
//	xhttp.onreadystatechange = function() {
//			if (xhttp.readyState == 4 && xhttp.status == 200) {
//				
//				 xmlDoc = xhttp.responseXML; //important to use responseXML here
//			}
//			};
//			xhttp.open("GET", "books.xml", true);
//			xhttp.send();
//			
//			var xmlString = "<root>abc</root>";
//			var parser = new DOMParser();
//			 xmlDoc = parser.parseFromString(xmlString, "text/xml");
}
