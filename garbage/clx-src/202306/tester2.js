/************************************************
 * tester.js
 * Created at 2023. 6. 1. 오후 2:08:18.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
//	var btn1 = e.control;
//	var json = {"Category":[{"CategoryID": 1,"CategoryName":"음료","Description": "청량음료, 커피, 홍차, 맥주"},{"CategoryID":2,"CategoryName":"조미료","Description":"감미료, 향신료, 양념, 스프레드"}], "Product":[{"ProductID":75,"ProductName":"알파인 맥주","CategoryID":1,"QuantityPerUnit":"24 - 0.5 l bottles","UnitPrice":24000.0000,"UnitsInStock":125},{"ProductID":39,"ProductName":"OK 바닐라 셰이크","CategoryID":1,"QuantityPerUnit":"750 cc per bottle","UnitPrice":28000.0000,"UnitsInStock":69},{"ProductID":34,"ProductName":"태일 라이트 맥주","CategoryID":1,"QuantityPerUnit": "24 - 12 oz bottles","UnitPrice":34000.0000,"UnitsInStock":111},{"ProductID":65,"ProductName":"루이지애나 특산 후추","CategoryID":2,"QuantityPerUnit":"32 - 8 oz bottles","UnitPrice":21000.0000,"UnitsInStock":76},{"ProductID":61,"ProductName":"사계절 핫 소스","CategoryID":2,"QuantityPerUnit":"24 - 500 ml bottles","UnitPrice":28000.0000,"UnitsInStock":92},{"ProductID":6,"ProductName":"대양 특선 블루베리 잼","CategoryID":2,"QuantityPerUnit": "12 - 8 oz jars","UnitPrice":25000.0000,"UnitsInStock":120}]};
//	
//	app.lookup("oz").drawReport({
//		reportname: "/jsonsample.ozr",
//		jsondata :json,
//		displayname : "gg"
//	});
//	OzLoader.checkLibLoaded().then(function(input){
		
	
	var obj = document.createElement("div");
	obj.style.width = "100%";
	obj.style.height = "100%";
	obj.setAttribute("id", "OZViewer");
	obj.style.position = "absolute";
	document.body.appendChild(obj);
	var vsDomain = document.domain;
			var vsMsReportActionUrl = "http://211.116.251.54/";
	var tempFunc = function(){
		var oz;
		oz = document.getElementById("OZViewer");
		var json = {"Category":[{"CategoryID": 1,"CategoryName":"음료","Description": "청량음료, 커피, 홍차, 맥주"},{"CategoryID":2,"CategoryName":"조미료","Description":"감미료, 향신료, 양념, 스프레드"}], "Product":[{"ProductID":75,"ProductName":"알파인 맥주","CategoryID":1,"QuantityPerUnit":"24 - 0.5 l bottles","UnitPrice":24000.0000,"UnitsInStock":125},{"ProductID":39,"ProductName":"OK 바닐라 셰이크","CategoryID":1,"QuantityPerUnit":"750 cc per bottle","UnitPrice":28000.0000,"UnitsInStock":69},{"ProductID":34,"ProductName":"태일 라이트 맥주","CategoryID":1,"QuantityPerUnit": "24 - 12 oz bottles","UnitPrice":34000.0000,"UnitsInStock":111},{"ProductID":65,"ProductName":"루이지애나 특산 후추","CategoryID":2,"QuantityPerUnit":"32 - 8 oz bottles","UnitPrice":21000.0000,"UnitsInStock":76},{"ProductID":61,"ProductName":"사계절 핫 소스","CategoryID":2,"QuantityPerUnit":"24 - 500 ml bottles","UnitPrice":28000.0000,"UnitsInStock":92},{"ProductID":6,"ProductName":"대양 특선 블루베리 잼","CategoryID":2,"QuantityPerUnit": "12 - 8 oz jars","UnitPrice":25000.0000,"UnitsInStock":120}]};
		oz.sendToActionScript("connection.servlet",vsMsReportActionUrl+"/oz80/server");
		oz.sendToActionScript("connection.reportname","/jsonsample.ozr");
		oz.sendToActionScript("connection.pcount","2");
		oz.sendToActionScript("connection.args1","jsondata="+ JSON.stringify(json));
		oz.sendToActionScript("connection.args2","viewerType=HTML5 Canvas Viewer");
		oz.sendToActionScript("information.debug","true");
		return true;
//		if(!(ozParam instanceof Array)) {
//			ozParam = [ozParam];
//		}
//		
//		if(ozParam.length>1){
//			//멀티보고서처리
//	        oz.sendToActionScript("viewer.childcount",ozParam.length-1);  //메인 보고서 외의 보고서 개수 // 동적
//	    //  oz.sendToActionScript("viewer.ismultidocassub", ismultidocassub);  //차일드 보고서가 메인 보고서에 종속될 지 여부
//		//	oz.sendToActionScript("print.alldocument",alldocument);  //모든 리포트를 한번에 인쇄
//		//	oz.sendToActionScript("global.concatpage",concatpage);  //한 보고서처럼 만들지 여부 (페이지 번호 연결됨) (true/false)
//		//	oz.sendToActionScript("global.inheritparameter",inheritparameter);  //다중 보고서 호출 시 부모 보고서의 패러미터 값을 자식 보고서가 상속받을지 여부를 설정합니다.
//		}
//		//oz.sendToActionScript("viewer.showtree", showtree);  //트리 보기 (true/false)
//        for(var i=0; i<ozParam.length; i++){
//        	var voParam = ozParam[i];
//			if(i == 0){
//				oz.sendToActionScript("connection.servlet",vsMsReportActionUrl+"/server");	// 요청할 오즈서버 서블릿 URL
//				oz.sendToActionScript("connection.reportname",ozParam[i].reportname);	//호출할 리포트 명 //동적
//				oz.sendToActionScript("connection.pcount","1");						//FormParam 개수만큼 설정.
//			    oz.sendToActionScript("connection.args1",'jsondata='+ozParam[i].jsondata);	//첫번 째 Form패러미터, "="을 구분으로 이름과 값으로 구분함 ex) name=value //동적
//			    oz.sendToActionScript("connection.displayname",ozParam[i].displayname);
//
//		        //export.filename
////				oz.sendToActionScript("export.filename" , ozParam[i].displayname);
//
//			}else{
//				oz.sendToActionScript("child"+i+".connection.servlet",vsMsReportActionUrl+"server");	// 요청할 오즈서버 서블릿 URL
//				oz.sendToActionScript("child"+i+".connection.reportname",ozParam[i].reportname);	//호출할 리포트 명 //동적
//				oz.sendToActionScript("child"+i+".connection.pcount","1");						//FormParam 개수만큼 설정.
//			    oz.sendToActionScript("child"+i+".connection.args1",'jsondata='+ozParam[i].jsondata);	//첫번 째 Form패러미터, "="을 구분으로 이름과 값으로 구분함 ex) name=value //동적
//			    oz.sendToActionScript("child"+i+".connection.displayname",ozParam[i].displayname);
//			}
//		}
//
//        for(var i=0; i<ozParamSub.length; i++){
//
////        	if ( ozParamSub[i].key == "exportfrom" ) {
////        		exportfrom = ozParamSub[i].value;
////        		continue;
////        	}
//
//			oz.sendToActionScript(ozParamSub[i].key,ozParamSub[i].value);
//		}
//
//        oz.sendToActionScript("pdf.fontembedding", "true");			//pdf에 폰트 포함
//        oz.sendToActionScript("pdf.fontembedding_subset", "true");	//pdf에 폰트 포함시 사용한 문자의 폰트 정보만 포함
//
//		return true;
}
	window["SetOZParamters_"+"OZViewer"] = tempFunc;

	var voOption = {
		"use_request_binary" : false
	};

	start_ozjs("OZViewer",vsMsReportActionUrl+"/oz80/ozhviewer/");
	
//	});
}
