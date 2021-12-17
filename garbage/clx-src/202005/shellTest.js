/************************************************
 * shellTest.js
 * Created at 2020. 5. 7. 오후 4:41:58.
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
//	var options ={chart:{height:359,type:"bar",stacked:!0,toolbar:{show:!1},zoom:{enabled:!0}},plotOptions:{bar:{horizontal:!1,columnWidth:"15%",endingShape:"rounded"}},dataLabels:{enabled:!1},series:[{name:"Series A",data:[44,55,41,67,22,43,36,52,24,18,36,48]},{name:"Series B",data:[13,23,20,8,13,27,18,22,10,16,24,22]},{name:"Series C",data:[11,17,15,15,21,14,11,18,17,12,20,18]}],xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},colors:["#556ee6","#f1b44c","#34c38f"],legend:{position:"bottom"},fill:{opacity:1}};
	
//	var chart = new ApexCharts(e.content, options);
//        chart.render();
        
        var options = {
        	chart: {
        		height: 359,
        		type: "bar",
        		stacked: !0,
        		toolbar: {
        			show: false
        		},
        		zoom: {
        			enabled: !0
        		}
        	},
        	plotOptions: {
        		bar: {
        			horizontal: !1,
        			columnWidth: "15%",
        			endingShape: "rounded"
        		}
        	},
        	dataLabels: {
        		enabled: !1
        	},
        	series: [{
        		name: "Series A",
        		data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
        	}, {
        		name: "Series B",
        		data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
        	}, {
        		name: "Series C",
        		data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
        	}],
        	xaxis: {
        		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        	},
        	colors: ["#556ee6", "#f1b44c", "#34c38f"],
        	legend: {
        		position: "bottom"
        	},
        	fill: {
        		opacity: 1
        	}
        };
       var chart = new ApexCharts(e.content, options);
        chart.render();
}
