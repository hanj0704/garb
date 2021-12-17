

/**
 * 
 * @param {cpr.controls.Grid} grd
 * @param {"cell" | "row" | "column"} selUnit
 */
function copyHtml(grd, selUnit) {
	var tagArr = null;
	switch(selUnit) {
		case "cell" : {
			tagArr = copyCellHtml(grd);
			break;
		}
		case "row" : {
			// TODO implements
		}
		case "column" : {
			// TODO implements
		}
	}

	var clipTag = getClipboardNode();
	var tblTag = clipTag.firstElementChild;
	tblTag.innerHTML = tagArr.join("");
	tagArr = null;
	
	var selection = window.getSelection();
	selection.removeAllRanges();
	
	var isIE = (cpr.core.Platform.INSTANCE.browserInfo.name == "ie");
	if(isIE) {
		var range = document.createRange();
    	range.selectNode(tblTag);
    	selection.addRange(range);
	} else {
		selection.selectAllChildren(tblTag);
	}
	
	document.execCommand("copy");
	
	selection.removeAllRanges();
	
	/* 클립보드 태그 삭제 (스크롤 방지) */
	var clipTag = document.getElementById("gridClipboard");
	document.body.removeChild(clipTag);
}

function getClipboardNode() {
	var clipTag = document.getElementById("gridClipboard");
	if(!clipTag) {
		clipTag = document.createElement("div");
		clipTag.id = "gridClipboard";
		clipTag.style.width = "1px";
		clipTag.style.height = "1px";
		clipTag.style.overflow = "hidden";
		
		var tblTag = document.createElement("table");
		clipTag.appendChild(tblTag);
		
		clipTag = document.body.appendChild(clipTag);
	}
	
	return clipTag;
}

var encoder = $ESAPI.encoder();

function copyCellHtml(/* cpr.controls.Grid */ grd) {
	var htmlText = ["<tr>"];
	var pos = grd.getSelectedCellIndices();
	var oldRowIdx = -1;
	for(var idx = 0; idx < pos.length; idx++) {
		/** 
	     * @type cpr.controls.gridpart.selection.CellPosition
	    */
		var p = pos[idx];
		var cellIdx = p.cellIndex;
		var rowIdx = p.rowIndex;
		
		if(oldRowIdx == -1) {
			oldRowIdx = rowIdx;
		} else if(oldRowIdx !== rowIdx) {
			oldRowIdx = rowIdx;
			htmlText[htmlText.length] = "</tr><tr>";
		}
		
		var data = grd.getCellText(rowIdx, cellIdx);
		data = data ? encoder.encodeForHTML(data) : "";
		
		htmlText[htmlText.length] = "<td>";
		htmlText[htmlText.length] = data;
		htmlText[htmlText.length] = "</td>";
	}
	
	htmlText[htmlText.length] = "</tr>";
	
	return htmlText;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
//	app.lookup("grd1").addColumn({
//		columnLayout: [{
//			width: "100px"
//		}],
//		header : [{
//			constraint: {
//				rowIndex : 0,
//				colIndex : 3
//			},
//			configurator: function(cell){
//				cell.text = "headerText";
//			}
//		}],
//		detail: [{
//			constraint: {
//				rowIndex : 0,
//				colIndex : 3
//			},
//			configurator: function(cell){
//				cell.columnName = "column4";
//			}
//		}]
//	});

ExcelUtil.exportExcelToJSON("EXCEL_TEST.xls", "hey", app.lookup("grd1"));
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
	
	for(var i = 0 ; i < 100 ; i++)
	app.lookup("mdi1").addItemWithApp("202002/tester");
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
	
//	app.lookup("sms4").send();

}


var copyOption;
/*
 * 그리드에서 copy 이벤트 발생 시 호출.
 * Grid의 선택된 요소를 ctrl + c 로 복사했을 때 발생하는 이벤트.
 */
function onGrd1Copy(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	if (copyOption == "office"){
		console.log("ㅋㅋ");
		var selUnit = grd1.selectionUnit;
		
		e.preventDefault();
		
		copyHtml(grd1, selUnit);
	}
}


/*
 * 그리드에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrd1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	if(e.ctrlKey && e.altKey &&e.keyCode == "67"){
	
		copyOption = "office";		
	}
	if(e.ctrlKey && e.keyCode =="67" && !e.altKey) {
		
		copyOption = "common";
	}
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(app.lookup("asd").type);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
		
		
//	var a = [1,2,3,4,5,76];
//	
//	console.log(a.shift());
//	console.log(a);
	
	var fi1 = new cpr.controls.FileInput("aa");
	
	app.getContainer().addChild(fi1, {
		
		"left":"0px",
		"top":"0px",
		"width":"1px",
		"height":"1px"
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}

