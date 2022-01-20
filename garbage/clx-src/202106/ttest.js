/************************************************
 * ttest.js
 * Created at 2021. 6. 22. 오후 2:35:03.
 *
 * @author HANS
 ************************************************/
var a = 10;
cpr.events.EventBus.INSTANCE.addFilter("click", function(e){
	var control = e.control;
	
	 a = 10;	
});

var b ; 
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

//	b =  setInterval(function(){
//		
//		a = a -1;
//		console.log(a)
//		if(a <= 0) {
//			
//			alert("아니 너 멈춰있는데?");
//		}	
//	}, 1000)	

//	setInterval(function(){
//		
//		console.log(document.hidden)
//	},1000)
}
/*
 * "202105/dragTest" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
}


/*
 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
//	var a =cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
//	
//	a.forEach(function(each){
//		console.log(each);
//	});
	console.log("기모띠");
}

	/**
	 * 
	 * @param {Object} obj
	 */
	function copyObject(obj) {
		
		if(obj == null) {
			return obj;
		}
	
		var copyedObject = obj.constructor();
		
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				if(key != "_id" && key != "_uuid"){
					console.log(key);
					copyedObject[key] = obj[key];
				}
			}
		}
		return copyedObject;
		
	}

/*
 * "checker" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var aq = app.lookup("btn6");
	
	var q;
//	q = aq.constructor;
	var aqq = copyObject(aq);

	app.getContainer().addChild(aqq, {
		"top" : "100px",
		"left" : "100px",
		"width" : "100px",
		"height": "100px"
	});	
}


/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTre1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	var ite = tre1.getSelectionFirst();
//	cpr.core.App.load(ite.value, function(loadedApp){
//		
//		ea.app = loadedApp;
//		if(ite.row.getValue("status")) {
//			
//			ea.ready(function(aps){
//				/** @type cpr.controls.TabFolder */
//				var ta = aps.getEmbeddedAppInstance().getContainer().getChildren().find(function(ele){
//					if(ele instanceof cpr.controls.TabFolder){
//						return ele;
//					}
//				});
//				
//				if(ta) {
//					
//					ta.setSelectedTabItem(ta.getTabItems()[ite.row.getValue("status")]);
//				}
//			})
//		}
//	});
	
	var mdi = app.lookup("mdi1");
	
	if(mdi.findItemWithAppID(ite.value)) {
		
		mdi.setSelectedTabItem(mdi.findItemWithAppID(ite.value));
		/** @type cpr.controls.EmbeddedApp */
		var sel = mdi.findItemWithAppID(ite.value).content;
		
		sel.getEmbeddedAppInstance().callAppMethod("startInte");
	} else {
		
		mdi.addItemWithApp(ite.value);
	}
}


/*
 * 트리에서 before-selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onTre1BeforeSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	var md =  app.lookup("mdi1");
	if(md.getSelectedTabItem()){
	/** @type cpr.controls.EmbeddedApp */		
	var selItem = md.getSelectedTabItem().content;
	
		var aps = selItem.getEmbeddedAppInstance();
		
		if(aps.hasAppMethod("clear")) {
			aps.callAppMethod("clear");
		}	
	}

//	console.log(e.newSelection[0]);
//			console.log(e.oldSelection[0]);
//	var ea = app.lookup("ea1");
//	if (ea.app) {
//		
//		/** @type cpr.controls.TabFolder */
//		var tabs = ea.getEmbeddedAppInstance().getContainer().getChildren().find(function(eve) {
//			
//			if (eve instanceof cpr.controls.TabFolder) {
//				return eve;
//			}
//		});
//		if (tabs) {
//			
//			var idx = tabs.getSelectedTabItem().itemIndex;
//			e.oldSelection[0].row.setValue("status", idx);
//			console.log(idx);
//		}
//	}
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
	
	
	app.lookup("ds2").setValue(0, "column1","zz");
	app.getContainer().redraw();
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	console.log("바뀜~");
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
	
	app.lookup("ipb1").putValue("gkgkgkg");
}


/*
 * MDI 폴더에서 before-selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
 */
function onMdi1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdi1 = e.control;
	
	console.log("before-selection-change");
	
	console.log(e.oldSelection);	
}

var mnTMRotate = 180;
/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	var vnRotateStandard = 90;
	var vnTMRotate = 20;
	if(vnTMRotate != mnTMRotate) {
		
		
			var vnAzimuth = parseInt(vnTMRotate/vnRotateStandard);
			var vnRemain = vnTMRotate % vnRotateStandard;
			
			
			if (vnTMRotate > mnTMRotate) {
				if (vnRemain != 0) {
					
					vnTMRotate = vnRotateStandard * (vnAzimuth + 1);
				}
			} else if (vnTMRotate < mnTMRotate) {
				if(vnRemain != 0 ){
					vnTMRotate = vnRotateStandard * (vnAzimuth);
					
				}
			}
		}
			console.log(vnTMRotate);
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
	
	console.log(app.id);
}
