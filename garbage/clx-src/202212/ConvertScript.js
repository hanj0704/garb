/**
* 전문레이아웃 목록조회 URL :
 * http://localhost:8080/itfinfo/[interfaceid].do
*/
var aInterfaceListUrl = ["10","253","209","10"];
var sInterfaceListUrl = aInterfaceListUrl.join(".");
var INTERFACELIST = "http://" + sInterfaceListUrl + ":7711/eims/itfinfo/itflist.do";

/**
* 전문상세 내역 조회 URL :
*/
var aInterfaceDetailUrl = ["10","253","209","10"];
var sInterfaceDetailUrl = aInterfaceDetailUrl.join(".");
var INTERFACEDETAIL = "http://" + sInterfaceListUrl + ":7711/eims/itfinfo/itfinfodetail.do";


/**
* 전문 목록 검색 URL을 리턴합니다.
* MCI 플러그인은 해당 주소로 검색 요청을 보냅니다.
* @param {interfaceid:string, interfacename:string} query
*/

function getLookupInfo(query) {

	var url = INTERFACELIST +"?" ;

	var itfid = query.itfid;
	var itfname = query.itfname;
	var srcserviceid = query.srcserviceid;

	var sCondition  = "";
	if(itfid != null && itfid != "") {
		url = url + "itfid=" + itfid + "";
		sCondition = "&";
	}
	if(itfname != null && itfname != ""){
		url = url + sCondition + "itfname=" + itfname +"";
		sCondition = "&";
	}
	if(srcserviceid != null && srcserviceid != ""){
		url = url + sCondition + "srcserviceid=" + srcserviceid +"";
	}

	//url 인코딩처리
	var encodeUrl = encodeURI(url);

	 //console.log("검색 조건", query, encodeUrl)
	 return {
		   "url" : encodeUrl
		   , "method" : "get"
		   , "request" : {}
	 };
}


/**
* 서버의 검색 조회 결과를 스튜디오로 전달하는 모델로 리턴해야 합니다.
 * @param {any} response
* @return {{interfaces:any[], columns:string[]}[]}
*/

function convertSearchResult(response) {
	//console.log("검색결과입니다`~~~~~~~", response)

	 var result = {
	       interfaces:[],
	       columns:["itfId", "itfNm", "itfExpl", "serviceId"]
	 };

	if(response.Error != null ){
		//console.log( response.Error.itfInfo )
		throw new Error(response.Error.itfInfo );
		return result;
	}


	 if(response) {
           var itfInfo = response.DIMMS.itfInfo;
           for(var idx = 0; idx < itfInfo.length; idx++) {

                        var interfaceInfo = itfInfo[idx];
                        result.interfaces[idx] = {
                                     itfId: interfaceInfo.itfId,
                                     itfNm: interfaceInfo.itfNm,
                                     serviceId: interfaceInfo.providerServiceId,
                                     itfExpl: interfaceInfo.itfExpl
                        };
           }
	 }


	 return result;

}



/**
* 사용자가 검색된 서비스 목록에서 서비스를 선택하고, 불러오기를 눌렀을 때 호출 됩니다.
* 클라이언트는 서비스 상세 스펙을 얻을 수 있는 url과, 해당 url로 전송할  request 객체를 반환 해야 합니다.
*
* @param {interfaceid:string, interfacename:string} spec 사용자가 선택한 서비스 JSON 객체.
* @return {url:string, request:any}
*/

function getServiceURL(spec) {
     //console.log("서비스 " + spec.itfId + "(" + spec.itfNm + ") URL을 요청 받음")

     return {
	       url: INTERFACEDETAIL + "?itfid="+ spec.itfId,
	       method: "get",
	       request: {}
     };
}

/**
 * 검색창의 개인화 영역 표시 (2020.3.24)
 */
function getSearchFields(){
	return {
		"전문ID" : "itfid",
		"전문명" : "itfname",
		"서비스 ID" : "srcserviceid"
	}
}


/**
* 서비스 상세 얻기 서버가 반환한 서비스 스펙을 eb6 데이터 매트릭스 정의 식으로 변환하여 리턴 하여야 합니다.
* @param {any} service
*/

