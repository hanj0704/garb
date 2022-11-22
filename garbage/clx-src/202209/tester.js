/************************************************
 * tester.js
 * Created at 2022. 9. 23. 오전 10:18:58.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
//	FastClick.attach(document.body);
	var meta = document.getElementsByName("viewport");
	var item = meta.item(0);
	item.setAttribute("CONTENT", "width=1440,user-scalable=no");
	
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
//	FastClick.attach(document.body);
	console.log(app.lookup("ipb1"));
	var ipb1 = app.lookup("ipb1");
	console.log(ipb1);
	console.log(ipb1.getBindInfo("value"));
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	app.lookup("grd1").addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header : [{
			constraint: {
				rowIndex : 0,
				colIndex : 4
			},
			configurator: function(cell){
				cell.text = "headerText";
			}
		}],
		detail: [{
			constraint: {
				rowIndex : 0,
				colIndex : 4
			},
			configurator: function(cell){
				cell.columnName = "column5";
				cell.control = (function() {
					var inputBox_1 = new cpr.controls.InputBox("ipb1");
					inputBox_1.bind("value").toDataColumn("column5");
					return inputBox_1;
				})();
			}
		}]
	});	
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	var ipb = new cpr.controls.InputBox("ipb1");
	ipb.bind("value").toDataMap(app.lookup("dm1"), "column1");
	app.getContainer().addChild(ipb, {
		left : "0px",
		top : "0px",
		width : "100px",
		height : "28px"
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
