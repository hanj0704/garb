/************************************************
 * test2.js
 * Created at 2020. 1. 6. 오후 4:34:52.
 *
 * @author HANS
 ************************************************/


var momentStart;
/**
 * 
 * @param {Array} voRo
 */
function createGridInitConfig (voRow) {
		var vcNewDataSet = new cpr.data.DataSet("dsNew1");
		var vcGrid = app.lookup("grd1");
	var voKeys = _.keys(voRow[0]);
	var cols = [];
	voKeys.forEach(function(each){
		cols.push({"name" : each});
	});
	vcNewDataSet.parseData({
		"columns" : cols
	})

	vcNewDataSet.build(voRow);
	
	var voConfingInfo = vcGrid.getInitConfig();
	
	voConfingInfo.dataSet = vcNewDataSet;
	
	vcGrid.init(voConfingInfo);
	vcGrid.redraw();

	var endTime = moment();
	var k = moment(endTime,"YYYYMMDD HH:mm:ss");
	var kk = moment(momentStart,"YYYYMMDD HH:mm:ss");
	
	console.log(moment.duration(k.diff(kk)).asSeconds());
}

function transDataStruct (column1) {
	
	var vcDs = app.lookup("ds1");

	var vaColDatas = vcDs.getColumnData(column1);	
	
	var vaUniqData = _.uniq(vaColDatas);
	
	var voRow  = [];
	vaUniqData.forEach(function(each){
		
		var voRows = vcDs.findAllRow(column1+" == '"+each+"'");
		
		var voTempRow = {};
		voTempRow[column1] = each;
		voRows.forEach(function(eachs){
			
			var vsGroup = eachs.getValue("GROUP");
			voTempRow[vsGroup+"_CPU"] = eachs.getValue("CPU");
			voTempRow[vsGroup+"_MEMORY"] = eachs.getValue("MEMORY");
		});
		voRow.push(voTempRow);
	});
	
	createGridInitConfig(voRow);
	
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
	momentStart = moment();
//	console.log(momentStart);
	transDataStruct("R_DATE_TIME");
	
	
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var ds1 = app.lookup("ds1");
	
	var rowDatas=  [];
	var momentDate = moment("202002131000","YYYYMMDDhhmm");
	for(var i =0; i < 1000; i++) {
		var vsDate = momentDate.add(1,"minutes").format("YYYY-MM-DD HH:mm");
		rowDatas.push({"R_DATE_TIME" : vsDate,"GROUP" : "A", "CPU" : i,"MEMORY" :i});
		rowDatas.push({"R_DATE_TIME" : vsDate,"GROUP" : "B", "CPU" : i,"MEMORY" :i});
		rowDatas.push({"R_DATE_TIME" : vsDate,"GROUP" : "C", "CPU" : i,"MEMORY" :i});
		rowDatas.push({"R_DATE_TIME" : vsDate,"GROUP" : "D", "CPU" : i,"MEMORY" :i});
		rowDatas.push({"R_DATE_TIME" : vsDate,"GROUP" : "E", "CPU" : i,"MEMORY" :i});
	}
	
	
	ds1.build(rowDatas);
	
	console.log(ds1.getRowDataRanged());
}
