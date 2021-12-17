/************************************************
 * high.js
 * Created at 2020. 3. 13. 오후 7:02:04.
 *
 * @author HANS
 ************************************************/

/**
 * Display a temporary label on the chart
 */
function toast(chart, text) {
    chart.toast = chart.renderer.label(text, 100, 120)
        .attr({
            fill: Highcharts.getOptions().colors[0],
            padding: 10,
            r: 5,
            zIndex: 8
        })
        .css({
            color: '#FFFFFF'
        })
        .add();

    setTimeout(function () {
        chart.toast.fadeOut();
    }, 2000);
    setTimeout(function () {
        chart.toast = chart.toast.destroy();
    }, 2500);
}

/**
 * Custom selection handler that selects points and cancels the default zoom behaviour
 */
function selectPointsByDrag(e) {

    // Select points
    Highcharts.each(this.series, function (series) {
        Highcharts.each(series.points, function (point) {
            if (point.x >= e.xAxis[0].min && point.x <= e.xAxis[0].max &&
                    point.y >= e.yAxis[0].min && point.y <= e.yAxis[0].max) {
                point.select(true, true);
            }
        });
    });

    // Fire a custom event
    Highcharts.fireEvent(this, 'selectedpoints', { points: this.getSelectedPoints() });

    return false; // Don't zoom
}

/**
 * The handler for a custom event, fired from selection event
 */
function selectedPoints(e) {
    // Show a label
    toast(this, '<b>' + e.points.length + ' points selected.</b>' +
        '<br>Click on empty space to deselect.');
        console.log(e);
}

/**
 * On click, unselect all points
 */
function unselectByClick() {
    var points = this.getSelectedPoints();
    if (points.length > 0) {
        Highcharts.each(points, function (point) {
            point.select(false);
        });
    }
}
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var putData = [];
	for(var i = 0 ; i < 10000; i++) {
		putData.push({"a" :Math.random()*100,"b": Math.random() *200});
	}
	
	Highcharts.chart(e.content, {

    chart: {
			type: 'column',
			height: 220,
			width: 328
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['30세' + '<br>' + '미만', '30~' + '<br>' + '39세', '40~' + '<br>' + '49세', '50~' + '<br>' + '59세', '60세' + '<br>' + '이상', '고객님'],
			lineWidth: 0,
			labels: {
				rotation: 0,
				style: {
					color: '#707070',
					fontSize: '14px',
					fontFamily: 'Noto Sans KR',
					fontWeight: "400",
					paddingTop: "10px"
				},
				formatter: function() {
					if ('고객님' === this.value) {
						return '<span style="fill: #3462f1; font-weight: 500;">' + this.value + '</span>';
					} else {
						return this.value;
					}
				}
			},
			reversed : true
		},
		yAxis: {
			title: {
				text: ''
			},
			visible: false,
			reversed : true
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderRadius: 5,
				pointWidth: 8
			}
		},
		
		legend: {
			symbolPadding: 1,
			floating: true, //범례를 차트 영역 위로 띄울 시 true 지정.
			align: 'left', //수평 정렬 지정
			verticalAlign: 'top', //수직 정렬 지정.
			symbolRadius: 10, //범례 심볼 radius 지정
			symbolWidth: 20,
			symbolHeight: 8,
			itemDistance: 5, //범례 간 간격 지정.
			itemStyle: {
				color: '#666666',
				fontSize: '12px',
				fontWeight: 'normal',
				fontFamily: 'Noto Sans KR'
			},
			x: -5,
		},
		
		series: [{
			name: '소득',
			color: '#3462f1',
			data: [10]
		}, {
			name: '지출',
			color: '#dddddd',
			data: [6]
		}]
});
}
