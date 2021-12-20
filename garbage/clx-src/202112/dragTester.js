/************************************************
 * dragTester.js
 * Created at 2021. 12. 20. 오전 9:45:45.
 *
 * @author HANS
 ************************************************/



/*
 * 그룹에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onGrp1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	console.log("DROP");
	e.preventDefault();
	
	if (e.dataTransfer.items) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === 'file') {
        var file = e.dataTransfer.items[i].getAsFile();
        console.log(file);
        console.log('DROP IN GROUP... file[' + i + '].name = ' + file.name);
        
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
    }
  }
}


/*
 * 그룹에서 dragover 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 마우스 포인터가 타겟 컨트롤의 영역내에서 이동할 때 발생하는 이벤트.
 */
function onGrp1Dragover(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	console.log("File in drop zone");
	e.preventDefault();
}


/*
 * 그리드에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onGrd1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	console.log("GRID DROP");
	e.preventDefault();
	
	if (e.dataTransfer.items) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === 'file') {
        var file = e.dataTransfer.items[i].getAsFile();
        console.log(file);
        console.log('Detected in Items In  Grid... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
      console.log('file[' + i + '].name = ' + e.dataTransfer.files[i].name);
    }
  }
  var voTargetObj = e.targetObject
  if(voTargetObj) {
  	
  	console.log("cellIndex : "+voTargetObj.cellIndex);
  	console.log("rowIndex : "+voTargetObj.contentRowIndex);
  	console.log("relativeTargetName : "+voTargetObj.relativeTargetName);
  	console.log("columnName : " + voTargetObj.columnName);
  	var ctrl = grd1.detail.getControl(voTargetObj.cellIndex);
  	console.log(ctrl);
  	if(ctrl instanceof cpr.controls.FileInput) {
  		console.log(e.dataTransfer.items)
//  		var files = e.dataTransfer.items.map(function(eachs){
//  			return eachs.getAsFile();
//  		});
			var files = [];
			for(var i =0 ; i < e.dataTransfer.files.length; i++) {
				var file1 = e.dataTransfer.items[i].getAsFile();
				 files.push(file1);
			}
//  		console.log(files);
//  		ctrl.files = files;
			grd1.setCellValue(voTargetObj.contentRowIndex, voTargetObj.cellIndex, files[0].name);
//			ctrl.file = files[0];
  	}
  }
}


/*
 * 그리드에서 dragover 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 마우스 포인터가 타겟 컨트롤의 영역내에서 이동할 때 발생하는 이벤트.
 */
function onGrd1Dragover(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	console.log("Grid File in drop zone");
	e.preventDefault();
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
	
	var grd = app.lookup("grd1");
//	/** @type cpr.controls.FileInput */
//	var ctrl = grd.detail.getControl(4);
//	console.log(ctrl.files);
//	console.log(ctrl.file);
	
	
	grd.selectRows([0]);
	/** @type cpr.controls.FileInput */
	var ctrl = grd.detail.getControl(4);
	grd.getSelectedRow()
	console.log(ctrl.file);
	
		grd.selectRows([1]);
	/** @type cpr.controls.FileInput */
	var ctrl = grd.detail.getControl(4);
	
	console.log(ctrl.file);
	
	grd.forEachOfGridCells(function(cellInfos){
		
		cellInfos.forEach(function(each){
			var ctrls = each.ctrl;
			
			if(ctrls instanceof cpr.controls.FileInput) {
				
				console.log(ctrls.files);
			}
		});
	});		
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	console.log(e);
	console.log(fi1.file);
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
	
//	app.lookup("ds1").forEachOfUnfilteredRows(function(dataRow){
//		console.log(dataRow.files);
//	});
//	var ds = app.lookup("ds1");
//	
//	var ro = ds.getRow(1);
//	ro.hey = "zz";
//	ro.setAttr("aza", "zz");
//	console.log(ro);
//	console.log(ro.hey);
	app.lookup("ds1").forEachOfUnfilteredRows(function(dataRow){
		dataRow.hey = dataRow.getValue("column1");
	});
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
	app.lookup("grd1").getRow(1);
	
	app.lookup("ds1").forEachOfUnfilteredRows(function(dataRow){

		console.log(dataRow.hey);
	});
	var grd = app.lookup("grd1");
	grd.forEachOfGridCells(function(cellInfos){
		cellInfos.forEach(function(each){
		});
	});
	grd.findAllRow("true").forEach(function(each){

	});
	
	grd.getRow(0).setAttr("zaz", "qq");
//	grd.detail.getControl(1).user
	var ds = app.lookup("ds1");
}


/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var grd = app.lookup("grd1");
	
	console.log(grd.userData());
}


/*
 * "in" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	app.lookup("grd1").insertRow(0, false);
}


/*
 * "de" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	var rowidx = app.lookup("grd1").getSelectedRowIndex();
	app.lookup("grd1").deleteRow(rowidx);
}


/*
 * "sa" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var ds = app.lookup("ds1");
	var grd = app.lookup("grd1");
	
	var a = ds.getRowStatedIndices(cpr.data.tabledata.RowState.UPDATED | cpr.data.tabledata.RowState.INSERTED);
	a.forEach(function(each){
		
		var row = ds.getRow(each);
		
		var vsIndex = row.getAttr("index");
		var vsF = grd.userData("files")[vsIndex];
		console.log(vsF);
		app.lookup("sms1").addFileParameter("f@"+row.getValue("column1"), vsF);
	});
	
	app.lookup("sms1").send();
}
