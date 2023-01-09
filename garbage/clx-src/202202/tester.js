/************************************************
 * tester.js
 * Created at 2022. 2. 3. 오후 1:34:02.
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
	var grd = app.lookup("grd1");
	
	var a = grd.getColumnLayout();
	console.log(a);
	grd.redraw();
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var grd = app.lookup("grd1");
//
//	var a = grd.columnCount;
//	console.log(a);
//	var b = grd.detail.cellCount;
//	console.log(b);
//	var c = grd.detail.getColumnByName("parentV");
//	console.log(c[0].cellIndex);
	grd.addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header : [{
			constraint: {
				rowIndex : 0,
				colIndex : 1
			},
			configurator: function(cell){
				cell.text = "headerText";
			}
		}],
		detail: [{
			constraint: {
				rowIndex : 0,
				colIndex : 1
			},
			configurator: function(cell){
				cell.columnName = "parentV";
			}
		}]
	});
	grd.redraw();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	app.lookup("sms1").send();
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
	
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var grd = app.lookup("grd1");
	grd.setRowState(0, cpr.data.tabledata.RowState.UNCHANGED);
	
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var ds = app.lookup("ds1");
	console.log(ds.getOriginalValue(0, "column1"))
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	app.lookup("ds1").revert();
}


/*
 * "sub Send" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	app.lookup("sms1").send();
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
	app.lookup("mdi1").addItemWithApp("202202/testMan");
}


/*
 * "href" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	
	window.location.href = "http://localhost:8080/202202/testMan.clx";
}


/*
 * "버
 * 튼" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	var val = btn10.value;
	console.log(val);
	console.log(val.toString())
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	var file = fi1.file;
	app.lookup("sms2").addFileParameter("file1", file);
	
}


/*
 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
	app.lookup("sms2").send();
}


/*
 * "Button" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn12 = e.control;
	
	app.lookup("sms3").send();
}


/*
 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
	
	var posts = new cpr.protocols.HttpPostMethod("http://localhost:8080/tes/page.do", "_self");
	
	posts.submit();
}

var i  = 0;
/*
 * "matrix" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	if( i == 0) {
		
	app.lookup("msm1").addRequestData("header"+i, {
//	app.lookup("msm1").addRequestData(null, {
		"data" : 1,
		"bb" : "222",
		"cc" : [
			1,2,3,4
		],
		"dd" : [
			{
				"aq" : 1,
				"bq" : "기기"
			}
			,{
				"aq" : 2,
				"bq" : "나나"
			}
			,{
				"aq" : 3,
				"bq" : "댜댜"
			}
		]
	});
	}
//	app.lookup("msm1").addRequestData("rowSize", 1);
	i++;
	var msm = app.lookup("msm1");
	
	app.lookup("msm1").send();
}


/*
 * "Button" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn15 = e.control;
	var pg = app.lookup("pgi1");

//	console.log(pg.startPageIndex);
//	console.log(pg.viewPageCount);
//	pg.startPageIndex = pg.startPageIndex + pg.viewPageCount;
//	console.log(pg.startPageIndex);
	pg.currentPageIndex = 6;
	pg.startPageIndex = 6;
}
