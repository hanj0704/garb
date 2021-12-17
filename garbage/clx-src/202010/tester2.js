/************************************************
 * tester2.js
 * Created at 2020. 10. 19. 오후 3:09:29.
 *
 * @author HANS
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	app.setAppProperty("atten", app.getContainer());;
	
	
	var vaCh = app.getContainer().getAllRecursiveChildren();
	
	vaCh.sort(function(a,b){
		
		return a.getActualRect().top - b.getActualRect().top ;
	});
	
	vaCh.forEach(function(each){
		
		console.log(each.value);
	});
}


/*
 * "Button3" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var a = {};
	
	if(Object.keys(a).length) {
		console.log("zz");
	}
}


/*
 * 그리드에서 cell-moved 이벤트 발생 시 호출.
 * Grid의 Cell을 이동했을 때 발생하는 이벤트.
 */
function onGrd1CellMoved(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	console.log("moved");
}
