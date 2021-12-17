/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onUIControlShellInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	// chart가 새로 그려지기 전에 기존에 echart 관련 객체가 있으면 삭제한다.
	var shellDiv = e.content;
	if(shellDiv){
		var instance = echarts.getInstanceByDom(shellDiv);
		if(instance){
			instance.dispose();
		}
	}
	if(!e.content){
		window.addEventListener("resize",function(){resizeChart()});
	}
}

var myChart = null;
function resizeChart(){
	if(myChart){
		myChart.resize();
	}
}
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	console.log("load");
	// div에 echart를 입히는 코드
	var shellDiv = e.content;
	if(!shellDiv){
		return;
	}
	myChart = echarts.init(shellDiv);
	myChart.resize();
	var option = {
		 title : {
        text: '제목',
        subtext: '부제',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
//    legend: {
//        orient: 'vertical',
//        left: 'left',
//        data: ["범례1",'범례2','범례3','범례4','범례4']
//    },
    series : [
        {
            name: '시리즈명',
            type: 'pie',
            radius : '70%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:"범례1"},
                {value:310, name:'범례2'},
                {value:234, name:'범례3'},
                {value:135, name:'범례4'},
                {value:1548, name:'범례5'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
	};
	myChart.setOption(option);
	
	
	
	/*
	 * option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['利润', '支出', '收入']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    series : [
        {
            name:'收入',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            data:[320, 302, 341, 374, 390, 450, 420]
        },
        {
            name:'支出',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                }
            },
            data:[-120, -132, -101, -134, -190, -230, -210]
        }
    ]
};
	 * 
	 */
}


/*
 * 쉘에서 dispose 이벤트 발생 시 호출.
 * 컨트롤이 dispose될 때 호출되는 이벤트.
 */
function onUIControlShellDispose(/* cpr.events.CEvent */ e){
	window.removeEventListener("resize",resizeChart);
	myChart = null;
}
