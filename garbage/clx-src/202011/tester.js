
function createDragSourceFeedback() {
	var feedback = new cpr.controls.Output();
	feedback.ellipsis = true;
	feedback.style.css({
		"opacity": "0.8",
		"width": "50px",
		"height": "25px",
		"border": "solid 1px red",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedback;
}


/**
 * 파라미터의 컨트롤을 드래그 가능하도록 드래그 소스를 지정하는 함수.
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control) {
	var feedback = null;
	var actualRect = null;
	new cpr.controls.DragSource(control, {
		options: {
			dataType: "text",
			threadhold: 10
		},
		onDragStart: function(context) {//dragStart에서 사용중인 context.source.detail이라는 대상은 이후 릴리즈에서 depreacted될 대상으로,context.sourceTargetObject로 대체됩니다.
			
			if (context.sourceTargetObject != null && context.sourceTargetObject.relativeTargetName != "header") {
				context.cursor = "grabbing";
				feedback = createDragSourceFeedback();
				control.style.css("opacity", " 0.5");
				context.data = context.sourceTargetObject;
				feedback.value = JSON.stringify(control.getRow(context.source.detail.rowIndex).getRowData());

				var voDragStartLoca = context.dragStartLocation;
				actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x, voDragStartLoca.y, control.getActualRect().width, 25);
				app.floatControl(feedback, actualRect);
				context.source = null;
			} else {
				context.cancel();
			}
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			var newRect = actualRect.getTranslatedByDimension(context.dragDelta);
			app.floatControl(feedback, newRect);
		},
		onDragEnd: function(context) {
			context.cursor = "";
			feedback.dispose();
			feedback = null;
			control.style.removeStyle("opacity");
		}
	});
}
var voPrevRowElement = null;

/**
 * 파라미터로 받은 컨트롤을 드랍가능한 타겟으로 지정하는 함수.
 * @param {cpr.controls.Grid} control2
 */
function setDropTarget(control2) {

	var dropTarget = new cpr.controls.DropTarget(control2, {
		isImportant: function(source) {
			return source.dataType == "text";
		},
		onDragEnter: function(context) {

		},
		onDragLeave: function(context) {

		},
		onDragMove: function(context) {
			var vaElementsOnMouse = elementsFromPoint(context.pointerLocation.x, context.pointerLocation.y);

			var vaClGridRowEle = vaElementsOnMouse.filter(function( /*HTMLElement*/ each) {
				if (each.classList.contains("cl-grid-row")) {
					return each;
				}
			});
			var voGridRowElement = vaClGridRowEle[0];

			if (voGridRowElement && !voGridRowElement.classList.contains("row-bottom")) {
				if (voGridRowElement != voPrevRowElement && voPrevRowElement) {

					voPrevRowElement.classList.remove("row-bottom");
				}
				voPrevRowElement = voGridRowElement;
				voGridRowElement.classList.add("row-bottom");
			}
		},
		onDrop: function(context) {
				var voDragRowData = context.source.control.getRow(context.data.rowIndex).getRowData()
				var vnDragIndex = context.data.rowIndex;
			if (context.target.detail != null) {
				var vnDropIndex = context.target.detail.rowIndex;
				if (vnDropIndex > vnDragIndex) {
					
					control2.insertRowData(vnDropIndex, true, voDragRowData);
					control2.setCheckRowIndex(vnDropIndex+1, control2.getRow(vnDragIndex).checked);
					control2.deleteRow(vnDragIndex);
				} else {
					var isChecked = control2.getRow(vnDragIndex).checked;
					control2.deleteRow(vnDragIndex);
					control2.insertRowData(vnDropIndex, true, voDragRowData);
					control2.setCheckRowIndex(vnDropIndex+1, isChecked);
				}
			} else {
				var vnInsertIdx = Number(voPrevRowElement.getAttribute("aria-rowindex")) - 1;
				var vbInsertAfter = vnInsertIdx == control2.getRowCount() - 1 ? true : false;
				var isChecked = control2.getRow(vnDragIndex).checked;
				control2.deleteRow(vnDragIndex);
				control2.insertRowData(vnInsertIdx, vbInsertAfter, voDragRowData);
				control2.setCheckRowIndex(vnInsertIdx, isChecked);
			}
			voPrevRowElement.classList.remove("row-bottom");
		}
	});
}

/**
 * 마우스 포인터가 위치한 곳 밑에 있는 모든 요소를 가져오는 함수입니다.
 * @param {Number} x
 * @param {Number} y
 * @return {HTMLElement}
 */
function elementsFromPoint(x, y) {
	if (document["msElementsFromPoint"]) {
		var nodeList = document["msElementsFromPoint"](x, y);
		if (!nodeList) {
			return [];
		} else {
			return Array.prototype.slice.call(nodeList);
		}
	} else {
		return (document["elementsFromPoint"](x, y) || []);
	}
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var name = '_blank';
  var specs = 'menubar=no,status=no,toolbar=no';
	window.open("http://localhost:8080/202011/tuto.jsp",name,specs);
	window.hansman = "쿟쿄쿄쿄";
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
	
//	console.log(app.lookup("grd1").getRow(1).checked);
//	app.lookup("grd1").getRow(1).checked = true;
	var col = app.lookup("grd1").getColumnLayout();
	
	var vcGrid = app.lookup("grd1");
	
	var hs = col.header.splice(1,1);
	col.header.push(hs[0]);
//	
	var ds = col.detail.splice(1,1);
	col.detail.push(ds[0]);
//	
	console.log(col);
	vcGrid.setColumnLayout(col);
	vcGrid.redraw();
//	
//	var vnIdx = vcGrid.getRowCount();
//	
//	for(var i = 0; i < vnIdx ; i++) {
//		
//		console.log(vcGrid.getRow(i).getRowData());
//	}
}

function isIE(){
	return (navigator.appName ==="Netscape" && navigator.userAgent.search("Trident") !== -1 ||
	navigator.userAgent.toLowerCase().indexOf("msie") !== -1);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
//	var a = new cpr.utils.URL("https://cdnjs.cloudflare.com/ajax/libs/exceljs/3.8.0/exceljs.min.js");
//	cpr.core.ResourceLoader.loadScript(uri)
	console.log(isIE());
	if(isIE()){
		
	}
	cpr.core.ResourceLoader.loadScript("https://cdnjs.cloudflare.com/ajax/libs/exceljs/3.8.0/exceljs.min.js");
}


function setDragSource2(control){
	new cpr.controls.DragSource(control, {
});
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
//	app.lookup("grd1").moveColumn(1, 2,false);
	
//	app.lookup("grd1").redraw();

	app.lookup("ds4").forEachOfUnfilteredRows(function(dataRow){
		console.log(dataRow.getValue("column1"));
	});
		
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
	app.lookup("grd2").moveColumn(0, 3,true);
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
	app.lookup("grd2").moveColumn(3, 1,true);
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
	console.log(app.lookup("grd2").getColumnLayout())
//	app.lookup("grd2").moveColumn(1, 2,false);
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
	app.lookup("grd2").moveColumn(2, 3,false);
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
	app.lookup("sms2").send();
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	console.log(app.lookup("grd1").getSelectedRowIndex());
	console.log(app.lookup("grd1").getEditRowIndex());
	
	app.lookup("grd1").getRow(app.lookup("grd1").getEditRowIndex()).setValue("column3", cmb1.text);
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
	
	app.lookup("sms4").send();
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
	
}



/*
 * 데이터뷰에서 insert 이벤트 발생 시 호출.
 * 로우가 추가되는 경우 발생하는 이벤트. 발생 메소드 : addRow, addRowData, insertRow, insertRowData
 */
function onDv1Insert(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataView
	 */
	var dv1 = e.control;
	
}


/*
 * 데이터셋에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDs5Load(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds5 = e.control;
	
}


/*
 * 데이터뷰에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDv1Load(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataView
	 */
	var dv1 = e.control;
		console.log(app.lookup("dv1").getRowCount());
	if(dv1.getRowCount() >5) {
		var row = dv1.getRow(4);
		row.setAttr("uniq", "a");
		var ds = dv1.parentDataSet;
		
		var findRow = ds.findFirstRow("getAttr('uniq') =='a'");
		var frIdx = findRow.getIndex();
		
		var filt = dv1.getFilter();
		
		dv1.setFilter(filt+"&& getIndex() <= "+frIdx);
	}
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
	
	var cl = app.lookup("grd2").getColumnLayout();
	
	cl.columnLayout[0].width = 150;
	
	app.lookup("grd2").setColumnLayout(cl);
	var grd = app.lookup("grd2");
	grd.redraw();
	
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