function convert(service) {
//	 console.log(service)

	 var result = {
	               request : {},
	               response : {}
	 };

	 var serviceIOs = service.DIMMS.consumer.serviceIos.serviceIo;
	 var itfInfo = service.DIMMS.itfInfo;
	 var serviceId = itfInfo.providerServiceId;

//console.log( "**************" + itfInfo.providerServiceId)
	 for(var idx = 0; idx < serviceIOs.length; idx++) {

           var serviceIO = serviceIOs[idx];
           var iodvcd = serviceIO.ioInfo.ioDvCd;
           var ios = serviceIO.ios.io;
           
           var metaModel = {};
           // request/response객체가 존재하지 않는 경우에 데이터 구조가 정상생성되도록 수정 (2020.4.8)
           // 전문데이터가 없는 경우, payload 빈 바디만 생성되도록  (2020.5.12)
           	if(ios == null ) {
           		metaModel = {payload: {
							           format: "object",
							           data: {}
//							           ,dataControlType :"datamap", 
//							           dataControl : "dmResPayload" + serviceId 
							    }};				
           	}
           	else metaModel = convertIO(ios, serviceId);
            
           if(iodvcd == "OI") { // request     	
	                result.request = {
	                      format: "object",
	                     data: metaModel
	                };	
           } else if(iodvcd == "OO") { // response	
	                result.response = {
						"format": "object",
						"data": metaModel
	                };	
           }
	 }
	 // 매트릭스 서브미션의 코멘트 추가 (2020.5.13)
	 result.comment = itfInfo.itfNm;
	 result.userAttr = {
           itfNm : itfInfo.itfNm,
           itfId : itfInfo.itfId,
           serviceId : serviceId,
           // 송수신 시스템 코드 (전문헤더용 )
           trnmSysCode : itfInfo.consumerSysCd, 
           rcveSysCode : itfInfo.providerSysCd
           
	 };

	 //console.log("------------------------------------")
	 //console.log(result)
	 //console.log("====================================")

	 return result;
}



