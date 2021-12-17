/************************************************
 * flowTest.js
 * Created at 2021. 4. 15. 오후 2:08:56.
 *
 * @author HANS
 ************************************************/
var index = 5;



var btns;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	btns = new cpr.controls.Container();
//	
//	var flows = new cpr.controls.layouts.FlowLayout();
//	
//	flows.horizontalAlign = "center";
//	flows.verticalAlign = "middle";
//	flows.lineWrap = false;
//	flows.scrollable = false;
//	flows.spacing = 12;
//	flows.topMargin = 36;
//	flows.rightMargin = 0;
//	flows.bottomMargin = 48;
//	flows.leftMargin = 0;
//	
//	btns.setLayout(flows);
//	
//	
////	for(var i = 0 ; i < 0 ; i++) {
//		
//		var btt = new cpr.controls.Button();
//		btt.value = "Zzz";
//		
//		btns.addChild(btt, {
//				width: "6px",
//				height: "6px",
//				autoSize: "both"
//		});
////	}
//	
//	app.lookup("grp1").floatControl(btns);

}


/*
 * "true" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	app.lookup("grpForm").visible = true;
}


/*
 * "false" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("grpForm").visible = false;
}

