var URL_PREFIX = "http://localhost:8080";

/**
 * 검색 필드에 표시할 항목을 리턴 합니다.
 */
function getSearchFields(){
	return {
		"서비스 명" :  "interfacename",
		"클래스 URL" : "classUrl",
		"서비스 URL" : "mappingUrl"
	}
}

/**
 * 전문 목록 검색 URL을 리턴합니다.
 * MCI 플러그인은 해당 주소로 검색 요청을 보냅니다.
 * @param {interfaceid:string, interfacename:string} query
 */
function getLookupInfo(query) {
	console.log("검색 조건", query);
	return {
		// 검색 URL
		url : URL_PREFIX + "/tes/mci.do",
		
		// 요청 메소드
		method : "post",
		
//		// 리퀘스트 바디 또는 파라미터로 전달할 데이터
//		request : {"hello" : "world"}
	};
}

/**
 * 서버의 검색 조회 결과를 스튜디오로 전달하는 모델로 리턴해야 합니다. 
 * @param {any} response
 * @return {{interfaces:any[], columns:string[]}[]}
 */
function convertSearchResult(response){
	console.log(response);
	return {
		// 인터페이스 목록
		interfaces : response.list,
		
		// 화면에 노출할 컬럼 이름 목록
		columns: ["interfacename", "classUrl","mappingUrl"]
	};
}

/**
 * 사용자가 검색된 서비스 목록에서 서비스를 선택하고, 불러오기를 눌렀을 때 호출 됩니다.
 * 클라이언트는 서비스 상세 스펙을 얻을 수 있는 url과, 해당 url로 전송할  request 객체를 반환 해야 합니다.
 * 
 * @param {classUrl:String, mappingUrl:String,interfacename:String} spec 사용자가 선택한 서비스 JSON 객체.
 * @return {url:string, request:any}
 */
function getServiceURL(spec) {
	console.log("서비스 " + spec.interfacename +" URL을 요청 받음");
	var vsUrl = URL_PREFIX + spec.classUrl;
	var vsMappingUrl = spec.mappingUrl;
	if(vsMappingUrl[0] != "/") {
		vsMappingUrl = "/"+ vsMappingUrl;
	}
	vsUrl += vsMappingUrl;
	console.log(vsUrl);
	return {
		url : vsUrl,
		method : "post",
		request:{}
	}
//	switch (spec.interfaceid) {
//		case "s1":
//			return {
//				// 서비스 상세 정보를 얻을 URL
//				url: URL_PREFIX + "service1.json",
//				
//				// 요청 메소드
//				method: "post",
//				
//				// 리퀘스트 바디 또는 파라미터로 전달할 데이터
//				request: {}
//			};
//
//		case "s2":
//			return {
//				url: URL_PREFIX + "service2.json",
//				method: "post",
//				request: {}
//			};
//
//		case "s3":
//			return {
//				url: URL_PREFIX + "service3.json",
//				method: "post",
//				request: {}
//			};
//			
//		case "s4":
//			return {
//				url: URL_PREFIX + "service4.json",
//				method: "post",
//				request: {}
//			};
//	}

}

/**
 * 
 * @param {Object} poData
 */
function convertObj(poData){
//	var vaKeys = Object.keys(poData);
//	for(var )
}

/**
 * 서비스 상세 얻기 서버가 반환한 서비스 스펙을 eb6 데이터 매트릭스 정의 식으로 변환하여 리턴 하여야 합니다.
 * @param {any} service
 */
function convert(service) {
	console.log(service);
	console.log(typeof service);
	var result = conver2(service);
	return result;
}

/**
 * 
 * @param {Object} poData
 */
function conver2(poData){
	var voData = poData;
	var voResult = {};
	if(voData instanceof Array) {
		voData = voData[0];
	}
	for(var qw in voData) {
		var data = voData[qw];
		voResult[qw] = ev(qw, data, false,false);
	}
	console.log(voResult);
	
	var realResult = {
		"request": {
			"linked": false,
			"format": "object",
			"data": {}
		},
		"response": {
			"linked": false,
			"format": "object",
			"data": voResult
		}
	}
	return realResult;
}

/**
 * 자신의 키값이 부모로부터 내려받은건지 아닌지를 체크하는 방법이 필요함. 그래야
 * 마지막에되서 컬럼에 대한 정의를 내릴 떄 path가 필요한지, data가 필요한지 알 수 있을듯
 * @param {String} name 키
 * @param {Object} data 데이터
 * @param {Boolean} pBool 링크된 정보인가 아닌가
 * @param {Boolean} pBool2 존속된 정보인가 독립된 정보인가
 */
function ev(name,data,pBool){
	var voResult = {
		"dataControl" : name,
		"linked" : pBool,
		"format" : "object"
		};
	var vBools = true;
	if(data instanceof Array) {
		voResult.format = "array";
		data = data[0];
	}
	if(!(data instanceof Object)){
		
		vBools = false;
	}
	var fResult = {};
	if (vBools) {
		for (var keys in data) {
			var tempData = data[keys]; //키값안에 존재하는 데이터 값을 가지고 이게 오브젝트인지 어레이인지 체크하는 변수
			var Versus = Object.prototype.toString.call(tempData);
			if (Versus.indexOf("Array") != -1) {
				fResult[keys] = ev(keys, tempData, true);
			} else if (tempData instanceof Object) {
				fResult[keys] = ev(keys, tempData, false);
			} else {
				var vb = Versus.indexOf("String") != -1;
				fResult[keys] = {
					"format": vb ? "simple" : "decimal",
					"path": "@" + keys
				}
			}
		}
		voResult.data = fResult;
	} else {
		var Versus = Object.prototype.toString.call(data);
		var vb = Versus.indexOf("String") != -1;
		voResult = {
			"format" : vb ? "simple" : "decimal",
			"data" : data
		}
	}
	return voResult;
}