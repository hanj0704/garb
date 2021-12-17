/************************************************
 * charts.js
 * Created at 2021. 1. 25. 오전 9:59:35.
 *
 * @author HANS
 ************************************************/

var moChart;


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var vcChartCn = e.content;
	 var options = {
          series: [{
            name: "TICKS",
            data: []
        }],
          chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true,
            type :"x"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
//		xaxis: {
//          type: 'category',
////          min: moment().valueOf(),
////          tickAmount: 6,
//          labels :{
//          	format : "HH:mm:ss"
//          }
//        }
xaxis: {
          type: 'category',
          labels : {
          	formatter : function(val){
          		return moment(val).format("hh:mm:ss")
          	}
          }
        },
        };
	
	moChart = new ApexCharts(vcChartCn, options);
	moChart.render();
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	var ds = app.lookup("ds1");
	
	ds.addRowData({
	"column2" : Math.round(Math.random()*10),
	"column1" : moment().valueOf()
		});
	
	var col1 = ds.getColumnData("column1");
	var col2 = ds.getColumnData("column2");
	
	var datas = [];
	
	col1.forEach(function(each,idx){
		datas.push([col1[idx],col2[idx]]);
	});
	moChart.updateSeries([{
  data: datas
}])
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	setInterval(function(){
		onBtn1Click(e);
	}, 1000);
	
}
