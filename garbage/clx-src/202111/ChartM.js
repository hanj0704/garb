/************************************************
 * ChartM.js
 * Created at 2021. 10. 25. 오후 4:34:59.
 *
 * @author HANS
 ************************************************/

var util = createCommonUtil();
var maPageId = app.app.id.split("/");
var msPageId = maPageId[maPageId.length-1];


function createDragSourceFeedback() {
	var feedback = new cpr.controls.Output();
	feedback.ellipsis = true;
	feedback.style.css({
		"opacity": "0.8",
		"width": "50px",
		"height": "25px",
		"border": "solid 1px red",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedback;
}

/**
 * 파라미터의 컨트롤을 드래그 가능하도록 드래그 소스를 지정하는 함수.
 * @param {cpr.controls.UIControl} control
 */
function createDragSource(control) {
		var feedback = null;
	var actualRect = null;
	new cpr.controls.DragSource(control, {
		options: {
			dataType: "chart",
			threadhold: 10
		},
		onDragStart: function(context) {

				context.cursor = "grabbing";
				feedback = createDragSourceFeedback();
				control.style.css("opacity", " 0.5");
				var voTargetItem = context.targetItem;
				context.data = {
					label : voTargetItem["label"],
					value : voTargetItem["value"]
				}
//				context.data = context.sourceTargetObject;
				feedback.value = voTargetItem["label"];

				var voDragStartLoca = context.dragStartLocation;
				var voHostRect = app.getHost().getActualRect();
				actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x - voHostRect.left, voDragStartLoca.y - voHostRect.top, control.getActualRect().width, 25);
				app.floatControl(feedback, actualRect);
				context.source = null;
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			var newRect = actualRect.getTranslated(context.dragDelta);
			app.floatControl(feedback, newRect);
			//cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect)
		},
		onDragEnd: function(context) {
			context.cursor = "";
			feedback.dispose();
			feedback = null;
			control.style.removeStyle("opacity");
		}
	});
}

function createDropTarget(control){
	var dropTarget = new cpr.controls.DropTarget(control, {
		isImportant: function(source) {
			return source.dataType == "chart";
		},
		onDragEnter: function(context) {
			context.target.control.style.css("border","solid 1px red");
		},
		onDragLeave: function(context) {
			context.target.control.style.removeStyle("border");
		},
		onDragMove: function(context) {
		},
		onDrop: function(context) {
			context.target.control.style.removeStyle("border");
			
//			app.lookup("dyna2").targetIOName = context.data["value"];
//			app.lookup("dyna2").drawChart();
			app.lookup("dyna2").addSeries(context.data["value"]);
		}
	});
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	app.lookup("dyna1").targetIOName = "AR__RobotTrackRatio";
//	app.lookup("dyna1").drawChart();
	
	
	createDragSource(app.lookup("lbx1"));
	createDropTarget(app.lookup("dyna2"));
}



///*
// * 쉘에서 init 이벤트 발생 시 호출.
// */
//function onUIControlShellInit(/* cpr.events.CUIEvent */ e){
//	/** 
//	 * @type cpr.controls.UIControlShell
//	 */
//	var uIControlShell = e.control;
//	if(e.content) {
//		e.preventDefault();
//	}
//}

///*
// * 쉘에서 load 이벤트 발생 시 호출.
// */
//function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
//	/** 
//	 * @type cpr.controls.UIControlShell
//	 */
//	var uIControlShell = e.control;
//	var voContent = e.content;
//	
//	if(uIControlShell.getComponent("content")){
//		
//		return;
//	}
//	uIControlShell.registerComponent("content", e.content);
//	
//	
//	var charter = echarts.init(voContent);
//	var option = {
//			grid : {
//			top : 20,
//			left : 40,
//			right : 20,
//			bottom : 70
//		},
//		title : {
//			visible : false
//		},
////		tooltip : {
////			trigger : "axis"
////		},
//		tooltip: {
//			trigger: 'axis',
//			formatter: function(params) {
//				params = params[0];
//				return params.axisValueLabel;
//			},
//			axisPointer: {
//				animation: false
//			}
//		},
//		xAxis : {
////			type : "time",
////			axisLabel: {
////				formatter: (function(value) {
////					return moment(value).format("HH:mm:ss");
////				})
////			},
////			interval : 4
//			type : "category",
//			data : [a2.format("HH:mm:ss"),a3.format("HH:mm:ss"),a4.format("HH:mm:ss")]
//		},
//		yAxis : {
//			type : "value"
//		},
//		dataZoom :[{
//			type : "inside",
//			start : 50,
//			end : 100
//		},{
//		}
//		],
//		series : [
//			{
//			  name: 'qq',
//            type: 'line',
//            symbol: 'none',
////            sampling: 'lttb',
//            itemStyle: {
//                color: 'rgb(45, 59, 141)'
//            },
//			data: [1,2,3]
//		}
//		]
//	}
//	
//	charter.setOption(option);
//}


/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onUIControlShellInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	
//	if(e.content) {
//		e.preventDefault();
//	}
}

