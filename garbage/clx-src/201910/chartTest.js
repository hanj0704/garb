/************************************************
 * udcTest.js
 * Created at 2019. 10. 2. 오전 10:23:10.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var vcDataSet = app.lookup("ds1");
	var chartShl1 = app.lookup("chartShl1");
	var returnOption = configOption("예제", vcDataSet,"seriesName");
	
	chartShl1.setAppProperty("option", returnOption);
	
}

/**
 * 차트를 그리기 위한 옵션을 자동지정하는 예제 함수입니다.
 * @param {String} paramStringTitle 차트의 타이틀 Text
 * @param {cpr.data.DataSet} paramDataSet 차트의 데이터를 구성할 데이터셋
 * @param {String} paramMainColumnName 차트의 구성 정보가 되는 컬럼명(해당 컬럼을 기준으로 차트를 구성합니다)
 * @return {Object} option	차트를 그릴 옵션
 */
function configOption(paramStringTitle, paramDataSet, paramMainColumnName) {
	
	var voSeries = [];
	var vcDataSet = paramDataSet;
	var voLegendArray = vcDataSet.getColumnData(paramMainColumnName);
		
	var voColumnNames = vcDataSet.getColumnNames();
	var vnIndex = voColumnNames.indexOf(paramMainColumnName);	
	
		voColumnNames.splice(vnIndex, 1);
		

	voLegendArray.forEach(function(each){
		
		var rowData = vcDataSet.findFirstRow(paramMainColumnName + "=='" +each+"'").getRowData();
				
			delete rowData[paramMainColumnName];
			var aSeries= Object.values(rowData);
			
		voSeries.push({
			name : each,
			type : 'bar',
			data : aSeries
		});
	});

	var options = {
		title : {
			text : paramStringTitle
		},
		tooltip : {},
		legend : {
			data : voLegendArray
		},
		xAxis : {
			data : voColumnNames
		},
		yAxis : {},
		series : voSeries
	};
	
	console.dir(options);
	return options;
}


/**
 * 파이차트를 그리기위한 옵션을 지정해주는 함수입니다. 프로토타입
 * @param {String} paramStringTitle 원제
 * @param {String} paramStringSubTitle 부제
 * @param {String} seriesName 시리즈명
 * @param {cpr.data.DataSet} paramDataSet 차트를 그릴 데이터를 담고있는 데이터셋
 * @param {String} paramMainColumnName 컬럼명
 */
function configOption2(paramStringTitle,paramStringSubTitle,seriesName, paramDataSet, paramMainColumnName) {
			
		
	var voSeries = [];
	var vcDataSet = paramDataSet;
	var voLegendArray = vcDataSet.getColumnData(paramMainColumnName);
		
	var voColumnNames = vcDataSet.getColumnNames();
	var vnIndex = voColumnNames.indexOf(paramMainColumnName);	
	
		voColumnNames.splice(vnIndex, 1);
	
	var lastData =  [{value:335, name:"범례1"},
                {value:310, name:'범례2'},
                {value:234, name:'범례3'},
                {value:135, name:'범례4'},
                {value:1548, name:'범례5'}];
      

	voLegendArray.forEach(function(each){
		
		var rowData = vcDataSet.findFirstRow(paramMainColumnName + "=='" +each+"'").getRowData();
				
			delete rowData[paramMainColumnName];
			var aSeries= Object.values(rowData);
			
		voSeries.push({
			name : each,
			type : 'bar',
			data : aSeries
		});
	});
	
		var options = {
			title : {
				text : paramStringTitle,
				subtext : paramStringSubTitle,
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c}({d}%)"
			},
			
			series : [
				{
					name : seriesName,
					type : 'pie',
					radius : "70%",
					center : ['50%', '60%'],
					data: [lastData],
					itemStyle : {
						emphasis : {
							shadowBlur : 10,
							shadowOffsetX :0,
							shadowColor : 'rgba(0,0,0,0.5)'
						}
					}
					
				}
			]
			
		}
}
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
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
	
	app.lookup("chartShl1").redraw();
}
