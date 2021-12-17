/************************************************
 * hanaTest.js
 * Created at 2020. 7. 13. 오후 2:13:03.
 *
 * @author han
 ************************************************/


/*
 * 1번
 * "console" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var vcGrid = app.lookup("grd1");
	
	var vcDataSet = app.lookup("ds1");
	
	vcDataSet.forEachOfUnfilteredRows(function(/*cpr.data.DataRow*/dataRow){
		
		console.log(dataRow.getIndex()+"번 째 row의 상태 값 :"+dataRow.getStateString());
	});
}






/*
 * 3번
 * "clear" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("cmb1").clearSelection();
}


/*
 * 7번
 * "clear" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	var kits=  createKit(app);
	
	kits.clearAllChildren(app,"grp1");

}


/*
 * 18번
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var mdi = app.lookup("mdi1");
	
	mdi.addItemWithApp("appid", true, function(item, _app){
	//여기서 item.content는 임베디드 앱 이라는 컨트롤로, 임베디드 앱은 자신이 호출하는 서브화면에 대해서 초기값을 전달할 수 있습니다.		
		item.content.initValue = {
			"name" : "HAN",
			"property1" : "HELLOWORLD"
		}
		
		//이렇게 호출하고, 받는 쪽에서 파라미터를 받는 방법
		/**
		 * function onBodyLoad(e){
		 *   
		 *   var initParam = app.getHostProperty("initValue");
		 *   
		 *   console.log(initParam["name"]);
		 * }
		 */
		
	})
}
