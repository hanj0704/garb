/************************************************
 * tester.js
 * Created at 2021. 1. 4. 오후 3:15:29.
 *
 * @author HANS
 ************************************************/

/**
 * Select DOM의 value change 이벤트를 처리합니다.
 */
function selectListener(/* Event */ e){
	// 앱의 value 속성 변경
	app.setAppProperty("value", e.target.value, true);
			
	// value-change 이벤트 디스패치.
	var changeEvent = new cpr.events.CValueChangeEvent("value-change", {
		newValue:e.target.value
	});
	
	app.dispatchEvent(changeEvent);
}


/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
//	if(e.content){
//		/** @type {HTMLSelectElement} */
//		var select = e.content.querySelector("select");
//		if(select){
//			select.removeEventListener("change", selectListener);
//		}
//	}
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shell = e.control;
	var rootDiv = e.content;
	
	var select = document.createElement("select");
	select.style.position = "absolute";
	select.style.width = "100%";
	select.style.height = "100%";
	select.style.borderRadius = "0px";
	select.setAttribute("class", "cl-control cl-combobox cl-text");
	select.style["-webkit-appearance"] = "none";
	
		var currentValue = app.getAppProperty("value");
		
		/** @type {cpr.data.DataSet} */
		var dataSet = app.lookup("ds1")
		var labelColumnName = "label";
		var valueColumnName = "value";
		
			select.disabled = false;
			select.style.background = "#fff";
		
		var rowCount = dataSet.getRowCount();
		var row;
		var option = document.createElement("option");
		option.setAttribute("value","");
		select.appendChild(option);
		for(var idx = 0;idx < rowCount;idx++){
			(function(){
				var row = dataSet.getRow(idx);
				var option = document.createElement("option");
				var value = row.getValue(valueColumnName);
				option.setAttribute("value", value);
				option.textContent = row.getValue(labelColumnName);
				if(value == currentValue){
					option.setAttribute("selected", true);
				}
				select.appendChild(option);
			})();
		}
		select.addEventListener("change", selectListener);
	
	e.content.appendChild(select);
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
	app.lookup("grd1").addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header : [{
			constraint: {
				rowIndex : 0,
				colIndex : 3
			},
			configurator: function(cell){
				cell.text = "headerText";
			}
		}],
		detail: [{
			constraint: {
				rowIndex : 0,
				colIndex : 3
			},
			configurator: function(cell){
				cell.columnName = "";
			}
		}]
	});
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
	
	var ds = app.lookup("ds2");
	
	ds.getHeaders().forEach(function(each){
		console.log(each.getDataType());
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
	var btns = new cpr.controls.Button();
	btns.value = "Zz";
	btns.addEventListener("click", function(e){
		
		app.getContainer().insertChild(5, e.control,{
			width : "100px",
		height:	"30px",
		left : "20px",
		top : "20px"
		});
	});
	app.getContainer().addChild( btns, {
		width : "100px",
		height:	"30px",
		left : "20px",
		top : "20px"
	});
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
	
	window.open("http://localhost:8080/simples/hey.do","_popup","width=400,height=500,modal=true");
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
	
	console.log(document.domain);
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
	
	var ref = document.createElement("a");
	ref.href = "http://localhost:8080/simples/hey.do";
	ref.target = "_blank";
	ref.style.display = "none";
	ref.addEventListener("click",function(){
		window.open(this.href,"_blank","width=400,height=500,modal=true");
	});
	document.body.appendChild(ref);
//	window.open("about:blank","han","width=400,height=500,modal=true");
	ref.click();
//var refer=document.createElement('a');

//refer.href="http://localhost:8080/simples/hey.do";
//
//refer.target='popupname';
//
//refer.style.display='none';
//
//document.body.appendChild(refer);

//window.open('http://localhost:8080/simples/hey.do', 'popupname', 'width=500, height=500, resizable=no, status=no, scrollbars=no');

//refer.click();

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
	var w = window.open("blank.htm","_blank","~~~~")
	var f = document.createElement('form');
	f.action = "http://localhost:8080/simples/hey.do";
	f.target = "_blank";
document.body.appendChild(f); // 이걸 안 해줄 경우 IE에서 submit이 안됨(크롬에서는 없어도 동작)
f.submit();
f.parentNode.removeChild(f);
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
	
	//http://127.0.0.1:52194/~~에서 접근함.
    var myWindow = window.open('','popup',"width=400,height=500,modal=true");
    myWindow.location.href = 'http://localhost:8080/simples/hey.do';
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
		window.open("./202101/trans.clx.html","_popup","width=400,height=500,modal=true");
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
	document.domain = "test.com";
	var a = window.open("http://han.test.com:8080/garbage-webs/simples/hey.do","_popup","width=400,height=500,modal=true");
	
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
	
	
	app.lookup("sms3").send();
}
