/************************************************
 * tester.js
 * Created at 2023. 2. 2. 오전 10:57:37.
 *
 * @author HANS
 ************************************************/




exports.func1 = function(a,b,c,d,e){
	console.log(arguments);
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(d);
	console.log(e);
}
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	
	app.openDialog("202302/hook", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
	/** @type cpr.core.App */
	var w = cpr.core.Platform.INSTANCE.lookup("q")
//	w.
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var q = "data.hey";
	var w = {
		"data" : {
			"hey" : "hil"
		}
	}
//	console.log(q.split("."));
//	var r = q.split(".");
//	var res = w;
//	r.forEach(function(each){
//		res = res[each];
//	});
//	console.log(res);
	var te1 = JSON.stringify(w);
	
	var te2 = JSON.parse(te1);
	console.log(te2);
	var te3  = te2;
	
//	te3["data"] = "qwe";
	console.log(te2);
	console.log(te3);
//	console.log(w[r[0]]);

}
var t = null;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
//	t = moment("20230228 18:00:00","YYYYMMDD HH:mm:ss");
//	
////	setInterval(function(){
////		var dif = t.valueOf() - moment().valueOf();
//	var q = moment.duration(t.diff(moment()));
//	console.log(q);
//	console.log(q.humanize());
//	}, 1000);
	var q = new Date("2023-02-28 18:30:00").valueOf();
	var w = new Date().valueOf();
	console.log(q-w);
}

/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
//	var q = {
//		"q" : "1",
//		"w" : "2"
//	}
//	console.log(q.e);
//	var ds = app. lookup("ds1");
//	var col = ds.addColumn(new cpr.data.header.DataHeader("test", "number"));
////	new cpr.data.header.Header();
//	
//	console.log(ds.getColumnNames());
	var grd = app.lookup("grd1");
	var vnC = grd.columnCount;
	grd.addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header : [{
			constraint: {
				rowIndex : 0,
				colIndex : vnC
			},
			configurator: function(cell){
				cell.text = "headerText"+vnC;
			}
		}],
		detail: [{
			constraint: {
				rowIndex : 0,
				colIndex : vnC
			},
			configurator: function(cell){
			}
		}],
	});
}

/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
	app.lookup("grd1").resetGrid();
}

/*
 * "visible" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(e){
	var btn8 = e.control;
	app.lookup("grd1").columnVisible(5, false,"column-index");
}

var util = createCommonUtil();
/*
 * "Button" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(e){
	var btn9 = e.control;
	util.SelectCtl.addItem(app, "cmb1", "label", "", 0);
//	app.lookup("dv1").insertRowData(0,true,{
//		"label" : "하하",
//		"value" : "호호"
//	})
//	app.lookup("cmb1").addItem(new cpr.controls.Item("전체", ""));
}

/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(e){
	var btn10 = e.control;
	
	var q = app.lookup("ds2");
	var w = q.constructor('ds3');
	console.log(w);
}
