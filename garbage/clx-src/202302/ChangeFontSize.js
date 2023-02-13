/************************************************
 * TEST.js
 * Created at 2020. 3. 5. 오전 10:16:20.
 *
 * @author ryu
 ************************************************/



/*
 * "sm" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.getContainer().getAllRecursiveChildren().forEach(function(each){
		each.style.removeClass("md");
		each.style.removeClass("lg");
		
		each.style.addClass("sm");
	});
}


/*
 * "md" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.getContainer().getAllRecursiveChildren().forEach(function(each){
		each.style.removeClass("sm");
		each.style.removeClass("lg");
		
		each.style.addClass("md");
	});
}


/*
 * "lg" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.getContainer().getAllRecursiveChildren().forEach(function(each){
		each.style.removeClass("sm");
		each.style.removeClass("md");
		
		each.style.addClass("lg");
	});
}
