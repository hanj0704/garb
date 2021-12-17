/************************************************
 * tanTest.js
 * Created at 2020. 1. 31. 오전 11:38:44.
 *
 * @author HANS
 ************************************************/

function createSvgLine(x,y) {
	var snippet = new cpr.controls.HTMLSnippet();
	
	snippet.value ='<svg height="'+y+'" width="'+x+'">'
	 + '<line x1="'+x+'" y1="0" x2="'+30+'" y2="'+y+'" style="stroke:rgb(255,0,0);stroke-width:2"/>'
	  + '</svg>';
	  
	  return snippet;
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	
	var btn1Rect = btn1.getActualRect();
	
	var btn2 = app.lookup("btn2");
	var btn2Rect = btn2.getActualRect();
	
//	var arc = toDegrees(Math.atan(y/x));
//	var height = Math.sqrt((Math.pow(x, 2)+Math.pow(y, 2)));
	
	var x = btn2Rect.topLeft.x - btn1Rect.bottomRight.x;
	var y = btn2Rect.topLeft.y - btn1Rect.bottomRight.y;

	
	var sni = createSvgLine(x,y);
	
	app.getContainer().addChild(sni, {
		"width" : x+"px",
		"height" :y+"px",
		"left" : btn1Rect.bottomRight.x+"px",
		"top" : btn1Rect.bottomRight.y +"px"
	});
	
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
	app.lookup("opt1").style.css({
		"transform" : "rotate(-45deg)"
	});
	
	console.log(app.lookup("sni1").value);
}
