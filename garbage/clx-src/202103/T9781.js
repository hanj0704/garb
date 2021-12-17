/************************************************
 * T9781.js
 * Created at 2021. 4. 20. 오후 3:21:28.
 *
 * @author LHS_0212
 ************************************************/



/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var shlContent = e.content;
	if (shlContent) {
		while (shlContent.firstChild) {
			shlContent.removeChild(shlContent.firstChild);
		}
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
	
	var shlContent = e.content;
	
	var options = {
		series: [{
			name: "Desktops",
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
		}],
		chart: {
			height: 350,
			type: 'line',
			zoom: {
				enabled: false
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
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		}
	};
	
	var chart = new ApexCharts(shlContent, options);
	
	chart.render();
}


/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl2Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl2 = e.control;
	
	var shlContent = e.content;
	if (shlContent) {
		while (shlContent.firstChild) {
			shlContent.removeChild(shlContent.firstChild);
		}
	}
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl2Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl2 = e.control;
	
	var newCanvas = document.createElement("canvas");
	e.content.appendChild(newCanvas);
	
	var option = {
		type: 'bar',
	    data: {
	        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	        datasets: [{
	            label: '# of Votes',
	            data: [12, 19, 3, 5, 2, 3],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            y: {
	                beginAtZero: true
	            }
	        }
	    }
	}
	
	new Chart(newCanvas, option);
}
