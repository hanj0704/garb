/************************************************
 * ep.js
 * Created at 2019. 5. 2. 오후 3:56:43.
 *
 * @author HANS
 ************************************************/




/*
 * 임베디드 페이지에서 load 이벤트 발생 시 호출.
 * 페이지의 Load가 완료되었을 때 호출되는 Event.
 */
function onEp1Load(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.EmbeddedPage
	 */
	var ep1 = e.control;
	
	ep1.setPageProperty("_ownerApp", app);
	
}

/**
 * 메인화면에서 선언한 함수입니다. 전달인자로 받은 문자열을 경고창으로 출력합니다.
 * @param {String} paramString 경고문으로 출력될 문자열
 */
function MainPageAlert(paramString) {

	alert(paramString);	
}

exports.MainPageAlert = MainPageAlert; //exports를 사용하여 외부에서 사용 가능하도록
									   //출판합니다.

/*
 * "메서드 실행하기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var ep1 = app.lookup("ep1");
	
	if(ep1.hasPageMethod("EmbeddedMethod")) {
		ep1.callPageMethod("EmbeddedMethod");
	}
}


/*
 * 임베디드 페이지에서 load 이벤트 발생 시 호출.
 * 페이지의 Load가 완료되었을 때 호출되는 Event.
 */
function onEp2Load(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.EmbeddedPage
	 */
	var ep2 = e.control;
	ep2.setPageProperty("_ownerApp", app);
}
