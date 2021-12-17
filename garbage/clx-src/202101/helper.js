/************************************************
 * helper.js
 * Created at 2021. 1. 21. 오후 3:20:56.
 *
 * @author HANS
 ************************************************/


var start = null;
/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	start = moment().valueOf();
	
	var indx = app.lookup("nbe1").numberValue;
	var vaData = []
	for(var i = 0 ; i < indx ; i++) {
		
		var voRow = {
			"column1" :"aaaaaaaa",
			"column2" :"aaaaaaaa",
			"column3" :"aaaaaaaa",
			"column4" :"aaaaaaaa",
			"column5" :"aaaaaaaa",
			"column6" :"aaaaaaaa",
			"column7" :"aaaaaaaa",
			"column8" :"aaaaaaaa",
			"column9" :"aaaaaaaa",
			"column10" :"aaaaaaaa",
			"column11" :"aaaaaaaa",
			"column12" :"aaaaaaaa",
			"column13" :"aaaaaaaa",
			"column14" :"aaaaaaaa",
			"column15" :"aaaaaaaa",
			"column16" :"aaaaaaaa",
			"column17" :"aaaaaaaa",
			"column18" :"aaaaaaaa",
			"column19" :"aaaaaaaa",
			"column20" :"aaaaaaaa",
			"column21" :"aaaaaaaa",
			"column22" :"aaaaaaaa",
			"column23" :"aaaaaaaa",
			"column24" :"aaaaaaaa",
			"column25" :"aaaaaaaa",
			"column26" :"aaaaaaaa",
			"column27" :"aaaaaaaa",
			"column28" :"aaaaaaaa",
			"column29" :"aaaaaaaa",
			"column30" :"aaaaaaaa",
			"column31" :"aaaaaaaa",
			"column32" :"aaaaaaaa",
			"column33" :"aaaaaaaa",
			"column34" :"aaaaaaaa",
			"column35" :"aaaaaaaa",
			"column36" :"aaaaaaaa",
			"column37" :"aaaaaaaa",
			"column38" :"aaaaaaaa",
			"column39" :"aaaaaaaa",
			"column40" :"aaaaaaaa",
			"column41" :"aaaaaaaa",
			"column42" :"aaaaaaaa",
			"column43" :"aaaaaaaa",
			"column44" :"aaaaaaaa",
			"column45" :"aaaaaaaa",
			"column46" :"aaaaaaaa",
			"column47" :"aaaaaaaa",
			"column48" :"aaaaaaaa",
			"column49" :"aaaaaaaa",
			"column50" :"aaaaaaaa",
			"column51" :"aaaaaaaa",
			"column52" :"aaaaaaaa",
			"column53" :"aaaaaaaa",
			"column54" :"aaaaaaaa",
			"column55" :"aaaaaaaa",
			"column56" :"aaaaaaaa",
			"column57" :"aaaaaaaa",
			"column58" :"aaaaaaaa",
			"column59" :"aaaaaaaa",
			"column60" :"aaaaaaaa",
			"column61" :"aaaaaaaa",
			"column62" :"aaaaaaaa",
			"column63" :"aaaaaaaa",
			"column64" :"aaaaaaaa",
			"column65" :"aaaaaaaa",
			"column66" :"aaaaaaaa",
			"column67" :"aaaaaaaa",
			"column68" :"aaaaaaaa",
			"column69" :"aaaaaaaa",
			"column70" :"aaaaaaaa",
			"column71" :"aaaaaaaa",
			"column72" :"aaaaaaaa",
			"column73" :"aaaaaaaa",
			"column74" :"aaaaaaaa",
			"column75" :"aaaaaaaa",
			"column76" :"aaaaaaaa",
			"column77" :"aaaaaaaa",
			"column78" :"aaaaaaaa",
			"column79" :"aaaaaaaa",
			"column80" :"aaaaaaaa",
			"column81" :"aaaaaaaa",
			"column82" :"aaaaaaaa",
			"column83" :"aaaaaaaa",
			"column84" :"aaaaaaaa",
			"column85" :"aaaaaaaa",
			"column86" :"aaaaaaaa",
			"column87" :"aaaaaaaa",
			"column88" :"aaaaaaaa",
			"column89" :"aaaaaaaa",
			"column90" :"aaaaaaaa",
			"column91" :"aaaaaaaa",
			"column92" :"aaaaaaaa",
			"column93" :"aaaaaaaa",
			"column94" :"aaaaaaaa",
			"column95" :"aaaaaaaa",
			"column96" :"aaaaaaaa",
			"column97" :"aaaaaaaa",
			"column98" :"aaaaaaaa",
			"column99" :"aaaaaaaa",
			"column100" :"aaaaaaaa"
			
			
		};
		
		vaData.push(voRow);
	}
	start = moment().valueOf();
	app.lookup("dsList").build(vaData);
	console.log("BUILD DONE");
	console.log(moment.duration(moment().valueOf()-start)/1);
}



var now = null;
/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var grd = app.lookup("grd2");
	
	var initC = grd.getInitConfig();
	initC.dataSet = app.lookup("dsList");
	
	now = moment().valueOf();
	grd.init(initC);
	grd.insertRow(0, true);
}


/*
 * 그리드에서 insert 이벤트 발생 시 호출.
 * Grid의 행이 추가되었을 때 이벤트.
 */
function onGrd2Insert(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
	console.log("INIT AND INSERTED!");
	console.log(moment.duration(moment().valueOf()-now)/1);
}
