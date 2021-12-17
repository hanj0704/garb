/************************************************
 * testGrid2.js
 * Created at 2020. 7. 3. 오전 10:44:23.
 *
 * @author 김채영
 ************************************************/



/*
 * "1" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var grid = app.lookup("grd1");
	grid.addColumn({
		columnLayout: [{ width : "200px" }],
		header : [{
			constraint: { rowIndex : 0, colIndex : 4},
			configurator : function(cell){
				cell.text = "Header";
				cell.control = (function(){
					return new cpr.controls.Output();
				})();
			}
		}],
		detail : [{
			constraint: { rowIndex : 0, colIndex : 4 },
			configurator : function(cell){
				cell.columnName = "column1";
			}
		}]
	});
}


/*
 * "2" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var grid = app.lookup("grd1");
	grid.addColumn({
		columnLayout: [{ width : "200px" }],
		header : [{
			constraint: { rowIndex : 0, colIndex : 5},
			configurator : function(cell){
				cell.text = "headerText";
				cell.control = (function(){
					return new cpr.controls.Output();
				})();
			}
		}],
		detail : [{
			constraint: { rowIndex : 0, colIndex : 5 },
			configurator : function(cell){
				cell.columnName = "column2";
			}
		}]
	});
	
}



/*
 * "2" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	console.log(app.lookup("ds1").getValue(1, "column4"))
}
