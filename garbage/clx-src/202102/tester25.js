/************************************************
 * tester25.js
 * Created at 2021. 2. 25. 오전 10:55:52.
 *
 * @author HANS
 ************************************************/

cpr.core.AppConfig.INSTANCE.setControlValue("container", {
		"useCustomScrollbar" : true
});

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
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
	var start = moment("202102","YYYYMM").startOf('month');
	var daystart = start.day();
	console.log(daystart);
	var end = moment("202102","YYYYMM").endOf("month");
	var dayend = end.day();
	console.log(dayend);
//	var dem = moment("20210207","YYYYMMDD").day();
//	console.log(dem);
	
	var firstweekdayLen = 7-daystart;
	var endweekdayLen = dayend +1;
	console.log(firstweekdayLen);
	console.log(endweekdayLen);
	
	var dayLeng = end.diff(start,"days")+1;
	console.log(dayLeng);
	var a = dayLeng - firstweekdayLen - endweekdayLen;
	console.log(a);
	var b = a/7;
	
	var leng = b;
	
	var cont = new cpr.controls.Container();
	var lay = new cpr.controls.layouts.FormLayout();
	
	lay.setColumns([firstweekdayLen+"fr"]);
	
	for(var i = 0 ; i < leng ; i++) {
		
		lay.insertColumns(["7fr"]);
	}
	lay.insertColumns([endweekdayLen+"fr"]);
	
	lay.setRows(["30px"]);
	lay.verticalSeparatorWidth = 1;
	lay.horizontalSeparatorWidth = 1
	cont.setLayout(lay);
	
	cont.style.css("border","solid 1px black");
	
	app.floatControl(cont,{
		top :  "100px",
		left : "100px",
		width: "300px",
		height:"32px"
	});
	
	console.log(lay.getColumns());
		
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
	var start = moment("202110","YYYYMM").startOf('month');
	var daystart = start.day();
	console.log(daystart);
	var end = moment("202110","YYYYMM").endOf("month");
	var dayend = end.day();
	console.log(dayend);
	var firstweekdayLen = 7-daystart;
	var endweekdayLen = dayend +1;
	console.log(firstweekdayLen);
	console.log(endweekdayLen);
	
	var dayLeng = end.diff(start,"days")+1;
	console.log(dayLeng);
	var a = dayLeng - firstweekdayLen - endweekdayLen;
	console.log(a);
	var b = a/7;
	
	var leng = b;
	
	var cont = app.lookup("grpZone2");
	var lay = cont.getLayout();
	
	lay.setColumns([firstweekdayLen+"fr"]);
	
	for(var i = 0 ; i < leng ; i++) {
		
		lay.insertColumns(["7fr"]);
	}
	lay.insertColumns([endweekdayLen+"fr"]);
	
	lay.verticalSeparatorWidth = 1;
	lay.horizontalSeparatorWidth = 1
	cont.setLayout(lay);
	
	console.log(lay.getColumns());
		
}


/*
 * "Output" 아웃풋(opt1)에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onOpt1Mouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var opt1 = e.control;
	
	console.log("mouseEnder");
}


/*
 * 그리드에서 cell-mouseover 이벤트 발생 시 호출.
 * Grid의 Cell mouseover시 발생하는 이벤트.
 */
function onGrd1CellMouseover(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
}
