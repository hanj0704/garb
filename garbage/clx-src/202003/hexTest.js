/************************************************
 * hexTest.js
 * Created at 2020. 3. 31. 오전 10:24:31.
 *
 * @author HANS
 ************************************************/




function rgbToHex(rgbType) {
	  var rgb = rgbType.replace( /[^%,.\d]/g, "" ); 
        // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
        rgb = rgb.split( "," ); 

  return "#" + Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);
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
	var grp = app.lookup("grp1");
	var layout = app.lookup("grp1").getLayout();
		
	
	
}
