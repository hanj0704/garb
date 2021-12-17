/************************************************
 * game.js
 * Created at 2021. 1. 25. 오전 10:22:52.
 *
 * @author HANS
 ************************************************/

/** @type cpr.controls.HTMLObject */
var image ;
var directionAncor;

/*
 * 루트 컨테이너에서 mousemove 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 이동할 때 발생하는 이벤트.
 */
function onBodyMousemove(/* cpr.events.CMouseEvent */ e){
	var cen = image.getActualRect().center;
//	console.log(e.clientX)
	var r = Math.atan2(-(e.clientX-cen.x), e.clientY-cen.y);
	
 if (r < 0)
  r += Math.PI * 2;
 var d = r*180/Math.PI;
// while (d < 0)
//  d += 360;
 //alert(d+'degrees'); 
	if(d < 180){
		d += 180
	} else {
		d -= 180;
	}
	
	directionAncor.setAttribute("transform",cpr.utils.Util.template("rotate(${angle}, 100, 100)", {
			angle: d
		}))
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
		image = app.lookup("img");
	image.htmlAttr("id", image.uuid);
}


/*
 * HTML 오브젝트에서 load 이벤트 발생 시 호출.
 * data속성의 값을 통해 가져오는 자료가 로드되었을때 발생되는 이벤트.
 */
function onImgLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.HTMLObject
	 */
	var img = e.control;
		
	var svgNode = e.control.object.contentDocument.rootElement;
	directionAncor = svgNode.querySelector("#hans");
}


/*
 * 루트 컨테이너에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(/* cpr.events.CKeyboardEvent */ e){
	console.log("ㅋㅋ");
	console.log(e.keyCode == cpr.events.KeyCode.UP);
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
}
