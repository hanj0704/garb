/************************************************************************
 * ExmMciExDevicePushM.js
 * @프로그램설명 : MCI 디바이스 푸쉬 화면 

 * @작성일자 :  2020. 7. 23. 
 * @작성자 1073825
 * 
 * @수정이력 :  수정일자 (수정자) 수정내용 
 *                      
 ************************************************************************/ 

/************************************************************************
 ** 글로벌 변수, 상수변수
 ************************************************************************/ 


/************************************************************************
 ** 글로벌 함수
 ************************************************************************/ 
/**
* 화면 초기 로딩  혹은 메뉴 클릭시에 로딩하는 함수로 async 형태로 호출됨. 
* @param {any} oInitValue   
*/
exports.init = function(oInitValue){
	// 초기로딩시 호출하는 구문 작성
	app.setAppProperty("dddd", oInitValue);
}


/************************************************************************
 ** 파일내 로컬변수 선언  
 ************************************************************************/ 
var util = createCommonUtil();


/************************************************************************
 ** 사용자 정의 자바스크립트 함수를 기술 
 ************************************************************************/ 
 

/************************************************************************
 ** 자동으로 생성되는 이벤트 자바스크립트 함수를 배치
 ** (이벤트 생성시 자동으로 스크립트 함수가 하위에 표시됩니다. ) 
 ************************************************************************/ 

/*
 * "푸쉬 팝업" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 7. 17.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	util.Dialog.open("base/app/main/CmnPushP01",342,256,null,null,null,false);
}


/*
 * "푸쉬 리스트" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 7. 17.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	util.Dialog.open("base/app/main/CmnPushP02",245,360,null,null,null,false);
}


/*
 * "푸쉬 알림" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 7. 20.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	var initValue = {
		"PUSH_TITLE" : "타이틀11111입니다.!!!!!",
	};
	
	app.lookup("noti1").notify("AAAAAA",initValue);
	
//	app.lookup("noti1").addEventListener("item-click", function(e){
//		
//		alert("aaaaa");
//	});
}


/*
 * "푸쉬 알림" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2020. 7. 20.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	var initValue = {
		"PUSH-TITLE" : "타이틀22222입니다.!!!!!"
	};
	app.lookup("noti1").notify("BBBBBB");
	
//	app.lookup("noti1").addEventListener("item-click", function(e){
//		
//		alert("bbbbbb");
//	});	
}

/*
 * 알림에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNoti1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Notifier
	 */
	var noti1 = e.control;
	
//	e.item.properties.helloFunc();
//	
	alert(e.item.properties.PUSH_TITLE);
			
}
