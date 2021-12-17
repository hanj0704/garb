/************************************************
 * chartTest.js
 * Created at 2021. 11. 11. 오후 5:22:48.
 *
 * @author HANS
 ************************************************/

var datas = [];
var now = new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;

function randomData() {
  var now = new Date(+now + oneDay);
  var value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  };
}
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var voContent = e.content;
	
	var myChart = echarts.init(voContent);
	

for (var i = 0; i < 1000; i++) {
  datas.push(randomData());
}
var options = {
  title: {
    text: 'Dynamic Data & Time Axis'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      data: datas
    }
  ]
};
myChart.setOption(options);
//setInterval(function () {
//  for (var i = 0; i < 5; i++) {
//    data.shift();
//    data.push(randomData());
//  }
//  myChart.setOption({
//    series: [
//      {
//        data: data
//      }
//    ]
//  });
//}, 1000);
}
