/*
 * App URI: 202012/apCt
 * Source Location: 202012/apCt.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202012/apCt", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Untitled.js
			 * Created at 2020. 12. 28. 오후 3:41:32.
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
			          series: [
			          {
			            data: [
			              {
			                x: 'Analysis',
			                y: [
			                  new Date('2019-02-27').getTime(),
			                  new Date('2019-03-04').getTime()
			                ],
			                fillColor: '#008FFB'
			              },
			              {
			                x: 'Design',
			                y: [
			                  new Date('2019-03-04').getTime(),
			                  new Date('2019-03-08').getTime()
			                ],
			                fillColor: '#00E396'
			              },
			              {
			                x: 'Coding',
			                y: [
			                  new Date('2019-03-07').getTime(),
			                  new Date('2019-03-10').getTime()
			                ],
			                fillColor: '#775DD0'
			              },
			              {
			                x: 'Testing',
			                y: [
			                  new Date('2019-03-08').getTime(),
			                  new Date('2019-03-12').getTime()
			                ],
			                fillColor: '#FEB019'
			              },
			              {
			                x: 'Deployment',
			                y: [
			                  new Date('2019-03-12').getTime(),
			                  new Date('2019-03-17').getTime()
			                ],
			                fillColor: '#FF4560'
			              }
			            ]
			          }
			        ],
			          chart: {
			          height: 350,
			          type: 'rangeBar'
			        },
			        plotOptions: {
			          bar: {
			            horizontal: true,
			            distributed: true,
			            dataLabels: {
			              hideOverflowingLabels: false
			            }
			          }
			        },
			        dataLabels: {
			          enabled: true,
			          formatter: function(val, opts) {
			            var label = opts.w.globals.labels[opts.dataPointIndex]
			            var a = moment(val[0])
			            var b = moment(val[1])
			            var diff = b.diff(a, 'days')
			            return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
			          },
			          style: {
			            colors: ['#f3f4f5', '#fff']
			          }
			        },
			        xaxis: {
			          type: 'datetime'
			        },
			        yaxis: {
			          show: false
			        },
			        grid: {
			          row: {
			            colors: ['#f3f4f5', '#fff'],
			            opacity: 1
			          }
			        }
			        };
			        
			        var chart = new ApexCharts(e.content, options);
			        chart.render();
			      
			};
			// End - User Script
			
			// Header
			
			app.supportMedia("all and (min-width: 1200px)", "default");
			app.supportMedia("all and (min-width: 850px) and (max-width: 1199px)", "tablet");
			app.supportMedia("all and (max-width: 849px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var uIControlShell_1 = new cpr.controls.UIControlShell("shl1");
			if(typeof onShl1Load == "function") {
				uIControlShell_1.addEventListener("load", onShl1Load);
			}
			container.addChild(uIControlShell_1, {
				"top": "20px",
				"left": "20px",
				"width": "798px",
				"height": "356px"
			});
		}
	});
	app.title = "apCt";
	cpr.core.Platform.INSTANCE.register(app);
})();
