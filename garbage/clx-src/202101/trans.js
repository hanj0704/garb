/************************************************
 * trans.js
 * Created at 2021. 1. 6. 오전 11:10:34.
 *
 * @author HANS
 ************************************************/

//app.lookup("ea1").getEmbeddedAppInstance() = 


cpr.core.Platform.INSTANCE.initParameter({"WRSG":"zzzz"});
/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
//	var opener = window.opener;
	
//	console.log(opener);
//	var ril = "";
//	
//	try{
//		if(opener){
//			
//			ril = opener.document.URL;
//		} else {
//			
//			throw new Error("접근할 수 없습니다");
//		}	
//	}catch(err){
//		console.log(err);
//		ril = "";	
//	}		
//	var ur = window.document.URL;
//	if (ril.indexOf("tester") == -1) {
//		alert("zz");
//	} else {
//		alert("슈발ㅋㅋ");
//		cpr.core.App.load("202101/Host", function(loadedApp){
//			loadedApp.createNewInstance().run();
//			app.close();
//		});
//	}
//	var vsRequestURL = "";
//	try{
//		if(voOpener){
//			
//			vsRequestURL = voOpener.document.URL;
//		} else {
//			
//			throw new Error("접근할 수 없습니다");
//		}	
//	}catch(err){
//		vsRequestURL = "";	
//	}		
//	var vsSelfURL = window.document.URL;
//	console.log(vsSelfURL);
//	console.log(vsRequestURL);
//	if( vsSelfURL.indexOf("freesisd.kofia.or.kr") >= 0  ) {
//   				if( vsRequestURL.indexOf("workd.kofia.or.kr")  ==-1 && 
//   					vsRequestURL.indexOf("mgmtd.kofia.or.kr")  ==-1	) {
//   		   			cpr.core.App.load("app/com/main/Message", function(loadedApp){
//   		   				cpr.core.Platform.INSTANCE.initParameter({"WMSG":"접근가능한 화면이 아닙니다."});
//   		   				loadedApp.createNewInstance().run();
//   		   				app.close();
//   		   			});
//   				}
//   			}else{
//   				console.log(vsRequestURL.indexOf("localhost:8080"));
//   				if( vsRequestURL.indexOf("localhost:8080")  ==-1 && 
//   	   					vsRequestURL.indexOf("mgmt.kofia.or.kr")  ==-1	) {
//						cpr.core.App.load("app/com/main/Message", function(loadedApp){
//   		   				cpr.core.Platform.INSTANCE.initParameter({"WMSG":"접근가능한 화면이 아닙니다."});
//   		   				loadedApp.createNewInstance().run();
//   		   				app.close();
//   		   			});
//   	   			} 
//   			} 
	
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
	console.log(document.referrer);
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
	console.log(window);
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	console.log(document.domain);
	document.domain = "test.com";
	console.log(document.domain);
	console.log(window.opener.location.hostname);
}



/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	
	app.lookup("ea1").getEmbeddedAppInstance() = app.lookup("ea2").getEmbeddedAppInstance();
	
	cpr.core.AppInstance.
}
