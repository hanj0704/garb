/**
 * 
 * @param {cpr.controls.Grid} pcGrid
 * @param {Number} pnIndex
// * @param {cpr.data.Row} poRow
 */
function addColumnInGrid(pcGrid,pnIndex) {
	
	var vcGrid = pcGrid;
	
	
	var initConfig = vcGrid.getInitConfig();
	
	initConfig.header.cells.forEach(function(each){
		
		var coli = each.constraint.colIndex;
		
		if(coli == pnIndex) {
			initConfig.header.cells.push({
				"constraint" : {
					rowIndex : 0,
					colSpan : 1,
					rowSpan : 1,
					colIndex : pnIndex
				},
				"configurator" :  function(cell) {
				cell.text = "HELO";
				cell.visible = true;
				}
			});
			coli +=1;
			each.constraint.colIndex = coli;
		} else if(coli > pnIndex){
			coli +=1;
			
			each.constraint.colIndex = coli;
		}
	});
	
	
	initConfig.detail.cells.forEach(function(each){
		
		var colin = each.constraint.colIndex;
		
		if(colin == pnIndex) {
			initConfig.detail.cells.push({
				"constraint" :{"rowIndex" : 0, "colIndex" : pnIndex},
				"configurator" : function(cell) {
					cell.columnName = "HELO";
					cell.control = (function(){
								})();
				}
			});
			colin +=1;
			each.constraint.colIndex = colin;
		} else if(colin > pnIndex){
			colin +=1;
			
			each.constraint.colIndex = colin;
		}
		
	});
	initConfig.columns.push({width:"100px"});
	console.log(initConfig);
	vcGrid.init(initConfig);
	vcGrid.redraw();
}

function randomScalingFactor(){
	return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
	};

var chart;

String.prototype.replaceAll = function(org,dest) {
	return this.split(org).join(dest);
}
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var shellDiv = e.content;
	var canvasElement = document.createElement("canvas");
	canvasElement.setAttribute("width", "100%");
	canvasElement.setAttribute("height", "100%");
	
	shellDiv.appendChild(canvasElement);
	shl1.registerComponent("cans", canvasElement);
	
	chart = new Chart(canvasElement, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
   data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'My First dataset',
				backgroundColor: "red",
				borderColor: "red",
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID : "y-axis-1",
			}, {
				label: 'My Second dataset',
				backgroundColor: "blue",
				borderColor: "blue",
				fill: false,
				type : "bar",
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID : "y-axis-2",
			}]
		},
		options: {
			tooltips :{
				mode : 'point'
			},
			responsive: true,
			title: {
				display: true,
				text: 'Chart.js Line Chart - Logarithmic'
			},
			scales: {
				xAxes: [{
					display: true,
				}],
				yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-2',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
			}
		}
});

}




/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var cans = app.lookup("shl1").getComponent("cans");
	
	var urls = chart.toBase64Image();
	downloadURL(urls, "helloWorld");
	
}


