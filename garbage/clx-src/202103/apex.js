/************************************************
 * apex.js
 * Created at 2021. 3. 23. 오전 11:29:24.
 *
 * @author HANS
 ************************************************/



/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	  var options = {
	  	colors : ['#2E93fA', '#66DA26', '#546E7A', '#E91E63','#008FFB','#00E396','#FEB019','#FF4560','#775DD0','#3F51B5','#03A9F4','#4CAF50',
	  	'#F9CE1D',"#FF9800",'#33B2DF'],
          series: [{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14]
        }, {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8]
        }, {
          name: 'PRODUCT E',
          data: [21, 7, 25, 13, 22, 8]
        }, {
          name: 'PRODUCT F',
          data: [21, 7, 25, 13, 22, 8]
        }, {
          name: 'PRODUCT G',
          data: [21, 7, 25, 13, 22, 8]
        }, {
          name: 'PRODUCT H',
          data: [21, 7, 25, 13, 22, 8]
        }, {
          name: 'PRODUCT I',
          data: [21, 7, 25, 13, 22, 8]
        }, {
          name: 'PRODUCT J',
          data: [21, 7, 25, 13, 22, 8]
        }],
          chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
        };

        var chart = new ApexCharts(e.content, options);
        chart.render();
      
      
}

