/************************************************
 * OZReportUtil.module.js
 * Created at 2022. 5. 9. 오전 11:32:30.
 *
 * @author 1441273
 ************************************************/

var msReportActionUrl = "https://oz-report.orange.hanwhalifefs.com/oz80/oz_canvas.jsp";
var msDefaultWindowPopName = "__reportPop__";
var OzUtil = function(){
	var debounceOpen = _.debounce(reportOpen.bind(this), 500);
	this.openOz = debounceOpen;
}

/**
 *
 * @param {String} psPopName? 윈도우 팝업 타겟 아이디, 별도로 지정하지 않을경우 기본값으로 __reportPop__이 들어갑니다.
 */
OzUtil.prototype.openEmpty = function(psPopName) {
	var vsWindowName = msDefaultWindowPopName;
	if(ValueUtil.fixNull(psPopName) != "") {
		vsWindowName = psPopName;
	}
	window.open("",vsWindowName,"width=1100,height=900");
}

/**
 * 윈도우 팝업으로 리포트를 엽니다. 리포트 양식에서 필요로 하는 데이터를 넘겨주어야 데이터가 연결되어
 * 리포트에 표시됩니다. 한 화면에서 복수개의 윈도우 팝업을 동시에 열어야 하는 경우, 세번째 파라미터의
 * psPopName을 지정하여 열리는 윈도우 팝업의 아이디를 지정해주어 각각  다른 팝업으로 열릴 수 있게 해야합니다.
 * @param {Object[]} paOzParam 리포트에서 표시하는 데이터(JSONString)
 * @param {Object[]} paSubParams 리포트 생성 옵션(중복 키값에 대한 체크를 별도 수행하지 않습니다)
 * @param {String} psPopName? (Optional)윈도우팝업의 name, 한번에 두개의 윈도우팝업 리포트를 여는 경우, windowName을
 * 두번째 윈도우팝업 리포트의 windowName을 변경하여 팝업을 열어야합니다. 단일 윈도우팝업만 여는 경우에는 별도 지정하지 않아도 됩니다.
 */
function reportOpen(paOzParam,paSubParams,psPopName) {

//	/** @type OzParamMaker */
//	var voParamMaker = this.paramMaker;
	var vsWindowName = msDefaultWindowPopName;
	if(ValueUtil.fixNull(psPopName) != "") {
		vsWindowName = psPopName;
	}
//	/** @type cpr.core.AppInstance */
//	var voApp = this._app;
//	if(voApp){
//		var vaSubs = voApp.getAllDataControls().filter(function(each){
//			return each instanceof cpr.protocols.Submission;
//		});
//		var vbIsIdle = vaSubs.every(function(each){
//			return each.status == "IDLE";
//		});
//		if(!vbIsIdle) {
//			reportOpen(paOzParam,paSubParams,psPopName);
//			return;
//		} else {
//
//		}
//	}
	window.open("", vsWindowName,"width=1100,height=900");

	var vsDomain = document.domain;
	var vsMsReportActionUrl = msReportActionUrl;
	if(vsDomain.indexOf("orange-dev") != -1 || vsDomain.indexOf("localhost") != -1) {

		vsMsReportActionUrl = vsMsReportActionUrl.replace("orange", "orange-dev");
	}
	else if(vsDomain.indexOf("orange-stg") != -1) {

		vsMsReportActionUrl = vsMsReportActionUrl.replace("orange", "orange-stg");
	}

	var voReportForm = new cpr.protocols.HttpPostMethod(vsMsReportActionUrl, vsWindowName);
	if(ValueUtil.fixNull(paSubParams) == "") {
		return;
	}
	voReportForm.addParameter("ozParamSub", JSON.stringify(paSubParams));
	var vaDataParam =	paOzParam;
	var vsDataParamStr = JSON.stringify(vaDataParam);
	voReportForm.addParameter("ozParam", vsDataParamStr);
		voReportForm.submit();
		voReportForm.dispose();
}

/**
 * 오즈 리포트 팝업을 여는 객체를 리턴합니다.
 */
globals.createOzUtil = function(){
	return new OzUtil();
}


