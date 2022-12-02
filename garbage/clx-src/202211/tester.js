/************************************************
 * tester.js
 * Created at 2022. 10. 31. 오후 5:08:48.
 *
 * @author HANS
 ************************************************/
//console.log(a);
//var a = 5;

//catName("클로이");

/**
 * 
 * @param {Function} func
 */
function aqaq(func){
	func();
}
var catName = function(name) {
	console.log("제 고양이 이름은 " + name + "입니다");
}
var hans = 5;
console.log(window.hans);
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	aqaq();
//	var btn1 = e.control;
//	console.log(window.hans);
//	alert(navigator.userAgent);
//	alert(isMobile());
}


function isMobile(){
	var vbIsMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
	var vbIsiPhone = /Macintosh/i.test(navigator.userAgent);
	var vntp = navigator.maxTouchPoints;
	
	if(vbIsiPhone && vntp ==5) {
		return true;
	}
	alert("타겠냐?");
	return vbIsMobile;
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	var side = app.lookup("side");	
	var item = side.findItem({value: "value5"});
	console.log(item);
	console.log(item.parentItem);
	var a = side.hasChild(item)
	console.log(a);
//	app.lookup("side").setTreeFilter("value == \"value2\"");
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.s
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	app.lookup("ds1").build([
		{
			"a" : "1",
			"b" : "2",
			"c" : 3
		}
	]);
	
	console.log(app.lookup("ds1").getRowDataRanged());
}

/*
 * "lastIndex" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	var appId = "asd/adqwe/";
	appId = appId.substring(0, appId.lastIndexOf(".clx"));
	console.log(appId);
}

/*
 * "lastIndex" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
//	app.lookup(btn)
}

/*
 * "Button" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(e){
	var btn13 = e.control;
	
	var a = "그리드'";
	console.log(a);
	var reg = new RegExp(/[\'\"]/g);
	var res = a.search(reg);
	console.log(res);
	
	console.log(a.replace(reg, ""));
}
function ab(){
	return "qq";
}
function abc(a,b,c,d,e,f,g){
	console.log(arguments);
	console.log(arguments.toString());
}
/*
 * "Button" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(e){
	var btn14 = e.control;
	var qw = [1,2,3,4,5];
	var vara = JSON.stringify(qw);
	console.log(JSON.parse(vara));
//	abc(1,2,{"A":1,"B":2},4,5,6,7);
	
//	console.log(a.toString());
//	
//	var fun = new Function("a()");
//	fun();
}

/*
 * "Button" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(e){
	var btn15 = e.control;
	window.open("http://127.0.0.1:52194/eXCFrame-v2-ui/clx-src/app/com/Main.clx.html");
}

/*
 * "Button" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn16Click(e){
	var btn16 = e.control;
	
	app.lookup("grd1").forEachOfGridCells(function(cellInfos){
		
	});
}

var qiri =null;
//Function.prototype.
/*
 * "stringify" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(e){
	var btn17 = e.control;
	var a = {
		voRow : app.lookup("grd1").getRow(0).getRowData(),
		poInitParam : {"a" : 1,"b" : function(){console.log("히힝")}},
		poOptions : {
			q : function(){
				console.log("하하하");
			}

		}
	}
	qiri = JSON.stringify(a);
	console.log(qiri);
	var b = a.poOptions.q.toString();
	console.log(b);
	var newF = new Function("("+b+")()");
	console.log(newF);
	newF();
//	console.log(JSON.stringify(b));
}

/*
 * "parse" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(e){
	var btn18 = e.control;
	
//	console.log(JSON.parse(qiri));

	var meetup = {
		title: "Conference",
		room: {
			number: 23,
			participants: ["john", "ann"]
		}
	};
	
	console.log(JSON.stringify(meetup))
}

/*
 * "parse2" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn19Click(e){
	var btn19 = e.control;
	var a = {
		poRow : {
		    "MENU_NM": "Button",
		    "MENU_ID": "Button",
		    "UP_MENU_ID": "LEVEL02-01-01",
		    "TOP_MENU_ID": "",
		    "CALL_PAGE": "app/exam/ctl/ctlButton.clx",
		    "PGM_ID": "",
		    "ICON": "",
		    "MENU_KEY": "",
		    "MOBILE_YN": "",
		    "DESC": "버튼,enabled,visible,tooltip,value,iconAlign",
		    "CLASS": "",
		    "MENU_DESC": "[Button] 버튼,enabled,visible,tooltip,value,iconAlign",
		    "MENU_LOWERCASE": "button",
		    "DESC_LOWERCASE": "버튼,enabled,visible,tooltip,value,iconalign"
		},
		poInitValue : true
	}
	
	console.log(JSON.stringify(a));
}

/*
 * "Button" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(e){
	var btn12 = e.control;
//	app.lookup()
//	var tre = new cpr.controls.TreeItem(label, value, parentValue);
//	tre.hasAncestor(value)
}

/*
 * "Button" 버튼(btn20)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn20Click(e){
	var btn20 = e.control;
	
	
	var side = new cpr.controls.SideNavigation();
	side.setItemSet(app.lookup("ds2"), {
		label: "label",
		value: "value",
		parentValue: "parent"
	});
	side.setFilter("hasAncestor('value1')");
	console.log(side.getItems());
}

/*
 * "Button" 버튼(btn21)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn21Click(e){
	var btn21 = e.control;
	app.lookup("pgi").currentPageIndex = 1;
	
	
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPgiSelectionChange(e){
	var pgi = e.control;
	console.log("머고");
}

/*
 * "map" 버튼(btn22)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn22Click2(e){
	var btn22 = e.control;
	
	var objectMap = new cpr.utils.ObjectMap();
	objectMap.put("a", 1);
	objectMap.put("b", 2);	
	console.log(objectMap);
	var q = objectMap.toArray();
	console.log(q);
	
	console.log(objectMap.getEntry(0));
}