var datAA = [];
var oneDay = 1000;
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
//	if(shl1.getComponent("content")){
//		
//		return;
//	}
//	shl1.registerComponent("content", e.content);
//	
//	
//	var charter = echarts.init(e.content);
//	
////	var option = {
////		grid : {
////			top : 20,
////			left : 40,
////			right : 20,
////			bottom : 70
////		},
////		title : {
////			visible : false
////		},
////		tooltip: {
////			trigger: 'axis',
//////			formatter: function(params) {
//////				params = params[0];
//////				return params.axisValueLabel;
//////			},
////			axisPointer: {
////				animation: false
////			}
////		},
////		xAxis : {
////			type : "time",
////			axisLabel: {
////				formatter: (function(value) {
////					return moment(value).format("HH:mm:ss");
////				})
////			},
////			splitLine: {
////    		  show: false
////  		  }
////		},
////		yAxis : {
////			type : "value",
////			splitLine: {
////      show: false
////    }
////		},
////		dataZoom : [
////			[{start : 0,
////			end : 100},{}]
////		],
////		series : [
////			{
////			  name: 'qq',
////            type: 'line',
////           showSymbol: false,
////            sampling: 'lttb',
////            itemStyle: {
////                color: 'rgb(45, 59, 141)'
////            },
////			data: []
////		}
////		]
////	}
//var now = moment()
//var value = Math.random() * 100;
//function randomData(){
//	now = now.add(1, "s");
//	value = Math.random() * 21 - 10;
//	return{
//		name : now.toString(),
//		value : [
//			now.toDate(),Math.round(value)
//		]
//	}
//}
//
//	for(var i = 0; i < 14400;i++){
//		
//		datAA.push(randomData());
//	}
//
//	var option = {
//  title: {
//    text: 'Dynamic Data & Time Axis'
//  },
//  tooltip: {
//    trigger: 'axis',
//    axisPointer: {
//      animation: false
//    }
//  },
//  dataZoom : [{start:0,end:100},{}],
//  xAxis: {
//    type: 'time',
//    splitLine: {
//      show: false
//    }
//  },
//  yAxis: {
//    type: 'value',
//    boundaryGap: [0, '100%'],
//    splitLine: {
//      show: false
//    }
//  },
//  series: [
//    {
//      name: 'qq',
//      type: 'line',
//      showSymbol: false,
//      data: datAA
//    }
//  ]
//};
//console.log(datAA)
//setInterval(function(){
////		for(var i = 0; i < 5 ; i++){
//			
//			datAA.shift();
//		datAA.push(randomData());
////		}
//		charter.setOption({
//			 series: [{
//			 data: datAA
//			 }]
//			 })
//	}, 1000)
//	
//	charter.setOption(option);
//	
//	shl1.registerComponent("cart", charter);
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
	
	var chart = app.lookup("shl1").getComponent("cart");
	var nows = moment();
	for(var i = 0; i < 14400;i++){
		
		var data = Math.round(Math.random()*100);
		nows = nows.add(1, "s");
		var pusher = [nows.toDate(),data];
		datAA.push(pusher);
	}

	chart.setOption({
		series : [{
			data : datAA
		}]
	})
	
	setInterval(function(){
		for(var i = 0; i < 5 ; i++){
			
		var data = Math.round(Math.random()*100);
		nows = nows.add(1, "s");
			datAA.shift();
		datAA.push([nows.toDate(),data]);
		}
		chart.setOption({
			 series: [{
			 data: datAA
			 }]
			 })
	}, 1000)
//	/** @type Array */
//	var dat = a.series[0].data;
//	dat.push([moment().toDate(),15]);
//	chart.setOption({
//		series : [{
//			name : "qq",
//			data : dat
//			}
//		]
//	})
//	
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
	
	console.log(app.lookup("dyna2").getOption());
}


/*
 * "windowOpen" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	window.open("./app/cmn/chart/popupLeader.clx", "_blank", "menubar=no,status=no,toolbar=no");
	window.stompHan = stomp;
}