function downloadURL(uri,name) {
	
	var link = document.createElement("a");
	
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
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
	
var maChartNm2 ={
	"1":"선",
	"2":"세로막대",
	"3":"가로막대",
	"4":"면차트",
	"5":"파이",
	"6":"양축",
	"7":"다축"
}
var moChartType = {
	"선" : "line",
	"세로막대" : "column",
	"가로막대" : "bar",
	"면차트" : "area",
	"파이" : "pie",
	"양축" :"DoubleAxis",
	"다축" : "MultipleAxis"
};

//	console.log(moChartType[maChartNm2["7"]]);
	var a = 'LC2';
	
	console.log(a.indexOf("LC"));
	console.log(parseInt(a.substring(2)));
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	console.log(app.lookup("opt1").value);
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var vcGrid = app.lookup("grd1");

}



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var firstRow = app.lookup("ds1").findAllRow("column1 > 1");
	app.lookup("tsth1").objs = firstRow;
	
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
//	(function(){
	var _app = new cpr.core.App("202006/Untitleds", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ qapp, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Untitled.js
			 * Created at 2020. 6. 17. 오후 5:54:01.
			 *
			 * @author HANS
			 ************************************************/;
			// End - User Script
			
			// Header
			
			qapp.supportMedia("all and (min-width: 1024px)", "default");
			qapp.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			qapp.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = qapp.getContainer();
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
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "Button";
			container.addChild(button_1, {
				"top": "20px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button("btn2");
			button_2.value = "Button";
			container.addChild(button_2, {
				"top": "50px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	_app.title = "Untitled";
	cpr.core.Platform.INSTANCE.register(_app);
//	})();
	
	app.getRootAppInstance().openDialog(_app.id, {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	app.getRootAppInstance().openDialog("202006/Untitled", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	console.log("자식이 먼저다");
//	e.stopPropagation();
}


/*
 * 그리드에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrd1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	console.log("부모가 먼저다");
//	console.log(e.deepPath());
	e.stopImmediatePropagation();
	console.log(e.BUBBLING_PHASE);
	console.log(e.CAPTURING_PHASE);
	console.log(e.bubbles);	
}

/*
 * Body에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(/* cpr.events.CKeyboardEvent */ e){
	
	console.log("내가먼저");
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
//	var a = "RC";
//	
//	console.log(a.indexOf("VC"));
	var a = "LC5";
	var b = a.replace("LC","");
	console.log(b);
	console.log(parseInt(b));
}
var asd = 5;

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	
	var a = {
		q : [
			{"data" : "1"},{"data" : "2"}
		]
	}
	
	var b = "c1,c2,c3,c4,c5";
	
	b = b.replaceAll("c","");
	
	console.log(b);
	
}


/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var a = 5;
	app.lookup("sms1").send();
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
//	var datas = app.lookup("dm1").getDatas();
//	
//	console.log(datas);

	var a = {
		"b" : 5,
		"c" : 6
	}
	
	delete a.b;
	
	console.log(a);
}


//app.lookup("grd1").footer.

/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var udcs = new udc.HansTest("HanMan");
	
	udcs.testProp = "가나다라마바사";
	
	app.getContainer().floatControl(udcs, {
		"left" : "700px",
		"top" : "20px",
		"width"	:"300px",
		"height" : "30px"
		});
}


/*
 * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
	console.log(app.lookup("HanMan").testProp);
}


/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;

	app.lookup("sms1").send();		
}


/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	
	var grd = app.lookup("grd1");
	
	grd.addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header : [{
			constraint: {
				rowIndex : 0,
				colIndex : 5
			},
			configurator: function(cell){
				cell.text = "HELO";
			}
		}],
		detail: [{
			constraint: {
				rowIndex : 0,
				colIndex : 5
			},
			configurator: function(cell){
				cell.columnName = "HELO";
			}
		}],
	});
}


/*
 * "Button" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	
	addColumnInGrid(app.lookup("grd1"), 3);
}


/*
 * "Button" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn12 = e.control;
	
//	app.lookup("ds7").addColumn(new cpr.data.header.Header("HELO","string",cpr.data.header.HeaderType.DISPLAY_COLUMN,''));
	app.lookup("ds7").addColumn(new cpr.data.header.ExpressionHeader("HELO",'self.getValue(getIndex(),"column5") - self.getValue(getIndex()+1,"column5")'));

//	app.lookup("ds7").column
//	console.log(app.lookup("ds7").getColumnNames());
}


/*
 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn13 = e.control;
	
	console.log(app.lookup("ds7").getColumnNames());
	console.log(app.lookup("ds7").getColumn("t1"));
	console.log(app.lookup("ds7").getColumn("HELO"));
}


/*
 * "Button" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn14 = e.control;
	
	var col = app.lookup("ds7").getColumn("HELO");
	
	var idx = app.lookup("ds7").getRowCount();
	
	
	for(var i = 0; i < idx; i++){
		
		col.setValue(i, "가");
	}
	
}


/*
 * "Button" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn15 = e.control;
	
	var ds = app.lookup("ds7");
	
	var detail = ds.getColumnData("column3");
	
	var w = detail.map(function(each,idx){
		if(detail[idx+1]) {
			return each - detail[idx+1];
		} else {
			
			return 0;
		}
	});
	
	console.log(w);
}


/*
 * "Button" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn16Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn16 = e.control;
	
	var ds = app.lookup("ds7");	
	var rangeData =app.lookup("ds7").getRowDataRanged();
	
	var fakeDS = new cpr.data.DataSet("fakes");
	fakeDS.alterColumnLayout = "server";
	console.log(rangeData);
	fakeDS.build(rangeData);
//	fakeDS.addColumn(ds.getColumn("t1"));
//	fakeDS.addColumn(ds.getColumn("column2"));
	
	ds.copyToDataSet(app.lookup("ds6"));
	
	console.log(app.lookup("ds6").getRowDataRanged());
	
	
	console.log(app.lookup("ds7").getHeader("column2").getName());
	console.log(app.lookup("ds7").getHeader("column2").getDataType());
	app.register(fakeDS);


		
	

}


/*
 * "Button" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn17 = e.control;
	
	console.log(app.lookup("fakes").getColumnNames());
}


/*
 * "페이크컬럼정보" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn18 = e.control;
	/** @type cpr.data.DataSet */
	var ds = app.lookup("fakes");
	
	console.log(ds.getRowDataRanged());

	 var columnNames = ds.getColumnNames();
	
	columnNames.forEach(function(each){
		
		console.log(ds.getHeader(each).getDataType());
	});	 
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
	var ds = app.lookup("ds3");
	
	var cns = ds.getColumnNames();
	
	cns.forEach(function(each){
		
		var dt = ds.getHeader(each).getDataType();
		console.log(dt);
	});
	
	console.log(ds.getRowDataRanged());
	console.log(app.lookup("ds7").getHeader("column2").getDataType());
//	app.lookup("grd1").getCellValue(rowIndex, cellIndex)
	
	
}
/**
 * 
 * @param {Number} pnWeight
 * @param {Number} pnDeWeight
 */
function dyVShj(pnWeight, pnNowWeight){
	
//	var result = pnNowWeight / pnWeight * 100;

	var decrease = pnWeight - pnNowWeight;
	
	
	if(decrease < 0) {
		console.log("패배");
	} else {
		
		var result = decrease / pnWeight * 100;
		console.log(result);
	}
	
}

/*
 * "findAllROw" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn19Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn19 = e.control;
	
	console.log(app.lookup("ds7").findAllRow("true"));
	dyVShj(70, 59);
}
