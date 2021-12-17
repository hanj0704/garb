/************************************************
 * POP_Tit.js
 * Created at 2021. 7. 21. 오후 2:59:23.
 *
 * @author ryu54
 ************************************************/



/*
 * "예, 계속 할래요" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	cpr.core.DeferredUpdateManager.INSTANCE.update();
	
	var vcGrpCont = app.getContainer();
	var voGrpContActlRct = vcGrpCont.getContentPaneRect();
	
	console.log(voGrpContActlRct);
	
	var voHostAppIns = app.getHostAppInstance();
	var vsHostNm = app.getHostProperty("name");
//	voHostAppIns.dialogManager.updateConstraintByName("nm1", {
//		height : voGrpContActlRct.height+40,
//		width: voGrpContActlRct.width,
//		top : "calc(30%)"
//	});
}
