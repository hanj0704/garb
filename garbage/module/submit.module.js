/************************************************
 * submit.module.js
 * Created at 2019. 9. 9. 오후 6:11:03.
 *
 * @author ryu
 ************************************************/
///**
// * 아 자동완성 되버리죠
// */
//cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getRowCount", function(){
//	
//});

module.depends("module/customMod");


cpr.events.EventBus.INSTANCE.addFilter("before-submit", function(e){
////	/** @type cpr.protocols.Submission */
//	var submission = e.control;
//	
//	var dm  = getDm();
//	
//	console.log(dm)
//	if(dm){
//		
//	if(submission instanceof cpr.protocols.Submission) {
//		
//	submission.addRequestData(dm, "FxFig");
//	submission.addResponseData(dm, false);	
//	}
//	else if(submission instanceof cpr.protocols.MatrixSubmission) {
//		
//		submission.addRequestData("FxFig",dm.getDatas());
//	}
//	
//	}
//	 User Attr에서 포맷 적용 여부 확인
//	var vsApplyYn = submission.userAttr("format");

//	if (vsApplyYn == "Y"){
//		if (submission.mediaType == "application/json"){
//			submission.setRequestEncoder(_requestEncoder);
//			submission.setResponseDecoder(_responseDecoder);
//		}
//	}
});

/**
 * 
 * @param {cpr.protocols.Submission} submission
 * @param {Object} reqData
 */
function _requestEncoder(submission, reqData) {
	var _app = submission.getAppInstance();
	
	var vsFormatType = submission.userAttr("format-type");
	
	var voJsonType = _getJsonType(vsFormatType);
	var reqDataObj = reqData["data"];
	
	for (var key in reqDataObj) {
		var vsDataYn = _app.lookup(key).userAttr("payload");
		

		// type1과 type2를 사용할 때		 
		 if (vsFormatType == "type1"){
		 	vsDataYn == "Y" ? voJsonType["payload"][key] = reqDataObj[key] : voJsonType["header"][key] = reqDataObj[key];
		 } else {
		 	vsDataYn == "Y" ? voJsonType["data"]["payload"][key] = reqDataObj[key] : "";
		 }
	}
	
	return {"content" : voJsonType};
}


/**
 * @private
 * @param {cpr.protocols.Submission} submission
 * @param {Object} reqData
 */
function _responseDecoder(submission, resData) {
	var _app = submission.getAppInstance();
	
	var resDataObj = JSON.parse(resData);
	
	var voProtocolJson = {};
	
	for (var key in resDataObj) {
		for (var subKey in resDataObj[key]) {
			voProtocolJson[subKey] = resDataObj[key][subKey];
		}
	}
	
	return {contentType : "application/json", content : voProtocolJson};
}


/**
 * 
 * @private
 * @param {String} psType
 * @return {Object}
 */
function _getJsonType(psType) {
	var voJsonType = {};
	
	switch(psType){
		case "type2" : {
			voJsonType = {
   				"data" : { 
                	"payload" : {}
              	}   
			};
			
			break;
		}
		
		default : {
			voJsonType = {
				 "header"  : {}
    			,"payload" : {}
			};
			
			break;
		}
	}
	
	return voJsonType;
}