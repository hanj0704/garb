/************************************************
 * tester.js
 * Created at 2022. 8. 31. 오후 5:13:30.
 *
 * @author HANS
 ************************************************/

var moOptions = {
		
		grid : {
			top : 20,
			left : 40,
			right : 20,
			bottom : 70
		},
		legend : {
			data : []
		},
		tooltip: {
			trigger: 'axis',
//			formatter: function(params) {
//				params = params[0];
//				return params.axisValueLabel;
//			},
			axisPointer: {
				animation: false
			}
		},
		xAxis : {
			type : "time",
			axisLabel: {
				formatter: (function(value) {
					return moment(value).format("HH:mm:ss");
				})
			}
		},
		yAxis: {
			type: 'value',
			name : "1",
			boundaryGap: [0, '100%'],
			min : function(item){
				var vnMin = item.min;
				return Math.ceil((vnMin - Math.abs(vnMin*0.1)));
			},
			max : function(item) {
				var vnMax = item.max;
				return Math.ceil((vnMax + Math.abs(vnMax*0.1)));
			},
			splitLine: {
				show: false
			}
		},
		toolbox: {
			feature: {
				saveAsImage:{
				}	
			}
		},
		dataZoom :[{
			type : "inside",
			start : 50,
			end : 100
		},{
		}
		],
		series: []
}
	
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	drawChart();
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(e){
	var shl1 = e.control;
	var voShelDiv = e.content;
	if(voShelDiv) {
		e.preventDefault();
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(e){
	var shl1 = e.control;
	
	if(shl1.getComponent("content")) {
		return;
	}
	shl1.registerComponent("content", e.content);
}

function drawChart(){
	var poContent = app.lookup("shl1").getComponent("content");
	var voChart = echarts.init(poContent);
	
	var options = moOptions;
	voChart.setOption(options);
	
	app.lookup("shl1").registerComponent("chart", voChart);
	
}

function getRandoms(){
	
	var vaResult = [];
	for(var i = 0; i < 5; i++) {
		var a = Math.random()*10;
		vaResult.push(Math.floor(a));
	}
	return vaResult;
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	var psIOName = app.lookup("ipb1").value;
	/** @type echartInstance */
	var voChart = app.lookup("shl1").getComponent("chart");
	var voOption = voChart.getOption();
	/** @type Array */
	var vaSeries = voOption.series;
	var voLeg = {
		data : []
	}
	var voNewSeries = {
		name : psIOName,
		type : "line",
		symbol : "none",
		sampling : "lttb",
		data : getRandoms(),
		yAxisIndex : 0
	}
	
	if(vaSeries.length < 1) {
		vaSeries.push(voNewSeries);
	} else {
		
		var vbExist = vaSeries.every(function(each){
			return each.name != psIOName;
		});
		
		if(vbExist){
			
			 vaSeries.push(voNewSeries);
		}
		else {
			return;
		}
	}
	voLeg.data = vaSeries.map(function(each){
		return each.name;
	});
	voChart.setOption({
		series : vaSeries,
		legend : voLeg
	});
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
//	app.lookup("opt1").value = navigator.platform;
	var mds = new MobileDetect(navigator.userAgent);
	app.lookup("opt1").value = mds.mobile();
	app.lookup("opt2").value = mds.tablet();
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
//	var a = [[1,2,3,4,5],[6,7,8,9,10]];
//	
//	console.log(BFS(a,1));
//	console.log()	
	app.lookup("opt2").value = window.innerHeight;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var meta = document.getElementsByName("viewport");
	var item = meta.item(0);
	item.setAttribute("content", "width=1440,user-scalable=no");
}

//var tabT = false;
//var pre = null;
///*
// * 루트 컨테이너에서 touchstart 이벤트 발생 시 호출.
// * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
// */
//function onBodyTouchstart(e){
//	var group = e.control;
//	var now = moment();
//	var toc = e.touches;
//	app.lookup("opt1").value = toc.length;
//	if(pre == null) {
//		pre = now;
//	} else {
//		var a = moment.duration(now.diff(pre)).asMilliseconds();
//		app.lookup("opt2").value = a;
//		pre = null;
//		console.log(e);
//		if(a < 300) {
//			e.preventDefault();
////			var dbClick = new cpr.events.CMouseEvent("click");
////			e.targetControl.dispatchEvent(dbClick);
////			var touch = new cpr.events.CTouchEvent("touchstart");
////			e.targetControl.dispatchEvent(touch);
////			var tarC = e.targetControl;
////			if(tarC instanceof cpr.controls.Grid) {
////				tarC.setEditRowIndex(tarC.getSelectedRow());
////			}
////			e.stopPropagation();
//		}
// 		return;
//	}
//	
//	pre = now;
//}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	
	app.lookup("opt2").value = window.innerWidth;
}
