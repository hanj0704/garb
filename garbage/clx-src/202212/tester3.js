/************************************************
 * tester3.js
 * Created at 2022. 12. 23. 오후 5:35:11.
 *
 * @author HANS
 ************************************************/

var w = {
  "userAttr": {
    "hello": "world"
  },
  "comment": "와아아앙",
  "request": {
    "linked": false,
    "format": "object",
    "data": {}
  },
  "response": {
    "linked": false,
    "format": "object",
    "data": {
      "grid1": {
        "dataControl": "gridDataSet",
        "userAttr": {
          "comment": "그리드 데이터 셋 사용자 정의 속성 테스트",
          "other": "hello"
        },
        "linked": false,
        "format": "array",
        "data": {
          "name": {
            "format": "simple",
            "path": "@name",
            "comment": "이름",
            "userAttr": {
              "comment": "데이터 컬럼 사용자 정의 속성 테스트"
            }
          },
          "age": {
            "format": "decimal",
            "path": "@age",
            "comment": "나이"
          },
          "contact": {
            "linked": true,
            "format": "array",
            "dataControl": "XXX",
            "data": {
              "email": {
                "format": "simple",
                "path": "@email",
                "userAttr": {
                  "comment": "데이터 컬럼 사용자 정의 속성 테스트"
                }
              },
              "mobile": {
                "format": "simple",
                "path": "@mobile"
              }
            }
          }
        }
      },
      "info": {
        "dataControl": "infoMap",
        "dataControlType": "datamap",
        "linked": false,
        "format": "object",
        "data": {
          "message": {
            "format": "simple",
            "path": "@top"
          },
          "message2": {
            "format": "simple",
            "path": "@bottom"
          },
          "test": {
            "format": "simple",
            "data": 1
          },
          "test2": {
            "format": "simple",
            "data": "xx"
          }
        }
      }
    }
  }
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e) {
	var btn1 = e.control;
//	var q = {
//		"mainDS": [{
//			"packageUrl": "대구분-0",
//			"column12": "15:55:01",
//			"column11": "20221227",
//			"column10": -1313297142,
//			"column5": "상세정보상세정보상세정보상세정보상세정보상세정보상세정보상세정보",
//			"column4": "세구분-0",
//			"column3": "소구분-0",
//			"column2": "중구분-0",
//			"column13": [{"A":"가","B":2},{"A":1,"B":2},{"A":1,"B":2}],
//			"column9": {"Q" : 1, "BMW" : 2},
//			"column8": -1507647074,
//			"column7": -774892592,
//			"column6": -992992702
//		}]
//	}
//	var q = {
//		"list": [{
//				"child1": 1,
//				"child2": "Hanny",
//				"child3": "Janous"
//			},
//			{
//				"child1": 2,
//				"child2": "Shurlock",
//				"child3": "Killerby"
//			},
//			{
//				"child1": 3,
//				"child2": "Brandy",
//				"child3": "Bontoft"
//			},
//			{
//				"child1": 4,
//				"child2": "Aldis",
//				"child3": "Hinckley"
//			}
//		],
//		"param4": 4,
//		"param1": "Aldis",
//		"param2": "Hinckley",
//		"param3": "ahinckley3@nsw.gov.au"
//	}
	var q = {
    "useYn": "Y",
    "id": "POU00001",
    "name": "강감찬",
    "actualSpecificationType": "훌륭한 타입",
    "specificationType": {
        "id": "PPU001",
        "type": "001",
        "name": "틀별한타입-1"
    },
    "specificationItemCodeList": [{
        "createDate": "20190501",
        "updateDate": "20190601",
        "useYn": "Y",
        "productItemCodeDetailList": [{
            "id": "PP01",
            "code": "PPOO1",
            "name": "홍길동1",
            "period": {
                "startDate": "20190501",
                "endDate": "20190601"
            }
        }, {
            "id": "PP02",
            "code": "PPOO2",
            "name": "홍길동2",
            "period": {
                "startDate": "20190502",
                "endDate": "20190602"
            }
        }, {
            "id": "PP03",
            "code": "PPOO3",
            "name": "홍길동3",
            "period": {
                "startDate": "20190503",
                "endDate": "20190603"
            }
        }, {
            "id": "PP04",
            "code": "PPOO4",
            "name": "홍길동4",
            "period": {
                "startDate": "20190504",
                "endDate": "20190604"
            }
        }, {
            "id": "PP05",
            "code": "PPOO5",
            "name": "홍길동5",
            "period": {
                "startDate": "20190505",
                "endDate": "20190605"
            }
        }],
        "productItemCodeType": {
            "id": "POP01",
            "type": "POP_TP1",
            "description": "접속코드1"
        }
    }, {
        "createDate": "20190502",
        "updateDate": "20190602",
        "useYn": "N",
        "productItemCodeDetailList": [{
            "id": "PP01",
            "code": "PPOO1",
            "name": "홍길동1",
            "period": {
                "startDate": "20190501",
                "endDate": "20190601"
            }
        }, {
            "id": "PP02",
            "code": "PPOO2",
            "name": "홍길동2",
            "period": {
                "startDate": "20190502",
                "endDate": "20190602"
            }
        }, {
            "id": "PP03",
            "code": "PPOO3",
            "name": "홍길동3",
            "period": {
                "startDate": "20190503",
                "endDate": "20190603"
            }
        }, {
            "id": "PP04",
            "code": "PPOO4",
            "name": "홍길동4",
            "period": {
                "startDate": "20190504",
                "endDate": "20190604"
            }
        }, {
            "id": "PP05",
            "code": "PPOO5",
            "name": "홍길동5",
            "period": {
                "startDate": "20190505",
                "endDate": "20190605"
            }
        }],
        "productItemCodeType": {
            "id": "POP02",
            "type": "POP_TP2",
            "description": "접속코드2"
        }
    }, {
        "createDate": "20190503",
        "updateDate": "20190603",
        "useYn": "Y",
        "productItemCodeDetailList": [{
            "id": "PP01",
            "code": "PPOO1",
            "name": "홍길동1",
            "period": {
                "startDate": "20190501",
                "endDate": "20190601"
            }
        }, {
            "id": "PP02",
            "code": "PPOO2",
            "name": "홍길동2",
            "period": {
                "startDate": "20190502",
                "endDate": "20190602"
            }
        }, {
            "id": "PP03",
            "code": "PPOO3",
            "name": "홍길동3",
            "period": {
                "startDate": "20190503",
                "endDate": "20190603"
            }
        }, {
            "id": "PP04",
            "code": "PPOO4",
            "name": "홍길동4",
            "period": {
                "startDate": "20190504",
                "endDate": "20190604"
            }
        }, {
            "id": "PP05",
            "code": "PPOO5",
            "name": "홍길동5",
            "period": {
                "startDate": "20190505",
                "endDate": "20190605"
            }
        }],
        "productItemCodeType": {
            "id": "POP03",
            "type": "POP_TP3",
            "description": "접속코드3"
        }
    }, {
        "createDate": "20190504",
        "updateDate": "20190604",
        "useYn": "Y",
        "productItemCodeDetailList": [{
            "id": "PP01",
            "code": "PPOO1",
            "name": "홍길동1",
            "period": {
                "startDate": "20190501",
                "endDate": "20190601"
            }
        }, {
            "id": "PP02",
            "code": "PPOO2",
            "name": "홍길동2",
            "period": {
                "startDate": "20190502",
                "endDate": "20190602"
            }
        }, {
            "id": "PP03",
            "code": "PPOO3",
            "name": "홍길동3",
            "period": {
                "startDate": "20190503",
                "endDate": "20190603"
            }
        }, {
            "id": "PP04",
            "code": "PPOO4",
            "name": "홍길동4",
            "period": {
                "startDate": "20190504",
                "endDate": "20190604"
            }
        }, {
            "id": "PP05",
            "code": "PPOO5",
            "name": "홍길동5",
            "period": {
                "startDate": "20190505",
                "endDate": "20190605"
            }
        }],
        "productItemCodeType": {
            "id": "POP04",
            "type": "POP_TP4",
            "description": "접속코드4"
        }
    }]
};
	
	conver2(q);
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
	return voResult;
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


///**
// * 
// * @param {Object} poDatas
// */
//function toColumn(poDatas){
//	//          "name": {
////            "format": "simple",
////            "path": "@name",
////            "comment": "이름",
////            "userAttr": {
////              "comment": "데이터 컬럼 사용자 정의 속성 테스트"
////            }
////          },
////          "age": {
////            "format": "decimal",
////            "path": "@age",
////            "comment": "나이"
////          },
//	var fResult = {};
//	for(var keys in poDatas){
//		var tempData = poDatas[keys];
//		if(tempData instanceof Array) {
//			fResult[keys] = toColumn(tempData);
//		}
//		var vb = tempData instanceof String;
//		fResult[keys] = {
//			"format" : vb ? "simple" : "decimal",
//			"path" : "@"+keys
//		}
//	}
//	return fResult;
//}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	app.lookup("")
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("test", {
		"data" : "zz",
		"user" : app
	});
}

/*
 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	
}
