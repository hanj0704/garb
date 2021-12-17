/************************************************
 * Untitled.js
 * Created at 2021. 6. 25. 오전 10:43:21.
 *
 * @author HANS
 ************************************************/

//cpr.events.EventBus.INSTANCE.addFilter("value-change", function(e){
//	var control = e.control;
//	
//	if(control instanceof cpr.controls.InputBox) {
//		
//		if(control.userAttr("isCookieStarted") == "Y") {
//			localStorage.setItem(app.app.title+"_"+control.id, control.value);
//		}
//	}
//});
//cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
//	var control = e.control;
//	
//	if(control instanceof cpr.core.AppInstance) {
//		
//		if(control.app.id.indexOf("udc") == -1) {
//				/** @type cpr.controls.InputBox[]*/
//			var cookieBoosters = control.getContainer().getAllRecursiveChildren().filter(function(each){
//				return each.userAttr("isCookieStarted") == "Y";
//			});
//			
//			cookieBoosters.forEach(function(each){
//				var str = localStorage.getItem(control.app.title+"_"+each.id);
//				if(str != undefined && str != null && str != "null") {
//					
//					each.putValue(str);
//				}
//			});
//		}
//	}
//});


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	localStorage.setItem("abc", "zzzzz");
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
	
	console.log(localStorage.getItem("abc"));
}


/*
 * "sessionSet" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	sessionStorage.setItem("abc", "교교교");
	
}


/*
 * "sessionSet" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	console.log(sessionStorage.getItem("abc"));
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var dmDoomsdayVault = app.lookup("dmDoomsdayVault");
	var vsData = localStorage.getItem(app.app.title+"_"+dmDoomsdayVault.id);
	dmDoomsdayVault.build(JSON.parse(vsData));
	app.getContainer().redraw();
}


/*
 * 데이터맵에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue
 */
function onDmDoomsdayVaultUpdate(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataMap
	 */
	var dmDoomsdayVault = e.control;
	localStorage.setItem(app.app.title+"_"+dmDoomsdayVault.id, JSON.stringify(dmDoomsdayVault.getDatas()));
}
