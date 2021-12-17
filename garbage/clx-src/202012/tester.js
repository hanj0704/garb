/************************************************
 * tester.js
 * Created at 2020. 11. 30. 오후 1:29:31.
 *
 * @author HANS
 ************************************************/

cpr.expression.ExpressionEngine.INSTANCE.registerFunction("calcBgCol", function(psValue,psColNm,pcCtrl){
	
	/** @type cpr.controls.Grid */
	var vcGrid = pcCtrl;
	
	var vcDs = vcGrid.dataSet;
	
	var a = vcDs.getUnfilteredDistinctValues(psColNm);
	var z = a.indexOf(psValue);
	console.log(z);
	if(z%2 == 0) {
		return "blue";
	} else {
		return "red";
	}
});


function abc(){
	return new Promise(function(resolve, reject) {
		worker.onmessage = function(e) {
			/** @type Blob */
			var blob = e.data; // blob
			console.log(e.data);
			console.log("메세지 worker.onmessage2");
			delete worker.onmessage;
			resolve(blob);
		}
		console.log("메세지 worker.onmessage3");
		worker.postMessage("hello");
	});
}
var worker;



/*
 * MDI 폴더에서 content-init 이벤트 발생 시 호출.
 * TabItem의 Content가 그려질 준비를 마쳤을 때 호출되는 이벤트로 컨트롤을 그리는 스크립트가 동작한 후 호출됨.
 */
function onMdi1ContentInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	console.log("INIT");
	
}


/*
 * MDI 폴더에서 content-load 이벤트 발생 시 호출.
 * TabItem의 Content가 그려지고 브라우저에 표현되기 직전에 호출됨.
 */
function onMdi1ContentLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	console.log("LOAD");
}


/*
 * MDI 폴더에서 content-ready 이벤트 발생 시 호출.
 * TabItem의 Content가 그려질 준비를 마쳤을 때 호출되는 이벤트로 컨트롤을 그리는 스크립트가 동작하기 전에 호출됨.
 */
function onMdi1ContentReady(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	console.log("READY");
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
	
	var a = [{
		"idb":"column11",
		"column2":"column21"
	},{
		"idb":"column12",
		"column2":"column22"
	},{
		"idb":"column13",
		"column2":"column23"
	},{
		"idb":"column14",
		"column2":"column24"
	},{
		"idb":"column15",
		"column2":"column25"
	}
	]
	app.lookup("ds3").build(a);
	
	
}


/*
 * MDI 폴더에서 close 이벤트 발생 시 호출.
 * 탭 아이템을 닫을 때 발생하는 이벤트이며, 사용자가 취소할 수 있습니다.
 */
function onMdi1Close(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	
	console.log("close");
	
	var items = mdi1.getTabItems();
	
	console.log(items);
	var item = items.filter(function(each){
		return each.text == "flowChart.clx";
	})[0];
	if(items.length == 2 && item) {
		
		item.visible = false;
		mdi1.setSelectedTabItem(item);
	}
}

var aq ;
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(app.lookup("ds3").getColumnNames());
	aq = app.lookup("ds3").getColumnNames();
	
}


/*
 * "copyDataSet" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var ds2 = app.lookup("ds2");
	var ds3 = app.lookup("ds3");
	
	
	ds2.copyToDataSet(ds3);
	
}


/*
 * "ds3 colNm" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var a = app.lookup("ds3").getColumnNames;
	console.log(a);
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
	
	var a = [1,2,3,4,5];
	a.splice(1,0,a[1]);
	a.splice(3,0,a[3]);
	console.log(a);
}


/*
 * "ds5 filter" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	app.lookup("ds5").setFilter("column1 ==3");
}


/*
 * "ds5 getRowData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var a = app.lookup("ds5").getRowDataRanged();
	console.log(a);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("smsSend").send();
}


/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSmsSendBeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var smsSend = e.control;
//	app.lookup("ds5").forEachOfUnfilteredRows(function(DataRow){
//		DataRow.setAttr("rowIndex", DataRow.getIndex());
//		
//	});
	var a = app.lookup("ds5").getUnfilteredRowDatasByState(cpr.data.tabledata.RowState.ALL);
	console.log(a[cpr.data.tabledata.RowState.INSERTED]);
	console.log(Object.keys(a));
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick9(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grd1").insertRow(0, true);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick11(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
//	var a = new cpr.events.CKeyboardEvent("keydown");
//	app.dispatchEvent(a);
	document.dispatchEvent(new KeyboardEvent("keydown",{key:"Meta"}));
}


/*
 * 루트 컨테이너에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(/* cpr.events.CKeyboardEvent */ e){
	console.log(e);
	console.log("ㅋㅋ");
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	document.addEventListener("keydown", function(event){
		
		console.log(event.key);
	});
}


/*
 * 파일 업로드에서 sendbutton-click 이벤트 발생 시 호출.
 * 파일을 전송하는 button을 클릭 시 발생하는 이벤트. 서브미션을 통해 전송 버튼에 대한 구현이 필요합니다.
 */
function onFud1SendbuttonClick(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick12(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var fi = app.lookup("fud1");
	
	var a = fi.getFiles();
	fi.addUploadedFile(a[0]);
	fi.removeFile(a[0]);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick13(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("fud1").getFiles().forEach(function(each){
		console.log(each instanceof cpr.controls.UploadedFile);
	});
}


/*
 * 파일 업로드에서 add-file 이벤트 발생 시 호출.
 * 파일 추가 후 발생하는 이벤트입니다.
 */
function onFud1AddFile(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
	console.log("쿄쿄쿄");
//	aqqq();
}




/*
 * 파일 업로드에서 add-before-file 이벤트 발생 시 호출.
 * 파일을 추가 하기전에 발생하는 이벤트입니다. event.preventDefault()를 하면 파일을 추가하지 않습니다.
 */
function onFud1AddBeforeFile(/* cpr.events.CFileUploadEvent */ e){
	/** 
	 * @type cpr.controls.FileUpload
	 */
	var fud1 = e.control;
	console.log("ㅋㅋ");
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
	
	var a = [1,2,3,4,5,6,7,8,9];
	
}
