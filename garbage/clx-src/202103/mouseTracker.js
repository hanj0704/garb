/************************************************
 * mouseTracker.js
 * Created at 2021. 3. 31. 오전 9:57:52.
 *
 * @author HANS
 ************************************************/

var ws = null;

/*
 * "소켓연결" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	ws = new WebSocket("ws://localhost:8080/echo");
	
	ws.onopen = function(event) {
		console.log("WebSocket is connected");
	}
	
	ws.onmessage = function(event){
		var message = event.data;
		console.log(message);
		console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"));
		try{
		var json = JSON.parse(message);
		var jsonKeys = Object.keys(json);
		
		var vaDataCtrls = app.getAllDataControls();
		var vaDCIds = vaDataCtrls.map(function(each){
			return each.id;
		});
		
		jsonKeys.forEach(function(each){	
			
			if(vaDCIds.indexOf(each) != -1) {
				app.lookup(each).build(json[each]);
			}
		});
		var pgr = app.lookup("pgr1");
		pgr.max = json.max;
		pgr.value = json.now;
		pgr.redraw();
		} catch(err){
			console.log(err);
		}
		
	};
	
	ws.onerror = function(error){
		console.log(error);
	}
}


/*
 * "소켓끊어" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	clearInterval(inter);
	ws.close();
}

var inter;
/*
 * "통신시작" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	inter = setInterval(function() {
		var st = null;
		var sl1 = app.lookup("sld1");
		var sl2 = app.lookup("sld2");
		var sl3 = app.lookup("sld3");
		var sl4 = app.lookup("sld4");
		st = {
			now: sl1.numberValue,
			column1: sl2.value,
			column2: sl3.value,
			column3: sl4.value
		}
		var str = JSON.stringify(st);
		
		console.log(str);
		ws.send(str);
	}, 500);
	
}



