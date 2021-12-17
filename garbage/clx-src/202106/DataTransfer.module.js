//
//globals.clientUUID ;
//
//
//
///************************************************
// * DataTransfer.module.js
// * Created at 2021. 5. 18. 오전 9:01:14.
// *
// * @author HANS
// ************************************************/
//String.prototype.replaceAll = function(org,dest) {
//	return this.split(org).join(dest);
//}
//
//var targetApplication = {
//		"GetIOValue" : "SOCKET_SERVER",
//		"WriteIO" : "SCHEDULER",
//		"DWriteIO" : "SOCKET_SERVER",
//		"SetEvent" : "APPLICATION_NAME",
//		"QuerySQL" : "SOCKET_SERVER"
//}
//
//
///**
// * 
// * @param {String} psString
// */
//function findAppInstanceWithTitle(psString){
//	
//	var vaInstances = cpr.core.Platform.INSTANCE.getAllRunningAppInstances();
//	var voReturns = null;
//	
//	vaInstances = vaInstances.filter(function(each){
//		if(each.app.id.indexOf("udc") == -1 && each.app.title == psString) {
//			
//			return each;
//		}
//	});
//	
//	if(vaInstances.length > 1) {
//		voReturns = vaInstances[0];
//	}
//	
//	return voReturns;
//}
//
///**
// * 
// * @param {cpr.core.AppInstance} poAppInstance
// * @param {String} psActionCommand
// */
//globals.remakePageParam = function(poAppInstance,psActionCommand){
//	var aps = poAppInstance;
//	var allDC = [];
//	var req = {};
//	
//	var voRootApp = aps.getRootAppInstance();
//	req[voRootApp.app.title] = returnDC(voRootApp);
//	req[aps.app.title] = returnDC(aps);
//	
//	
//	
//	
//	var searchObj = {
//		searItem : "" 
//	};
//	
//	var requestObj = {
//		CMD : psActionCommand,
//		PAGE_NM : aps.app.title,
//		TAR_APP : targetApplication[psActionCommand],
//		DAT : req,
//		SEARCH : searchObj ,
//	    RP_TOT_CNT : 100, 
//		RP_CUR_CNT : 0  ,// 서버측에서 체워서 옴  if( response_tot_cnt == response_cur_cnt ) 다시요청 
//		DLY_TIM    : 500 ,
//		REQUEST_SEQ      : 1  , //식별자  
//		RP_TXT : "" ,  //장애등 관련 RETURN 
//		RP_CD  : "",
//		COMM_METHOD : "NO_THREAD"
//		
//		//리트라이 횟수
//	}
//	return requestObj;
//}
//
///**
// * 
// * @param {cpr.core.AppInstance} poAppInstance
// */
//function returnDC(poAppInstance){
// 
//	var aps = poAppInstance;
//	var vaDc = aps.getAllDataControls();
//	/** @type cpr.data.DataMap[] */
//	var vaDm = vaDc.filter(function(each){
//		if(each instanceof cpr.data.DataMap && each.userAttr("isParamData") == "Y") {
//			
//			return each;
//		}
//	});
//	console.log(vaDm);
//	var res = {};
//	
//	vaDm.forEach(function(each){
//		var req = {};
//		each.getHeaders().forEach(function(eachCol){
//			req[eachCol.getName()] = "";
//		});
//		res[each.id] = req;
//	});
//	
//	return res;
//}
//
///**
// * 페이지 로드시 생성되는 웹소켓에서  화면에서 필요한 스테이션과, 각 스테이션별 컬럼에 어떠한 프로토콜명으로 값을 받아와야 하는지를 알려주는 파라미터를 만들어주는 함수입니다.
// * 모든 화면의 파라미터는 해당 화면에 선언되어있는 데이터셋과 데이터맵의 정보를 근거로 구성되며, 데이터 컴포넌트의 사용자 속성 isParamData가 Y인 데이터 컴포넌트의 컬럼명을 수집하여 사용합니다.
// * 데이터 컴포넌트의 전체 정보를 파라미터로 넘기는게 아닌,사용자가 직접 작성한 Object를 보내고 싶을 경우, 세번쨰 파라미터 poDataObj에 오브젝트를 입력할 경우 해당 오브젝트가 파라미터에 적재됩니다.
// * @param {cpr.core.AppInstance} poAppInstance
// * @param {String} psActionCommand
// * @param {Object} poDataObj?
// * @return {Object}
// */
//globals.pageParamMake = function(poAppInstance,psActionCommand,poDataObj) {
//	
//	var aps = poAppInstance;
//	var allDC = [];
//	var req = {};
//	if(poDataObj != null){
//		
//		req = poDataObj
//	}else {
//		
//		allDC = aps.getAllDataControls().filter(function(each){
//			
//			if(each.userAttr("isParamData") == "Y") return each;
//		});;
//	
//	var allDs = allDC.filter(function(each){
//		if(each instanceof cpr.data.DataSet)
//		return each;
//	});
//	var allDm = allDC.filter(function(each){
//		if(each instanceof cpr.data.DataMap)
//		return each;
//	});
//	
//	
//	allDs.forEach(function(/*cpr.data.DataSet*/each){
//		
//		var ds = each;
//		var vsInfo = ds.info;
//		var res = {};
//			ds.getHeaders().forEach(function(eachH){
//				var vsColInfo = eachH.getName();
////				req[vsInfo].push(vsColInfo);
////				vsColInfo = vsColInfo.replaceAll("__", ".");
//				res[vsColInfo] = "";
//			});
//			req[vsInfo] = res;
////		}
//		
//	});
//	allDm.forEach(function(/*cpr.data.DataMap*/each){
//		var dm = each;
//		var vsDmInfo = dm.id;
////		req[vsDmInfo];
//		/** @type Object */
//		var res = {};
//		dm.getHeaders().forEach(function(eachH){
//			var vsDmColInfo = eachH.getName();
////			req[vsDmInfo].push(vsDmColInfo);
//
//				//vsDmColInfo = vsDmColInfo.replaceAll("__", ".");
//			res[vsDmColInfo] = "";
//		});
//		req[vsDmInfo] = res;
//	
//	});
//	}
//	//검색조건 
//	var searchObj = {
//		searItem : "" 
//	};
//	
//	
//	var requestObj = {
//		CMD : psActionCommand,
//		PAGE_NM : aps.app.title,
//		TAR_APP : targetApplication[psActionCommand],
//		DAT : req,
//		SEARCH : searchObj ,
//	    RP_TOT_CNT : 100, 
//		RP_CUR_CNT : 0  ,// 서버측에서 체워서 옴  if( response_tot_cnt == response_cur_cnt ) 다시요청 
//		DLY_TIM    : 500 ,
//		REQUEST_SEQ      : 1  , //식별자  
//		RP_TXT : "" ,  //장애등 관련 RETURN 
//		RP_CD  : "",
//		COMM_METHOD : "NO_THREAD"
//		
//		//리트라이 횟수
//	}
//	return requestObj;
//}
//
///**
// * 소켓 메세지의 Body영역에 내려온 데이터를 통해, 실제 화면에 구성된 데이터셋의 컬럼들의 값으로 빌드될 수있도록
// * 스테이션 명으로 데이터컴포넌트를 찾고, Object의 key값들을 수정하는 함수입니다.
// * 
// * @param {cpr.core.AppInstance} poAppInstance
// * @param {string} messageBody
// */
//function SocketMessageBuild(poAppInstance,messageBody) {
//	var message = messageBody;
//	try {
//		var json = JSON.parse(message);
//		json = json["DAT"];
//		var vaKeys = Object.keys(json);
//		/** @type cpr.data.DataCollection[] */
//		var vaDataCtrls = poAppInstance.getAllDataControls();
//		vaKeys.forEach(function(each) {
//			/** @type Array */
//			var data = json[each];
//			
//			if (!(data instanceof Array)) {
//				data = [data];
//			}
//			var dataCtrl = vaDataCtrls.find(function(ele) {
//				if (ele.id == each) {
//					return ele;
//				}
//			});
//			if(dataCtrl){
////				/** @type String[] */
////					var vaColKey = Object.keys(data[0]);
////					data.forEach(function(eachRow) {
////						
////						vaColKey.forEach(function(eachKey){
////							if(eachKey.indexOf(".") > -1) {
////								
////								var vsReplacedKey = eachKey.replaceAll(".", "__");
////								eachRow[vsReplacedKey] = eachRow[eachKey];
////								delete eachRow[eachKey];
////							}
////						});
////					});
//					
//				if (dataCtrl instanceof cpr.data.DataSet) {
//					
//					dataCtrl.build(data);
//				} else {
//					dataCtrl.build(data[0]);
//				}
//			}
//		});
//	} catch (err) {
//		console.log(err);
//	}
//}
//
//
//
//
//globals.SocketMessageBuild = SocketMessageBuild;
