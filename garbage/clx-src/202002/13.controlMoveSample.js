/************************************************
 * sample.js
 * Created at 2020. 1. 31. 오후 3:37:42.
 *
 * @author lutpe
 ************************************************/

var dragManager = cpr.core.Module.require("module/ControlDragManager");
var sldieManager = cpr.core.Module.require("module/Slidify");

/*
 * "1" 버튼(btn1)에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onMousedown(/* cpr.events.CMouseEvent */ e){
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;
    
    dragManager.dragStart(button.getParent(), app, e);	
};


/*
 * "1" 버튼(btn1)에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onMousedown2(/* cpr.events.CMouseEvent */ e){
    /** 
     * @type cpr.controls.Button
     */
    var button = e.control;
    
    dragManager.dragStart(button.getParent(), app, e);  
};

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var container = app.lookup("grp_slide");
    var slidify = sldieManager.slidify;
    var slide = slidify(container);
    slide.autoPlayDelay = 3;
    slide.autoPlayDuration = 3.0
    slide.showCount = 1
    slide.showPaginition = false;
    slide.navigationButtonStyle = "none"
    slide.start();
};


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("portlet1").setAppProperty("nm", "1111");
	app.lookup("portlet2").setAppProperty("nm", "2222");
	app.lookup("portlet3").setAppProperty("nm", "3333");
	app.lookup("portlet4").setAppProperty("nm", "4444");
	app.lookup("portlet5").setAppProperty("nm", "5555");
	app.lookup("portlet6").setAppProperty("nm", "6666");
};


/*
 * "Button" 버튼(btn22)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn22Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn22 = e.control;
	alert(app.lookup("portlet1").getParent().id)
}
