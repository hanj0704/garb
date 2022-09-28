/************************************************
 * hey.js
 * Created at 2022. 9. 5. 오후 1:34:22.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var mdi = app.lookup("mdi1");
	mdi.addItemWithApp("202208/child2",true,function(item, app){
		item.text = item.text + "_" + mdi.getTabItems().length;
	});
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var a = cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
	a.forEach(function(each){
		console.log(each.id);
	});
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	console.log(app.lookup("mdi1").findItemWithAppID("202208/child2"));
}
