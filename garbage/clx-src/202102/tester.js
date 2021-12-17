/************************************************
 * tester.js
 * Created at 2021. 2. 1. 오전 10:58:25.
 *
 * @author HANS
 ************************************************/
function rgbToHex(rgbType) {
	  var rgb = rgbType.replace( /[^%,.\d]/g, "" ); 
        // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
        rgb = rgb.split( "," ); 
	function a(str){
		
		var q = Number(str).toString(16);
		if(q.length == 1) {
			q = "0"+q;
		}
		return q;
	}
  return "#" + a(rgb[0]) + a(rgb[1]) +a(rgb[2]);
}


cpr.expression.ExpressionEngine.INSTANCE.registerFunction("abc", function(index){
	
	var ds = app.lookup("ds6");
	
	var datas = ds.getUnfilteredRowDatas();
	return datas[index].column1
});
/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	var grd = app.lookup("grd1");
//			var ctrl = grd.detail.getControl(0);
//			var q = ctrl.style;
//			ctrl.userData("aa", "qqqqq");
//			ctrl.htmlAttr("grd1-ctrl1", "zzz");
//			ctrl.redraw();
//			var a= document.querySelector(".opt-test");
//			
//			console.log(a);
//			var q = window.getComputedStyle(a);
//			console.log(q);
//			console.log(q.getPropertyValue("border"));
			
//	app.lookup("grd1").getExportData({
//		exceptStyle : false,
//		applyFormat : true,
//		rowDataHandler: function(datas, rowIndex){
//			
//			var grd = app.lookup("grd1");
//			var ctrl = grd.detail.getControl(0);
//			
//			var a= document.querySelector(".opt-test");
//			console.log(a);
//			var q = window.getComputedStyle(a);
//			console.log(q);
//		}
//	});
//	var grd = app.lookup("grd1");
	var b = document.getElementById("uuid-"+grd.uuid);
	
	var c = b.querySelector("[aria-label='1행 1열 column11']");
	
	
	var f = c.querySelector(".cl-default-cell");
	var d ;
	var bc ;
	if(f != null){
		d = window.getComputedStyle(f);
		bc = d.getPropertyValue("background-color");
	
	} else {
		f = c.querySelector(".cl-control");
		d = window.getComputedStyle(f);
		bc = d.getPropertyValue("background-color");
	}
	
//	var d = window.getComputedStyle(c);
//	var bc = d.getPropertyValue("background-color");
	console.log(rgbToHex(bc));
}


/*
 * "exportData" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var grd = app.lookup("grd1");
	
	var a = grd.getExportData({
		exceptStyle : false,
		applyFormat : true
	});
	
	console.log(a);
	
	/** @type Array */
	var q = a.rowgroups[1].data;
	console.log(q);

	q.forEach(function(each,idx){
		/** @type Array */
		var w = each;
		
		w.forEach(function(eachs,idxs){
			
			var r = idx+1+"행 "+(idxs+1)+"열 " + eachs.value;
			console.log(r);
			var grd = app.lookup("grd1");
			var b = document.getElementById("uuid-"+grd.uuid);
	
			var c = b.querySelector("[aria-label='"+ r+"']");
			console.log(c);
		});
	});
}


/*
 * "rgb" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	console.log(rgbToHex("rgb(255,09,10)"));
	
}


/*
 * "query" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	var grd = app.lookup("grd1");
	var b = document.getElementById("uuid-"+grd.uuid);
	
	var han = b.querySelector(".cl-grid-detail .cl-grid-row");
	console.log(han);
	/** @type Array */
	var t = han.querySelectorAll(".cl-grid-cell");
	
	t.forEach(function(each){
		var aaa=  each.querySelector(".cl-default-cell");
		var sty = null;
		if(aaa !=null) {
		sty = window.getComputedStyle(each);
		} else {
		aaa=  each.querySelector(".cl-control");
		sty = window.getComputedStyle(aaa);
		}
		console.log(sty.getPropertyValue("color"));
		console.log(sty.getPropertyValue("border-right"));
		console.log(sty.getPropertyValue("background-color"));
	});
}


/*
 * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
//	var ea1 = app.lookup("ea1");
//	var ea2 = app.lookup("ea2");
//	
//	var a = ea1.getEmbeddedAppInstance();
//	console.log(a);
//	console.log(typeof a);
//	var ins = a.app.getInstances();
//	
//	ins[0] = ins[1];
//	
//	console.log(ins);
//	app.getContainer().redraw();

	console.log(app.lookup("ds6").getUnfilteredRowDatas()[8].column1);
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
	app.lookup("grd2").filter("getIndex() < 5");
	}


/*
 * "sub" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	
	app.lookup("sms2").send()
}


/*
 * 네비게이션 바에서 item-mouseover 이벤트 발생 시 호출.
 * 아이템에 마우스오버 했을때 발생하는 이벤트.
 */
function onNavigationBarItemMouseover(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var navigationBar = e.control;
//	console.log("zz");
	console.log(app.lookup("grd1").getCellValue(1, "column1"));
	
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
}


/*
 * 체크 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onCbx1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx1 = e.control;
	e.preventDefault();
	
	cbx1.checked = !cbx1.checked;
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
	var mo = moment("20200801");
	console.log(mo.day());
	
	for(var i = 0;i < 30 ; i++) {
		
		mo = mo.add(1, "d");
		console.log(mo.format("YYYYMMDD"));
		console.log(mo.day());
	}
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
	
	var am = moment("20210219","YYYYMMDD");
//	console.log(am.format("YYYYMMDD"));
//	console.log(am.startOf("month").week());
	
	console.log(am.startOf("isoWeek").week());
	console.log(am.startOf("Month").format("YYYYMMDD"));
	
	var q = moment("202008","YYYYMM");
	
	console.log(q.startOf("isoweek").month());
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
	
	var button = new cpr.controls.Button();
	button.value = "aa";
	app.lookup("grp2").floatControl(button,{
		"top" : "20px",
		"right" : "20px",
		"left" : "100px",
		"bottom" : "20px"
	});
}
