/************************************************
 * gtTest.js
 * Created at 2020. 12. 8. 오후 3:23:22.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd1");
	
	grd.dataSet.getColumnNames().forEach(function(each,idx){
		
		console.log(grd.header.getColumn(idx).targetColumnName);
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var a = "tmpv1";
	
//	var b = a.split("tmpv");
//	console.log(b[b.length-1]);
	a = a.replace("tmpv","");
	console.log(a);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control; 
	
	app.lookup("grd1").header.
	
	app.lookup("grd1").redraw();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd2");
	
	var vaCol = grd.dataSet.getColumnNames();
	
	vaCol.forEach(function(each,idx){
		
		console.log(grd.header.getColumn(idx).targetColumnName);
	});
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd=  app.lookup("grd2");
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd2");
	
	console.log(moment("2012-12-15").isValid());
	
	console.log(grd.getRow(0).getValue("column1"));
	var opt = new cpr.controls.Output();
	
	opt.dataType = "date";
	opt.format = 'YYYY/MM/DD';
	
	opt.value = "아니이게";
	
	console.log(opt.text);
	
	var b= 12312;
	
	console.log(isNaN(b));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var a = app.lookup("grd1").header.getColumn(2, 1).targetColumnName;
	console.log(a);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grd1").columnVisible(1, false);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick9(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var grd = app.lookup("grd1");
	
	var cellCnt = grd.detail.cellCount;
	var hans = [];
	for(var i = 0 ; i < cellCnt; i++) {
		var a = grd.detail.getColumn(i);
		var b = grd.getHeaderCellIndices(i);
		if(b.length > 0) {
			
			b.forEach(function(each){
				 var headerCell = grd.header.getColumn(each);
				 
				 if(headerCell.targetColumnName != "" && headerCell.visible) {
				 	
				 	hans.push(headerCell.targetColumnName);
				 }
			});
		}		
	}
	console.log(hans);	
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var a = [1,2,3,4,5,6];
	
	a.splice(4,1);
	console.log(a);
	a.splice(a.indexOf(6),1);
	console.log(a);
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick11(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var cmb = app.lookup("cmb1");
	
	cmb.getItems().forEach(function(each){
		each.label = "zyzyzyzy";
	});
	
	cmb.redraw();
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick12(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick13(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcGrid =app.lookup("grd2");
	
	var ds = app.lookup("ds5");
	
	console.log(ds.getColumnData("column2"));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick14(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("sms1").send();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick15(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	console.log(app.lookup("opt1").value)
};


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick16(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log( "0.00" == "")
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick17(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log()
}

String.prototype.replaceAll = function(org,dest) {
	return this.split(org).join(dest);
}
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick18(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var opt = app.lookup("opt2");
	
	var b = ["#",",","s"]
	var a= opt.format;
	
	b.forEach(function(each){
		a = a.replaceAll(each, "");
	});
	if(a == "") {
		a = "0";
	}
	opt.value = "";
	console.log(a);
	console.log(opt.text);
	console.log(opt.text == a);
	opt.displayExp = "text =="+a+" ? value==null||value=='' ? '' : '-' : text";
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick19(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(isNaN("zz"))
}
