/************************************************
 * DirectIO.js
 * Created at 2021. 2. 3. 오후 5:38:59.
 *
 * @author HANS
 ************************************************/
cpr.events.EventBus.INSTANCE.addFilter("led-click", function(e){
	var control = e.control;
	
	if(control instanceof udc.cmn.LED) {
		
		var ds = app.lookup("dsTMBuzzerOut");
		
		var fir = ds.findFirstRow("UPPER_CLASS=='"+control.belong+"' && BUZZER_NM =='"+control.name+"'");
		
		fir.setValue("BUZZER_STATUS", control.status);
	}
});

var ws ;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	var vaDataCtrl = app.getAllDataControls();
	
	var allChild = app.getContainer().getAllRecursiveChildren();
	
	vaDataCtrl.forEach(function(each){
		
		if(each instanceof cpr.data.DataSet) {
			
			var ds  =each;
			var uc = ds.getUnfilteredDistinctValues("UPPER_CLASS");
			
			uc.forEach(function(eachTitle){
				
				var ctrl = allChild.find(function(ele){
					if(ele.value ==eachTitle) {
						return true;
					}
				});
				
				var parent ;
				if(ctrl == undefined) {
					parent = app.lookup("grp13");
				} else {
					
					/** @type cpr.controls.Container */
					 parent = ctrl.getParent();
				}
					
					var child = parent.getChildren().filter(function(eachCtrl){
						return eachCtrl instanceof udc.cmn.LED;
					});
					ds.findAllRow("UPPER_CLASS=='"+eachTitle+"'").forEach(function(eachR){
						
						var one = child.find(function(ele){
							if(ele.name ==eachR.getValue("BUZZER_NM")) {
								return true;
							}
						})
						if(one) {
							one.status = eachR.getValue("BUZZER_STATUS");
							one.redraw();
						} else {
							console.log(eachR.getValue("BUZZER_NM"));
						}
						
					});
					
//				}
			});
		}
	});
}
var inter;

/*
 * "소켓시작" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	ws = new WebSocket("ws://localhost:8080/echo2");
	
	ws.onopen = function(event) {
		console.log("시작");
		
		inter = setInterval(function() {
			var tmo = app.lookup("dsTMBuzzerOut");
			var tmi = app.lookup("dsTMBuzzerInput");
			var dm1 = app.lookup("dm1");
			
			var a = tmo.getRowDataRanged();
			var b = tmi.getRowDataRanged();
			var c = dm1.getDatas();
			a.forEach(function(each) {
				tmo.getHeaders().forEach(function(eachH) {
					each[eachH.getInfo()] = each[eachH.getName()];
					delete each[eachH.getName()];
				});
			});
			
			b.forEach(function(each) {
				tmi.getHeaders().forEach(function(eachH) {
					
					each[eachH.getInfo()] = each[eachH.getName()];
					delete each[eachH.getName()];
				});
			});
			var jsons = {
				
				"TM_OUT": a,
				"TM_IN": b
			}
			
			var str = JSON.stringify(jsons);
			console.log(str);
			ws.send(str);
		}, 1000)
	}
	
	ws.onmessage = function(event) {
		
	}
	ws.onclose = function() {
		console.log("SESSION END");
	}
	
}


/*
 * "그만" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	ws.close();
	clearInterval(inter);
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
	
	var tmo = app.lookup("dsTMBuzzerOut");
	var tmi = app.lookup("dsTMBuzzerInput");
	
	var a = tmo.getRowDataRanged();
	var b = tmi.getRowDataRanged();
	a.forEach(function(each){
		tmo.getHeaders().forEach(function(eachH){
			
			each[eachH.getInfo()] = each[eachH.getName()];
			delete each[eachH.getName()];
		});
	});
	
	b.forEach(function(each){
		tmi.getHeaders().forEach(function(eachH){
			
			each[eachH.getInfo()] = each[eachH.getName()];
			delete each[eachH.getName()];
		});
	});
		var jsons = {
				
				dsTMBuzzerOut : a,
				dsTMBuzzerInput : b
			}
			
		
			
			var str= JSON.stringify(jsons);
			console.log(str);
			ws.send(str);
}


/*
 * 루트 컨테이너에서 host-change 이벤트 발생 시 호출.
 * 앱이 다른 부모 앱에 포함되거나 부모 앱으로 부터 이탈할 때 발생하는 이벤트 입니다.
 */
function onBodyHostChange(/* cpr.events.CEvent */ e){
	
}
