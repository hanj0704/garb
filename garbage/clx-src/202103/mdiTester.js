/************************************************
 * mdiTester.js
 * Created at 2021. 3. 11. 오전 10:41:10.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	var bt = new cpr.controls.Button();
	bt.value = Math.random();
	
	app.lookup("grp1").addChild(bt, {
		width : "409px",
		height:	"401px",
		autoSize:"none"
	});
	app.lookup("grp1").reorderChild(bt, 0);
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		
//		console.log(app.lookup("btn1").getActualRect());
	app.lookup("grp1").scrollTo(app.lookup("btn1").getOffsetRect().left-5,0);
	});
}