var globIndex = 0;
globals.getIndex = function(){
	return globIndex++;
}
globals._ozReportCall = function(param1,param2,param3){
	var vsDomain = document.domain;
			var vsMsReportActionUrl = "https://oz-report.orange.hanwhalifefs.com/oz80/";
			if(vsDomain.indexOf("orange-dev") != -1 || vsDomain.indexOf("localhost") != -1) {

				vsMsReportActionUrl = vsMsReportActionUrl.replace("orange", "orange-dev");
			}
			else if(vsDomain.indexOf("orange-stg") != -1) {

				vsMsReportActionUrl = vsMsReportActionUrl.replace("orange", "orange-stg");
			}
	var tempFunc = function(){
		var oz;
		oz = document.getElementById(param1);
		var ozParam = param2;
		var ozParamSub = param3;

		if(ozParam.length>1){
			//멀티보고서처리
	        oz.sendToActionScript("viewer.childcount",ozParam.length-1);  //메인 보고서 외의 보고서 개수 // 동적
	    //  oz.sendToActionScript("viewer.ismultidocassub", ismultidocassub);  //차일드 보고서가 메인 보고서에 종속될 지 여부
		//	oz.sendToActionScript("print.alldocument",alldocument);  //모든 리포트를 한번에 인쇄
		//	oz.sendToActionScript("global.concatpage",concatpage);  //한 보고서처럼 만들지 여부 (페이지 번호 연결됨) (true/false)
		//	oz.sendToActionScript("global.inheritparameter",inheritparameter);  //다중 보고서 호출 시 부모 보고서의 패러미터 값을 자식 보고서가 상속받을지 여부를 설정합니다.
		}
		//oz.sendToActionScript("viewer.showtree", showtree);  //트리 보기 (true/false)
        for(var i=0; i<ozParam.length; i++){
			if(i == 0){
				oz.sendToActionScript("connection.servlet",vsMsReportActionUrl+"server");	// 요청할 오즈서버 서블릿 URL
				oz.sendToActionScript("connection.reportname",ozParam[i].reportname);	//호출할 리포트 명 //동적
				oz.sendToActionScript("connection.pcount","1");						//FormParam 개수만큼 설정.
			    oz.sendToActionScript("connection.args1",'jsondata='+ozParam[i].jsondata);	//첫번 째 Form패러미터, "="을 구분으로 이름과 값으로 구분함 ex) name=value //동적
			    oz.sendToActionScript("connection.displayname",ozParam[i].displayname);

		        //export.filename
				oz.sendToActionScript("export.filename" , ozParam[i].displayname);

			}else{
				oz.sendToActionScript("child"+i+".connection.servlet",vsMsReportActionUrl+"server");	// 요청할 오즈서버 서블릿 URL
				oz.sendToActionScript("child"+i+".connection.reportname",ozParam[i].reportname);	//호출할 리포트 명 //동적
				oz.sendToActionScript("child"+i+".connection.pcount","1");						//FormParam 개수만큼 설정.
			    oz.sendToActionScript("child"+i+".connection.args1",'jsondata='+ozParam[i].jsondata);	//첫번 째 Form패러미터, "="을 구분으로 이름과 값으로 구분함 ex) name=value //동적
			    oz.sendToActionScript("child"+i+".connection.displayname",ozParam[i].displayname);
			}
		}

        for(var i=0; i<ozParamSub.length; i++){

//        	if ( ozParamSub[i].key == "exportfrom" ) {
//        		exportfrom = ozParamSub[i].value;
//        		continue;
//        	}

			oz.sendToActionScript(ozParamSub[i].key,ozParamSub[i].value);
		}

        oz.sendToActionScript("pdf.fontembedding", "true");			//pdf에 폰트 포함
        oz.sendToActionScript("pdf.fontembedding_subset", "true");	//pdf에 폰트 포함시 사용한 문자의 폰트 정보만 포함

		return true;
}
	window["SetOZParamters_"+param1] = tempFunc;

	var voOption = {
		"use_request_binary" : false
	};

	start_ozjs(param1,vsMsReportActionUrl+"ozh1viewer/",voOption);
}
