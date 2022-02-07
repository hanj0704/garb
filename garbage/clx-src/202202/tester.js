/************************************************
 * tester.js
 * Created at 2022. 2. 3. 오후 1:34:02.
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
	var grd = app.lookup("grd1");
	
	var a = grd.getColumnLayout();
	console.log(a);
	grd.redraw();
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
	var grd = app.lookup("grd1");
//
//	var a = grd.columnCount;
//	console.log(a);
//	var b = grd.detail.cellCount;
//	console.log(b);
//	var c = grd.detail.getColumnByName("column3");
//	console.log(c[0].cellIndex);
	grd.addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header : [{
			constraint: {
				rowIndex : 0,
				colIndex : 1
			},
			configurator: function(cell){
				cell.text = "headerText";
			}
		}],
		detail: [{
			constraint: {
				rowIndex : 0,
				colIndex : 1
			},
			configurator: function(cell){
				cell.columnName = "column3";
			}
		}]
	});
	grd.redraw();
}
