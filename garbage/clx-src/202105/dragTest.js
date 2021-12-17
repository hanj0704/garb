/************************************************
 * dragTest.js
 * Created at 2021. 5. 7. 오전 10:27:21.
 *
 * @author HANS
 ************************************************/



function listener(e){
	
	console.log(e)
}

function listener2(e){
	window.removeEventListener("touchmove", listener);
}
/*
 * 그룹에서 touchstart 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면상에 배치될 때 발생하는 이벤트.
 */
function onGrp1Touchstart(/* cpr.events.CTouchEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	
	window.addEventListener("touchmove", listener,{passive:false});
	window.addEventListener("touchend", function(){
		window.removeEventListener("touchmove", listener);
	});
}


/*
 * 그룹에서 touchmove 이벤트 발생 시 호출.
 * 하나 이상의 터치 포인트가 터치 표면을 따라 이동할 때 발생하는 이벤트.
 */
function onGrp1Touchmove(/* cpr.events.CTouchEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp1 = e.control;
	
}