function convertIO(ios, sId) {

     var laSerNo = [];

     var laRootModel = {};

     var parentType = [];

     for(var idx = 0; idx < ios.length; idx++) {

           var io = ios[idx];

           var serno = io["serNo"];
           var parserno = io["parSerNo"];


			var datanm = io["ioAppNm"]; // 카멜표기법 컬럼명
			//var nodenm = io["ioEngNm"] // 카멜표기법 컬럼명변경 필요  :  ioEngNm 컬럼명 (대문자_)
			//var kornm = io["ioKorNm"]
           var dataType = io["dataTypDvCd"];

			//var serviceId = io["serviceId"]	// 서비스ID
			var lvl = io["ioLvl"];				// 레벨
			var korNm = io["ioKorNm"];		// 한글명
			var dataLn = io["dataLn"];			// 데이터 길이
			var decimalPnt = io["decimalPnt"];	// 소수점 길이
			var dataTypDvCd = io["dataTypDvCd"];// 데이터 유형
			var reqYn = "N";					// 필수
			var maskYn = io["maskYn"];			// 마스킹 여부
			var encYn = io["encYn"];			// 암호화 여부

           parentType = trimParentType(parentType, lvl);

           var parent = getParentType(parentType);
           var metaModel = {
                        format: "",
                       data: null,
                       userAttr : {// 사용자 정의 속성 지원
                       			 "lvl" : lvl+""
								, "engNm" :  datanm
								, "korNm" :  korNm
								, "dataLn" :  dataLn+""
								, "dataTypeNm" :  dataTypDvCd
								, "maskYn" :  maskYn
								, "encYn" :  encYn
								, "reqYn" :  reqYn
								, "remark" :  ""
								, "serNo"  : serno +""

							 }
           };

           laSerNo[serno] = metaModel;

           if(lvl == 0) {
                laRootModel[datanm] = metaModel;
           } else {
                var parentModel = laSerNo[parserno];
                if(!parentModel.data) {
                             parentModel.data = {};
                }
                parentModel.data[datanm] = metaModel;

           }
	
		// 데이터 타입이 없는 경우가 종종 
		if(dataType == null || dataType == ""){
			alert("데이터 타입의 값이 전문관리 시스템에 입력되었는지 확인해 주십시오. ");
			break;
		} 	 

	   switch(dataType) {
			
			//그룹
	        case "O" : {
                 // 카멜표기법의 데이터셋 ID 생성
                 var camelNm = datanm;
                 camelNm = camelNm.charAt(0).toUpperCase() + camelNm.substring(1);

                 if(dataLn == -1) { // object
 						metaModel.format = "object";
 						metaModel.data = {};

                       if(parent === "DS") {
	                        // 생성할 데이터셋 ID 피드백
	                        metaModel.dataControl = "ds" + camelNm;
	                        metaModel.dataControlType = "dataset";
	                        metaModel.comment = korNm;
	                        
	//                      metaModel.payload = "modified";
	                        metaModel.payload = "all"; // test
	                        metaModel.linked = true; // linked 속성 피드백
	                        parentType[lvl] = "DS";

                       } else {
                            // 생성할 데이터셋 ID 피드백
                            metaModel.dataControl = "dm" + camelNm;
                            metaModel.dataControlType = "datamap";
                            metaModel.comment = korNm;
                            parentType[lvl] = "DM";
                       }

                 } else { // array
						   metaModel.format = "array";
                           metaModel.data = {};

                           // 생성할 데이터셋 ID 피드백
                           metaModel.dataControl = "ds" + camelNm;
                           metaModel.dataControlType = "dataset";
                           metaModel.comment = korNm;
//                         metaModel.payload = "modified";
                           metaModel.payload = "all"; // test
                           if(parent === "DS") { // 만약 상위가 DataMap인 경우 linked는 설정하지 않거나 false로 설정
								metaModel.linked = true; // linked 속성 피드백
                           }
                           parentType[lvl] = "DS";
                 }
                 break;

	        }
			
			//Date
		    case "D" :{
		        metaModel.format = "string";
		        if(parent === null) {
		            metaModel.path = "";
		        } else {
		            metaModel.path = "@" + datanm;
		        }

		        metaModel.data = "";
		        parentType[lvl] = "";
		        metaModel.comment = korNm; // 컬럼한글명 추가

		        break;
		    }
			
			//DateTime, TimeStamp
			case "TIMESTAMP" :
		    case "T" :{
		        metaModel.format = "string";
		        if(parent === null) {
		            metaModel.path = "";
		        } else {
		            metaModel.path = "@" + datanm;
		        }

		        metaModel.data = "";
		        parentType[lvl] = "";
		        metaModel.comment = korNm; // 컬럼한글명 추가

		        break;
		    }
			
			//String, CLOB
		    case "S" :
            case "BLOB" : 
		    case "CLOB" : 
		    {
		        metaModel.format = "string";
		        if(parent === null) {
		            metaModel.path = "";
		        } else {
		            metaModel.path = "@" + datanm;
		        }

		        metaModel.data = "";
		        parentType[lvl] = "";
		        metaModel.comment = korNm; // 컬럼한글명 추가

		        break;
		    }
		    
		    //NUMBER, LONG, FLOAT, DOUBLE, SHORT, INTEGER
		    case "N" : 
		    case "LONG" :
		    case "FLOAT" :
		    case "DOUBLE" : 
		    case "SHORT" :
		    case "INTEGER" :
		    {

		         if(dataLn > 29 ) { // 29 자리 이상인 경우, 데이터의 소실이 있어 임시로 string 처리 (2020.08.03)
					metaModel.format = "string";
		         } else if(dataLn > 7 || decimalPnt > 0 ) { // 7 자리수 이하면 number 아니면 decimal, 소수점이 있으면 decimal 없으면 number
					metaModel.format = "decimal";
		         } else {
					metaModel.format = "number";
		         }

		         if(parent === null) {
					metaModel.path = "";
		         } else {
		           metaModel.path = "@" + datanm;
		         }
		         metaModel.data = "";
		         parentType[lvl] = "";
		        metaModel.comment = korNm; // 컬럼한글명 추가

		         break;

		    }
		    
            default: 
            {
                break;
            }  

   		}// end switch

     }// end for


    // request, response를 payload로 감쌈
    return {
//	    header: {
//	           format: "object",
//	           data: {}
//	    },

	    payload: {
	           format: "object",
	           data: laRootModel
//	           ,dataControlType :"datamap", 
//	           dataControl : "dmReqPayload" + sId 
	    }
    };
}



function trimParentType(parentType, lvl) {
     var newParentTp = [];

     for(var i = 0; i < lvl; i++) {
                  newParentTp[i] = parentType[i];

     }
     return newParentTp;
}


function getParentType(parentType) {
     var ln = parentType.length;

     for(var i = ln - 1; i >= 0; i--) {
           var tp = parentType[i];
           if(tp) {
                return tp;
           }
     }

     return null;
}



function toCamel(str) {
 	return str.replace(/_([0-9a-zA-Z])/g, function (g) { return g[1].toUpperCase(); });
}
