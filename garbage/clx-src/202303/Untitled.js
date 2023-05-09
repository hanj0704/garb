/************************************************
 * Untitled.js
 * Created at 2023. 3. 24. 오후 5:48:00.
 *
 * @author HANS
 ************************************************/
var tooltipDisplay = ""
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	cpr.core.ResourceLoader.loadScript("https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js").then(function(input) {
		app.lookup("shl1").addEventListener("load", function(e) {
			var myChart = echarts.init(e.content, null, { renderer: 'svg' });
			var tooltipDisplay = ""

option = {
  grid: {
     top: '10px',
     bottom: '40px',
     left: '100px',
     right: '100px',
  },
  tooltip: {
    trigger: 'item',
    formatter : (params) => {
      return tooltipDisplay;
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      showSymbol: false,
      triggerLineEvent: true,
    },
    {
      name: 'Search Engine',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      showSymbol: false,
      triggerLineEvent: true
    }
  ]
};

myChart.on('mouseover', function(params) {
  if(params.componentSubType == "line"){
    tooltipDisplay = params.seriesName
  }
});

myChart.on('mouseout', function(params) {
  tooltipDisplay = ''
});

myChart.setOption(option)
//			var option = {
//				textStyle: {
//					fontFamily: 'KBFGText, KBFGDisplay, sans-serif',
//					fontSize: 11
//				},
//				legend: {
//					show: false
//				},
//				grid: {
//					left: 0,
//					top: 35,
//					right: 23,
//					bottom: 19,
//					containLabel: true
//				},
//				toolbox: {},
//				xAxis: {
//					type: 'category',
//					boundaryGap: true,
//					nameGap: 0,
//					axisTick: {
//						show: false
//					},
//					axisLine: {
//						lineStyle: {
//							color: '#c5cee3'
//						}
//					},
//					axisLabel: {
//						color: '#666666',
//						fontWeight: '500',
//						verticalAlign: 'top',
//						margin: 12,
//						interval: 0,
//					},
//					data: [
//						'22년 4월',
//						'22년 5월',
//						'22년 6월',
//						'22년 7월',
//						'22년 8월',
//						'22년 9월',
//						'22년 10월',
//						'22년 11월',
//						'22년 12월',
//						'23년 1월',
//						'23년 2월',
//						'23년 3월'
//					]
//				},
//				yAxis: {
//					type: 'value',
//					min: 0,
//					max: 120,
////					axisLine: {
////						symbol: 'none'
////					},
//					axisLabel: {
//						color: '#666666',
//						fontWeight: '500',
//						align: 'left',
//						padding: [0, 12, 0, 0]
//					}
//				},
//				tooltip: {
//					show: true,
//					className: 'chart-tooltip',
////					position: function(point, params, dom, rect, size) {
////						// fixed at top
//						//debugger;
////						return [point[0], '10%'];
////					},
//					formatter: function(param){
//						return tooltipDisplay;
//					},
//					triggerOn: 'mousemove',
//					axisPointer: {
//						type: 'none'
//					},
//					backgroundColor: '#ffffff',
//					borderColor: '#c5cee3',
//					borderWidth: 1,
//					padding: [2, 5, 2, 5],
//					textStyle: {
//						color: '#222222',
//						fontSize: 12
//					},
//					extraCssText: 'border-radius: 6px; box-shadow: 0 2px 4px 0 rgba(51, 51, 51, 0.15);'
//				},
//				series: [{
//						name: '대내민원',
//						type: 'line',
//						data: [44, 64, 48, 48, 44, 52, 38, 41, 25, 37, 37, 23],
//						symbol: 'none',
//						 triggerLineEvent: true,
////						showSymbol : false,
////						symbolSize: 0.01,
//						lineStyle: {
//							color: '#4366f8',
//							width: 2,
//							cap: 'round',
//							markLine: {
//								symbol: 'none'
//							}
//						},
//					},
//					{
//						name: '대외민원',
//						type: 'line',
//						data: [78, 69, 68, 79, 63, 70, 55, 62, 60, 60, 44, 61],
////						symbol: 'none',
////						lineStyle: {
////							color: '#ffcc00',
////							width: 2,
////							cap: 'round'
////						}
//					},
//					{
//						name: '품질보증',
//						type: 'line',
//						data: [32, 38, 38, 28, 50, 40, 45, 35, 18, 25, 20, 10],
////						symbol: 'none',
////						lineStyle: {
////							color: '#a2abc6',
////							width: 2,
////							cap: 'round'
////						}
//					}
//				]
//			};
//			myChart.setOption(option);
			

// Called when your mouse hover an object (params : the object you hover)
//myChart.on('mouseover', function(params) {
//  // Check if it's hovering a line
//  if(params.componentSubType == "line"){
//  	console.log("하하");
//    // get hovered line series name
//    tooltipDisplay = params.seriesName
//  }
//});
//
////Called when your mouse leaves an object (params : the object you leave)
//myChart.on('mouseout', function(params) {
//  tooltipDisplay = ''
//});
		});
//		
		app.lookup("shl1").redraw();
	});
}
